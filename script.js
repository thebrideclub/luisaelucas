document.addEventListener("DOMContentLoaded", () => {
  // ====== CONTAGEM REGRESSIVA ======
  const destino = new Date("2025-11-22T15:30:00-03:00").getTime();

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  function atualizarContagem() {
    const agora = Date.now();
    const diferenca = destino - agora;

    if (diferenca <= 0) {
      diasEl.textContent = "00";
      horasEl.textContent = "00";
      minutosEl.textContent = "00";
      segundosEl.textContent = "00";
      clearInterval(timer);
      return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    diasEl.textContent = String(dias).padStart(2, "0");
    horasEl.textContent = String(horas).padStart(2, "0");
    minutosEl.textContent = String(minutos).padStart(2, "0");
    segundosEl.textContent = String(segundos).padStart(2, "0");
  }

  atualizarContagem();
  const timer = setInterval(atualizarContagem, 1000);


  // ====== RSVP (Google Apps Script) ======
  const form = document.getElementById('rsvpForm');
  const campoChinelo = document.getElementById('campo-chinelo');
  const presencaRadios = document.querySelectorAll('input[name="presenca"]');

  // Mostra ou esconde o campo do chinelo
  presencaRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'sim' && radio.checked) {
        campoChinelo.style.display = 'block';
      } else {
        campoChinelo.style.display = 'none';
        form.querySelector('textarea[name="mensagem"]').value = '';
      }
    });
  });

  // Envio do formulário
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await fetch('https://script.google.com/macros/s/AKfycbxQX3K5eyoD1NTIKcrw1weTbbh2f83roAACGzSNEiLF/dev', {
        method: 'POST',
        body: formData
      });

      const text = await res.text();
      let data;
      try { 
        data = JSON.parse(text); 
      } catch { 
        data = { result: res.ok ? 'success' : 'error', raw: text }; 
      }

      if (data.result === 'success') {
        alert('RSVP enviado com sucesso!');
        form.reset();
        campoChinelo.style.display = 'none';
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
});
