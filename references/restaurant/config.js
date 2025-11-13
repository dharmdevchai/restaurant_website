// Restaurant Configuration
// Update all restaurant details in this one place

const restaurantConfig = {
    // Basic Information
    name: "Cafe Madhu",
    tagline: "Bringing authentic flavors and warm hospitality to your table",
    
    // Contact Information
    contact: {
        address: "123 Main Street, City, State 12345",
        phone: "(555) 123-4567",
        email: "info@yalacafe.com",
        website: "www.yalacafe.com"
    },
    
    // Operating Hours
    hours: {
        weekdays: "11am - 10pm",
        weekends: "11am - 11pm",
        sunday: "12pm - 9pm",
        display: {
            "Monday - Thursday": "11am - 10pm",
            "Friday - Saturday": "11am - 11pm",
            "Sunday": "12pm - 9pm"
        }
    },
    
    // Social Media Links
    socialMedia: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
    },
    
    // Restaurant Details
    details: {
        founded: "2010",
        description: "Founded with a vision to bring authentic flavors and warm hospitality to our community, Yala Cafe has been serving exceptional cuisine since 2010."
    },
    
    // Hero Section
    hero: {
        title: "Welcome to Yala Cafe",
        subtitle: "Authentic flavors, unforgettable dining experience"
    },
    
    // Features
    features: [
        {
            icon: "🍽️",
            title: "Fresh Ingredients",
            description: "We source the finest ingredients daily to ensure the best quality in every dish"
        },
        {
            icon: "👨‍🍳",
            title: "Expert Chefs",
            description: "Our talented chefs bring years of experience and passion to every meal"
        },
        {
            icon: "🌟",
            title: "Cozy Ambiance",
            description: "Experience warmth and comfort in our beautifully designed dining space"
        }
    ]
};

// Function to initialize restaurant config throughout the website
function initializeRestaurantConfig() {
    // Update restaurant name in logo
    const logoElements = document.querySelectorAll('.logo h1');
    logoElements.forEach(logo => {
        if (logo) logo.textContent = restaurantConfig.name;
    });
    
    // Update page titles
    document.title = restaurantConfig.name + (document.title.includes('-') ? document.title.substring(document.title.indexOf('-')) : ' - Restaurant');
    
    // Update tagline in footer
    const taglineElements = document.querySelectorAll('.footer-col p');
    taglineElements.forEach(tagline => {
        if (tagline && (tagline.textContent.includes('Bringing authentic') || tagline.textContent.trim().length > 0 && tagline.textContent.length < 100)) {
            if (tagline.textContent.includes('Bringing') || tagline.previousElementSibling && tagline.previousElementSibling.tagName === 'H3') {
                tagline.textContent = restaurantConfig.tagline;
            }
        }
    });
    
    // Update contact information
    updateContactInfo();
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroTitle) heroTitle.textContent = restaurantConfig.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = restaurantConfig.hero.subtitle;
    
    // Update social media links
    updateSocialMediaLinks();
    
    // Update contact page
    updateContactPage();
}

// Update contact information
function updateContactInfo() {
    // Update address
    const addressElements = document.querySelectorAll('footer .footer-col ul li, .contact-item p');
    addressElements.forEach(el => {
        if (el.textContent.includes('Main Street') || el.textContent.includes('📍')) {
            if (el.textContent.includes('📍')) {
                el.textContent = `📍 ${restaurantConfig.contact.address}`;
            } else if (el.textContent.includes('Main Street')) {
                el.innerHTML = el.innerHTML.replace(/123 Main Street.*?(?=<br>|$)/, restaurantConfig.contact.address);
            }
        }
    });
    
    // Update phone
    const phoneElements = document.querySelectorAll('footer .footer-col ul li, .contact-item p');
    phoneElements.forEach(el => {
        if (el.textContent.includes('(555)') || el.textContent.includes('📞')) {
            if (el.textContent.includes('📞')) {
                el.textContent = `📞 ${restaurantConfig.contact.phone}`;
            } else if (el.textContent.includes('(555)')) {
                el.textContent = el.textContent.replace(/\(555\)\s*\d{3}-\d{4}/, restaurantConfig.contact.phone);
            }
        }
    });
    
    // Update email
    const emailElements = document.querySelectorAll('footer .footer-col ul li, .contact-item p');
    emailElements.forEach(el => {
        if (el.textContent.includes('@yalacafe') || el.textContent.includes('✉️')) {
            if (el.textContent.includes('✉️')) {
                el.textContent = `✉️ ${restaurantConfig.contact.email}`;
            } else if (el.textContent.includes('@yalacafe')) {
                el.textContent = el.textContent.replace(/info@yalacafe\.com/, restaurantConfig.contact.email);
            }
        }
    });
    
    // Update hours in footer
    const hoursElements = document.querySelectorAll('.footer-col ul li');
    hoursElements.forEach(el => {
        if (el.textContent.includes('Mon - Thu:')) {
            el.textContent = `Mon - Thu: ${restaurantConfig.hours.display['Monday - Thursday']}`;
        } else if (el.textContent.includes('Fri - Sat:')) {
            el.textContent = `Fri - Sat: ${restaurantConfig.hours.display['Friday - Saturday']}`;
        } else if (el.textContent.includes('Sunday:')) {
            el.textContent = `Sunday: ${restaurantConfig.hours.display['Sunday']}`;
        }
    });
}

// Update social media links
function updateSocialMediaLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link) => {
        const ariaLabel = link.getAttribute('aria-label');
        if (ariaLabel === 'Facebook') {
            link.href = restaurantConfig.socialMedia.facebook;
        } else if (ariaLabel === 'Instagram') {
            link.href = restaurantConfig.socialMedia.instagram;
        } else if (ariaLabel === 'Twitter') {
            link.href = restaurantConfig.socialMedia.twitter;
        }
    });
}

// Update contact page information
function updateContactPage() {
    // Update address in contact page
    document.querySelectorAll('.contact-item').forEach(item => {
        const h3 = item.querySelector('h3');
        const p = item.querySelector('p');
        
        if (h3 && p) {
            if (h3.textContent.trim() === 'Address') {
                p.innerHTML = restaurantConfig.contact.address.replace(', ', '<br>');
            } else if (h3.textContent.trim() === 'Phone') {
                p.textContent = restaurantConfig.contact.phone;
            } else if (h3.textContent.trim() === 'Email') {
                p.textContent = restaurantConfig.contact.email;
            } else if (h3.textContent.trim() === 'Hours') {
                p.innerHTML = `Mon - Thu: ${restaurantConfig.hours.display['Monday - Thursday']}<br>
                              Fri - Sat: ${restaurantConfig.hours.display['Friday - Saturday']}<br>
                              Sunday: ${restaurantConfig.hours.display['Sunday']}`;
            }
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRestaurantConfig);
} else {
    initializeRestaurantConfig();
}

// Export config for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = restaurantConfig;
}
