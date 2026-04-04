// Custom cursor
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


    document.getElementById('contact-form').addEventListener('submit', function(e) {
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