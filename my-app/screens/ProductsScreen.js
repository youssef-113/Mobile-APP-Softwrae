import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const productImages = {
  product1: require("../assets/car.png"),
  product2: require("../assets/car1.png"),
  product3: require("../assets/car2.png"),
  product4: require("../assets/icon.png"),
  product5: require("../assets/icon.png"),
  default: require("../assets/favicon.png"),
};

const productsData = [
  { id: "1", name: "ZOOBA", description: "This Is new item now is Avalible", price: "$10.99", image: productImages.product1 },
  { id: "2", name: "AZZA", description: "This is old item we Know that item and try to buy this more than one time for each other", price: "$20.99", image: productImages.product2 },
  { id: "3", name: "BR2BANZIN", description: "Item 3 is avalible now", price: "$15.99", image: productImages.product3 },
  { id: "4", name: "TMATM", description: "item 4 here", price: "$12.99", image: productImages.product4 },
  { id: "5", name: "CAR", description: "is new item is fantastic", price: "$22.99", image: productImages.default },
];

const ProductItem = ({ product }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const description =
    product.description.length > 50 && !showFullDescription
      ? product.description.substring(0, 50) + "..."
      : product.description;

  return (
    <View style={styles.productContainer}>
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{description}</Text>
        {product.description.length > 50 && !showFullDescription && (
          <TouchableOpacity onPress={() => setShowFullDescription(true)}>
            <Text style={styles.showMoreText}>Read More...</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </View>
  );
};

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {productsData.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFA500",
  },
  listContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  productContainer: {
    backgroundColor: "orange",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  productDescription: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: "center",
    color: "#fff",
  },
  showMoreText: {
    fontSize: 14,
    color: "#0000FF",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#008000",
  },
});
