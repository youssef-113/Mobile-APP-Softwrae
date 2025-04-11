import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Link, useRouter,Stack } from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';
import auth from '../firebase'; 
import TabBar from './component/TabBar';

const home = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  return (
    <>
<Stack.Screen options={{ 
  title: 'Home',         
  headerBackVisible: true,  
  headerStyle: { 
    backgroundColor: '#fff',  
  },
  headerTitleStyle: {
    color: '#000',           
    fontWeight: 'bold',
        },

}} />
      <StatusBar style="dark" backgroundColor="#121212" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.push({ 
              pathname: '/CartScreen', 
              params: { cartItems: JSON.stringify(cartItems) } 
            })} 
            style={styles.cartIcon}
          >
            <FontAwesome name="shopping-cart" size={24} color="#FFA500" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

          <Text style={styles.title}>Welcome to Our Pharmacy</Text>
        <Text style={styles.subtitle}>Your health, our priority.</Text>
         
      <Link href="/logIn" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Link>

        <Link href='/Product' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Products</Text>
            <FontAwesome name="shopping-cart" size={20} color="#000" />
          </TouchableOpacity>
        </Link>


        <Link href='/About' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>About Team</Text>
            <FontAwesome name="info-circle"  size={20} color="#000" />
          </TouchableOpacity>
        </Link>

        <Link href='/contactScreen' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contact Us</Text>
            <FontAwesome name="envelope" size={20} color="#000" />
          </TouchableOpacity>
        </Link>

        <TabBar />
      </ScrollView>
    </>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 100, // fixes white space below
    backgroundColor: '#121212',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    height: 60,
    borderTopWidth: 2,
    borderTopColor: '#555',
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
});
