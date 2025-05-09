import { create } from 'zustand';
import axios from 'axios';

export interface ResumeFeedback {
  feedbackID: number;
  resumeID: number;
  feedbackText: string;
  score: number;
  weightsJson: string;
}

export interface UserProfile {
  profileID: number;
  userID: number;
  image: string | null;
  coverImage: string | null;
  jobTitle: string;
  aboutMe: string;
  phone: string;
  gender: string;
  type: string;
  weightsJson: string | null;
  userSkills: { $values: any[] };
  socialLinks: { $values: any[] };
  portfolios: any[] | null;
  notifications: any[] | null;
  userLanguages: { $values: any[] };
  experiences: any[] | null;
  educations: any[] | null;
}

export interface User {
  userID: number;
  fullname: string;
  email: string;
  passwordHash: string;
  provider: string;
  verified: boolean;
  creationDate: string;
  isDeleted: boolean;
  deleteDate: string | null;
  tokens: any[] | null;
  jobListings: any[] | null;
  savedJobs: any[] | null;
  jobApplications: any[] | null;
  resumes: { $values: Resume[] };
  interviewSimulations: any[] | null;
  profile: UserProfile;
  notificationSetting: any | null;
  helpEntries: any[] | null;
}

export interface Resume {
  resumeID: number;
  userID: number;
  file: string;
  fileName: string;
  jobDescription: string;
  date: string;
  user: User;
  resumeFeedbackID: number | null;
  resumeFeedback: ResumeFeedback;
}

interface ResumeState {
  resumes: Resume[];
  selectedResume: Resume | null;
  error?: string;
  addResume: (data: { fileName: string; jobDescription: string; file: File }) => Promise<void>;
  fetchResumes: () => Promise<void>;
  fetchResumeByID: (resumeID: number) => Promise<void>;
  fetchResumeFile: (resumeID: number, filename: string) => Promise<string | undefined>;
  updateResume: (resumeID: number, data: { fileName: string; jobDescription: string }) => Promise<void>;
  deleteResume: (resumeID: number) => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumes: [],
  selectedResume: null,
  error: undefined,

  addResume: async ({ fileName, jobDescription, file }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('FileName', fileName);
      formData.append('JobDescription', jobDescription);
      formData.append('File', file);

      const response = await axios.post<Resume>(
        'https://jobgenius.bsite.net/api/Resume',
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
        resumes: [...state.resumes, response.data],
        error: undefined,
      }));
    } catch (err) {
      console.error('Error adding resume:', err);
      set({ error: 'Failed to add resume. Please try again.' });
    }
  },

  fetchResumes: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<{ $values: Resume[] }>(
        'https://jobgenius.bsite.net/api/Resume',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
        }
      );

      set({ resumes: response.data.$values, error: undefined });
    } catch (err) {
      console.error('Error fetching resumes:', err);
      set({ error: 'Failed to fetch resumes. Check your connection or login status.' });
    }
  },

  fetchResumeByID: async (resumeID: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Resume>(
        `https://jobgenius.bsite.net/api/Resume/${resumeID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
        }
      );
      set({ selectedResume: response.data, error: undefined });
    } catch (err) {
      console.error('Error fetching resume by ID:', err);
      set({ error: 'Failed to fetch resume. Check your connection or login status.' });
    }
  },

  fetchResumeFile: async (resumeID: number, filename: string) => {
    try {
      const token = localStorage.getItem('token');
      console.log(`Fetching file with resumeID: ${resumeID}, filename: ${filename}`); 
      const response = await axios.get(
        `https://jobgenius.bsite.net/api/Resume/${resumeID}/files/${encodeURIComponent(filename)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
          responseType: 'blob',
        }
      );
      if (response.data instanceof Blob && response.data.size > 0) {
        const fileUrl = URL.createObjectURL(response.data);
        return fileUrl;
      } else {
        throw new Error('Invalid file data received.');
      }
    } catch (err) {
      console.error('Error fetching resume file:', err);
      set({ error: 'Failed to fetch resume file. Check the filename or your connection.' });
      return undefined;
    }
  },

  updateResume: async (resumeID: number, data: { fileName: string; jobDescription: string }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put<Resume>(
        `https://jobgenius.bsite.net/api/Resume/${resumeID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: '*/*',
          },
        }
      );

      set((state) => ({
        resumes: state.resumes.map((resume) =>
          resume.resumeID === resumeID ? response.data : resume
        ),
        selectedResume: state.selectedResume?.resumeID === resumeID ? response.data : state.selectedResume,
        error: undefined,
      }));
    } catch (err) {
      console.error('Error updating resume:', err);
      set({ error: 'Failed to update resume. Please try again.' });
    }
  },

  deleteResume: async (resumeID: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://jobgenius.bsite.net/api/Resume/${resumeID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        resumes: state.resumes.filter((resume) => resume.resumeID !== resumeID),
        selectedResume: state.selectedResume?.resumeID === resumeID ? null : state.selectedResume,
        error: undefined,
      }));
    } catch (err) {
      console.error('Error deleting resume:', err);
      set({ error: 'Failed to delete resume. Please try again.' });
    }
  },
}));