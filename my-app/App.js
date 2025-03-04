import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ProductsScreen from "./screens/ProductsScreen"; // استيراد صفحة المنتجات

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" }, 
        headerTintColor: "#FFA500", 
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" }, 
      }}
    >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "About" }} />
        <Stack.Screen name="Products" component={ProductsScreen} options={{ title: "Products" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
