new bootstrap.Carousel(document.getElementById('carrossel'), { interval: false });

const modal = document.getElementById('modal-produto');
const titulo = document.getElementById('titulo-modal-produto');
const imagem = document.getElementById('imagem-modal-produto');
const campoPeca = document.getElementById('peca');


modal.addEventListener('show.bs.modal', function (evento) {
  const card = evento.relatedTarget.closest('.card');
  titulo.textContent = card.querySelector('h3').textContent;
  imagem.src = card.querySelector('img').src;
  imagem.alt = titulo.textContent;
  document.getElementById('descricao-modal-produto').textContent = card.querySelector('.descricao').textContent;
  document.getElementById('preco-modal-produto').textContent = card.querySelector('.valor').textContent;
});

document.getElementById('orcamento-produto').addEventListener('click', function () {
  campoPeca.value = titulo.textContent;
  modal.addEventListener('hidden.bs.modal', function () { campoPeca.focus(); }, { once: true });
});


const formulario = document.getElementById('formulario-orcamento');
const retorno = document.getElementById('retorno-orcamento');
formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();
  retorno.textContent = 'Orçamento revisado para: ' + campoPeca.value + '.';
  retorno.hidden = false;
});
formulario.addEventListener('input', function () { retorno.hidden = true; });


const menu = document.getElementById('menu-principal');
document.querySelectorAll('#menu-principal a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (menu.classList.contains('show')) bootstrap.Collapse.getInstance(menu).hide();
  });
});
