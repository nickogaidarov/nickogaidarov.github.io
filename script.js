// ============================
// Smooth Scrolling & Navigation
// ============================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================
    // Scroll to Top Button
    // ============================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        // Add shadow to navbar on scroll
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================
    // Form Handling
    // ============================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your inquiry! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
        
        // Form validation styling
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#d1d5db';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = '#2563eb';
            });
        });
    }
    
    // ============================
    // Intersection Observer for Animations
    // ============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // ============================
    // Active Navigation Link
    // ============================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ============================
    // Dynamic Year in Footer
    // ============================
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    if (yearElements.length > 0) {
        yearElements[0].innerHTML = `&copy; ${currentYear} ECT Kilburn. All rights reserved.`;
    }
    
    // ============================
    // Add hover effect to icons
    // ============================
    const icons = document.querySelectorAll('.service-icon, .contact-icon, .feature-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // ============================
    // Parallax Effect for Hero
    // ============================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 700);
        }
    });
    
    // ============================
    // Loading Animation
    // ============================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ============================
    // Service Card Click Event
    // ============================
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse animation on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // ============================
    // Email and Phone Click Analytics
    // ============================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Email link clicked:', link.href);
        });
    });
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Phone link clicked:', link.href);
        });
    });
});

// ============================
// Utility Functions
// ============================

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
