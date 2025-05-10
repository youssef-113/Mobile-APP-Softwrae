import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

export default function EditProfileScreen() {
  const [name, setName] = useState('Ahmed Mohamed');
  const [email, setEmail] = useState('ahmed@example.com');
  const [Phone, setPhone] = useState('01234567890');
  const [image, setImage] = useState(null);
  const [viewMode, setViewMode] = useState(true);

  // Animated scale for avatar “hover” effect
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('We need camera roll permissions to make this work!');
      }
      const uri = await AsyncStorage.getItem('profileImageUri');
      if (uri) setImage(uri);
    })();
  }, []);

  const pickImage = async () => {
    Alert.alert(
      'Select Image',
      'Choose source',
      [
        {
          text: 'Camera',
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              const uri = result.assets[0].uri;
              setImage(uri);
              await AsyncStorage.setItem('profileImageUri', uri);
            }
          }
        },
        {
          text: 'Gallery',
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              const uri = result.assets[0].uri;
              setImage(uri);
              await AsyncStorage.setItem('profileImageUri', uri);
            }
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ],
      { cancelable: true }
    );
  };

  const GetUser = async () => {
    const ref = doc(db, "users", auth.currentUser.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      setName(data.name);
      setEmail(data.email);
      setPhone(data.Phone);
    }
  };

  const updateUserData = async () => {
    const ref = doc(db, "users", auth.currentUser.uid);
    await updateDoc(ref, { name, email, Phone });
  };

  const handleSave = () => {
    setViewMode(true);
    updateUserData();
  };
  const handleEdit = () => {
    setViewMode(false);
  };
  if (viewMode) GetUser();

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>
        {/* Avatar */}
        <TouchableOpacity
          onPress={pickImage}
          onPressIn={() => Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }).start()}
          onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start()}
        >
          <Animated.Image
            source={image ? { uri: image } : require('../assets/images/user.png')}
            style={[styles.img, { transform: [{ scale: scaleAnim }] }]}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Edit Profile</Text>

        {viewMode ? (
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.info}>{name}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{email}</Text>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.info}>{Phone}</Text>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoBlock}>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
            <TextInput style={styles.input} value={Phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: 400,
    minHeight: 400,
    backgroundColor: '#07182E',
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
    overflow: 'hidden',
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 39.5,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    backgroundColor: '#152f50',
    marginTop: 25,
    marginBottom: 15,
  },
  heading: {
    color: '#f0f0f0',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  infoBlock: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  label: {
    color: '#f0f0f0',
    fontWeight: '600',
    marginTop: 8,
  },
  info: {
    color: '#f0f0f0',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#1b324d',
    color: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#07182E',
    fontWeight: 'bold',
  },
});
