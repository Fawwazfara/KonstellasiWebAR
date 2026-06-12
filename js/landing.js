/* =================================================================
   landing.js — Logika landing page
================================================================= */

function buatBintangLanding() {
  const container = document.getElementById('landing-page');
  if (!container) return;

  for (let i = 0; i < 80; i++) {
    const el     = document.createElement('div');
    el.className = 'star-bg';
    const size   = (Math.random() * 2.5 + 0.5).toFixed(1);
    const dur    = (Math.random() * 3 + 1.5).toFixed(1);
    const minOp  = (Math.random() * 0.1).toFixed(2);
    const maxOp  = (Math.random() * 0.5 + 0.4).toFixed(2);
    const delay  = (Math.random() * 3).toFixed(1);
    el.style.cssText = `
      width: ${size}px; height: ${size}px;
      top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
      --dur: ${dur}s; --min-op: ${minOp}; --max-op: ${maxOp}; --delay: ${delay}s;
    `;
    container.appendChild(el);
  }
}

function sembunyikanLanding() {
  const landing = document.getElementById('landing-page');
  landing.classList.add('fade-out');
  setTimeout(() => { landing.style.display = 'none'; }, 650);
  requestAnimationFrame(() => {
    document.getElementById('info-panel').classList.add('visible');
    document.getElementById('hint').classList.add('visible');
    
    const radar = document.getElementById('radar-container');
    if (radar) radar.classList.add('visible');
    
    const btnNv = document.getElementById('btn-nightvision');
    if (btnNv) btnNv.classList.add('visible');
  });
}

function initLanding() {
  buatBintangLanding();

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const btn   = document.getElementById('btn-mulai');
  if (!btn) return;

  btn.addEventListener('click', async function () {

    btn.classList.add('loading');
    btn.textContent = 'Memuat...';

    // iOS: minta izin gyroscope — WAJIB dalam user gesture
    if (isIOS && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const hasil = await DeviceOrientationEvent.requestPermission();
        if (hasil !== 'granted') {
          showStatus('Izin sensor gerak ditolak.', true);
        }
      } catch (e) {
        console.warn('[Landing] iOS gyro permission error:', e);
      }
    }

    // Minta kamera
    btn.textContent = 'Mengakses Kamera...';
    const kameraOke = await startCamera();

    if (!kameraOke) {
      btn.classList.remove('loading');
      btn.textContent = '✦ Coba Lagi';
      return;
    }

    // Inisialisasi gyroscope + kompas setelah user gesture
    // window.initGyroscope didefinisikan di main.js
    if (typeof window.initGyroscope === 'function') {
      window.initGyroscope();
    }

    sembunyikanLanding();

    setTimeout(() => {
      showStatus('✦ Tengadahkan HP ke langit untuk melihat rasi bintang!');
    }, 700);
  });
}