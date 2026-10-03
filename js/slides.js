/*
 * CONFIGURAÇÃO DOS SLIDES — Beco da Praia
 * ---------------------------------------
 * Este é o único arquivo que você precisa editar para trocar/adicionar produtos.
 *
 * Campos de cada slide:
 *   tema       "amarelo" | "vermelho" | "marrom"  (cor do painel)
 *   selo       texto pequeno no topo (ex.: "Para compartilhar")
 *   titulo     nome grande do produto/oferta
 *   descricao  (opcional) frase curta abaixo do título
 *   imagem     foto principal (caminho relativo ou URL absoluta)
 *   itens      lista de itens do cardápio. O preço do banner é a SOMA de
 *              (preco x qtd) de todos os itens. Use preco: null quando o
 *              preço não for conhecido — o banner mostra "Consulte".
 *              Campos do item: nome (como no cardápio), rotulo (texto exibido,
 *              opcional), preco (número, ex.: 12.00), qtd (padrão 1),
 *              imagem (opcional — aparece como círculo sobre a foto).
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
      id: 'baiao-mix-sertao',
      tema: 'vermelho',
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
      id: 'caipirinha-rapadura',
      tema: 'marrom',
      selo: 'Famosinha do Beco',
      titulo: 'Caipirinha de rapadura',
      descricao: 'Destilado, limão e calda de rapadura, finalizada com raspas de rapadura.',
      imagem: 'assets/img/caipirinha-rapadura.jpg',
      itens: [
        { nome: 'Rapadura', rotulo: 'Caipirinha de rapadura', preco: 34.90 }
      ],
      observacao: 'Happy hour\nqui e sex\n18h–21h\nR$ 29,90'
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
      observacao: 'Happy hour\nqui e sex\n18h–21h\nR$ 19,90'
    },
    {
      id: 'caipirinha-goiabada',
      tema: 'vermelho',
      selo: 'Caipirinhas especiais',
      titulo: 'Caipirinha de goiabada com limão',
      descricao: 'Destilado, calda de goiabada, limão e gelo.',
      imagem: 'assets/img/caipirinha-goiabada.jpg',
      itens: [
        { nome: 'Goiabada com limão', rotulo: 'Caipirinha de goiabada com limão', preco: 34.90 }
      ]
    },
    {
      id: 'carne-de-sol-meia',
      tema: 'marrom',
      selo: 'Porção para dividir',
      titulo: 'Carne de sol com mandioca',
      descricao: 'Meia porção · com queijo coalho, vinagrete e farofa crocante.',
      imagem: 'assets/img/carne-de-sol.jpg',
      itens: [
        { nome: 'Carne de sol (MEIA)', rotulo: 'Meia porção de Carne de sol com mandioca', preco: 59.00 }
      ]
    }
  ]
};
