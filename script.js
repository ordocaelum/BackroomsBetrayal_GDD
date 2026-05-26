/* script.js — Backrooms: Betrayal GDD Interactivity */
(function () {
  'use strict';

  /* ── Navigation scroll shadow ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Intersection Observer: reveal elements ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Entropy bars animation ── */
  const entropyFills = document.querySelectorAll('.entropy-row-fill');
  if ('IntersectionObserver' in window) {
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animated');
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    entropyFills.forEach(el => barObs.observe(el));
  } else {
    entropyFills.forEach(el => el.classList.add('animated'));
  }

  /* ── Timeline bars animation ── */
  const timelineBars = document.querySelectorAll('.tc-bar[data-width]');
  if ('IntersectionObserver' in window) {
    const tlObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.width;
          tlObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    timelineBars.forEach(el => {
      el.style.width = '0';
      tlObs.observe(el);
    });
  } else {
    timelineBars.forEach(el => { el.style.width = el.dataset.width; });
  }

  /* ── Stability bar live flicker ── */
  const fill = document.querySelector('.stability-fill');
  if (fill) {
    setInterval(() => {
      const base = 55 + Math.random() * 20;
      fill.style.width = base + '%';
    }, 3500);
  }

  /* ── Active nav link highlighting ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  if (sections.length && navLinks.length) {
    const linkMap = {};
    navLinks.forEach(a => { linkMap[a.getAttribute('href').slice(1)] = a; });

    const highlightObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const link = linkMap[e.target.id];
        if (link) link.style.color = e.isIntersecting ? 'var(--accent-gold)' : '';
      });
    }, { threshold: 0.35 });
    sections.forEach(s => highlightObs.observe(s));
  }

  /* ── Roadmap table row pulse on hover ── */
  document.querySelectorAll('.roadmap-status-table tr[data-status]').forEach(row => {
    row.addEventListener('mouseenter', () => {
      const dot = row.querySelector('.status-dot');
      if (dot && !dot.classList.contains('status-done')) dot.style.transform = 'scale(1.4)';
    });
    row.addEventListener('mouseleave', () => {
      const dot = row.querySelector('.status-dot');
      if (dot) dot.style.transform = '';
    });
  });

  /* ── Subtle loop-step hover glow ── */
  const loopSteps = document.querySelectorAll('.loop-step');
  loopSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      step.style.setProperty('--step-glow', '1');
    });
    step.addEventListener('mouseleave', () => {
      step.style.removeProperty('--step-glow');
    });
  });

})();
