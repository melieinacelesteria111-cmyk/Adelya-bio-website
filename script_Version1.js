// ============ SMOOTH SCROLLING & NAV HIGHLIGHTING ============
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============ HAMBURGER MENU ============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

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

// ============ CONTACT FORM VALIDATION ============
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateName(name) {
    return name.trim().length >= 3;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, nameError, 'Nama harus minimal 3 karakter');
    } else {
        clearError(nameInput, nameError);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Email tidak valid');
    } else {
        clearError(emailInput, emailError);
    }
});

subjectInput.addEventListener('blur', () => {
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, subjectError, 'Subjek harus minimal 3 karakter');
    } else {
        clearError(subjectInput, subjectError);
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, messageError, 'Pesan harus minimal 10 karakter');
    } else {
        clearError(messageInput, messageError);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear all previous errors
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(subjectInput, subjectError);
    clearError(messageInput, messageError);
    successMessage.classList.remove('show');
    successMessage.textContent = '';

    // Validate all fields
    let isValid = true;

    if (!validateName(nameInput.value)) {
        showError(nameInput, nameError, 'Nama harus minimal 3 karakter');
        isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Email tidak valid');
        isValid = false;
    }

    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, subjectError, 'Subjek harus minimal 3 karakter');
        isValid = false;
    }

    if (!validateMessage(messageInput.value)) {
        showError(messageInput, messageError, 'Pesan harus minimal 10 karakter');
        isValid = false;
    }

    // If all validations pass, show success message
    if (isValid) {
        successMessage.textContent = '✓ Pesan Anda telah terkirim! Terima kasih telah menghubungi saya.';
        successMessage.classList.add('show');

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-text, .interests, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============ PREVENT FORM SUBMISSION (DEMO) ============
// In production, you would send the form data to a server using fetch or axios
console.log('Contact form is ready. In production, implement email sending via server.');