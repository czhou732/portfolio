// ================================================
// Scroll-based nav background
// ================================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ================================================
// Smooth scroll for anchor links
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================================================
// Intersection Observer for fade-in animations
// ================================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
  const animElements = document.querySelectorAll(
    '.service-card, .case-study, .process-step, .hero-badge, .hero h1, .hero-sub, .hero-actions, .hero-stats'
  );

  animElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
    observer.observe(el);
  });
});

// ================================================
// Animated chart bars (pulse on view)
// ================================================
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.chart-bar');
      bars.forEach((bar, i) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
          bar.style.transition = `height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08}s`;
          bar.style.height = height;
        }, 200);
      });
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.dash-chart').forEach(chart => {
  chartObserver.observe(chart);
});
