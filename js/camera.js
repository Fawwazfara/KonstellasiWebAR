/* =================================================================
   camera.js — Akses kamera belakang via getUserMedia
   
   Ekspor fungsi (global, dipanggil oleh landing.js & main.js):
     showStatus(msg, isError)  — tampilkan pesan overlay sementara
     startCamera()             — minta izin + mulai stream kamera
     startCameraFallback()     — fallback tanpa constraint facingMode
================================================================= */

/* -----------------------------------------------------------------
   showStatus()
   Tampilkan pesan di #status-msg.
   Auto-hide setelah 4 detik jika bukan error.
----------------------------------------------------------------- */
function showStatus(msg, isError = false) {
  const el = document.getElementById('status-msg');
  el.textContent = msg;
  el.style.display = 'block';
  el.style.background = isError
    ? 'rgba(160, 20, 20, 0.85)'
    : 'rgba(0, 0, 0, 0.65)';

  if (!isError) {
    setTimeout(() => { el.style.display = 'none'; }, 4000);
  }
}

/* -----------------------------------------------------------------
   startCamera()
   
   Minta kamera belakang (facingMode: 'environment').
   
   Syarat: halaman harus diakses via HTTPS atau localhost.
   getUserMedia di HTTP selain localhost akan langsung ditolak
   browser tanpa munculkan prompt izin sama sekali.
   
   Return: true jika berhasil, false jika gagal.
----------------------------------------------------------------- */
async function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showStatus('Browser tidak mendukung kamera. Gunakan Chrome terbaru.', true);
    return false;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }, // kamera belakang HP
      audio: false
    });

    const video = document.getElementById('webcam');
    video.srcObject = stream;

    // Tunggu metadata video siap sebelum play()
    await new Promise(resolve => { video.onloadedmetadata = resolve; });
    await video.play().catch(e => console.warn('[Camera] play() blocked:', e));

    console.log('[Camera] Stream kamera belakang aktif.');
    return true;

  } catch (err) {
    // OverconstrainedError: facingMode 'environment' tidak tersedia
    // (misal di laptop yang hanya punya webcam depan) → coba fallback
    if (err.name === 'OverconstrainedError') {
      return await startCameraFallback();
    }

    // Error lain: tampilkan pesan yang relevan
    let msg = 'Kamera gagal: ';
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      msg += 'Izin ditolak — buka pengaturan browser, izinkan kamera.';
    } else if (err.name === 'NotFoundError') {
      msg += 'Tidak ada kamera ditemukan di perangkat ini.';
    } else if (err.name === 'NotReadableError') {
      msg += 'Kamera sedang digunakan aplikasi lain.';
    } else {
      msg += err.message;
    }

    showStatus(msg, true);
    console.error('[Camera] getUserMedia error:', err);
    return false;
  }
}

/* -----------------------------------------------------------------
   startCameraFallback()
   
   Dipanggil otomatis jika facingMode 'environment' gagal.
   Mencoba kamera apapun yang tersedia (berguna saat testing
   di laptop yang hanya punya webcam depan).
   
   Return: true jika berhasil, false jika gagal.
----------------------------------------------------------------- */
async function startCameraFallback() {
  console.warn('[Camera] Fallback: mencoba kamera tanpa constraint facingMode.');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    const video = document.getElementById('webcam');
    video.srcObject = stream;

    await new Promise(resolve => { video.onloadedmetadata = resolve; });
    await video.play().catch(() => {});

    showStatus('Kamera aktif (mode fallback — bukan kamera belakang)');
    console.log('[Camera] Fallback stream aktif.');
    return true;

  } catch (e) {
    showStatus('Kamera tidak tersedia di perangkat ini.', true);
    console.error('[Camera] Fallback error:', e);
    return false;
  }
}