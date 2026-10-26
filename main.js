const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const hasGsap = typeof window.gsap !== 'undefined';

document.getElementById('year').textContent = new Date().getFullYear();

// Googly eyes trail the cursor around the hero and look at it; they drift home when it leaves
const eyes = document.querySelector('.eyes');
const pupils = eyes.querySelectorAll('.eye i');
const hero = document.querySelector('.hero');
if (!reduceMotion && finePointer) {
  let tx = 0, ty = 0, x = 0, y = 0, mx = 0, my = 0;
  hero.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    const home = eyes.getBoundingClientRect();
    // Park just above-right of the cursor so they don't cover what you're pointing at
    tx = mx - (home.left - x) - home.width / 2 + 40;
    ty = my - (home.top - y) - home.height / 2 - 40;
  });
  hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
  (function follow() {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    eyes.style.transform = `translate(${x}px, ${y}px) rotate(${(tx - x) * 0.03}deg)`;
    pupils.forEach((p) => {
      const r = p.parentElement.getBoundingClientRect();
      const a = Math.atan2(my - (r.top + r.height / 2), mx - (r.left + r.width / 2));
      p.style.transform = `translate(${Math.cos(a) * 5}px, ${Math.sin(a) * 9}px)`;
    });
    requestAnimationFrame(follow);
  })();
}

// Contact form — hands the enquiry to WhatsApp, pre-written to my number
const WHATSAPP_NUMBER = '2347043547499';
document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const needs = data.getAll('need').map((v) => form.querySelector(`input[value="${v}"] + span`).textContent);
  const text = [
    `Hi Wonder, I'm ${data.get('name')} (${data.get('email')}).`,
    needs.length ? `I need: ${needs.join(', ')}.` : '',
    data.get('msg') ? `\n${data.get('msg')}` : '',
  ].filter(Boolean).join('\n');
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  window.open(waUrl, '_blank') || (window.location.href = waUrl);
  form.querySelector('.form__status').textContent = 'WhatsApp is open — tap send to reach me.';
  form.reset();
});

// Nav background once the hero is behind us
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Cursor-aware glow on discipline cards (cheap, CSS-variable driven)
document.querySelectorAll('.discipline').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

if (!reduceMotion && hasGsap) {
  document.documentElement.classList.add('js-motion');
  gsap.registerPlugin(ScrollTrigger);
  runHeroSequence();
  runScrollScenes();
  if (finePointer) {
    initMagnetic();
    initWorkCursor();
  }
}

// Hero photo drifts gently against the cursor (parallax)
const heroBg = document.querySelector('.hero__bg');
if (!reduceMotion && finePointer && hasGsap) {
  const bx = gsap.quickTo(heroBg, 'x', { duration: 1.2, ease: 'power3.out' });
  const by = gsap.quickTo(heroBg, 'y', { duration: 1.2, ease: 'power3.out' });
  window.addEventListener('pointermove', (e) => {
    bx((e.clientX / window.innerWidth - 0.5) * -24);
    by((e.clientY / window.innerHeight - 0.5) * -16);
  }, { passive: true });
}

/* ---------- Opening title sequence ---------- */
function runHeroSequence() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.fromTo('.hero__img', { opacity: 0, filter: 'brightness(.3) blur(6px)' }, { opacity: 1, filter: 'brightness(1) blur(0px)', duration: 2.4, ease: 'power2.out' })
    .fromTo('.hero__title .line > span', { opacity: 1, yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.14 }, 0.7)
    .fromTo('.id-pill', { opacity: 0, y: -16, scale: .95 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.4)
    .fromTo('.sticker--a', { opacity: 0, scale: .4, rotate: -30 }, { opacity: 1, scale: 1, rotate: -12, duration: 1, ease: 'back.out(2)' }, 1.4)
    .fromTo('.sticker--b', { opacity: 0, scale: .4, rotate: 35 }, { opacity: 1, scale: 1, rotate: 14, duration: 1, ease: 'back.out(2)' }, 1.55)
    .fromTo('.dock', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1 }, 1.7);
}

/* ---------- Scroll-directed scenes ---------- */
function runScrollScenes() {
  // Generic reveals, staggered per section so each scene "plays" as a group
  document.querySelectorAll('section').forEach((section) => {
    const items = section.querySelectorAll(':scope [data-reveal]');
    if (!items.length) return;
    gsap.fromTo(items, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: section, start: 'top 75%' },
    });
  });

  // Work cards: the frame opens like a shutter, then the narrative follows
  document.querySelectorAll('[data-case]').forEach((el) => {
    const media = el.querySelector('.card__media');
    const inner = el.querySelector('.case__placeholder');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%' } });
    tl.fromTo(media, { clipPath: 'inset(14% 10% 14% 10% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1.4, ease: 'expo.inOut' })
      .fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
      .fromTo(el.querySelectorAll('.card__meta, .card__title, .card__teaser, .card__story'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out' }, 0.6);

    // Gentle parallax while the scene is on screen
    gsap.to(inner, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });

    // Play video (if a src is provided) only while visible
    const video = el.querySelector('video');
    if (video && video.getAttribute('src')) {
      ScrollTrigger.create({ trigger: el, start: 'top 80%', end: 'bottom 20%',
        onToggle: (self) => (self.isActive ? video.play().catch(() => {}) : video.pause()) });
    }
  });
}

/* ---------- Magnetic buttons ---------- */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}

/* ---------- "View" cursor over work ---------- */
function initWorkCursor() {
  const cursor = document.querySelector('.cursor');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
  window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
  document.querySelectorAll('.card__media').forEach((m) => {
    m.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
    m.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
  });
}
