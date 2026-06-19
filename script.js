// ============================================
// Retro Vibe - Main JavaScript
// ============================================

// ============================================
// Product Data (Simulated Dynamic Loading)
// ============================================
const products = [
    { id: 1, name: "ACMilan/07", fullName: "AC Milan 2007 Home Kit", price: "R1,200", img: "ACMilan07.jpg", alt: "AC Milan 2007 vintage football jersey" },
    { id: 2, name: "Barca/99", fullName: "Barcelona 1999 Home Kit", price: "R1,450", img: "Barca99.jpg", alt: "Barcelona 1999 vintage football jersey" },
    { id: 3, name: "England/98", fullName: "England 1998 Home Kit", price: "R1,100", img: "England98.jpg", alt: "England 1998 vintage football jersey" },
    { id: 4, name: "France/06", fullName: "France 2006 Home Kit", price: "R1,300", img: "France06.jpg", alt: "France 2006 vintage football jersey" },
    { id: 5, name: "Inter/96", fullName: "Inter Milan 1996 Home Kit", price: "R1,250", img: "Inter96.jpg", alt: "Inter Milan 1996 vintage football jersey" },
    { id: 6, name: "Juve/16", fullName: "Juventus 2016 Home Kit", price: "R1,150", img: "Juve16.jpg", alt: "Juventus 2016 vintage football jersey" },
    { id: 7, name: "Juve/98", fullName: "Juventus 1998 Home Kit", price: "R1,400", img: "Juve98.jpg", alt: "Juventus 1998 vintage football jersey" },
    { id: 8, name: "PSG/03", fullName: "PSG 2003 Home Kit", price: "R1,050", img: "PSG03.jpg", alt: "PSG 2003 vintage football jersey" },
    { id: 9, name: "RMadrid/00", fullName: "Real Madrid 2000 Home Kit", price: "R1,350", img: "RMadrid00.jpg", alt: "Real Madrid 2000 vintage football jersey" }
];

// ============================================
// Load Products Dynamically
// ============================================
function loadProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-name', product.name.toLowerCase());
        card.setAttribute('data-fullname', product.fullName.toLowerCase());
        card.style.animationDelay = (index * 0.1) + 's';
        card.classList.add('fade-in');
        
        card.innerHTML = `
            <img src="${product.img}" alt="${product.alt}" loading="lazy" onclick="openLightbox('${product.img}', '${product.fullName}')">
            <p class="kit-info">${product.name}</p>
            <p class="kit-price">${product.price}</p>
        `;
        
        grid.appendChild(card);
    });
}

// ============================================
// Product Search / Filter
// ============================================
function filterProducts() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name');
        const fullName = card.getAttribute('data-fullname');
        
        if (name.includes(query) || fullName.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============================================
// Lightbox Gallery
// ============================================
function openLightbox(imgSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox(event) {
    if (event && event.target !== event.currentTarget) return;
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ============================================
// Accordion
// ============================================
function toggleAccordion(header) {
    const item = header.parentElement;
    const allItems = document.querySelectorAll('.accordion-item');
    
    allItems.forEach(acc => {
        if (acc !== item) {
            acc.classList.remove('active');
        }
    });
    
    item.classList.toggle('active');
}

// ============================================
// Form Validation Helpers
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-]{10,15}$/;
    return phone === '' || re.test(phone);
}

function showError(inputId, errorId, show) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input && error) {
        if (show) {
            input.classList.add('error');
            input.classList.remove('success');
            error.classList.add('visible');
        } else {
            input.classList.remove('error');
            input.classList.add('success');
            error.classList.remove('visible');
        }
    }
}

function showFormResponse(responseId, message, isSuccess) {
    const response = document.getElementById(responseId);
    if (response) {
        response.textContent = message;
        response.className = 'form-response ' + (isSuccess ? 'success' : 'error');
    }
}

