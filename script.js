// Navbar scroll effect with better performance
let ticking = false;

function updateNavbar() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  ticking = false;
}

window.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form handling
// document.getElementById("contactForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   // Get form data
//   const formData = new FormData(this);
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const message = formData.get("message");

//   // Simple validation
//   if (!name || !email || !message) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   // Here you would typically send the data to a server
//   // For demo purposes, we'll just show a success message
//   alert("Thank you for your message! I'll get back to you soon.");
//   this.reset();
// });

  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_j8q1nhk', 'template_nvlnj1t', this)
      .then(function(response) {
        console.log('Email sent!', response.status, response.text);
        alert('Email sent successfully!');
      }, function(error) {
        console.error('Error sending email:', error);
        alert('Oops! Something went wrong.');
      });
      this.reset();
  });


// Resume download function
function downloadResume() {
  const link = document.createElement("a");
  // link.href = 'Rohit Gupta.pdf';
  link.href = "./assets/Rohit Gupta.pdf";
  link.download = "Rohit Gupta.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Optimized Intersection Observer with better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
}, observerOptions);

// Observe elements for animation with initial hidden state
document
  .querySelectorAll(".project-card, .experience-item, .skill-category")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

// Enhanced mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector(".nav-links");
let mobileMenuOpen = false;

mobileMenuBtn.addEventListener("click", function () {
  mobileMenuOpen = !mobileMenuOpen;

  if (mobileMenuOpen) {
    navLinks.classList.add("mobile", "active");
    this.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = "hidden"; // Prevent background scroll
  } else {
    navLinks.classList.remove("mobile", "active");
    this.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "auto";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("mobile", "active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = "auto";
      mobileMenuOpen = false;
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  if (
    mobileMenuOpen &&
    !navLinks.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    navLinks.classList.remove("mobile", "active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "auto";
    mobileMenuOpen = false;
  }
});

// Handle window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("mobile", "active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "auto";
    mobileMenuOpen = false;
  }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Optimized particle creation with mobile detection
function createParticles() {
  // Reduce particles on mobile for better performance
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 5 : 20;

  const hero = document.querySelector(".hero");
  const particlesContainer = document.createElement("div");
  particlesContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
                will-change: transform;
            `;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(37, 99, 235, 0.2);
                    border-radius: 50%;
                    animation: float ${Math.random() * 6 + 4}s infinite linear;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    will-change: transform;
                `;
    particlesContainer.appendChild(particle);
  }

  hero.appendChild(particlesContainer);
}

// Add smooth CSS transitions
const style = document.createElement("style");
style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-200px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            /* Smooth scrolling performance improvements */
            * {
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000;
            }
            
            /* Optimize animations */
            .hero-content,
            .hero-image,
            .project-card,
            .experience-item,
            .skill-category {
                will-change: transform;
            }
        `;
document.head.appendChild(style);

// Initialize particles on load with delay for better performance
window.addEventListener("load", function () {
  setTimeout(() => {
    createParticles();
  }, 500);

  // Initialize touch interactions for mobile
  if ("ontouchstart" in window) {
    initTouchInteractions();
  }
});

// Optimize animations for different screen sizes
function adjustAnimationsForDevice() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

  // Disable some animations on very small screens for better performance
  if (window.innerWidth <= 480) {
    document
      .querySelectorAll(".hero-content h1, .hero-content p, .hero-buttons")
      .forEach((el) => {
        el.style.animation = "none";
        el.style.opacity = "1";
        el.style.transform = "none";
      });
  }
}

// Call on load and resize
window.addEventListener("load", adjustAnimationsForDevice);
window.addEventListener("resize", adjustAnimationsForDevice);

// Remove problematic parallax effect that causes jerky scrolling
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const parallax = document.querySelector('.hero');
//     const speed = scrolled * 0.5;
//
//     if (parallax) {
//         parallax.style.transform = `translateY(${speed}px)`;
//     }
// });

// Skills animation on scroll
function animateSkills() {
  const skills = document.querySelectorAll(".skill-item");
  skills.forEach((skill, index) => {
    setTimeout(() => {
      skill.style.animation = "fadeInUp 0.5s ease-out forwards";
    }, index * 100);
  });
}

// Trigger skills animation when skills section is visible
const skillsSection = document.querySelector(".skills");
const skillsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Counter animation for stats (if you want to add stats)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Theme switcher (optional feature for dark/light mode)
function initThemeSwitcher() {
  const themeBtn = document.createElement("button");
  themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  themeBtn.style.cssText = `
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: var(--primary-blue);
                color: white;
                cursor: pointer;
                z-index: 1000;
                transition: var(--transition);
                box-shadow: var(--shadow);
            `;

  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const icon = this.querySelector("i");
    icon.className = document.body.classList.contains("dark-mode")
      ? "fas fa-sun"
      : "fas fa-moon";
  });

  document.body.appendChild(themeBtn);
}

// Initialize theme switcher
// initThemeSwitcher();

// Loading animation
window.addEventListener("load", function () {
  const loader = document.createElement("div");
  loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease-out;
            `;

  loader.innerHTML = `
                <div style="text-align: center;">
                    <div style="width: 50px; height: 50px; border: 3px solid #e5e7eb; border-top: 3px solid var(--primary-blue); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                    <p style="color: var(--primary-blue); font-weight: 600;">Loading...</p>
                </div>
            `;

  // Add spin animation
  const spinStyle = document.createElement("style");
  spinStyle.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
  document.head.appendChild(spinStyle);

  document.body.appendChild(loader);

  // Remove loader after a short delay
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, 1000);
});

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Rohit Gupta Portfolio - Loaded Successfully!");

  // Add any additional initialization code here

  // Example: Add a console message for developers
  console.log(
    "%c🚀 Welcome to Rohit Gupta's Portfolio!",
    "color: #2563EB; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%cInterested in the code? Check out the GitHub repository!",
    "color: #6b7280; font-size: 12px;"
  );
});
