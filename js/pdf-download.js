// PDF Download functionality for resume
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-resume-btn');
    const btnText = document.getElementById('btn-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    // Optional: Add right-click context menu for advanced options
    let customDPI = 2; // Default scale
    let customFormat = 'a4'; // Default format
    
    if (downloadBtn) {
        // Right-click for advanced options (optional feature)
        downloadBtn.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            const dpiChoice = prompt('Enter PDF quality scale (1-3, default is 2):\n1 = Standard\n2 = High Quality (default)\n3 = Maximum Quality', '2');
            if (dpiChoice && !isNaN(dpiChoice)) {
                customDPI = Math.max(1, Math.min(3, parseInt(dpiChoice)));
            }
            
            const formatChoice = confirm('Choose PDF format:\nOK = A4 (default)\nCancel = Letter');
            customFormat = formatChoice ? 'a4' : 'letter';
            
            // Visual feedback
            btnText.textContent = `Download (${customDPI}x, ${customFormat.toUpperCase()})`;
            setTimeout(() => {
                btnText.textContent = 'Download Resume';
            }, 3000);
        });
        
        downloadBtn.addEventListener('click', async function() {
            // Show loading state
            btnText.classList.add('hidden');
            loadingSpinner.classList.remove('hidden');
            downloadBtn.disabled = true;
            downloadBtn.classList.add('opacity-75', 'cursor-not-allowed');
            
            try {                // Get the resume section
                const resumeSection = document.getElementById('resume-section');
                
                if (!resumeSection) {
                    throw new Error('Resume section not found');
                }
                  console.log('Resume section found:', resumeSection);
                console.log('Resume section content length:', resumeSection.innerHTML.length);
                console.log('First 200 chars of content:', resumeSection.textContent.substring(0, 200));
                  // Detect current theme
                const isDarkMode = document.documentElement.classList.contains('dark');
                const backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
                  // Configure html2pdf options
                const options = {
                    margin: [0.5, 0.5, 0.5, 0.5], // top, right, bottom, left (in inches)
                    filename: 'Devin_Bosley_Resume.pdf',
                    image: { 
                        type: 'jpeg', 
                        quality: 0.98 
                    },
                    html2canvas: { 
                        scale: customDPI,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: backgroundColor,
                        scrollX: 0,
                        scrollY: 0,
                        letterRendering: true,
                        logging: false, // Set to true for more detailed html2canvas logs if needed
                        height: null, // Let it calculate automatically
                        width: null   // Let it calculate automatically
                    },
                    jsPDF: { 
                        unit: 'in', 
                        format: customFormat, 
                        orientation: 'portrait',
                        compress: true,
                        precision: 16
                    }
                };
                console.log('html2pdf options:', JSON.stringify(options, null, 2)); // Log the options

                // Clone the element to avoid modifying the original
                const elementClone = resumeSection.cloneNode(true);
                console.log('Cloned element:', elementClone);
                console.log('Cloned content length:', elementClone.innerHTML.length);
                
                // Remove fixed/sticky elements that might interfere with PDF
                const problematicElements = elementClone.querySelectorAll('[class*="fixed"], [class*="sticky"], .fixed, .sticky, nav');
                problematicElements.forEach(el => el.remove());
                
                // Remove animation classes for cleaner PDF
                const animatedElements = elementClone.querySelectorAll('[class*="animate"], [data-animate]');
                animatedElements.forEach(el => {
                    el.className = el.className.replace(/animate-[^\s]*/g, '');
                    el.removeAttribute('data-animate');
                });
                
                // Ensure all images are loaded and set explicit sizes
                const images = elementClone.querySelectorAll('img');
                const imagePromises = Array.from(images).map(img => {
                    return new Promise((resolve) => {
                        if (img.complete) {
                            resolve();
                        } else {
                            img.onload = () => resolve();
                            img.onerror = () => resolve();
                        }
                        img.style.maxWidth = '100%';
                        img.style.height = 'auto';
                        img.style.display = 'block';
                    });
                });
                
                // Wait for all images to load
                await Promise.all(imagePromises);
                console.log('All images processed/loaded.');

                // ****** START NEW LOGGING ******
                console.log('Inspecting elementClone before PDF generation:');
                console.log('elementClone.innerHTML (first 500 chars):', elementClone.innerHTML.substring(0, 500));
                const computedStyle = window.getComputedStyle(elementClone);
                console.log('elementClone computed display:', computedStyle.display);
                console.log('elementClone computed visibility:', computedStyle.visibility);
                console.log('elementClone offsetHeight:', elementClone.offsetHeight);
                console.log('elementClone offsetWidth:', elementClone.offsetWidth);
                console.log('elementClone scrollHeight:', elementClone.scrollHeight);
                // You can also check a key child element if needed, e.g.:
                // const firstChild = elementClone.querySelector('div'); // or a more specific selector
                // if (firstChild) {
                //     console.log('First child offsetHeight:', firstChild.offsetHeight);
                // }
                // ****** END NEW LOGGING ******

                // Generate PDF
                try {
                    console.log('Attempting to generate PDF...');
                    await html2pdf().set(options).from(elementClone).save();
                    console.log('PDF generation successful.');
                } catch (pdfError) {
                    console.error('Error during PDF generation:', pdfError);
                    alert('Failed to generate PDF. Check console for details.');
                }
                
            } catch (error) {
                console.error('Error in download resume function:', error);
                
                // Show error feedback with specific messages
                let errorMessage = 'Error - Try Again';
                if (error.message.includes('timeout')) {
                    errorMessage = 'Timeout - Try Again';
                } else if (error.message.includes('not found')) {
                    errorMessage = 'Content Error';
                } else if (error.message.includes('empty')) {
                    errorMessage = 'No Content - Try Again';
                }
                
                btnText.textContent = errorMessage;
                btnText.classList.remove('hidden');
                loadingSpinner.classList.add('hidden');
                downloadBtn.classList.add('bg-red-600');
                downloadBtn.classList.remove('bg-blue-600');
                
                setTimeout(() => {
                    btnText.textContent = 'Download Resume';
                    downloadBtn.classList.remove('bg-red-600');
                    downloadBtn.classList.add('bg-blue-600');
                }, 3000);
            } finally {
                // Reset button state
                downloadBtn.disabled = false;
                downloadBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            }
        });
    }
});
