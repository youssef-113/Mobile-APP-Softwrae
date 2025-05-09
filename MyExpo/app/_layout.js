import React from 'react';
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../components/CustomDrawer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { useRouter } from 'expo-router';

function ProtectedDrawer() {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) {
      router.replace('/logIn');
    }
  }, [user]);

  if (user === undefined) {
    return null;
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        swipeEnabled: false,      
        headerShown: true,        
      }}
    />
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <ProtectedDrawer />
      </NotificationsProvider>
    </AuthProvider>
  );
}
