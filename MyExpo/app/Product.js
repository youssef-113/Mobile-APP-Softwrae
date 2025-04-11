import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router'; 
import TabBar from './component/TabBar';

const productImages = {
  product1: require('../assets/images/1.jpg'),
  product2: require('../assets/images/2.jpg'),
  product3: require('../assets/images/3.jpg'),
  product4: require('../assets/images/4.jpg'),
  product5: require('../assets/images/5.jpg'),
  default: require('../assets/images/favicon.png'),
};

const productsData = [
  { id: '1', name: 'Xiclav', description: 'Xiclav 1g 14 coated tablets', price: '151.99 EGP', image: productImages.product1 },
];

const productsData2 = [
  { id: '2', name: 'Stopadol', description: 'Stopadol Forte 1000 mg 10 sachets', price: '60.99 EGP', image: productImages.product2 },
];

const productsData3 = [
  { id: '3', name: 'Norvasc', description: 'Norvasc 5 mg 10 tablets', price: '41.99 EGP', image: productImages.product3 },
 ];

const productsData4 = [
  { id: '4', name: 'Daflon', description: 'Daflon 1000 mg 30 coated tablets', price: '285.99 EGP', image: productImages.product4 },
];

const productsData5 = [
  { id: '5', name: 'Cinacalcet', description: 'Cinacalcet 30 mg 10 tablets', price: '277.99 EGP', image: productImages.product5 },
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
        <View style={styles.productActions}>
          <TouchableOpacity onPress={() => addToCart(product)} style={styles.addButton}>
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal(product)} style={styles.infoButton}>
            <FontAwesome name="info-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
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
  const [showProducts, setShowProducts] = useState(false);
  const [showProducts2, setShowProducts2] = useState(false);
  const [showProducts3, setShowProducts3] = useState(false);
  const [showProducts4, setShowProducts4] = useState(false);
  const [showProducts5, setShowProducts5] = useState(false);

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
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product List</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>   
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="search"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            textAlign="right"
          />
          <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
        </View>

        
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setShowProducts(!showProducts)}
        >
          <View style={styles.categoryButtonContent}>
            <Text style={styles.categoryButtonText}>Antibiotics</Text>
            <FontAwesome 
              name={showProducts ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#FFA500" 
              style={styles.categoryIcon}
            />
          </View>
        </TouchableOpacity>

        {showProducts && productsData.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            addToCart={addToCart}
            openModal={openModal}
          />
        ))}

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setShowProducts2(!showProducts2)}
        >
          <View style={styles.categoryButtonContent}>
            <Text style={styles.categoryButtonText}>Analgesics and anti-inflammatory</Text>
            <FontAwesome 
              name={showProducts2 ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#FFA500" 
              style={styles.categoryIcon}
            />
          </View>
        </TouchableOpacity>

        {showProducts2 && productsData2.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            addToCart={addToCart}
            openModal={openModal}
          />
        ))}

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setShowProducts3(!showProducts3)}
        >
          <View style={styles.categoryButtonContent}>
            <Text style={styles.categoryButtonText}>Heart, blood and blood pressure medications</Text>
            <FontAwesome 
              name={showProducts3 ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#FFA500" 
              style={styles.categoryIcon}
            />
          </View>
        </TouchableOpacity>

        {showProducts3 && productsData3.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            addToCart={addToCart}
            openModal={openModal}
          />
        ))}

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setShowProducts4(!showProducts4)}
        >
          <View style={styles.categoryButtonContent}>
            <Text style={styles.categoryButtonText}>Hemorrhoids and inflammation medications</Text>
            <FontAwesome 
              name={showProducts4 ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#FFA500" 
              style={styles.categoryIcon}
            />
          </View>
        </TouchableOpacity>
        {showProducts4 && productsData4.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            addToCart={addToCart}
            openModal={openModal}
          />
        ))}
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setShowProducts5(!showProducts5)}
        >
          <View style={styles.categoryButtonContent}>
            <Text style={styles.categoryButtonText}>Hormones</Text>
            <FontAwesome 
              name={showProducts5 ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#FFA500" 
              style={styles.categoryIcon}
            />
          </View>
        </TouchableOpacity>

        {showProducts5 && productsData5.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            addToCart={addToCart}
            openModal={openModal}
          />
        ))}

        
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/CartScreen', params: { cartItems: JSON.stringify(cart) } })}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>Go to Cart({cart.length})</Text>
        </TouchableOpacity>

        
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
              <Text style={styles.modalDescription}>{selectedProduct?.description}</Text>
              <Text style={styles.modalPrice}>{selectedProduct?.price}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <View style={styles.tabsContainer}>
        <TabBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E0F7FA',
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
    color: '#FFA500',
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#00796B',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#00796B',
    fontWeight: 'bold',
  },
  productContainer: {
    backgroundColor: '#ffffff',
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
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'right',
  },
  productDescription: {
    fontSize: 12,
    color: '#333',
    textAlign: 'right',
    marginVertical: 5,
  },
  readMore: {
    color: '#00796B',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'right',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#26A69A',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: '#26A69A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  cartButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
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