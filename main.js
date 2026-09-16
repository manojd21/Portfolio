/* ============================================
   MANOJ DHIMAN — PORTFOLIO SCRIPTS
   Rich motion, mobile-safe
   ============================================ */

const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobileWidth = () => window.innerWidth <= 900;



/* ---------------------------------------------
   NAVBAR SCROLL + HIDE ON SCROLL DOWN
--------------------------------------------- */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (navbar) {
    navbar.classList.toggle('scrolled', y > 50);
    if (!mobileMenu?.classList.contains('open')) {
      if (y > lastScrollY && y > 200) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
    }
  }
  lastScrollY = y;
}, { passive: true });

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach((a, i) => {
    a.style.transitionDelay = `${i * 0.06}s`;
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------------------------------------------
   ACTIVE NAV LINK
--------------------------------------------- */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ---------------------------------------------
   SCROLL REVEAL (fade/slide + scale variants)
--------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => observer.observe(el));
}
initReveal();

/* ---------------------------------------------
   PROGRESS BAR (top of page, scroll progress)
--------------------------------------------- */
(function initProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
})();

/* ---------------------------------------------
   SKILL BARS
--------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target;
        const level = fill.dataset.level || '80';
        setTimeout(() => { fill.style.width = level + '%'; }, 150);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.25 });
  bars.forEach(b => observer.observe(b));
}
initSkillBars();

/* ---------------------------------------------
   SKILLS TABS (with re-trigger animation)
--------------------------------------------- */
const skillTabs = document.querySelectorAll('.skills-tab');
const skillCards = document.querySelectorAll('.skill-card');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    let visibleIndex = 0;
    skillCards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      if (match) {
        card.style.display = 'flex';
        card.style.animation = 'none';
        card.offsetHeight; /* reflow */
        card.style.animation = `cardPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both`;
        card.style.animationDelay = `${visibleIndex * 0.04}s`;
        visibleIndex++;
        const fill = card.querySelector('.skill-bar-fill');
        if (fill) {
          fill.style.width = '0%';
          setTimeout(() => { fill.style.width = (fill.dataset.level || '80') + '%'; }, 150 + visibleIndex * 30);
        }
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ---------------------------------------------
   CONTACT FORM
--------------------------------------------- */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#16A34A';
    btn.style.transform = 'scale(0.97)';
    setTimeout(() => { btn.style.transform = ''; }, 150);
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      form.reset();
    }, 2800);
  });
}

/* ---------------------------------------------
   HERO PARALLAX ORBS (desktop only — disabled on touch/mobile)
--------------------------------------------- */
if (!isTouch && !prefersReducedMotion) {
  let rafId = null;
  window.addEventListener('mousemove', (e) => {
    if (isMobileWidth()) return;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const orbs = document.querySelectorAll('.orb');
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbs.forEach((orb, i) => {
        const factor = i === 0 ? 1 : -0.7;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
      rafId = null;
    });
  });
}

/* ---------------------------------------------
   MAGNETIC BUTTONS (desktop only)
--------------------------------------------- */
if (!isTouch && !prefersReducedMotion) {
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ---------------------------------------------
   TILT EFFECT ON CARDS (desktop only, subtle)
--------------------------------------------- */
if (!isTouch && !prefersReducedMotion) {
  document.querySelectorAll('.hero-card, .skill-card, .project-card, .highlight-card, .graphic-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ---------------------------------------------
   COUNTER ANIMATION
--------------------------------------------- */
function animateCounter(el, target, duration = 1400) {
  let start = 0;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
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

/* ---------------------------------------------
   MARQUEE PAUSE ON HOVER (desktop only)
--------------------------------------------- */
if (!isTouch) {
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
  });
}

/* ---------------------------------------------
   STAGGER CHILDREN AUTO-TAGGING
   Adds incremental delay to groups of cards that
   don't already have explicit data-reveal-delay
--------------------------------------------- */
(function autoStagger() {
  document.querySelectorAll('.skills-grid, .projects-grid, .tech-pills-row, .about-highlights, .graphics-grid').forEach(group => {
    const children = Array.from(group.children).filter(c => c.hasAttribute('data-reveal'));
    children.forEach((child, i) => {
      if (!child.hasAttribute('data-reveal-delay')) {
        child.style.transitionDelay = `${Math.min(i * 0.06, 0.4)}s`;
      }
    });
  });
})();

/* ---------------------------------------------
   PAGE LOAD FADE-IN
--------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');
});

/* ---------------------------------------------
   GRAPHICS PAGE — LIGHTBOX
--------------------------------------------- */
const graphicCards = document.querySelectorAll('.graphic-card');
if (graphicCards.length) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCat = document.getElementById('lightboxCat');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const galleryItems = Array.from(graphicCards);
  let currentIndex = 0;

  function updateLightbox() {
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxTitle.textContent = img.dataset.title || '';
    lightboxCat.textContent = img.dataset.category || '';
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
  }

  galleryItems.forEach((card, i) => {
    card.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}
