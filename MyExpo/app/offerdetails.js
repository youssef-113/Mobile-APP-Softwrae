import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, TouchableOpacity, ToastAndroid } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import TabBar from './component/TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function OfferDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();

  
  const handleAddToCart = async () => {
    try {
      const item = {
        name: params.name,
        discount: params.discount,
        image: params.image,
        oldPrice: 155,
        price: 100,
        quantity: 1,
      };
     
      const existingCart = await AsyncStorage.getItem('cartItems');
      let cartArr = existingCart ? JSON.parse(existingCart) : [];
     
      const foundIdx = cartArr.findIndex(p => p.name === item.name);
      if (foundIdx !== -1) {
        cartArr[foundIdx].quantity += 1;
      } else {
        cartArr.push(item);
      }
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartArr));
      if (Platform.OS === 'android') {
        ToastAndroid.show('تمت إضافة المنتج إلى السلة 🛒', ToastAndroid.SHORT);
      } else {
        alert('تمت إضافة المنتج إلى السلة 🛒');
      }
      
    } catch (e) {
      alert('حدث خطأ أثناء إضافة المنتج للسلة');
    }
  };

  return (
    <View style={{flex:1, backgroundColor:'#f5f5f5'}}>
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style={styles.forText}>{params.name || 'Offer Details'}</Text>
              <Image source={require('../assets/images/final transparent.png')} style={styles.logo} />
            </View>
          ),
        }}
      />

      <View style={styles.cardWrapper}>
        <View style={{position:'relative', alignItems:'center', justifyContent:'center'}}>
          <Image source={typeof params.image === 'string' ? { uri: params.image } : params.image} style={styles.image} />
          <View style={styles.discountBadgeOverlay}>
            <Text style={styles.discountText}>{params.discount}</Text>
          </View>
        </View>
       
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop: 10}}>
          <Text style={styles.oldPrice}>155 جنيه</Text>
          <Text style={styles.currentPrice}>  100 جنيه</Text>
        </View>
       
        <View style={{alignItems:'center', marginVertical: 10}}>
          <Image source={typeof params.image === 'string' ? { uri: params.image } : params.image} style={styles.innerSmallImage} />
        </View>
        <TouchableOpacity style={styles.addToCartWideButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartWideText}>Add to Cart 🛒</Text>
        </TouchableOpacity> 
        <Text style={styles.name}>{params.name}</Text>
      </View>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginTop: 40,
    marginHorizontal: isWeb ? '30%' : 24,
    alignItems: 'center',
    padding: 24,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
    textAlign: 'center',
  },
  discountBadge: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  discountBadgeOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignSelf: 'center',
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  addToCartWideButton: {
    marginTop: 36,
    width: '95%',
    backgroundColor: '#00796B',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartWideText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  oldPrice: {
    color: '#888',
    textDecorationLine: 'line-through',
    fontSize: 17,
    marginRight: 9,
    fontWeight: '500',
  },
  currentPrice: {
    color: '#e53935',
    fontSize: 21,
    fontWeight: 'bold',
  },
  innerSmallImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 0,
  },
  forView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  forText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#003366',
    marginRight: 8,
    flex: 1,
    flexShrink: 1,
  },
  logo: {
    width: 65,
    height: 65,
    marginLeft: 20,
    borderRadius: 16,
  },
  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb ? 200 : 120,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  headerWelcomeSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  headerLogoSmall: {
    width: 54,
    height: 54,
    borderRadius: 12,
    marginBottom: 6,
  },
  title1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 3,
  },
  brandAccent: {
    fontSize: 28,
    color: '#00796B',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 7,
    textAlign: 'center',
  },
});
