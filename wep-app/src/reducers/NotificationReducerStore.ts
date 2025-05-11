import { create } from 'zustand';
import axios from 'axios';

export interface NotificationSettings {
  applicationsOn: boolean;
  jobsOn: boolean;
  recommendationsOn: boolean;
}

interface NotificationState {
  notifications: any[];
  settings: NotificationSettings | null;
  error?: string;
  fetchNotifications: () => Promise<void>;
  fetchNotificationSettings: () => Promise<void>;
  updateNotificationSettings: (settings: NotificationSettings) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  NotificationSettings: null,
  settings: null,
  error: undefined,

  fetchNotifications: async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://jobgenius.bsite.net/api/Notification', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ notifications: res.data.$values, error: undefined });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      set({ error: 'Failed to fetch notifications. Check your connection or login status.' });
    }
  },

  fetchNotificationSettings: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<NotificationSettings>(
        'https://jobgenius.bsite.net/api/Notification/Settings',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
        }
      );
      set({ settings: response.data, error: undefined });
    } catch (err) {
      console.error('Error fetching notification settings:', err);
      set({ error: 'Failed to fetch notification settings. Check your connection or login status.' });
    }
  },

  updateNotificationSettings: async (settings: NotificationSettings) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put<NotificationSettings>(
        'https://jobgenius.bsite.net/api/Notification/Settings',
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: '*/*',
          },
        }
      );
      console.log('Notification settings updated successfully');
      set({ settings, error: undefined });
    } catch (err) {
      console.error('Error updating notification settings:', err);
      set({ error: 'Failed to update notification settings. Check your connection or login status.' });
    }
  },
}));