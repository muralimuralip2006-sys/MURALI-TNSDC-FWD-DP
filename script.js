// Smooth scrolling (native CSS support, just set property)
document.documentElement.style.scrollBehavior = 'smooth';

const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const mobileMenu = document.getElementById('mobileMenu');
const toggleBtn = document.querySelector('.nav-toggle');

// Toggle mobile menu
toggleBtn?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Close mobile menu on link click
mobileMenu?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    mobileMenu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
});

// Active link highlighting on scroll
const sections = ['home','about','skills','projects','contact']
  .map(id => document.getElementById(id));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => 
        a.classList.toggle('active', a.getAttribute('href') === '#' + id)
      );
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(sec => observer.observe(sec));

// Copy email to clipboard when clicked
const emailLink = document.getElementById('emailLink');
const copyStatus = document.getElementById('copyStatus');

emailLink.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = 'muralimurali.p2006@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = ' (Copied!)';
    setTimeout(() => copyStatus.textContent = '', 1600);
  } catch (err) {
    const tmp = document.createElement('input');
    document.body.appendChild(tmp);
    tmp.value = email;
    tmp.select();
    document.execCommand('copy');
    tmp.remove();
    copyStatus.textContent = ' (Copied!)';
    setTimeout(() => copyStatus.textContent = '', 1600);
  }
  window.location.href = 'mailto:' + email;
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();