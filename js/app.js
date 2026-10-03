/* Painel de ofertas Beco da Praia — ES5 puro para rodar em navegadores Tizen antigos. */
(function () {
  'use strict';

  var config = window.BECO_CONFIG || { slides: [] };
  var slides = config.slides || [];
  var LOGO = 'assets/img/logo-beco-black.png';
  var DURACAO_TRANSICAO = 1100;

  var telas = [
    document.querySelector('#tela-esquerda .tela-conteudo'),
    document.querySelector('#tela-direita .tela-conteudo')
  ];
  var exibindo = [null, null];
  var passo = 1;
  var timer = null;

  function ajustarEscala() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight;
    var escala = Math.min(w / 1920, h / 1080);
    document.documentElement.style.fontSize = (10 * escala) + 'px';
  }

  function mod(x, n) {
    return ((x % n) + n) % n;
  }

  function escapar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function totalEmCentavos(slide) {
    var total = 0;
    var itens = slide.itens || [];
    for (var i = 0; i < itens.length; i++) {
      var item = itens[i];
      if (typeof item.preco !== 'number') return null;
      total += Math.round(item.preco * 100) * (item.qtd || 1);
    }
    return itens.length ? total : null;
  }

  function separarMilhar(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function htmlPreco(centavos) {
    if (centavos === null) {
      return '<div class="preco preco--consulte"><span class="preco-consulte">Consulte</span></div>';
    }
    var reais = Math.floor(centavos / 100);
    var cents = centavos % 100;
    return '<div class="preco">' +
      '<span class="preco-moeda">R$</span>' +
      '<span class="preco-inteiro">' + separarMilhar(reais) + '</span>' +
      '<span class="preco-centavos">,' + (cents < 10 ? '0' : '') + cents + '</span>' +
      '</div>';
  }

  function textoFaixa(slide) {
    var itens = slide.itens || [];
    if (itens.length > 1) {
      var partes = [];
      for (var i = 0; i < itens.length; i++) {
        var qtd = itens[i].qtd || 1;
        partes.push((qtd > 1 ? qtd + 'x ' : '') + escapar(itens[i].rotulo || itens[i].nome));
      }
      return partes.join(' <b>+</b> ');
    }
    return escapar(slide.descricao || '');
  }

  function htmlObservacao(texto) {
    var linhas = String(texto).split('\n');
    for (var i = 0; i < linhas.length; i++) {
      linhas[i] = linhas[i].indexOf('R$') !== -1
        ? '<strong class="obs-preco">' + escapar(linhas[i]) + '</strong>'
        : escapar(linhas[i]);
    }
    return '<div class="observacao"><span>' + linhas.join('<br>') + '</span></div>';
  }

  function htmlExtras(slide) {
    var itens = slide.itens || [];
    var html = '';
    for (var i = 0; i < itens.length; i++) {
      if (!itens[i].imagem) continue;
      html += '<div class="extra"><img src="' + escapar(itens[i].imagem) + '" alt=""></div>';
    }
    return html ? '<div class="extras">' + html + '</div>' : '';
  }

  function criarSlide(slide) {
    var el = document.createElement('div');
    var combo = (slide.itens || []).length > 1;
    var titulo = slide.titulo || '';
    var classeTitulo = 'titulo' + (titulo.length > 24 ? ' titulo--longo' : '');

    var extras = htmlExtras(slide);
    el.className = 'slide tema-' + (slide.tema || 'amarelo') +
      (config.zoomNasFotos === false ? '' : ' com-zoom') +
      (extras ? ' com-extras' : '');
    el.innerHTML =
      '<div class="slide-topo">' +
        '<span class="selo">' + escapar(slide.selo || '') + '</span>' +
        '<div class="logo-badge"><img src="' + LOGO + '" alt="Beco da Praia"></div>' +
      '</div>' +
      '<h1 class="' + classeTitulo + '">' + escapar(titulo) + '</h1>' +
      (combo && slide.descricao ? '<p class="subtitulo">' + escapar(slide.descricao) + '</p>' : '') +
      htmlPreco(totalEmCentavos(slide)) +
      '<div class="foto">' +
        '<div class="foto-moldura"><img class="foto-img" src="' + escapar(slide.imagem || '') + '" alt=""></div>' +
        extras +
        (slide.observacao ? htmlObservacao(slide.observacao) : '') +
      '</div>' +
      '<div class="faixa">' + textoFaixa(slide) + '</div>' +
      '<p class="rodape">' + escapar(config.rodape || '') + '</p>';

    var imgs = el.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].onerror = function () {
        this.style.visibility = 'hidden';
        if (this.parentNode) this.parentNode.className += ' sem-imagem';
      };
    }
    return el;
  }

  function mostrar(indiceTela, indiceSlide) {
    var container = telas[indiceTela];
    var slide = slides[indiceSlide];
    if (!container || !slide || exibindo[indiceTela] === indiceSlide) return;
    exibindo[indiceTela] = indiceSlide;

    var anteriores = container.querySelectorAll('.slide');
    for (var i = 0; i < anteriores.length; i++) {
      (function (antigo) {
        antigo.className = antigo.className.replace(' ativo', '') + ' saindo';
        setTimeout(function () {
          if (antigo.parentNode) antigo.parentNode.removeChild(antigo);
        }, DURACAO_TRANSICAO);
      })(anteriores[i]);
    }

    var novo = criarSlide(slide);
    container.appendChild(novo);
    void novo.offsetWidth;
    setTimeout(function () {
      novo.className += ' ativo';
    }, 30);
  }

  // No passo P, a tela (P % 2) mostra o slide P e a outra tela mostra o slide P-1.
  function aplicarPasso() {
    var n = slides.length;
    if (!n) return;
    var telaAtual = mod(passo, 2);
    mostrar(1 - telaAtual, mod(passo - 1, n));
    mostrar(telaAtual, mod(passo, n));
  }

  function agendar() {
    clearTimeout(timer);
    var meio = Math.max(2, (config.segundosPorSlide || 8)) * 1000 / 2;
    timer = setTimeout(function () {
      passo++;
      aplicarPasso();
      agendar();
    }, meio);
  }

  function telaCheia() {
    var el = document.documentElement;
    var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;
    if (fn) {
      try { fn.call(el); } catch (e) { /* ignorado */ }
    }
  }

  function onTecla(ev) {
    var codigo = ev.keyCode || ev.which;
    if (codigo === 39) {
      passo++;
    } else if (codigo === 37) {
      passo--;
    } else if (codigo === 13) {
      telaCheia();
      return;
    } else {
      return;
    }
    if (ev.preventDefault) ev.preventDefault();
    aplicarPasso();
    agendar();
  }

  function preCarregar() {
    for (var i = 0; i < slides.length; i++) {
      var urls = [slides[i].imagem];
      var itens = slides[i].itens || [];
      for (var j = 0; j < itens.length; j++) urls.push(itens[j].imagem);
      for (var k = 0; k < urls.length; k++) {
        if (urls[k]) (new Image()).src = urls[k];
      }
    }
  }

  // Parâmetros opcionais de URL: ?inicio=3 (slide inicial, começando em 1) e ?pausado=1
  function parametro(nome) {
    var m = new RegExp('[?&]' + nome + '=([^&#]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function iniciar() {
    ajustarEscala();
    window.addEventListener('resize', ajustarEscala);
    document.addEventListener('keydown', onTecla);
    preCarregar();

    if (!slides.length) return;
    var inicio = parseInt(parametro('inicio'), 10);
    var pausado = parametro('pausado') === '1';
    var primeiro = inicio > 0 ? mod(inicio - 1, slides.length) : 0;
    passo = primeiro + 1;
    if (pausado) agendar = function () {};

    mostrar(mod(passo - 1, 2), primeiro);
    setTimeout(function () {
      mostrar(mod(passo, 2), mod(passo, slides.length));
      agendar();
    }, 600);

    var horas = config.recarregarACadaHoras;
    if (horas && horas > 0) {
      setInterval(function () {
        if (navigator.onLine !== false) window.location.reload();
      }, horas * 3600 * 1000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
