import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import TabBar from './component/TabBar';

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
          Our opinion in this project is fol fol fol
        </Text>
      </View>

      <TabBar />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // تغيير اللون إلى لون فاتح
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B', // تغيير اللون إلى الأخضر الداكن
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', // تغيير اللون إلى لون رمادي داكن
    marginBottom: 10,
  },
  teamContainer: {
    backgroundColor: '#ffffff', // تغيير اللون إلى الأبيض
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
  },
  teamdis: {
    backgroundColor: '#ffffff', // تغيير اللون إلى الأبيض
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
  },
  teamMember: {
    fontSize: 18,
    color: '#00796B', // تغيير اللون إلى الأخضر الداكن
    marginVertical: 5,
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
