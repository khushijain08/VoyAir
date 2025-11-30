// ============================================
// DARK LUXURY FLIGHT RESERVATION SYSTEM
// JavaScript for Animations & Interactions
// ============================================

// Navigation & Page Routing
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeSeatSelection();
    initializePayment();
    initializeForms();
    initializeScrollAnimations();
});

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (target.startsWith('#')) {
                // Single page navigation
                showPage(target.substring(1));
            } else {
                // Multi-page navigation
                window.location.href = target;
            }
        });
    });
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Animations
function initializeAnimations() {
    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBg.style.transform = `translateY(${rate}px) scale(1.05)`;
        });
    }
    
    // Parallax for flying airplane
    const flyingAirplane = document.querySelector('.flying-airplane');
    if (flyingAirplane) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.2;
            flyingAirplane.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // 3D tilt effect on cards - REMOVED
    // Transform effects disabled as per user request
    
    // Floating cards animation with stagger
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Button glow effects with pulse
    const buttons = document.querySelectorAll('.neon-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 40px var(--cyan-glow), 0 0 80px var(--cyan-glow)';
            this.style.animation = 'buttonPulse 1s ease-in-out infinite';
        });
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 20px var(--cyan-glow)';
            this.style.animation = 'none';
        });
    });
    
    // Input focus animations with glow
    const inputs = document.querySelectorAll('.glow-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 25px var(--cyan-glow)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px var(--cyan-glow)';
        });
    });
    
    // Image reveal animation on scroll
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 100);
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Destination cards hover effect
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.destination-image');
            if (image) {
                image.style.transform = 'scale(1.2) rotate(2deg)';
            }
        });
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.destination-image');
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Gallery items animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fade-in-up');
    });
}

// Add button pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes buttonPulse {
        0%, 100% {
            box-shadow: 0 0 40px var(--cyan-glow), 0 0 80px var(--cyan-glow);
        }
        50% {
            box-shadow: 0 0 60px var(--cyan-glow), 0 0 120px var(--cyan-glow);
        }
    }
