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
  });
};
