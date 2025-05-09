import * as Notifications from 'expo-notifications';

 
export async function showNotification(title, body) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null,            
    });
  } catch (err) {
    console.error("Failed to show notification:", err);
  }
}
