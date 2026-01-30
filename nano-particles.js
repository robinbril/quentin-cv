/* =========================================
   NANO PARTICLES - Organic Dark Matter
   ========================================= */
(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Config
    const CONFIG = {
        particleCount: 100, // Nano quantity
        baseSpeed: 0.15,
        color: '255, 255, 255',
        gold: '212, 175, 55',
    };

    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    // Setup Canvas - FIXED POSITION for Zoom Fix (Edge-to-Edge)
    canvas.id = 'nano-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-5'; // Way back
    canvas.style.pointerEvents = 'none';
    canvas.style.background = '#050505'; // Deep dark base, almost void
    document.body.prepend(canvas);

    // Particle Class
    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5; // Nano size (very small)
            
            // Organic movement (flow)
            const angle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(angle) * CONFIG.baseSpeed;
            this.vy = Math.sin(angle) * CONFIG.baseSpeed;
            
            this.life = Math.random(); 
            this.decay = 0.003 + Math.random() * 0.005;
            
            // Rare gold particles
            this.isGold = Math.random() > 0.96;
        }

        update() {
            // Organic Flow Movement (Simplex-ish)
            this.x += this.vx;
            this.y += this.vy;

            // Subtle Mouse Interaction (Push)
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.vx += (dx / dist) * force * 0.01;
                this.vy += (dy / dist) * force * 0.01;
            }

            // Friction
            this.vx *= 0.995;
            this.vy *= 0.995;

            // Breathe (Opacity Pulse)
            this.life += this.decay;
            if (this.life > 1 || this.life < 0) this.decay *= -1;

            // Screen Wrap (Infinite)
            if (this.x < -50) this.x = width + 50;
            if (this.x > width + 50) this.x = -50;
            if (this.y < -50) this.y = height + 50;
            if (this.y > height + 50) this.y = -50;
        }

        draw() {
            const opacity = (0.1 + (this.life * 0.3)) * (this.isGold ? 0.9 : 0.4);
            const color = this.isGold ? CONFIG.gold : CONFIG.color;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, ${opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle());
        }
        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        animate();
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
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
    
    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();