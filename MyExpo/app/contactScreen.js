import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import TabBar from './component/TabBar';

const ContactScreen = () => {
  const [feedback, setFeedback] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSendFeedback = () => {
    if (feedback.trim() === "") {
      setAlertMessage("⚠️ Please enter your feedback before sending!");
      return;
    }

    setAlertMessage("✅ Thank you! Your feedback has been sent successfully.");
    setFeedback("");

    setTimeout(() => setAlertMessage(""), 3000);
  };

  return (
    <View style={styles.container}>
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
          Linking.openURL(
            "https://github.com/youssef-113/Mobile-APP-Softwrae"
          )
        }
      >
        <Text style={styles.socialLink}>🔹 GitHub</Text>
      </TouchableOpacity>

      <TabBar />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E0F7FA", // تغيير اللون إلى لون فاتح
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00796B", // تغيير اللون إلى الأخضر الداكن
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333", // لون رمادي داكن
    marginBottom: 20,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    color: "#00796B", // تغيير اللون إلى الأخضر الداكن
    marginBottom: 10,
  },
  formLabel: {
    fontSize: 18,
    color: "#00796B", // تغيير اللون إلى الأخضر الداكن
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFFFFF", // تغيير اللون إلى الأبيض
    color: "#333", // لون نص رمادي داكن
    padding: 10,
    borderRadius: 10,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#00796B", // تغيير اللون إلى الأخضر الداكن
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#00796B", // تغيير اللون إلى الأخضر الداكن
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF", // لون النص الأبيض
  },
  socialTitle: {
    fontSize: 18,
    color: "#00796B", // تغيير اللون إلى الأخضر الداكن
    marginTop: 30,
    marginBottom: 10,
  },
  socialLink: {
    fontSize: 16,
    color: "#1E90FF", // تغيير اللون إلى الأزرق
    marginBottom: 5,
  },
  alertLabel: {
    backgroundColor: "#00796B", // تغيير اللون إلى الأخضر الداكن
    color: "#FFF", // لون النص الأبيض
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00796B", // تغيير اللون إلى الأخضر الداكن
    textAlign: "center",
    marginVertical: 10,
    width: "100%",
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    position: 'absolute',
    bottom: 0, // تثبيت التبويبات في الأسفل
    backgroundColor: '#333', // لون التبويبات
    height: 60,
    borderTopWidth: 2,
    borderTopColor: '#555', // تغيير اللون إلى رمادي داكن
    paddingVertical: 5,
    zIndex: 10,
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
});
