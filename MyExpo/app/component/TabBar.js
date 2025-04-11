import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
export default function TabBar() {
  const router = useRouter();
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.tabButton}>
        <FontAwesome name="home" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Product')} style={styles.tabButton}>
        <FontAwesome name="product-hunt" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/About')} style={styles.tabButton}>
        <FontAwesome name="info-circle" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/contactScreen')} style={styles.tabButton}>
        <FontAwesome name="envelope" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 121, 107, 0.6)',  
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