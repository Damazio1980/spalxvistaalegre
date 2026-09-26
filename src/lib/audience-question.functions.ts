import { createServerFn } from "@tanstack/react-start";
import { APICallError, streamText } from "ai";
import { z } from "zod";
import { createAudienceQuestionProvider } from "./ai-gateway.server";

const QuestionInput = z.object({
  question: z.string().trim().min(3).max(500),
});

const PRESENTATION_CONTEXT = `
 Apresentação académica que compara a presença digital da SPAL e da Vista Alegre. Data de referência da análise das redes: 23/09/2026; os totais dos perfis nessa data ainda carecem de capturas datadas e não devem ser apresentados como historicamente confirmados. Websites consultados em 04/09/2026; imagens assinaladas como referência são provisórias.
EMPRESAS: SPAL — Alcobaça, 1965; cerca de 60% de exportação; mais de 45 países; SPAL Studio. Vista Alegre — Ílhavo, 1824; cerca de 70% de exportação; cerca de 25 lojas e 6 outlets; vendas do 1.º semestre de 2026: 71,3 M€ (+1,6%, antes 70,2 M€); resultado líquido: 4,3 M€ (+18,9%, antes 3,6 M€).
CANAIS: SPAL Website spal.pt, sem redirecionamento, PT/EN/ES/FR, catálogo e informação; Instagram @spalporcelanasofficial: 5.961 seguidores, 863 a seguir, 305 publicações; Facebook /SPALPorcelanas: 15.700 gostos. Outros: Pinterest, YouTube, LinkedIn; newsletter não confirmada. Contactos: loja.alcobaca@spal.pt e outlet.alcobaca@spal.pt. Vista Alegre Website vistaalegre.com/pt, redireciona por geolocalização e permite preços, carrinho, wishlist e login; Instagram @vistaalegreofficial: 360.000 seguidores, 1.297 a seguir, 3.717 publicações; Facebook /vistaalegreofficial: 347.000 seguidores, 6.000 publicações, verificado, recomendado por 92% em 293 avaliações. Outros: newsletter, app instalável, Pinterest, YouTube, LinkedIn. Contacto: socialmedia@vistaalegre.com.
WEBSITE, pontuação SPAL–Vista Alegre (1–5): identidade e mensagem 3–5; navegação e pesquisa 2–5; informação do produto 3–5; próximo passo/compra 1–5; telemóvel 2–4; integração e confiança 2–5. SPAL não tem pesquisa, demora 5 cliques até ao produto, não mostra preço ou compra, tem notícias de 2015, catálogos 2011–2013 e rodapé © 2013. Vista Alegre tem pesquisa, filtros, preço, compra, cuidados, carrinho, localizador com horários e app instalável.
PERCURSO DA INÊS: 36 anos, Lisboa, compra no telemóvel e tem 20 minutos para escolher uma prenda para a mãe. No minuto 3, SPAL exige 5 passos e Vista Alegre 4. No minuto 8, a ficha SPAL tem medidas, peso e referência, sem preço/compra; a Vista Alegre tem preço, compra, cuidados, material e origem. Aos 12 minutos, a SPAL perde o percurso nas lojas e vendedores externos; na Vista Alegre, a compra fica concluída em 6 minutos. Placar deste percurso: SPAL 0, Vista Alegre 3.
REDES, amostra em 23/09/2026: foram analisadas as 3 publicações mais recentes por perfil; frequência total de 26/06–23/09 é n/d porque a listagem completa não estava acessível. A publicação SPAL Facebook de sustentabilidade (28/07) tem 18 gostos e 1 partilha. SPAL usa tom institucional e bilingue, sem coleção à venda; os 3 posts Facebook são cópias exatas dos 3 do Instagram. Vista Alegre usa tom editorial/emocional, produto, património, retalho e cultura; adapta o texto da Bilha de 1931 ao Facebook e publica as Jornadas Europeias do Património apenas nessa rede. Vista Alegre vence variedade e adaptação à rede; tom e imagem não têm vencedor claro. Fecho: “A SPAL fala uma língua institucional em duas redes iguais. A Vista Alegre fala duas línguas diferentes — uma por rede.”
 INTERVENÇÃO SPAL: a distância entre o que a marca tem — design próprio, hotelware, exportação e rede física real — e o que comunica vem da própria plataforma; a prioridade é substituir o site atual. 1) Construir um website novo, próprio e mobile-first, com navegação por ocasião, preço, compra, store locator e storytelling hotelaria→casa; meta: descobrir→comprar em ≤3 cliques, venda direta e base própria de clientes. 2) Lançar o novo site nas redes com a linha editorial “Feito em Alcobaça”, adaptada a Instagram e Facebook; objetivo: tráfego qualificado desde o primeiro dia e crescimento de seguidores em Portugal. 3) Implementar desde o lançamento GA4, píxeis sociais e UTM em todas as campanhas; objetivo: decisões baseadas em dados reais.
INDICADORES: cliques em Onde comprar — se <2%, rever botão; se ≥5%, replicar. Respostas em menos de 24h — se <80%, atribuir responsável; se ≥95%, estender ao fim de semana. Mobile — se a taxa de rejeição não cair 10 pontos em 2 meses, rever composição.
EXEMPLO DIDÁTICO, NÃO DADO REAL DAS MARCAS: Marca X — Instagram: 10.000 impressões, 300 cliques, 240 sessões, 6 encomendas, 480€ receita, 120€ investimento, CTR 3%, conversão 2,5%, ROAS 4×, 20€/encomenda. Facebook: 8.000 impressões, 200 cliques, 160 sessões, 8 encomendas, 640€ receita, 80€ investimento, CTR 2,5%, conversão 5%, ROAS 8×, 10€/encomenda. Ticket médio 80€ em ambos.
CONCLUSÃO: “A SPAL precisa de falar com a Inês antes que a Vista Alegre o faça por ela — em Alcobaça.”
`;

