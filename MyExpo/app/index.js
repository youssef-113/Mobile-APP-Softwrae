import { Redirect } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function Index() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);
  return <Redirect href="/SignUp" />;
}
