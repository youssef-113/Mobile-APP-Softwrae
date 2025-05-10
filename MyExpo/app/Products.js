import React, { useState } from 'react';
import { ActivityIndicator, I18nManager } from 'react-native';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Platform, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
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
  product6: require('../assets/images/6.avif'),
  product7: require('../assets/images/7.jpeg'),
  product8: require('../assets/images/8.jpeg'),
  product9: require('../assets/images/9.jpeg'),
  product10: require('../assets/images/10.jpeg'),
  product11: require('../assets/images/11.jpeg'),
  product12: require('../assets/images/12.jpeg'),
  product13: require('../assets/images/13.jpeg'),
  product14: require('../assets/images/14.jpeg'),
  product15: require('../assets/images/15.jpeg'),
  product16: require('../assets/images/16.jpeg'),
  product17: require('../assets/images/17.jpeg'),
  product18: require('../assets/images/18.jpeg'),
  product19: require('../assets/images/19.jpeg'),
  product20: require('../assets/images/20.jpeg'),
  product21: require('../assets/images/21.jpeg'),
  product22: require('../assets/images/22.jpeg'),
  product23: require('../assets/images/23.jpeg'),
  product24: require('../assets/images/24.jpeg'),
  product25: require('../assets/images/25.jpeg'),
  product26: require('../assets/images/26.jpeg'),
  product27: require('../assets/images/27.jpeg'),
  product28: require('../assets/images/28.jpeg'),
  product29: require('../assets/images/29.jpeg'),
  product30: require('../assets/images/30.jpeg'),
  product31: require('../assets/images/31.jpeg'),
  product32: require('../assets/images/32.jpeg'),
  product33: require('../assets/images/33.jpeg'),
  product34: require('../assets/images/34.jpeg'),
  product35: require('../assets/images/35.jpeg'),
  product36: require('../assets/images/36.jpg'),
  product37: require('../assets/images/37.jpg'),
  product38: require('../assets/images/38.jpg'),
  product39: require('../assets/images/39.jpg'),
  product40: require('../assets/images/40.jpg'),
  default: require('../assets/images/favicon.png'),
};

const mockBrands = ['Pfizer', 'Novartis', 'Sanofi', 'GSK', 'Generic'];

function getMockStock(id) {
  if (id === '1') return { inStock: true, left: 2 };
  if (id === '2') return { inStock: true, left: 10 };
  if (id === '3') return { inStock: false, left: 0 };
  if (id === '4') return { inStock: true, left: 1 };
  return { inStock: true, left: 20 };
}

function getMockBadge(id) {
  if (id === '1') return 'Best Seller';
  if (id === '2') return 'New';
  if (id === '4') return 'Discount';
  return null;
}

function getMockBrand(id) {
  if (id === '1') return 'Pfizer';
  if (id === '2') return 'Novartis';
  if (id === '3') return 'Sanofi';
  if (id === '4') return 'GSK';
  return 'Generic';
}

function getMockRecommendations() {
  return [productsData[0], productsData2[0]];
}


const productsData = [
  { id: '1', name: 'Xiclav', description: 'Xiclav 1g 14 coated tablets', price: '151.99 EGP', image: productImages.product1, dosages: '1g per tablet, 14 tablets', medicationType: 'Antibiotic', category: 'Antibiotics', suitableAge: 'Adults & children (doctor advice)' },
  { id: '2', name: 'Stopadol', description: 'Stopadol Forte 1000 mg 10 sachets', price: '60.99 EGP', image: productImages.product2, dosages: '1000 mg per sachet', medicationType: 'Painkiller', category: 'Analgesics', suitableAge: 'Adults & children above 12' },
  { id: '3', name: 'Norvasc', description: 'Norvasc 5 mg 10 tablets', price: '41.99 EGP', image: productImages.product3, dosages: '5 mg per tablet', medicationType: 'Antihypertensive', category: 'Cardiovascular', suitableAge: 'Adults' },
  { id: '4', name: 'Daflon', description: 'Daflon 1000 mg 30 coated tablets', price: '285.99 EGP', image: productImages.product4, dosages: '1000 mg per tablet', medicationType: 'Veno-tonic', category: 'Vascular', suitableAge: 'Adults' },
  { id: '5', name: 'Cinacalcet', description: 'Cinacalcet 30 mg 10 tablets', price: '277.99 EGP', image: productImages.product5, dosages: '30 mg per tablet', medicationType: 'Calcimimetic', category: 'Endocrine', suitableAge: 'Adults' },
 ];

