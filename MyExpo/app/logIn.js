
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert , Image , Platform ,Dimensions } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import {signInWithEmailAndPassword } from "firebase/auth";
import auth from '../firebase'; 


const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web'


const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');



 const validation =async () => {
    let valid = true;
    if (!email.includes('@') && !email.includes('.com')) {   
      alert("Invalid Email , Please enter a valid email");
       setEmailError("Invalid Email , Please enter a valid email");
      valid = false;
    } else {
      setEmailError('');
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long"); 
      setPasswordError('Password must be at least 8 characters long.');
      valid = false;
    }
    else {
      setPasswordError('');
    }
    return valid;
    
  };


   const handleLogin =async () => {
     if (!validation()) return;
 
     signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       console.log("DONE SIGN IN! ")
       const user = userCredential.user;
       setEmailError('');
       setPasswordError('');
       alert("Success", "Login Successful!");
       router.replace('/home')
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
              placeholder="Your Name" 
              placeholderTextColor="#888"
              value={username} 
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="defult"
              />
       <TextInput 
         style={styles.input} 
         placeholder="Email" 
         placeholderTextColor="#888"
         value={email} 
         onChangeText={setEmail}
         autoCapitalize="none"
         keyboardType="email-address"
         onBlur={() => {
                if (!email.includes('@') && !email.includes('.com')) {
                  setEmailError('Invalid email format, please enter a valid email.');
                } else {
                  setEmailError('');
                }
              }}
         />
       {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
    
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#888"
          value={password} 
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          onBlur={() => {
            if (password.length < 8) {
              setPasswordError('Password must be at least 8 characters long.');
            } else {
              setPasswordError('');
            }
          }}
        />
      {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
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
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 10,
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