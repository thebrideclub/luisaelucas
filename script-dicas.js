function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = 'block';
  mostrarImagem(modalId, 0);
  estadoCarrossel[modalId] = 0;

  if (intervalosCarrossel[modalId]) clearInterval(intervalosCarrossel[modalId]);

  // Troca automática a cada 3 segundos
  intervalosCarrossel[modalId] = setInterval(() => {
    mudarImagem(modalId, 1);
  }, 3000);
}

  });
};