const productsData2 = [
  { id: '6', name: 'Panadol', description: 'Panadol Extra 500 mg 24 tablets', price: '55.99 EGP', image: productImages.product6, dosages: '500 mg per tablet', medicationType: 'Painkiller', category: 'Analgesics', suitableAge: 'Adults & children above 6' },
  { id: '7', name: 'Ambezim', description: 'Ambezim anti-inflammatory 20 tablets', price: '38.50 EGP', image: productImages.product7, dosages: 'As prescribed', medicationType: 'Anti-inflammatory', category: 'Enzyme therapy', suitableAge: 'Adults' },
  { id: '8', name: 'Ventolin', description: 'Ventolin inhaler 100 mcg', price: '80.00 EGP', image: productImages.product8, dosages: '100 mcg per puff', medicationType: 'Bronchodilator', category: 'Respiratory', suitableAge: 'Adults & children' },
  { id: '9', name: 'Zyrtec', description: 'Zyrtec 10 mg 20 tablets', price: '64.75 EGP', image: productImages.product9, dosages: '10 mg per tablet', medicationType: 'Antihistamine', category: 'Allergy', suitableAge: 'Adults & children above 6' },
  { id: '10', name: 'Motilium', description: 'Motilium 10 mg 30 tablets', price: '44.99 EGP', image: productImages.product10, dosages: '10 mg per tablet', medicationType: 'Antiemetic', category: 'Digestive', suitableAge: 'Adults & children' },
  ];

const productsData3 = [
  { id: '11', name: 'Augmentin', description: 'Augmentin 1g 14 tablets', price: '165.00 EGP', image: productImages.product11, dosages: '1g per tablet', medicationType: 'Antibiotic', category: 'Antibiotics', suitableAge: 'Adults & children (doctor advice)' },
  { id: '12', name: 'Adol', description: 'Adol 500 mg 24 tablets', price: '33.00 EGP', image: productImages.product12, dosages: '500 mg per tablet', medicationType: 'Painkiller', category: 'Analgesics', suitableAge: 'Adults & children above 6' },
  { id: '13', name: 'Cataflam', description: 'Cataflam 50 mg 20 tablets', price: '48.50 EGP', image: productImages.product13, dosages: '50 mg per tablet', medicationType: 'NSAID', category: 'Anti-inflammatory', suitableAge: 'Adults' },
  { id: '14', name: 'Brufen', description: 'Brufen 600 mg 20 tablets', price: '45.00 EGP', image: productImages.product14, dosages: '600 mg per tablet', medicationType: 'NSAID', category: 'Anti-inflammatory', suitableAge: 'Adults & children above 12' },
  { id: '15', name: 'Solpadeine', description: 'Solpadeine effervescent 12 tablets', price: '72.00 EGP', image: productImages.product15, dosages: 'As prescribed', medicationType: 'Painkiller', category: 'Analgesics', suitableAge: 'Adults' },
 ];

const productsData4 = [
  { id: '16', name: 'Antinal', description: 'Antinal 200 mg 24 capsules', price: '25.99 EGP', image: productImages.product16, dosages: '200 mg per capsule', medicationType: 'Antidiarrheal', category: 'Digestive', suitableAge: 'Adults & children' },
  { id: '17', name: 'Flagyl', description: 'Flagyl 500 mg 20 tablets', price: '32.00 EGP', image: productImages.product17, dosages: '500 mg per tablet', medicationType: 'Antibiotic/Antiprotozoal', category: 'Digestive', suitableAge: 'Adults & children' },
  { id: '18', name: 'Nexium', description: 'Nexium 40 mg 14 tablets', price: '170.00 EGP', image: productImages.product18, dosages: '40 mg per tablet', medicationType: 'Proton pump inhibitor', category: 'Digestive', suitableAge: 'Adults' },
  { id: '19', name: 'Losec', description: 'Losec 20 mg 14 tablets', price: '105.00 EGP', image: productImages.product19, dosages: '20 mg per tablet', medicationType: 'Proton pump inhibitor', category: 'Digestive', suitableAge: 'Adults' },
  { id: '20', name: 'Omeprazole', description: 'Omeprazole 20 mg 28 capsules', price: '75.99 EGP', image: productImages.product20, dosages: '20 mg per capsule', medicationType: 'Proton pump inhibitor', category: 'Digestive', suitableAge: 'Adults' },
 ];

