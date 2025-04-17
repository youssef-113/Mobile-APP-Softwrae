import React from 'react';
import { View, TouchableOpacity, StyleSheet  } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabBar() {
  const router = useRouter();

  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.tabButton}>
        <FontAwesome name="home" size={20} color="#f5f5f5" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Products')} style={styles.tabButton}>
        <FontAwesome name="product-hunt" size={20} color="#f5f5f5" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/About')} style={styles.tabButton}>
        <FontAwesome name="info-circle" size={20} color="#f5f5f5" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/ContactUs')} style={styles.tabButton}>
        <FontAwesome name="envelope" size={20} color="#f5f5f5" />
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
    backgroundColor: '#5B9BD5',  
    position: 'absolute',
    bottom: 0,
    height: 70,
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