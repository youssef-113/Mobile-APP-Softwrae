// app/SignUp.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNotification } from './context/NotificationsContext';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [Phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hover, setHover] = useState(false);
  const { showNotification } = useNotification();

  const validation = () => {
    let valid = true;
    if (!email.includes('@') || !email.includes('.com')) {
      setEmailError('Invalid email format');
      valid = false;
    } else setEmailError('');
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    } else setPasswordError('');
    return valid;
  };

  const handleSignup = async () => {
    if (!validation()) return;
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: username,
        email,
        Phone,
      });
      await showNotification('🎉 Signup Complete', 'Your account was created!');
      router.replace('/logIn');
    } catch (e) {
      console.error(e);
      alert(e.code.includes('email-already') ? 'Email already in use.' : 'Signup failed.');
    }
  };

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <Text style={styles.heading}>Create an Account</Text>

        <View style={styles.form}>
          {/* Name */}
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />

          {/* Phone */}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone"
            placeholderTextColor="#888"
            value={Phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity
            style={styles.toggle}
            onPress={() => setShowPassword(p => !p)}
          >
            <Text style={styles.toggleText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>

          {/* Signup Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSignup}
          >
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login link */}
          <Text style={styles.agreement}>
            Already have an account?{' '}
            <Link href="/logIn" style={styles.link}>Login</Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#eef3fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    maxWidth: 350,
    backgroundColor: '#f8f9fd',
    borderRadius: 40,
    paddingVertical: 25,
    paddingHorizontal: 35,
    borderWidth: 5,
    borderColor: '#fff',
    shadowColor: 'rgba(133,189,215,0.88)',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
  },
  heading: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 30,
    color: 'rgb(16,137,211)',
    marginBottom: 20,
  },
  form: {
    marginTop: 10,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    color: '#444',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontSize: 16,
    shadowColor: '#cff0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  toggle: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 10,
  },
  toggleText: {
    color: '#0099ff',
    fontSize: 12,
  },
  loginButton: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: 'rgb(16,137,211)',
    alignItems: 'center',
    shadowColor: 'rgba(133,189,215,0.88)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  agreement: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 12,
    color: '#666',
  },
  link: {
    color: '#0099ff',
    fontWeight: 'bold',
  },
});
