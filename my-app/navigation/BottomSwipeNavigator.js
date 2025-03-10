import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons"; // ✅ Import FontAwesome
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ProductsScreen from "../screens/ProductsScreen";
import NotFoundScreen from "../screens/not-foundScreen";
import ContactScreen from "../screens/contactScreen"; // ✅ Fix capitalization

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#222" }, // Dark theme
        tabBarActiveTintColor: "gold",
        tabBarInactiveTintColor: "darkgray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Details") {
            iconName = "list";
          } else if (route.name === "Products") {
            iconName = "shopping-cart"; // 🛒 Better icon for products
          } else {
            iconName = "exclamation-circle"; // ⚠️ NotFound screen
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen 
        name="Contact" 
        component={ContactScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <FontAwesome name="phone" color={color} size={size} /> 
        }} 
      />
    </Tab.Navigator>
  );
}
