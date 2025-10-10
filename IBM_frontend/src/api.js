/**
 * Dewdrop Talent MVP API Service
 *
 * This file provides a comprehensive API service for interacting with the backend.
 * It includes:
 * - Generic REST operations
 * - Error handling
 * - Authentication support
 * - Talent-specific operations
 */

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = "v1";

if (!API_BASE_URL) {
  console.error(
    "VITE_API_BASE_URL is not defined. Please set it in your environment variables.",
  );
}

class ApiService {
  constructor(authToken = null) {
    this.authToken = authToken;
    this.API_BASE_URL = API_BASE_URL;
    this.API_VERSION = API_VERSION;
    this.baseHeaders = {
      "Content-Type": "application/json",
    };
  }

  // Set authentication token (from Clerk or other auth provider)
  setAuthToken(token) {
    this.authToken = token;
  }

  // Get headers with authentication if available
  getHeaders(includeAuth = true) {
    const headers = { ...this.baseHeaders };
    if (includeAuth && this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  // Generic API request method with error handling
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      // Handle different response types
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.message || data}`);
      }

      return { data, status: response.status };
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // ===========================
  // GENERIC CRUD OPERATIONS
  // ===========================

  // Generic create operation
  async create(resource, data) {
    const endpoint = `${API_BASE_URL}/api/${API_VERSION}/${resource}`;
    return await this.makeRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Generic get all operation
  async getAll(resource) {
    const endpoint = `${API_BASE_URL}/api/${API_VERSION}/${resource}`;
    return await this.makeRequest(endpoint);
  }

  // Generic get by ID operation
  async getById(resource, id) {
    const endpoint = `${API_BASE_URL}/api/${API_VERSION}/${resource}/${id}`;
    return await this.makeRequest(endpoint);
  }

  // Generic update operation
  async update(resource, id, data) {
    const endpoint = `${API_BASE_URL}/api/${API_VERSION}/${resource}/${id}`;
    return await this.makeRequest(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Generic delete operation
  async delete(resource, id) {
    const endpoint = `${API_BASE_URL}/api/${API_VERSION}/${resource}/${id}`;
    return await this.makeRequest(endpoint, {
      method: "DELETE",
    });
  }

  // ===========================
  // HEALTH CHECK & STATUS
  // ===========================

  // Health check - No authentication required
  async healthCheck() {
    return await this.makeRequest(`${API_BASE_URL}/health`);
  }

  // Basic server status - No authentication required
  async getServerStatus() {
    return await this.makeRequest(`${API_BASE_URL}/`);
  }
}

export default ApiService;
