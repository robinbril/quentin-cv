// Nano Particle Background - Subtle floating particles
(function() {
    'use strict';
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-bg';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationId;
    
    // Config
    const CONFIG = {
        particleCount: 80,
        minSize: 1,
        maxSize: 3,
        minSpeed: 0.1,
        maxSpeed: 0.4,
        color: 'rgba(255, 255, 255, 0.08)', // Very subtle white
        connectionDistance: 120,
        connectionColor: 'rgba(212, 175, 55, 0.03)' // Subtle gold connections
    };
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);
            this.speedX = (Math.random() - 0.5) * CONFIG.maxSpeed;
            this.speedY = (Math.random() - 0.5) * CONFIG.maxSpeed;
            this.opacity = 0.3 + Math.random() * 0.7;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.08 * this.opacity})`;
            ctx.fill();
        }
    }
    
    function init() {
        resize();
        particles = [];
        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONFIG.connectionDistance) {
                    const opacity = (1 - distance / CONFIG.connectionDistance) * 0.03;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections first (behind particles)
        drawConnections();
        
        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Throttled resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
        }, 100);
    });
    
    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            animate();
        });
    } else {
        init();
        animate();
    }
    
    // Pause when tab not visible (performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
})();
