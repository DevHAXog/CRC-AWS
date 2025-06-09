/**
 * Enhanced Scroll-Based Animation System
 * Implements restart-on-re-entry animations using Intersection Observer API
 * Supports multiple animation types and respects reduced motion preferences
 */

class EnhancedScrollAnimations {
    constructor() {
        this.animatedElements = new Map();
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (this.prefersReducedMotion) {
            console.log('Reduced motion preference detected, animations disabled');
            return;
        }

        this.setupIntersectionObserver();
        this.setupTypewriterAnimations();
    }    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0, 0.1, 0.5],
            rootMargin: '50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.1;

                if (isVisible) {
                    this.animateIn(element);
                } else {
                    this.animateOut(element);
                }
            });
        }, observerOptions);

        // Find and observe all animatable elements
        this.findAnimatableElements().forEach(element => {
            observer.observe(element);
            this.prepareElement(element);
        });
    }

    findAnimatableElements() {
        return document.querySelectorAll([
            '[data-animate]',
            '.animate-on-scroll',
            '.animate-fade-in',
            '.animate-slide-up',
            '.animate-slide-down',
            '.animate-slide-left',
            '.animate-slide-right',
            '.animate-scale-in',
            '.animate-bounce-in'
        ].join(', '));
    }

    prepareElement(element) {
        // Store original state
        const animationType = this.getAnimationType(element);
        
        this.animatedElements.set(element, {
            type: animationType,
            hasAnimated: false,
            originalTransform: element.style.transform || '',
            originalOpacity: element.style.opacity || ''
        });

        // Set initial state based on animation type
        this.setInitialState(element, animationType);
    }

    getAnimationType(element) {
        if (element.hasAttribute('data-animate') || element.classList.contains('animate-on-scroll')) {
            return 'fade-slide-up';
        } else if (element.classList.contains('animate-fade-in')) {
            return 'fade';
        } else if (element.classList.contains('animate-slide-up')) {
            return 'slide-up';
        } else if (element.classList.contains('animate-slide-down')) {
            return 'slide-down';
        } else if (element.classList.contains('animate-slide-left')) {
            return 'slide-left';
        } else if (element.classList.contains('animate-slide-right')) {
            return 'slide-right';
        } else if (element.classList.contains('animate-scale-in')) {
            return 'scale';
        } else if (element.classList.contains('animate-bounce-in')) {
            return 'bounce';
        }
        return 'fade-slide-up'; // default
    }

    setInitialState(element, animationType) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        switch (animationType) {
            case 'fade':
                element.style.opacity = '0';
                break;
            case 'slide-up':
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                break;
            case 'slide-down':
                element.style.opacity = '0';
                element.style.transform = 'translateY(-30px)';
                break;
            case 'slide-left':
                element.style.opacity = '0';
                element.style.transform = 'translateX(30px)';
                break;
            case 'slide-right':
                element.style.opacity = '0';
                element.style.transform = 'translateX(-30px)';
                break;
            case 'scale':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                break;
            case 'bounce':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8) translateY(20px)';
                break;
            case 'fade-slide-up':
            default:
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                break;
        }
    }    animateIn(element) {
        const elementData = this.animatedElements.get(element);
        if (!elementData) return;

        // Add random delay for staggered effect
        const delay = Math.random() * 200;
        
        setTimeout(() => {
            switch (elementData.type) {
                case 'fade':
                    element.style.opacity = '1';
                    break;
                case 'slide-up':
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    break;
                case 'slide-down':
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    break;
                case 'slide-left':
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                    break;
                case 'slide-right':
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                    break;
                case 'scale':
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                    break;
                case 'bounce':
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1) translateY(0)';
                    break;
                case 'fade-slide-up':
                default:
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    break;            }

            elementData.hasAnimated = true;
        }, delay);
    }    animateOut(element) {
        const elementData = this.animatedElements.get(element);
        if (!elementData) return;

        // Only reset if element has been animated before
        if (elementData.hasAnimated) {
            // Add a small delay to ensure smooth transition
            setTimeout(() => {
                this.setInitialState(element, elementData.type);
                elementData.hasAnimated = false;
            }, 100);
        }
    }

    setupTypewriterAnimations() {
        // Enhanced typewriter effect that restarts on scroll
        const typewriterElements = document.querySelectorAll('.typewriter-container');
        
        typewriterElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.restartTypewriter(element);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });
    }

    restartTypewriter(element) {
        // If typewriter.js is loaded, restart the effect
        if (window.TypeWriter) {
            const typeStrings = element.getAttribute('data-type');
            const typingSpeed = parseInt(element.getAttribute('data-typing-speed')) || 100;
            const delayBeforeDelete = parseInt(element.getAttribute('data-delay-before-delete')) || 2000;
            const delayBeforeType = parseInt(element.getAttribute('data-delay-before-type')) || 500;

            if (typeStrings) {
                // Clear existing content
                element.innerHTML = '';
                
                // Create new typewriter instance
                const typewriter = new window.TypeWriter(element, {
                    strings: JSON.parse(typeStrings),
                    autoStart: true,
                    loop: true,
                    delay: typingSpeed,
                    deleteSpeed: 50,
                    pauseFor: delayBeforeDelete
                });
            }
        }
    }

    // Method to manually trigger animations (useful for testing)
    triggerAnimation(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            this.animateOut(element);
            setTimeout(() => this.animateIn(element), 100);
        });
    }

    // Method to add new elements to the observer
    observeNewElement(element) {
        if (this.prefersReducedMotion) return;
        
        this.prepareElement(element);
        // You would need to store the observer instance to use this method
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedScrollAnimations = new EnhancedScrollAnimations();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedScrollAnimations;
}
