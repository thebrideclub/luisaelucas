const destino = new Date("2025-11-22T00:00:00").getTime();

function atualizarContagem() {
  const agora = new Date().getTime();
  const diferenca = destino - agora;

  if (diferenca < 0) return;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias.toString().padStart(2, '0');
  document.getElementById("horas").textContent = horas.toString().padStart(2, '0');
  document.getElementById("minutos").textContent = minutos.toString().padStart(2, '0');
  document.getElementById("segundos").textContent = segundos.toString().padStart(2, '0');
}

// Atualiza a contagem a cada segundo agora
atualizarContagem();
setInterval(atualizarContagem, 1000);

////modal
<script>
function mudarSlide(n, modalId) {
  const slides = document.querySelectorAll('.carousel-img.modal' + modalId);
  let indexAtual = [...slides].findIndex(slide => slide.classList.contains('active'));

  slides[indexAtual].classList.remove('active');
  let novoIndex = (indexAtual + n + slides.length) % slides.length;
  slides[novoIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  // Garante que todos os primeiros slides fiquem ativos
  for (let i = 1; i <= 4; i++) {
    const firstSlide = document.querySelector('.carousel-img.modal' + i);
    if (firstSlide) firstSlide.classList.add('active');
  }
});
function abrirModal(idModal, imagens) {
  const modal = document.getElementById(idModal);
  modal.style.display = "block";

  // Configura carrossel
  const carrossel = modal.querySelector(".carrossel-imagens");
  if (carrossel) {
    let indice = 0;
    const imgTag = carrossel.querySelector("img");

    function mostrarImagem() {
      imgTag.src = imagens[indice];
    }

    carrossel.querySelector(".anterior").onclick = () => {
      indice = (indice - 1 + imagens.length) % imagens.length;
      mostrarImagem();
    };

    carrossel.querySelector(".proximo").onclick = () => {
      indice = (indice + 1) % imagens.length;
      mostrarImagem();
    };

    mostrarImagem(); // Mostra imagem inicial
  }
}

function fecharModal(idModal) {
  const modal = document.getElementById(idModal);
  modal.style.display = "none";
}
function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    mostrarImagem(modalId, 0); // sempre começa na primeira imagem
  }
}

function fecharModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

const estadoCarrossel = {};

function mostrarImagem(modalId, index) {
  const imagens = document.querySelectorAll(`#${modalId} .carousel-img`);
  if (!estadoCarrossel[modalId]) {
    estadoCarrossel[modalId] = 0;
  }

  if (index < 0) index = imagens.length - 1;
  if (index >= imagens.length) index = 0;

  imagens.forEach(img => img.classList.remove('active'));
  imagens[index].classList.add('active');
  estadoCarrossel[modalId] = index;
}

function mudarImagem(modalId, delta) {
  const total = document.querySelectorAll(`#${modalId} .carousel-img`).length;
  const atual = estadoCarrossel[modalId] || 0;
  mostrarImagem(modalId, (atual + delta + total) % total);
}

</script>
