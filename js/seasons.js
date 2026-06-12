/* =================================================================
   seasons.js — Data musim langit + konten edukasi per rasi
================================================================= */

const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret',    'April',
  'Mei',     'Juni',     'Juli',      'Agustus',
  'September','Oktober', 'November', 'Desember'
];

/* -----------------------------------------------------------------
   DATA EDUKASI per rasi bintang
----------------------------------------------------------------- */
const DATA_EDUKASI = {
  'obj-sagittarius': {
    nama:    'Sagittarius',
    arti:    'Pemanah — dari bahasa Latin',
    bintang: '8 bintang utama',
    jarak:   '143 thn cahaya',
    fakta:   'Pusat Galaksi Bimasakti berada tepat di arah rasi ini',
    warna:   '#FFD700'
  },
  'obj-scorpius': {
    nama:    'Scorpius',
    arti:    'Kalajengking',
    bintang: '18 bintang utama',
    jarak:   '550 thn cahaya (Antares)',
    fakta:   'Antares, bintang paling terang di rasi ini, 700× lebih besar dari Matahari',
    warna:   '#FF7744'
  },
  'obj-orion': {
    nama:    'Orion',
    arti:    'Sang Pemburu — mitologi Yunani',
    bintang: '7 bintang utama',
    jarak:   '860 thn cahaya (Rigel)',
    fakta:   'Betelgeuse di bahu Orion adalah kandidat supernova berikutnya di galaksi kita',
    warna:   '#B0C8FF'
  },
  'obj-crux': {
    nama:    'Crux',
    arti:    'Salib Selatan — dari bahasa Latin',
    bintang: '4 bintang utama',
    jarak:   '320 thn cahaya (Acrux)',
    fakta:   'Digunakan pelaut selama berabad-abad sebagai penunjuk arah Selatan',
    warna:   '#CCE8FF'
  }
};

/* -----------------------------------------------------------------
   MUSIM LANGIT per bulan
----------------------------------------------------------------- */
const MUSIM_LANGIT = {
  0:  { visible: ['obj-orion', 'obj-crux'],
        label: 'Orion & Crux', season: 'Musim Hujan — Langit Barat-Selatan', color: '#B0C8FF' },
  1:  { visible: ['obj-orion', 'obj-crux'],
        label: 'Orion & Crux', season: 'Musim Hujan — Langit Barat-Selatan', color: '#B0C8FF' },
  2:  { visible: ['obj-sagittarius', 'obj-orion', 'obj-scorpius', 'obj-crux'],
        label: 'Semua Rasi (Transisi)', season: 'Peralihan — Langit Penuh', color: '#ffffff' },
  3:  { visible: ['obj-sagittarius', 'obj-orion', 'obj-scorpius', 'obj-crux'],
        label: 'Semua Rasi (Transisi)', season: 'Peralihan — Langit Penuh', color: '#ffffff' },
  4:  { visible: ['obj-sagittarius', 'obj-scorpius'],
        label: 'Sagittarius & Scorpius', season: 'Musim Kemarau — Galaksi Bimasakti', color: '#FFD700' },
  5:  { visible: ['obj-sagittarius', 'obj-scorpius'],
        label: 'Sagittarius & Scorpius', season: 'Musim Kemarau — Galaksi Bimasakti', color: '#FFD700' },
  6:  { visible: ['obj-sagittarius', 'obj-scorpius'],
        label: 'Sagittarius & Scorpius', season: 'Musim Kemarau — Galaksi Bimasakti', color: '#FFD700' },
  7:  { visible: ['obj-sagittarius', 'obj-scorpius'],
        label: 'Sagittarius & Scorpius', season: 'Musim Kemarau — Galaksi Bimasakti', color: '#FFD700' },
  8:  { visible: ['obj-sagittarius', 'obj-orion', 'obj-scorpius', 'obj-crux'],
        label: 'Semua Rasi (Transisi)', season: 'Peralihan — Langit Penuh', color: '#ffffff' },
  9:  { visible: ['obj-sagittarius', 'obj-orion', 'obj-scorpius', 'obj-crux'],
        label: 'Semua Rasi (Transisi)', season: 'Peralihan — Langit Penuh', color: '#ffffff' },
  10: { visible: ['obj-orion', 'obj-crux'],
        label: 'Orion & Crux', season: 'Musim Hujan — Langit Barat-Selatan', color: '#CCE8FF' },
  11: { visible: ['obj-orion', 'obj-crux'],
        label: 'Orion & Crux', season: 'Musim Hujan — Langit Barat-Selatan', color: '#CCE8FF' }
};

const SEMUA_RASI = ['obj-sagittarius', 'obj-orion', 'obj-scorpius', 'obj-crux'];

/* -----------------------------------------------------------------
   tampilkanEduCard(idRasi)
   Tampilkan info card edukasi untuk rasi yang sedang aktif.
   Kalau ada 2 rasi aktif, tampilkan yang pertama di list.
----------------------------------------------------------------- */
function tampilkanEduCard(idRasi) {
  const card = document.getElementById('edu-card');
  const data = DATA_EDUKASI[idRasi];
  if (!card || !data) return;

  // Isi konten
  card.innerHTML = `
    <div class="edu-nama" style="color: ${data.warna}">${data.nama}</div>
    <div class="edu-arti">${data.arti}</div>
    <div class="edu-row">
      <div class="edu-item">
        <span class="edu-item-label">Bintang Utama</span>
        <span class="edu-item-value">${data.bintang}</span>
      </div>
      <div class="edu-item">
        <span class="edu-item-label">Jarak dari Bumi</span>
        <span class="edu-item-value">${data.jarak}</span>
      </div>
    </div>
    <div class="edu-fakta">${data.fakta}</div>
  `;

  // Warna border sesuai rasi
  card.style.borderColor = data.warna + '44';

  // Fade in
  card.classList.remove('visible');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.classList.add('visible');
    });
  });
}

/* -----------------------------------------------------------------
   terapkanMusimLangit()
----------------------------------------------------------------- */
function terapkanMusimLangit() {
  const idx    = new Date().getMonth();
  const config = MUSIM_LANGIT[idx];

  SEMUA_RASI.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const tampil = config.visible.includes(id);
    if (el.object3D) el.object3D.visible = tampil;
    el.setAttribute('visible', tampil);

    // Update radar blip visibility
    const blipId = id.replace('obj-', 'radar-blip-');
    const blipEl = document.getElementById(blipId);
    if (blipEl) {
      if (tampil) {
        blipEl.classList.add('visible');
      } else {
        blipEl.classList.remove('visible');
      }
    }
  });

  // Update info panel
  document.getElementById('ip-month').textContent         = NAMA_BULAN[idx];
  document.getElementById('ip-constellation').textContent  = config.label;
  document.getElementById('ip-season').textContent         = config.season;
  document.getElementById('info-panel').style.borderLeftColor = config.color;
  document.getElementById('ip-constellation').style.color     = config.color;



  console.log(`[Seasons] Bulan: ${NAMA_BULAN[idx]} | Rasi: ${config.label}`);
}