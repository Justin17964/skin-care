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
const darkModeToggle = document.getElementById('dark-mode-toggle');
const glossarySearch = document.getElementById('glossary-search');
const glossaryTerms = document.querySelectorAll('.glossary-term');
const navActions = document.querySelector('.nav-actions');

// New Feature DOM Elements
const skinPhotoInput = document.getElementById('skin-photo');
const trackerDate = document.getElementById('tracker-date');
const trackerNotes = document.getElementById('tracker-notes');
const saveProgressBtn = document.getElementById('save-progress');
const progressTimeline = document.getElementById('progress-timeline');
const ingredientSearch = document.getElementById('ingredient-search');
const checkIngredientBtn = document.getElementById('check-ingredient');
const ingredientResult = document.getElementById('ingredient-result');
const ingredientBtns = document.querySelectorAll('.ingredient-btn');
const seasonTabs = document.querySelectorAll('.season-tab');
const seasonInfos = document.querySelectorAll('.season-info');

// New Section DOM Elements
const reminderType = document.getElementById('reminder-type');
const reminderTime = document.getElementById('reminder-time');
const dayOptions = document.querySelectorAll('input[name="day"]');
const reminderNotes = document.getElementById('reminder-notes');
const saveReminderBtn = document.getElementById('save-reminder');
const remindersContainer = document.getElementById('reminders-container');
const concernType = document.getElementById('concern-type');
const concernSeverity = document.getElementById('concern-severity');
const severityValue = document.getElementById('severity-value');
const concernDate = document.getElementById('concern-date');
const concernNotes = document.getElementById('concern-notes');
const saveConcernBtn = document.getElementById('save-concern');
const concernsContainer = document.getElementById('concerns-container');
const productName = document.getElementById('product-name');
const productBrand = document.getElementById('product-brand');
const productType = document.getElementById('product-type');
const productRating = document.getElementById('product-rating');
const ratingValue = document.getElementById('rating-value');
const productNotes = document.getElementById('product-notes');
const saveProductBtn = document.getElementById('save-product');
const productsGrid = document.getElementById('products-grid');

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Also toggle nav actions (dark mode button) on mobile
        if (navActions) {
            navActions.classList.toggle('active');
        }
    });
}

