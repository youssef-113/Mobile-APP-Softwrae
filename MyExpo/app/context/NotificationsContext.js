
import React, { createContext, useContext, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted!');
      }
    })();
  }, []);

  const showNotification = async (title, body) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: null,
      });
    } catch (err) {
      console.error('Error showing notification:', err);
    }
  };

  return (
    <NotificationsContext.Provider value={{ showNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
}

/**
 * useNotification
 * hook to get the showNotification function
 */
export const useNotification = () => {
  return useContext(NotificationsContext);
};
