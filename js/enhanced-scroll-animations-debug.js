/**
 * Debug version of Enhanced Scroll-Based Animation System
 * Includes console logging for development and testing
 * Use this version when you need to debug animation behavior
 */

class EnhancedScrollAnimations {
    constructor() {
        this.animatedElements = new Map();
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.debugMode = true; // Enable debug logging
        this.init();
    }

    init() {
        if (this.prefersReducedMotion) {
            this.log('Reduced motion preference detected, animations disabled');
            return;
        }

        this.setupIntersectionObserver();
        this.setupTypewriterAnimations();
    }

    log(...args) {
        if (this.debugMode) {
            console.log('[ScrollAnimations]', ...args);
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0, 0.1, 0.5],
            rootMargin: '50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.1;

                this.log(`Element ${element.className || element.tagName} visibility changed:`, {
                    isIntersecting: entry.isIntersecting,
                    intersectionRatio: entry.intersectionRatio,
                    isVisible: isVisible
                });

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
        const animationType = this.getAnimationType(element);
        const delay = parseInt(element.dataset.delay) || 0;
        
        this.animatedElements.set(element, {
            type: animationType,
            delay: delay,
            hasAnimated: false
        });

        this.setInitialState(element, animationType);
        this.log(`Prepared element:`, element.className || element.tagName, `Animation: ${animationType}, Delay: ${delay}ms`);
    }

    getAnimationType(element) {
        if (element.dataset.animate) {
            return element.dataset.animate;
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
                element.style.transform = 'scale(0.3) translateY(20px)';
                break;
            default: // fade-slide-up
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
        }
    }

    animateIn(element) {
        const elementData = this.animatedElements.get(element);
        if (!elementData) return;

        this.log('🎬 Animating IN:', element.className || element.tagName, 
                 `Type: ${elementData.type}`, 
                 `Previously animated: ${elementData.hasAnimated}`);

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
                default: // fade-slide-up
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    break;
            }

            elementData.hasAnimated = true;
            this.log('✅ Animation IN complete:', element.className || element.tagName);
        }, delay);
    }

    animateOut(element) {
        const elementData = this.animatedElements.get(element);
        if (!elementData) return;

        // Only reset if element has been animated before
        if (elementData.hasAnimated) {
            this.log('🔄 Resetting animation for:', element.className || element.tagName, 
                     `Type: ${elementData.type}`);
            
            // Add a small delay to ensure smooth transition
            setTimeout(() => {
                this.setInitialState(element, elementData.type);
                elementData.hasAnimated = false;
                this.log('✅ Animation RESET complete:', element.className || element.tagName);
            }, 100);
        } else {
            this.log('⏭️ Skipping reset (not yet animated):', element.className || element.tagName);
        }
    }

    setupTypewriterAnimations() {
        // Enhanced typewriter effect that restarts on scroll
        const typewriterElements = document.querySelectorAll('.typewriter-container');
        
        typewriterElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        this.startTypewriter(element);
                    } else {
                        this.resetTypewriter(element);
                    }
                });
            }, { threshold: [0.1, 0.5] });

            observer.observe(element);
        });
    }

    startTypewriter(element) {
        const textElement = element.querySelector('.typewriter-text');
        if (!textElement) return;

        const text = textElement.dataset.text || textElement.textContent;
        const speed = parseInt(textElement.dataset.speed) || 50;

        textElement.textContent = '';
        textElement.style.borderRight = '2px solid currentColor';

        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    textElement.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);

        element.typewriterInterval = typeInterval;
    }

    resetTypewriter(element) {
        if (element.typewriterInterval) {
            clearInterval(element.typewriterInterval);
        }

        const textElement = element.querySelector('.typewriter-text');
        if (textElement) {
            textElement.style.borderRight = 'none';
            setTimeout(() => this.animateIn(element), 100);
        }
    }
}

// Initialize the animation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.scrollAnimations = new EnhancedScrollAnimations();
});