const productsData5 = [
  { id: '21', name: 'Glucophage', description: 'Glucophage 500 mg 30 tablets', price: '55.50 EGP', image: productImages.product21, dosages: '500 mg per tablet', medicationType: 'Antidiabetic', category: 'Diabetes', suitableAge: 'Adults' },
  { id: '22', name: 'Insulatard', description: 'Insulatard insulin injection 100 IU/ml', price: '120.00 EGP', image: productImages.product22, dosages: '100 IU/ml', medicationType: 'Insulin', category: 'Diabetes', suitableAge: 'Adults & children' },
  { id: '23', name: 'Lantus', description: 'Lantus insulin injection 100 IU/ml', price: '180.00 EGP', image: productImages.product23, dosages: '100 IU/ml', medicationType: 'Insulin', category: 'Diabetes', suitableAge: 'Adults & children' },
  { id: '24', name: 'Trulicity', description: 'Trulicity 1.5 mg injection', price: '600.00 EGP', image: productImages.product24, dosages: '1.5 mg per injection', medicationType: 'GLP-1 agonist', category: 'Diabetes', suitableAge: 'Adults' },
  { id: '25', name: 'Euthyrox', description: 'Euthyrox 100 mcg 50 tablets', price: '35.00 EGP', image: productImages.product25, dosages: '100 mcg per tablet', medicationType: 'Thyroid hormone', category: 'Endocrine', suitableAge: 'Adults' },
  { id: '36', name: 'Signal', description: 'Tooth health', price: '55.50 EGP', image: productImages.product36, dosages: 'Apply as needed', medicationType: 'Toothpaste', category: 'Oral care', suitableAge: 'All ages' },
  { id: '37', name: 'Pampers', description: 'Children health', price: '120.00 EGP', image: productImages.product37, dosages: 'Use as needed', medicationType: 'Diaper', category: 'Baby care', suitableAge: 'Babies & toddlers' },
  { id: '38', name: 'Massage gel', description: 'Message gel', price: '40.00 EGP', image: productImages.product38, dosages: 'Apply as needed', medicationType: 'Topical gel', category: 'Pain relief', suitableAge: 'All ages' },
  { id: '39', name: 'Shampoo', description: 'Shampoo', price: '60.00 EGP', image: productImages.product39, dosages: 'Apply as needed', medicationType: 'Shampoo', category: 'Hair care', suitableAge: 'All ages' },
  { id: '40', name: 'Mask', description: 'general health', price: '5.00 EGP', image: productImages.product40, dosages: 'Use as needed', medicationType: 'Face mask', category: 'Protection', suitableAge: 'All ages' },
  
  ];

const productsData6 = [
  { id: '26', name: 'Concor', description: 'Concor 5 mg 20 tablets', price: '47.00 EGP', image: productImages.product26, dosages: '5 mg per tablet', medicationType: 'Beta blocker', category: 'Cardiovascular', suitableAge: 'Adults' },
  { id: '27', name: 'Lipitor', description: 'Lipitor 20 mg 30 tablets', price: '170.00 EGP', image: productImages.product27, dosages: '20 mg per tablet', medicationType: 'Statin', category: 'Cholesterol', suitableAge: 'Adults' },
  { id: '28', name: 'Plavix', description: 'Plavix 75 mg 28 tablets', price: '290.00 EGP', image: productImages.product28, dosages: '75 mg per tablet', medicationType: 'Antiplatelet', category: 'Cardiovascular', suitableAge: 'Adults' },
  { id: '29', name: 'Cardura', description: 'Cardura 4 mg 30 tablets', price: '78.00 EGP', image: productImages.product29, dosages: '4 mg per tablet', medicationType: 'Alpha blocker', category: 'Cardiovascular', suitableAge: 'Adults' },
  { id: '30', name: 'Lasix', description: 'Lasix 40 mg 20 tablets', price: '39.00 EGP', image: productImages.product30, dosages: '40 mg per tablet', medicationType: 'Diuretic', category: 'Cardiovascular', suitableAge: 'Adults' },
];

