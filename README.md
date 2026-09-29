# Porcelana Journey

Apresentação SPAL × Vista Alegre — Prompts Lovable, ordem final

Copia um bloco de cada vez, de cima para baixo, e cola no Lovable. Espera que termine antes do seguinte. Não é preciso alterar nada.

Ordem: 1 → 1b → 2 → 3 → 4 → (carregar maquete) → 5 → 6 → 7 → 8 → 9.

Antes do bloco 5, carrega no Lovable a imagem maquete_publicacao_SPAL.png.

═══════════════════════════════════════

BLOCO 1 — Estrutura da apresentação

═══════════════════════════════════════

Cria uma apresentação web interativa em português de Portugal chamada "SPAL × Vista Alegre — Dos dados à Inês". A estrutura é um fio condutor em três atos:

Ato 1 · O que descobrimos — a análise, com dados, gráficos e evidências: os canais, os websites, as redes, o placar final. É a parte que responde ao enunciado, mas contada com energia: números grandes a mexer, duelos de barras, frases-choque.

Ato 2 · Vamos ver isto acontecer — a simulação. Entra a Inês, 36 anos, Lisboa, que quer oferecer uma peça de porcelana portuguesa à mãe e tem 20 minutos ao telemóvel. Ela percorre as duas marcas e cada obstáculo que encontra é exatamente o que o Ato 1 já tinha medido. A audiência vê os dados a acontecerem a uma pessoa.

Ato 3 · O que a SPAL faz a seguir — as três jogadas, a semana de conteúdos, a publicação, a bio, a resposta ao cliente, os números da marca X e os indicadores. Fecha com a Inês, 20 minutos depois, a receber da SPAL a resposta que não teve.

Mecânica de navegação — estilo Prezi (tela única com zoom): não é um deck de slides: é uma tela infinita onde todos os capítulos existem ao mesmo tempo, dispostos num percurso, e uma câmara que viaja entre eles com zoom e deslocamento (CSS transform: translate + scale, com easing cubic-bezier suave de 900-1200 ms). Cada capítulo é um quadro na tela, com o seu tamanho e rotação ligeira (−3° a +3°) para dar sensação de mapa. Regras:

A tela é o desenho de um prato gigante visto de cima: o Ato 1 fica no aro exterior (os capítulos de dados dispostos ao longo do rebordo), o Ato 2 no anel intermédio (a viagem da Inês em sentido horário), o Ato 3 no centro do prato (as propostas). Os três atos são regiões visíveis quando a câmara afasta.

A apresentação abre com a vista geral: a câmara afastada a mostrar o prato completo com os 22 quadros pequenos e o percurso desenhado como uma linha fina que os liga. Depois faz zoom no primeiro quadro.

Setas laterais fixas, teclas ← → e swipe avançam e recuam no percurso; a câmara faz zoom out parcial, desloca-se e zoom in no quadro seguinte (efeito de "sobrevoo"). Tecla Esc ou botão "Vista geral" afasta para o prato inteiro; clicar em qualquer quadro na vista geral faz zoom direto para ele. Tecla F para ecrã inteiro. Scroll do rato controla o zoom livre.

Nas transições de ato, a câmara afasta até mostrar a região inteira do ato, fica 1,5 s com o título do ato em grande, e volta a aproximar-se do primeiro quadro desse ato.

Alguns quadros contêm sub-quadros: nos "seis duelos do website" e nas "três jogadas", cada duelo/jogada é um quadro pequeno dentro do quadro grande, e a seta avança de sub-quadro em sub-quadro com zoom mais apertado antes de sair para o capítulo seguinte.

Indicador no fundo com o ato e o capítulo ativo ("Ato 2 · Minuto 8 · 10/22") e uma miniatura do prato com um ponto a marcar onde a câmara está. Menu de capítulos ao clicar no título.

Cada quadro tem tamanho fixo (1280×720 no espaço da tela) para o conteúdo caber sem scroll; se não couber, cria um sub-quadro adjacente.

As marcas d'água do Bloco 1b vivem na tela, não nos quadros: a ramagem e os filetes desenham-se sobre o prato gigante e aparecem parcialmente atrás de cada quadro consoante a posição da câmara, o que reforça a sensação de percurso.

Respeita o desempenho: usa will-change: transform, renderiza só os quadros visíveis e desativa animações internas dos quadros fora do ecrã.

Tom da escrita — regra para TODO o texto: frases curtas, segunda pessoa para a audiência ("Repara nisto"). Sem jargão académico nos títulos: nada de "Dimensão", "Indicador", "Análise comparativa" como título. Os termos técnicos aparecem, mas sempre com tradução numa etiqueta pequena ao lado ("ROAS — quanto rende cada euro de anúncio"). Cada capítulo tem no canto uma etiqueta discreta com o critério do enunciado ("A · canais", "B · website", "C · redes", "D · diagnóstico", "E · intervenção", "F · indicadores") para a formadora localizar cada requisito. Cada capítulo fecha com uma frase-choque de uma linha, em itálico, grande, sozinha no ecrã durante meio segundo antes de o resto aparecer.

