import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../firebase'; 

const Signup = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("DONE SIGN UP! ")
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Sign Up',
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { color: '#000', fontWeight: 'bold' },
        }} 
      />
          <Text style={styles.title}>Create an Account</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#888"
        value={email} 
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#888"
        value={password} 
        onChangeText={setPassword}
        secureTextEntry 
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>
        Already have an account?{' '}
        <Link href="/logIn" style={styles.link}>Login</Link>
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#FFF',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#FFF',
    fontSize: 16,
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
