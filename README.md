# Beco da Praia — Painel de Ofertas para Smart TV

Carrossel de ofertas (digital signage) para rodar no navegador da Smart TV Samsung 55" (Tizen),
simulando duas telas verticais lado a lado, no estilo dos painéis de fast-food em estações de metrô.

- HTML/CSS/JavaScript puro (ES5), **sem build** — basta hospedar os arquivos estáticos.
- Layout em 1920x1080 que se ajusta automaticamente a qualquer resolução 16:9 (inclusive 3840x2160).
- Os dois painéis trocam de produto a cada 8 s, de forma alternada (um troca 4 s depois do outro).
- Sem cursor, sem barras de rolagem; animações apenas com `transform`/`opacity` (leves para TVs).
- Imagens, logo e preços vêm do cardápio: https://douglastaquary.github.io/beco-da-praia-menu/

## Estrutura

```
index.html            página única
css/style.css         visual (cenário, telas, temas de cor, animações)
js/slides.js          >>> CONFIGURAÇÃO DOS SLIDES (edite aqui) <<<
js/app.js             lógica do carrossel
assets/img/           fotos dos produtos e logo (copiadas e otimizadas do repositório do cardápio)
assets/fonts/         fontes Anton e Baloo 2 (locais, não dependem de internet externa)
screenshots/          capturas de referência em 1920x1080 (painel-slides-N-M.png = slides N e N+1)
```

## Rodar localmente

```bash
cd beco-slides-web-smart-tv
python3 -m http.server 8000
```

Abra http://localhost:8000 no navegador. Para simular a TV, deixe a janela em tela cheia (F11).

Parâmetros úteis na URL (para pré-visualizar):

- `?inicio=3` — começa pelo 3º slide.
- `?pausado=1` — não troca sozinho (bom para conferir um slide). Ex.: `?inicio=5&pausado=1`.

## Editar / adicionar slides

Tudo fica em `js/slides.js`. Cada slide é um bloco `{ ... }` dentro de `slides: [ ... ]`:

```js
{
  id: 'meu-produto',
  tema: 'amarelo',              // 'amarelo' | 'vermelho' | 'marrom' | 'creme'
  selo: 'Novidade',             // etiqueta no topo
  titulo: 'Nome do produto',
  descricao: 'Frase curta.',    // aparece na faixa inferior (ou abaixo do título em combos)
  imagem: 'assets/img/minha-foto.jpg',
  itens: [
    { nome: 'Nome no cardápio', rotulo: 'Texto exibido', preco: 29.90 },
    { nome: 'Refrigerantes — Garrafa pet, 600 ml', rotulo: 'Coca-Cola 600 ml', preco: 12.00,
      imagem: 'assets/img/coca-cola-600.png' }   // itens com imagem aparecem em círculos
  ],
  observacao: 'Happy hour\nqui e sex\n18h–21h\nR$ 19,90'   // opcional: selo redondo
}
```

Campos opcionais para layouts especiais (todos em `js/slides.js`):

| Campo | O que faz |
| --- | --- |
| `tema: 'creme'` | Fundo creme com título vermelho (usado no slide de evento). |
| `subtitulo` | Frase curta logo abaixo do título (em qualquer slide). |
| `precoRotulo` | Texto pequeno acima do preço (ex.: `'A partir de'`, `'1º lote · pulseira antecipada'`). |
| `precoDetalhe` | Texto ao lado do preço; `\n` quebra linha (ex.: `'por pessoa\naté o dia 05/10'`). |
| `lista` | Tópicos ao lado da foto: `['Coco', 'Paçoca']` ou `[{ texto: 'Samba ao vivo', detalhe: '13h às 16h' }]`. Com lista, a foto vira coluna à direita e o preço fica abaixo. Tópicos curtos aparecem maiores. |
| `destaque` | Selo grande e pulsante sobre a foto (ex.: `'Novidade'`, `'Dose dupla!\nCompre 1,\nganhe outra'`). |
| `faixa` | Texto da faixa inferior (substitui o automático). |
| `contato` | Linha(s) de contato no lugar do rodapé (ex.: WhatsApp e endereço). |
| item `qtd` + `imagem` | Itens com `qtd > 1` e imagem mostram a etiqueta "3x" no círculo. |

Exemplo — evento com lote de pulseira (para virar o lote, edite só `precoRotulo`, `precoDetalhe` e `preco`):

```js
{
  id: 'feijoada-no-beco',
  tema: 'creme',
  selo: 'Evento especial',
  titulo: 'Feijoada no Beco',
  subtitulo: 'Sábado, 10 de outubro, a partir das 13h',
  imagem: 'assets/img/feijoada-panela.jpg',
  lista: [{ texto: 'Samba de roda', detalhe: 'com a Resenha do Krill, das 13h às 16h' }, 'Samba ao vivo'],
  destaque: 'Dose dupla!\nCompre 1,\nganhe outra',
  precoRotulo: '1º lote · pulseira antecipada',
  precoDetalhe: 'por pessoa\naté o dia 05/10',
  itens: [{ nome: 'Feijoada no Beco — pulseira 1º lote', preco: 79.90 }],
  faixa: 'Garanta já sua pulseira antecipada!',
  contato: 'Reservas no WhatsApp: 13 99876-2211\nAv. Vicente de Carvalho, 761 - Centro'
}
```

- O preço grande do banner é a **soma** de `preco x qtd` de todos os itens (sem descontos).
- Use `preco: null` se não souber o preço: o banner mostra "Consulte".
- Com mais de um item, a faixa inferior lista os itens ("A + B + C").
- Outras opções no topo do arquivo: `segundosPorSlide`, `zoomNasFotos` (desligue se a TV ficar lenta),
  `recarregarACadaHoras` e `rodape`.
- Fotos em pé (ex.: copos de drink): use `fotoVertical: true` — a foto vira uma coluna alta à direita.
  Para escolher a parte da foto que aparece no corte, use `posicaoImagem: 'center 40%'`.
- Fotos novas: coloque em `assets/img/` (de preferência JPG com até ~1100 px no maior lado).
- Depois de editar CSS/JS, aumente o número `?v=` em `index.html` para a TV não usar o cache antigo.

## Publicar no GitHub Pages

1. Envie esta pasta para um repositório no GitHub (ex.: `beco-slides-web-smart-tv`).
2. No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**,
   escolha a branch `main` e a pasta `/ (root)`.
3. Após alguns minutos o painel fica em:
   `https://<seu-usuario>.github.io/beco-slides-web-smart-tv/`
   (ex.: `https://douglastaquary.github.io/beco-slides-web-smart-tv/`).

O arquivo `.nojekyll` já está incluído para o GitHub Pages servir os arquivos sem processamento.

## Abrir na Smart TV Samsung (Tizen)

1. Conecte a TV ao Wi-Fi.
2. Abra o app **Internet** (navegador da Samsung).
3. Digite a URL do GitHub Pages e adicione aos **Favoritos** para abrir rápido nas próximas vezes.
4. Use o menu do navegador para entrar em **tela cheia** (ou aperte **OK/Enter** no controle — o painel
   tenta ativar o modo tela cheia quando o navegador permite).
5. Setas **← / →** do controle voltam/avançam os slides manualmente.
6. Recomendado nas configurações da TV: desativar protetor de tela / economia de energia e o
   desligamento automático, para o painel ficar ligado o dia todo.

A página se recarrega sozinha a cada 6 horas (configurável) para pegar alterações publicadas.
