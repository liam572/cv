/* =========================================================
   Liam · 林联敏 — interactions
   ========================================================= */

/* ---------- 可配置项 ---------- */
// 首页照片轮播：替换成你自己的照片，例如 'assets/img/photo-1.jpg'
const PHOTOS = [
  'https://picsum.photos/seed/liam-portrait/800/960',
  'https://picsum.photos/seed/liam-studio/800/960',
  'https://picsum.photos/seed/liam-desk/800/960',
  'https://picsum.photos/seed/liam-city/800/960',
];
const PHOTO_INTERVAL = 4500;
const GITHUB_USER = 'mingolm';
const WECHAT_QR = 'assets/img/wechat-qr.png';
const RESUME_PDF = 'resume.pdf';

(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const pad = (n, l = 4) => String(Math.max(0, Math.round(n))).padStart(l, '0');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = () => innerWidth <= 860;
  const docTop = el => el.getBoundingClientRect().top + scrollY;

  /* ---------- anchor navigation (window.scrollTo, no scrollIntoView) ---------- */
  const setMenu = open => {
    document.body.classList.toggle('menu', open);
    $('#burger').setAttribute('aria-expanded', open);
    $('#burger').textContent = open ? 'CLOSE' : 'MENU';
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const el = id.length > 1 && document.getElementById(id.slice(1));
    if (!el) return;
    e.preventDefault();
    const offset = mobile() ? $('.topbar').offsetHeight : 0;
    window.scrollTo({ top: docTop(el) - offset, behavior: reduced ? 'auto' : 'smooth' });
    history.replaceState(null, '', id);
    setMenu(false);
  });
  $('#burger').addEventListener('click', () => setMenu(!document.body.classList.contains('menu')));
  $('#scrim').addEventListener('click', () => setMenu(false));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- active section + progress rail + HUD ---------- */
  const links = $$('#nav a');
  const secs = links.map(l => document.getElementById(l.getAttribute('href').slice(1)));
  const dot = $('#navDot'), rail = $('#rail');
  const coordB = $$('#coord b');
  let ticking = false;
  function update() {
    ticking = false;
    const probe = scrollY + innerHeight * .35;
    const max = document.documentElement.scrollHeight - innerHeight;
    let idx = 0;
    secs.forEach((s, i) => { if (docTop(s) <= probe) idx = i; });
    if (scrollY >= max - 4) idx = secs.length - 1;
    links.forEach((l, i) => {
      l.classList.toggle('on', i === idx);
      i === idx ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current');
    });
    const a = links[idx];
    dot.style.top = (a.offsetTop + a.offsetHeight / 2 - 3) + 'px';
    const p = max > 0 ? scrollY / max : 0;
    rail.style.height = (p * 100) + '%';
    coordB[2].textContent = pad(p * 100, 3) + '%';
  }
  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  addEventListener('mousemove', e => {
    coordB[0].textContent = pad(e.clientX);
    coordB[1].textContent = pad(e.clientY + scrollY);
  }, { passive: true });

  /* ---------- language switch (zh / en) ---------- */
  const I18N = window.I18N || { en: {}, meta: {} };
  const i18nEls = $$('[data-i18n]');
  const zhHTML = new Map(i18nEls.map(el => [el, el.innerHTML]));
  const langStore = {
    get() { try { return localStorage.getItem('lang'); } catch { return null; } },
    set(v) { try { localStorage.setItem('lang', v); } catch {} },
  };
  const isLang = v => v === 'zh' || v === 'en';
  function pickLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (isLang(q)) return q;
    const saved = langStore.get();
    if (isLang(saved)) return saved;
    return (navigator.language || 'zh').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }
  let lang = 'zh';
  function applyLang(next) {
    lang = next;
    i18nEls.forEach(el => {
      const en = I18N.en[el.dataset.i18n];
      el.innerHTML = next === 'en' && en != null ? en : zhHTML.get(el);
    });
    document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN';
    const meta = I18N.meta && I18N.meta[next];
    if (meta) {
      document.title = meta.title;
      const desc = $('meta[name="description"]');
      if (desc) desc.content = meta.description;
    }
    $$('.lang button').forEach(b => {
      const on = b.dataset.lang === next;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
    });
    requestUpdate();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => {
    const next = b.dataset.lang;
    if (next === lang) return;
    langStore.set(next);
    const url = new URL(location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    }
    if (reduced) { applyLang(next); return; }
    document.body.classList.add('lang-switching');
    setTimeout(() => {
      applyLang(next);
      document.body.classList.remove('lang-switching');
    }, 180);
  }));
  applyLang(pickLang());

  /* ---------- clock (Shanghai) ---------- */
  const clock = $('#clock');
  const tick = () => { clock.textContent = new Date().toLocaleTimeString('zh-CN', { hour12: false, timeZone: 'Asia/Shanghai' }); };
  tick(); setInterval(tick, 1000);

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });

  /* ---------- dynamic photo placeholder ---------- */
  const photo = $('#photo'), idxEl = $('#photoIdx'), stateEl = $('#photoState');
  let imgs = [], cur = -1, photoTimer;
  function showPhoto(n) {
    if (!imgs.length) return;
    const prev = imgs[cur];
    imgs.forEach((im, i) => im.classList.toggle('show', i === n));
    if (prev && prev !== imgs[n]) {
      prev.classList.add('leave');
      setTimeout(() => prev.classList.remove('leave'), 1150);
    }
    cur = n;
    idxEl.textContent = pad(n + 1, 2);
    stateEl.textContent = 'SCANNING…';
    setTimeout(() => { stateEl.textContent = 'MATCH ' + pad(n + 1, 2); }, 1100);
  }
  PHOTOS.forEach(src => {
    const im = new Image();
    im.alt = '';
    im.decoding = 'async';
    im.onload = () => {
      imgs.push(im);
      photo.appendChild(im);
      if (imgs.length === 1) {
        showPhoto(0);
        if (!reduced) photoTimer = setInterval(() => showPhoto((cur + 1) % imgs.length), PHOTO_INTERVAL);
      }
    };
    im.onerror = () => { if (!imgs.length) stateEl.textContent = 'NO SIGNAL'; };
    im.src = src;
  });

  /* ---------- typed terminal (liam.go) ---------- */
  const code = [
    ['<span class="p">$</span> cat liam.go', 500],
    ['<span class="k">package</span> main', 0],
    ['', 0],
    ['<span class="k">type</span> <span class="c">Gopher</span> <span class="k">struct</span> {', 0],
    ['  Name, Role, Base <span class="c">string</span>', 0],
    ['  Since            <span class="c">int</span>', 0],
    ['  Stack, Now       []<span class="c">string</span>', 0],
    ['}', 0],
    ['', 0],
    ['<span class="k">var</span> Liam = <span class="c">Gopher</span>{', 0],
    ['  Name:  <span class="s">"林联敏 · Liam"</span>,', 0],
    ['  Role:  <span class="s">"Senior Golang Engineer"</span>,', 0],
    ['  Base:  <span class="s">"Shanghai, CN"</span>,', 0],
    ['  Since: <span class="s">2017</span>,', 0],
    ['  Stack: []<span class="c">string</span>{<span class="s">"Go"</span>, <span class="s">"gRPC"</span>, <span class="s">"Kafka"</span>, <span class="s">"K8s"</span>},', 0],
    ['  Now:   []<span class="c">string</span>{<span class="s">"AI Infra"</span>, <span class="s">"Agent"</span>},', 0],
    ['}', 500],
    ['<span class="p">$</span> go run .', 700],
    ['<span class="ok">✓</span> <span class="m">build ok · 0 race · ready to ship</span>', 300],
    ['<span class="p">$</span> ', 0],
  ];
  const pre = $('#typed');
  const caret = '<span class="caret"></span>';
  let done = '';
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  function typeLine(i) {
    if (i >= code.length) { pre.innerHTML = done.replace(/\n$/, '') + caret; return; }
    const [html, wait] = code[i];
    const plain = html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
    let c = 0;
    const step = () => {
      c += 2;
      if (c >= plain.length) {
        done += html + '\n';
        pre.innerHTML = done + caret;
        setTimeout(() => typeLine(i + 1), 60 + wait);
      } else {
        pre.innerHTML = done + esc(plain.slice(0, c)) + caret;
        setTimeout(step, 16);
      }
    };
    step();
  }
  if (reduced) {
    pre.innerHTML = code.map(l => l[0]).join('\n') + caret;
  } else {
    new IntersectionObserver((es, o) => {
      if (es[0].isIntersecting) { typeLine(0); o.disconnect(); }
    }, { threshold: .3 }).observe(pre);
  }

  /* ---------- works filter ---------- */
  const filterBtns = $$('#filters button');
  filterBtns.forEach(b => b.addEventListener('click', () => {
    filterBtns.forEach(x => {
      x.classList.toggle('on', x === b);
      x.setAttribute('aria-pressed', x === b);
    });
    $$('.work').forEach(w => { w.hidden = !(b.dataset.f === 'all' || w.dataset.c === b.dataset.f); });
    requestUpdate();
  }));

  /* ---------- GitHub live data ---------- */
  $$('.metric[data-repo]').forEach(card => {
    const repo = card.dataset.repo.trim();
    if (!repo) return;
    fetch(`https://api.github.com/repos/${repo}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        card.querySelector('.row span').textContent = 'GITHUB // METRIC';
        card.querySelector('.row b').textContent = 'LIVE';
        card.querySelector('.num').innerHTML = `<i>★</i>${d.stargazers_count}<small>STARS</small>`;
      })
      .catch(() => {});
  });
  fetch(`https://api.github.com/users/${GITHUB_USER}`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(d => { $('#ghMeta').textContent = `@${GITHUB_USER} · ${d.public_repos} REPOS`; })
    .catch(() => {});

  /* ---------- resume PDF: fall back to #resume if missing ---------- */
  fetch(RESUME_PDF, { method: 'HEAD' })
    .then(r => { if (!r.ok) throw 0; })
    .catch(() => $$('[data-resume]').forEach(a => {
      a.setAttribute('href', '#resume');
      a.removeAttribute('target');
    }));

  /* ---------- WeChat QR popover ---------- */
  const wechat = $('#wechat');
  const qr = new Image();
  qr.alt = '微信二维码';
  qr.onload = () => { const box = $('#qrBox'); box.replaceWith(qr); };
  qr.src = WECHAT_QR;
  wechat.addEventListener('click', e => {
    e.stopPropagation();
    const open = !wechat.classList.contains('open');
    wechat.classList.toggle('open', open);
    wechat.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', () => { wechat.classList.remove('open'); wechat.setAttribute('aria-expanded', false); });

  /* ---------- GMP scheduler visualization ---------- */
  const cv = $('#gmp');
  const ctx = cv.getContext('2d');
  const gCount = $('#gCount');
  const LANES = 4;
  let W = 0, H = 0, gs = [], running = false, last = 0, spawnAcc = 0;
  function sizeCanvas() {
    const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const laneY = i => 22 + i * ((H - 40) / (LANES - 1));
  function spawn() {
    const lane = Math.floor(Math.random() * LANES);
    gs.push({ lane, x: 58, y: laneY(lane), v: 40 + Math.random() * 70, hot: Math.random() < .14, stolen: false });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textBaseline = 'middle';
    // global run queue
    ctx.strokeStyle = 'rgba(108,195,209,.5)';
    ctx.strokeRect(0.5, 8.5, 36, H - 17);
    ctx.fillStyle = '#8C8378';
    ctx.fillText('GRQ', 6, H / 2);
    for (let i = 0; i < LANES; i++) {
      const y = laneY(i);
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = 'rgba(233,226,214,.16)';
      ctx.beginPath(); ctx.moveTo(58, y); ctx.lineTo(W - 34, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#8C8378';
      ctx.fillText('P' + i, 42, y);
      ctx.strokeStyle = 'rgba(108,195,209,.8)';
      ctx.strokeRect(W - 28.5, y - 6.5, 22, 13);
      ctx.fillStyle = '#6CC3D1';
      ctx.fillText('M', W - 21, y + 0.5);
    }
    gs.forEach(g => {
      ctx.fillStyle = g.hot ? '#E85A2B' : '#E9E2D6';
      ctx.fillRect(g.x - 3, g.y - 3, 6, 6);
    });
  }
  function frame(t) {
    if (!running) return;
    const dt = Math.min((t - last) / 1000, .05); last = t;
    spawnAcc += dt;
    if (spawnAcc > .12 && gs.length < 60) { spawn(); spawnAcc = 0; }
    gs.forEach(g => {
      g.x += g.v * dt;
      // work stealing: an idle lane occasionally steals a goroutine
      if (!g.stolen && g.x > W * .45 && Math.random() < .004) {
        g.stolen = true; g.hot = true;
        g.lane = (g.lane + 1 + Math.floor(Math.random() * (LANES - 1))) % LANES;
      }
      g.y += (laneY(g.lane) - g.y) * Math.min(1, dt * 6);
    });
    gs = gs.filter(g => g.x < W - 34);
    gCount.textContent = gs.length;
    draw();
    requestAnimationFrame(frame);
  }
  sizeCanvas();
  new ResizeObserver(() => { sizeCanvas(); gs.forEach(g => { g.y = laneY(g.lane); }); draw(); }).observe(cv);
  if (reduced) {
    for (let i = 0; i < 24; i++) { spawn(); gs[i].x = 58 + Math.random() * (W - 100); }
    gCount.textContent = gs.length; draw();
  } else {
    new IntersectionObserver(es => {
      const vis = es[0].isIntersecting;
      if (vis && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
      if (!vis) running = false;
    }).observe(cv);
  }

  /* ---------- neural net decoration ---------- */
  const svg = $('#neural'), ns = 'http://www.w3.org/2000/svg';
  const layers = [3, 5, 5, 2], nodes = [];
  layers.forEach((n, L) => { for (let i = 0; i < n; i++) nodes.push({ L, x: 30 + L * 80, y: 100 + (i - (n - 1) / 2) * 36 }); });
  nodes.forEach(a => nodes.filter(b => b.L === a.L + 1).forEach(b => {
    const l = document.createElementNS(ns, 'line');
    l.setAttribute('x1', a.x); l.setAttribute('y1', a.y); l.setAttribute('x2', b.x); l.setAttribute('y2', b.y);
    svg.appendChild(l);
  }));
  const circles = nodes.map(n => {
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', n.x); c.setAttribute('cy', n.y); c.setAttribute('r', 5);
    svg.appendChild(c); return c;
  });
  if (!reduced) setInterval(() => {
    circles.forEach(c => c.classList.remove('fire'));
    layers.forEach((_, L) => {
      const ls = circles.filter((_, i) => nodes[i].L === L);
      ls[Math.floor(Math.random() * ls.length)].classList.add('fire');
    });
  }, 900);

  update();
})();
