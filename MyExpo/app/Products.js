import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Platform, Dimensions } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router'; 
import TabBar from './component/TabBar';
import { auth, db } from '../firebase'; 
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const productImages = {
  product1: require('../assets/images/4.jpg'),
  product2: require('../assets/images/2.jpg'),
  product3: require('../assets/images/3.jpg'),
  product4: require('../assets/images/1.jpg'),
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

const allProducts = [
  ...productsData,
  ...productsData2,
  ...productsData3,
  ...productsData4,
  ...productsData5,
];

const ProductItem = ({ product, addToCart, openModal }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const maxDescriptionLength = 50; 
  const truncatedDescription = product.description.length > maxDescriptionLength 
    ? product.description.slice(0, maxDescriptionLength) + '...' 
    : product.description;

  return (
    <View style={styles.productContainer}>
      {/* Product Image */}
      <Image 
        source={product.image} 
        style={styles.productImage} 
        resizeMode="cover" 
      />
      
      {/* Product Information */}
      <View style={styles.productInfo}>
        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>
        
        {/* Product Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.productDescription}>
            {isDescriptionExpanded ? product.description : truncatedDescription}
          </Text>
          {product.description.length > maxDescriptionLength && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMore}>
                {isDescriptionExpanded ? 'Show Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Price */}
        <Text style={styles.productPrice}>{product.price}</Text>
        
        {/* Actions */}
        <View style={styles.productActions}>
          {/* Add to Cart Button */}
          <TouchableOpacity 
            onPress={() => addToCart(product)} 
            style={styles.addButton}
          >
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
          
          {/* Product Details Button */}
          <TouchableOpacity 
            onPress={() => openModal(product)} 
            style={styles.infoButton}
          >
            <FontAwesome name="info-circle" size={30} color="#00796B" />
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
  const router = useRouter();
  const [expandedCategories, setExpandedCategories] = useState({
    Antibiotics: false,
    Painkillers: false,
    Cardiovascular: false,
    Supplements: false,
    Others: false
  });

  const addToCart = async (product) => {
    try {
      const cartRef = doc(db, "cartItems", auth.currentUser.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        await updateDoc(cartRef, {
          items: arrayUnion({
            name: product.name,
            description: product.description,
            price: product.price,
          }),
        });
      } else {
        await setDoc(cartRef, {
          items: [
            {
              name: product.name,
              description: product.description,
              price: product.price,
            },
          ],
        });
      }

      setCart((prevCart) => [...prevCart, product]);

      console.log("Product added to cart successfully");

    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderCategories = () => {
    return Object.entries(expandedCategories).map(([category, isExpanded]) => {
      const categoryProducts = 
        category === 'Antibiotics' ? productsData :
        category === 'Painkillers' ? productsData2 :
        category === 'Cardiovascular' ? productsData3 :
        category === 'Supplements' ? productsData4 :
        productsData5;

      return (
        <View key={category}>
          <TouchableOpacity 
            style={styles.categoryButton} 
            onPress={() => toggleCategory(category)}
          >
            <View style={styles.categoryButtonContent}>
              <Text style={styles.categoryButtonText}>{category}</Text>
              <FontAwesome 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={16} 
                color="#FFA500" 
                style={styles.categoryIcon} 
              />
            </View>
          </TouchableOpacity>
          {isExpanded && categoryProducts.map((item) => (
            <ProductItem
              key={item.id}
              product={item}
              addToCart={addToCart}
              openModal={openModal}
            />
          ))}
        </View>
      );
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerStyle:styles.headerStyle,
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style={styles.forText}>Products</Text>
              <Image
                source={require('../assets/images/final transparent.png')}
                style={styles.logo}
              />
            </View>
          ),
        }}
      />

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

        {searchText.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductItem
              key={item.id}
              product={item}
              addToCart={addToCart}
              openModal={openModal}
            />
          ))
        ) : (
          renderCategories()
        )}

        <TouchableOpacity
          onPress={() => router.push({ pathname: '/Cart', params: { cartItems: JSON.stringify(cart) } })}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>Go to Cart({cart.length})</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Product Image */}
            <View style={styles.modalImageContainer}>
              <Image 
                source={selectedProduct?.image} 
                style={styles.modalProductImage} 
                resizeMode="cover" 
              />
            </View>
            
            {/* Scrollable Product Details */}
            <ScrollView 
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalScrollViewContent}
            >
              <View style={styles.modalDetailsContainer}>
                <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
                
                <View style={styles.modalInfoSection}>
                  <Text style={styles.modalInfoLabel}>Description:</Text>
                  <Text style={styles.modalDescription}>
                    {selectedProduct?.description}
                  </Text>
                </View>
                
                <View style={styles.modalInfoSection}>
                  <Text style={styles.modalInfoLabel}>Dosages:</Text>
                  <Text style={styles.modalInfoText}>
                    {selectedProduct?.dosages || 'Not specified'}
                  </Text>
                </View>
                
                <View style={styles.modalInfoSection}>
                  <Text style={styles.modalInfoLabel}>Type of Medication:</Text>
                  <Text style={styles.modalInfoText}>
                    {selectedProduct?.medicationType || 'Not specified'}
                  </Text>
                </View>
                
                <View style={styles.modalInfoSection}>
                  <Text style={styles.modalInfoLabel}>Category:</Text>
                  <Text style={styles.modalInfoText}>
                    {selectedProduct?.category || 'Not specified'}
                  </Text>
                </View>
                
                <View style={styles.modalInfoSection}>
                  <Text style={styles.modalInfoLabel}>Suitable Age:</Text>
                  <Text style={styles.modalInfoText}>
                    {selectedProduct?.suitableAge || 'Not specified'}
                  </Text>
                </View>
                
                <View style={styles.modalPriceContainer}>
                  <Text style={styles.modalPriceLabel}>Price:</Text>
                  <Text style={styles.modalPrice}>{selectedProduct?.price}</Text>
                </View>
              </View>
            </ScrollView>
            
            {/* Close Button */}
            <TouchableOpacity 
              onPress={closeModal} 
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.tabsContainer}>
        <TabBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F7F9FC' },
  container: { paddingHorizontal: 15, paddingTop: 10, paddingBottom: 100 },
  headerStyle: { backgroundColor: '#FFFFFF', elevation: 2 },
  forView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  forText: { fontSize: 20, fontWeight: '600', color: '#2C3E50' },
  logo: { width: isWeb ? 200 : width * 0.4, height: 50, resizeMode: 'contain' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 15, paddingHorizontal: 15, marginVertical: 15, elevation: 3 },
  searchInput: { flex: 1, height: 50, fontSize: 16, color: '#2C3E50', textAlign: 'right', paddingRight: 10 },
  searchIcon: { marginLeft: 10, color: '#7F8C8D' },
  categoryButton: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 15, marginVertical: 10, elevation: 3 },
  categoryButtonContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryButtonText: { fontSize: 18, fontWeight: '600', color: '#2C3E50' },
  categoryIcon: { color: '#3498DB' },
  productContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 130,  // Slightly larger
    height: 130, // Slightly larger
    borderRadius: 15, // More rounded corners
    marginRight: 15,
    resizeMode: 'contain', // Changed to 'contain' to show full image
    backgroundColor: '#F0F0F0', // Light background to highlight image
    padding: 10, // Add some padding
    alignSelf: 'center', // Center the image
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 22,
  },
  readMore: {
    color: '#3498DB',
    fontWeight: '600',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
    marginBottom: 10,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#3498DB',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoButton: {
    backgroundColor: 'transparent',
  },
  cartButton: { backgroundColor: '#3498DB', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  cartButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContent: { 
    width: '90%', 
    height: '90%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalImageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#F0F0F0',
  },
  modalProductImage: {
    width: 130,  // Match product list image width
    height: 130, // Match product list image height
    borderRadius: 15, // Match product list image border radius
    resizeMode: 'cover', // Match product list image resizeMode
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollViewContent: {
    paddingBottom: 20,
  },
  modalDetailsContainer: {
    padding: 20,
  },
  modalInfoSection: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalInfoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  modalInfoText: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
  },
  modalTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2C3E50', 
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: { 
    fontSize: 16, 
    color: '#7F8C8D', 
    marginBottom: 15,
    lineHeight: 24,
  },
  modalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  modalPriceLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  modalPrice: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#27AE60', 
  },
  modalCloseButton: { 
    backgroundColor: '#3498DB', 
    padding: 15, 
    alignItems: 'center',
  },
  modalCloseButtonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  tabsContainer: { position: 'absolute', bottom: 0, left: 0, right: 0 },
});
