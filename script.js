/* ===================== NAV: fundo ao rolar ===================== */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ===================== MENU MOBILE ===================== */
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');

const closeMenu = () => {
  toggle.classList.remove('open');
  menu.classList.remove('open');
};

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

/* ===================== REVEAL AO ROLAR ===================== */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

/* ===================== DEPOIMENTOS (carrossel no mobile) ===================== */
const track = document.getElementById('testiTrack');
const prev = document.getElementById('testiPrev');
const next = document.getElementById('testiNext');
const cards = track ? Array.from(track.children) : [];
let index = 0;

const isCarousel = () => window.matchMedia('(max-width: 860px)').matches;

function showCard(i) {
  if (!isCarousel()) return;
  index = (i + cards.length) % cards.length;
  cards.forEach((c, n) => {
    c.style.display = n === index ? 'block' : 'none';
  });
}

function syncCarousel() {
  if (isCarousel()) {
    showCard(index);
  } else {
    cards.forEach((c) => (c.style.display = ''));
  }
}

if (track) {
  next.addEventListener('click', () => showCard(index + 1));
  prev.addEventListener('click', () => showCard(index - 1));
  window.addEventListener('resize', syncCarousel);
  syncCarousel();
}
