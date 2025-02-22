import { Text, View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
export default function AboutScreen() {
  return (
    <View style={styles.container}>
          <Text style={styles.text}>About screen</Text>
          <h1>this is information about my team!</h1>
          <p>
              names is : Youssef bassiouny <br />
                          
          </p>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
