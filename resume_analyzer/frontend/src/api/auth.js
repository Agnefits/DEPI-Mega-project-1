const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Log in a user with email and password.
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - { token, user, message }
 */
export async function loginUser({ email, password }) {
    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.message || "Login failed");
        }

        return data; // { token, user, message }
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: error.message };
    }
}

/**
 * Sign up a new user with name, email, and password.
 * @param {Object} details - { name, email, password }
 * @returns {Promise<Object>} - { success, message }
 */
export async function signupUser({ name, email, password }) {
    try {
        const response = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.message || "Signup failed");
        }

        return { success: true, ...data };
    } catch (error) {
        console.error("Signup error:", error);
        return { success: false, message: error.message };
    }
}

/**
 * Log out the user by clearing token from localStorage.
 */
export function logoutUser() {
    localStorage.removeItem("token");
}

/**
 * Check if the user is authenticated.
 * @returns {boolean}
 */
export function isAuthenticated() {
    return !!localStorage.getItem("token");
}

