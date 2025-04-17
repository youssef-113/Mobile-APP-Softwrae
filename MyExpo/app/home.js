import React, { useState } from 'react';
import { View, Text, Image,TouchableOpacity, ScrollView, StyleSheet , Dimensions , Platform } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';
import auth from '../firebase'; 
import TabBar from './component/TabBar';



const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const isWeb = Platform.OS === 'web'

const home = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  return (
    <>
      
<Stack.Screen
  options={{
    headerStyle:styles.headerStyle,
    headerBackVisible: true,
    headerTitle: () => (
      <View style={styles.forView}>
        <Text style ={ styles.forText}>
          Home
        </Text>
        <Image
          source={require('../assets/images/final transparent.png')}
          style ={styles.logo}
        />
      </View>
    ),
  }}
/>
    

      <StatusBar style="dark" backgroundColor="#000" />

      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title1}>Welcome to Pharma Tech </Text>
      <Image
          source={require('../assets/images/free shipping.png')}
          style ={styles.board}
        />
          <Link href='/Products' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shopping</Text>
            <FontAwesome name="shopping-cart" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        
        </Link>
        <Link href='/offers' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Offers</Text>
            <FontAwesome name="shopping-cart" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        
        </Link>
        <Link href='/BestSellers' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Best Seller</Text>
            <FontAwesome name="shopping-cart" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        
        </Link>
         <Image
          source={require('../assets/images/Check new.png')}
          style ={styles.board}
        />

        <Link href='/NewArrivals' asChild> 
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText}>New arrivals</Text> 
            <FontAwesome name="shopping-cart" size={20} color="#f5f5f5" /> 
          </TouchableOpacity> 
        </Link>

        <View style={styles.separator} />

        <View style={styles.header}>

          <TouchableOpacity 
            onPress={() => router.push({ 
              pathname: '/Cart', 
              params: { cartItems: JSON.stringify(cartItems) } 
            })} 
            style={styles.cartIcon}
          >
            
            <FontAwesome name="shopping-cart" size={24} color="#003366" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Your health matters to us, our services are always with you</Text>

        <Link href='About' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>About Us </Text>
            <FontAwesome name="info-circle" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        </Link>

        

      <TabBar />
      </ScrollView>
    </>
  );
};

export default home;

const styles = StyleSheet.create({
  separator: {
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 12, 
  width: '90%', 
  alignSelf: 'center',
},

  headerStyle: {
     backgroundColor: '#5B9BD5',
     height: isWeb? 100 : 120,
    
  },
  board: {
    width: isWeb ? Math.min(1000, width * 0.9) : width * 1.5,
    height: 300, 
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    alignSelf: 'center', 
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
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 100,
    backgroundColor: '#F5F5F5',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },
  cartIcon: {
    position: 'relative',
    padding: 10,
    color:'#F5F5F5'
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: '#191716',
    marginTop:50,

  },
 
  subtitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 25,
    marginRight:50,
    marginLeft:50,
  },
  button: {
    width: '90%',
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
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