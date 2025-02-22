import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
export default function NotFoundScreen() {
      const navigation: NavigationProp<any> = useNavigation();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
           <Button
      title="Go to Details"
      onPress={() => navigation.navigate('about')}
    />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
