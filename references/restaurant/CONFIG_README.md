# Restaurant Configuration Guide

## Overview
The `config.js` file allows you to update all restaurant details in one place. Simply edit the `restaurantConfig` object and all changes will automatically appear throughout your website.

## How to Use

1. Open `config.js` in your code editor
2. Update the values in the `restaurantConfig` object
3. Save the file
4. Refresh your website - all changes will be applied automatically!

## Configuration Options

### Basic Information
```javascript
name: "Yala Cafe",                    // Restaurant name (appears in logo)
tagline: "Your tagline here",        // Tagline (appears in footer)
```

### Contact Information
```javascript
contact: {
    address: "123 Main Street, City, State 12345",
    phone: "(555) 123-4567",
    email: "info@yalacafe.com",
    website: "www.yalacafe.com"
}
```

### Operating Hours
```javascript
hours: {
    display: {
        "Monday - Thursday": "11am - 10pm",
        "Friday - Saturday": "11am - 11pm",
        "Sunday": "12pm - 9pm"
    }
}
```

### Social Media Links
```javascript
socialMedia: {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourpage",
    twitter: "https://twitter.com/yourpage"
}
```

### Hero Section
```javascript
hero: {
    title: "Welcome to Yala Cafe",
    subtitle: "Authentic flavors, unforgettable dining experience"
}
```

## What Gets Updated Automatically

✅ Restaurant name in navigation logo
✅ Page titles
✅ Footer tagline and contact info
✅ Contact page information
✅ Social media links
✅ Hero section text
✅ Operating hours throughout the site

## Example: Changing Restaurant Name

To change from "Yala Cafe" to "My Restaurant":

1. Open `config.js`
2. Find: `name: "Yala Cafe",`
3. Change to: `name: "My Restaurant",`
4. Save and refresh

The name will update everywhere automatically!

## Need Help?

All configuration values are clearly labeled with comments. Just follow the format shown and update the values with your restaurant's information.
