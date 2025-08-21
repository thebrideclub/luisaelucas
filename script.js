<script>
document.addEventListener('DOMContentLoaded', () => {
  // ====== CONTAGEM REGRESSIVA (evento dia 22/11/2025 às 15:30 em São Paulo) ======
  const destino = new Date('2025-11-22T15:30:00-03:00').getTime();
  const diasEl = document.getElementById('dias');
  const horasEl = document.getElementById('horas');
  const minutosEl = document.getElementById('minutos');
  const segundosEl = document.getElementById('segundos');

  function duasCasas(n) { return String(n).padStart(2, '0'); }

  function atualizarContagem() {
    const agora = Date.now();
    const dif = destino - agora;

    if (dif <= 0) {
      diasEl && (diasEl.textContent = '00');
      horasEl && (horasEl.textContent = '00');
      minutosEl && (minutosEl.textContent = '00');
      segundosEl && (segundosEl.textContent = '00');
      clearInterval(timer);
      return;
    }

    const dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    const horas = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((dif % (1000 * 60)) / 1000);

    diasEl && (diasEl.textContent = duasCasas(dias));
    horasEl && (horasEl.textContent = duasCasas(horas));
    minutosEl && (minutosEl.textContent = duasCasas(minutos));
    segundosEl && (segundosEl.textContent = duasCasas(segundos));
  }

  atualizarContagem();
  const timer = setInterval(atualizarContagem, 1000);

  // ====== RSVP (Google Apps Script) ======
  const form = document.getElementById('rsvpForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbx9Tmo_UrEm_8oc0YvwZ6X1VvdN75KNVG-7O1MsuhkiVvitQ4_Nqi_n6sda9phVYU9Y/exec', {
          method: 'POST',
          body: new FormData(form)
        });

        const text = await res.text(); // pode vir HTML se der erro no GAS
        let data;
        try { data = JSON.parse(text); } catch { data = { result: res.ok ? 'success' : 'error', raw: text }; }

        if (data.result === 'success') {
          alert('RSVP enviado com sucesso!');
          form.reset();
        } else {
          alert('Ocorreu um erro no servidor. Detalhes: ' + (data.raw || text || ''));
          console.error('Resposta do servidor:', text);
        }
      } catch (err) {
        alert('Erro de rede: ' + err.message);
        console.error(err);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  } else {
    console.warn('Formulário #rsvpForm não encontrado no DOM.');
  }
});
</script>
