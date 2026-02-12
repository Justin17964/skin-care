// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const routineTabs = document.querySelectorAll('.routine-tab');
const quizQuestions = document.querySelectorAll('.question');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const quizResults = document.querySelector('.quiz-results');
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
const backToTop = document.getElementById('back-to-top');
const navAnchorLinks = document.querySelectorAll('.nav-links a');
const saveRoutineBtn = document.querySelector('.routine-builder .btn-primary');

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Routine Builder Tabs
if (routineTabs.length > 0) {
    routineTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            routineTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Here you could add logic to switch between morning and night routines
            const routineType = tab.getAttribute('data-routine');
            console.log(`Switching to ${routineType} routine`);
        });
    });
}

// Skin Quiz Functionality
let currentQuestion = 1;
const totalQuestions = quizQuestions.length;

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentQuestion < totalQuestions) {
            // Hide current question
            document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.remove('active');
            // Move to next question
            currentQuestion++;
            // Show next question
            document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active');
            // Update progress
            updateProgress();
            // Enable previous button
            prevBtn.disabled = false;
            // Show submit button on last question
            if (currentQuestion === totalQuestions) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            }
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 1) {
            // Hide current question
            document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.remove('active');
            // Move to previous question
            currentQuestion--;
            // Show previous question
            document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active');
            // Update progress
            updateProgress();
            // Disable previous button on first question
            if (currentQuestion === 1) {
                prevBtn.disabled = true;
            }
            // Show next button again
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    });
}

if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        // Hide all questions
        quizQuestions.forEach(question => question.classList.remove('active'));
        // Show results
        quizResults.style.display = 'block';
        // Hide quiz buttons
        document.querySelector('.quiz-buttons').style.display = 'none';
        // Hide progress bar
        document.querySelector('.quiz-progress').style.display = 'none';
        
        // Calculate skin type based on answers
        calculateSkinType();
    });
}

function updateProgress() {
    const progress = ((currentQuestion - 1) / (totalQuestions - 1)) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
}

function calculateSkinType() {
    // Get selected answers
    const q1Answer = document.querySelector('input[name="q1"]:checked')?.value;
    const q2Answer = document.querySelector('input[name="q2"]:checked')?.value;
    const q3Answer = document.querySelector('input[name="q3"]:checked')?.value;
    const q4Answer = document.querySelector('input[name="q4"]:checked')?.value;
    const q5Answer = document.querySelector('input[name="q5"]:checked')?.value;
    
    // Simple logic to determine skin type
    let skinType = 'Combination';
    let recommendedProducts = [
        'Gentle Foaming Cleanser',
        'Hyaluronic Acid Serum',
        'Daytime Moisturizer'
    ];
    
    if (q1Answer === 'dry') {
        skinType = 'Dry';
        recommendedProducts = [
            'Gentle Foaming Cleanser',
            'Hyaluronic Acid Serum',
            'Nighttime Repair Cream'
        ];
    } else if (q1Answer === 'oily') {
        skinType = 'Oily';
        recommendedProducts = [
            'Oil-Based Cleanser',
            'Vitamin C Serum',
            'Daytime Moisturizer'
        ];
    } else if (q1Answer === 'normal') {
        skinType = 'Normal';
        recommendedProducts = [
            'Gentle Foaming Cleanser',
            'Vitamin C Serum',
            'Daytime Moisturizer'
        ];
    }
    
    // Update results
    document.getElementById('skin-type-result').textContent = skinType;
    const productsList = document.getElementById('recommended-products');
    productsList.innerHTML = '';
    recommendedProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        productsList.appendChild(li);
    });
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth Scrolling for Navigation Links
if (navAnchorLinks.length > 0) {
    navAnchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
}

// Save Routine Button
if (saveRoutineBtn) {
    saveRoutineBtn.addEventListener('click', () => {
        // Get selected products
        const selectedProducts = [];
        document.querySelectorAll('.product-select').forEach(select => {
            if (select.value) {
                selectedProducts.push(select.options[select.selectedIndex].text);
            }
        });
        
        if (selectedProducts.length > 0) {
            alert(`Your routine has been saved!\n\nSelected products:\n${selectedProducts.join('\n')}`);
        } else {
            alert('Please select at least one product for your routine.');
        }
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            alert(`Thank you for subscribing with ${email}!\nYou'll receive exclusive skincare tips and routines.`);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Hero Button Clicks
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
if (heroButtons.length > 0) {
    heroButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Take Skin Quiz') {
                // Scroll to quiz section
                const quizSection = document.getElementById('quiz');
                if (quizSection) {
                    window.scrollTo({
                        top: quizSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-header, .tip-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize animation on page load
window.addEventListener('load', () => {
    animateOnScroll();
    // Set initial progress for quiz
    updateProgress();
});

// Add hover effects to tip cards
document.querySelectorAll('.tip-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Quiz option selection effect
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            // Remove highlight from all options in this question
            const question = option.closest('.question');
            question.querySelectorAll('.option').forEach(opt => {
                opt.style.backgroundColor = '';
                opt.style.borderColor = '';
            });
            // Highlight selected option
            option.style.backgroundColor = '#f9f0f0';
            option.style.borderColor = '#ff9a9e';
        }
    });
});

// Add loading animation for images
function addImageLoadingAnimation() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize image loading animation
window.addEventListener('load', addImageLoadingAnimation);