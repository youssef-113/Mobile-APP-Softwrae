import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomSwipeNavigator";
import NotFoundScreen from "./screens/not-foundScreen";
import ProductsScreen from "./screens/ProductsScreen";
import DetailsScreen  from "./screens/DetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/contactScreen";


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
        {/* Bottom Tabs as the Main Entry Point */}
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }} // Hide header for bottom tabs
        />

        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "About" }} />
        <Stack.Screen name="Products" component={ProductsScreen} options={{ title: "Products" }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: "Contact Us" }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
