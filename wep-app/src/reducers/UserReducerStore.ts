import { create } from "zustand";
import axios from "axios";

interface User {
  fullName?: string;
  email: string;
  token?: string;
  isAuthenticated?: boolean;
}

export interface ResetPasswordRequest {
  email: string;
  resetCode: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

interface UserState {
  ChangePasswordRequest: ChangePasswordRequest;
  user: User;
  token: string;
  isAuthenticated: boolean;
  success: boolean | null; 
  resetPasswordRequest: ResetPasswordRequest | null;
  error?: string; 
  loginAsync: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
  register: (userData: { fullName: string; email: string; password: string }) => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  setChangePasswordRequest: (data: ChangePasswordRequest) => void;

}

export const useUserStore = create<UserState>((set) => ({
  ChangePasswordRequest: { oldPassword: "", newPassword: "" },
  resetPasswordRequest: { email: "", resetCode: "", newPassword: "" },
  user: { fullName: "", email: "" },
  token: localStorage.getItem("token") || "",
  isAuthenticated: !!localStorage.getItem("token"),
  success: null,
  error: undefined,
  setChangePasswordRequest: (data) => set({ ChangePasswordRequest: data }),
  loginAsync: async (email, password) => {
    try {
      const res = await axios.post("https://jobgenius.bsite.net/api/auth/login", {
        email,
        password,
      });

      const { token, fullname, email: returnedEmail } = res.data;

      if (!token || !returnedEmail) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);

      set({
        user: {
          fullName: fullname || "",
          email: returnedEmail,
        },
        token,
        isAuthenticated: true,
      });

      console.log("Login successful");
    } catch (err: any) {
      console.error("Login failed:", err);
      throw new Error(err?.response?.data?.message || "Login failed");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: { fullName: "", email: "" },
      token: "",
      isAuthenticated: false,
    });
  },

  checkAuth: () => {
    return !!localStorage.getItem("token");
  },

  register: async (userData) => {
    try {
      const res = await axios.post("https://jobgenius.bsite.net/api/auth/register", {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      });
      if (res.data.success) {
        console.log("Registration success:", res.data.message);
        alert(res.data.message);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      console.log("Registration error:", error.response?.data || error.message);
      throw new Error(error?.response?.data?.message || "Registration failed");
    }
  },

  forgetPassword: async (email) => {
    try {
      const res = await axios.post(`https://jobgenius.bsite.net/api/auth/forgot-password?email=${email}`);
      if (res.data.success) {
        alert(res.data.message);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      console.log("Password reset error:", error.response?.data || error.message);
      throw new Error(error?.response?.data?.message || "Password reset failed");
    }
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://jobgenius.bsite.net/api/auth/reset-password',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: '*/*',
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        set({ success: true, error: undefined });
        console.log('Password reset successful');
      } else {
        throw new Error(response.data.message || 'Reset password failed');
      }
    } catch (err: any) {
      console.error('Error resetting password:', err);
      set({ success: false, error: err?.response?.data?.message || 'Failed to reset password. Check your email, reset code, or connection.' });
    }
  },

  changePassword: async (data: ChangePasswordRequest) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://jobgenius.bsite.net/api/auth/change-password',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: '*/*',
          },
        }
      );
    
      if (response.data.success) {
        console.log('Password changed successfully');
        set({ success: true, error: undefined });
      } else {
        throw new Error(response.data.message || 'Change password failed');
      }
    } catch (err: any) {
      console.error('Error changing password:', err);
      set({ success: false, error: err?.response?.data?.message || 'Failed to change password. Check your old password or connection.' });
    }
  },
}));