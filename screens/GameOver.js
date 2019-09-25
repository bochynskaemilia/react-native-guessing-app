import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

import BodyText from "../components/BodyText";
import Colors from '../constants/colors';
import HighlightText from "../components/HighlightText";
import PrimaryButton from "../components/PrimaryButton";

const GameOver = ({ rounds, userNumber, onRestart }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <HighlightText style={styles.text}>The Game is Over</HighlightText>
        <View style={Dimensions.get('window').width > 350 ? styles.imageContainer : styles.imageContainerSmall}>
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
    </ScrollView>
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
  imageContainerSmall: {
    marginVertical: 15,
    width: 180,
    maxWidth: '80%',
    height: 180,
    borderRadius: 90,
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
