import { create } from 'zustand';
import axios from 'axios';

export interface JobBenefit {
  title: string;
  description: string;
}

export interface JobListing {
  jobID: number;
  userID: number;
  fullname: string;
  email: string;
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
  applicationSent: number;
  applyBefore: string;
  jobPostedOn: string;
  salaryFrom: number;
  salaryTo: number;
  companyWebsite: string | null;
  keywords: string;
  additionalInformation: string | null;
  companyPapers: string | null;
  categories: { $values: string[] };
  skills: { $values: string[] };
  jobBenefits: { $values: JobBenefit[] };
  jobApplications: null;
}

export interface JobApplication {
  applicationID: number;
  userID: number;
  fullname: string;
  email: string;
  phone: string;
  currentJob: string;
  linkedInLink: string;
  portfolioLink: string;
  additionalInformation: string;
  resumeFile: string | null;
  appliedDate: string;
  status: string;
  jobListing: JobListing;
}

export interface JobApplicationResponse {
  success: boolean;
  message: string;
  addedApplication: JobApplication;
}

interface JobApplicationState {
  applications: JobApplication[];
  error?: string;
  success: boolean | null;
  submitJobApplication: (data: {
    jobID: number;
    fullname: string;
    email: string;
    phone: string;
    currentJob: string;
    linkedInLink: string;
    portfolioLink: string;
    additionalInformation: string;
    resumeFile?: File;
  }) => Promise<void>;
  fetchUserApplications: () => Promise<void>;
  getJobApplicationById: (id: number) => Promise<JobApplication | undefined>;
  updateJobApplication: (id: number, status: string) => Promise<void>;
  deleteJobApplication: (id: number) => Promise<void>;
}

export const useJobApplicationStore = create<JobApplicationState>((set) => ({
  applications: [],
  error: undefined,
  success: null,

  submitJobApplication: async ({
    jobID,
    fullname,
    email,
    phone,
    currentJob,
    linkedInLink,
    portfolioLink,
    additionalInformation,
    resumeFile,
  }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('JobID', jobID.toString());
      formData.append('Fullname', fullname);
      formData.append('Email', email);
      formData.append('Phone', phone);
      formData.append('CurrentJob', currentJob);
      formData.append('LinkedInLink', linkedInLink);
      formData.append('PortfolioLink', portfolioLink);
      formData.append('AdditionalInformation', additionalInformation);
      if (resumeFile) {
        formData.append('ResumeFile', resumeFile);
      }

      const response = await axios.post<JobApplicationResponse>(
        'https://jobgenius.bsite.net/api/JobApplication',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
        }
      );

      set((state) => ({
        applications: [...state.applications, response.data.addedApplication],
        error: undefined,
        success: true,
      }));
    } catch (err) {
      console.error('Error submitting job application:', err);
      set({ error: 'Failed to submit job application. Please try again.', success: false });
    }
  },

  fetchUserApplications: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<{ $values: JobApplication[] }>(
        `https://jobgenius.bsite.net/api/JobApplication`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({ applications: response.data.$values, error: undefined, success: true });
    } catch (err) {
      console.error('Error fetching job applications:', err);
      set({ error: 'Failed to fetch job applications. Check your connection or login status.', success: false });
    }
  },

  getJobApplicationById: async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<JobApplication>(
        `https://jobgenius.bsite.net/api/JobApplication/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
        }
      );

      set({ error: undefined, success: true });
      return response.data;
    } catch (err: any) {
      console.error('Error fetching job application:', err);
      set({ error: err?.response?.data?.message || 'Failed to fetch job application.', success: false });
      return undefined;
    }
  },

  updateJobApplication: async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://jobgenius.bsite.net/api/JobApplication/${id}?status=${encodeURIComponent(status)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
        }
      );

      if (response.data.success) {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.applicationID === id ? { ...app, status } : app
          ),
          success: true,
          error: undefined,
        }));
      } else {
        throw new Error(response.data.message || 'Update failed');
      }
    } catch (err: any) {
      console.error('Error updating job application:', err);
      set({ success: false, error: err?.response?.data?.message || 'Failed to update job application.' });
    }
  },

  deleteJobApplication: async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `https://jobgenius.bsite.net/api/JobApplication/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
        }
      );

      if (response.data.success) {
        set((state) => ({
          applications: state.applications.filter((app) => app.applicationID !== id),
          success: true,
          error: undefined,
        }));
      } else {
        throw new Error(response.data.message || 'Delete failed');
      }
    } catch (err: any) {
      console.error('Error deleting job application:', err);
      set({ success: false, error: err?.response?.data?.message || 'Failed to delete job application.' });
    }
  },
}));