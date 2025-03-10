import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const NotFoundScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Page Not Found</Text>
      <Text style={styles.subtitle}>Oops! The page you are looking for does not exist.</Text>
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default NotFoundScreen;
