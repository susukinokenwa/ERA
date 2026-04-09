// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  // remove cursor update from here entirely

  const cw = cursor.offsetWidth / 2;
  const ch = cursor.offsetHeight / 2;
  cursor.style.transform = `translate(${mx - cw}px, ${my - ch}px)`;
});

function animRing() {
  rx += (mx - rx) * 1;
  ry += (my - ry) * 1;

  const rw = ring.offsetWidth / 2;
  const rh = ring.offsetHeight / 2;
  ring.style.transform = `translate(${rx - rw}px, ${ry - rh}px)`;

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

// Copy Email To Clipboard
navigator.clipboard.writeText("erallianceinfo@gmail.com");

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