const productsData7 = [
  { id: '31', name: 'Zantac', description: 'Zantac 150 mg 20 tablets', price: '48.00 EGP', image: productImages.product31, dosages: '150 mg per tablet', medicationType: 'H2 blocker', category: 'Digestive', suitableAge: 'Adults' },
  { id: '32', name: 'Clavox', description: 'Clavox 625 mg 14 tablets', price: '132.50 EGP', image: productImages.product32, dosages: '625 mg per tablet', medicationType: 'Antibiotic', category: 'Antibiotics', suitableAge: 'Adults & children (doctor advice)' },
  { id: '33', name: 'Ketolac', description: 'Ketolac 10 mg 20 tablets', price: '42.00 EGP', image: productImages.product33, dosages: '10 mg per tablet', medicationType: 'NSAID', category: 'Pain relief', suitableAge: 'Adults' },
  { id: '34', name: 'Neuroton', description: 'Neuroton 30 tablets for nerve support', price: '85.00 EGP', image: productImages.product34, dosages: 'As prescribed', medicationType: 'Vitamin B complex', category: 'Nerve support', suitableAge: 'Adults' },
  { id: '35', name: 'Hemoclar', description: 'Hemoclar gel 40g for bruises', price: '52.75 EGP', image: productImages.product35, dosages: 'Apply as needed', medicationType: 'Topical gel', category: 'Bruises & swelling', suitableAge: 'All ages' },
];

const allProducts = [
  ...productsData,
  ...productsData2,
  ...productsData3,
  ...productsData4,
  ...productsData5,
  ...productsData6,
  ...productsData7,
];

