import React from 'react';
import { View, Text, StyleSheet , Dimensions , Platform , Image,ScrollView} from 'react-native';
import { Link , Stack} from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import TabBar from './component/TabBar';
//marwan

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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 10,
  },
  logo: {
    width: isWeb ? 300 : width * 0.6,
    height: isWeb ? 300 : height * 2.5,
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
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
    width: '90%',
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
