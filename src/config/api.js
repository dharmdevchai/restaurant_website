// API Configuration
// Centralized configuration for all API endpoints and base URLs

const apiConfig = {
  // Base URL for all API requests
  baseURL: 'https://restaurant-website-adun.onrender.com',
  
  // API Endpoints
  endpoints: {
    auth: {
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      changePassword: '/api/auth/change-password'
    },
    reservations: {
      getAll: '/api/reservations',
      create: '/api/reservations',
      delete: (id) => `/api/reservations/${id}`,
      update: (id) => `/api/reservations/${id}`
    },
    gallery: {
      getAll: '/api/gallery',
      create: '/api/gallery',
      delete: (id) => `/api/gallery/${id}`,
      update: (id) => `/api/gallery/${id}`
    }
  },

  // Helper function to build full URLs
  buildUrl: function(endpoint) {
    return `${this.baseURL}${endpoint}`;
  }
};

export default apiConfig;