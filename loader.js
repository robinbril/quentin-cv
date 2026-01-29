// Premium Loading Screen with Stunning Transition
document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('premium-loader');
  const loaderLogo = document.querySelector('.loader-logo');
  
  // Simulate loading process
  setTimeout(() => {
    // Start exit animation
    if (loaderLogo) {
      loaderLogo.classList.add('fade-out');
    }
    
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hiding');
      }
      
      // Remove from DOM after animation
      setTimeout(() => {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 1000);
    }, 600);
  }, 1800); // Show loader for 1.8 seconds
});
