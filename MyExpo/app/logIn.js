import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    // TODO: Implement authentication logic here.
    // For now, we simulate a successful login and navigate to the Home page.
    router.replace('/home');
  };

  return (
    <View style={styles.container} id='login'>
      {/* Set up the header with title and remove back button if needed */}
      <Stack.Screen 
        options={{
          title: 'Login',
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { color: '#000', fontWeight: 'bold' },
          // You can disable the back arrow here if desired, e.g.:
          // headerBackVisible: false,
        }} 
          />
        <Text style={styles.title} >Welcom in our pharmacy</Text>  
        <Text style={styles.title}>Login to your account </Text>
      <TextInput 
        style={styles.input} 
        placeholder="Your Name" 
        placeholderTextColor="#888"
        value={username} 
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="Name"
      /> 
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>
        Don't have an account?{' '}
        <Link href="/SignUp" style={styles.link}>Sign Up</Link>
      </Text>
    </View>
  );
};

export default Login;

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
