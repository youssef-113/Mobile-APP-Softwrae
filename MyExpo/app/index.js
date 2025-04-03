import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚀 Hello In Our app</Text>
      <Text style={styles.subtitle}>discover our product</Text>

      <Link href='/Product' asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🛒 Products</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/About' asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ℹ️ About APP</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
};


export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFA500',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#F2E2B1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
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
