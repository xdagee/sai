// script.js

// Create background particles
function createParticles() {
    const container = document.querySelector('.background-effects');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        const hue = Math.random() * 60 + 180; // Blue to purple range
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.background = `hsl(${hue}, 100%, 70%)`;
        
        container.appendChild(particle);
    }
}

// Animation control
function setupAnimation() {
    const animationContainer = document.getElementById('animationContainer');
    
    // Activate animation on hover anywhere on the page
    document.body.addEventListener('mouseenter', () => {
        animationContainer.classList.add('active');
    });
    
    document.body.addEventListener('mouseleave', () => {
        animationContainer.classList.remove('active');
    });
    
    // Also activate on touch for mobile devices
    document.body.addEventListener('touchstart', () => {
        animationContainer.classList.add('active');
    });
    
    document.body.addEventListener('touchend', () => {
        setTimeout(() => {
            animationContainer.classList.remove('active');
        }, 2000);
    });
}

// Feedback functionality
function setupFeedback() {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackInput = document.getElementById('feedbackInput');
    const feedbackList = document.getElementById('feedbackList');
    const feedbackStatus = document.getElementById('feedbackStatus');
    
    // Load existing feedback from localStorage
    loadFeedback();
    
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const feedbackText = feedbackInput.value.trim();
        if (feedbackText && feedbackText.length <= 500) {
            addFeedback(feedbackText);
            saveFeedback(feedbackText);
            feedbackInput.value = '';
            // announce success visually and via ARIA live region
            if (feedbackStatus) {
                feedbackStatus.textContent = 'Thanks! Your feedback has been received.';
                feedbackStatus.classList.remove('visually-hidden');
                setTimeout(() => {
                    feedbackStatus.classList.add('visually-hidden');
                    feedbackStatus.textContent = '';
                }, 3000);
            }
        }
    });
}

function addFeedback(text) {
    const feedbackList = document.getElementById('feedbackList');
    
    const feedbackItem = document.createElement('li');
    feedbackItem.classList.add('feedback-item');
    feedbackItem.textContent = text;
    
    // Add to the top of the list
    if (feedbackList.firstChild) {
        feedbackList.insertBefore(feedbackItem, feedbackList.firstChild);
    } else {
        feedbackList.appendChild(feedbackItem);
    }
}

function saveFeedback(text) {
    let feedbacks = JSON.parse(localStorage.getItem('aiFeedbacks')) || [];
    feedbacks.unshift({
        text: text,
        timestamp: new Date().toISOString()
    });
    
    // Keep only the last 10 feedbacks
    if (feedbacks.length > 10) {
        feedbacks = feedbacks.slice(0, 10);
    }
    
    localStorage.setItem('aiFeedbacks', JSON.stringify(feedbacks));
}

function loadFeedback() {
    const feedbacks = JSON.parse(localStorage.getItem('aiFeedbacks')) || [];
    
    feedbacks.forEach(feedback => {
        addFeedback(feedback.text);
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupAnimation();
    setupFeedback();
    
    // Add subtle periodic activation of animation
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
        setInterval(() => {
            const animationContainer = document.getElementById('animationContainer');
            animationContainer.classList.add('active');
            
            setTimeout(() => {
                animationContainer.classList.remove('active');
            }, 3000);
        }, 15000);
    }
});