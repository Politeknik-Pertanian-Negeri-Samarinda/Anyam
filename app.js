(() => {
  'use strict';

  /* ---------- Util ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rp = n => 'Rp' + Math.round(n).toLocaleString('id-ID');
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } }
  };
  const icon = (id, cls = 'i') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const FREE_SHIP = 500000;
  const COD_MAX = 2000000;

  /* ---------- Ilustrasi produk (SVG) ---------- */
  const D = '#1f2a27';
  const SH = '<ellipse cx="100" cy="177" rx="56" ry="6.5" fill="rgba(20,30,28,.16)"/>';
  const ART = {
    mug: (c, c2) => `${SH}<path d="M58 78h76v60a24 24 0 0 1-24 24H82a24 24 0 0 1-24-24z" fill="${c}"/><path d="M134 94h6a15 15 0 0 1 0 30h-6" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/><rect x="58" y="106" width="76" height="10" fill="${c2}"/><ellipse cx="96" cy="78" rx="38" ry="7" fill="${c2}"/><ellipse cx="96" cy="78" rx="31" ry="4.5" fill="${D}" opacity=".55"/><path d="M82 62q-6-9 0-17M98 60q-6-9 0-17M114 62q-6-9 0-17" fill="none" stroke="${D}" stroke-opacity=".3" stroke-width="3.5" stroke-linecap="round"/>`,
    vase: (c, c2) => `${SH}<path d="M100 32V8M100 22l16-10M100 16 86 6" fill="none" stroke="${D}" stroke-width="2.5" stroke-linecap="round" opacity=".6"/><ellipse cx="118" cy="11" rx="5" ry="2.8" fill="${c2}"/><ellipse cx="84" cy="7" rx="5" ry="2.8" fill="${c2}"/><path d="M90 30h20l-2 32c22 10 32 32 32 58 0 30-18 48-40 48s-40-18-40-48c0-26 10-48 32-58z" fill="${c}"/><path d="M62 122q38 18 76 0" fill="none" stroke="${c2}" stroke-width="6" opacity=".9"/><path d="M76 96q-8 20-2 44" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="6" stroke-linecap="round"/>`,
    lamp: (c, c2) => `${SH}<ellipse cx="100" cy="166" rx="32" ry="8" fill="${c2}"/><rect x="97" y="96" width="6" height="70" rx="3" fill="${D}"/><circle cx="100" cy="100" r="34" fill="#ffd36b" opacity=".2"/><circle cx="100" cy="94" r="14" fill="#ffe6a0"/><path d="M62 36h76l18 58H44z" fill="${c}"/><path d="M62 36h76l4 14H58z" fill="#fff" opacity=".2"/>`,
    chair: (c, c2) => `${SH}<g stroke="${D}" stroke-width="6" stroke-linecap="round" opacity=".85"><path d="M64 116 56 172M136 116l8 56M80 116l-2 44M120 116l2 44"/></g><rect x="64" y="28" width="72" height="72" rx="12" fill="${c}"/><g stroke="${c2}" stroke-width="3" opacity=".8"><path d="M72 44h56M72 58h56M72 72h56M72 86h56M82 36v56M100 36v56M118 36v56"/></g><rect x="52" y="100" width="96" height="16" rx="7" fill="${c2}"/>`,
    plant: (c, c2) => `${SH}<ellipse transform="rotate(-38 100 112)" cx="76" cy="84" rx="11" ry="32" fill="#2f7351"/><ellipse transform="rotate(38 100 112)" cx="124" cy="84" rx="11" ry="32" fill="#3f8a62"/><ellipse cx="100" cy="70" rx="12" ry="38" fill="#4a9a70"/><path d="M66 120h68l-8 46a8 8 0 0 1-8 7H82a8 8 0 0 1-8-7z" fill="${c}"/><rect x="62" y="110" width="76" height="14" rx="6" fill="${c2}"/><g fill="${D}" opacity=".2"><circle cx="86" cy="140" r="2"/><circle cx="104" cy="152" r="2.4"/><circle cx="116" cy="136" r="1.8"/><circle cx="92" cy="160" r="1.6"/></g>`,
    sneaker: (c, c2) => `${SH}<path d="M28 142V102Q28 88 42 88L62 86L72 70L96 78L148 112Q172 122 176 142Z" fill="${c}"/><path d="M44 130Q92 106 142 130" fill="none" stroke="${c2}" stroke-width="8" stroke-linecap="round"/><path d="M80 86l12 8M92 78l12 8M104 88l12 8" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><path d="M24 142H178V152Q178 164 166 164H38Q24 164 24 150Z" fill="#f6f4ee"/><path d="M24 150H178" stroke="${D}" stroke-opacity=".18" stroke-width="2"/>`,
    tote: (c, c2) => `${SH}<path d="M72 80V62a28 28 0 0 1 56 0v18" fill="none" stroke="${c2}" stroke-width="7" stroke-linecap="round"/><rect x="46" y="78" width="108" height="90" rx="6" fill="${c}"/><rect x="80" y="108" width="40" height="28" rx="3" fill="${c2}"/><path d="M88 118h24M88 126h14" stroke="${D}" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>`,
    backpack: (c, c2) => `${SH}<path d="M88 40a12 12 0 0 1 24 0" fill="none" stroke="${c2}" stroke-width="6" stroke-linecap="round"/><rect x="52" y="98" width="9" height="46" rx="4.5" fill="${D}"/><rect x="139" y="98" width="9" height="46" rx="4.5" fill="${D}"/><path d="M60 78a40 40 0 0 1 80 0v76a14 14 0 0 1-14 14H74a14 14 0 0 1-14-14z" fill="${c}"/><rect x="72" y="112" width="56" height="42" rx="10" fill="${c2}"/><path d="M72 124h56" stroke="${D}" stroke-width="2.5" opacity=".4"/><path d="M78 76h44" stroke="${c2}" stroke-width="5" stroke-linecap="round"/>`,
    glasses: (c, c2) => `${SH}<path d="M38 94 22 86M162 94l16-8" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/><circle cx="66" cy="102" r="29" fill="${c2}" fill-opacity=".38"/><circle cx="134" cy="102" r="29" fill="${c2}" fill-opacity=".38"/><circle cx="66" cy="102" r="29" fill="none" stroke="${c}" stroke-width="7"/><circle cx="134" cy="102" r="29" fill="none" stroke="${c}" stroke-width="7"/><path d="M95 96q5-7 10 0" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/><path d="M52 90q8-8 18-6" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3.5" stroke-linecap="round"/>`,
    watch: (c, c2) => `${SH}<path d="M80 16h40l4 50H76z" fill="${c2}"/><path d="M76 134h48l-4 50H80z" fill="${c2}"/><circle cx="100" cy="100" r="46" fill="${c}"/><circle cx="100" cy="100" r="37" fill="#f7f6f1"/><g stroke="${D}" stroke-width="2.5" stroke-linecap="round" opacity=".7"><path d="M100 68v6M100 126v6M68 100h6M126 100h6"/></g><path d="M100 100V78" stroke="${D}" stroke-width="4" stroke-linecap="round"/><path d="m100 100 17 8" stroke="${D}" stroke-width="3.5" stroke-linecap="round"/><circle cx="100" cy="100" r="4" fill="${c}"/><rect x="144" y="94" width="9" height="12" rx="3" fill="${c}"/>`,
    smart: (c, c2) => `${SH}<path d="M82 16h36l4 46H78z" fill="${c2}"/><path d="M78 138h44l-4 46H82z" fill="${c2}"/><rect x="56" y="58" width="88" height="84" rx="26" fill="${c}"/><rect x="63" y="65" width="74" height="70" rx="20" fill="#0d1413"/><text x="100" y="105" text-anchor="middle" font-family="DM Mono, monospace" font-size="20" font-weight="500" fill="#fff">10:09</text><path d="M80 118h40" stroke="${c2}" stroke-width="4" stroke-linecap="round"/><path d="M80 118h24" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="144" y="84" width="6" height="18" rx="3" fill="${c}"/>`,
    bottle: (c, c2) => `${SH}<rect x="72" y="52" width="56" height="116" rx="18" fill="${c}"/><rect x="72" y="98" width="56" height="14" fill="${c2}"/><rect x="84" y="30" width="32" height="26" rx="6" fill="${D}"/><rect x="90" y="20" width="20" height="14" rx="5" fill="${c2}"/><rect x="80" y="62" width="7" height="94" rx="3.5" fill="#fff" opacity=".3"/>`,
    headphones: (c, c2) => `${SH}<path d="M46 116V98a54 54 0 0 1 108 0v18" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/><rect x="32" y="104" width="32" height="56" rx="14" fill="${c}"/><rect x="136" y="104" width="32" height="56" rx="14" fill="${c}"/><rect x="56" y="112" width="9" height="40" rx="4.5" fill="${c2}"/><rect x="135" y="112" width="9" height="40" rx="4.5" fill="${c2}"/><circle cx="43" cy="132" r="3.5" fill="${c2}"/><circle cx="157" cy="132" r="3.5" fill="${c2}"/>`,
    speaker: (c, c2) => `${SH}<rect x="58" y="28" width="84" height="142" rx="24" fill="${c}"/><circle cx="100" cy="66" r="13" fill="${D}"/><circle cx="100" cy="66" r="5" fill="${c2}"/><circle cx="100" cy="124" r="31" fill="${D}"/><circle cx="100" cy="124" r="21" fill="${c2}" opacity=".85"/><circle cx="100" cy="124" r="8" fill="${D}"/><rect x="88" y="158" width="24" height="4" rx="2" fill="${c2}" opacity=".7"/>`
  };
  const art = (p, vi = 0) => {
    const col = p.colors[vi] || p.colors[0];
    return `<svg class="art" viewBox="0 0 200 200" aria-hidden="true" focusable="false">${ART[p.type](col[1], col[2])}</svg>`;
  };

  /* ---------- Data produk ---------- */
  const P = [
    { id: 1, name: 'Mug Keramik Lereng', cat: 'Rumah', type: 'mug', price: 89000, was: 119000, rating: 4.8, reviews: 312, tag: 'Terlaris', h: 28,
      desc: 'Keramik glasir doff dengan gagang lebar yang nyaman dipegang. Muat 320 ml dan aman untuk microwave maupun mesin cuci piring.',
      specs: ['Keramik stoneware', '320 ml', 'Aman microwave'],
      colors: [['Lumut', '#5f8f6e', '#e7d9a8'], ['Biru tinta', '#2f4b7c', '#f0c987'], ['Kapur', '#ebe6da', '#c2573a']] },
    { id: 2, name: 'Vas Kaca Tiup', cat: 'Rumah', type: 'vase', price: 245000, rating: 4.7, reviews: 128, tag: 'Baru', h: 190,
      desc: 'Dibentuk dengan tiupan tangan, jadi setiap vas punya gelembung dan lengkung yang sedikit berbeda. Cocok untuk bunga kering maupun segar.',
      specs: ['Kaca tiup tangan', 'Tinggi 26 cm', 'Kedap air'],
      colors: [['Hijau botol', '#3f8a78', '#bfe3d2'], ['Amber', '#d98a2b', '#f6d9a0'], ['Asap', '#7d8c9a', '#d4dde4']] },
    { id: 3, name: 'Lampu Meja Arca', cat: 'Rumah', type: 'lamp', price: 389000, was: 459000, rating: 4.9, reviews: 204, h: 48,
      desc: 'Kap lampu berbentuk kerucut memberi cahaya hangat yang jatuh ke meja kerja. Sakelar putar di kabel, panjang kabel 1,8 meter.',
      specs: ['Bohlam E27 hangat', 'Kabel 1,8 m', 'Sakelar putar'],
      colors: [['Kuning kunyit', '#e0a82e', '#33403c'], ['Putih gading', '#ece7da', '#9a6b45'], ['Hijau pinus', '#2f5e52', '#e0a82e']] },
    { id: 4, name: 'Kursi Anyam Pandan', cat: 'Rumah', type: 'chair', price: 1450000, rating: 4.6, reviews: 76, h: 32,
      desc: 'Sandaran dianyam dari pandan dengan rangka kayu jati. Ringan dipindah, kuat menahan beban hingga 120 kg, dirakit dalam 10 menit.',
      specs: ['Rangka kayu jati', 'Beban 120 kg', 'Rakit 10 menit'],
      colors: [['Natural', '#c9a36b', '#7a5532'], ['Hitam arang', '#3a403f', '#a58a62'], ['Hijau sage', '#8aa68a', '#6b4d2e']] },
    { id: 5, name: 'Pot Teraso Bulat', cat: 'Rumah', type: 'plant', price: 175000, rating: 4.5, reviews: 91, h: 140,
      desc: 'Pot semen teraso dengan serpihan batu alam. Berat dan stabil, cukup untuk monstera atau lidah mertua ukuran sedang.',
      specs: ['Semen teraso', 'Diameter 22 cm', 'Lubang drainase'],
      colors: [['Abu batu', '#b8bcb5', '#8f948c'], ['Terakota', '#d17a52', '#a85a37'], ['Biru kabut', '#8fa9bd', '#667f93']] },
    { id: 6, name: 'Sneakers Kanvas Garis', cat: 'Fashion', type: 'sneaker', price: 799000, was: 949000, rating: 4.7, reviews: 441, h: 12,
      desc: 'Kanvas katun tebal dengan sol karet vulkanisir yang empuk dipakai seharian. Tersedia ukuran 36 sampai 45.',
      specs: ['Kanvas katun tebal', 'Sol karet', 'Ukuran 36 sampai 45'],
      colors: [['Merah bata', '#c8452f', '#f1d9a0'], ['Biru laut', '#2a4f86', '#f3f0e6'], ['Hijau zaitun', '#6b7a3d', '#e9e0b8']] },
    { id: 7, name: 'Ransel Harian 18L', cat: 'Fashion', type: 'backpack', price: 565000, rating: 4.8, reviews: 267, tag: 'Terlaris', h: 215,
      desc: 'Bahan nilon anti air dengan slot laptop 14 inci dan kantong depan berresleting. Tali punggung berbusa tebal.',
      specs: ['Nilon anti air', 'Slot laptop 14"', 'Resleting ganda'],
      colors: [['Biru dongker', '#27406e', '#e8a33d'], ['Hitam', '#2c3230', '#8fb7a2'], ['Pasir', '#c7b48f', '#4a5d52']] },
    { id: 8, name: 'Tote Kanvas Polos', cat: 'Fashion', type: 'tote', price: 189000, rating: 4.4, reviews: 158, h: 75,
      desc: 'Kanvas 12 oz yang kokoh, bukaan lebar, dan satu kantong dalam untuk kunci atau dompet. Muat laptop dan botol minum.',
      specs: ['Kanvas 12 oz', 'Bukaan lebar', 'Kantong dalam'],
      colors: [['Krem', '#e8dfc8', '#3d6a5a'], ['Hijau hutan', '#35604f', '#e8dfc8'], ['Jingga', '#df7b3a', '#2f3a38']] },
    { id: 9, name: 'Kacamata Bulat Asetat', cat: 'Aksesori', type: 'glasses', price: 325000, rating: 4.6, reviews: 83, tag: 'Baru', h: 330,
      desc: 'Bingkai asetat yang ringan, hanya 22 gram, dengan lensa pelindung UV400. Engsel berpegas tidak mudah longgar.',
      specs: ['Bingkai asetat', 'Lensa UV400', 'Ringan 22 g'],
      colors: [['Kura-kura', '#7a4a2a', '#e0b86a'], ['Hitam', '#262c2b', '#7f98a8'], ['Bening merah muda', '#d97a8c', '#f3c6cf']] },
    { id: 10, name: 'Jam Tangan Klasik 38mm', cat: 'Aksesori', type: 'watch', price: 1290000, rating: 4.8, reviews: 119, h: 262,
      desc: 'Diameter 38 mm dengan kaca mineral dan tali kulit 20 mm yang mudah diganti. Tahan cipratan hingga 5 ATM.',
      specs: ['Kaca mineral', '5 ATM', 'Tali kulit 20 mm'],
      colors: [['Perak + cokelat', '#b9bfc2', '#7a4b2d'], ['Emas + hitam', '#c9a24a', '#2b2f2e'], ['Hitam + hijau', '#2f3534', '#4b7a62']] },
    { id: 11, name: 'Botol Minum Baja 750 ml', cat: 'Aksesori', type: 'bottle', price: 159000, was: 199000, rating: 4.7, reviews: 530, h: 160,
      desc: 'Baja tahan karat berdinding ganda. Minuman dingin bertahan hingga 24 jam, minuman panas hingga 12 jam. Tutup anti bocor.',
      specs: ['Baja tahan karat', 'Dingin 24 jam', 'Tutup anti bocor'],
      colors: [['Hijau mint', '#6fb59d', '#2f5e52'], ['Kuning', '#f0c23c', '#2f3a38'], ['Merah muda', '#e58aa0', '#7a2d4a']] },
    { id: 12, name: 'Headphone Nirkabel Aura', cat: 'Elektronik', type: 'headphones', price: 1899000, rating: 4.7, reviews: 208, tag: 'Baru', h: 250,
      desc: 'Peredam bising aktif, Bluetooth 5.3, dan baterai 40 jam. Bantalan telinga memory foam yang tidak panas dipakai lama.',
      specs: ['Bluetooth 5.3', 'Baterai 40 jam', 'Peredam bising'],
      colors: [['Ungu tua', '#4b3f8f', '#d6c9ff'], ['Hitam', '#2b2f33', '#8da1ad'], ['Putih tulang', '#e9e6dd', '#a08a6a']] },
    { id: 13, name: 'Speaker Portabel Kubah', cat: 'Elektronik', type: 'speaker', price: 1150000, was: 1350000, rating: 4.6, reviews: 144, h: 8,
      desc: 'Tahan air dan debu (IP67), baterai 18 jam, dan bisa dipasangkan dengan speaker kedua untuk suara stereo.',
      specs: ['Bluetooth 5.3', 'IP67', 'Baterai 18 jam'],
      colors: [['Oranye', '#e2673a', '#f7d7b3'], ['Hijau lumut', '#4e6b4f', '#cfe0b8'], ['Abu', '#7d8683', '#dfe4e1']] },
    { id: 14, name: 'Smartwatch Lintas 2', cat: 'Elektronik', type: 'smart', price: 2299000, rating: 4.5, reviews: 97, h: 195,
      desc: 'Layar AMOLED 1,8 inci, GPS bawaan, dan baterai hingga 7 hari. Memantau tidur, detak jantung, dan 40 mode olahraga.',
      specs: ['AMOLED 1,8"', 'GPS bawaan', 'Baterai 7 hari'],
      colors: [['Biru es', '#6fa8c9', '#d8eef9'], ['Hitam', '#2a2f31', '#7fd0a3'], ['Merah muda', '#e68a9f', '#fbd9e0']] }
  ];
  const CATS = ['Rumah', 'Fashion', 'Aksesori', 'Elektronik'];
  const PROVS = ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi', 'Sumatera Selatan', 'Bangka Belitung', 'Bengkulu', 'Lampung', 'DKI Jakarta', 'Banten', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Gorontalo', 'Sulawesi Tengah', 'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat', 'Papua Barat Daya', 'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan'];
  const prod = id => P.find(p => p.id === id);

  /* ---------- State ---------- */
  const loadCart = () => store.get('anyam.cart', []).filter(l => {
    const p = l && prod(l.id);
    return p && Number.isInteger(l.vi) && l.vi >= 0 && l.vi < p.colors.length && Number.isInteger(l.qty) && l.qty >= 1 && l.qty <= 10;
  });
  const state = {
    cat: 'Semua', q: '', sort: 'rekomendasi', max: 2500000, onlyWish: false,
    cart: loadCart(),
    wish: new Set(store.get('anyam.wish', []).filter(id => prod(id))),
    promo: store.get('anyam.promo', null) === 'ANYAM10' ? 'ANYAM10' : null,
    ship: 'reguler', pay: 'qris'
  };
  const saveCart = () => store.set('anyam.cart', state.cart);
  const saveWish = () => store.set('anyam.wish', [...state.wish]);

  const calc = (ship = 'reguler', lines = state.cart, promo = state.promo) => {
    const sub = lines.reduce((s, l) => s + prod(l.id).price * l.qty, 0);
    const disc = promo ? Math.min(Math.round(sub * 0.1), 150000) : 0;
    const free = sub >= FREE_SHIP;
    const shipping = ship === 'ekspres' ? 35000 : (free ? 0 : 15000);
    return { sub, disc, free, shipping, total: sub - disc + shipping };
  };

  /* ---------- Toast ---------- */
  function toast(msg, action) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span></span>${action ? '<button type="button"></button>' : ''}`;
    $('span', el).textContent = msg;
    if (action) {
      const b = $('button', el);
      b.textContent = action.label;
      b.addEventListener('click', () => { action.fn(); el.remove(); });
    }
    $('#toasts').appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 260); }, 3400);
    while ($('#toasts').children.length > 3) $('#toasts').firstChild.remove();
  }

  /* ---------- Lapisan (drawer / modal) ---------- */
  const scrim = $('#scrim');
  let layer = null, lastFocus = null;
  function openLayer(el) {
    const prev = layer;
    if (prev && prev !== el) closeLayer(true);
    if (!prev) lastFocus = document.activeElement;
    layer = el;
    el.classList.add('on');
    el.setAttribute('aria-hidden', 'false');
    scrim.classList.add('on');
    document.body.classList.add('lock');
    setTimeout(() => {
      const f = $('[data-autofocus]', el) || $('button, input, select, textarea, a[href]', el);
      if (f) f.focus({ preventScroll: true });
    }, 60);
  }
  function closeLayer(keep) {
    if (!layer) return;
    layer.classList.remove('on');
    layer.setAttribute('aria-hidden', 'true');
    layer = null;
    if (!keep) {
      scrim.classList.remove('on');
      document.body.classList.remove('lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
  }
  
  scrim.addEventListener('click', () => closeLayer());
  $$('.modal').forEach(m => m.addEventListener('mousedown', e => { if (e.target === m) closeLayer(); }));
  document.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeLayer(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && layer) { closeLayer(); return; }
    if (e.key === 'Tab' && layer) {
      const f = $$('button:not([disabled]), input:not([disabled]), select, textarea, a[href]', layer).filter(x => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === '/' && !layer && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      e.preventDefault(); $('#q').focus();
    }
  });

  /* ---------- Katalog ---------- */
  function card(p) {
    const sale = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    const fav = state.wish.has(p.id);
    return `<article class="card" data-id="${p.id}">
      <div class="tile" style="--h:${p.h}">
        <button class="tile-open" type="button" data-act="quick" aria-label="Lihat detail ${p.name}">${art(p)}</button>
        <div class="tags">${p.tag ? `<span class="tag">${p.tag}</span>` : ''}${sale ? `<span class="tag tag-sale">-${sale}%</span>` : ''}</div>
        <button class="heart" type="button" data-act="wish" aria-pressed="${fav}" aria-label="${fav ? 'Hapus dari favorit' : 'Simpan ke favorit'}: ${p.name}">${icon('heart')}</button>
      </div>
      <div class="info">
        <p class="cat">${p.cat}</p>
        <h3 class="name"><button type="button" data-act="quick">${p.name}</button></h3>
        <p class="rate">${icon('star')}<b>${p.rating.toFixed(1)}</b><span>(${p.reviews})</span></p>
        <div class="buy">
          <p class="price"><strong>${rp(p.price)}</strong>${p.was ? `<s>${rp(p.was)}</s>` : ''}</p>
          <button class="add" type="button" data-act="add" aria-label="Tambah ${p.name} ke keranjang">${icon('plus')}</button>
        </div>
      </div>
    </article>`;
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    let list = P.filter(p =>
      (state.cat === 'Semua' || p.cat === state.cat) &&
      p.price <= state.max &&
      (!state.onlyWish || state.wish.has(p.id)) &&
      (!q || (p.name + ' ' + p.cat + ' ' + p.desc + ' ' + p.specs.join(' ')).toLowerCase().includes(q)));
    const off = p => p.was ? 1 - p.price / p.was : 0;
    const sorts = {
      termurah: (a, b) => a.price - b.price,
      termahal: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      diskon: (a, b) => off(b) - off(a)
    };
    if (sorts[state.sort]) list = [...list].sort(sorts[state.sort]);
    return list;
  }

  function renderGrid() {
    const list = filtered();
    $('#grid').innerHTML = list.map(card).join('');
    $('#empty').hidden = list.length > 0;
    const bits = [`${list.length} produk`];
    if (state.cat !== 'Semua') bits.push(`kategori ${state.cat}`);
    if (state.onlyWish) bits.push('hanya favorit');
    if (state.q.trim()) bits.push(`pencarian “${state.q.trim()}”`);
    $('#count').textContent = bits.join(' · ');
  }

  function renderChips() {
    const all = [['Semua', P.length], ...CATS.map(c => [c, P.filter(p => p.cat === c).length])];
    $('#chips').innerHTML = all.map(([c, n]) =>
      `<button class="chip-btn" type="button" data-cat="${c}" aria-pressed="${state.cat === c}">${c}<small>${n}</small></button>`).join('');
  }

  function renderCats() {
    $('#cats').innerHTML = CATS.map(c => {
      const items = P.filter(p => p.cat === c);
      const rep = items[0];
      return `<button class="cat-tile" type="button" data-cat="${c}" data-jump="1" aria-label="Lihat kategori ${c}, ${items.length} produk">
        <span class="tile" style="--h:${rep.h}">${art(rep)}</span>
        <span class="meta"><b>${c}</b><span>${items.length} produk</span></span></button>`;
    }).join('');
  }

  function renderPromo() {
    $('#promoGrid').innerHTML = P.filter(p => p.was).slice(0, 4).map(card).join('');
  }

  function renderCollage() {
    const [a, b, c] = [prod(3), prod(6), prod(1)];
    $('#collage').innerHTML = `
      <div class="tile t1" style="--h:${a.h}">${art(a, 0)}</div>
      <div class="tile" style="--h:${b.h}">${art(b, 0)}</div>
      <div class="tile" style="--h:${c.h}">${art(c, 1)}</div>
      <span class="chip c1"><span class="dot"></span>Stok tersedia</span>
      <span class="chip c2">Mulai ${rp(Math.min(...P.map(p => p.price)))}</span>`;
  }

  function setCat(c, scroll) {
    state.cat = c;
    renderChips(); renderGrid();
    if (scroll) $('#katalog').scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------- Favorit ---------- */
  function syncWishUI() {
    const n = state.wish.size;
    const badge = $('#wishCount');
    badge.hidden = n === 0; badge.textContent = n;
    $('#wishBtn').setAttribute('aria-pressed', state.onlyWish);
    $$('.card').forEach(c => {
      const id = +c.dataset.id, fav = state.wish.has(id), b = $('.heart', c);
      b.setAttribute('aria-pressed', fav);
      b.setAttribute('aria-label', (fav ? 'Hapus dari favorit' : 'Simpan ke favorit') + ': ' + prod(id).name);
    });
  }

  function toggleWish(id) {
    const on = !state.wish.has(id);
    if (on) state.wish.add(id); else state.wish.delete(id);
    saveWish();
    if (state.onlyWish && !state.wish.size) state.onlyWish = false;
    syncWishUI();
    if (state.onlyWish) renderGrid();
    toast(on ? `${prod(id).name} disimpan ke favorit` : `${prod(id).name} dihapus dari favorit`);
    return on;
  }

  /* ---------- Keranjang ---------- */
  function addToCart(id, vi = 0, qty = 1) {
    const line = state.cart.find(l => l.id === id && l.vi === vi);
    if (line) line.qty = Math.min(10, line.qty + qty); else state.cart.push({ id, vi, qty: Math.min(10, qty) });
    saveCart(); renderCart();
    const b = $('#cartCount'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  }

  function renderCart() {
    const n = state.cart.reduce((s, l) => s + l.qty, 0);
    const badge = $('#cartCount'); badge.hidden = n === 0; badge.textContent = n;
    $('#drawerCount').textContent = n ? `(${n})` : '';
    const t = calc();
    const left = Math.max(0, FREE_SHIP - t.sub);
    $('#shipBar').innerHTML = !n
      ? `<span>Belanja ${rp(FREE_SHIP)} atau lebih, ongkir reguler gratis.</span><div class="bar"><i style="width:0"></i></div>`
      : left > 0
        ? `<span>Tambah <b>${rp(left)}</b> lagi untuk gratis ongkir reguler.</span><div class="bar"><i style="width:${Math.min(100, t.sub / FREE_SHIP * 100)}%"></i></div>`
        : `<span><b>Gratis ongkir reguler</b> sudah berlaku untuk pesananmu.</span><div class="bar"><i style="width:100%"></i></div>`;

    const list = $('#cartList');
    if (!n) {
      const p = prod(3);
      list.innerHTML = `<div class="cart-empty"><div class="tile" style="--h:${p.h}">${art(p)}</div><b>Keranjangmu masih kosong</b><p>Pilih produk yang kamu suka, nanti muncul di sini.</p><button class="btn btn-primary" type="button" data-close data-jump-katalog>Mulai belanja</button></div>`;
    } else {
      list.innerHTML = state.cart.map(l => {
        const p = prod(l.id);
        return `<div class="line" data-key="${l.id}:${l.vi}">
          <div class="tile" style="--h:${p.h}">${art(p, l.vi)}</div>
          <div>
            <h3>${p.name}</h3>
            <p class="var">${p.colors[l.vi][0]} · ${rp(p.price)}</p>
            <div class="row">
              <div class="stepper" role="group" aria-label="Jumlah ${p.name}">
                <button type="button" data-c="dec" aria-label="Kurangi">${icon('minus')}</button>
                <output>${l.qty}</output>
                <button type="button" data-c="inc" aria-label="Tambah">${icon('plus')}</button>
              </div>
              <span class="lp">${rp(p.price * l.qty)}</span>
            </div>
            <button class="rm" type="button" data-c="rm">${icon('trash')} Hapus</button>
          </div></div>`;
      }).join('');
    }

    const pv = ($('#promoIn') || {}).value || '';
    const foot = $('#cartFoot');
    if (!n) { foot.innerHTML = ''; foot.hidden = true; return; }
    foot.hidden = false;
    foot.innerHTML = `
      <div class="promo-row">
        <label class="sr" for="promoIn">Kode promo</label>
        <input id="promoIn" placeholder="Kode promo" value="${state.promo || pv}" ${state.promo ? 'readonly' : ''} autocomplete="off">
        <button class="btn btn-ghost" type="button" data-c="promo">${state.promo ? 'Lepas' : 'Pakai'}</button>
      </div>
      <p class="promo-msg ${state.promo ? 'ok' : ''}" id="promoMsg">${state.promo ? 'Diskon 10% berlaku, maksimal Rp150.000.' : 'Coba kode ANYAM10.'}</p>
      <div class="sum">
        <div><span>Subtotal</span><span>${rp(t.sub)}</span></div>
        ${t.disc ? `<div class="good"><span>Diskon ${state.promo}</span><span>-${rp(t.disc)}</span></div>` : ''}
        <div class="total"><span>Total sementara</span><span>${rp(t.sub - t.disc)}</span></div>
        <div><small style="color:var(--muted)">Ongkir dihitung di checkout.</small></div>
      </div>
      <button class="btn btn-primary btn-wide" type="button" data-c="checkout">Lanjut ke checkout ${icon('arrow')}</button>`;
  }

  $('#cartList').addEventListener('click', e => {
    const b = e.target.closest('[data-c]');
    if (!b) return;
    const line = b.closest('.line');
    if (!line) return;
    const [id, vi] = line.dataset.key.split(':').map(Number);
    const l = state.cart.find(x => x.id === id && x.vi === vi);
    if (!l) return;
    if (b.dataset.c === 'inc') l.qty = Math.min(10, l.qty + 1);
    if (b.dataset.c === 'dec') l.qty = Math.max(1, l.qty - 1);
    if (b.dataset.c === 'rm') state.cart = state.cart.filter(x => x !== l);
    saveCart(); renderCart();
  });
  $('#cartList').addEventListener('click', e => {
    if (e.target.closest('[data-jump-katalog]')) setTimeout(() => $('#katalog').scrollIntoView({ behavior: 'smooth' }), 320);
  });
  $('#cartFoot').addEventListener('click', e => {
    const b = e.target.closest('[data-c]');
    if (!b) return;
    if (b.dataset.c === 'checkout') openCheckout();
    if (b.dataset.c === 'promo') {
      if (state.promo) { state.promo = null; store.set('anyam.promo', null); renderCart(); return; }
      const v = $('#promoIn').value.trim().toUpperCase();
      if (v === 'ANYAM10') { state.promo = 'ANYAM10'; store.set('anyam.promo', 'ANYAM10'); renderCart(); toast('Kode ANYAM10 dipakai'); }
      else { const m = $('#promoMsg'); m.className = 'promo-msg bad'; m.textContent = v ? 'Kode tidak dikenal. Periksa lagi penulisannya.' : 'Ketik kode promo dulu.'; }
    }
  });
  $('#cartFoot').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.id === 'promoIn') { e.preventDefault(); $('[data-c="promo"]', $('#cartFoot')).click(); }
  });

  /* ---------- Quick view ---------- */
  function openQuick(id) {
    const p = prod(id);
    let vi = 0, qty = 1;
    const panel = $('#quickPanel');
    const sale = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    panel.innerHTML = `
      <div class="tile q-art" id="qArt" style="--h:${p.h}">${art(p, 0)}</div>
      <div class="q-body">
        <button class="icon-btn x" type="button" data-close aria-label="Tutup"><svg class="i"><use href="#i-close"/></svg></button>
        <p class="eyebrow">${p.cat}${p.tag ? ' · ' + p.tag : ''}</p>
        <h2 id="qTitle">${p.name}</h2>
        <p class="rate">${icon('star')}<b>${p.rating.toFixed(1)}</b><span>(${p.reviews} ulasan)</span></p>
        <p class="q-price"><strong>${rp(p.price)}</strong>${p.was ? `<s>${rp(p.was)}</s><span class="tag tag-sale">-${sale}%</span>` : ''}</p>
        <p class="desc">${p.desc}</p>
        <fieldset class="swatches">
          <legend>Warna: <b id="qColor">${p.colors[0][0]}</b></legend>
          <div class="sw-row" role="radiogroup" aria-label="Pilih warna">
            ${p.colors.map((c, i) => `<button class="sw" type="button" role="radio" aria-checked="${i === 0}" aria-label="${c[0]}" data-q="sw" data-vi="${i}"><i style="background:linear-gradient(135deg,${c[1]} 50%,${c[2]} 50%)"></i></button>`).join('')}
          </div>
        </fieldset>
        <ul class="specs">${p.specs.map(s => `<li>${icon('check')}${s}</li>`).join('')}</ul>
        <div class="q-actions">
          <div class="stepper" role="group" aria-label="Jumlah">
            <button type="button" data-q="dec" aria-label="Kurangi">${icon('minus')}</button>
            <output id="qQty">1</output>
            <button type="button" data-q="inc" aria-label="Tambah">${icon('plus')}</button>
          </div>
          <button class="btn btn-primary" type="button" data-q="add" data-autofocus id="qAdd">Tambah · ${rp(p.price)}</button>
          <button class="icon-btn" type="button" data-q="wish" id="qWish" aria-pressed="${state.wish.has(p.id)}" aria-label="Simpan ke favorit">${icon('heart')}</button>
        </div>
      </div>`;

    const upd = () => {
      $('#qArt').innerHTML = art(p, vi);
      $('#qColor').textContent = p.colors[vi][0];
      $$('.sw', panel).forEach((s, i) => s.setAttribute('aria-checked', i === vi));
      $('#qQty').textContent = qty;
      $('#qAdd').textContent = `Tambah · ${rp(p.price * qty)}`;
    };

    panel.onclick = e => {
      const t = e.target.closest('[data-q]');
      if (!t) return;
      const a = t.dataset.q;
      if (a === 'sw') { vi = +t.dataset.vi; upd(); }
      if (a === 'inc') { qty = Math.min(10, qty + 1); upd(); }
      if (a === 'dec') { qty = Math.max(1, qty - 1); upd(); }
      if (a === 'wish') { toggleWish(p.id); $('#qWish').setAttribute('aria-pressed', state.wish.has(p.id)); }
      if (a === 'add') {
        addToCart(p.id, vi, qty);
        closeLayer();
        toast(`${qty} × ${p.name} masuk keranjang`, { label: 'Lihat', fn: () => openLayer($('#drawer')) });
      }
    };
    openLayer($('#quick'));
  }

  /* ---------- Checkout ---------- */
  const coMain = $('#coMain');
  const coMainHTML = coMain.innerHTML;
  const SHIPS = {
    reguler: { name: 'Reguler', note: 'Tiba 2 sampai 4 hari kerja', days: [2, 4] },
    ekspres: { name: 'Ekspres', note: 'Tiba 1 sampai 2 hari kerja', days: [1, 2] }
  };
  const PAYS = {
    qris: { name: 'QRIS', note: 'Bayar dari aplikasi bank atau dompet digital apa pun' },
    transfer: { name: 'Transfer bank', note: 'Virtual account BCA, Mandiri, BNI, atau BRI' },
    cod: { name: 'Bayar di tempat (COD)', note: 'Untuk pesanan sampai ' + rp(COD_MAX) }
  };

  function resetCheckout() {
    coMain.innerHTML = coMainHTML;
    $('#fProv').innerHTML = '<option value="">Pilih provinsi</option>' + PROVS.map(v => `<option>${v}</option>`).join('');
    $('#shipOpts').innerHTML = Object.entries(SHIPS).map(([k, v]) =>
      `<label class="opt"><input type="radio" name="ship" value="${k}" ${state.ship === k ? 'checked' : ''}><span><b>${v.name}</b><small>${v.note}</small></span><span class="op" data-ship-price="${k}"></span></label>`).join('');
    $('#payOpts').innerHTML = Object.entries(PAYS).map(([k, v]) =>
      `<label class="opt"><input type="radio" name="pay" value="${k}" ${state.pay === k ? 'checked' : ''}><span><b>${v.name}</b><small data-pay-note="${k}">${v.note}</small></span><span class="op"></span></label>`).join('');
  }

  function refreshCheckout() {
    const t = calc(state.ship);
    if (state.pay === 'cod' && t.total > COD_MAX) {
      state.pay = 'qris';
      const q = $('input[name="pay"][value="qris"]'); if (q) q.checked = true;
    }
    const cod = $('input[name="pay"][value="cod"]');
    if (cod) {
      cod.disabled = t.total > COD_MAX;
      const n = $('[data-pay-note="cod"]');
      if (n) n.textContent = t.total > COD_MAX ? 'Tidak tersedia, total melebihi ' + rp(COD_MAX) : PAYS.cod.note;
    }
    const regP = $('[data-ship-price="reguler"]'), expP = $('[data-ship-price="ekspres"]');
    const base = calc('reguler');
    if (regP) regP.textContent = base.free ? 'Gratis' : rp(15000);
    if (expP) expP.textContent = rp(35000);
    const btn = $('#payBtn'); if (btn) btn.textContent = `Buat pesanan · ${rp(t.total)}`;
    renderCoSide(state.cart, t);
  }

  function renderCoSide(lines, t) {
    $('#coSide').innerHTML = `
      <h3>Ringkasan pesanan</h3>
      <div class="mini">${lines.map(l => {
        const p = prod(l.id);
        return `<div><span class="tile" style="--h:${p.h}">${art(p, l.vi)}</span><span>${p.name}<small>${p.colors[l.vi][0]} · ${l.qty} ×</small></span><span class="p">${rp(p.price * l.qty)}</span></div>`;
      }).join('')}</div>
      <div class="sum">
        <div><span>Subtotal</span><span>${rp(t.sub)}</span></div>
        ${t.disc ? `<div class="good"><span>Diskon ${state.promo || 'ANYAM10'}</span><span>-${rp(t.disc)}</span></div>` : ''}
        <div><span>Ongkir ${SHIPS[t.shipKey || state.ship].name}</span><span>${t.shipping ? rp(t.shipping) : 'Gratis'}</span></div>
        <div class="total"><span>Total</span><span>${rp(t.total)}</span></div>
      </div>`;
  }

  function openCheckout() {
    if (!state.cart.length) return;
    resetCheckout();
    refreshCheckout();
    openLayer($('#checkout'));
  }

  coMain.addEventListener('change', e => {
    if (e.target.name === 'ship') state.ship = e.target.value;
    if (e.target.name === 'pay') state.pay = e.target.value;
    refreshCheckout();
  });

  coMain.addEventListener('input', e => {
    const f = e.target;
    if (f.name === 'zip') f.value = f.value.replace(/\D/g, '').slice(0, 5);
    if (f.getAttribute('aria-invalid') === 'true') validateField(f);
  });

  const RULES = {
    name: v => v.trim().length >= 3 || 'Isi nama lengkap, minimal 3 huruf.',
    phone: v => /^(\+62|62|0)8\d{8,11}$/.test(v.replace(/[\s-]/g, '')) || 'Nomor HP belum benar. Contoh: 081234567890.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Alamat email belum benar.',
    addr: v => v.trim().length >= 10 || 'Tulis alamat lebih lengkap, minimal 10 karakter.',
    city: v => v.trim().length >= 3 || 'Isi nama kota atau kabupaten.',
    prov: v => !!v || 'Pilih provinsi.',
    zip: v => /^\d{5}$/.test(v) || 'Kode pos terdiri dari 5 angka.'
  };
  function validateField(f) {
    const r = RULES[f.name]; if (!r) return true;
    const res = r(f.value), ok = res === true;
    f.setAttribute('aria-invalid', ok ? 'false' : 'true');
    const err = $(`[data-err="${f.name}"]`, coMain);
    if (err) { err.textContent = ok ? '' : res; f.setAttribute('aria-describedby', ok ? '' : 'err-' + f.name); err.id = 'err-' + f.name; }
    return ok;
  }

  coMain.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    let firstBad = null;
    Object.keys(RULES).forEach(k => { const f = form.elements[k]; if (!validateField(f) && !firstBad) firstBad = f; });
    if (firstBad) { firstBad.focus(); toast('Ada isian yang perlu diperbaiki'); return; }
    const lines = state.cart.map(l => ({ ...l }));
    const t = calc(state.ship, lines);
    t.shipKey = state.ship;
    const no = 'ANY-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');
    const d = SHIPS[state.ship].days;
    const fmtD = n => new Date(Date.now() + n * 864e5).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
    const eta = d[0] === d[1] ? fmtD(d[0]) : `${fmtD(d[0])} – ${fmtD(d[1])}`;
    const payNote = { qris: 'Pindai kode QRIS yang kami kirim ke emailmu dalam 24 jam.', transfer: 'Nomor virtual account dikirim ke emailmu.', cod: 'Siapkan uang pas saat kurir tiba.' }[state.pay];
    const name = form.elements.name.value.trim(), city = form.elements.city.value.trim(), prov = form.elements.prov.value;
    coMain.innerHTML = `
      <div class="done">
        <span class="ok">${icon('check')}</span>
        <h2>Pesanan diterima, ${name.split(' ')[0]}.</h2>
        <p>${payNote}</p>
        <dl>
          <dt>Nomor pesanan</dt><dd>${no}</dd>
          <dt>Total</dt><dd>${rp(t.total)}</dd>
          <dt>Pembayaran</dt><dd>${PAYS[state.pay].name}</dd>
          <dt>Perkiraan tiba</dt><dd>${eta}</dd>
          <dt>Dikirim ke</dt><dd>${city}, ${prov}</dd>
        </dl>
        <button class="btn btn-primary" type="button" data-close data-autofocus>Lanjut belanja</button>
        <p class="demo-note" style="text-align:left">Ini toko demo, jadi pesanan ini tidak benar-benar diproses.</p>
      </div>`;
    renderCoSide(lines, t);
    state.cart = []; state.promo = null; store.set('anyam.promo', null);
    saveCart(); renderCart();
    const b = $('[data-autofocus]', coMain); if (b) b.focus();
  });

  /* ---------- Event umum ---------- */
  function onProductClick(e) {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const id = +b.closest('.card').dataset.id;
    if (b.dataset.act === 'quick') openQuick(id);
    if (b.dataset.act === 'wish') toggleWish(id);
    if (b.dataset.act === 'add') {
      addToCart(id, 0, 1);
      toast(`${prod(id).name} masuk keranjang`, { label: 'Lihat', fn: () => openLayer($('#drawer')) });
    }
  }
  $('#grid').addEventListener('click', onProductClick);
  $('#promoGrid').addEventListener('click', onProductClick);
  $('#chips').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) setCat(b.dataset.cat); });
  $('#cats').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) setCat(b.dataset.cat, true); });
  $('#sort').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });
  $('#maxPrice').addEventListener('input', e => {
    state.max = +e.target.value;
    $('#maxLabel').textContent = rp(state.max);
    renderGrid();
  });
  $('#q').addEventListener('input', e => { state.q = e.target.value; renderGrid(); });
  $('#searchForm').addEventListener('submit', e => { e.preventDefault(); $('#katalog').scrollIntoView({ behavior: 'smooth' }); });
  $('#resetBtn').addEventListener('click', () => {
    Object.assign(state, { cat: 'Semua', q: '', max: 2500000, onlyWish: false, sort: 'rekomendasi' });
    $('#q').value = ''; $('#maxPrice').value = 2500000; $('#maxLabel').textContent = rp(2500000); $('#sort').value = 'rekomendasi';
    renderChips(); renderGrid(); syncWishUI();
  });
  $('#cartBtn').addEventListener('click', () => openLayer($('#drawer')));
  $('#wishBtn').addEventListener('click', () => {
    if (!state.wish.size && !state.onlyWish) { toast('Belum ada favorit. Ketuk ikon hati pada produk.'); return; }
    state.onlyWish = !state.onlyWish;
    syncWishUI(); renderGrid();
    if (state.onlyWish) $('#katalog').scrollIntoView({ behavior: 'smooth' });
  });

  /* Tema */
  const root = document.documentElement;
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const syncThemeIcon = () => { $('#themeIcon use').setAttribute('href', isDark() ? '#i-sun' : '#i-moon'); };
  const savedTheme = store.get('anyam.theme', null);
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  syncThemeIcon();
  $('#themeBtn').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next; store.set('anyam.theme', next); syncThemeIcon();
  });

  /* Hitung mundur promo sampai tengah malam */
  function tick() {
    const n = new Date(), end = new Date(n);
    end.setHours(24, 0, 0, 0);
    const s = Math.max(0, Math.floor((end - n) / 1000));
    const pad = v => String(v).padStart(2, '0');
    $('#cdH').textContent = pad(Math.floor(s / 3600));
    $('#cdM').textContent = pad(Math.floor(s % 3600 / 60));
    $('#cdS').textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  /* Newsletter */
  $('#newsForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#newsEmail').value.trim(), m = $('#newsMsg');
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { m.textContent = 'Terima kasih. Cek emailmu untuk konfirmasi.'; $('#newsEmail').value = ''; }
    else m.textContent = 'Alamat email belum benar. Contoh: nama@email.com';
  });

  /* ---------- Mulai ---------- */
  renderCollage(); renderCats(); renderPromo(); renderChips(); renderGrid(); renderCart(); syncWishUI();
})();
