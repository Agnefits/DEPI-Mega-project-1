import { create } from "zustand";
import axios from "axios";

interface JobBenefit {
  title: string;
  description: string;
}

interface Category {
  name?: string; // Adjust if API provides more details
}

interface Skill {
  name?: string; // Adjust if API provides more details
}

interface JobApplication {
  id?: number; // Adjust if API provides more details
}

export interface JobListing {
  jobID: number;
  title: string;
  company: string;
  city: string;
  country: string;
  type: string;
  description: string;
  responsibilities: string;
  whoYouAre: string;
  niceToHaves: string;
  capacity: number;
  applyBefore: string;
  salaryFrom: number;
  salaryTo: number;
  companyWebsite: string | null;
  keywords: string;
  additionalInformation: string | null;
  companyPapers: string | null;
  categories: { $values: Category[] };
  skills: { $values: Skill[] };
  jobBenefits: { $values: JobBenefit[] };
  email: string;
  fullname: string;
  userID: number;
  jobApplications: { $values: JobApplication[] };
  applicationSent: number;
}

interface CategoryJobCount {
  categoryName: string;
  jobCount: number;
}

export interface JobListingState {
  jobs: JobListing[];
  userJobs: JobListing[];
  categoriesWithCount: CategoryJobCount[];
  savedJobs: JobListing[];
  success: boolean | null;
  error?: string;
  fetchJobs: () => Promise<void>;
  getJobById: (jobId: number) => Promise<JobListing>;
  createJob: (jobData: JobListing) => Promise<void>;
  updateJob: (jobId: number, jobData: JobListing) => Promise<void>;
  deleteJob: (jobId: number) => Promise<void>;
  searchJobs: (keyword: string | null, country: string | null, city: string | null) => Promise<void>;
  fetchCategoriesWithCount: () => Promise<void>;
  fetchSavedJobs: () => Promise<void>;
  saveJobByID: (jobId: number) => Promise<void>;
  deleteSavedJob: (jobId: number) => Promise<void>;
  fetchUserJobs: () => Promise<void>;
  filterJobs: (filters: {
    keyword?: string;
    country?: string;
    city?: string;
    type?: string;
    salaryFrom?: number;
    salaryTo?: number;
  }) => Promise<void>;
}

export const useJobStore = create<JobListingState>((set, get) => ({
  jobs: [],
  userJobs: [],
  categoriesWithCount: [],
  savedJobs: [],
  success: null,
  error: undefined,

  fetchJobs: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://jobgenius.bsite.net/api/JobListing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ jobs: res.data, success: true, error: undefined });
      console.log("Fetched jobs:", res.data.$values);
      return res.data.$values;
    } catch (error: any) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to fetch jobs." });
    }
  },

  getJobById: async (jobId: number) => {
    if (!Number.isInteger(jobId) || jobId <= 0) {
      throw new Error("Invalid job ID");
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(`https://jobgenius.bsite.net/api/JobListing/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ success: true, error: undefined });
      console.log("Fetched job by ID:", res.data);
      return res.data;
    } catch (error: any) {
      console.error("Error fetching job by ID:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to fetch job by ID." });
      throw error;
    }
  },

  createJob: async (jobData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://jobgenius.bsite.net/api/JobListing", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        jobs: [...state.jobs, res.data],
        success: true,
        error: undefined,
      }));
      console.log("Created job:", res.data);
    } catch (error: any) {
      console.error("Error creating job:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to create job." });
    }
  },

  updateJob: async (jobId: number, jobData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`https://jobgenius.bsite.net/api/JobListing/${jobId}`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        jobs: state.jobs.map((job) => (job.jobID === jobId ? res.data : job)),
        success: true,
        error: undefined,
      }));
      console.log("Updated job:", res.data);
    } catch (error: any) {
      console.error("Error updating job:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to update job." });
    }
  },

  deleteJob: async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`https://jobgenius.bsite.net/api/JobListing/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        jobs: state.jobs.filter((job) => job.jobID !== jobId),
        success: true,
        error: undefined,
      }));
      console.log("Deleted job:", res.data);
    } catch (error: any) {
      console.error("Error deleting job:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to delete job." });
    }
  },

 searchJobs: async (keyword?: string, country?: string, city?: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (country) params.append("country", country);
    if (city) params.append("city", city);

    const response = await axios.get(
      `https://jobgenius.bsite.net/api/JobListing/search?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    set({ jobs: response.data, success: true, error: undefined });
    console.log("Search results:", response.data);
  } catch (error: any) {
    console.error("Error searching jobs:", error.response?.data || error.message);
    set({ success: false, error: error.response?.data?.message || "Failed to search jobs." });
  }
}
,

  fetchCategoriesWithCount: async () => {
    try {
      const res = await axios.get("https://jobgenius.bsite.net/api/JobListing/categories-job-count");
      set({ categoriesWithCount: res.data.$values, success: true, error: undefined });
    } catch (error: any) {
      console.error("Error fetching category job counts:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to fetch categories." });
    }
  },

  fetchSavedJobs: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get("https://jobgenius.bsite.net/api/JobListing/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ savedJobs: response.data.$values || response.data, success: true, error: undefined });
      console.log("Fetched saved jobs:", response.data);
    } catch (error: any) {
      console.error("Error fetching saved jobs:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to fetch saved jobs." });
    }
  },

  saveJobByID: async (jobId) => {
    if (!Number.isInteger(jobId) || jobId <= 0) {
      throw new Error("Invalid job ID");
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.post(
        `https://jobgenius.bsite.net/api/JobListing/saved?jobId=${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to save job");
      }

      const job = await get().getJobById(jobId);
      set((state) => ({
        savedJobs: [...state.savedJobs.filter((j) => j.jobID !== jobId), job],
        success: true,
        error: undefined,
      }));
      console.log("Saved job:", job, "API response:", res.data);
    } catch (error: any) {
      console.error("Error saving job:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to save job." });
      throw error;
    }
  },

  deleteSavedJob: async (jobId) => {
    if (!Number.isInteger(jobId) || jobId <= 0) {
      throw new Error("Invalid job ID");
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`https://jobgenius.bsite.net/api/JobListing/saved?jobId=${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        savedJobs: state.savedJobs.filter((job) => job.jobID !== jobId),
        success: true,
        error: undefined,
      }));
      console.log("Deleted saved job:", jobId);
    } catch (error: any) {
      console.error("Error deleting saved job:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to delete saved job." });
      throw error;
    }
  },

  fetchUserJobs: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get("https://jobgenius.bsite.net/api/JobListing/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ userJobs: response.data, success: true, error: undefined });
      console.log("Fetched user jobs:", response.data);
    } catch (error: any) {
      console.error("Error fetching user jobs:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to fetch user jobs." });
    }
  },

  filterJobs: async (filters) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const queryParams = new URLSearchParams();
      if (filters.keyword) queryParams.append("keyword", filters.keyword);
      if (filters.country) queryParams.append("country", filters.country);
      if (filters.city) queryParams.append("city", filters.city);
      if (filters.type) queryParams.append("type", filters.type);
      if (filters.salaryFrom) queryParams.append("salaryFrom", filters.salaryFrom.toString());
      if (filters.salaryTo) queryParams.append("salaryTo", filters.salaryTo.toString());

      const response = await axios.get(
        `https://jobgenius.bsite.net/api/JobListing/Filter?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ jobs: response.data, success: true, error: undefined });
      console.log("Filtered jobs:", response.data);
    } catch (error: any) {
      console.error("Error filtering jobs:", error.response?.data || error.message);
      set({ success: false, error: error.response?.data?.message || "Failed to filter jobs." });
    }
  },
}));