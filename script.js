// ============ DOM ELEMENTS ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navButtons = document.querySelector('.nav-buttons');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// ============ MOBILE MENU TOGGLE ============
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============ BACK TO TOP BUTTON ============
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
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

// ============ FORM VALIDATION ============
function validateForm() {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const message = document.getElementById('message');

    let isValid = true;

    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.classList.remove('error');
    });

    // Name validation
    if (name.value.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Phone validation (Indian format)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
        showError('phone', 'Please enter a valid 10-digit phone number');
        isValid = false;
    }

    // Service validation
    if (!service.value) {
        showError('service', 'Please select a service');
        isValid = false;
    }

    // Message validation
    if (message.value.trim().length < 5) {
        showError('message', 'Message must be at least 5 characters');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.classList.add('error');
}

// ============ FORM SUBMISSION ============
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Get form data
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Create WhatsApp message
    const whatsappMessage = `Hello A1 Padmavati Mobile! 

I would like to enquire about your services.

*Name:* ${name}
*Phone:* ${phone}
*Service:* ${service}
*Message:* ${message}

Please get back to me at your earliest convenience. Thank you!`;

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919158746664?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset form
    contactForm.reset();
    console.log('Form submitted successfully');
});

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and offer cards
document.querySelectorAll('.service-card, .offer-card, .product-category').forEach(card => {
    observer.observe(card);
});

// ============ LAZY LOADING FALLBACK ============
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('error', () => {
        // Fallback if image doesn't load
        img.style.display = 'none';
        const parent = img.parentElement;
        parent.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #003399 0%, #DC143C 100%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 250px;
                border-radius: 10px;
                font-weight: bold;
                text-align: center;
            ">
                <div>
                    <p style="font-size: 24px; margin-bottom: 10px;">🎁</p>
                    <p>Special Offers Available</p>
                    <p style="font-size: 12px; margin-top: 8px;">Call us for details</p>
                </div>
            </div>
        `;
    });
});

// ============ CONSOLE GREETING ============
console.log('%cA1 Padmavati Mobile', 'font-size: 20px; color: #003399; font-weight: bold;');
console.log('%cYour Trusted Mobile Shop in Bhiwandi', 'font-size: 14px; color: #DC143C;');
console.log('%cContact: 9158746664 | WhatsApp: +91 9158746664', 'font-size: 12px; color: #666;');

// ============ PAGE PERFORMANCE ============
// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent form submission on Enter in select fields
document.getElementById('service').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

// ============ PHONE NUMBER FORMATTING ============
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// ============ ANALYTICS & TRACKING (Optional) ============
// You can add your tracking code here
// Example: Google Analytics, Facebook Pixel, etc.
