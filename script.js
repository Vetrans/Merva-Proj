// ========== MOBILE MENU TOGGLE ==========
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// ========== NAVIGATION & SECTION SWITCHING ==========
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const logo = document.querySelector('.logo');

// Function to show specific section
function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Close mobile menu
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
}

// Navigation click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Logo click - go to home
logo.addEventListener('click', () => {
    showSection('home');
});

// Button clicks for navigation
document.querySelectorAll('.btn-explore, .btn-contact').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Footer navigation links
document.querySelectorAll('.footer-section a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Initialize: Show only home section on page load
window.addEventListener('DOMContentLoaded', () => {
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.classList.add('hidden');
        } else {
            section.classList.remove('hidden');
        }
    });
    
    // Set home nav link as active
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ========== HEADER SCROLL EFFECTS ==========
const topBar = document.querySelector('.top-bar');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide top bar on scroll
    if (currentScroll > 50) {
        topBar.classList.add('hidden');
    } else {
        topBar.classList.remove('hidden');
    }
    
    // Add shadow to navbar
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== PRODUCT CATEGORY FILTER ==========
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        // Filter products
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease';
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Product category filter from dropdown menu
document.querySelectorAll('.dropdown-menu a[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        
        // Show products section
        showSection('products');
        
        // Filter products after a short delay
        setTimeout(() => {
            const targetButton = document.querySelector(`.category-btn[data-category="${category}"]`);
            if (targetButton) {
                targetButton.click();
            }
        }, 300);
    });
});

// ========== MOBILE DROPDOWN TOGGLE ==========
if (window.innerWidth <= 768) {
    document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = link.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });
}

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== CONTACT FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        alert('Thank you for your inquiry! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // In production, send data to server
        console.log('Form submitted with data:', data);
    }, 1500);
});

// ========== FORM INPUT ANIMATIONS ==========
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    // Add placeholder for label animation
    if (!input.hasAttribute('placeholder')) {
        input.setAttribute('placeholder', ' ');
    }
    
    // Focus effects
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ========== SMOOTH HOVER EFFECTS FOR CARDS ==========
// Product cards hover
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
});

// Info cards hover
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateX(0)';
    });
});

// Highlight cards hover
document.querySelectorAll('.highlight-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateX(0)';
    });
});

// Detail cards hover
document.querySelectorAll('.detail-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ========== BUTTON HOVER EFFECTS ==========
const buttons = document.querySelectorAll('.btn, .category-btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.section-header, .about-grid, .founder-card, .company-details').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(el);
});

// ========== WINDOW RESIZE HANDLER ==========
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset dropdown displays
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }, 250);
});

// ========== ACCESSIBILITY: KEYBOARD NAVIGATION ==========
buttons.forEach(button => {
    button.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// ========== PREVENT FORM RESUBMISSION ==========
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate hero elements on page load
    const heroElements = document.querySelectorAll('.hero-logo, .hero-title, .hero-divider, .hero-subtitle, .hero-description, .hero-buttons, .hero-features');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ========== CONSOLE BRANDING ==========
console.log('%c🌾 Merava Global', 'font-size: 24px; font-weight: bold; color: #c9a961; font-family: Playfair Display;');
console.log('%cPremium Agricultural Exports from Kolhapur', 'font-size: 14px; color: #1a2540; font-weight: 600;');
console.log('%cWebsite: www.meravaglobal.com', 'font-size: 12px; color: #666;');
console.log('%c✨ Crafted with excellence for global trade', 'font-size: 11px; color: #999; font-style: italic;');

// ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                showSection(targetId);
            }
        }
    });
});

// ========== DEBOUNCED SCROLL HANDLER ==========
let ticking = false;
let lastKnownScrollPosition = 0;

function doSomething(scrollPos) {
    // Scroll-dependent operations
    if (scrollPos > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            doSomething(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
}, { passive: true });