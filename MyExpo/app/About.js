import React from 'react';
import { View, Text, StyleSheet , Dimensions , Platform , Image,ScrollView} from 'react-native';
import { Link , Stack} from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import TabBar from './component/TabBar';


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web'
const About = () => {
  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      
      <Stack.Screen
        options={{
          headerStyle:styles.headerStyle,
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style ={ styles.forText}>
                About
              </Text>
              <Image
                source={require('../assets/images/final transparent.png')}
                style ={styles.logo}
              />
            </View>
          ),
        }}
      />
      
      <Text style={styles.subtitle}>About Us</Text>
      <View style={styles.teamContainer}>
        <Text style={styles.teamMember}>Pharma Tech Pharmacies leads the healthcare and personal care sector in Egypt,
           and its history represents a remarkable success story.
            The group began in 1975 with a single pharmacy and has since evolved into one of the most prominent healthcare 
            institutions in Egypt. With over 40 years of experience, Pharma Tech Pharmacies is constantly striving to expand 
            and consolidate its leadership in the pharmaceutical sector, both locally and regionally.
            </Text>

            <Text style={styles.teamMember}>
              By introducing entirely new business models and offering an unprecedented array of services, 
      such as home medication delivery, patient counseling and support, and contributing to raising health awareness, 
      Pharma Tech Pharmacies has been able to raise the standard of healthcare in Egypt and progress day by day since its inception
       in the Egyptian pharmaceutical market.
       ***********************
            </Text>    

            <Text style={styles.teamMember}>
            Believing that success always starts from within, the group has established a state-of-the-art skills development center
             to support the talents of its employees. The center employs a group of experts who train employees and pharmacists to ensure
              optimal performance and operational excellence, while maintaining international standards. By recruiting the best talent and
               continuously developing their skills, the Pharma Tech team stands out as a trusted source of advice and support in the field of
                pharmaceutical services.
            </Text>  

            <Text style={styles.teamMember}>
            Today, Pharma Tech Pharmacies leads the Egyptian pharmaceutical market by providing the finest healthcare products through the group's 90
             branches spread across the country, in addition to its warehouses and childcare center.
            </Text>    

      </View>

      <Text style={styles.subtitle}>Key Features</Text>
      <View style={[styles.teamContainer]}>
        <Text style={[styles.teamMember]}>• Easy medication ordering</Text>
        <Text style={[styles.teamMember]}>• Prescription management</Text>
        <Text style={[styles.teamMember]}>• Real-time order tracking</Text>
        <Text style={[styles.teamMember]}>• Medication availability alerts</Text>
        <Text style={[styles.teamMember]}>• 24/7 customer support</Text>
      </View>
      
      <Text style={styles.subtitle}>Our Mission</Text>
      <View style={styles.teamdis}>
        <Text style={styles.teamMember}>
        We're committed to making healthcare accessible by providing a reliable platform
          for all your pharmaceutical needs. Our team of licensed pharmacists ensures
          that you receive genuine medications with professional guidance.
        </Text>
      </View>
        
      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2023 MyPharmacy App. All rights reserved.</Text>
      </View>

    </ScrollView>
    
    <TabBar />
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  
  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb? 100 : 120,
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 100,
    backgroundColor: '#F5F5F5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B', 
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 40,
    width: '90%',
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

  teamContainer: {
    backgroundColor: '#003366', 
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
    alignItems: 'flex-start',
  },
  
  
  teamdis: {
    backgroundColor: '#003366', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
  },
  
  teamMember: {
    fontSize: 18,
    color: '#f5f5f5',
    marginVertical: 5,
    marginLeft: 10,
    textAlign: 'left', // محاذاة النص لليسار
  },
  
  featureItem: {
    alignSelf: 'flex-start', // تأكد من محاذاة العناصر لليسار
    width: '100%', // تأخذ العرض الكامل
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
  
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 15,
  },
  
  copyright: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});