import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const Cart = () => {
  const params = useLocalSearchParams();
  const cartItems = params.cartItems ? JSON.parse(params.cartItems) : [];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

  const total = calculateTotal();

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    backgroundColor: '#E0F7FA', // تغيير اللون إلى لون فاتح
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B', // تغيير اللون إلى الأخضر الداكن
  },
  emptyCartText: {
    color: '#333', // لون النص الرمادي الداكن
    fontSize: 18,
    fontStyle: 'italic',
  },
  cartItem: {
    backgroundColor: '#26A69A', // تغيير اللون إلى الأخضر الفاتح
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
    color: '#004D40', // تغيير اللون إلى الأخضر الداكن
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#004D40', // تغيير اللون إلى الأخضر الداكن
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA500', // لون البرتقالي
  },
});
