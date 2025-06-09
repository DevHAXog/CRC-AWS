// Typewriter animation effect for text elements
class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.texts = JSON.parse(element.getAttribute('data-type') || '[""]');
        this.currentText = '';
        this.letterIndex = 0;
        this.textIndex = 0;
        this.typingSpeed = options.typingSpeed || 100; // Time between typing each character
        this.deleteSpeed = options.deleteSpeed || 50;  // Time between deleting each character
        this.delayBeforeDelete = options.delayBeforeDelete || 2000; // Time to wait before starting to delete
        this.delayBeforeType = options.delayBeforeType || 500;      // Time to wait before typing the next text
        this.loop = options.loop !== undefined ? options.loop : true;
        this.cursor = document.createElement('span');
        this.cursor.className = 'typewriter-cursor';
        this.cursor.textContent = '|';
        
        // Create a wrapper for the content
        this.wrapper = document.createElement('span');
        this.wrapper.className = 'typewriter-text';
        
        // Ensure the element is empty and set up initial state
        this.element.textContent = '';
        this.element.appendChild(this.wrapper);
        this.element.appendChild(this.cursor);
        
        // Add aria-live for accessibility
        this.element.setAttribute('aria-live', 'polite');
        
        // Store the original texts for fallback
        this.element.setAttribute('data-original-texts', this.element.getAttribute('data-type'));
        
        // Start the animation
        this.init();
    }
    
    init() {
        // If JS is disabled, show all texts joined with a separator
        if (this.texts.length === 0) {
            return;
        }
        
        this.type();
    }
    
    type() {
        // Get the current text from the array
        const fullText = this.texts[this.textIndex];
        
        // If we've reached the end of the current text
        if (this.letterIndex >= fullText.length) {
            // Wait before starting to delete
            setTimeout(() => this.delete(), this.delayBeforeDelete);
            return;
        }
        
        // Add the next character
        this.currentText += fullText.charAt(this.letterIndex);
        this.wrapper.textContent = this.currentText;
        this.letterIndex++;
        
        // Schedule the next character
        setTimeout(() => this.type(), this.typingSpeed);
    }
    
    delete() {
        // If we've deleted the entire text
        if (this.letterIndex <= 0) {
            // Move to the next text in the array
            this.textIndex++;
            
            // If we've gone through all texts, loop back to the beginning
            if (this.textIndex >= this.texts.length) {
                if (this.loop) {
                    this.textIndex = 0;
                } else {
                    return; // Stop the animation if we don't want to loop
                }
            }
            
            // Wait before typing the next text
            setTimeout(() => {
                this.currentText = '';
                this.letterIndex = 0;
                this.type();
            }, this.delayBeforeType);
            
            return;
        }
        
        // Remove the last character
        this.currentText = this.currentText.slice(0, -1);
        this.wrapper.textContent = this.currentText;
        this.letterIndex--;
        
        // Schedule the next delete
        setTimeout(() => this.delete(), this.deleteSpeed);
    }
    
    // Method to stop the animation
    stop() {
        this.loop = false;
    }
}

// Initialize all typewriter elements on page load
document.addEventListener('DOMContentLoaded', function() {
    // Provide a fallback for when JavaScript is disabled
    document.querySelectorAll('[data-type]').forEach(element => {
        if (!element.classList.contains('typewriter-initialized')) {
            try {
                const texts = JSON.parse(element.getAttribute('data-type'));
                if (!element.hasAttribute('data-original-content')) {
                    element.setAttribute('data-original-content', element.textContent);
                }
                
                // Get custom options if specified
                const options = {
                    typingSpeed: parseInt(element.getAttribute('data-typing-speed')) || 100,
                    deleteSpeed: parseInt(element.getAttribute('data-delete-speed')) || 50,
                    delayBeforeDelete: parseInt(element.getAttribute('data-delay-before-delete')) || 2000,
                    delayBeforeType: parseInt(element.getAttribute('data-delay-before-type')) || 500,
                    loop: element.getAttribute('data-loop') !== 'false',
                };
                
                // Initialize the typewriter effect
                new Typewriter(element, options);
                element.classList.add('typewriter-initialized');
            } catch (e) {
                console.error('Error initializing typewriter:', e);
                // Restore original content in case of error
                if (element.hasAttribute('data-original-content')) {
                    element.textContent = element.getAttribute('data-original-content');
                }
            }
        }
    });
});

// Graceful degradation: Show the first text if JS is disabled
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-type]').forEach(element => {
        if (!element.classList.contains('typewriter-initialized')) {
            try {
                const texts = JSON.parse(element.getAttribute('data-type'));
                element.textContent = texts.join(' | '); // Show all texts with a separator
            } catch (e) {
                console.error('Error parsing typewriter data:', e);
            }
        }
    });
});
