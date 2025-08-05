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

const estadoCarrossel = {};
const intervalosCarrossel = {};

function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    mostrarImagem(modalId, 0);

    // Limpa intervalo anterior se existir
    if (intervalosCarrossel[modalId]) clearInterval(intervalosCarrossel[modalId]);

    // Começa troca automática a cada 3 segundos
    intervalosCarrossel[modalId] = setInterval(() => {
      mudarImagem(modalId, 1);
    }, 3000);
  }
}

function fecharModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';

    // Para o intervalo automático
    if (intervalosCarrossel[modalId]) {
      clearInterval(intervalosCarrossel[modalId]);
      intervalosCarrossel[modalId] = null;
    }
  }
}

function mostrarImagem(modalId, index) {
  const imagens = document.querySelectorAll(`#${modalId} .carousel-img`);
  if (imagens.length === 0) return;

  if (index < 0) index = imagens.length - 1;
  if (index >= imagens.length) index = 0;

  imagens.forEach(img => img.classList.remove('active'));
  imagens[index].classList.add('active');
  estadoCarrossel[modalId] = index;
}

function mudarImagem(modalId, delta) {
  const imagens = document.querySelectorAll(`#${modalId} .carousel-img`);
  if (imagens.length === 0) return;

  const atual = estadoCarrossel[modalId] ?? 0;
  mostrarImagem(modalId, (atual + delta + imagens.length) % imagens.length);
}

// Fecha modal ao clicar fora do conteúdo
window.onclick = function(event) {
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    if (event.target === modal) {
      fecharModal(modal.id);
    }
  });
};


</script>
