/* ============================================================
   Ritesh — Portfolio interactions & animations
   Vanilla JS, no dependencies.
   ============================================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Loader ---------- */
(function loader() {
  const el = document.getElementById('loader');
  const count = document.getElementById('loaderCount');
  if (!el) return;
  if (reduceMotion) { el.remove(); document.body.classList.add('loaded'); startHero(); return; }

  let n = 0;
  const tick = setInterval(() => {
    n += Math.floor(Math.random() * 8) + 3;
    if (n >= 100) { n = 100; clearInterval(tick); finish(); }
    count.textContent = n;
  }, 90);

  function finish() {
    setTimeout(() => {
      el.classList.add('done');
      document.body.classList.add('loaded');
      startHero();
      setTimeout(() => el.remove(), 1100);
    }, 350);
  }
})();

/* ---------- Hero intro (staggered lines) ---------- */
function startHero() {
  document.querySelectorAll('.hero [data-stagger]').forEach((el, i) => {
    el.style.transition = 'transform 1s cubic-bezier(0.16,1,0.3,1)';
    el.style.transitionDelay = 0.1 + i * 0.08 + 's';
    requestAnimationFrame(() => { el.style.transform = 'translateY(0)'; });
  });
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-line').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 300 + i * 60);
  });
  runCounters();
}

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal-up, .reveal-line').forEach((el) => {
  if (!el.closest('.hero')) io.observe(el);
});

/* ---------- Contact big-text stagger on view ---------- */
const contactIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-stagger]').forEach((el, i) => {
      el.style.transition = 'transform 1s cubic-bezier(0.16,1,0.3,1)';
      el.style.transitionDelay = i * 0.1 + 's';
      el.style.transform = 'translateY(0)';
    });
    contactIO.unobserve(e.target);
  });
}, { threshold: 0.3 });
const contactTitle = document.querySelector('.contact__title');
if (contactTitle) contactIO.observe(contactTitle);

/* ---------- Animated stat counters ---------- */
function runCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target + '+'; return; }
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); el.textContent = target + '+'; return; }
      el.textContent = cur;
    }, 40);
  });
}

/* ---------- Navbar scrolled state + scroll progress ---------- */
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 60);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Custom cursor ---------- */
(function cursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const ring = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  let rx = 0, ry = 0, mx = 0, my = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });
  (function loop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('[data-hover], a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });
})();

/* ---------- Tilt effect on hero photo / about photo ---------- */
document.querySelectorAll('[data-tilt]').forEach((el) => {
  if (reduceMotion) return;
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
    el.style.transition = 'transform .1s ease';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transition = 'transform .6s cubic-bezier(0.16,1,0.3,1)';
    el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
  });
});

/* ---------- Subtle parallax on hero title ---------- */
if (!reduceMotion) {
  const heroTitle = document.querySelector('.hero__title');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroTitle && y < window.innerHeight) heroTitle.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
}
