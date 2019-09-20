import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image
} from 'react-native';

import BodyText from "../components/BodyText";
import Colors from '../constants/colors';
import HighlightText from "../components/HighlightText";
import PrimaryButton from "../components/PrimaryButton";

const GameOver = ({ rounds, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <HighlightText style={styles.text}>The Game is Over</HighlightText>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/success.png')} />
      </View>
      <BodyText style={styles.text}>
        Your phone needed
        <Text style={styles.heighlight}> {rounds} </Text>
        rounds to guess the number
        <Text style={styles.heighlight}> {userNumber} </Text>
      </BodyText>
      <View style={styles.buttonContainter}>
        <PrimaryButton onPress={onRestart}>NEW GAME</PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
  },
  text: {
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    marginVertical: 30,
    width: 200,
    maxWidth: '80%',
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  heighlight: {
    color: Colors.primary
  },
  buttonContainter: {
    margin: 20
  }
});

export default GameOver
