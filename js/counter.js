document.addEventListener('DOMContentLoaded', function() {
    // Use class instead of id for visitor counter
    const counter = document.querySelector('.visitor-counter');
    const API_URL = 'https://9d5vyc9od1.execute-api.us-east-1.amazonaws.com/default/cloudresumecounterAPI';

    if (counter) {
        fetchVisitorCount();
    }

    async function fetchVisitorCount() {
        try {
            counter.innerHTML = '<span class="inline-block animate-spin mr-2">⟳</span> Loading...';
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('API Response:', data); // Debug log
            
            // Try to get count from various possible property names
            let count = null;
            if (typeof data.views === 'number') {
                count = data.views;
            } else if (typeof data.count === 'number') {
                count = data.count;
            } else if (typeof data === 'number') {
                count = data;
            }
            
            if (count !== null && count >= 0) {
                animateCounter(count);
            } else {
                console.error('Invalid count value:', data);
                throw new Error(`Invalid count value received: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error('Error fetching visitor count:', error);
            counter.textContent = 'Error loading count';
        }
    }

    function animateCounter(count) {
        counter.textContent = '0';
        let duration = 2000;
        let interval = 50;
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
});