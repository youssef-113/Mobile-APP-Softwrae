
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Pressable, StyleSheet, Alert , Image , Platform ,Dimensions } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';


const { height } = Dimensions.get('window');

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
  const [Phone, setPhone] = useState('');
  const [hover, setHover] = useState(false); 
  

 const validation = () => {
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


  const handleLogin = async () => {
    if (!validation()) return;
  
    try {
      // تسجيل الدخول بالإيميل والباسورد
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // جلب بيانات المستخدم من Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
  
        // التحقق من الاسم ورقم الهاتف
        if (userData.name !== username || userData.Phone !== Phone) {
          alert("Name or phone number does not match our records.");
          return;
        }
  
        // ✅ كل شيء تمام
        alert("Login successful!");
        router.replace('/home');
      } else {
        alert("User record not found in database.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found") {
        alert("User not found. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    }
  };
  
  

  return (
    <View style={styles.container} >
  
     <Stack.Screen
       options={{
         headerStyle:styles.headerStyle,
         headerBackVisible: true,
         headerTitle: () => (
           <View style={styles.forView}>
             <Text style ={ styles.forText}>
               LogIn
             </Text>
             <Image
               source={require('../assets/images/final transparent.png')}
               style ={styles.logo}
             />
           </View>
         ),
       }}
     />
        <Text style={styles.title} >Welcome in our pharmacy</Text>  
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
          placeholder="Your Phone" 
          placeholderTextColor="#888"
          value={Phone} 
          onChangeText={setPhone}
          autoCapitalize="none"
          keyboardType="default"
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
         
        <Pressable
          onPress={() => setShowPassword(prev => !prev)}
          style={({ pressed }) => [
            styles.eyeIcon,
            pressed && styles.iconPressed
          ]}
        >
        </Pressable>
       
      
      {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}

      <Pressable
        onPress={handleLogin}
        onHoverIn={() => isWeb && setHover(true)}
        onHoverOut={() => isWeb && setHover(false)}
        style={({ pressed }) => [
          styles.buttonLogin,
          pressed && styles.buttonPressed,
          hover && styles.buttonHover
        ]}
      >
      {({ pressed }) => (
          <Text style={[styles.buttonText, (pressed || hover) && styles.buttonTextHover]}>Login</Text>
        )}
      </Pressable>
      <Text style={styles.linkText}>
        Don't have an account?{' '}
        <Link href="/SignUp" style={styles.link}>Sign Up</Link>
      </Text>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({

  logo: {
    width: isWeb ? 300 : width * 0.6,
    height: isWeb ? 300 : height * 2.5,
    marginLeft: isWeb? 650 : -20,
    resizeMode: 'contain',
    alignSelf: 'center', 
  },
  
  
  forText:{ 
    color: '#191716', 
    fontWeight: 'bold', 
    marginRight: isWeb ? 20 : 40,
    fontSize: isWeb ? 18 : 16, 
  },
  forView:{ 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: isWeb ? 'flex-start' : 'center', 
    width: '100%', 
  },

  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb? 100 : 120,
   
 },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
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
    backgroundColor: '#003366',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#000',
    fontSize: 16,
    marginTop: 20,
  },
  link: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonLogin: {
    margin: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#003366',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonPressed: {
    transform: [{ scale: 0.9 }],
  },
  buttonHover: {
    backgroundColor: '#003366',
  },
  buttonText: {
    color: '#003366',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextHover: {
    color: '#fff',
  },
  linkText: {
    color: '#000',
    fontSize: 16,
    marginTop: 20,
  },

});