// Auto-detect environment (local vs Tomcat)
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8001"            // Local Dev Backend
    : `${window.location.origin}/foodrecipie`; // Backend WAR deployed on Tomcat

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // ✅ Signup
  async signUp(userData) {
    return this.request("/users/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  // ✅ Signin
  async signIn(email, password) {
    return this.request("/users/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // ✅ Forgot Password
  async forgotPassword(email) {
    return this.request(`/users/forgotpassword/${encodeURIComponent(email)}`, {
      method: "GET",
    });
  }

  // ✅ Get Full Name
  async getFullName(csrid) {
    return this.request("/users/fullname", {
      method: "POST",
      body: JSON.stringify({ csrid }),
    });
  }
}

export default new ApiService();
