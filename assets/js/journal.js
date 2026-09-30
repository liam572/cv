/* =========================================================
   Journal article pages — reading progress, TOC, reveal
   ========================================================= */
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /* ---------- reading progress + active TOC entry ---------- */
  const prog = $('#prog');
  const tocLinks = $$('#toc a');
  const secs = tocLinks.map(a => document.getElementById(a.getAttribute('href').slice(1)));
  let ticking = false;
  function update() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (max > 0 ? Math.min(1, scrollY / max) * 100 : 0) + '%';
    let idx = 0;
    secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= innerHeight * .35) idx = i; });
    tocLinks.forEach((a, i) => a.classList.toggle('on', i === idx));
  }
  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  update();

  /* ---------- ← / → to move between years ---------- */
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input, textarea, [contenteditable]')) return;
    const a = e.key === 'ArrowLeft' ? $('a.pg.prev') : e.key === 'ArrowRight' ? $('a.pg.next') : null;
    if (a) location.href = a.href;
  });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$('.rv').forEach((el, i) => {
    el.style.transitionDelay = (i % 5) * 80 + 'ms';
    // above the fold: reveal right away instead of waiting for the observer
    if (el.getBoundingClientRect().top < innerHeight) requestAnimationFrame(() => el.classList.add('in'));
    else io.observe(el);
  });
})();
