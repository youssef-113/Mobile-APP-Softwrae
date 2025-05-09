import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Linking, Platform, Image, Dimensions
} from "react-native";
import { Stack } from "expo-router";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './context/AuthContext';
import TabBar from './component/TabBar';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function ContactScreen() {
  const [feedback, setFeedback] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useAuth();

  const handleSendFeedback = async () => {
    if (feedback.trim() === "") {
      setAlertMessage("⚠️ Please enter your feedback before sending!");
      return;
    }

    try {
      await addDoc(collection(db, 'feedbacks'), {
        text: feedback,
        userId: user ? user.uid : null,
        createdAt: serverTimestamp(),
      });

      setAlertMessage("✅ Thank you! Your feedback has been sent successfully.");
      setFeedback("");
      setTimeout(() => setAlertMessage(""), 3000);

    } catch (err) {
      console.error("Error sending feedback:", err);
      setAlertMessage("❌ Failed to send feedback. Please try again.");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: styles.headerStyle,
            headerBackVisible: true,
            headerTitle: () => (
              <View style={styles.forView}>
                <Text style={styles.forText}>Contact Us</Text>
                <Image
                  source={require('../assets/images/final transparent.png')}
                  style={styles.logo}
                />
              </View>
            ),
          }}
        />

        <Text style={styles.title}>📞 Contact Us</Text>
        <Text style={styles.subtitle}>
          We're here to help you! Reach out to us for any questions or feedback:
        </Text>

        <Text style={styles.info}>📧 Email: yossf.abdla311@gmail.com</Text>
        <Text style={styles.info}>📞 Phone: 01 273 240 591</Text>

        <Text style={styles.formLabel}>💡 Send us your feedback:</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your feedback here..."
          placeholderTextColor="#888"
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />

        {alertMessage !== "" && (
          <Text style={styles.alertLabel}>{alertMessage}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
          <Text style={styles.buttonText}>📨 Send Feedback</Text>
        </TouchableOpacity>

        <Text style={styles.socialTitle}>🌐 Connect with us:</Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://github.com/youssef-113/Mobile-APP-Softwrae")
          }
        >
          <Text style={styles.socialLink}>🔹 GitHub</Text>
        </TouchableOpacity>
      </ScrollView>

      <TabBar />
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingBottom: 100,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000", 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#333", 
    marginBottom: 20,
    textAlign: "center",
  },


  logo: {
    width: isWeb ? 400 : width * 0.6,
    height: isWeb ? 400 : height * 2.5,
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
  info: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
  },
  formLabel: {
    fontSize: 18,
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 100,
    backgroundColor: "#FFFFFF", 
    color: "#333", 
    padding: 10,
    borderRadius: 10,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#00796B",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5F5F5", 
  },
  socialTitle: {
    fontSize: 18,
    color: "#00796B", 
    marginTop: 30,
    marginBottom: 10,
  },
  socialLink: {
    fontSize: 16,
    color: "#1E90FF",
    marginBottom: 5,
  },
  alertLabel: {
    backgroundColor: "#00796B", 
    color: "#FFF", 
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00796B", 
    textAlign: "center",
    marginVertical: 10,
    width: "100%",
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#00796B',
    position: 'absolute',
    bottom: 0,
    height: 60,
    borderTopWidth: 2,
    borderTopColor: '#004D40',
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
});
