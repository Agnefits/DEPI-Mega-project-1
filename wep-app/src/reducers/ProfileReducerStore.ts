import { create } from "zustand";
import axios from "axios";

interface SocialLink {
  linkID: number;
  platform: string;
  link: string;
}

interface SocialLinkResponse {
  success: boolean;
  message: string;
  socialLink: SocialLink;
}

interface Profile {
  image: string | null;
  coverImage: string | null;
  jobTitle: string;
  aboutMe: string;
  phone: string;
  gender: string;
  type: string;
  fullname: string;
  email: string;
  provider: string;
  userSkills: {
    $values: string[];
  };
  socialLinks: {
    $values: SocialLink[];
  };
  userLanguages: {
    $values: string[];
  };
}

interface UpdateProfilePayload {
  // id: number;
  // token?: string;
  jobTitle?: string;
  aboutMe?: string;
  phone?: string;
  gender?: string ;
  type?: string ;
  image?: File | null;
  coverImage?: File | null;
  deleteImage?: boolean;
  deleteCoverImage?: boolean;
}

interface ProfileState {
  profiles: Profile[] | null;
  profile: Profile | null;
  fetchMeProfile: () => Promise<void>;
  fetchProfileById: (id: number) => Promise<void>;
  fetchAllProfiles: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  addLanguage: (languageName: string) => Promise<void>;
  deleteLanguage: (languageName: string) => Promise<void>;
  addSkill: (skillName: string) => Promise<void>;
  deleteSkill: (skillName: string) => Promise<void>;
  addSocialLink: (platform: string, link: string) => Promise<SocialLinkResponse>;
  deleteSocialLink: (linkID: number) => Promise<SocialLinkResponse>;
  updateSocialLink: (linkID: number, platform: string, link: string) => Promise<SocialLinkResponse>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: null,
  profile: null,

  fetchMeProfile: async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://jobgenius.bsite.net/api/Profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ profile: res.data });
      console.log("Fetched profile:", res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  },

  fetchProfileById: async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://jobgenius.bsite.net/api/Profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched profile by ID:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching profile by ID:", error);
      return null;
    }
  },

  fetchAllProfiles: async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://jobgenius.bsite.net/api/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });
      set({ profiles: res.data });
      console.log("Fetched all profiles:", res.data);
    } catch (error: any) {
      console.error("Error fetching all profiles:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch profiles");
    }
  },

  updateProfile: async (data: UpdateProfilePayload) => {
    const {
      jobTitle,
      aboutMe,
      phone,
      gender,
      type,
      image,
      coverImage,
      deleteImage,
      deleteCoverImage,
    } = data;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (image) formData.append("Image", image);
      else formData.append("Image", "");

      if (coverImage) formData.append("CoverImage", coverImage);
      else formData.append("CoverImage", "");

      const query = new URLSearchParams({
        JobTitle: jobTitle,
        AboutMe: aboutMe,
        Phone: phone,
        Gender: gender,
        Type: type,
        DeleteImage: deleteImage?.toString() ?? "false",
        DeleteCoverImage: deleteCoverImage?.toString() ?? "false",
      }).toString();

      const res = await axios.put(
        `https://jobgenius.bsite.net/api/Profile/update?${query}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set({ profile: res.data });
    } catch (error) {
      console.error("Error updating profile with image:", error);
    }
  },

  addLanguage: async (languageName: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.post(
        `https://jobgenius.bsite.net/api/Profile/language?languageName=${languageName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await get().fetchMeProfile();
    } catch (error: any) {
      console.error("Error adding language:", error);
      throw new Error(error.response?.data?.message || "Failed to add language");
    }
  },

  deleteLanguage: async (languageName: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete(
        `https://jobgenius.bsite.net/api/Profile/language?languageName=${languageName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await get().fetchMeProfile();
    } catch (error: any) {
      console.error("Error deleting language:", error);
      throw new Error(error.response?.data?.message || "Failed to delete language");
    }
  },

  addSkill: async (skillName: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.post(
        `https://jobgenius.bsite.net/api/Profile/skill?skillName=${skillName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await get().fetchMeProfile();
    } catch (error: any) {
      console.error("Error adding skill:", error);
      throw new Error(error.response?.data?.message || "Failed to add skill");
    }
  },

  deleteSkill: async (skillName: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete(
        `https://jobgenius.bsite.net/api/Profile/skill?skillName=${skillName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await get().fetchMeProfile();
    } catch (error: any) {
      console.error("Error deleting skill:", error);
      throw new Error(error.response?.data?.message || "Failed to delete skill");
    }
  },

  addSocialLink: async (platform: string, link: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.post(
        `https://jobgenius.bsite.net/api/Profile/sociallink`,
        { platform, link },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      await get().fetchMeProfile();
      return res.data;
    } catch (error: any) {
      console.error("Error adding social link:", error);
      throw new Error(error.response?.data?.message || "Failed to add social link");
    }
  },

  deleteSocialLink: async (linkID: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.delete(
        `https://jobgenius.bsite.net/api/Profile/sociallink?linkID=${linkID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      await get().fetchMeProfile();
      return res.data;
    } catch (error: any) {
      console.error("Error deleting social link:", error);
      throw new Error(error.response?.data?.message || "Failed to delete social link");
    }
  },

  updateSocialLink: async (linkID: number, platform: string, link: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.put(
        `https://jobgenius.bsite.net/api/Profile/sociallink?linkID=${linkID}`,
        { platform, link },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Updated social link:", res.data);
      await get().fetchMeProfile();
      return res.data;
    } catch (error: any) {
      console.error("Error updating social link:", error);
      throw new Error(error.response?.data?.message || "Failed to update social link");
    }
  },
}));