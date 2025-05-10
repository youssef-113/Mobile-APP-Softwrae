import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Linking, Platform, Image, Dimensions
} from "react-native";
import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './context/AuthContext';
import TabBar from './component/TabBar';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function ContactScreen() {
  const [rating, setRating] = useState(0);
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
        rating,
        text: feedback,
        userId: user ? user.uid : null,
        createdAt: serverTimestamp(),
      });
      setAlertMessage("✅ Thank you! Your feedback has been sent.");
      setFeedback("");
      setRating(0);
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setAlertMessage("❌ Failed to send feedback");
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

        <Text style={styles.title}>Contact Us 📞</Text>
        <Text style={styles.subtitle}>
          We're here to help! Rate us and leave feedback below.
        </Text>
        <Text style={styles.subtitle}>Phone: 01001725166 </Text>
        <Text style={styles.formLabel }>Rate Us</Text>
        <View style={styles.ratingContainer}>
          {[1,2,3,4,5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={ star <= rating ? "star" : "star-o" }
                size={32}
                color={ star <= rating ? "#6f00ff" : "#ccc" }
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.formLabel}>Your Feedback 💡</Text>
        <TextInput
          style={styles.input}
          placeholder="Write here..."
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
          
          onPress={() => Linking.openURL("yossf.abdla311@gmail.com")}
        >
          <Text style={styles.socialLink}>🔹Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/youssef-113/Mobile-APP-Softwrae")}
        >
          <Text style={styles.socialLink}>🔹GitHub</Text>
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
  title: { fontSize: 28, fontWeight: "bold", color: "#000", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "#333", marginBottom: 20, textAlign: "center" },
  ratingContainer: { flexDirection: 'row', marginBottom: 16 },
  star: { marginHorizontal: 4 },
  formLabel: { fontSize: 18, color: "#000", marginTop: 10, marginBottom: 6 },
  input: {
    width: "90%", minHeight: 100, backgroundColor: "#FFF",
    color: "#333", padding: 10, borderRadius: 10,
    borderWidth: 1, borderColor: "#00796B", marginBottom: 15,
    textAlignVertical: "top",
  },
  alertLabel: {
    backgroundColor: "#00796B", color: "#FFF", fontSize: 16,
    fontWeight: "bold", padding: 10, borderRadius: 10,
    textAlign: "center", marginVertical: 10, width: "90%",
  },
  button: {
    backgroundColor: "#003366", paddingVertical: 15,
    paddingHorizontal: 40, borderRadius: 10, alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#F5F5F5" },
  socialTitle: { fontSize: 18, color: "#00796B", marginTop: 10, marginBottom: 6 },
  socialLink: { fontSize: 16, color: "#1E90FF", marginBottom: 5 },
  forText:{ color: '#191716', fontWeight: 'bold', marginRight: 20, fontSize: 16 },
  forView:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' },
  headerStyle:{ backgroundColor: '#5B9BD5', height: isWeb? 100:120 },
  logo:{ width: isWeb? 400:width*0.6, height: isWeb?400:height*2.5, resizeMode:'contain', alignSelf:'center' },
});
