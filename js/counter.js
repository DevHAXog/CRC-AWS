document.addEventListener('DOMContentLoaded', function() {
    const counter = document.getElementById('visitor-counter');
    // Define API URL - this will be replaced by GitHub Actions during deployment
    const API_URL = 'https://your-api-gateway-url/count';
    
    if (counter) {
        // Fetch visitor count from API Gateway endpoint
        fetchVisitorCount();
    }

    async function fetchVisitorCount() {
        try {
            counter.innerHTML = '<span class="inline-block animate-spin mr-2">⟳</span> Loading...';
            
            // Check if we're in development mode or API is not available
            if (API_URL === 'https://your-api-gateway-url/count' || window.location.hostname === 'localhost') {
                console.log('Development mode detected. Using simulated counter.');
                setTimeout(simulateCounterIncrement, 1000);
                return;
            }
            
            // Fetch the actual count from the API
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            animateCounter(data.count);
        } catch (error) {
            console.error('Error fetching visitor count:', error);
            counter.textContent = 'Error loading count';
            // Fallback to simulation if API call fails
            setTimeout(simulateCounterIncrement, 1000);
        }
    }
    
    function animateCounter(count) {
        counter.textContent = '0';
        
        // Animate the counter
        let duration = 2000; // 2 seconds
        let interval = 50; // Update every 50ms
        let steps = duration / interval;
        let increment = count / steps;
        let current = 0;
        
        let timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                clearInterval(timer);
                counter.textContent = count;
            } else {
                counter.textContent = Math.floor(current);
            }
        }, interval);
    }

    function simulateCounterIncrement() {
        // Start with a random number between 100-500 for demonstration
        let count = Math.floor(Math.random() * 400) + 100;
        counter.textContent = '0';
        
        // Animate the counter
        let duration = 2000; // 2 seconds
        let interval = 50; // Update every 50ms
        let steps = duration / interval;
        let increment = count / steps;
        let current = 0;
        
        // Add a loading indicator first
        counter.innerHTML = '<span class="inline-block animate-spin mr-2">⟳</span> Loading...';
        
        // Start counting after a short delay
        setTimeout(() => {
            counter.textContent = '0';
            
            let timer = setInterval(() => {
                current += increment;
                if (current >= count) {
                    clearInterval(timer);
                    current = count;
                    
                    // Once counter finishes, increment by 1 to show this visit
                    setTimeout(() => {                        counter.textContent = count;
                        
                        // Add a highlight effect
                        counter.classList.add('text-3xl', 'scale-110', 'text-primary-600');
                        
                        setTimeout(() => {
                            counter.classList.remove('text-primary-600', 'scale-110');
                            counter.classList.add('text-primary-500');
                            counter.textContent = count + 1;
                            
                            // Store the count in local storage to maintain it on page refresh
                            localStorage.setItem('visitorCount', count + 1);
                            
                            // Add a "new visitor" animation
                            const counterContainer = counter.parentElement;
                            const newVisitorBadge = document.createElement('div');
                            newVisitorBadge.textContent = '👋 You are visitor #' + (count + 1);
                            newVisitorBadge.className = 'text-sm font-medium text-primary-500 dark:text-primary-400 mt-2 animate-pulse';
                            counterContainer.appendChild(newVisitorBadge);
                            
                            setTimeout(() => {
                                counterContainer.removeChild(newVisitorBadge);
                                counter.classList.remove('text-primary-500');
                            }, 3000);
                        }, 500);
                    }, 200);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, interval);
        }, 1000);
    }
});