Estética — moderna, editorial, com contraste: fundo branco-porcelana #F7F5F0 nos capítulos de dados e simulação, azul-marinho #1B2A44 nos capítulos de decisão e nas transições de ato; títulos enormes (clamp 44-96 px) em "Manrope" 800, texto em "Inter"; SPAL sempre em azul-porcelana #2F5C9E, Vista Alegre sempre em dourado #C09C68, Inês em terracota #C2603D. Bordas arredondadas grandes (24 px), sombras suaves, muito espaço em branco. Micro-interações em tudo: cartões que se elevam ao passar o rato, chips que pulsam uma vez ao entrar, botões com deslize de fundo.

Movimento — regras obrigatórias:

Todo o número conta de 0 ao valor com easing (count-up), em fonte grande, e tem um gráfico ao lado que se desenha ao mesmo tempo (recharts: barras que crescem, linhas que se traçam, donuts que se fecham, radar que se expande). Tooltip em todos os gráficos.

Toda a imagem e captura de ecrã tem botão Ampliar que abre uma lightbox com fundo escuro, legenda (canal · data · URL) e setas para a próxima imagem do mesmo grupo. Esc, X ou clique fora fecham.

Elementos entram em cascata (stagger de 80-120 ms). Nada aparece tudo de uma vez.

No Ato 1 existe um placar SPAL / Vista Alegre discreto no canto superior direito que sobe (+1 com brilho) a cada capítulo em que uma marca vence; no Ato 2 o mesmo placar volta a zero e sobe outra vez com a Inês — a audiência vê os dois placares chegarem ao mesmo resultado. Um cronómetro dos 20 minutos só aparece no Ato 2.

Três regiões de transição de ato (a câmara afasta para mostrar o ato inteiro), com o número do ato enorme e uma frase: "Ato 1 · O que descobrimos" / "Ato 2 · Vamos ver isto acontecer" / "Ato 3 · O que a SPAL faz a seguir".

Sem áudio. Sem vídeo automático.

Capítulos (cria todos agora com título e um slide vazio; o conteúdo entra depois):

Capa — fundo azul-marinho. Título: "SPAL × Vista Alegre". Subtítulo: "Duas porcelanas portuguesas. Um percurso até à compra. Quem chega ao fim?" Um prato branco a rodar lentamente, friso azul de um lado e dourado do outro. Rodapé fixo em todos os slides: "Exercício académico · UC 00279 Gerir os canais de comunicação digital · IEFP Sintra · Fernanda [apelido] · setembro 2026". Linha pequena: "Período de observação 05/08–04/09/2026 · consulta 04/09/2026".

— Transição: Ato 1 · O que descobrimos —

Os dois nomes (etiqueta: enquadramento) — SPAL (Alcobaça, 1965, desenha e produz para casas e hotéis, ~60 % exportação, 45+ países, SPAL Studio) e Vista Alegre (Ílhavo, 1824, grupo cotado, arte e colecionismo, loja online, ~25 lojas e 6 outlets). Mapa de Portugal simplificado com os dois pontos a acender e um terceiro: "2026 — a Vista Alegre abre loja e outlet em Alcobaça". Números a contar: 71,3 M€ (VAA 1.º semestre 2026, +1,6 %), 4,3 M€ resultado líquido (+18,9 %). Frase-choque: "A concorrente acabou de se instalar na rua da SPAL."

A pergunta — um slide só: "Qual das marcas facilita melhor o percurso entre descobrir um produto, obter informação e avançar para a compra ou para um contacto?" com três chips que se acendem em sequência: Descobrir · Informar · Comprar.

Os mesmos canais, funções diferentes (A · canais) — duas colunas de cartões de canal com números a contar (IG 5 961 vs 360 000 seguidores; 305 vs 3 717 publicações; FB 15 700 gostos vs [a inserir]), bios lado a lado, função de cada canal em chip. Barras de audiência com escala partida e etiqueta "audiência ≠ vendas". Frase-choque: "Uma usa o site como loja. A outra, como catálogo."

O website em seis rondas (B · website) — seis duelos, um por dimensão, cada um com a observação das duas marcas, a evidência (captura com Ampliar) e uma pontuação 1-5 que enche em barra. Placar sobe. No fim, radar das seis dimensões a desenhar-se (SPAL 3-2-3-1-2-2 / VA 5-5-5-5-4-5). Pode ser dividido em dois slides.

Nas redes (C · redes) — grelha das 12 publicações (cartões estilo Instagram/Facebook com Ampliar; referências provisórias marcadas "SUBSTITUIR"), gráfico de publicações no período por perfil e de reações por publicação, comparação tom / imagem / variedade / adaptação / respostas em cinco linhas que aparecem em sequência. Frase-choque: "Uma fala como fabricante. A outra, como marca de estilo de vida."

Placar do Ato 1 (D · diagnóstico) — fundo azul-marinho. Os três critérios com o vencedor: Descobrir (5 cliques vs 4) · Informar · Comprar → Vista Alegre 3, SPAL 0. Por baixo, "onde cada uma brilha": Vista Alegre "comprar sem sair do site", SPAL "informação técnica e design próprio". Frase-choque: "Não é falta de produto. É um site de 2013 a falar com o retalho."

