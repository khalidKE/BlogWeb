document.addEventListener('DOMContentLoaded', function() {
    // Calculate reading time
    calculateReadingTime();
    
    // Back to top button functionality
    setupBackToTopButton();
    
    // Add smooth scrolling for anchor links
    setupSmoothScrolling();
});

// Calculate reading time based on content length
function calculateReadingTime() {
    const content = document.querySelector('.post-content');
    if (!content) return;
    
    const text = content.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    
    const readTimeElement = document.getElementById('readTime');
    if (readTimeElement) {
        readTimeElement.textContent = readingTime;
    }
}

// Setup back to top button
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Form submission handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput && emailInput.value) {
            // In a real application, you would send this to your backend
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        }
    });
}

// Share functionality (simplified for demo)
const shareButtons = document.querySelectorAll('.share-button');
shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const url = window.location.href;
        const title = document.querySelector('.post-title').textContent;
        
        let shareUrl = '';
        
        if (this.classList.contains('facebook')) {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        } else if (this.classList.contains('twitter')) {
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        } else if (this.classList.contains('linkedin')) {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        } else if (this.classList.contains('email')) {
            shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    });
});