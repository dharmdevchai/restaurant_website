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

export default restaurantConfig;
