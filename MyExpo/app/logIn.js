
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert , Image , Platform ,Dimensions } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import {signInWithEmailAndPassword } from "firebase/auth";
import auth from '../firebase'; 


const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web'


const Login = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/home')
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("DONE SIGN IN! ")
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
    <View style={styles.container} id='login'>
  
          
     <Stack.Screen
       options={{
         headerBackVisible: true,
         headerStyle: { backgroundColor: '#FFFFFF' },
         headerTitleStyle: { color: '#007968', fontWeight: 'bold' },
         headerTitle: () => (
           <View style={{ 
             flexDirection: 'row', 
             alignItems: 'center',
             justifyContent: isWeb ? 'flex-start' : 'center', 
             width: '100%', 
           }}>
             
             <Text style={{ 
               color: '#000', 
               fontWeight: 'bold', 
               marginRight: isWeb ? 20 : 10, 
               fontSize: isWeb ? 18 : 16, 
             }}>
               LogIn
             </Text>
     
            
             <Image
               source={require('../assets/images/final transparent.png')}
               style={{ 
                 width: isWeb ? 900 : width * 0.6, 
                 height: 300,
                 marginLeft: isWeb ? 250 : -35, 
                 resizeMode: 'contain', 
               }}
             />
           </View>
         ),
       }}
     />
        <Text style={styles.title} >Welcom in our pharmacy</Text>  
        <Text style={styles.title}>Login to your account </Text>
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
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },
  button: {
    backgroundColor: '#26A69A',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#555',
    fontSize: 16,
    marginTop: 20,
  },
  link: {
    color: '#00796B',
    fontWeight: 'bold',
  },
});