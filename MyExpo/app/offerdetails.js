import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import TabBar from './component/TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function OfferDetails() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.headerStyle,
      headerBackVisible: true,
      headerTitle: () => (
        <View style={styles.forView}>
          <Text style={
            params.name === 'Supplements' || params.name === 'supplements' ||
            params.name === 'skin care' || params.name === 'skin cares' ||
            params.name === 'Baby products' || params.name === 'baby products'
              ? [styles.forText, { fontSize: 16 }]
              : styles.forText
          }>
            {params.name || 'Offer Details'}
          </Text>
          <Image source={require('../assets/images/final transparent.png')} style={[styles.logo, { width: 180, height: 180 }]} />
        </View>
      ),
    });
  }, [navigation, params.name]);

  const handleAddToCart = async () => {
    try {
      const item = {
        name: params.name,
        discount: params.discount,
        image: params.image,
        oldPrice: 155,
        price: 100,
        quantity: 1,
      };

      const existingCart = await AsyncStorage.getItem('cartItems');
      let cartArr = existingCart ? JSON.parse(existingCart) : [];

      const foundIdx = cartArr.findIndex(p => p.name === item.name);
      if (foundIdx !== -1) {
        cartArr[foundIdx].quantity += 1;
      } else {
        cartArr.push(item);
      }
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartArr));
      if (Platform.OS === 'android') {
        ToastAndroid.show('تمت إضافة المنتج إلى السلة 🛒', ToastAndroid.SHORT);
      } else {
        alert('تمت إضافة المنتج إلى السلة 🛒');
      }

    } catch (e) {
      alert('حدث خطأ أثناء إضافة المنتج للسلة');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.cardWrapper}>
          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={
                (params.name === 'Pampers' || params.name === 'Baby products') ? require('../assets/images/Pamper.png') :
                  (params.name === 'skin care' || params.name === 'skin cares') ? require('../assets/images/olay.jpg') :
                    require('../assets/images/1.jpg')
              }
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.discountBadgeOverlay}>
              <Text style={styles.discountText}>{
                (params.name === 'Pampers' || params.name === 'Baby products') ? 'خصم 40%' :
                  (params.name === 'skin care' || params.name === 'skin cares') ? 'خصم 50%' :
                    'خصم 35%'
              }</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <View style={styles.priceRow}>
              {(params.name === 'Pampers' || params.name === 'Baby products') ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.oldPrice, { marginLeft: 8, textDecorationLine: 'line-through', color: '#c00' }]}>400 EGPP</Text>
                  <Text style={[styles.currentPrice, { color: '#388e3c', fontWeight: 'bold', marginLeft: 8 }]}>250 EGP</Text>
                </View>
              ) : (params.name === 'skin care' || params.name === 'skin cares') ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.oldPrice, { marginLeft: 8, textDecorationLine: 'line-through', color: '#c00' }]}>500 EGP</Text>
                  <Text style={[styles.currentPrice, { color: '#388e3c', fontWeight: 'bold', marginLeft: 8 }]}>250 EGP</Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.oldPrice}>155 EGP</Text>
                  <Text style={styles.currentPrice}>100 EGP</Text>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.addToCartWideButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartWideText}>Add to Cart 🛒</Text>
          </TouchableOpacity>

          <Text style={styles.name}>{params.name}</Text>

          {(params.name === 'Pampers' || params.name === 'Baby products') ? (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>معلومات عن المنتج:</Text>
              <Text style={styles.sectionContent}>
              حفاظات بامبرز توفر حماية فائقة ضد التسريب وراحة تدوم طوال اليوم. مصنوعة من مواد آمنة وناعمة على بشرة الأطفال، وتتميز بامتصاص عالي وسهولة في الاستخدام. مناسبة لجميع الأعمار وتساعد في الحفاظ على جفاف طفلك
              </Text>
            </View>
          ) : (params.name === 'skin care' || params.name === 'skin cares') ? (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>معلومات عن المنتج:</Text>
              <Text style={styles.sectionContent}>
              كريم أولاي للعناية بالبشرة: تركيبة متطورة لترطيب البشرة بعمق، تقليل التجاعيد، وتوحيد لون البشرة. يحتوي على فيتامينات ومغذيات تساعد على تجديد الخلايا ومنح البشرة نعومة وإشراقة صحية. مناسب للاستخدام اليومي لجميع أنواع البشرة
              </Text>
            </View>
          ) : (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>معلومات عن المنتج:</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>الاستخدام:</Text>
                <Text style={styles.infoValue}>مكمل غذائي لتحسين الصحة العامة ودعم المناعة.</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>التحذيرات:</Text>
                <Text style={styles.infoValue}>يُحفظ بعيدًا عن متناول الأطفال. لا تتجاوز الجرعة الموصى بها.</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>الشركة المصنعة:</Text>
                <Text style={styles.infoValue}>Pharma Tech</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginTop: 40,
    marginHorizontal: isWeb ? '30%' : 24,
    alignItems: 'center',
    padding: 24,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
    textAlign: 'center',
  },
  discountBadge: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  discountBadgeOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignSelf: 'center',
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  addToCartWideButton: {
    marginTop: 36,
    width: '95%',
    backgroundColor: '#00796B',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartWideText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  oldPrice: {
    color: '#888',
    textDecorationLine: 'line-through',
    fontSize: 17,
    marginRight: 9,
    fontWeight: '500',
  },
  currentPrice: {
    color: '#e53935',
    fontSize: 21,
    fontWeight: 'bold',
  },
  innerSmallImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 0,
  },
  forView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  forText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#003366',
    marginRight: 8,
    flex: 1,
    flexShrink: 1,
  },
  logo: {
    width: 65,
    height: 65,
    marginLeft: 20,
    borderRadius: 16,
  },
  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb ? 200 : 120,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  headerWelcomeSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  headerLogoSmall: {
    width: 54,
    height: 54,
    borderRadius: 12,
    marginBottom: 6,
  },
  title1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 3,
  },
  brandAccent: {
    fontSize: 28,
    color: '#00796B',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 7,
    textAlign: 'center',
  },

  infoSection: {
    marginTop: 28,
    padding: 16,
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    marginHorizontal: 4,
    marginBottom: 12,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#003366',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#00796B',
    minWidth: 80,
  },
  infoValue: {
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  discountBadge: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  discountBadgeOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignSelf: 'center',
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  addToCartWideButton: {
    marginTop: 36,
    width: '95%',
    backgroundColor: '#00796B',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartWideText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  oldPrice: {
    color: '#888',
    textDecorationLine: 'line-through',
    fontSize: 17,
    marginRight: 9,
    fontWeight: '500',
  },
  currentPrice: {
    color: '#e53935',
    fontSize: 21,
    fontWeight: 'bold',
  },
  innerSmallImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 0,
  },
  forView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  forText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#003366',
    marginRight: 8,
    flex: 1,
    flexShrink: 1,
  },
  logo: {
    width: 65,
    height: 65,
    marginLeft: 20,
    borderRadius: 16,
  },
  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb ? 200 : 120,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  headerWelcomeSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  headerLogoSmall: {
    width: 54,
    height: 54,
    borderRadius: 12,
    marginBottom: 6,
  },
  title1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 3,
  },
  brandAccent: {
    fontSize: 28,
    color: '#00796B',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 7,
    textAlign: 'center',
  },

  infoSection: {
    marginTop: 28,
    padding: 16,
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    marginHorizontal: 4,
    marginBottom: 12,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#003366',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#00796B',
    minWidth: 80,
  },
});
