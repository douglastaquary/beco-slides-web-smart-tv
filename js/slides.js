/*
 * CONFIGURAÇÃO DOS SLIDES — Beco da Praia
 * ---------------------------------------
 * Este é o único arquivo que você precisa editar para trocar/adicionar produtos.
 *
 * Campos de cada slide:
 *   tema       "amarelo" | "vermelho" | "marrom" | "creme"  (cor do painel)
 *   selo       texto pequeno no topo (ex.: "Para compartilhar")
 *   titulo     nome grande do produto/oferta
 *   subtitulo  (opcional) frase curta logo abaixo do título
 *   descricao  (opcional) frase da faixa inferior (slides de 1 item) ou
 *              abaixo do título (combos, quando não há subtitulo)
 *   imagem     foto principal (caminho relativo ou URL absoluta)
 *   posicaoImagem (opcional) parte da foto que aparece no corte, no formato
 *              CSS object-position (ex.: 'center 40%')
 *   fotoVertical (opcional) true para fotos em pé (ex.: copos de drink): a foto
 *              vira uma coluna alta à direita e o texto fica à esquerda
 *   itens      lista de itens do cardápio. O preço do banner é a SOMA de
 *              (preco x qtd) de todos os itens. Use preco: null quando o
 *              preço não for conhecido — o banner mostra "Consulte".
 *              Campos do item: nome (como no cardápio), rotulo (texto exibido,
 *              opcional), preco (número, ex.: 12.00), qtd (padrão 1),
 *              imagem (opcional — aparece como círculo sobre a foto; com
 *              qtd > 1 o círculo ganha a etiqueta "3x").
 *   precoRotulo  (opcional) texto pequeno acima do preço (ex.: "a partir de")
 *   precoDetalhe (opcional) texto ao lado do preço (ex.: "por pessoa"); use \n
 *   lista      (opcional) tópicos ao lado da foto. Cada tópico é um texto ou
 *              { texto: '...', detalhe: '...' }. Com lista, a foto vira uma
 *              coluna à direita e o preço fica abaixo.
 *   destaque   (opcional) selo grande piscando sobre a foto (ex.: "Novidade")
 *   faixa      (opcional) texto da faixa inferior (substitui o automático)
 *   contato    (opcional) linha de contato no lugar do rodapé; use \n
 *   observacao (opcional) selo redondo de destaque (ex.: happy hour). Use \n
 *              para quebrar linhas; a linha com "R$" aparece maior.
 *
 * Preços conferidos em https://douglastaquary.github.io/beco-da-praia-menu/
 * (sem descontos aplicados — o banner mostra a soma dos preços do cardápio).
 */
