import React from 'react';
import { View, Text, ScrollView, StyleSheet , Image , Platform , Dimensions } from 'react-native';
import { useLocalSearchParams , Stack} from 'expo-router';
import TabBar from './component/TabBar';



const { width } = Dimensions.get('window');const { height } = Dimensions.get('window');

const isWeb = Platform.OS === 'web'
const Cart = () => {
  const params = useLocalSearchParams();
  const cartItems = params.cartItems ? JSON.parse(params.cartItems) : [];

  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price);
    const quantity = item.quantity || 1;
    return (price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const quantity = item.quantity || 1;
      return total + (itemPrice * quantity);
    }, 0).toFixed(2);
  };

  const total = calculateTotal();

  const groupedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(groupedItem => groupedItem.id === item.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

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

      {groupedCartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        groupedCartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image 
              source={item.image} 
              style={styles.cartItemImage} 
              resizeMode='cover' 
            />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <View style={styles.cartItemPriceContainer}>
                <Text style={styles.cartItemPrice}>{item.price}</Text>
                <Text style={styles.cartItemQuantity}>x {item.quantity}</Text>
              </View>
              <Text style={styles.cartItemTotal}>Total: {calculateItemTotal(item)}</Text>
            </View>
          </View>
        ))
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Grand Total: {total}</Text>
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
    backgroundColor: '#FFFFFF', 
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'cover',
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  cartItemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#27AE60',
    marginRight: 10,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#7F8C8D',
    backgroundColor: '#ECF0F1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  cartItemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980B9',
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
