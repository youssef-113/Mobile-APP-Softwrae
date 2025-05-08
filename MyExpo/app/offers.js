import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Platform, Dimensions } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useRouter } from 'expo-router';
import { Link, Stack } from 'expo-router'; 
import TabBar from './component/TabBar';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const { height } = Dimensions.get('window');

const offersData = [
  {
    name: 'Vitamin C 1000mg',
    image: require('../assets/images/1.jpg'),
    discount: 'Sale 30%'
  },
  {
    name: 'Zinc Plus Capsules',
    image: require('../assets/images/2.jpg'),
    discount: 'Sale 25%'
  },
  {
    name: 'Medical Sunscreen',
    image: require('../assets/images/3.jpg'),
    discount: 'Sale 15%'
  },
  {
    name: 'Anti-Dandruff Shampoo',
    image: require('../assets/images/4.jpg'),
    discount: 'Sale 20%'
  },
  {
    name: 'Anti-Dandruff Shampoo',
    image: require('../assets/images/4.jpg'),
    discount: 'Sale 20%'
  },
  {
    name: 'Anti-Dandruff Shampoo',
    image: require('../assets/images/4.jpg'),
    discount: 'Sale 20%'
  },
  {
    name: 'Anti-Dandruff Shampoo',
    image: require('../assets/images/4.jpg'),
    discount: 'Sale 20%'
  },
  {
    name: 'Anti-Dandruff Shampoo',
    image: require('../assets/images/4.jpg'),
    discount: 'Sale 20%'
  },
];

export default function offers() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style={styles.forText}>Offers</Text>
              <Image
                source={require('../assets/images/final transparent.png')}
                style={styles.logo}
              />
            </View>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {offersData.map((offer, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.gridCard}
            activeOpacity={0.85}
            onPress={() => router.push({ pathname: '/Products', params: { productName: offer.name } })}
          >
            <Image source={offer.image} style={styles.gridImage} resizeMode="cover" />
            <Text style={styles.gridName}>{offer.name}</Text>
            <Text style={styles.gridDiscount}>{offer.discount}</Text>
            <View style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
              <FontAwesome name="info-circle" size={16} color="#fff" style={{marginLeft: 4}} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TabBar />
    </>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
    paddingBottom: 80,
    backgroundColor: '#f5f5f5',
  },
  gridCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  gridImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  gridName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#003366',
    marginBottom: 4,
    textAlign: 'center',
  },
  gridDiscount: {
    color: '#b71c1c',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 6,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
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

  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb? 100 : 120,
   
 },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#00796B',
    borderBottomWidth: 1,
    borderBottomColor: '#004D40',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00796B',
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoryButton: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#f5f5f5',
    fontWeight: 'bold',
  },
  productContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
  },
  productInfo: {
    flex: 1,
    color:'#000',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
  },
  productDescription: {
    fontSize: 12,
    color: '#000',
    textAlign: 'right',
    marginVertical: 5,
  },
  readMore: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12, 
    width: '90%', 
    alignSelf: 'center',
  },
  cartButtonText: {
    fontSize: 14,
    color: '#f5f5f5',
    fontWeight: 'bold',
  },
  infobutton: {
    color:'#000',
    padding: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#00796B',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    borderTopWidth: 1,
    borderTopColor: '#004D40',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#5B9BD5',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalDescription: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#5B9BD5',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#f5f5f5',
    fontSize: 16,
  },
});