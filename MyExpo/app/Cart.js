import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Dimensions, FlatList } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getAuth } from 'firebase/auth';
import TabBar from './component/TabBar';
import { onSnapshot,arrayRemove, updateDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const Cart = () => {
  const params = useLocalSearchParams();
  const initialCartItems = params.cartItems ? JSON.parse(params.cartItems) : [];

  const [groupedCartItems, setGroupedCartItems] = useState([]);

  useEffect(() => {
  const unsubscribe = onSnapshot(doc(db, "cartItems", auth.currentUser.uid), (docSnap) => {
    if (docSnap.exists()) {
      const items = docSnap.data().items || [];

      const grouped = items.reduce((acc, item) => {
        const existingItem = acc.find(groupedItem => groupedItem.name === item.name);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          acc.push({ ...item, quantity: 1 });
        }
        return acc;
      }, []);

      setGroupedCartItems(grouped);
    }
  });

  return () => unsubscribe();
}, []);

  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price);
    const quantity = item.quantity || 1;
    return (price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return groupedCartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const quantity = item.quantity || 1;
      return total + (itemPrice * quantity);
    }, 0).toFixed(2);
  };
const auth = getAuth();

  const deleteCartItem = async (product) => {
    try {
      const cartRef = doc(db, "cartItems", auth.currentUser.uid);
  
      await updateDoc(cartRef, {
        items: arrayRemove({
          name: product.name,
          description: product.description,
          price: product.price,
        }),
      });
  
      setGroupedCartItems((prevItems) =>
        prevItems.filter((item) => item.name !== product.name)
      );
  
      console.log("Firestore");
    } catch (error) {
      console.error("Deletion Failed", error);
    }
  };

  const total = calculateTotal();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style={styles.forText}>Cart</Text>
              <Image
                source={require('../assets/images/final transparent.png')}
                style={styles.logo}
              />
            </View>
          ),
        }}
      />
      <Text style={styles.title}>🛒 Your Cart</Text>
      {groupedCartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <View style={styles.cartListWrapper}>
          <FlatList
            data={groupedCartItems}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View style={styles.cartItemCard}>
                <Image
                  source={item.image}
                  style={styles.cartItemImageSmall}
                  resizeMode="cover"
                />
                <View style={styles.cartItemDetailsSmall}>
                  <Text style={styles.cartItemNameSmall}>{item.name}</Text>
                  <View style={styles.cartItemPriceContainerSmall}>
                    <Text style={styles.cartItemPriceSmall}>{item.price}</Text>
                    <Text style={styles.cartItemQuantitySmall}>x {item.quantity}</Text>
                  </View>
                  <View style={styles.cartItemBottomRow}>
                  <Text style={styles.cartItemTotalSmall}>Total: {calculateItemTotal(item)}</Text>
                  <Text
                    style={styles.deleteButton}
                    onPress={() => deleteCartItem(item)}
                  >
                    🗑️ Delete
                  </Text>
                   </View>
                </View>
              </View>
            )}
            style={{ width: '100%' }}
          />
        </View>
      )}

      <View style={styles.floatingTotalBar}>
        <Text style={styles.floatingTotalText}>💰 Grand Total: <Text style={styles.floatingTotalAmount}>{total}</Text></Text>
      </View>

      <TabBar />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
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
  cartListWrapper: {
    maxHeight: 340,
    width: '100%',
    marginBottom: 10,
  },
  cartItemCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: '5%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 90,
  },
  cartItemImageSmall: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#eee',
  },
  cartItemDetailsSmall: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemNameSmall: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  cartItemPriceContainerSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  cartItemPriceSmall: {
    fontSize: 13,
    color: '#27AE60',
    marginRight: 7,
  },
  cartItemQuantitySmall: {
    fontSize: 12,
    color: '#7F8C8D',
    backgroundColor: '#ECF0F1',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
  },
  cartItemTotalSmall: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2980B9',
  },
 deleteButton: {
  color: '#fff',
  backgroundColor: '#e74c3c',
  fontWeight: 'bold',
  fontSize: 14,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 6,
  overflow: 'hidden',
  marginTop: -8,
},

  floatingTotalBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 65,
    backgroundColor: '#003366',
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  floatingTotalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1.1,
  },
  floatingTotalAmount: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 7,
  },
  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb ? 100 : 120,
  },
  logo: {
    width: isWeb ? 400 : width * 0.6,
    height: isWeb ? 400 : height * 2.5,
    marginLeft: isWeb ? 650 : -20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  forText: {
    color: '#191716',
    fontWeight: 'bold',
    marginRight: isWeb ? 20 : 40,
    fontSize: isWeb ? 18 : 16,
  },
  forView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: isWeb ? 'flex-start' : 'center',
    width: '100%',
  },
  cartItemBottomRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
}
}); 