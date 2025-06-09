// Enhanced Animation Verification Script
console.log('🚀 Enhanced Scroll Animations - Verification Script');

// Check if enhanced animations are loaded
setTimeout(() => {
    if (window.enhancedScrollAnimations) {
        console.log('✅ Enhanced Scroll Animations loaded successfully');
        
        const elementsCount = window.enhancedScrollAnimations.animatedElements?.size || 0;
        console.log(`📊 Found ${elementsCount} animated elements`);
        
        // List all animated elements
        if (window.enhancedScrollAnimations.animatedElements) {
            window.enhancedScrollAnimations.animatedElements.forEach((data, element) => {
                console.log(`🎬 Element: ${element.tagName}${element.className ? '.' + element.className.split(' ').join('.') : ''}`);
                console.log(`   Animation type: ${data.type || 'unknown'}`);
            });
        }
        
        // Test manual trigger function
        console.log('🧪 Testing manual animation trigger...');
        if (typeof window.enhancedScrollAnimations.triggerAnimation === 'function') {
            console.log('✅ Manual trigger function available');
        }
        
    } else {
        console.error('❌ Enhanced Scroll Animations not loaded');
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    console.log(`🔧 Reduced motion preference: ${prefersReducedMotion ? 'enabled' : 'disabled'}`);
    
    // Check for animation elements in DOM
    const animatedElements = document.querySelectorAll([
        '[data-animate]',
        '.animate-on-scroll',
        '.animate-fade-in',
        '.animate-slide-up',
        '.animate-slide-down',
        '.animate-slide-left',
        '.animate-slide-right'
    ].join(', '));
    
    console.log(`🔍 Total animatable elements in DOM: ${animatedElements.length}`);
    
    console.log('🎉 Verification complete!');
}, 1000);

// Export verification functions for manual testing
window.animationTest = {
    restartAllAnimations: () => {
        if (window.enhancedScrollAnimations && window.enhancedScrollAnimations.triggerAnimation) {
            window.enhancedScrollAnimations.triggerAnimation('[data-animate], .animate-on-scroll');
            console.log('🔄 Restarted all animations');
        }
    },
    
    logAnimationState: () => {
        if (window.enhancedScrollAnimations) {
            console.table(Array.from(window.enhancedScrollAnimations.animatedElements.entries()).map(([el, data]) => ({
                element: el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').slice(0, 2).join('.') : ''),
                type: data.type,
                hasAnimated: data.hasAnimated
            })));
        }
    }
};

console.log('💡 Use animationTest.restartAllAnimations() or animationTest.logAnimationState() for testing');
