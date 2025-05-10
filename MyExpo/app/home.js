import React, { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import { View, Text, Image,TouchableOpacity, ScrollView, StyleSheet , Dimensions , Platform } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';
import auth from '../firebase'; 
import TabBar from './component/TabBar';
import chat from './chat'



const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const isWeb = Platform.OS === 'web'


const home = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const offersScrollRef = useRef(null);

  const scrollOffers = (direction) => {
    if (offersScrollRef.current) {
      offersScrollRef.current.scrollTo({
        x: direction === 'right' ? 200 : 0,
        animated: true,
      });
    }
  };

  const sliderImages = [
    require('../assets/images/aw.jpeg'),
    require('../assets/images/az.jpeg'),
    require('../assets/images/am.jpeg'),
    require('../assets/images/as.jpeg'),
  ];


  const offersData = [
    {
      name: 'Vitamin C 1000mg',
      image: require('../assets/images/1.jpg'),
      discount: 'Sale 30%',
      price: 100
    },
    {
      name: 'Zinc Plus Capsules',
      image: require('../assets/images/2.jpg'),
      discount: 'Sale 25%',
      price: 80
    },
    {
      name: 'Medical Sunscreen',
      image: require('../assets/images/3.jpg'),
      discount: 'Sale 15%',
      price: 120
    },
    {
      name: 'Anti-Dandruff Shampoo',
      image: require('../assets/images/4.jpg'),
      discount: 'Sale 20%',
      price: 90
    },
    {
      name: 'Anti-Dandruff Shampoo',
      image: require('../assets/images/36.jpg'),
      discount: 'Sale 20%',
      price: 90
    },
    {
      name: 'Anti-Dandruff Shampoo',
      image: require('../assets/images/38.jpg'),
      discount: 'Sale 20%',
      price: 90
    },
    {
      name: 'Mask',
      image: require('../assets/images/40.jpg'),
      discount: 'Sale 20%',
      price: 90
    },
    {
      name: 'Shampoo',
      image: require('../assets/images/39.jpg'),
      discount: 'Sale 20%',
      price: 90
    },
  ];

  const addToCart = (product) => {
   
    setCartItems((prevCart) => {
      const foundIdx = prevCart.findIndex(item => item.name === product.name);
      if (foundIdx !== -1) {
    
        const updatedCart = [...prevCart];
        updatedCart[foundIdx].quantity = (updatedCart[foundIdx].quantity || 1) + 1;
        return updatedCart;
      } else {
        
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Stack.Screen
        options={{
          headerStyle: [styles.headerStyle, {height: 140}],
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style={styles.forText}>Home</Text>
              <Image
                source={require('../assets/images/final transparent.png')}
                style={styles.logo}
              />
            </View>
          ),
        }}
      />
      <StatusBar style="dark" backgroundColor="#000" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.headerWelcomeSection}>
  <Image source={require('../assets/images/final transparent.png')} style={styles.headerLogoSmall} />
  <Text style={styles.title1}>Welcome to <Text style={styles.brandAccent}>Pharma Tech</Text></Text>
  <Text style={styles.subtitle}>Your health matters to us, our services are always with you</Text>
</View>

      <View style={styles.sliderContainerModern}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          showsPagination={true}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          containerStyle={styles.swiperStyle}
        >
          {sliderImages.map((img, idx) => (
            <View
              key={idx}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
             
              <Image
                source={img}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  opacity: 0.3,
                }}
                blurRadius={8}
              />
             
              <Image
                source={img}
                style={{
                  width: '90%',
                  height: '90%',
                  resizeMode: 'contain',
                }}
              />
            </View>
          ))}
        </Swiper>
      </View>

      <View style={styles.sectionTitleBar}>
        <Text style={styles.sectionTitle}>🔥 Best Offers</Text>
        <TouchableOpacity onPress={() => router.push('/offers')}>
          <Text style={styles.seeAllBtnModern}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.offersRowWrapper}>
        <TouchableOpacity onPress={() => scrollOffers('left')} style={styles.arrowButtonModern}>
          <FontAwesome name="chevron-left" size={22} color="#003366" />
        </TouchableOpacity>
        <ScrollView
          horizontal
          ref={offersScrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offersListModern}
          style={{ flex: 1 }}
        >
          {offersData.map((offer, idx) => (
            <View key={idx} style={styles.offerCardModern}>
              <Image source={offer.image} style={styles.offerImageModern} />
              <Text style={styles.offerName}>{offer.name}</Text>
              <Text style={styles.offerDiscountModern}>{offer.discount}</Text>
              <Text style={{color: '#003366', fontWeight: 'bold', marginVertical: 2}}>{offer.price} جنيه</Text>
              <TouchableOpacity style={{backgroundColor:'#00796B',padding:5,borderRadius:6,marginTop:4}} onPress={() => addToCart(offer)}>
                <Text style={{color:'#fff',fontWeight:'bold'}}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => scrollOffers('right')} style={styles.arrowButtonModern}>
          <FontAwesome name="chevron-right" size={22} color="#003366" />
        </TouchableOpacity>
      </View>



      <View style={[styles.categoriesSection, {marginTop: 15, marginBottom: 20}]}> 
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%', marginBottom:8}}>
          <TouchableOpacity style={styles.seeAllBtn} onPress={() => router.push('/Products')}>
            <Text style={styles.seeAllText}>show all</Text>
            <FontAwesome name="arrow-right" size={16} color="#00796B" />
          </TouchableOpacity>
          <Text style={styles.categoriesTitle}>Shop by department</Text>
        </View>
        <View style={styles.categoriesGridWrapper}>
  {[0, 1].map(col => (
    <View key={col} style={styles.categoriesGridColumn}>
      {[
        { key: 'Antibiotics', label: 'Antibiotics', image: require('../assets/images/10.jpeg') },
        { key: 'Painkillers', label: 'Painkillers', image: require('../assets/images/1.jpg') },
        { key: 'Cardiovascular', label: 'Cardiovascular', image: require('../assets/images/3.jpg') },
        { key: 'Supplements', label: 'Supplements', image: require('../assets/images/4.jpg') },
        { key: 'Others', label: 'Baby products', image: require('../assets/images/2.jpg') },
        { key: 'Favorites', label: 'Favorites', image: require('../assets/images/1.jpg') },
      ]
        .filter((_, idx) => idx % 2 === col)
        .map(cat => (
          <View key={cat.key} style={{alignItems:'center', marginVertical:10}}>
  <TouchableOpacity style={styles.categoryCircle} onPress={() => router.push('/Products')}>
    <Image source={cat.image} style={styles.categoryCircleImage} />
  </TouchableOpacity>
  <Text style={styles.categoryLabelUnder}>{cat.label}</Text>
</View>
        ))}
    </View>
  ))}
</View>


      </View>

      
      <View style={[styles.categoriesSection, {marginTop: 15, marginBottom: 20}]}> 
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%', marginBottom:8}}>
          <TouchableOpacity style={styles.seeAllBtn} onPress={() => router.push('/offers')}>
            <Text style={styles.seeAllText}>show all</Text>
            <FontAwesome name="arrow-right" size={16} color="#00796B" />
          </TouchableOpacity>
          <Text style={styles.categoriesTitle}>Until stock runs out</Text>
        </View>
        <View style={styles.categoriesList}>
          {[
            { key: 'Supplements', label: 'Supplements', image: require('../assets/images/muscle.jpg') },
            { key: 'Others', label: 'Baby products', image: require('../assets/images/baby.jpg') },
            { key: 'Favorites', label: 'skin cares', image: require('../assets/images/sun.jpg') },
          ].map((cat, idx) => (
            <View key={cat.key} style={{alignItems:'center', flexBasis:'48%', marginBottom: 16}}>
              <TouchableOpacity
                style={[styles.categoryCard, (idx === 2 || idx === 5) && {backgroundColor: '#e0e0e0'}]}
                onPress={() => router.push({ pathname: '/offerdetails', params: { name: cat.label, discount: 'Sale 20%', image: cat.image } })}
                activeOpacity={0.85}
              >
                <View style={styles.imageBgCircle}>
                  <Image source={cat.image} style={styles.categoryImage} resizeMode="cover" />
                </View>
              </TouchableOpacity>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.push({ 
            pathname: '/Cart', 
            params: { cartItems: JSON.stringify(cartItems) } 
          })} 
          style={styles.cartIcon}
        >
          <FontAwesome name="shopping-cart" size={24} color="#003366" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatIcon}
          onPress={() => router.push({ pathname: '/chat'})}>
          <FontAwesome name="comment" size={24} color="#003366" />
        </TouchableOpacity>
      </View>
        <Link href='About' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>About Us </Text>
            <FontAwesome name="info-circle" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        </Link>

      </ScrollView>
      <TabBar />
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  offerCardSquare: {
    width: 120,
    height: 155,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 14,
    marginBottom: 8,
    paddingTop: 10,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1.2,
    borderColor: '#F3F6FB',
  },
  offerImageSquare: {
    width: 75,
    height: 75,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  offerDiscountBadge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#D32F2F',
    alignSelf: 'center',
  },
  offerDiscountBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  categoriesGridWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  categoriesGridColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
  },
  categoryCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryCircleImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 0,
  },
  categoryLabelUnder: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
    color: '#003366',
    fontWeight: '600',
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  categoryCardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginBottom: 16,
  },
  categoryCard: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 5,
  },
  imageBgCircle: {
    width: 72,
    height: 72,
    backgroundColor: '#fff',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  headerTitleContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 18,
    minHeight: isWeb ? 120 : 140,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 8,
    paddingHorizontal: 12,
  },
  headerSearchBar: {
    width: '65%',
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#222',
    marginRight: 24,
    marginTop: 12,
    alignSelf: 'flex-end',
    elevation: 2,
    shadowColor: '#003366',
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
 
  headerWelcomeSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  headerLogoSmall: {
    width: 60,
    height: 60,
    borderRadius: 18,
    marginBottom: 7,
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  brandAccent: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 28,
  },
 
  sliderContainerModern: {
    width: isWeb ? Math.min(1000, width * 0.93) : width * 0.97,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  sliderImageModern: {
    width: '100%',
    height: 200,
    borderRadius: 18,
  },
 
  sectionTitleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: isWeb ? Math.min(1000, width * 0.93) : width * 0.97,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 7,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    letterSpacing: 0.5,
  },
  seeAllBtnModern: {
    color: '#fff',
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontWeight: 'bold',
    fontSize: 15,
    overflow: 'hidden',
    elevation: 2,
  },
 
  offersRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: isWeb ? Math.min(1000, width * 0.93) : width * 0.97,
    alignSelf: 'center',
    marginBottom: 16,
  },
  arrowButtonModern: {
    backgroundColor: '#E3EAFD',
    borderRadius: 18,
    padding: 8,
    marginHorizontal: 2,
    elevation: 2,
  },
  offersListModern: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
 
  offerCardModern: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 14,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1.2,
    borderColor: '#F3F6FB',
    transition: 'transform 0.2s',
  },
  offerImageModern: {
    width: 90,
    height: 70,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#F5F6FA',
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#003366',
    marginBottom: 0,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  seeAllText: {
    color: '#00796B',
    fontWeight: 'bold',
    fontSize: 15,
  },
  offerDiscountModern: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 13,
    backgroundColor: '#FCE4EC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 7,
    marginTop: 2,
  },
  offersSection: {
    width: isWeb ? Math.min(1000, width * 0.95) : width * 0.98,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  offersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  offersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  seeAllBtn: {
    color: '#00796B',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 4,
  },
  offersList: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  arrowButton: {
    padding: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginHorizontal: 2,
    elevation: 2,
  },
  offerCard: {
    width: 110, 
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    padding: 8,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  offerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 6,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  offerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  offerDiscount: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sliderContainer: {
    width: isWeb ? Math.min(1000, width * 0.9) : width * 0.95,
    height: 220,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  swiperStyle: {
    borderRadius: 15,
  },
  sliderImage: {
    width: '100%',
    height: 220,
    borderRadius: 15,
  },
  dotStyle: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: '#003366',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  separator: {
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 12, 
  width: '90%', 
  alignSelf: 'center',
},

  headerStyle: {
     backgroundColor: '#5B9BD5',
     height: isWeb? 200 : 220, 
  },
  searchBar: {
    width: isWeb ? 400 : '90%',
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    fontSize: 17,
    color: '#222',
    marginTop: 14,
    marginBottom: 0,
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#003366',
    shadowOpacity: 0.09,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  
  board: {
    width: isWeb ? Math.min(1000, width * 0.9) : width * 1.5,
    height: 300, 
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    alignSelf: 'center', 
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
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 100,
    backgroundColor: '#F5F5F5',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },
  chatIcon: {
    position: 'relative',
    padding: 10,
    marginLeft: 10,
    color:'#F5F5F5',
  },
  cartIcon: {
    position: 'relative',
    padding: 10,
    color:'#F5F5F5'
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: '#191716',
    marginTop:50,

  },
 
  subtitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 25,
    marginRight:50,
    marginLeft:50,
  },
  categoriesTitle: {
    fontSize: 28,
    color: '#003366',
    fontWeight: 'bold',
    marginBottom: 11,
    textAlign: 'right',
    marginRight: 12,
  },
  button: {
    width: '90%',
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
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
});