const ProductItem = ({ product, addToCart, openModal, isInWishlist, toggleWishlist }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const maxDescriptionLength = 50; 
  const truncatedDescription = product.description.length > maxDescriptionLength 
    ? product.description.slice(0, maxDescriptionLength) + '...' 
    : product.description;

  return (
    <View style={{ position: 'relative' }}>
      <Image
        source={product.image}
        style={styles.productImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => toggleWishlist(product.id)}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 3 }}
      >
        <FontAwesome name={isInWishlist(product.id) ? 'heart' : 'heart-o'} size={24} color={isInWishlist(product.id) ? '#E53935' : '#B0B0B0'} />
      </TouchableOpacity>
      <View style={styles.productInfo}>

        <Text style={styles.productName}>{product.name}</Text>

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
        
        <Text style={styles.productPrice}>{product.price}</Text>
    
        <View style={styles.productActions}>
         
          <TouchableOpacity 
            onPress={() => addToCart(product)} 
            style={styles.addButton}
          >
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
 
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
  
  const categories = [
  { key: 'Antibiotics', label: 'Antibiotics' },
  { key: 'Painkillers', label: 'Painkillers' },
  { key: 'Cardiovascular', label: 'Cardiovascular' },
  { key: 'Supplements', label: 'Supplements' },
  { key: 'Blood pressure', label: 'Blood pressure' },
  { key: 'Diabetes', label: 'Diabetes' },
  { key: 'Others', label: 'Others' },
  { key: 'Favorites', label: 'Favorites' },
];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [wishlist, setWishlist] = useState([]);
  const [imageModal, setImageModal] = useState({ visible: false, image: null });
  const [language, setLanguage] = useState('EN');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, [selectedCategory, searchText, selectedFilter, selectedBrands, priceRange]);


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
            image: product.image,
          }),
        });
      } else {
        await setDoc(cartRef, {
          items: [
            {
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.image,
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


  const handleTabPress = (categoryKey) => {
    if (selectedCategory === categoryKey) {
      setSelectedCategory(null); 
    } else {
      setSelectedCategory(categoryKey);
    }
  };


  const getVisibleProducts = () => {
    let products = allProducts;
    if (selectedCategory === 'Favorites') {
      products = allProducts.filter(p => isInWishlist(p.id));
    } else if (selectedCategory) {
      if (selectedCategory === 'Antibiotics') products = productsData;
      else if (selectedCategory === 'Painkillers') products = productsData2;
      else if (selectedCategory === 'Cardiovascular') products = productsData3;
      else if (selectedCategory === 'Supplements') products = productsData4;
      else if (selectedCategory === 'Others') products = productsData5;
      else if (selectedCategory === 'Blood pressure') products = productsData6;
      else if (selectedCategory === 'Diabetes') products = productsData7;
    }

    if (searchText.length > 0) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedBrands.length > 0) {
      products = products.filter((product) => selectedBrands.includes(getMockBrand(product.id)));
    }
    products = products.filter((product) => {
      const price = parseFloat(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    if (selectedFilter === 'priceLowHigh') {
      products = [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (selectedFilter === 'priceHighLow') {
      products = [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (selectedFilter === 'nameAZ') {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilter === 'nameZA') {
      products = [...products].sort((a, b) => b.name.localeCompare(a.name));
    }
    return products;
  };


  const isInWishlist = (id) => wishlist.includes(id);
  const toggleWishlist = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
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

      {showToast && (
        <View style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <View style={{
            backgroundColor: '#27AE60',
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
          }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>Added!</Text>
          </View>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.container}>   
        <View style={[styles.searchContainer, { flexDirection: 'row', alignItems: 'center' }]}>  
          <TextInput
            style={styles.searchInput}
            placeholder={language === 'EN' ? 'Search...' : 'بحث...'}
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            textAlign={language === 'EN' ? 'left' : 'right'}
          />
          <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={{ marginLeft: 8, padding: 6, borderRadius: 8, backgroundColor: '#F0F0F0' }}>
            <FontAwesome name="filter" size={20} color="#3498DB" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setLanguage(language === 'EN' ? 'AR' : 'EN');
            I18nManager.forceRTL(language !== 'EN');
          }} style={{ marginLeft: 8, padding: 6, borderRadius: 8, backgroundColor: '#E0E0E0' }}>
            <Text style={{ fontWeight: 'bold', color: '#3498DB' }}>{language === 'EN' ? 'AR' : 'EN'}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={filterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, minHeight: 340 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#2C3E50', textAlign: 'center' }}>{language === 'EN' ? 'Filter & Sort' : 'تصفية وترتيب'}</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Brands</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
                {mockBrands.map(brand => (
                  <TouchableOpacity
                    key={brand}
                    onPress={() => setSelectedBrands((prev) => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])}
                    style={{ paddingVertical: 6, paddingHorizontal: 14, borderRadius: 18, backgroundColor: selectedBrands.includes(brand) ? '#3498DB' : '#E0E0E0', marginRight: 8, marginBottom: 8 }}
                  >
                    <Text style={{ color: selectedBrands.includes(brand) ? '#fff' : '#2C3E50', fontWeight: 'bold' }}>{brand}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Price Range</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ marginRight: 8 }}>{priceRange[0]} EGP</Text>
                <View style={{ flex: 1, marginHorizontal: 8 }}>
                  <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={300}
                    step={1}
                    value={priceRange[0]}
                    minimumTrackTintColor="#3498DB"
                    maximumTrackTintColor="#E0E0E0"
                    thumbTintColor="#3498DB"
                    onValueChange={min => setPriceRange([min, Math.max(min, priceRange[1])])}
                  />
                  <Slider
                    style={{ width: '100%', height: 40, marginTop: -24 }}
                    minimumValue={0}
                    maximumValue={300}
                    step={1}
                    value={priceRange[1]}
                    minimumTrackTintColor="#3498DB"
                    maximumTrackTintColor="#E0E0E0"
                    thumbTintColor="#3498DB"
                    onValueChange={max => setPriceRange([Math.min(max, priceRange[0]), max])}
                  />
                </View>
                <Text style={{ marginLeft: 8 }}>{priceRange[1]} EGP</Text>
              </View>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, padding: 10, borderRadius: 8, backgroundColor: selectedFilter === 'priceLowHigh' ? '#E3F1FD' : '#F7F9FA' }}
                onPress={() => setSelectedFilter('priceLowHigh')}
              >
                <FontAwesome name="sort-amount-asc" size={18} color="#3498DB" style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, color: '#2C3E50' }}>{language === 'EN' ? 'Price: Low to High' : 'السعر: من الأقل للأعلى'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, padding: 10, borderRadius: 8, backgroundColor: selectedFilter === 'priceHighLow' ? '#E3F1FD' : '#F7F9FA' }}
                onPress={() => setSelectedFilter('priceHighLow')}
              >
                <FontAwesome name="sort-amount-desc" size={18} color="#3498DB" style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, color: '#2C3E50' }}>{language === 'EN' ? 'Price: High to Low' : 'السعر: من الأعلى للأقل'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, padding: 10, borderRadius: 8, backgroundColor: selectedFilter === 'nameAZ' ? '#E3F1FD' : '#F7F9FA' }}
                onPress={() => setSelectedFilter('nameAZ')}
              >
                <FontAwesome name="sort-alpha-asc" size={18} color="#3498DB" style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, color: '#2C3E50' }}>{language === 'EN' ? 'Name: A-Z' : 'الاسم: أ-ي'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24, padding: 10, borderRadius: 8, backgroundColor: selectedFilter === 'nameZA' ? '#E3F1FD' : '#F7F9FA' }}
                onPress={() => setSelectedFilter('nameZA')}
              >
                <FontAwesome name="sort-alpha-desc" size={18} color="#3498DB" style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, color: '#2C3E50' }}>{language === 'EN' ? 'Name: Z-A' : 'الاسم: ي-أ'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilterModalVisible(false)}
                style={{ backgroundColor: '#3498DB', padding: 14, borderRadius: 10, alignItems: 'center' }}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{language === 'EN' ? 'Apply Filter' : 'تطبيق التصفية'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setSelectedFilter(null); setSelectedBrands([]); setFilterModalVisible(false); }}
                style={{ marginTop: 10, alignItems: 'center' }}
              >
                <Text style={{ color: '#888', fontSize: 15 }}>{language === 'EN' ? 'Clear Filter' : 'مسح التصفية'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <View style={styles.tabBarContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBarContent}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.tabButton,
                  selectedCategory === cat.key && styles.tabButtonActive
                ]}
                onPress={() => handleTabPress(cat.key)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.tabButtonText,
                  selectedCategory === cat.key && styles.tabButtonTextActive
                ]}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

 
        {searchText.length > 0 ? (
          getVisibleProducts().length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 40, fontSize: 18 }}>No products found</Text>
          ) : (
            getVisibleProducts().map((item) => (
              <ProductItem
                key={item.id}
                product={item}
                addToCart={addToCart}
                openModal={openModal}
                isInWishlist={isInWishlist}
                toggleWishlist={toggleWishlist}
              />
            ))
          )
        ) : (
          selectedCategory ? (
            getVisibleProducts().length === 0 ? (
              <Text style={{ textAlign: 'center', color: '#888', marginTop: 40, fontSize: 18 }}>No products found</Text>
            ) : (
              getVisibleProducts().map((item) => (
                <ProductItem
                  key={item.id}
                  product={item}
                  addToCart={addToCart}
                  openModal={openModal}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              ))
            )
          ) : (
            categories.map((cat) => {
              let products = [];
              if (cat.key === 'Antibiotics') products = productsData;
              else if (cat.key === 'Painkillers') products = productsData2;
              else if (cat.key === 'Cardiovascular') products = productsData3;
              else if (cat.key === 'Supplements') products = productsData4;
              else if (cat.key === 'Blood pressure') products = productsData6;
              else if (cat.key === 'Diabetes') products = productsData7;
              else products = productsData5;
              if (!products.length) return null;
              return (
                <View key={cat.key} style={{ marginBottom: 10, borderRadius: 12, backgroundColor: '#F7F9FA', overflow: 'hidden', borderWidth: 1, borderColor: '#E0E0E0' }}>
                  <TouchableOpacity
                    onPress={() => setExpandedGroups(prev => ({ ...prev, [cat.key]: !prev[cat.key] }))}
                    style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: expandedGroups[cat.key] ? '#E3F1FD' : '#F7F9FA' }}
                    activeOpacity={0.8}
                  >
                    <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', color: '#2C3E50' }}>{cat.label}</Text>
                    <FontAwesome name={expandedGroups[cat.key] ? 'chevron-up' : 'chevron-down'} size={18} color="#3498DB" />
                  </TouchableOpacity>
                  {expandedGroups[cat.key] && (
                    <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingBottom: 6 }}>
                      {products.map((item) => (
                        <ProductItem
                          key={item.id}
                          product={item}
                          addToCart={addToCart}
                          openModal={openModal}
                          isInWishlist={isInWishlist}
                          toggleWishlist={toggleWishlist}
                        />
                      ))}
                    </View>
                  )}
                </View>
              );
            })
          )
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
          
            <View style={styles.modalImageContainer}>
              <Image 
                source={selectedProduct?.image} 
                style={styles.modalProductImage} 
                resizeMode="cover" 
              />
            </View>
          
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
    width: 130, 
    height: 130, 
    borderRadius: 15,
    marginRight: 15,
    resizeMode: 'contain',
    backgroundColor: '#F0F0F0',
    padding: 10, 
    alignSelf: 'center', 
    shadowColor: '#000', 
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
    width: 130,  
    height: 130,
    borderRadius: 15, 
    resizeMode: 'cover',
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
  tabBarContainer: {
    marginVertical: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  tabBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tabButtonActive: {
    backgroundColor: '#3498DB',
    borderColor: '#3498DB',
  },
  tabButtonText: {
    color: '#2C3E50',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  tabButtonTextActive: {
    color: '#fff',
  },
});
