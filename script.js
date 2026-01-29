// ==========================================
// CINEMATIC PRELOADER
// ==========================================
function startPreloader() {
    const preloader = document.getElementById('preloader');
    const loaderLine = document.getElementById('loader-line');
    
    if (!preloader) return;
    
    // Animate Line
    if (loaderLine) {
        // Simulate loading time
        setTimeout(() => {
            loaderLine.style.width = '100%';
        }, 100);
    }

    // Fade out sequence
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            // Start particles after preloader
            initParticles();
        }, 800);
    }, 2000); // 2 second display
}

// Start immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startPreloader);
} else {
    startPreloader();
}

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

    // Configuration
    const particleCount = 60;
    const connectionDistance = 0; // No lines, just dust
    const moveSpeed = 0.2;

    function resize() {
        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * moveSpeed;
            this.vy = (Math.random() - 0.5) * moveSpeed;
            this.size = Math.random() * 3 + 1; // Larger: 1-4px
            this.alpha = Math.random() * 0.6 + 0.3; // More visible: 0.3-0.9
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around screen
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`; // Gold dust
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        resize();
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

    window.addEventListener('resize', resize);
    init();
}

// ==========================================
// PREMIUM THEME TOGGLE
// ==========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(`${currentTheme}-theme`);
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        
        // Add smooth transition
        body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        // Toggle classes
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(isDark ? 'light-theme' : 'dark-theme');
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        
        console.log(`Theme switched to: ${isDark ? 'light' : 'dark'}`);
    });
}

// ==========================================
// CURSOR GLOW EFFECT
// ==========================================
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    });
}

// ==========================================
// BUTTON HOVER SOUNDS (Professional & Subtle)
// ==========================================
let audioContext;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playHoverSound() {
    try {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = 400; // Lower pitch for elegance
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    } catch (error) {
        // Audio context may be blocked until user interaction
    }
}

document.querySelectorAll('a, button, .archive-item, .hero-project').forEach(el => {
    el.addEventListener('mouseenter', () => playHoverSound());
});

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
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// FADE-IN ANIMATION
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-project, .archive-item, .timeline-item').forEach(el => {
    el.classList.add('fade-in-section');
    fadeObserver.observe(el);
});

// Initialize theme toggle when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
