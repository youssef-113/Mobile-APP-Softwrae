import React from 'react';
import { View, Text, StyleSheet , Dimensions , Platform , Image} from 'react-native';
import { Link , Stack} from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import TabBar from './component/TabBar';
//marwan


const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web'
const About = () => {
  return (
    
    <View style={styles.container}>
      
<Stack.Screen
  options={{
    headerBackVisible: true,
    headerStyle: { backgroundColor: '#FFFFFF' },
    headerTitleStyle: { color: '#007968', fontWeight: 'bold' },
    headerTitle: () => (
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: isWeb ? 'flex-start' : 'center', 
        width: '100%', 
      }}>
        
        <Text style={{ 
          color: '#000', 
          fontWeight: 'bold', 
          marginRight: isWeb ? 20 : 10, 
          fontSize: isWeb ? 18 : 16, 
        }}>
          About
        </Text>

       
        <Image
          source={require('../assets/images/final transparent.png')}
          style={{ 
            width: isWeb ? 900 : width * 0.6, 
            height: 300,
            marginLeft: isWeb ? 250 : -35, 
            resizeMode: 'contain', 
          }}
        />
      </View>
    ),
  }}
/>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.subtitle}>Our Team</Text>
      <View style={styles.teamContainer}>
        <Text style={styles.teamMember}>🔹 Marwan Ahmed Sayed</Text>
        <Text style={styles.teamMember}>🔹 Amr Ashraf Salah</Text>
        <Text style={styles.teamMember}>🔹 Youssef Bassiony</Text>
        <Text style={styles.teamMember}>🔹 Mohammed Magdy</Text>
        <Text style={styles.teamMember}>🔹 Hassan Mohamed Hassan</Text>
        <Text style={styles.teamMember}>🔹 Youssef Ashraf Refaat</Text>
        <Text style={styles.teamMember}>🔹 Khaled Ali</Text>
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
    flexGrow: 1,
    paddingVertical: 20,
    paddingBottom: 100,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 10,
  },
  teamContainer: {
    backgroundColor: '#ffffff', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
  },
  teamdis: {
    backgroundColor: '#ffffff', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
  },
  teamMember: {
    fontSize: 18,
    color: '#00796B',
    marginVertical: 5,
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
});
