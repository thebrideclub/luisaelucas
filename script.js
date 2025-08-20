<script>
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

  atualizarContagem();
  setInterval(atualizarContagem, 1000);

</script>

<script>
  const form = document.getElementById('rsvpForm');

  form.addEventListener('submit', e => {
    e.preventDefault();

    fetch('https://script.google.com/macros/s/AKfycbx9Tmo_UrEm_8oc0YvwZ6X1VvdN75KNVG-7O1MsuhkiVvitQ4_Nqi_n6sda9phVYU9Y/exec', {
      method: 'POST',
      body: new FormData(form)
    })
    .then(res => res.json())
    .then(data => {
      if (data.result === 'success') {
        alert('RSVP enviado com sucesso!');
        form.reset();
      } else {
        alert('Ocorreu um erro, tente novamente.');
      }
    })
    .catch(err => alert('Erro: ' + err));
  });
</script>
