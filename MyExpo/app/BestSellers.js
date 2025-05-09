import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Platform, Dimensions } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useRouter } from 'expo-router';
import { Link, Stack } from 'expo-router'; 
import TabBar from './component/TabBar';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const { height } = Dimensions.get('window');


export default function BestSellers() {
    return(
      <>
      <ScrollView>
          <Stack.Screen
                 options={{
                   headerStyle:styles.headerStyle,
                   headerBackVisible: true,
                   headerTitle: () => (
                     <View style={styles.forView}>
                       <Text style ={ styles.forText}>
                         Best Sellers
                       </Text>
                       <Image
                         source={require('../assets/images/final transparent.png')}
                         style ={styles.logo}
                       />
                     </View>
                   ),
                 }}
           />
          
         
              
             </ScrollView>
             <TabBar/> 
         </>
    );

}



const styles = StyleSheet.create({

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