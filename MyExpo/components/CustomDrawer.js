import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { profileEventEmitter } from '../app/editprofile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { useRouter, useNavigationState } from 'expo-router';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomDrawer(props) {
  const router = useRouter();
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [username, setUsername] = useState('');
  const theme = useColorScheme();

  const backgroundColor = theme === 'dark' ? '#121212' : '#E3F2FD';
  const headerColor = theme === 'dark' ? '#1E1E1E' : '#BBDEFB';
  const textColor = theme === 'dark' ? '#ffffff' : '#0D47A1';

  const loadUserData = async () => {
    try {
      const uri = await AsyncStorage.getItem('profileImageUri');
      const name = await AsyncStorage.getItem('username');
      if (uri) setProfileImageUri(uri);
      if (name) setUsername(name);
    } catch (e) {
      console.error('Error loading user data', e);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [])
  );

 
  useEffect(() => {
    const handler = () => loadUserData();
    profileEventEmitter.on('profileImageChanged', handler);
    return () => {
      profileEventEmitter.off('profileImageChanged', handler);
    };
  }, []);

  const confirmLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.clear(); 
            router.replace('/logIn'); 
          } catch (e) {
            console.error('Logout failed', e);
            Alert.alert('Error', 'Failed to log out. Please try again.');
          }
        },
      },
    ]);
  };
  

  const DrawerLink = ({ label, icon, to }) => (
    <DrawerItem
      label={label}
      icon={({ color, size }) => icon({ color, size })}
      onPress={() => router.push(to)}
      labelStyle={{ color: textColor }}
    />
  );

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor }}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <TouchableOpacity onPress={() => router.navigate('/editprofile')}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                profileImageUri
                  ? { uri: profileImageUri }
                  : { uri: 'https://via.placeholder.com/100' }
              }
              style={styles.avatar}
            />
          </View>
          <Text style={[styles.username, { color: textColor }]}>
            Welcome  {username || 'Guest'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.body, { backgroundColor }]}>
        <DrawerLink label="Home" icon={props => <Ionicons name="home-outline" {...props} />} to="/home" />
        <DrawerLink label="Products" icon={props => <MaterialCommunityIcons name="pill" {...props} />} to="/Products" />
        <DrawerLink label="New Arrivals" icon={props => <MaterialCommunityIcons name="new-box" {...props} />} to="/NewArrivals" />
        <DrawerLink label="offers"  icon={props => <Ionicons name="megaphone" {...props} />}  to="/offers"/>
        <DrawerLink label="Cart" icon={props => <Ionicons name="cart-outline" {...props} />} to="/Cart" />
        <DrawerLink label="Contact Us" icon={props => <Ionicons name="call-outline" {...props} />} to="/ContactUs" />
        <DrawerLink label="About" icon={props => <FontAwesome5 name="info-circle" {...props} />} to="/About" />
        <DrawerLink label="Login" icon={props => <Ionicons name="log-in-outline" {...props} />} to="/logIn" />
        <DrawerLink label="Sign Up" icon={props => <Ionicons name="person-add-outline" {...props} />} to="/SignUp" />
      
      </View>

      <View style={[styles.footer, { backgroundColor }]}>
        <TouchableOpacity style={styles.logoutBtn} onPress={confirmLogout}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: '#E0FFFF',
    borderRadius: 60,
    padding: 3,
    backgroundColor: '#E0FFFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