`;
document.head.appendChild(style);

// Seat Selection
let selectedSeats = [];

function initializeSeatSelection() {
    const seats = document.querySelectorAll('.seat.available');
    const selectedSeatsList = document.getElementById('selected-seats-list');
    const proceedBtn = document.getElementById('proceed-payment');
    
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            const seatNumber = this.getAttribute('data-seat');
            
            if (this.classList.contains('selected')) {
                // Deselect
                this.classList.remove('selected');
                selectedSeats = selectedSeats.filter(s => s !== seatNumber);
            } else {
                // Select
                this.classList.add('selected');
                selectedSeats.push(seatNumber);
            }
            
            updateSelectedSeatsDisplay();
        });
        
        // Hover effect
        seat.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected') && !this.classList.contains('reserved')) {
                this.style.transform = 'scale(1.2)';
                this.style.boxShadow = '0 0 25px var(--cyan-glow)';
            }
        });
        
        seat.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function() {
            if (selectedSeats.length > 0) {
                // Store selected seats in sessionStorage
                sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                window.location.href = 'payment.html';
            } else {
                alert('Please select at least one seat');
            }
        });
    }
}

function updateSelectedSeatsDisplay() {
    const selectedSeatsList = document.getElementById('selected-seats-list');
    const summarySeats = document.getElementById('summary-seats');
    
    if (selectedSeatsList) {
        selectedSeatsList.textContent = selectedSeats.length > 0 
            ? selectedSeats.join(', ') 
            : 'None';
    }
    
    if (summarySeats) {
        summarySeats.textContent = selectedSeats.length > 0 
            ? selectedSeats.join(', ') 
            : '-';
    }
}

// Payment System
function initializePayment() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardNumberInput = document.querySelector('.card-input-form input[type="text"]');
    const expiryInput = document.querySelector('.card-input-form input[placeholder="MM/YY"]');
    const cvvInput = document.querySelector('.card-input-form input[placeholder="123"]');
    const cardPreview = document.querySelector('.card-number');
    
    // Payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Card number formatting
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
            
            if (cardPreview) {
                cardPreview.textContent = formattedValue || '**** **** **** 1234';
            }
        });
    }
    
    // Expiry date formatting
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // CVV formatting
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
    
    // Load selected seats from sessionStorage
    const storedSeats = sessionStorage.getItem('selectedSeats');
    if (storedSeats) {
        selectedSeats = JSON.parse(storedSeats);
        updateSelectedSeatsDisplay();
    }
    
    // Pay button
    const payButton = document.querySelector('.order-summary .neon-button');
    if (payButton) {
        payButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulate payment processing
            this.innerHTML = '<span>Processing...</span>';
            this.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'ticket.html';
            }, 2000);
        });
    }
}

// Forms
function initializeForms() {
    // Login/Signup toggle
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginCard = document.querySelector('.login-card');
    const signupCard = document.querySelector('.signup-card');
    
    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginCard.classList.add('hidden');
            signupCard.classList.remove('hidden');
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupCard.classList.add('hidden');
            loginCard.classList.remove('hidden');
        });
    }
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Processing...</span>';
                submitBtn.disabled = true;
                
                // Simulate form processing
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    alert('Form submitted successfully!');
                }, 1500);
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.glass-card, .offer-card, .class-card, .flight-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Search functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const from = document.querySelector('input[placeholder="Origin Airport"]').value;
        const to = document.querySelector('input[placeholder="Destination Airport"]').value;
        
        if (from && to) {
            // Store search params
            sessionStorage.setItem('searchFrom', from);
            sessionStorage.setItem('searchTo', to);
            window.location.href = 'booking.html';
        } else {
            alert('Please fill in origin and destination');
        }
    });
}

// Swap origin/destination
const swapIcon = document.querySelector('.swap-icon');
if (swapIcon) {
    swapIcon.addEventListener('click', function() {
        const fromInput = document.querySelector('input[placeholder="Origin Airport"]');
        const toInput = document.querySelector('input[placeholder="Destination Airport"]');
        
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
        
        // Add rotation animation
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Ticket download/print
const downloadBtn = document.getElementById('download-ticket');
const printBtn = document.getElementById('print-ticket');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        // Simulate download
        this.innerHTML = '<span>Downloading...</span>';
        setTimeout(() => {
            this.innerHTML = '<span>Download</span>';
            alert('Ticket downloaded successfully!');
        }, 1500);
    });
}

if (printBtn) {
    printBtn.addEventListener('click', function() {
        window.print();
    });
}

// Class selection
const classCards = document.querySelectorAll('.class-card');
classCards.forEach(card => {
    const selectBtn = card.querySelector('.neon-button');
    if (selectBtn) {
        selectBtn.addEventListener('click', function() {
            // Remove active state from all cards
            classCards.forEach(c => c.classList.remove('selected'));
            // Add active state to clicked card
            card.classList.add('selected');
            
            // Store selected class
            const className = card.querySelector('h3').textContent;
            sessionStorage.setItem('selectedClass', className);
            
            // Navigate to seat selection
            setTimeout(() => {
                window.location.href = 'seats.html';
            }, 500);
        });
    }
});

// Flight card booking
const flightCards = document.querySelectorAll('.flight-card');
flightCards.forEach(card => {
    const bookBtn = card.querySelector('.neon-button');
    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            // Store flight info
            const flightRoute = card.querySelector('.flight-route').textContent;
            const flightPrice = card.querySelector('.flight-price').textContent;
            
            sessionStorage.setItem('selectedFlight', flightRoute);
            sessionStorage.setItem('flightPrice', flightPrice);
            
            // Navigate to class selection or seats
            window.location.href = 'seats.html';
        });
    }
});

// Admin table actions
const editButtons = document.querySelectorAll('.action-btn.edit');
const deleteButtons = document.querySelectorAll('.action-btn.delete');

editButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Edit functionality - Flight details would open in edit mode');
    });
});

deleteButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this flight?')) {
            const row = this.closest('tr');
            row.style.opacity = '0';
            row.style.transform = 'translateX(-100px)';
            setTimeout(() => {
                row.remove();
            }, 300);
        }
    });
});

// Reviews slider (auto-scroll)
const reviewsSlider = document.querySelector('.reviews-slider');
if (reviewsSlider) {
    let scrollPosition = 0;
    const scrollSpeed = 1;
    
    setInterval(() => {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= reviewsSlider.scrollWidth - reviewsSlider.clientWidth) {
            scrollPosition = 0;
        }
        reviewsSlider.scrollLeft = scrollPosition;
    }, 50);
}

// Loading animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loading-airplane');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Advanced Parallax scroll effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallax for multiple elements
    const parallaxElements = document.querySelectorAll('.hero-bg-image, .booking-hero, .destination-image, .gallery-item img');
    
    parallaxElements.forEach((element, index) => {
        const rate = scrolled * (0.3 + index * 0.1);
        const currentTransform = element.style.transform || '';
        if (!currentTransform.includes('scale')) {
            element.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});

// Create advanced particle system
function createAdvancedParticles() {
    const particlesContainer = document.querySelector('.animated-particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const color = Math.random() > 0.5 ? 'var(--cyan)' : 'var(--gold)';
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.animation = `particleFloat ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = delay + 's';
        particle.style.opacity = '0.7';
        
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
        }
        25% {
            transform: translate(50px, -50px) scale(1.2);
            opacity: 1;
        }
        50% {
            transform: translate(-30px, 30px) scale(0.8);
            opacity: 0.5;
        }
        75% {
            transform: translate(30px, 50px) scale(1.1);
            opacity: 0.9;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles on home page
if (document.getElementById('home')) {
    createAdvancedParticles();
}

// Image lazy loading with fade in
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

