import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert
} from 'react-native';

import Direction from "../constants/direction";
import { generateRandomBetween } from "../functions";

import Number from "../components/Number";
import Card from "../components/Card";

const GameScreen = ({ userChoice }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice));
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = direction => {
    if ((direction === Direction.lower && currentGuess < userChoice) ||
      (direction === Direction.greater && currentGuess > userChoice)) {
      Alert.alert(
        'Wrong direction',
        'You must give the right direction',
        [{ text: 'Ok', style: 'cancel' }]
      );
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <Number>{currentGuess}</Number>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;
