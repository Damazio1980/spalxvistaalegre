# Rosa seco e transições Prezi

## Objetivo
- Substituir todos os destaques dourados por rosa seco, mantendo o azul escuro como cor principal de contraste.
- Recuperar o movimento espacial entre slides, sem mostrar mapa, percurso ou vista geral.

## Alterações
1. Atualizar a cor semântica hoje usada nos elementos dourados para rosa seco em textos, linhas, cartões, placar e indicadores.
2. Atualizar os gráficos para que a série Vista Alegre e todos os realces associados usem o mesmo rosa seco.
3. Remover valores dourados isolados que não estejam a seguir a cor central, garantindo consistência visual em todos os slides.
4. Implementar transições entre slides com zoom, deslocação e profundidade inspiradas no Prezi, usando a posição relativa dos quadros para definir a direção do movimento.
5. Manter apenas a navegação linear por setas, teclado, menu e gesto lateral; não reintroduzir caminho visível, mapa nem vista geral.
6. Respeitar a preferência do dispositivo por movimento reduzido e manter cada transição curta e fluida.

## Validação
- Percorrer a apresentação para confirmar a nova paleta, o placar, os gráficos e as transições.
- Verificar navegação por setas e teclado, enquadramento dos slides e ausência de erros visuais.

## Detalhes técnicos
- O rosa seco será centralizado no token já usado para Vista Alegre, evitando alterações repetidas no futuro.
- A transição será aplicada apenas ao quadro atual, preservando a apresentação linear e sem expor a antiga tela de navegação.
