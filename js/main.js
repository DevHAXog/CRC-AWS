// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Handle theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use the system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'light' || (!storedTheme && !prefersDarkScheme.matches)) {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', function() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Wave button functionality if it exists on the page
    const waveBtn = document.getElementById('wave-btn');
    const waveContainer = document.getElementById('wave-container');
    
    if (waveBtn && waveContainer) {
        waveBtn.addEventListener('click', function() {
            // Create multiple waves for a more engaging effect
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createWave();
                }, i * 150); // Stagger the waves
            }
            
            // Remove pulse animation on first click
            waveBtn.classList.remove('animate-pulse');
            
            // Add a subtle animation to the button when clicked
            waveBtn.classList.add('scale-95', 'opacity-80');
            setTimeout(() => {
                waveBtn.classList.remove('scale-95', 'opacity-80');
            }, 200);
        });
    }

    // Function to create a wave emoji animation
    function createWave() {
        const wave = document.createElement('div');
        wave.classList.add('wave-emoji');
        
        // Randomize the emoji sometimes
        const emojis = ['👋', '✌️', '👍', '🙌', '👏'];
        const randomEmoji = Math.random() > 0.7 ? emojis[Math.floor(Math.random() * emojis.length)] : '👋';
        wave.textContent = randomEmoji;
        
        // Random size
        wave.style.fontSize = Math.random() * 20 + 20 + 'px';
        
        // Random position within the container
        const containerWidth = waveContainer.clientWidth;
        const randomX = Math.floor(Math.random() * (containerWidth - 50));
        wave.style.left = randomX + 'px';
        wave.style.bottom = '10px';
        
        // Random rotation
        const randomRotation = Math.random() > 0.5 ? Math.random() * 20 : Math.random() * -20;
        wave.style.transform = `rotate(${randomRotation}deg)`;
        
        waveContainer.appendChild(wave);
        
        // Remove wave after animation completes
        setTimeout(() => {
            wave.remove();
        }, 3000);
    }
      // Add hover effects to certification cards
    const certCards = document.querySelectorAll('.glass-card-light');
    certCards.forEach(card => {
        card.classList.add('cert-card');
    });
    
    // Add profile picture hover effect
    const profilePicture = document.querySelector('.rounded-full img');
    if (profilePicture) {
        profilePicture.parentElement.classList.add('profile-picture');
    }
      // Handle certification filtering
    const filterButtons = document.querySelectorAll('.cert-filter-btn');
    if (filterButtons.length > 0) {
        // Initialize the filter on page load (show all)
        document.querySelectorAll('.cert-card').forEach(card => {
            card.style.display = 'flex';
        });
          filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active status on all filter buttons (not just within one section)
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-slate-700', 'text-white');
                    btn.classList.add('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.classList.remove('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
                this.classList.add('bg-slate-700', 'text-white');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide certifications based on filter across all sections
                document.querySelectorAll('.cert-card').forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});