import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Platform, Dimensions } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Stack, useRouter } from 'expo-router'; 
import TabBar from './component/TabBar';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const offersData = [
  {
    name: 'Vitamin C 1000mg',
    image: require('../assets/images/1.jpg'),
    discount: 'Sale 30%',
    description: 'Boosts immunity and improves skin health.',
    price: '100 EGP',
    moreDetails: 'Helps protect against immune system deficiencies, cardiovascular disease, prenatal health problems, and skin wrinkling.'
  },
   {
    name: 'Signal',
    image: require('../assets/images/Signal.png'),
    discount: 'Sale 30%',
    description: 'Tooth health.',
    price: ' Sale 100 EGP',
    moreDetails: 'Toothpaste plays a crucial role in maintaining oral health. Even a small amount is effective in removing plaque, preventing cavities, and strengthening enamel due to ingredients like fluoride. It also helps freshen breath and reduce the risk of gum disease. Using the right amount—about a pea-sized drop—is both safe and efficient, especially for daily brushing. Neglecting toothpaste, even when brushing, means missing out on these essential benefits.'
  },
 
   {
    name: 'Mask',
    image: require('../assets/images/Mask.png'),
    discount: 'Sale 30%',
    description: 'general health.',
    price: '300 EGP',
    moreDetails: 'It seems like you are asking about "Pampers," which is a popular brand of diapers. If you are looking for important keywords or terms related to Pampers (the diaper brand), here are a few:'
  },
  {
    name: 'Zinc Plus Capsules',
    image: require('../assets/images/2.jpg'),
    discount: 'Sale 25%',
    description: 'Supports immune system and overall wellness.',
    price: '80 EGP',
    moreDetails: `✅ Immune System Support\n✅ Enhances Wound Healing\n✅ Hormonal Balance\n✅ Reduces Inflammation\n✅ Essential Daily Supplement`
  },
  {
    name: 'Medical Sunscreen',
    image: require('../assets/images/3.jpg'),
    discount: 'Sale 15%',
    description: 'Protects skin from harmful UV rays.',
    price: '120 EGP',
    moreDetails: 'Offers broad-spectrum protection, prevents premature aging, and reduces risk of skin cancer.'
  },
  {
    name: 'Shampoo',
    image: require('../assets/images/Sh.png'),
    discount: 'Sale 20%',
    description: 'Fights dandruff and nourishes scalp.',
    price: '75 EGP',
    moreDetails: 'Contains active ingredients like ketoconazole or zinc pyrithione, soothes itching, and restores scalp health.'
  },
  {
    name: 'Massage gel',
    image: require('../assets/images/Gel.png'),
    description: 'Massage gel from Zeafelex',
    discount:' Sale 20%',
    price: '60.99 EGP',
    moreDetails: `✅ Fast-Acting Relief\n✅ Gentle on the Skin\n✅ All-Natural Ingredients\n✅ Safe for All Ages\n✅ Long-Lasting Effects`
  }
];

export default function NewArrivals() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();

  const isMedicine = (itemName) => {
    return /vitamin|zinc|Massage gel|Medical Sunscreen|capsules/i.test(itemName);
  };

  const medicineItems = offersData.filter(offer => isMedicine(offer.name));
  const medicalProductItems = offersData.filter(offer => !isMedicine(offer.name));

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowMore(false);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
    setShowMore(false);
  };

  const renderItems = (items) => (
    <View style={styles.sectionContainer}>
      {items.map((offer, idx) => (
        <View key={idx} style={styles.gridCard}>
          <Image source={offer.image} style={styles.gridImage} resizeMode="cover" />
          <Text style={styles.gridName}>{offer.name}</Text>
          <Text style={styles.gridDescription}>{offer.discount}</Text>
          <Text style={styles.gridPrice}>{offer.price}</Text>

          <TouchableOpacity style={styles.detailsButton} onPress={() => openModal(offer)}>
            <Text style={styles.detailsButtonText}>Details</Text>
            <FontAwesome name="info-circle" size={16} color="red" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.forView}>
              <Text style={styles.forText}>offers</Text>
              <Image source={require('../assets/images/final transparent.png')} style={styles.logo} />
            </View>
          ),
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={styles.sectionTitle}>Medicines</Text>
        {renderItems(medicineItems)}

        <Text style={styles.sectionTitle}>Medical Products</Text>
        {renderItems(medicalProductItems)}
      </ScrollView>

      {selectedProduct && (
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={selectedProduct.image} style={{ width: 100, height: 100, marginBottom: 10 }} />
              <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
              <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
              <Text style={styles.modalPrice}>{selectedProduct.price}</Text>

              {!showMore && (
                <TouchableOpacity onPress={() => setShowMore(true)} style={styles.seeMoreButton}>
                  <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
              )}

              {showMore && selectedProduct.moreDetails && (
                <Text style={styles.modalMoreDetails}>{selectedProduct.moreDetails}</Text>
              )}

              <TouchableOpacity
                onPress={() => {
                  closeModal();
                  router.push({
                    pathname: '/Products',
                    params: {
                      name: selectedProduct.name,
                      price: selectedProduct.price,
                      description: selectedProduct.description,
                      moreDetails: selectedProduct.moreDetails,
                    },
                  });
                }}
                style={styles.goToProductButton}
              >
                <Text style={styles.goToProductButtonText}>Go to the product to buy it</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <TabBar />
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginVertical: 8,
    color: '#003366',
  },
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  gridImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  gridName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#003366',
    marginBottom: 4,
    textAlign: 'center',
  },
  gridDescription: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  gridPrice: {
    color: '#336699',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  logo: {
    width: isWeb ? 300 : width * 0.6,
    height: isWeb ? 300 : height * 0.25,
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
  headerStyle: {
    backgroundColor: '#5B9BD5',
    height: isWeb ? 100 : 120,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F0FFFF',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalDescription: {
    fontSize: 16,
    color: '#003366',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  modalMoreDetails: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FFF3E0',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    textAlign: 'left',
    lineHeight: 20,
  },
  seeMoreButton: {
    backgroundColor: '#003366',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 10,
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  goToProductButton: {
    marginTop: 15,
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 8,
  },
  goToProductButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
