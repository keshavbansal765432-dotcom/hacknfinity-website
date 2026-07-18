// API helper functions for fetching data from the Node.js/Express backend.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Standard fetch helper that injects auth token
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Prepare headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // 1. Prioritize an explicitly provided token first, otherwise check local sources
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  } else if (typeof window !== 'undefined') {
    // Fallback logic for localStorage sessions if needed elsewhere
    const savedSession = localStorage.getItem('mock_user_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        headers['Authorization'] = `Bearer dev-${parsed.uid.replace('dev-', '')}`;
      } catch (err) {
        console.error('Error parsing mock session:', err);
      }
    }
  }

  // Clean custom options properties before fetching
  const fetchOptions = { ...options };
  delete fetchOptions.token;

  const response = await fetch(url, {
    ...fetchOptions,
    headers
  });

  // Handle empty or text responses gracefully safely
  const contentType = response.headers.get('content-type');
  let data = {};
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    // Include response.status (e.g., 404, 500) to pinpoint the exact failure
    throw new Error(`[HTTP ${response.status}] ${data.message || response.statusText || 'Something went wrong'}`);
  }

  return data;
}

export const api = {
  // Authentication/Profile sync - Updated to handle explicit token and user payloads
  syncUser: async (token, userData) => {
    return request('/auth/sync', {
      method: 'POST',
      token,
      body: JSON.stringify(userData)
    });
  },

  getProfile: async (token) => {
    return request('/auth/profile', { token });
  },

  // Events & Hackathons
  getEvents: async () => {
    return request('/events');
  },

  getEventDetails: async (id) => {
    return request(`/events/${id}`);
  },

  registerForEvent: async (id, token) => {
    return request(`/events/${id}/register`, {
      method: 'POST',
      token
    });
  },

  // Certificate Verification
  verifyCertificate: async (certificateId) => {
    return request(`/certificates/verify/${certificateId}`);
  },

  issueTestCertificate: async (eventName, type) => {
    return request('/certificates/issue-test', {
      method: 'POST',
      body: JSON.stringify({ eventName, type })
    });
  },

  // Applications
  submitApplication: async (applicationData, token) => {
    return request('/applications', {
      method: 'POST',
      token,
      body: JSON.stringify(applicationData)
    });
  },

  // Contact
  submitContact: async (contactData) => {
    return request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData)
    });
  },

  // Blogs
  getBlogs: async () => {
    return request('/blogs');
  },

  getBlogDetails: async (slug) => {
    return request(`/blogs/${slug}`);
  }
};

export default api;