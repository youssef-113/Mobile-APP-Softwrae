import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import TabBar from './component/TabBar';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const About = () => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: styles.headerStyle,
            headerTitleAlign: 'center',
            headerBackVisible: true,
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Image
                  source={require('../assets/images/final transparent.png')}
                  style={styles.logo}
                />
                <Text style={styles.headerTitle}>About</Text>
              </View>
            ),
          }}
        />

        <Text style={styles.sectionTitle}>About Us</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            Pharma Tech Pharmacies is a trusted name in the healthcare and personal care sector in Egypt. 
            Since its establishment in 1975 with a single branch, the company has grown into a nationwide network 
            known for professionalism, innovation, and patient-centered care.
          </Text>
          <Text style={styles.text}>
            We are proud to offer a wide range of services including medication home delivery, 
            real-time prescription tracking, and expert consultation by licensed pharmacists. 
            Our commitment to excellence is reflected in every detail of our operations.
          </Text>
          <Text style={styles.text}>
            With over 90 branches across Egypt, our infrastructure includes modern warehouses, 
            a childcare center, and a continuous learning center for our team members to keep them aligned 
            with global pharmaceutical standards.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.card}>
          {[
            'Easy and secure medication ordering',
            'Digital prescription management',
            'Real-time order tracking via the app',
            'Instant notifications for medication availability',
            'Round-the-clock customer service and support',
          ].map((item, idx) => (
            <Text key={idx} style={styles.bullet}>• {item}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            Our mission is to bridge the gap between people and the healthcare they need. 
            We believe that every individual deserves timely access to authentic medication, 
            guidance from qualified professionals, and support throughout their healthcare journey.
          </Text>
          <Text style={styles.text}>
            We strive to create a seamless, digital-first pharmacy experience—making it simple, 
            safe, and efficient to manage your health wherever you are.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Our Vision</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            To become the leading digital pharmacy platform in the Middle East and Africa, 
            empowering individuals with technology-driven health services that are both accessible and reliable.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2023 MyPharmacy App. All rights reserved.</Text>

          <View style={styles.footerLinksContainer}>
            <Text style={styles.footerLink}>About Us</Text>
            <Text style={styles.footerDivider}>|</Text>
            <Text style={styles.footerLink}>Help Center</Text>
            <Text style={styles.footerDivider}>|</Text>
            <Text style={styles.footerLink}>Terms</Text>
            <Text style={styles.footerDivider}>|</Text>
            <Text style={styles.footerLink}>Privacy</Text>
          </View>

          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Follow us:</Text>
            <Text style={styles.socialLink}>Facebook</Text>
            <Text style={styles.socialLink}>Instagram</Text>
            <Text style={styles.socialLink}>Twitter</Text>
          </View>
        </View>
      </ScrollView>

      <TabBar />
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    paddingVertical: 30,
    alignItems: 'center',
    paddingBottom: 100,
  },

  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb ? 100 : 120,
  },

  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 10,
  },

  bullet: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
    paddingLeft: 10,
  },

  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  footerText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 10,
  },

  footerLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  footerLink: {
    fontSize: 14,
    color: '#2980B9',
    marginHorizontal: 5,
  },

  footerDivider: {
    marginHorizontal: 4,
    color: '#BDC3C7',
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  socialText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginRight: 10,
  },

  socialLink: {
    fontSize: 14,
    color: '#2980B9',
    marginHorizontal: 5,
  },
});
