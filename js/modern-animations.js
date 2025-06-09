/**
 * Modern Minimal Animation System
 * Uses Intersection Observer for performant scroll-based animations
 * Tailwind CSS classes for styling
 */

class ModernAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
        this.setupReducedMotion();
    }

    setupIntersectionObserver() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            // Set initial state
            el.classList.add('opacity-0', 'translate-y-4');
            observer.observe(el);
        });

        document.querySelectorAll('.animate-fade-in').forEach(el => {
            el.classList.add('opacity-0');
            observer.observe(el);
        });

        document.querySelectorAll('.animate-slide-up').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-8');
            observer.observe(el);
        });

        document.querySelectorAll('.animate-slide-left').forEach(el => {
            el.classList.add('opacity-0', 'translate-x-8');
            observer.observe(el);
        });

        document.querySelectorAll('.animate-slide-right').forEach(el => {
            el.classList.add('opacity-0', '-translate-x-8');
            observer.observe(el);
        });
    }

    animateElement(element) {
        // Apply smooth transition
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Determine animation type and apply
        if (element.classList.contains('animate-on-scroll')) {
            element.classList.remove('opacity-0', 'translate-y-4');
            element.classList.add('opacity-100', 'translate-y-0');
        } else if (element.classList.contains('animate-fade-in')) {
            element.classList.remove('opacity-0');
            element.classList.add('opacity-100');
        } else if (element.classList.contains('animate-slide-up')) {
            element.classList.remove('opacity-0', 'translate-y-8');
            element.classList.add('opacity-100', 'translate-y-0');
        } else if (element.classList.contains('animate-slide-left')) {
            element.classList.remove('opacity-0', 'translate-x-8');
            element.classList.add('opacity-100', 'translate-x-0');
        } else if (element.classList.contains('animate-slide-right')) {
            element.classList.remove('opacity-0', '-translate-x-8');
            element.classList.add('opacity-100', 'translate-x-0');
        }

        // Add a subtle delay for staggered animations
        const delay = Math.random() * 100;
        element.style.transitionDelay = `${delay}ms`;
    }

    setupHoverEffects() {
        // Modern hover effects using Tailwind utilities
        document.querySelectorAll('.modern-hover').forEach(el => {
            el.classList.add('transition-all', 'duration-300', 'ease-in-out');
        });

        document.querySelectorAll('.hover-lift').forEach(el => {
            el.classList.add('transition-all', 'duration-300', 'ease-in-out', 'hover:scale-105', 'hover:shadow-lg');
        });

        document.querySelectorAll('.hover-glow').forEach(el => {
            el.classList.add('transition-all', 'duration-300', 'ease-in-out', 'hover:shadow-xl', 'hover:shadow-primary-500/25');
        });

        document.querySelectorAll('.hover-subtle').forEach(el => {
            el.classList.add('transition-all', 'duration-200', 'ease-in-out', 'hover:translate-y-1');
        });
    }

    setupReducedMotion() {
        // Respect user's motion preferences
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleReducedMotion = (e) => {
            if (e.matches) {
                // Disable animations
                document.documentElement.style.setProperty('--animation-duration', '0s');
                document.querySelectorAll('[style*="transition"]').forEach(el => {
                    el.style.transition = 'none';
                });
            } else {
                // Enable animations
                document.documentElement.style.removeProperty('--animation-duration');
            }
        };

        mediaQuery.addListener(handleReducedMotion);
        handleReducedMotion(mediaQuery);
    }

    // Utility method for manual animation triggers
    triggerAnimation(element, animationType = 'fade-in') {
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        switch (animationType) {
            case 'fade-in':
                element.classList.remove('opacity-0');
                element.classList.add('opacity-100');
                break;
            case 'slide-up':
                element.classList.remove('opacity-0', 'translate-y-8');
                element.classList.add('opacity-100', 'translate-y-0');
                break;
            case 'scale-in':
                element.classList.remove('opacity-0', 'scale-95');
                element.classList.add('opacity-100', 'scale-100');
                break;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernAnimations();
});

// Export for use in other modules
window.ModernAnimations = ModernAnimations;
