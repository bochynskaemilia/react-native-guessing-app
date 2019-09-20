import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Direction from "../constants/direction";
import { generateRandomBetween } from "../functions";

import Number from "../components/Number";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import PrimaryButton from "../components/PrimaryButton";
import HighlightText from '../components/HighlightText';
import ListItem from "../components/ListItem";

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

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
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

    setCurrentGuess(nextNumber);
    setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses]);
  };

  const directionInvalid = direction => {
    return (direction === Direction.lower && currentGuess < userChoice) ||
      (direction === Direction.greater && currentGuess > userChoice);
  };

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, onGameOver, userChoice]);

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's guess</BodyText>
      <Number>{currentGuess}</Number>
      <Card style={styles.buttonContainer}>
        <PrimaryButton style={styles.button} onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons
            name="md-remove"
            size={24}
            color="white"
          />
        </PrimaryButton>
        <PrimaryButton style={styles.button} onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons
            name="md-add"
            size={24}
            color="white"
          />
        </PrimaryButton>
      </Card>
      <View style={styles.list}>
        <ScrollView contentContainerStyle={styles.listContent}>
          {pastGuesses.map((guess, index) =>
            ListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
        <HighlightText>Past guesses</HighlightText>
      </View>
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
    maxWidth: '50%'
  },
  button: {
    fontSize: 14,
    paddingHorizontal: 15
  },
  list: {
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'flex-end'
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});

export default GameScreen;
