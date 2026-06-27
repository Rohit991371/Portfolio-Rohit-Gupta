

/* ─── Navbar scroll ─────────────────────────────────────────────────────────── */
let ticking = false;

function updateNavbar() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', function () {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});

/* ─── Scroll-to-top button ───────────────────────────────────────────────────── */
const mybutton = document.getElementById('myBtn');

window.addEventListener('scroll', function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}, { passive: true });

function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── Smooth scroll for anchor links ────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Resume download ────────────────────────────────────────────────────────── */
function downloadResume() {
  const link = document.createElement('a');
  link.href = './assets/Rohit Gupta.pdf';
  link.download = 'Rohit_Gupta_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ─── Intersection Observer — scroll animations ──────────────────────────────── */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function initScrollAnimations() {
  document.querySelectorAll(
    '.project-card, .experience-item, .skill-category, .certificate-card, .blog-card'
  ).forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

/* ─── Mobile menu ────────────────────────────────────────────────────────────── */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
let mobileMenuOpen = false;

mobileMenuBtn.addEventListener('click', function () {
  mobileMenuOpen = !mobileMenuOpen;
  if (mobileMenuOpen) {
    navLinks.classList.add('mobile', 'active');
    this.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
  } else {
    navLinks.classList.remove('mobile', 'active');
    this.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
  }
});

document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('mobile', 'active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = '';
      mobileMenuOpen = false;
    }
  });
});

document.addEventListener('click', function (e) {
  if (mobileMenuOpen && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    navLinks.classList.remove('mobile', 'active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
    mobileMenuOpen = false;
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    navLinks.classList.remove('mobile', 'active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
    mobileMenuOpen = false;
  }
});

/* ─── Particles (hero background) ───────────────────────────────────────────── */
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 5 : 18;

  const container = document.createElement('div');
  container.style.cssText =
    'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.style.cssText =
      'position:absolute;width:2px;height:2px;background:rgba(37,99,235,0.18);border-radius:50%;' +
      'left:' + (Math.random() * 100) + '%;' +
      'top:' + (Math.random() * 100) + '%;' +
      'animation:particleFloat ' + (Math.random() * 6 + 4) + 's infinite linear;';
    container.appendChild(p);
  }
  hero.appendChild(container);
}

/* ─── Medium RSS feed ────────────────────────────────────────────────────────── */
/**
 * Medium's RSS feed at https://medium.com/feed/@username is CORS-blocked for
 * direct browser fetch. We use the rss2json.com API (free, no key needed) which
 * proxies and converts the feed to JSON — works from a static site with no backend.
 */
const MEDIUM_USERNAME = 'rohit.gupta1604004';
const RSS2JSON_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@' +
  MEDIUM_USERNAME +
  '&count=6';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function truncate(str, maxLen) {
  const clean = stripHtml(str);
  return clean.length > maxLen ? clean.substring(0, maxLen).trimEnd() + '…' : clean;
}

function renderBlogCards(items) {
  const grid = document.getElementById('blogGrid');
  if (!items || items.length === 0) {
    grid.innerHTML =
      '<div class="blog-empty"><i class="fab fa-medium"></i>' +
      '<p>No articles found. <a href="https://medium.com/@' +
      MEDIUM_USERNAME +
      '" target="_blank" style="color:var(--primary-blue)">Visit Medium</a> to read my latest posts.</p></div>';
    return;
  }

  grid.innerHTML = items
    .map(function (item) {
      const imageHtml = item.thumbnail
        ? '<div class="blog-card-image"><img src="' +
          item.thumbnail +
          '" alt="' +
          item.title.replace(/"/g, '&quot;') +
          '" loading="lazy" onerror="this.parentElement.innerHTML=\'<i class=\\\"fab fa-medium\\\"></i>\'"></div>'
        : '<div class="blog-card-image"><i class="fab fa-medium"></i></div>';

      const desc = truncate(item.description || item.content || '', 130);

      return (
        '<div class="blog-card">' +
        imageHtml +
        '<div class="blog-card-body">' +
        '<div class="blog-card-date">' + formatDate(item.pubDate) + '</div>' +
        '<div class="blog-card-title">' + item.title + '</div>' +
        (desc ? '<div class="blog-card-desc">' + desc + '</div>' : '') +
        '<a href="' + item.link + '" target="_blank" rel="noopener" class="blog-card-link">' +
        'Read article <i class="fas fa-arrow-right"></i></a>' +
        '</div></div>'
      );
    })
    .join('');

  // Re-observe blog cards for scroll animation
  document.querySelectorAll('.blog-card').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

function loadMediumFeed() {
  fetch(RSS2JSON_URL)
    .then(function (res) {
      if (!res.ok) throw new Error('Network response not ok');
      return res.json();
    })
    .then(function (data) {
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        renderBlogCards(data.items);
      } else {
        renderBlogCards([]);
      }
    })
    .catch(function () {
      const grid = document.getElementById('blogGrid');
      grid.innerHTML =
        '<div class="blog-empty"><i class="fab fa-medium"></i>' +
        '<p>Couldn\'t load articles right now. ' +
        '<a href="https://medium.com/@' +
        MEDIUM_USERNAME +
        '" target="_blank" style="color:var(--primary-blue)">Read them on Medium</a>.</p></div>';
    });
}

/* ─── Contact form ───────────────────────────────────────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  emailjs
    .sendForm('service_j8q1nhk', 'template_nvlnj1t', this)
    .then(
      function () {
        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        btn.style.background = '#059669';
        document.getElementById('contactForm').reset();
        setTimeout(function () {
          btn.disabled = false;
          btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          btn.style.background = '';
        }, 3000);
      },
      function () {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        alert('Something went wrong. Please try emailing me directly at rohit.gupta1604004@gmail.com');
      }
    );
});

/* ─── Skills animation ───────────────────────────────────────────────────────── */
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-item').forEach(function (skill, index) {
          setTimeout(function () {
            skill.style.animation = 'fadeInUp 0.4s ease-out forwards';
          }, index * 60);
        });
        skillsObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

if (skillsSection) skillsObserver.observe(skillsSection);

/* ─── Adjust animations for tiny screens ─────────────────────────────────────── */
function adjustAnimationsForDevice() {
  if (window.innerWidth <= 480) {
    document
      .querySelectorAll('.hero-content h1, .hero-content p, .hero-buttons, .hero-eyebrow')
      .forEach(function (el) {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
  }
}

/* ─── Inject keyframes (particle float + spin) ───────────────────────────────── */
(function injectKeyframes() {
  const s = document.createElement('style');
  s.textContent = [
    '@keyframes particleFloat{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(-220px) rotate(360deg);opacity:0}}',
    '@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}',
  ].join('');
  document.head.appendChild(s);
})();

/* ─── Init on DOM ready ──────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  initScrollAnimations();
  adjustAnimationsForDevice();
  loadMediumFeed();

  setTimeout(createParticles, 400);

  console.log(
    '%c🚀 Rohit Gupta — Portfolio',
    'color:#2563EB;font-size:16px;font-weight:bold;'
  );
  console.log(
    '%cGitHub: https://github.com/Rohit991371  |  LinkedIn: https://www.linkedin.com/in/rohitgupta1604/',
    'color:#6b7280;font-size:12px;'
  );
});

window.addEventListener('resize', adjustAnimationsForDevice, { passive: true });