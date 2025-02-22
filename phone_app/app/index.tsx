import { Link } from 'expo-router';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import about from './about';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';

// Define the types for navigation
type RootStackParamList = {
  About: undefined;
};

const { width: screenWidth } = Dimensions.get('window');

export default function Index() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [randomNumber] = useState<number>(Math.floor(Math.random() * 100));
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageSuccess, setMessageSuccess] = useState<string>('Success! You guessed the right number!');
  const [gameOver, setGameOver] = useState(false);

  const checkGuess = () => {
    const userGuess = parseInt(guess);
    if (isNaN(userGuess)) {
      setMessage('Please enter a valid number');
      return;
    }
    if (userGuess === randomNumber) {
      setMessageSuccess('Success! You guessed the right number! The guess was: ' + guess);
      setGameOver(true);
    } else if (userGuess < randomNumber) {
      setMessage('Higher!');
    } else {
      setMessage('Lower!');
    }
  };

  const resetGame = () => {
    setGuess('');
    setMessage('');
    setMessageSuccess('Success! You guessed the right number!');
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <Text style={styles.title}>Guess the Number between 0 and 99</Text>
        <TextInput 
          style={styles.input}
          placeholder="Enter your guess"
          keyboardType="numeric"
          value={guess}
          onChangeText={setGuess}
        />
        <Button title="Check" onPress={checkGuess} />
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.message}>Your guess is: {guess}</Text>
        <Text style={styles.message}>Then you must {message} it.</Text>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.resultMessage}>
          {gameOver ? messageSuccess : message}
        </Text>

        <Button title="Play Again" onPress={resetGame} />
        <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.button}>
          <Text style={styles.buttonText}>About details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.Text}>Home screen</Text>
        <Link href="/about" style={styles.button}>
          Go to About screen
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inputSection: { width: screenWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', padding: 10 },
  middleSection: { width: screenWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: 'cyan', padding: 10 },
  bottomSection: { width: screenWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow', padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  message: { fontSize: 18 },
  resultMessage: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  input: { borderWidth: 1, width: '80%', padding: 10, marginBottom: 10, textAlign: 'center' },
  button: { marginTop: 10, padding: 10, backgroundColor: 'blue', borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16 },
  Text: { fontSize: 20, margin: 20, color: 'white' }
});
