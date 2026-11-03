const menu = document.getElementById('menu-principal');
const botaoMenu = document.getElementById('alternar-menu');


function alternarMenu() {
  const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
  botaoMenu.setAttribute('aria-expanded', String(!aberto));
  menu.classList.toggle('hidden', aberto);
  menu.classList.toggle('flex', !aberto);
}
botaoMenu.addEventListener('click', alternarMenu);
menu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    botaoMenu.setAttribute('aria-expanded', 'false');
    menu.classList.add('hidden');
    menu.classList.remove('flex');
  });
});

const faixa = document.getElementById('faixa-slides');
const slides = document.querySelectorAll('[data-slide]');
const indicadores = document.querySelectorAll('[data-ir-slide]');
let slideAtual = 0;


function mostrarSlide(numero) {
  slideAtual = (numero + slides.length) % slides.length;
  faixa.style.transform = 'translateX(-' + slideAtual * 100 + '%)';
  slides.forEach(function (slide, indice) {
    slide.setAttribute('aria-hidden', String(indice !== slideAtual));
  });
  indicadores.forEach(function (botao, indice) {
    const ativo = indice === slideAtual;
    botao.setAttribute('aria-current', String(ativo));
    botao.classList.toggle('bg-purple-700', ativo);
    botao.classList.toggle('bg-purple-200', !ativo);
  });
}
document.getElementById('slide-anterior').addEventListener('click', function () { mostrarSlide(slideAtual - 1); });
document.getElementById('slide-proximo').addEventListener('click', function () { mostrarSlide(slideAtual + 1); });
indicadores.forEach(function (botao) {
  botao.addEventListener('click', function () { mostrarSlide(Number(botao.dataset.irSlide)); });
});

const modal = document.getElementById('modal-produto');
const peca = document.getElementById('peca');
let produtoAtual = '';


function abrirProduto(produto) {
  produtoAtual = produto.dataset.produto;
  document.getElementById('titulo-modal-produto').textContent = produto.querySelector('h3').textContent;
  document.getElementById('descricao-modal-produto').textContent = produto.querySelector('[data-descricao]').textContent;
  document.getElementById('preco-modal-produto').textContent = produto.querySelector('[data-preco]').textContent;
  document.getElementById('imagem-modal-produto').src = produto.querySelector('img').src;
  document.getElementById('imagem-modal-produto').alt = produto.querySelector('img').alt;
  modal.showModal();
}
document.querySelectorAll('[data-produto]').forEach(function (produto) {
  produto.querySelector('button').addEventListener('click', function () { abrirProduto(produto); });
});
document.getElementById('fechar-modal-produto').addEventListener('click', function () { modal.close(); });
modal.addEventListener('click', function (evento) { if (evento.target === modal) modal.close(); });
document.getElementById('orcamento-produto').addEventListener('click', function () {
  peca.value = produtoAtual;
  modal.close();
  peca.focus();
});
document.getElementById('formulario-orcamento').addEventListener('submit', function (evento) {
  evento.preventDefault();
  document.getElementById('retorno-orcamento').textContent = 'Orçamento revisado para: ' + peca.options[peca.selectedIndex].text + '.';
});
