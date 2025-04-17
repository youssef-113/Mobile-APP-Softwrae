import React from 'react';
import { View, Text, ScrollView, StyleSheet , Image , Platform , Dimensions } from 'react-native';
import { useLocalSearchParams , Stack} from 'expo-router';
import TabBar from './component/TabBar';



const { width } = Dimensions.get('window');const { height } = Dimensions.get('window');

const isWeb = Platform.OS === 'web'
const Cart = () => {
  const params = useLocalSearchParams();
  const cartItems = params.cartItems ? JSON.parse(params.cartItems) : [];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

  const total = calculateTotal();

  return (
    <ScrollView contentContainerStyle={styles.container}>
       
 <Stack.Screen
   options={{
     headerStyle:styles.headerStyle,
     headerBackVisible: true,
     headerTitle: () => (
       <View style={styles.forView}>
         <Text style ={ styles.forText}>
           Cart
         </Text>
         <Image
           source={require('../assets/images/final transparent.png')}
           style ={styles.logo}
         />
       </View>
     ),
   }}
 />
      <Text style={styles.title}>🛒 Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemPrice}>${item.price}</Text>
          </View>
        ))
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
      </View>

      <TabBar />
    
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb? 100 : 120,
   
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
    paddingVertical: 20,
    backgroundColor: '#F5F5F5', 
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', 
  },
  emptyCartText: {
    color: '#333', 
    fontSize: 18,
    fontStyle: 'italic',
  },
  cartItem: {
    backgroundColor: '#003366', 
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#F5F5F5', 
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#003366',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5F5F5', 
  },
});