window.BECO_CONFIG = {
  // Tempo (segundos) que cada painel fica em um slide. Os dois painéis trocam
  // de forma alternada (um na metade do tempo do outro).
  segundosPorSlide: 8,

  // Zoom lento nas fotos. Desligue (false) se a TV ficar lenta.
  zoomNasFotos: true,

  // Recarrega a página a cada X horas para pegar atualizações (0 = nunca).
  recarregarACadaHoras: 6,

  rodape: 'Imagens ilustrativas. Preços sujeitos a alteração.',

  slides: [
    {
      id: 'feijoada-no-beco',
      tema: 'creme',
      selo: 'Evento especial',
      titulo: 'Feijoada no Beco',
      subtitulo: 'Sábado, 10 de outubro, a partir das 13h',
      imagem: 'assets/img/feijoada-panela.jpg',
      lista: [
        { texto: 'Samba de roda', detalhe: 'com a Resenha do Krill, das 13h às 16h' },
        'Samba ao vivo',
        'Buffet de feijoada à vontade',
        { texto: 'Caipirinha de cachaça dobrada', detalhe: 'limão, abacaxi ou rapadura' }
      ],
      destaque: 'Dose dupla!\nCompre 1,\nganhe outra',
      // Lote da pulseira: troque o rótulo, o preço e a data aqui quando virar o lote.
      precoRotulo: '1º lote · pulseira antecipada',
      precoDetalhe: 'por pessoa\naté o dia 05/10',
      itens: [
        { nome: 'Feijoada no Beco — pulseira 1º lote', preco: 79.90 }
      ],
      faixa: 'Garanta já sua pulseira antecipada!',
      contato: 'Reservas no WhatsApp: 13 99876-2211\nAv. Vicente de Carvalho, 761 - Centro'
    },
    {
      id: 'trio-nordestino',
      tema: 'amarelo',
      selo: 'Para compartilhar',
      titulo: 'Trio Nordestino',
      descricao: 'Serve 2 pessoas',
      imagem: 'assets/img/trio-nordestino.jpg',
      itens: [
        { nome: 'Trio Nordestino (Serve 2 pessoas)', rotulo: 'Trio Nordestino', preco: 99.90 },
        { nome: 'Refrigerantes — Garrafa pet, 600 ml', rotulo: 'Coca-Cola 600 ml', preco: 12.00, imagem: 'assets/img/coca-cola-600.png' },
        // Pudim caseiro não consta no cardápio online: preço informado pelo restaurante.
        { nome: 'Pudim caseiro', rotulo: 'Pudim caseiro', preco: 14.00, imagem: 'assets/img/pudim-caseiro.jpg' }
      ]
    },
    {
      id: 'luar-do-sertao',
      tema: 'vermelho',
      selo: 'Drink especial da casa',
      titulo: 'Luar do Sertão',
      descricao: 'Drink autoral com Aperol, tônica, gelo e rodela de laranja.',
      imagem: 'assets/img/luar-do-sertao.jpg',
      posicaoImagem: 'center 42%',
      destaque: 'Novidade',
      itens: [
        { nome: 'Luar do Sertão', preco: 38.00 }
      ]
    },
    {
      id: 'baiao-mix-sertao',
      tema: 'marrom',
      selo: 'Sabor do sertão',
      titulo: 'Baião à Moda do Cheff + Mix do sertão',
      descricao: 'Baião serve até 3 pessoas',
      imagem: 'assets/img/mix-do-sertao.jpg',
      itens: [
        { nome: 'Baião à Moda do Cheff (Serve até 3 pessoas)', rotulo: 'Baião à Moda do Cheff', preco: 87.00, imagem: 'assets/img/baiao-moda-do-cheff.jpg' },
        { nome: 'Mix do sertão (MEIA)', rotulo: 'Meia tábua Mix do sertão', preco: 55.00 },
        { nome: 'Refrigerantes — Garrafa pet, 600 ml', rotulo: 'Coca-Cola 600 ml', preco: 12.00, imagem: 'assets/img/coca-cola-600.png' }
      ]
    },
    {
      id: 'batidinhas',
      tema: 'amarelo',
      selo: 'As queridinhas da casa',
      titulo: 'Batidinhas',
      subtitulo: 'Vodka, leite condensado, fruta ou paçoca.',
      imagem: 'assets/img/batidinhas.jpg',
      posicaoImagem: '30% center',
      lista: ['Coco', 'Paçoca', 'Maracujá'],
      precoRotulo: 'Cada uma',
      itens: [
        { nome: 'Batidinhas — Coco, paçoca, maracujá', rotulo: 'Batidinha', preco: 15.00 }
      ],
      faixa: 'Coco, paçoca ou maracujá: escolha a sua!'
    },
    {
      id: 'caipirinha-rapadura',
      tema: 'marrom',
      selo: 'Famosinha do Beco',
      titulo: 'Caipirinha de rapadura',
      descricao: 'Destilado, limão e calda de rapadura, finalizada com raspas de rapadura.',
      imagem: 'assets/img/caipirinha-rapadura.jpg',
      itens: [
        { nome: 'Caipirinha de rapadura', preco: 34.90 }
      ],
      fotoVertical: true,
      observacao: 'Happy hour\nqui e sex\n18h–21h\nR$ 29,90'
    },
    {
      id: 'torresmo-heineken',
      tema: 'vermelho',
      selo: 'Pra petiscar',
      titulo: 'Torresmo + 3 Heineken',
      subtitulo: 'Porção de 500 g + 3 Heineken 600 ml',
      imagem: 'assets/img/torresmo.jpg',
      itens: [
        { nome: 'Torresmo — 500 g', rotulo: 'Torresmo 500 g', preco: 45.00 },
        { nome: 'Heineken — Lager, 600 ml', rotulo: 'Heineken 600 ml', preco: 22.00, qtd: 3, imagem: 'assets/img/heineken-long-neck.jpg' }
      ]
    },
    {
      id: 'caipirinha-limao',
      tema: 'amarelo',
      selo: 'Caipirinhas do Beco',
      titulo: 'Caipirinha de limão',
      descricao: 'Cachaça, limão-tahiti e açúcar.',
      imagem: 'assets/img/caipirinha-limao.jpg',
      itens: [
        { nome: 'Tradicional', rotulo: 'Caipirinha de limão', preco: 24.90 }
      ],
      fotoVertical: true,
      observacao: 'Happy hour\nqui e sex\n18h–21h\nR$ 19,90'
    },
    {
      id: 'caldo-de-mocoto',
      tema: 'marrom',
      selo: 'Para esquentar',
      titulo: 'Caldo de mocotó',
      subtitulo: 'Tradicional e encorpado, com mocotó cozido lentamente e temperos especiais.',
      descricao: 'Sem arroz R$ 22,90 · Com arroz R$ 26,00',
      imagem: 'assets/img/caldo-de-mocoto.jpg',
      posicaoImagem: 'center 40%',
      precoRotulo: 'A partir de',
      itens: [
        { nome: 'Mocotó (Prato individual) — sem arroz', rotulo: 'Caldo de mocotó', preco: 22.90 }
      ]
    },
    {
      id: 'caipirinha-goiabada',
      tema: 'vermelho',
      selo: 'Drinks da casa',
      titulo: 'Caipirinha de goiabada com limão',
      descricao: 'Destilado, calda de goiabada, limão e gelo.',
      imagem: 'assets/img/caipirinha-goiabada.jpg',
      itens: [
        { nome: 'Goiabada com limão', rotulo: 'Caipirinha de goiabada com limão', preco: 34.90 }
      ]
    },
    {
      id: 'carne-de-sol-meia',
      tema: 'amarelo',
      selo: 'Porção para dividir',
      titulo: 'Carne de sol com mandioca',
      descricao: 'Meia porção · com queijo coalho, vinagrete e farofa crocante.',
      imagem: 'assets/img/carne-de-sol.jpg',
      itens: [
        { nome: 'Carne de sol (MEIA)', rotulo: 'Meia porção de Carne de sol com mandioca', preco: 65.00 }
      ]
    },
    {
      id: 'cachacas-piauienses',
      tema: 'marrom',
      selo: 'Orgulho piauiense',
      titulo: 'Prove nossas cachaças piauienses!',
      imagem: 'assets/img/cachacas-piaui.jpg',
      lista: [
        { texto: 'Lira Amburana', detalhe: 'Amarante · dose R$ 29,00' },
        { texto: 'Lira Ouro', detalhe: 'dose R$ 25,00' },
        { texto: 'Mangueira', detalhe: 'Castelo do Piauí · dose R$ 15,00' }
      ],
      precoRotulo: 'Dose a partir de',
      itens: [
        { nome: 'Mangueira — dose', rotulo: 'Dose de cachaça piauiense', preco: 15.00 }
      ],
      faixa: 'Experimente uma dose ou leve para casa!'
    }
  ]
};
