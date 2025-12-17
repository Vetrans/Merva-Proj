// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});

// Section Navigation - Single Section Visibility
function showSection(sectionId) {
    // Hide all sections
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    // Close mobile menu if open
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Handle all navigation clicks
document.addEventListener('click', (e) => {
    // Check if clicked element or its parent has data-section
    let target = e.target;
    let sectionId = null;

    // Traverse up to find data-section attribute
    while (target && target !== document) {
        sectionId = target.getAttribute('data-section');
        if (sectionId) break;
        target = target.parentElement;
    }

    if (sectionId) {
        e.preventDefault();
        showSection(sectionId);
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Mobile dropdown toggle
const dropdown = document.querySelector('.dropdown > .nav-link');
if (dropdown && window.innerWidth <= 968) {
    dropdown.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dropdownParent = dropdown.parentElement;
        dropdownParent.classList.toggle('active');
    });
}

// Product filtering with enhanced animations
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.classList.remove('hide');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
                }, 10);
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// Handle dropdown product filter navigation
document.querySelectorAll('.dropdown-content a[data-filter]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Get the filter value
        const filter = this.getAttribute('data-filter');

        // Navigate to products section
        showSection('products');

        // Wait for section to be visible, then filter
        setTimeout(() => {
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
            if (filterBtn) {
                filterBtn.click();
            }
        }, 300);
    });
});

// Hero product cards navigation with filtering
document.querySelectorAll('.hero-product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const filter = this.getAttribute('data-filter');
        
        // Navigate to products section
        showSection('products');
        
        // Wait for section to be visible, then filter
        setTimeout(() => {
            if (filter && filter !== 'all') {
                const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                if (filterBtn) {
                    filterBtn.click();
                }
            }
        }, 300);
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Create WhatsApp message
    const message = `
*New Inquiry from Merava Global Website*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Company:* ${data.company || 'Not specified'}
*Product Interest:* ${data.product}

*Message:*
${data.message}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918087227973?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset form
    contactForm.reset();

    // Show success message
    alert('Thank you for your inquiry! Redirecting you to WhatsApp...');
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements when they enter viewport
document.querySelectorAll('.about-image, .about-text, .about-feature-item, .founder-card, .detail-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// Add stagger animation to product cards on section load
const productsSection = document.getElementById('products');
const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.product-card:not(.hide)');
            cards.forEach((card, index) => {
                card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
            });
            productObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (productsSection) {
    productObserver.observe(productsSection);
}

// Enhanced mobile experience
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    const swipeThreshold = 100;

    // Optional: Add custom swipe behavior
    if (Math.abs(swipeDistance) > swipeThreshold) {
        // Swipe detected
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fix iOS viewport height issue
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', debounce(setVH, 250));

// Preload critical images
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add keyboard support for hamburger
hamburger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js';
    document.head.appendChild(script);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.slice(1) || 'home';
    showSection(hash);
});

// Update URL hash when section changes (optional)
function updateURL(sectionId) {
    if (history.pushState) {
        history.pushState(null, null, `#${sectionId}`);
    } else {
        window.location.hash = sectionId;
    }
}

// Enhanced section navigation with URL update
const originalShowSection = showSection;
showSection = function (sectionId) {
    originalShowSection(sectionId);
    updateURL(sectionId);
};

// Initialize: Show correct section based on URL hash
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1);
    if (hash && ['home', 'about', 'certifications','products', 'contact'].includes(hash)) {
        showSection(hash);
    } else {
        showSection('home');
    }
});

// Add ripple effect to buttons (optional enhancement)
document.querySelectorAll('.btn, .filter-btn, .btn-enquire').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Console welcome message
console.log('%c🌾 Merava Global', 'font-size: 20px; font-weight: bold; color: #c9a961;');
console.log('%cPremium Agricultural Exports from Kolhapur', 'font-size: 14px; color: #1a2540;');
console.log('%cwww.meravaglobal.com', 'font-size: 12px; color: #666;');
