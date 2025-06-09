/**
 * Modern Main JavaScript
 * Minimal, performant functionality with theme switching and interactions
 */

class ModernSite {
    constructor() {
        this.init();
    }    init() {
        this.setupThemeToggle();
        this.setupInteractions();
        this.setupWaveButton();
        this.initCertificationFiltering();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.classList.toggle('dark', savedTheme === 'dark');

        themeToggle?.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            html.classList.toggle('dark', !isDark);
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
            
            // Add smooth transition for theme change
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    setupInteractions() {
        // Add focus-visible support for better accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });

        // Enhanced navigation link hover effects
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-1px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupWaveButton() {
        const waveBtn = document.getElementById('wave-btn');
        const waveContainer = document.getElementById('wave-container');
        
        if (!waveBtn || !waveContainer) return;

        waveBtn.addEventListener('click', () => {
            this.createWave();
            this.addButtonFeedback(waveBtn);
        });
    }

    createWave() {
        const waveContainer = document.getElementById('wave-container');
        if (!waveContainer) return;

        const wave = document.createElement('div');
        wave.textContent = '👋';
        wave.className = 'absolute text-2xl animate-bounce';
        
        // Random position
        const x = Math.random() * (waveContainer.offsetWidth - 40);
        const y = Math.random() * (waveContainer.offsetHeight - 40);
        
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        wave.style.opacity = '0';
        wave.style.transform = 'scale(0.5)';
        wave.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        waveContainer.appendChild(wave);
        
        // Animate in
        requestAnimationFrame(() => {
            wave.style.opacity = '1';
            wave.style.transform = 'scale(1)';
        });
        
        // Remove after animation
        setTimeout(() => {
            wave.style.opacity = '0';
            wave.style.transform = 'scale(0.5) translateY(-20px)';
            setTimeout(() => wave.remove(), 500);
        }, 2000);
    }

    addButtonFeedback(button) {
        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);

        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'absolute inset-0 rounded-lg bg-white/20 opacity-0';
        ripple.style.animation = 'ping 0.6s cubic-bezier(0, 0, 0.2, 1)';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);    }    initCertificationFiltering() {
        const filterButtons = document.querySelectorAll('.cert-filter-btn');
        
        if (filterButtons.length === 0) return;

        // Initialize the filter on page load (show all)
        document.querySelectorAll('.cert-card').forEach(card => {
            card.style.display = 'flex';
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active status on all filter buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-slate-700', 'text-white');
                    btn.classList.add('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
                });

                // Add active class to clicked button
                button.classList.add('active');
                button.classList.remove('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
                button.classList.add('bg-slate-700', 'text-white');

                const filter = button.getAttribute('data-filter');

                // Animate certifications based on filter
                document.querySelectorAll('.cert-card').forEach((card, index) => {
                    const shouldShow = filter === 'all' || card.getAttribute('data-category') === filter;
                    
                    if (shouldShow) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8) translateY(20px)';
                        
                        // Staggered animation
                        setTimeout(() => {
                            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, index * 60);
                    } else {
                        card.style.transition = 'all 0.3s ease-out';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8) translateY(-10px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });

                // Add button feedback
                this.addButtonFeedback(button);
            });
        });
    }

    // Utility method for manual animations
    animateElement(element, animation = 'fadeIn') {
        if (window.ModernAnimations) {
            window.ModernAnimations.triggerAnimation(element, animation);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernSite();
    
    // Ensure reduced motion preference is respected
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
});

// Export for external use
window.ModernSite = ModernSite;
