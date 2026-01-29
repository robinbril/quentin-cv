// ==========================================
// PRELOADER
// ==========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                initParticles(); // Start particles only after load
            }, 500);
        }, 800);
    } else {
        initParticles(); // Fallback
    }
});

// ==========================================
// COSMIC PARTICLES SYSTEM
// ==========================================
function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration - More subtle particles
    const particleCount = window.innerWidth < 768 ? 10 : 20;
    const moveSpeed = 0.15;

    function resize() {
        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * moveSpeed;
            this.vy = (Math.random() - 0.5) * moveSpeed;
            this.size = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.2 + 0.05;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`; // Gold
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        init();
    });
    init();
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon based on state
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            // Close icon logic if you want to switch icons
            // For now simple toggle
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ==========================================
// CURSOR GLOW (Desktop Only)
// ==========================================
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    });
} else if (cursorGlow) {
    cursorGlow.style.display = 'none'; // Disable on touch
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Initialize Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
