# Perguntas da audiência com resposta por IA

## Objetivo
Adicionar aos controlos da apresentação um botão de perguntas que abre um painel discreto. O apresentador escreve uma pergunta e recebe uma resposta curta, em português, baseada apenas nos dados e conclusões do deck.

## Implementação
- Criar uma função segura no servidor para enviar a pergunta ao Lovable AI, mantendo a chave fora do navegador.
- Fornecer ao modelo um resumo factual completo da apresentação e instruí-lo a não inventar dados; quando a resposta não estiver no deck, deverá indicá-lo claramente.
- Usar o modelo `openai/gpt-6-astra` com resposta em streaming no servidor e devolver apenas o texto final conciso.
- Adicionar ao rodapé da apresentação um botão com ícone de pergunta.
- Abrir um painel sobre o slide com campo de texto, botão “Gerar resposta”, estado de espera, erro legível, resposta e opção de fechar.
- Impedir que as teclas usadas para escrever avancem os slides e permitir fechar com Escape.

## Verificação
- Confirmar que o painel abre e fecha sem interferir na navegação.
- Testar uma pergunta real sobre a apresentação através do Lovable AI.
- Verificar a apresentação em ecrã largo e telemóvel, sem sobreposições.
