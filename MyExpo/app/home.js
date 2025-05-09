import React, { useState, useRef } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, Image,TouchableOpacity, ScrollView, StyleSheet , Dimensions , Platform } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { FontAwesome } from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';
import auth from '../firebase'; 
import TabBar from './component/TabBar';
import Chat from './chat';



const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const isWeb = Platform.OS === 'web'


const home = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
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
    require('../assets/images/free shipping.png'),
    require('../assets/images/Check new.png'),
    require('../assets/images/final transparent.png'),
  ];


  const offersData = [
    {
      name: 'Vitamin C 1000mg',
      image: require('../assets/images/1.jpg'),
      discount: 'Sale 30%'
    },
    {
      name: 'Zinc Plus Capsules',
      image: require('../assets/images/2.jpg'),
      discount: 'Sale 25%'
    },
    {
      name: 'Medical Sunscreen',
      image: require('../assets/images/3.jpg'),
      discount: 'Sale 15%'
    },
    {
      name: 'Anti-Dandruff Shampoo',
      image: require('../assets/images/4.jpg'),
      discount: 'Sale 20%'
    },
    {
      name: 'Anti-Dandruff Shampoo',
      image: require('../assets/images/4.jpg'),
      discount: 'Sale 20%'
    },
    {
      name: 'Anti-Dandruff Shampoo',
      image: require('../assets/images/4.jpg'),
      discount: 'Sale 20%'
    },
    {
      name: 'Anti-Dandruff Shampoo',
      image: require('../assets/images/4.jpg'),
      discount: 'Sale 20%'
    },
    {
      name: 'Anti-Dandruff Shampoo',
      image: require('../assets/images/4.jpg'),
      discount: 'Sale 20%'
    },
  ];

  const addToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Stack.Screen
        options={{
          headerStyle:styles.headerStyle,
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style ={ styles.forText}>
                Home
              </Text>
              <Image
                source={require('../assets/images/final transparent.png')}
                style ={styles.logo}
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
            <Image
              key={idx}
              source={img}
              style={styles.sliderImageModern}
              resizeMode="cover"
            />
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
              <Text style={styles.offerNameModern}>{offer.name}</Text>
              <Text style={styles.offerDiscountModern}>{offer.discount}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => scrollOffers('right')} style={styles.arrowButtonModern}>
          <FontAwesome name="chevron-right" size={22} color="#003366" />
        </TouchableOpacity>
      </View>

      <Image
          source={require('../assets/images/free shipping.png')}
          style ={styles.board}
        />
          <Link href='/Products' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shopping</Text>
            <FontAwesome name="shopping-cart" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        
        </Link>
        <Link href='/offers' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Offers</Text>
            <FontAwesome name="shopping-cart" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        
        </Link>
        <Link href='/BestSellers' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Best Seller</Text>
            <FontAwesome name="shopping-cart" size={20} color="#f5f5f5" />
          </TouchableOpacity>
        
        </Link>
         <Image
          source={require('../assets/images/Check new.png')}
          style ={styles.board}
        />

        <Link href='/NewArrivals' asChild> 
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText}>New arrivals</Text> 
            <FontAwesome name="shopping-cart" size={20} color="#f5f5f5" /> 
          </TouchableOpacity> 
        </Link>

        <View style={styles.separator} />

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
        </View>

           <View style={styles.container}>
      <TouchableOpacity

      
        style={styles.chatButton}
        onPress={() => router.push({ 
          pathname: '/chat'})}
      >
        <FontAwesome name="comment" size={24} color="white" />
        <Text style={styles.chatText}>Go to Chat</Text>
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
  chatText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
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
  // Modern Slider
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
  // Section Title Bar
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
  // Offers Row
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
  // Modern Offer Card
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
  offerNameModern: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 2,
    textAlign: 'center',
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
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
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
     height: isWeb? 100 : 120,
    
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
    width: isWeb ? 400 : width * 0.6,
    height: isWeb ? 400 : height * 2.5,
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