// Dark Mode Toggle
if (darkModeToggle) {
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Update icon
        if (isDark) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Glossary Search
if (glossarySearch) {
    glossarySearch.addEventListener('input', () => {
        const searchTerm = glossarySearch.value.toLowerCase();
        
        glossaryTerms.forEach(term => {
            const termTitle = term.querySelector('h3').textContent.toLowerCase();
            const termDescription = term.querySelector('p').textContent.toLowerCase();
            
            if (termTitle.includes(searchTerm) || termDescription.includes(searchTerm)) {
                term.style.display = 'block';
            } else {
                term.style.display = 'none';
            }
        });
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
    const elements = document.querySelectorAll('.section-header, .tip-card, .glossary-term');
    
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

// Add hover effects to glossary terms
document.querySelectorAll('.glossary-term').forEach(term => {
    term.addEventListener('mouseenter', () => {
        term.style.transform = 'translateY(-10px)';
    });
    
    term.addEventListener('mouseleave', () => {
        term.style.transform = 'translateY(0)';
    });
});

// Skin Progress Tracker Functionality
if (saveProgressBtn) {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    trackerDate.value = today;
    
    // Load saved progress from local storage
    loadProgressFromStorage();
    
    saveProgressBtn.addEventListener('click', () => {
        const photoFile = skinPhotoInput.files[0];
        const date = trackerDate.value;
        const notes = trackerNotes.value;
        
        if (!photoFile) {
            alert('Please upload a skin photo');
            return;
        }
        
        if (!date) {
            alert('Please select a date');
            return;
        }
        
        // Read and save the photo as base64
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoData = e.target.result;
            const progressItem = {
                id: Date.now(),
                photo: photoData,
                date: date,
                notes: notes
            };
            
            // Save to local storage
            saveProgressToStorage(progressItem);
            
            // Add to timeline
            addProgressToTimeline(progressItem);
            
            // Reset form
            skinPhotoInput.value = '';
            trackerNotes.value = '';
            trackerDate.value = today;
            
            alert('Progress saved successfully!');
        };
        reader.readAsDataURL(photoFile);
    });
}

function saveProgressToStorage(progressItem) {
    const progress = JSON.parse(localStorage.getItem('skinProgress') || '[]');
    progress.push(progressItem);
    localStorage.setItem('skinProgress', JSON.stringify(progress));
}

function loadProgressFromStorage() {
    const progress = JSON.parse(localStorage.getItem('skinProgress') || '[]');
    if (progress.length > 0) {
        // Clear empty state
        document.querySelector('.timeline-empty').style.display = 'none';
        
        // Add all progress items to timeline
        progress.forEach(item => {
            addProgressToTimeline(item);
        });
    }
}

function addProgressToTimeline(progressItem) {
    // Clear empty state if present
    const emptyState = document.querySelector('.timeline-empty');
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    const progressElement = document.createElement('div');
    progressElement.className = 'progress-item';
    progressElement.innerHTML = `
        <img src="${progressItem.photo}" alt="Skin progress photo" class="progress-photo">
        <div class="progress-details">
            <div class="progress-date">${progressItem.date}</div>
            <div class="progress-notes">${progressItem.notes || 'No notes'}</div>
        </div>
    `;
    
    // Add to timeline (newest first)
    if (progressTimeline.firstChild) {
        progressTimeline.insertBefore(progressElement, progressTimeline.firstChild);
    } else {
        progressTimeline.appendChild(progressElement);
    }
}

// Ingredient Checker Functionality
const ingredientDatabase = {
    'hyaluronic acid': {
        name: 'Hyaluronic Acid',
        description: 'A humectant that occurs naturally in the body, hyaluronic acid attracts and retains moisture in the skin.',
        benefits: [
            'Intensely hydrates the skin',
            'Plumps and firms the skin',
            'Reduces the appearance of fine lines',
            'Improves skin elasticity',
            'Suitable for all skin types'
        ]
    },
    'vitamin c': {
        name: 'Vitamin C',
        description: 'A powerful antioxidant that plays a crucial role in collagen synthesis and skin protection.',
        benefits: [
            'Brightens skin tone',
            'Boosts collagen production',
            'Protects against environmental damage',
            'Reduces hyperpigmentation',
            'Improves skin texture'
        ]
    },
    'retinol': {
        name: 'Retinol',
        description: 'A derivative of vitamin A, retinol is one of the most researched and effective skincare ingredients.',
        benefits: [
            'Reduces the appearance of wrinkles',
            'Improves skin texture and tone',
            'Unclogs pores and treats acne',
            'Stimulates collagen production',
            'Fades dark spots'
        ]
    },
    'niacinamide': {
        name: 'Niacinamide',
        description: 'A form of vitamin B3 that offers multiple benefits for the skin.',
        benefits: [
            'Regulates oil production',
            'Minimizes pore appearance',
            'Reduces redness and inflammation',
            'Strengthens the skin barrier',
            'Fades hyperpigmentation'
        ]
    },
    'ceramides': {
        name: 'Ceramides',
        description: 'Lipids that make up a significant portion of the skins natural barrier.',
        benefits: [
            'Strengthens the skin barrier',
            'Prevents moisture loss',
            'Protects against environmental damage',
            'Soothes dry, irritated skin',
            'Improves skin texture'
        ]
    },
    'alpha hydroxy acids': {
        name: 'Alpha Hydroxy Acids (AHAs)',
        description: 'Water-soluble acids that exfoliate the skins surface.',
        benefits: [
            'Exfoliates dead skin cells',
            'Improves skin texture',
            'Brightens skin tone',
            'Reduces the appearance of fine lines',
            'Enhances product absorption'
        ]
    }
};

if (checkIngredientBtn) {
    checkIngredientBtn.addEventListener('click', () => {
        const ingredient = ingredientSearch.value.toLowerCase().trim();
        if (ingredient) {
            searchIngredient(ingredient);
        } else {
            alert('Please enter an ingredient name');
        }
    });
    
    // Handle popular ingredient buttons
    ingredientBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const ingredient = btn.getAttribute('data-ingredient').toLowerCase();
            ingredientSearch.value = btn.getAttribute('data-ingredient');
            searchIngredient(ingredient);
        });
    });
    
    // Allow Enter key to search
    ingredientSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const ingredient = ingredientSearch.value.toLowerCase().trim();
            if (ingredient) {
                searchIngredient(ingredient);
            }
        }
    });
}

function searchIngredient(ingredient) {
    const normalizedIngredient = ingredient.toLowerCase().trim();
    
    if (ingredientDatabase[normalizedIngredient]) {
        displayIngredientInfo(ingredientDatabase[normalizedIngredient]);
    } else {
        // Check for partial matches
        let found = false;
        for (const key in ingredientDatabase) {
            if (key.includes(normalizedIngredient) || ingredientDatabase[key].name.toLowerCase().includes(normalizedIngredient)) {
                displayIngredientInfo(ingredientDatabase[key]);
                found = true;
                break;
            }
        }
        if (!found) {
            ingredientResult.innerHTML = `
                <div class="ingredient-not-found">
                    <h3>Ingredient Not Found</h3>
                    <p>Sorry, we don't have information about this ingredient yet. Try one of the popular ingredients below!</p>
                </div>
            `;
        }
    }
}

