import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router'; 
import TabBar from './component/TabBar';

const productImages = {
  product1: require('../assets/images/car.png'),
  product2: require('../assets/images/car1.png'),
  product3: require('../assets/images/car2.png'),
  product4: require('../assets/images/icon.png'),
  product5: require('../assets/images/icon.png'),
  default: require('../assets/images/favicon.png'),
};

const productsData = [
  { id: '1', name: 'ZOOBA', description: 'This Is new item now is Available', price: '$10.99', image: productImages.product1 },
  { id: '2', name: 'AZZA', description: 'This is old item we Know that item and try to buy this more than one time for each other', price: '$20.99', image: productImages.product2 },
  { id: '3', name: 'BR2BANZIN', description: 'Item 3 is available now', price: '$15.99', image: productImages.product3 },
  { id: '4', name: 'TMATM', description: 'Item 4 here', price: '$12.99', image: productImages.product4 },
  { id: '5', name: 'CAR', description: 'Is new item, is fantastic', price: '$22.99', image: productImages.default },
];

const ProductItem = ({ product, addToCart, openModal }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const maxDescriptionLength = 50; 
  const truncatedDescription = product.description.slice(0, maxDescriptionLength);

  return (
    <View style={styles.productContainer}>
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>
          {isDescriptionExpanded ? product.description : truncatedDescription}
          {product.description.length > maxDescriptionLength && !isDescriptionExpanded && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMore}>... Read More</Text>
            </TouchableOpacity>
          )}
        </Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <TouchableOpacity onPress={() => addToCart(product)} style={styles.addButton}>
          <FontAwesome name="plus" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal(product)}>
          <FontAwesome name="info-circle" size={20} color="#FFF" style={styles.infoIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ProductsScreen() {
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false); 
  const router = useRouter();

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Products</Text>
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => setIsSearchActive(!isSearchActive)} 
      >
        <FontAwesome name="search" size={24} color="#00796B" />
      </TouchableOpacity>
      {isSearchActive && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      )}
      {filteredProducts.map((item) => (
        <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
      ))}
      <TouchableOpacity 
        onPress={() => router.push({ pathname: '/CartScreen', params: { cartItems: JSON.stringify(cart) } })} 
        style={styles.cartButton}>
        <Text style={styles.cartButtonText}>Go to Cart ({cart.length})</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <Text style={styles.modalDescription}>{selectedProduct?.description}</Text>
            <Text style={styles.modalPrice}>{selectedProduct?.price}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TabBar />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingBottom: 100,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
    color: '#00796B',
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  searchInput: {
    width: '90%',
    height: 40,
    backgroundColor: '#ffffff',
    color: '#000',
    paddingLeft: 20,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00796B',
    marginTop: 0,
  },
  productContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
  },
  productDescription: {
    fontSize: 14,
    color: '#333',
  },
  readMore: {
    color: '#00796B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#26A69A',
    padding: 10,
    borderRadius: 50,
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: '#26A69A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  cartButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoIcon: {
    marginTop: 10,
    marginBottom: 10,
    color: '#00796B',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796B',
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
