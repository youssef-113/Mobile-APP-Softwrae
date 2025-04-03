import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const About = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.subtitle}>Our Team</Text>
        <View style={styles.teamContainer}>
          <Text style={styles.teamMember}>🔹 Marwan Ahmed Sayed</Text>
          <Text style={styles.teamMember}>🔹 Amr Ashraf Salah</Text>
          <Text style={styles.teamMember}>🔹 Youssef Bassiony</Text>
          <Text style={styles.teamMember}>🔹 Mohammed Magdy</Text>
          <Text style={styles.teamMember}>🔹 Hassan Mohamed Hassan</Text>
          <Text style={styles.teamMember}>🔹 Youssef Ahmed Refaat</Text>
          <Text style={styles.teamMember}>🔹 Khaled Ahmed</Text>
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

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  teamContainer: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
  },
  teamdis: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
  },
  teamMember: {
    fontSize: 18,
    color: '#DDD',
    marginVertical: 5,
  },
});
