import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';
import auth from '../firebase'; 

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
          title: 'الرئيسية',
          headerBackVisible: true,
          headerStyle: { backgroundColor: '#ffffff' },
          headerTitleStyle: {
            color: '#00796B',
            fontWeight: 'bold',
          },
        }} 
      />
      <StatusBar style="dark" backgroundColor="#E0F7FA" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.push({ 
              pathname: '/CartScreen', 
              params: { cartItems: JSON.stringify(cartItems) } 
            })} 
            style={styles.cartIcon}
          >
            <FontAwesome name="shopping-cart" size={24} color="#00796B" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>💊 مرحبًا بك في صيدليتنا</Text>
        <Text style={styles.subtitle}>صحتك تهمنا، خدماتنا دايمًا معاك</Text>

        <Link href="/logIn" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>تسجيل الدخول</Text>
          </TouchableOpacity>
        </Link>

        <Link href='/Product' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>عرض المنتجات</Text>
            <FontAwesome name="shopping-cart" size={20} color="#fff" />
          </TouchableOpacity>
        </Link>

        <Link href='/About' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>عن الفريق</Text>
            <FontAwesome name="info-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </Link>

        <Link href='/contactScreen' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>تواصل معنا</Text>
            <FontAwesome name="envelope" size={20} color="#fff" />
          </TouchableOpacity>
        </Link>

        <View style={styles.tabsContainer}>
          <Link href="/home" style={styles.tabButton}>
            <FontAwesome name="home" size={20} color="#fff" />
          </Link>
          <Link href="/Product" style={styles.tabButton}>
            <FontAwesome name="product-hunt" size={20} color="#fff" />
          </Link>
          <Link href="/About" style={styles.tabButton}>
            <FontAwesome name="info-circle" size={20} color="#fff" />
          </Link>
          <Link href="/contactScreen" style={styles.tabButton}>
            <FontAwesome name="envelope" size={20} color="#fff" />
          </Link>
        </View>
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
    paddingBottom: 100,
    backgroundColor: '#E0F7FA',
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
    marginTop: 60,
    marginBottom: 10,
    color: '#00796B',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
  },
  button: {
    width: '90%',
    backgroundColor: '#26A69A',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
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
