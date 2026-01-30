// ==========================================
// ADVANCED EFFECTS - Award-Grade Interactions
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // INTERSECTION OBSERVER - Timeline Animation
    // ==========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0 && 'IntersectionObserver' in window) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered delay
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    } else {
        // Fallback: show all immediately
        timelineItems.forEach(item => item.classList.add('visible'));
    }

    // ==========================================
    // FLUID TYPOGRAPHY - Mouse Weight Response
    // ==========================================
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && window.matchMedia("(pointer: fine)").matches) {
        let targetWeight = 300;
        let currentWeight = 300;
        let animating = false;

        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate distance from center
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
                );
                const maxDistance = Math.sqrt(
                    Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
                );
                
                // Closer to center = heavier weight
                const normalizedDistance = 1 - (distance / maxDistance);
                targetWeight = 300 + (normalizedDistance * 200); // 300-500 range
            });

            heroSection.addEventListener('mouseleave', () => {
                targetWeight = 300;
            });

            // Smooth animation loop with lag
            function animateWeight() {
                const diff = targetWeight - currentWeight;
                currentWeight += diff * 0.02; // Very slow interpolation (2%)
                
                heroTitle.style.setProperty('--title-weight', Math.round(currentWeight));
                heroTitle.style.fontVariationSettings = `'wght' ${Math.round(currentWeight)}`;
                
                requestAnimationFrame(animateWeight);
            }
            
            heroTitle.setAttribute('data-weight', '');
            animateWeight();
        }
    }

    // ==========================================
    // MAGNETIC BUTTONS (Subtle)
    // ==========================================
    const magneticButtons = document.querySelectorAll('.cta-primary-btn, .cta-secondary-btn, .nav-links .btn-primary');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Subtle magnetic pull (max 4px)
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ==========================================
    // STAT NUMBERS - Set data attribute for glow
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.setAttribute('data-value', stat.textContent);
    });

    // ==========================================
    // SMOOTH NAVBAR BACKGROUND ON SCROLL
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = '#000000';
                navbar.style.backdropFilter = 'none';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ==========================================
    // PRELOAD GEIST FONT
    // ==========================================
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/Geist-Regular.woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
});
