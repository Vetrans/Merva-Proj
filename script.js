// ========== GSAP INITIALIZATION ==========
gsap.registerPlugin(ScrollTrigger);

// ========== SECTION NAVIGATION ==========
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
        
        // Animate section entrance
        gsap.from(targetSection.children, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ========== MOBILE MENU TOGGLE ==========
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-wrapper')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// ========== HIDE TOP BAR ON SCROLL ==========
const topBar = document.getElementById('topBar');
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        topBar.classList.add('hidden');
        navbar.classList.add('scrolled');
    } else {
        topBar.classList.remove('hidden');
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ========== DROPDOWN MENU FOR PRODUCTS ==========
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        
        // Show products section
        showSection('products');
        
        // Filter products after a short delay
        setTimeout(() => {
            filterProducts(category);
        }, 300);
    });
});

// ========== PRODUCT FILTER ==========
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

function filterProducts(category) {
    // Update active button
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter and animate products
    productCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            gsap.to(card, {
                opacity: 1,
                scale: 1,
                display: 'block',
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        } else {
            gsap.to(card, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => {
                    card.style.display = 'none';
                }
            });
        }
    });
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterProducts(category);
    });
});

// ========== SCROLL ANIMATIONS WITH GSAP ==========
// Hero animations
gsap.from('.hero-logo', {
    scale: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    delay: 0.3
});

gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6
});

gsap.from('.hero-divider', {
    width: 0,
    duration: 0.8,
    delay: 0.9
});

gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 1.1
});

gsap.from('.hero-description', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 1.3
});

gsap.from('.hero-buttons .btn', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    delay: 1.5
});

gsap.from('.hero-features .feature-item', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    delay: 1.8
});

// About section animations
gsap.utils.toArray('.about-grid, .founder-card, .company-details').forEach(elem => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out'
    });
});

// Highlight cards stagger animation
gsap.from('.highlight-card', {
    scrollTrigger: {
        trigger: '.about-highlights',
        start: 'top 80%'
    },
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.2
});

// Product cards animation
gsap.from('.product-card', {
    scrollTrigger: {
        trigger: '.products-grid',
        start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.1
});

// Contact cards animation
gsap.from('.info-card', {
    scrollTrigger: {
        trigger: '.contact-info-cards',
        start: 'top 80%'
    },
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.2
});

// ========== PARALLAX EFFECT ==========
gsap.to('.hero-bg-image', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 300,
    opacity: 0
});

// About image parallax
gsap.to('.about-main-image', {
    scrollTrigger: {
        trigger: '.about-image-wrapper',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    },
    y: 100
});

// Founder image parallax
gsap.to('.founder-image img', {
    scrollTrigger: {
        trigger: '.founder-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    },
    y: 50
});

// ========== CONTACT FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create WhatsApp message
    const message = `Hello! I'm interested in your products.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'N/A'}
Product Interest: ${data.product}

Message: ${data.message}`;
    
    const whatsappUrl = `https://wa.me/918087227973?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    gsap.to('.contact-form-wrapper', {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });
    
    alert('Thank you! Redirecting you to WhatsApp...');
    
    // Reset form
    contactForm.reset();
});

// ========== FORM INPUT ANIMATIONS ==========
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    if (!input.hasAttribute('placeholder')) {
        input.setAttribute('placeholder', ' ');
    }
    
    input.addEventListener('focus', function() {
        gsap.to(this.parentElement, {
            scale: 1.02,
            duration: 0.3
        });
    });
    
    input.addEventListener('blur', function() {
        gsap.to(this.parentElement, {
            scale: 1,
            duration: 0.3
        });
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        gsap.to(scrollTopBtn, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.3
        });
    } else {
        gsap.to(scrollTopBtn, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.3
        });
    }
});

scrollTopBtn.addEventListener('click', () => {
    showSection('home');
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== BUTTON HOVER EFFECTS ==========
const buttons = document.querySelectorAll('.btn, .category-btn, .btn-enquiry');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ========== CARD HOVER ANIMATIONS ==========
const cards = document.querySelectorAll('.product-card, .info-card, .detail-card, .highlight-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -10,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            duration: 0.3
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
            duration: 0.3
        });
    });
});

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target) {
    gsap.to(element, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: 'power1.out'
    });
}

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    gsap.from('body', {
        opacity: 0,
        duration: 0.5
    });
    
    // Show home section by default
    showSection('home');
});

// ========== PREVENT FORM RESUBMISSION ==========
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const sectionId = href.substring(1);
            showSection(sectionId);
        }
    });
});

// ========== INTERSECTION OBSERVER FOR LAZY ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// ========== LOGO ANIMATION ==========
gsap.to('.logo img', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
});

// ========== SCROLL INDICATOR ANIMATION ==========
gsap.to('.scroll-indicator', {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

// ========== CONSOLE BRANDING ==========
console.log('%c🦅 Merava Global', 'font-size: 24px; font-weight: bold; color: #c9a961;');
console.log('%cImport & Export Excellence from Kolhapur', 'font-size: 14px; color: #1a2540;');
console.log('%cPowered by GSAP & Modern Web Technologies', 'font-size: 12px; color: #666;');

// ========== WHATSAPP FLOAT BUTTON ==========
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/918087227973';
whatsappBtn.target = '_blank';
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
whatsappBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 100px;
    width: 60px;
    height: 60px;
    background: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    box-shadow: 0 5px 20px rgba(37, 211, 102, 0.5);
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(whatsappBtn);

// Animate WhatsApp button
gsap.from('.whatsapp-float', {
    scale: 0,
    duration: 0.5,
    delay: 2,
    ease: 'back.out(1.7)'
});

gsap.to('.whatsapp-float', {
    y: -5,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

whatsappBtn.addEventListener('mouseenter', function() {
    gsap.to(this, {
        scale: 1.1,
        rotation: 15,
        duration: 0.3
    });
});

whatsappBtn.addEventListener('mouseleave', function() {
    gsap.to(this, {
        scale: 1,
        rotation: 0,
        duration: 0.3
    });
});