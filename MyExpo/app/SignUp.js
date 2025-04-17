import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert , Dimensions , Platform ,Image } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../firebase'; 
import { doc, setDoc } from "firebase/firestore"; 

const { height } = Dimensions.get('window');

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web'


const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [Phone, setPhone] = useState('');

    const validation = () => {
    let valid = true;
      if (!email.includes('@') && !email.includes('.com')) {     
       setEmailError("Invalid Email , Please enter a valid email");
       valid = false;
    
    } else {
      setEmailError('');
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      valid = false;
    }
    else {
      setPasswordError('');
    }
    return valid;
    
  };


 const handleSignup = () => {
   if (!validation()) return;
   
      router.replace('/logIn')
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("DONE SIGN UP! ")
    const user = userCredential.user;
    AddUserToDatabase();
    setEmailError('');
    setPasswordError('');
    alert('Account created successfully')
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });

  };
  const AddUserToDatabase = async() => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: username,
      email: email,
      Phone: Phone
    });
 
   };

  return (
    <View style={styles.container}>
      
<Stack.Screen
       options={{
         headerStyle:styles.headerStyle,
         headerBackVisible: true,
         headerTitle: () => (
           <View style={styles.forView}>
             <Text style ={ styles.forText}>
               SignUp
             </Text>
             <Image
               source={require('../assets/images/final transparent.png')}
               style ={styles.logo}
             />
           </View>
         ),
       }}
     />
          <Text style={styles.title}>Create an Account</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Your Name" 
              placeholderTextColor="#888"
              value={username} 
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="default"
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
                if (!email.includes('@')&& !email.includes('.com')) {
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
        secureTextEntry 
        onBlur={() => {
                 if (password.length < 8) {
                   setPasswordError('Password must be at least 8 characters long.');
                 } else {
                   setPasswordError('');
                 }
               }}
      />
      {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>
        Already have an account?{' '}
        <Link href="logIn" style={styles.link}>Login</Link>
        <Link href='ContactUs' asChild></Link>
      </Text>
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  logo: {
    width: isWeb ? 300 : width * 0.6,
    height: isWeb ? 300 : height * 2.5,
    marginLeft: isWeb? 650   : -20,
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
    backgroundColor: '#003366',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#555',
    fontSize: 16,
    marginTop: 20,
  },
  link: {
    color: '#000',
    fontWeight: 'bold',
  },
});