— Transição: Ato 2 · Vamos ver isto acontecer —

Conhece a Inês — cartão de persona (avatar ilustrado, 36 anos, Lisboa, "quer oferecer uma peça à mãe, no telemóvel, hoje"), três chips: "não conhece as marcas", "quer saber o preço", "quer saber onde comprar". Cronómetro arranca a 00:00. Placar volta a zero.

Minuto 0 — a Inês entra — os dois websites em molduras de telemóvel lado a lado (capturas com Ampliar). SPAL: ecrã de escolha de idioma e notícias de 2015. Vista Alegre: coleções com preço. Etiqueta no canto: "isto é a ronda 1 do Ato 1 a acontecer".

Minuto 3 — à procura de um prato — fluxo de cliques animado: SPAL 5 passos (Produto → Mesa → Colecções → Uso Diário → miniaturas numeradas), Vista Alegre 4 (Presentes → Para Ela → peça). Placar: +1 Vista Alegre.

Minuto 8 — a ficha — cartões que viram: frente "o que a Inês vê" (SPAL: medidas, peso, referência, Pack 04/24 / VA: preço, comprar, cuidados), verso "o que a Inês precisava". Placar: +1 Vista Alegre. Etiqueta: "a SPAL tem melhor informação técnica do que muitas lojas — mas para o retalho, não para a Inês".

Minuto 12 — 'e agora, onde compro?' — o percurso da SPAL parte-se a meio (sai do site: El Corte Inglés, parceiros, e-mail ilegível); o da Vista Alegre chega ao fim com um check (comprar ou loja mais perto com horário). Placar: +1 Vista Alegre. Cronómetro: SPAL 12 min sem resposta, Vista Alegre 6 min com carrinho. Frase-choque: "A SPAL perde a Inês exatamente no momento em que ela decide comprar."

Dois placares, o mesmo resultado — animação em que o placar do Ato 1 e o placar da Inês se sobrepõem: 3-0 e 3-0. Frase: "Os dados e a pessoa contam a mesma história."

— Transição: Ato 3 · O que a SPAL faz a seguir —

Porque a SPAL — "tem design próprio", "tem lojas reais", "tem a porcelana dos hotéis", "e agora tem a Vista Alegre em Alcobaça". Um slide, quatro chips a acender.

Três jogadas (D · melhorias) — três cartões grandes que abrem ao clicar: 01 "Onde comprar, em todo o lado" · 02 "Fichas que falam com a Inês" · 03 "Feito em Alcobaça — 3 publicações por semana". Cada um: a prova, a jogada, onde, o que muda, mini-gráfico antes → depois.

Uma semana de SPAL (E · calendário) — linha do tempo 8-14 de setembro com 4 pontos que abrem os cartões das ações. Chip: "horários = hipótese a testar".

A publicação (E) — moldura de Instagram com a maquete maquete_publicacao_SPAL.png, legenda, CTA "Onde comprar →", botão "ver alt text".

A bio, antes e depois (E) — ao clicar em "depois", o texto reescreve-se letra a letra até 141/150 caracteres.

A Inês pergunta (E) — a bolha "Gostei desta peça, mas não consigo perceber onde a posso comprar…" e a resposta da SPAL a aparecer como se estivesse a ser escrita, com os pontos de venda reais.

E se fosse a sério? Os números (F · marca X) — "O Instagram atrai. O Facebook vende." Funil animado de duas colunas, três duelos (CTR 3,0 vs 2,5 % · conversão 2,5 vs 5,0 % · ROAS 4 vs 8), cartão que vira "ROAS 8 → não é lucro".

Como saberemos que resultou (F · indicadores) — três medidores com limiares (cliques em Onde comprar 2 % / 5 %; respostas em 24 h 80 % / 95 %; rejeição móvel −10 pontos), etiqueta "a medir".

A Inês, 20 minutos depois — a Inês recebe a resposta da SPAL no Instagram, com a loja mais perto e o horário. Cronómetro para. Frase final: "A SPAL precisa de falar com a Inês antes que a Vista Alegre o faça por ela — em Alcobaça."

Bastidores — fontes (spal.pt, LinkedIn SPAL, Instagram e Facebook de ambas, vistaalegre.com/pt e store locator, resultados VAA 1.º semestre 2026, notícias do outlet de Alcobaça e da coleção Niemeyer) e declaração: "Utilização de IA: Claude apoiou a leitura das páginas públicas, cálculos, estrutura e redação; observações verificadas e capturas próprias; interpretações e propostas da formanda."

Cria a estrutura completa com placar, cronómetro, lightbox, transições de ato e animações a funcionar já na capa e nos capítulos 1, 2, 6, 7 e 12. Os restantes ficam com título e uma linha "conteúdo a seguir".

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://spalxvistaalegre.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/71dca56c-d39e-48bb-b7a3-c7335e66dba7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
