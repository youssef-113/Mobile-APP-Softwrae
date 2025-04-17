import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Platform, Dimensions } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { useRouter } from 'expo-router';
import { Link, Stack } from 'expo-router'; 
import TabBar from './component/TabBar';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const { height } = Dimensions.get('window');

const productImages = {
  product1: require('../assets/images/1.jpg'),
  product2: require('../assets/images/2.jpg'),
  product3: require('../assets/images/3.jpg'),
  product4: require('../assets/images/4.jpg'),
  product5: require('../assets/images/5.jpg'),
  product6: require('../assets/images/6.webp'),
  product7: require('../assets/images/7.webp'),
  product8: require('../assets/images/8.jpeg'),
  product9: require('../assets/images/9.jpeg'),
  product10: require('../assets/images/10.jpeg'),
  default: require('../assets/images/6.webp'),
};

const productsData = [
  { id: '1', name: 'Xiclav', description: 'Xiclav 1g 14 coated tablets', price: '151.99 EGP', image: productImages.product4 },
];

const productsData2 = [
  { id: '2', name: 'Stopadol', description: 'Stopadol Forte 1000 mg 10 sachets', price: '60.99 EGP', image: productImages.product3 },
];

const productsData3 = [
  { id: '3', name: 'Norvasc', description: 'Norvasc 5 mg 10 tablets', price: '41.99 EGP', image: productImages.product2 },
];

const productsData4 = [
  { id: '4', name: 'Daflon', description: 'Daflon 1000 mg 30 coated tablets', price: '285.99 EGP', image: productImages.product1 },
];

const productsData5 = [
  { id: '5', name: 'Cinacalcet', description: 'Cinacalcet 30 mg 10 tablets', price: '277.99 EGP', image: productImages.product5 },
];

const productsData6 = [
  { id: '6', name: 'Singulair', description: 'Singulair 10 mg 20 capsules', price: '41.99 EGP', image: productImages.product10 },
];

const productsData7 = [
  { id: '7', name: 'Forxiga', description: 'forxiga 10 mg 28 tablets', price: '174.99 EGP', image: productImages.product9 },
];

const productsData8 = [
  { id: '8', name: ' Uvamin retard', description: 'Uvamin retard 30 mg', price: '144.99 EGP', image: productImages.product8 },
];

const productsData9 = [
  { id: '9', name: 'Stilnox', description: 'Stilnox 10mg 14 Tablets', price: '64.99 EGP', image: productImages.product7 },
];

const productsData10 = [
  { id: '10', name: 'Cartimov', description: 'Cartimov 50 mg 20 capsules', price: '80.99 EGP', image: productImages.product6 },
];

const allProducts = [
  ...productsData,
  ...productsData2,
  ...productsData3,
  ...productsData4,
  ...productsData5,
  ...productsData6,
  ...productsData7,
  ...productsData8,
  ...productsData9,
  ...productsData10,
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
  const [showProducts, setShowProducts] = useState(false);
  const [showProducts2, setShowProducts2] = useState(false);
  const [showProducts3, setShowProducts3] = useState(false);
  const [showProducts4, setShowProducts4] = useState(false);
  const [showProducts5, setShowProducts5] = useState(false);
  const [showProducts6, setShowProducts6] = useState(false);
  const [showProducts7, setShowProducts7] = useState(false);
  const [showProducts8, setShowProducts8] = useState(false);
  const [showProducts9, setShowProducts9] = useState(false);
  const [showProducts10, setShowProducts10] = useState(false);

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

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.mainContainer}>
            
      <Stack.Screen
        options={{
          headerStyle:styles.headerStyle,
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style ={ styles.forText}>
                Products
              </Text>
              <Image
                source={require('../assets/images/final transparent.png')}
                style ={styles.logo}
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
          <>
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts(!showProducts)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Antibiotics</Text>
                <FontAwesome name={showProducts ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts && productsData.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
            <View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts2(!showProducts2)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Analgesics and anti-inflammatory</Text>
                <FontAwesome name={showProducts2 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts2 && productsData2.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
<View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts3(!showProducts3)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Heart, blood and blood pressure medications</Text>
                <FontAwesome name={showProducts3 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts3 && productsData3.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
<View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts4(!showProducts4)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Hemorrhoids and inflammation medications</Text>
                <FontAwesome name={showProducts4 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts4 && productsData4.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
          <View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts5(!showProducts5)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Hormones</Text>
                <FontAwesome name={showProducts5 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts5 && productsData5.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
            <View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts6(!showProducts6)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Asthma medications</Text>
                <FontAwesome name={showProducts6 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts6 && productsData6.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
            <View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts7(!showProducts7)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Diabetes medications</Text>
                <FontAwesome name={showProducts7 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts7 && productsData7.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
            <View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts8(!showProducts8)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Urinary tract medications</Text>
                <FontAwesome name={showProducts8 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts8 && productsData8.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
            <View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts9(!showProducts9)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Insomnia medications</Text>
                <FontAwesome name={showProducts9 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts9 && productsData9.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
            <View style={styles.separator} />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setShowProducts10(!showProducts10)}>
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryButtonText}>Bone disease medications</Text>
                <FontAwesome name={showProducts10 ? "chevron-up" : "chevron-down"} size={16} color="#FFA500" style={styles.categoryIcon} />
              </View>
            </TouchableOpacity>
            {showProducts10 && productsData10.map((item) => (
              <ProductItem key={item.id} product={item} addToCart={addToCart} openModal={openModal} />
            ))}
          </>
        )}
<View style={styles.separator} />
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/Cart', params: { cartItems: JSON.stringify(cart) } })}
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