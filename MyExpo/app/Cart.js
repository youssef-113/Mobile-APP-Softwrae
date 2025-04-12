import React from 'react';
import { View, Text, ScrollView, StyleSheet , Image , Platform , Dimensions } from 'react-native';
import { useLocalSearchParams , Stack} from 'expo-router';


const { width } = Dimensions.get('window');
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
          Cart
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
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: '#E0F7FA', 
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B', 
  },
  emptyCartText: {
    color: '#333', 
    fontSize: 18,
    fontStyle: 'italic',
  },
  cartItem: {
    backgroundColor: '#26A69A', 
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#004D40', 
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#004D40',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA500', 
  },
});