function displayIngredientInfo(ingredient) {
    ingredientResult.innerHTML = `
        <div class="ingredient-info">
            <h3>${ingredient.name}</h3>
            <p>${ingredient.description}</p>
            <div class="ingredient-benefits">
                <h4>Benefits:</h4>
                <ul>
                    ${ingredient.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Seasonal Skincare Tips Functionality
if (seasonTabs.length > 0) {
    seasonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const season = tab.getAttribute('data-season');
            
            // Update tabs
            seasonTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update content
            seasonInfos.forEach(info => {
                info.classList.remove('active');
                if (info.getAttribute('data-season') === season) {
                    info.classList.add('active');
                }
            });
        });
    });
}

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

// Initialize new features on page load
window.addEventListener('load', () => {
    // Load reminders from local storage
    loadRemindersFromStorage();
    // Load skin concerns from local storage
    loadConcernsFromStorage();
    // Load products from local storage
    loadProductsFromStorage();
    // Set default date for concern tracker
    const today = new Date().toISOString().split('T')[0];
    if (concernDate) {
        concernDate.value = today;
    }
});

// Range input value updates
if (concernSeverity && severityValue) {
    concernSeverity.addEventListener('input', () => {
        severityValue.textContent = concernSeverity.value;
    });
}

if (productRating && ratingValue) {
    productRating.addEventListener('input', () => {
        ratingValue.textContent = productRating.value;
    });
}

// Skincare Routine Reminder Functionality
if (saveReminderBtn) {
    saveReminderBtn.addEventListener('click', () => {
        const type = reminderType.value;
        const time = reminderTime.value;
        const selectedDays = Array.from(dayOptions)
            .filter(day => day.checked)
            .map(day => day.value);
        const notes = reminderNotes.value;
        
        if (!type || !time || selectedDays.length === 0) {
            alert('Please fill in all required fields (type, time, and at least one day)');
            return;
        }
        
        const reminder = {
            id: Date.now(),
            type: type,
            time: time,
            days: selectedDays,
            notes: notes
        };
        
        // Save to local storage
        saveReminderToStorage(reminder);
        
        // Add to reminders list
        addReminderToList(reminder);
        
        // Reset form
        reminderType.value = 'morning';
        reminderTime.value = '';
        dayOptions.forEach(day => day.checked = false);
        reminderNotes.value = '';
        
        alert('Reminder saved successfully!');
    });
}

function saveReminderToStorage(reminder) {
    const reminders = JSON.parse(localStorage.getItem('skincareReminders') || '[]');
    reminders.push(reminder);
    localStorage.setItem('skincareReminders', JSON.stringify(reminders));
}

function loadRemindersFromStorage() {
    const reminders = JSON.parse(localStorage.getItem('skincareReminders') || '[]');
    if (reminders.length > 0) {
        // Clear empty state
        document.querySelector('.reminder-empty').style.display = 'none';
        
        // Add all reminders to list
        reminders.forEach(reminder => {
            addReminderToList(reminder);
        });
    }
}

function addReminderToList(reminder) {
    // Clear empty state if present
    const emptyState = document.querySelector('.reminder-empty');
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    const reminderElement = document.createElement('div');
    reminderElement.className = 'reminder-item';
    
    // Map day abbreviations to full day names
    const dayMap = {
        'mon': 'Monday',
        'tue': 'Tuesday',
        'wed': 'Wednesday',
        'thu': 'Thursday',
        'fri': 'Friday',
        'sat': 'Saturday',
        'sun': 'Sunday'
    };
    
    const fullDayNames = reminder.days.map(day => dayMap[day]).join(', ');
    
    reminderElement.innerHTML = `
        <div class="reminder-time">${reminder.time} - ${reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)} Routine</div>
        <div class="reminder-days">${fullDayNames}</div>
        ${reminder.notes ? `<div class="reminder-notes">${reminder.notes}</div>` : ''}
    `;
    
    // Add to reminders container
    remindersContainer.appendChild(reminderElement);
}

// Skin Concern Tracker Functionality
if (saveConcernBtn) {
    saveConcernBtn.addEventListener('click', () => {
        const type = concernType.value;
        const severity = concernSeverity.value;
        const date = concernDate.value;
        const notes = concernNotes.value;
        
        if (!type || !date) {
            alert('Please fill in all required fields (concern type and date)');
            return;
        }
        
        const concern = {
            id: Date.now(),
            type: type,
            severity: severity,
            date: date,
            notes: notes
        };
        
        // Save to local storage
        saveConcernToStorage(concern);
        
        // Add to concerns list
        addConcernToList(concern);
        
        // Reset form
        concernType.value = 'acne';
        concernSeverity.value = '5';
        severityValue.textContent = '5';
        concernDate.value = new Date().toISOString().split('T')[0];
        concernNotes.value = '';
        
        alert('Skin concern saved successfully!');
    });
}

function saveConcernToStorage(concern) {
    const concerns = JSON.parse(localStorage.getItem('skinConcerns') || '[]');
    concerns.push(concern);
    localStorage.setItem('skinConcerns', JSON.stringify(concerns));
}

function loadConcernsFromStorage() {
    const concerns = JSON.parse(localStorage.getItem('skinConcerns') || '[]');
    if (concerns.length > 0) {
        // Clear empty state
        document.querySelector('.concern-empty').style.display = 'none';
        
        // Sort concerns by date (newest first)
        concerns.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Add all concerns to list
        concerns.forEach(concern => {
            addConcernToList(concern);
        });
    }
}

function addConcernToList(concern) {
    // Clear empty state if present
    const emptyState = document.querySelector('.concern-empty');
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    const concernElement = document.createElement('div');
    concernElement.className = 'concern-item';
    
    // Map concern types to user-friendly names
    const concernMap = {
        'acne': 'Acne',
        'dryness': 'Dryness',
        'oiliness': 'Oiliness',
        'wrinkles': 'Wrinkles/Fine Lines',
        'dark-spots': 'Dark Spots',
        'redness': 'Redness',
        'sensitivity': 'Sensitivity'
    };
    
    concernElement.innerHTML = `
        <div class="concern-header">
            <div class="concern-type">${concernMap[concern.type] || concern.type}</div>
            <div class="concern-severity">Severity: ${concern.severity}/10</div>
        </div>
        <div class="concern-date">${concern.date}</div>
        ${concern.notes ? `<div class="concern-notes">${concern.notes}</div>` : ''}
    `;
    
    // Add to concerns container
    concernsContainer.appendChild(concernElement);
}

// Product Library Functionality
if (saveProductBtn) {
    saveProductBtn.addEventListener('click', () => {
        const name = productName.value;
        const brand = productBrand.value;
        const type = productType.value;
        const rating = productRating.value;
        const notes = productNotes.value;
        
        if (!name || !brand) {
            alert('Please fill in all required fields (product name and brand)');
            return;
        }
        
        const product = {
            id: Date.now(),
            name: name,
            brand: brand,
            type: type,
            rating: rating,
            notes: notes
        };
        
        // Save to local storage
        saveProductToStorage(product);
        
        // Add to products grid
        addProductToGrid(product);
        
        // Reset form
        productName.value = '';
        productBrand.value = '';
        productType.value = 'cleanser';
        productRating.value = '3';
        ratingValue.textContent = '3';
        productNotes.value = '';
        
        alert('Product saved successfully!');
    });
}

function saveProductToStorage(product) {
    const products = JSON.parse(localStorage.getItem('skincareProducts') || '[]');
    products.push(product);
    localStorage.setItem('skincareProducts', JSON.stringify(products));
}

function loadProductsFromStorage() {
    const products = JSON.parse(localStorage.getItem('skincareProducts') || '[]');
    if (products.length > 0) {
        // Clear empty state
        document.querySelector('.product-empty').style.display = 'none';
        
        // Add all products to grid
        products.forEach(product => {
            addProductToGrid(product);
        });
    }
}

function addProductToGrid(product) {
    // Clear empty state if present
    const emptyState = document.querySelector('.product-empty');
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    
    // Map product types to user-friendly names
    const productTypeMap = {
        'cleanser': 'Cleanser',
        'toner': 'Toner',
        'serum': 'Serum',
        'moisturizer': 'Moisturizer',
        'sunscreen': 'Sunscreen',
        'mask': 'Mask',
        'exfoliator': 'Exfoliator'
    };
    
    // Generate star rating HTML
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += i <= product.rating 
            ? '<i class="fas fa-star"></i>' 
            : '<i class="far fa-star"></i>';
    }
    
    productElement.innerHTML = `
        <div class="product-name">${product.name}</div>
        <div class="product-brand">${product.brand}</div>
        <div class="product-type">${productTypeMap[product.type] || product.type}</div>
        <div class="product-rating">
            <div class="rating-stars">${starsHtml}</div>
            <span>${product.rating}/5</span>
        </div>
        ${product.notes ? `<div class="product-notes">${product.notes}</div>` : ''}
    `;
    
    // Add to products grid
    productsGrid.appendChild(productElement);
}

// Blog post click handler
document.querySelectorAll('.blog-post').forEach(post => {
    post.addEventListener('click', (e) => {
        // Only handle clicks that aren't on the "Read More" button
        if (!e.target.closest('.btn')) {
            alert('Blog post functionality coming soon!');
        }
    });
});

// Read More button click handler
document.querySelectorAll('.blog-post .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Blog post functionality coming soon!');
    });
});