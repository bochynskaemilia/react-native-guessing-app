import React, { useState, useRef, useEffect } from 'react';
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

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice));
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = direction => {
    directionInvalid(direction) ?
      Alert.alert(
        'Wrong direction',
        'You must give the right direction',
        [{ text: 'Ok', style: 'cancel' }]
      ) :
      correctGuessHandler(direction);
  };

  const correctGuessHandler = direction => {
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

    setCurrentGuess(nextNumber);
    setRounds(currentRounds => currentRounds + 1);
  };

  const directionInvalid = direction => {
    return (direction === Direction.lower && currentGuess < userChoice) ||
      (direction === Direction.greater && currentGuess > userChoice);
  };

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, onGameOver, userChoice]);

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <Number>{currentGuess}</Number>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
    </View>
  );
};

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
