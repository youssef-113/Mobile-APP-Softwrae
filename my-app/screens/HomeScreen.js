import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚀 Hello In Our Simple APP</Text>
      <Text style={styles.subtitle}>Discover Our Product</Text>

     
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Products")}>
        <Text style={styles.buttonText}>🛒 Products</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Details")}>
        <Text style={styles.buttonText}>ℹ️ About APP</Text>
      </TouchableOpacity>+

     
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#121212", 
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFA500", 
  },
  subtitle: {
    fontSize: 16,
    color: "#FFA500",
    marginBottom: 20,
  },
  button: {
    width: "90%",
    backgroundColor: "#FFA500", 
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#F2E2B1",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#000", 
    fontSize: 18,
    fontWeight: "bold",
  },
  itemsContainer: {
    width: "90%",
    marginTop: 20,
  },
  box: {
    backgroundColor: "#333", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", 
  },
});
