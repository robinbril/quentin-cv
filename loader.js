// Premium Loading Screen - Clean Exit
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('premium-loader');
    
    if (!loader) return;
    
    // Minimum display time: 1.2 seconds (quick but noticeable)
    const minDisplayTime = 1200;
    const startTime = Date.now();
    
    // Wait for page to be ready
    const hideLoader = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDisplayTime - elapsed);
        
        setTimeout(() => {
            // Add hiding class for CSS animation
            loader.classList.add('hiding');
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
                // Ensure body can scroll
                document.body.classList.remove('loading');
            }, 500); // Match CSS animation duration
        }, remaining);
    };
    
    // Hide when everything is loaded
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
});