function safeGatewayMessage(error: APICallError) {
  if (error.responseBody) {
    try {
      const parsed = JSON.parse(error.responseBody) as { message?: unknown; error?: { message?: unknown } };
      const message = parsed.error?.message ?? parsed.message;
      if (typeof message === "string" && message.trim()) return message.trim();
    } catch {
      // The upstream body was not JSON; use the SDK's already-sanitized message below.
    }
  }
  return error.message;
}

export const answerAudienceQuestion = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => QuestionInput.parse(input))
  .handler(async ({ data }) => {
    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    if (!lovableApiKey) {
      return { answer: null, error: "A resposta por IA ainda não está configurada." };
    }

    try {
      const lovable = createAudienceQuestionProvider(lovableApiKey);
      const result = streamText({
        model: lovable.responses("openai/gpt-6-astra"),
        maxRetries: 2,
        system: `Responde em português europeu como assistente da apresentadora. Usa exclusivamente o contexto fornecido. Dá uma resposta direta, segura e concisa, com 2 a 4 frases e, quando ajudar, números exatos. Distingue claramente dados reais de exemplos didáticos ou hipóteses. Não inventes. Se o deck não contiver a resposta, diz: “Essa informação não consta da apresentação.”\n\nCONTEXTO DO DECK:\n${PRESENTATION_CONTEXT}`,
        prompt: data.question,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });

      const answer = (await result.text).trim();
      if (!answer) {
        return { answer: null, error: "O modelo não devolveu uma resposta. Tente uma nova pergunta." };
      }
      return { answer, error: null };
    } catch (error) {
      if (APICallError.isInstance(error)) {
        return { answer: null, error: safeGatewayMessage(error) };
      }
      console.error("Audience question generation failed", error);
      return { answer: null, error: "Não foi possível gerar a resposta neste momento." };
    }
  });
