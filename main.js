const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  function animRing() {
    rx += (mx - rx - 16) * 0.12;
    ry += (my - ry - 16) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animRing);
  }
  animRing();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
reveals.forEach(r => observer.observe(r));

// Contact form — only runs if form exists on this page
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        const status = document.getElementById('form-status');
        btn.textContent = 'SENDING...';
        emailjs.sendForm('service_b8by1rd', 'template_jpe45h4', this)
            .then(() => {
                status.textContent = 'Message sent successfully.';
                status.style.color = '#7fff7f';
                btn.textContent = 'SENT ✓';
                this.reset();
            })
            .catch((error) => {
                status.textContent = 'Something went wrong. Try emailing directly.';
                status.style.color = '#ff6b6b';
                btn.textContent = 'SEND MESSAGE →';
                console.error(error);
            });
    });
}

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Page Scrolling 

let isScrolling = false;

window.addEventListener('wheel', (e) => {
  e.preventDefault();

  if (isScrolling) return;
  isScrolling = true;

  const direction = e.deltaY > 0 ? 1 : -1;
  const sections = Array.from(document.querySelectorAll('section'));
  const current = sections.findIndex(s => {
    const rect = s.getBoundingClientRect();
    return rect.top >= -10 && rect.top < window.innerHeight / 2;
  });

  const next = sections[current + direction];
  if (next) {
    next.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => { isScrolling = false; }, 800);
}, { passive: false });



// Countdown for main page
const countdownMain = document.getElementById('countdown-main');
if (countdownMain) {
  const target = new Date("May 15, 2026 10:00:00").getTime();
  function updateMain() {
    const now = new Date().getTime();
    const dist = target - now;
    if (dist < 0) { countdownMain.textContent = "Event Started"; return; }
    const d = Math.floor(dist / 86400000);
    const h = Math.floor((dist % 86400000) / 3600000);
    const m = Math.floor((dist % 3600000) / 60000);
    const s = Math.floor((dist % 60000) / 1000);
    countdownMain.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
  updateMain();
  setInterval(updateMain, 1000);
}