import { create } from "zustand";
import axios from "axios";

export interface Education {
    educationID?: number;
    university: string;
    degree: string;
    dateFrom: string;
    dateTo: string | null;
    description: string | null;
  }
  
  export interface EducationPayload {
    university: string;
    degree: string;
    dateFrom: string;
    dateTo: string;
    description: string;
  }
  
interface EducationState {
    educations: Education[];
    fetchEducations: () => Promise<void>;
    fetchEducationById: (id: number) => Promise<void>;
    addEducation: (data: EducationPayload) => Promise<void>;
    updateEducation: (id: number, data: EducationPayload) => Promise<void>;
    deleteEducation: (id: number) => Promise<void>;
}

export const useEducationStore = create<EducationState>((set) => ({
    educations: [],
    fetchEducations: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("https://jobgenius.bsite.net/api/Education", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            set({ educations: response.data.$values });
            console.log("Fetched educations:", response.data.$values);
            return response.data.$values;
        } catch (error) {
            console.error("Error fetching educations:", error);
        }
    },
    fetchEducationById: async (id: number) => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`https://jobgenius.bsite.net/api/Education/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          set({ educations: res.data.$values });
          console.log("Fetched education data:", res.data.$values);
          return res.data.$values;
        } catch (error) {
          console.error("Error fetching education data:", error);
        }
      },
      addEducation: async (data) => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.post(`https://jobgenius.bsite.net/api/Education`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          set((state) => ({
            educations: [...state.educations, res.data.education],
          }));
          console.log("Added education:", res.data.message);
        } catch (error) {
          console.error("Error adding education:", error);
        }
      },
    
      updateEducation: async (id, data) => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.put(`https://jobgenius.bsite.net/api/Education/${id}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          set((state) => ({
            educations: state.educations.map((edu) =>
              edu.educationID === id ? { ...edu, ...data } : edu
            ),
          }));
          console.log("Updated education:", res.data.message);

        } catch (error) {
          console.error("Error updating education:", error);
        }
      },
    
      deleteEducation: async (id) => {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`https://jobgenius.bsite.net/api/Education/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          set((state) => ({
            educations: state.educations.filter((edu) => edu.educationID !== id),
          }));
          console.log("Deleted education with ID:", id);
        } catch (error) {
          console.error("Error deleting education:", error);
        }
      },


}))