// ============================================
// Enquiry Form Validation & Submission
// ============================================
function initEnquiryForm() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('enqName');
        if (!name.value.trim() || name.value.trim().length < 2) {
            showError('enqName', 'enqNameError', true);
            isValid = false;
        } else {
            showError('enqName', 'enqNameError', false);
        }
        
        // Email validation
        const email = document.getElementById('enqEmail');
        if (!validateEmail(email.value)) {
            showError('enqEmail', 'enqEmailError', true);
            isValid = false;
        } else {
            showError('enqEmail', 'enqEmailError', false);
        }
        
        // Phone validation (optional)
        const phone = document.getElementById('enqPhone');
        if (!validatePhone(phone.value)) {
            showError('enqPhone', 'enqPhoneError', true);
            isValid = false;
        } else {
            showError('enqPhone', 'enqPhoneError', false);
        }
        
        // Enquiry type validation
        const enquiryType = document.querySelector('input[name="enquiryType"]:checked');
        const typeError = document.getElementById('enqTypeError');
        if (!enquiryType) {
            if (typeError) typeError.classList.add('visible');
            isValid = false;
        } else {
            if (typeError) typeError.classList.remove('visible');
        }
        
        // Message validation
        const message = document.getElementById('enqMessage');
        if (!message.value.trim() || message.value.trim().length < 10) {
            showError('enqMessage', 'enqMessageError', true);
            isValid = false;
        } else {
            showError('enqMessage', 'enqMessageError', false);
        }
        
        if (isValid) {
            // Simulate AJAX submission
            const submitBtn = document.getElementById('enqSubmit');
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const kit = document.getElementById('enqKit');
                const kitName = kit && kit.value ? kit.options[kit.selectedIndex].text : 'N/A';
                
                let responseMsg = 'Thank you for your enquiry, ' + name.value.trim() + '! ';
                
                if (enquiryType.value === 'product') {
                    responseMsg += 'We have received your interest in the ' + kitName + '. We will check availability and get back to you with pricing within 24 hours.';
                } else if (enquiryType.value === 'service') {
                    responseMsg += 'Our team will review your service request and contact you shortly with more details.';
                } else if (enquiryType.value === 'volunteer') {
                    responseMsg += 'We appreciate your interest in volunteering! We will send you more information about our volunteer program soon.';
                } else if (enquiryType.value === 'sponsor') {
                    responseMsg += 'Thank you for considering sponsorship. Our partnerships team will reach out to discuss opportunities.';
                }
                
                showFormResponse('enqResponse', responseMsg, true);
                submitBtn.value = 'Submit Enquiry';
                submitBtn.disabled = false;
                form.reset();
                
                // Clear success states
                document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
            }, 1500);
        } else {
            showFormResponse('enqResponse', 'Please fix the errors above before submitting.', false);
        }
    });
    
    // Real-time validation
    document.getElementById('enqName').addEventListener('blur', function() {
        if (this.value.trim().length >= 2) {
            showError('enqName', 'enqNameError', false);
        }
    });
    
    document.getElementById('enqEmail').addEventListener('blur', function() {
        if (validateEmail(this.value)) {
            showError('enqEmail', 'enqEmailError', false);
        }
    });
    
    document.getElementById('enqMessage').addEventListener('blur', function() {
        if (this.value.trim().length >= 10) {
            showError('enqMessage', 'enqMessageError', false);
        }
    });
}

// ============================================
// Contact Form Validation & Submission
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('contactName');
        if (!name.value.trim() || name.value.trim().length < 2) {
            showError('contactName', 'contactNameError', true);
            isValid = false;
        } else {
            showError('contactName', 'contactNameError', false);
        }
        
        // Email validation
        const email = document.getElementById('contactEmail');
        if (!validateEmail(email.value)) {
            showError('contactEmail', 'contactEmailError', true);
            isValid = false;
        } else {
            showError('contactEmail', 'contactEmailError', false);
        }
        
        // Phone validation (optional)
        const phone = document.getElementById('contactPhone');
        if (!validatePhone(phone.value)) {
            showError('contactPhone', 'contactPhoneError', true);
            isValid = false;
        } else {
            showError('contactPhone', 'contactPhoneError', false);
        }
        
        // Message validation
        const message = document.getElementById('contactMessage');
        if (!message.value.trim() || message.value.trim().length < 10) {
            showError('contactMessage', 'contactMessageError', true);
            isValid = false;
        } else {
            showError('contactMessage', 'contactMessageError', false);
        }
        
        if (isValid) {
            // Simulate AJAX submission and compile email
            const submitBtn = document.getElementById('contactSubmit');
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const messageType = document.querySelector('input[name="messageType"]:checked');
                const typeLabel = messageType ? messageType.nextElementSibling.textContent : 'General';
                
                const gender = document.querySelector('input[name="gender"]:checked');
                const genderLabel = gender ? gender.nextElementSibling.textContent : 'Not specified';
                
                // Compile email content (simulated)
                const emailSubject = 'Retro Vibe Contact - ' + typeLabel + ' from ' + name.value.trim();
                const emailBody = 'Name: ' + name.value.trim() + '\n' +
                                  'Email: ' + email.value.trim() + '\n' +
                                  'Phone: ' + (phone.value || 'N/A') + '\n' +
                                  'Gender: ' + genderLabel + '\n' +
                                  'Message Type: ' + typeLabel + '\n\n' +
                                  'Message:\n' + message.value.trim();
                
                // Create mailto link (simulated send)
                const mailtoLink = 'mailto:retrovibe@email.com?subject=' + encodeURIComponent(emailSubject) + 
                                   '&body=' + encodeURIComponent(emailBody);
                
                showFormResponse('contactResponse', 
                    'Thank you, ' + name.value.trim() + '! Your ' + typeLabel.toLowerCase() + ' has been sent to retrovibe@email.com. We will respond within 24 hours.', 
                    true);
                
                // Open mailto in new window (simulated email send)
                window.open(mailtoLink, '_blank');
                
                submitBtn.value = 'Send Message';
                submitBtn.disabled = false;
                form.reset();
                
                document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
            }, 1500);
        } else {
            showFormResponse('contactResponse', 'Please fix the errors above before sending your message.', false);
        }
    });
    
    // Real-time validation
    document.getElementById('contactName').addEventListener('blur', function() {
        if (this.value.trim().length >= 2) {
            showError('contactName', 'contactNameError', false);
        }
    });
    
    document.getElementById('contactEmail').addEventListener('blur', function() {
        if (validateEmail(this.value)) {
            showError('contactEmail', 'contactEmailError', false);
        }
    });
    
    document.getElementById('contactMessage').addEventListener('blur', function() {
        if (this.value.trim().length >= 10) {
            showError('contactMessage', 'contactMessageError', false);
        }
    });
}

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initEnquiryForm();
    initContactForm();
});
