/* =================================================================
   seasons.js — Data musim langit + konten edukasi per rasi
================================================================= */

const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret',    'April',
  'Mei',     'Juni',     'Juli',      'Agustus',
  'September','Oktober', 'November', 'Desember'
];

/* -----------------------------------------------------------------
   DATA EDUKASI per rasi bintang (Standar & Nusantara)
----------------------------------------------------------------- */
const DATA_EDUKASI = {
  'obj-sagittarius': {
    warna:   '#FFD700',
    standar: {
      nama:    'Sagittarius',
      arti:    'Pemanah — dari bahasa Latin',
      bintang: '8 bintang utama',
      jarak:   '143 thn cahaya',
      fakta:   'Pusat Galaksi Bimasakti berada tepat di arah rasi ini',
      link:    'https://noirlab-edu.translate.goog/public/education/constellations/sagittarius/?_x_tr_sl=en&_x_tr_tl=id&_x_tr_hl=id&_x_tr_pto=tc'
    },
    nusantara: {
      nama:    'Wulan Jarit',
      arti:    'Pemanah — Mitologi Hindu-Jawa',
      bintang: '8 bintang utama',
      jarak:   '143 thn cahaya',
      fakta:   'Digunakan sebagai penanda arah pusat galaksi Bima Sakti (Milky Way).',
      link:    'https://www.cangkeman.id/2023/03/mengenal-rasi-bintang-dalam-astronomi.html?utm_source=chatgpt.com'
    }
  },
  'obj-scorpius': {
    warna:   '#FF7744',
    standar: {
      nama:    'Scorpius',
      arti:    'Kalajengking',
      bintang: '18 bintang utama',
      jarak:   '550 thn cahaya (Antares)',
      fakta:   'Antares, bintang paling terang di rasi ini, 700× lebih besar dari Matahari',
      link:    'https://encyclopedia-pub.translate.goog/entry/56294?_x_tr_sl=en&_x_tr_tl=id&_x_tr_hl=id&_x_tr_pto=tc'
    },
    nusantara: {
      nama:    'Banyak Angrem',
      arti:    'Angsa Mengeram (Jawa)',
      bintang: '18 bintang utama',
      jarak:   '550 thn cahaya (Antares)',
      fakta:   'Bentuk melengkung Scorpius diinterpretasikan masyarakat agraris sebagai angsa yang sedang mengerami telurnya.',
      link:    'https://www.dwipanews.com/2020/06/rasi-scorpius-dalam-pranata-mangsa-budaya-jawa?utm_source=chatgpt.com'
    }
  },
  'obj-orion': {
    warna:   '#B0C8FF',
    standar: {
      nama:    'Orion',
      arti:    'Sang Pemburu — mitologi Yunani',
      bintang: '7 bintang utama',
      jarak:   '860 thn cahaya (Rigel)',
      fakta:   'Betelgeuse di bahu Orion adalah kandidat supernova berikutnya di galaksi kita',
      link:    'https://noirlab-edu.translate.goog/public/education/constellations/orion/?_x_tr_sl=en&_x_tr_tl=id&_x_tr_hl=id&_x_tr_pto=tc'
    },
    nusantara: {
      nama:    'Waluku',
      arti:    'Bajak Sawah (Jawa/Pranata Mangsa)',
      bintang: '7 bintang utama',
      jarak:   '860 thn cahaya (Rigel)',
      fakta:   'Kemunculannya di timur pada malam hari menjadi penanda bagi petani bahwa musim hujan akan tiba.',
      link:    'https://www.detik.com/jogja/budaya/d-7337799/mengenal-lintang-waluku-rasi-bintang-fenomenal-yang-menjadi-pranata-mangsa'
    }
  },
  'obj-crux': {
    warna:   '#CCE8FF',
    standar: {
      nama:    'Crux',
      arti:    'Salib Selatan — dari bahasa Latin',
      bintang: '4 bintang utama',
      jarak:   '320 thn cahaya (Acrux)',
      fakta:   'Digunakan pelaut selama berabad-abad sebagai penunjuk arah Selatan',
      link:    'https://earthsky-org.translate.goog/constellations/crux-the-southern-cross-jewel-box/?_x_tr_sl=en&_x_tr_tl=id&_x_tr_hl=id&_x_tr_pto=tc'
    },
    nusantara: {
      nama:    'Gubuk Penceng',
      arti:    'Gubuk Miring (Jawa/Bugis)',
      bintang: '4 bintang utama',
      jarak:   '320 thn cahaya (Acrux)',
      fakta:   'Bentuknya seperti gubuk miring. Digunakan oleh pelaut Bugis-Makassar sebagai penunjuk arah Selatan yang akurat.',
      link:    'https://ruangangkasa.com/mengamati-rasi-bintang-crux-si-gubug-penceng/?utm_source=chatgpt.com'
    }
  }
};

/* -----------------------------------------------------------------
   DATA ASTROFISIKA BINTANG
----------------------------------------------------------------- */
const DATA_BINTANG = {
  'kaus-australis': { nama: 'Kaus Australis', tipe: 'Bintang Raksasa Biru-Putih (B9)', suhu: '9.200 K', jarak: '143 Tahun Cahaya', massa: '3.5 x Matahari' },
  'nunki': { nama: 'Nunki', tipe: 'Bintang Deret Utama Biru (B2)', suhu: '18.890 K', jarak: '228 Tahun Cahaya', massa: '7.8 x Matahari' },
  'betelgeuse': { nama: 'Betelgeuse', tipe: 'Maha-Raksasa Merah (M1-M2)', suhu: '3.500 K', jarak: '642 Tahun Cahaya', massa: '16.5 x Matahari' },
  'rigel': { nama: 'Rigel', tipe: 'Maha-Raksasa Biru-Putih (B8)', suhu: '12.100 K', jarak: '860 Tahun Cahaya', massa: '21 x Matahari' },
  'antares': { nama: 'Antares', tipe: 'Maha-Raksasa Merah (M1)', suhu: '3.400 K', jarak: '550 Tahun Cahaya', massa: '12 x Matahari' },
  'acrux': { nama: 'Acrux', tipe: 'Sistem Bintang Ganda Biru (B0)', suhu: '28.000 K', jarak: '320 Tahun Cahaya', massa: '14 x Matahari' },
  'gacrux': { nama: 'Gacrux', tipe: 'Raksasa Merah (M3)', suhu: '3.689 K', jarak: '88 Tahun Cahaya', massa: '1.5 x Matahari' }
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
  const dataRef = DATA_EDUKASI[idRasi];
  if (!card || !dataRef) return;

  const mode = window.isNusantaraMode ? 'nusantara' : 'standar';
  const data = dataRef[mode];
  const warna = dataRef.warna;

  // Isi konten
  card.innerHTML = `
    <div class="edu-drag-handle"></div>
    <div class="edu-nama" style="color: ${warna}">${data.nama}</div>
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
    <div class="edu-extended-content">
      <div class="edu-fakta">${data.fakta}</div>
      <a href="${data.link || '#'}" target="_blank" class="edu-btn-link">Baca Artikel Selengkapnya ↗</a>
    </div>
  `;

  // Warna border sesuai rasi
  card.style.borderColor = warna + '44';

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