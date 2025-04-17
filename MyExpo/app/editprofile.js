import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const [name, setName] = useState('Ahmed Mohamed');
  const [email, setEmail] = useState('ahmed@example.com');
  const [phone, setPhone] = useState('01234567890');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('محتاج إذن للوصول للصور.');
      }
      // جلب URI الصورة المخزنة سابقاً
      const storedUri = await AsyncStorage.getItem('profileImageUri');
      if (storedUri) {
        setImage(storedUri);
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      try {
        await AsyncStorage.setItem('profileImageUri', uri);
      } catch (e) {
        console.error('Error saving image URI', e);
      }
    }
  };

  const handleSave = () => {
    // هنا تقدر تبعت name, email, phone, password, image للسيرفر
    alert('تم حفظ التعديلات!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : require('../assets/images/user.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.changeText}>تغيير الصورة</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="الاسم"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="الإيميل"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="رقم التليفون"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="كلمة السر"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>حفظ التعديلات</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  changeText: {
    color: '#00796B',  // لون أخضر داكن لتغيير الصورة
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    width: '90%',
    backgroundColor: '#003366',  // لون أزرق داكن للخلفية
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
