// Generative canvas background for hero section
// Creates subtle, organic light movement - imperceptible but "alive"

const canvas = document.getElementById("hero-field");
if (canvas) {
  const ctx = canvas.getContext("2d");
  
  let w, h, t = 0;
  
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resize);
  resize();
  
  function draw() {
    ctx.clearRect(0, 0, w, h);
    
    // Create radial gradient that drifts subtly
    const g = ctx.createRadialGradient(
      w * 0.5 + Math.sin(t) * 80,
      h * 0.4 + Math.cos(t * 0.7) * 60,
      0,
      w * 0.5,
      h * 0.5,
      Math.max(w, h) * 0.8
    );
    
    g.addColorStop(0, "rgba(120,140,180,0.12)");
    g.addColorStop(0.4, "rgba(40,50,70,0.12)");
    g.addColorStop(1, "rgba(10,12,16,0.9)");
    
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    
    // Extremely slow increment - below conscious perception
    t += 0.002;
    requestAnimationFrame(draw);
  }
  
  draw();
}
