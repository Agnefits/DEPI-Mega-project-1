import { create } from 'zustand';
import axios from 'axios';

export interface Experience {
    experienceID?: number;
    title: string;
    company: string;
    type: string;
    dateFrom: string;
    dateTo: string;
    city: string;
    country: string;
    description: string;
  }

interface ExperiencePayload {
    title: string;
    company: string;
    type: string;
    dateFrom: string;
    dateTo: string;
    city: string;
    country: string;
    description: string;
  }
interface ExperienceState {
  experiences: Experience[];
  fetchExperiences: () => Promise<void>;
  getExperienceById: (id: number) => Promise<Experience | undefined>;
  addExperience: (data: ExperiencePayload) => Promise<void>;
  updateExperience: (id: number, data: ExperiencePayload) => Promise<void>;
  deleteExperience: (id: number) => Promise<void>;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  experiences: [],

  fetchExperiences: async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://jobgenius.bsite.net/api/Experience`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ experiences: res.data.$values });
      console.log('Fetched experiences:', res.data.$values);
    } catch (err) {
      console.error('Error fetching experiences:', err);
    }
  },

  getExperienceById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://jobgenius.bsite.net/api/Experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.error('Error fetching experience by ID:', err);
    }
  },

  addExperience: async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://jobgenius.bsite.net/api/Experience', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Experiance Added Successfully");
    } catch (err) {
      console.error('Error adding experience:', err);
    }
  },

  updateExperience: async (id, data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://jobgenius.bsite.net/api/Experience/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Experiance Updated Successfully");
    } catch (err) {
      console.error('Error updating experience:', err);
    }
  },

  deleteExperience: async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://jobgenius.bsite.net/api/Experience/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Experiance Deleted Successfully");
    } catch (err) {
      console.error('Error deleting experience:', err);
    }
  },
}));
