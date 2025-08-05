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
}


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
  }, 2000);
}

  });
};


</script>
