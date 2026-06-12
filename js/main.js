/* =================================================================
   main.js — Kompas fungsional, scene rotation di-disable dulu
   untuk debug: pastikan bintang muncul dulu
================================================================= */

/* -----------------------------------------------------------------
   tampilkanKalibrasiAndroid()
   Kompas SVG fungsional — jarum berputar sesuai sensor
----------------------------------------------------------------- */
function tampilkanKalibrasiAndroid() {
  return new Promise(resolve => {

    const overlay = document.createElement('div');
    overlay.id = 'kalibrasi-overlay';
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 2000;
      background: linear-gradient(160deg, #0a0a1a, #0d1b3e);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center; padding: 32px 24px;
      font-family: sans-serif; color: #fff;
    `;

    overlay.innerHTML = `
      <h2 style="font-size:20px;font-weight:700;margin-bottom:8px;">Kalibrasi Arah Utara</h2>
      <p style="font-size:13px;color:rgba(200,220,255,0.8);max-width:280px;margin-bottom:28px;line-height:1.6;">
        Putar HP hingga huruf <strong style="color:#7ec8ff;">N</strong> pada kompas menunjuk ke atas, lalu tekan tombol.
      </p>

      <div style="position:relative;width:200px;height:200px;margin-bottom:28px;">
        <!-- Ring & label statis -->
        <svg width="200" height="200" viewBox="0 0 200 200" style="position:absolute;top:0;left:0;">
          <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(126,200,255,0.3)" stroke-width="2"/>
          <circle cx="100" cy="100" r="85" fill="rgba(10,14,42,0.8)" stroke="rgba(126,200,255,0.15)" stroke-width="1"/>
          <line x1="100" y1="8" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" transform="rotate(0   100 100)"/>
          <line x1="100" y1="8" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" transform="rotate(45  100 100)"/>
          <line x1="100" y1="8" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" transform="rotate(90  100 100)"/>
          <line x1="100" y1="8" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" transform="rotate(135 100 100)"/>
          <line x1="100" y1="8" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" transform="rotate(180 100 100)"/>
          <line x1="100" y1="8" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" transform="rotate(225 100 100)"/>
          <line x1="100" y1="8" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" transform="rotate(270 100 100)"/>
          <line x1="100" y1="8" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" transform="rotate(315 100 100)"/>
          <text x="100" y="32"  text-anchor="middle" fill="#7ec8ff"              font-size="14" font-weight="bold">N</text>
          <text x="100" y="178" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="11">S</text>
          <text x="172" y="104" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="11">E</text>
          <text x="28"  y="104" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="11">W</text>
        </svg>

        <!-- Jarum — dirotasi JS -->
        <svg id="jarum-kompas" width="200" height="200" viewBox="0 0 200 200"
             style="position:absolute;top:0;left:0;transition:transform 0.15s ease;">
          <polygon points="100,28 106,100 100,112 94,100" fill="#ff4444" opacity="0.9"/>
          <polygon points="100,172 106,100 100,112 94,100" fill="rgba(255,255,255,0.5)"/>
          <circle cx="100" cy="100" r="6" fill="#fff"/>
          <circle cx="100" cy="100" r="3" fill="#0a0e2a"/>
        </svg>
      </div>

      <p id="txt-heading" style="font-size:13px;color:rgba(150,200,255,0.7);margin-bottom:24px;min-height:20px;">
        Menunggu sensor...
      </p>

      <button id="btn-konfirmasi-utara" style="
        font-size:15px;font-weight:700;color:#0a0e2a;
        background:linear-gradient(135deg,#7ec8ff,#b8a0ff);
        border:none;border-radius:50px;padding:14px 36px;cursor:pointer;
        box-shadow:0 0 20px rgba(126,200,255,0.35);
        opacity:0.5;transition:opacity 0.3s ease;
      " disabled>✦ Saya Sudah Menghadap Utara</button>

      <p style="font-size:10px;color:rgba(150,180,220,0.4);margin-top:14px;">
        Tombol aktif saat jarum N menunjuk ke atas (±20°)
      </p>
    `;

    document.body.appendChild(overlay);

    let alphaSnapshot = null;

    function onOrientation(event) {
      if (event.alpha === null || event.alpha === undefined) return;

      // heading = arah HP dari Utara (0=Utara, 90=Timur, dst)
      const heading = (360 - event.alpha) % 360;
      alphaSnapshot = event.alpha;

      // Putar jarum: saat heading=0 (menghadap Utara), jarum tidak perlu rotasi
      const jarumEl = document.getElementById('jarum-kompas');
      if (jarumEl) jarumEl.style.transform = `rotate(${-heading}deg)`;

      // Label heading
      const labels = ['U','TL','T','TG','S','BD','B','BL'];
      const idx    = Math.round(heading / 45) % 8;
      const txtEl  = document.getElementById('txt-heading');
      if (txtEl) txtEl.textContent = `${Math.round(heading)}° — ${labels[idx]}`;

      // Aktifkan tombol jika ±20° dari Utara
      const dekatUtara = heading <= 20 || heading >= 340;
      const btnEl = document.getElementById('btn-konfirmasi-utara');
      if (btnEl) {
        btnEl.disabled     = !dekatUtara;
        btnEl.style.opacity = dekatUtara ? '1' : '0.5';
      }
    }

    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', onOrientation, true);
    } else {
      window.addEventListener('deviceorientation', onOrientation, true);
    }

    document.getElementById('btn-konfirmasi-utara').addEventListener('click', () => {
      window.removeEventListener('deviceorientationabsolute', onOrientation, true);
      window.removeEventListener('deviceorientation',         onOrientation, true);

      // Simpan alpha saat menghadap Utara
      window._alphaUtara = alphaSnapshot || 0;
      console.log(`[Compass] Alpha saat Utara: ${window._alphaUtara.toFixed(1)}°`);

      overlay.style.transition = 'opacity 0.5s ease';
      overlay.style.opacity    = '0';
      setTimeout(() => overlay.remove(), 550);

      resolve();
    });
  });
}

/* -----------------------------------------------------------------
   initGyroscope()
----------------------------------------------------------------- */
async function initGyroscope() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (!isIOS) {
    await tampilkanKalibrasiAndroid();
    showStatus('Kalibrasi selesai ✓');
  }
  // iOS: tidak perlu kalibrasi manual, webkitCompassHeading sudah absolut
}

window.initGyroscope = initGyroscope;

/* -----------------------------------------------------------------
   Gaze Tracker — Pelacakan arah kamera untuk memperbarui edu-card & radar
----------------------------------------------------------------- */
let currentActiveConstId = null;

function updateGazeTracker() {
  const cameraEl = document.querySelector('a-camera');
  const sceneEl = document.querySelector('a-scene');
  if (!cameraEl || !sceneEl || !sceneEl.hasLoaded) {
    requestAnimationFrame(updateGazeTracker);
    return;
  }

  // Putar Radar HUD sesuai rotasi Y kamera
  const heading = cameraEl.getAttribute('rotation').y || 0;
  const radarRing = document.getElementById('radar-ring');
  if (radarRing) {
    radarRing.style.transform = `rotate(${-heading}deg)`;
  }

  const camera3D = cameraEl.object3D;
  if (!camera3D) {
    requestAnimationFrame(updateGazeTracker);
    return;
  }

  // Arah hadap kamera (maju = -Z)
  const cameraDirection = new THREE.Vector3(0, 0, -1);
  cameraDirection.applyQuaternion(camera3D.quaternion);

  let closestConstId = null;
  let minAngle = Infinity;

  const constIds = ['obj-sagittarius', 'obj-orion', 'obj-scorpius', 'obj-crux'];

  constIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    // Cek visibilitas rasi bintang
    const isVisible = el.getAttribute('visible');
    if (isVisible === 'false' || isVisible === false) return;

    const constPos = new THREE.Vector3();
    el.object3D.getWorldPosition(constPos);

    // Hitung sudut (angle) antara arah hadap kamera dan posisi rasi bintang
    const toConst = constPos.clone().normalize();
    const angle = cameraDirection.angleTo(toConst); // dalam radian

    if (angle < minAngle) {
      minAngle = angle;
      closestConstId = id;
    }
  });

  // Threshold: sekitar 35 derajat (~0.6 radian)
  const GAZE_THRESHOLD = 0.6;
  if (closestConstId && minAngle < GAZE_THRESHOLD) {
    if (currentActiveConstId !== closestConstId) {
      currentActiveConstId = closestConstId;
      if (typeof tampilkanEduCard === 'function') {
        tampilkanEduCard(closestConstId);
      }
    }
  } else {
    // Sembunyikan edu-card jika melihat ke langit kosong
    if (currentActiveConstId !== null) {
      currentActiveConstId = null;
      const card = document.getElementById('edu-card');
      if (card) card.classList.remove('visible');
    }
  }

  requestAnimationFrame(updateGazeTracker);
}

/* -----------------------------------------------------------------
   Night Vision — Toggle filter teropong malam
----------------------------------------------------------------- */
function initNightVision() {
  const btn = document.getElementById('btn-nightvision');
  const overlay = document.getElementById('scope-overlay');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    document.body.classList.toggle('green-vision-active');
    overlay.classList.toggle('active');
  });
}

/* -----------------------------------------------------------------
   Init
----------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLanding();
  initNightVision();
});

document.querySelector('a-scene').addEventListener('loaded', () => {
  terapkanMusimLangit();
  updateGazeTracker();
});