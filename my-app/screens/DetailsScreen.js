import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.subtitle}>Our Team</Text>
      <View style={styles.teamContainer}>
        <Text style={styles.teamMember}>🔹 Marwan Ahmed Sayed</Text>
        <Text style={styles.teamMember}>🔹 Amr Ashraf Salah</Text>
        <Text style={styles.teamMember}>🔹 Youssef Bassiony</Text>
        <Text style={styles.teamMember}>🔹 Mohammed Magdy</Text>
      </View>
      <Text style={styles.subtitle}>Our Project</Text>
      <View style={styles.teamdis}>
        <Text style={styles.teamMember}>
          our opinion in this project is fol fol fol  
        </Text>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", 
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFA500", 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  teamContainer: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
    width: "90%",
  },
  teamdis: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
    width: "90%",
  },
  teamMember: {
    fontSize: 18,
    color: "#DDD",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
});
