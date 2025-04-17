import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem, useDrawerStatus } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function CustomDrawer(props) {
  const router = useRouter();
  const drawerStatus = useDrawerStatus(); // الحالة الحالية للـ Drawer
  const [profileImageUri, setProfileImageUri] = useState(null);

  const loadImage = async () => {
    try {
      const uri = await AsyncStorage.getItem('profileImageUri');
      if (uri) setProfileImageUri(uri);
    } catch (e) {
      console.error('Error loading image URI', e);
    }
  };

  useEffect(() => {
    // أول مرة وأي مرة يتفتح فيها الـ drawer
    if (drawerStatus === 'open') {
      loadImage();
    }
  }, [drawerStatus]);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/editprofile')}>
          <Image
            source={
              profileImageUri
                ? { uri: profileImageUri }
                : { uri: 'https://via.placeholder.com/100' }
            }
            style={styles.avatar}
          />
          <Text style={styles.username}>Hello, Dear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <DrawerItem label="Home" onPress={() => router.push('/home')} />
        <DrawerItem label="Products" onPress={() => router.push('/Products')} />
        <DrawerItem label="Cart" onPress={() => router.push('/Cart')} />
        <DrawerItem label="Contact Us" onPress={() => router.push('/ContactUs')} />
        <DrawerItem label="About" onPress={() => router.push('/About')} />
        <DrawerItem label="LogIn" onPress={() => router.push('/logIn')} />
        <DrawerItem label="SignUp" onPress={() => router.push('/SignUp')} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => alert('Logged out successfully')}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#eee',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    flex: 1,
    paddingTop: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  logout: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
