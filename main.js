/* ============================================
   MANOJ DHIMAN — PORTFOLIO SCRIPTS
   ============================================ */

// ---- CUSTOM CURSOR ----


// ---- NAVBAR SCROLL ----
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- ACTIVE NAV ----
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---- SCROLL REVEAL ----
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}
initReveal();

// ---- SKILL BARS ----
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target;
        const level = fill.dataset.level || '80';
        setTimeout(() => { fill.style.width = level + '%'; }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}
initSkillBars();

// ---- SKILLS TABS ----
const skillTabs = document.querySelectorAll('.skills-tab');
const skillCards = document.querySelectorAll('.skill-card');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    skillCards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.style.display = 'flex';
        setTimeout(() => {
          const fill = card.querySelector('.skill-bar-fill');
          if (fill && fill.style.width === '0%' || !fill?.style.width) {
            fill.style.width = (fill?.dataset.level || '80') + '%';
          }
        }, 100);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---- CONTACT FORM ----
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ---- HERO PARALLAX ORBS ----
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  orbs.forEach((orb, i) => {
    const factor = i === 0 ? 1 : -0.7;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.count));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}
