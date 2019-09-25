import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Colors from '../constants/colors';

import Card from "../components/Card";
import Input from "../components/Input";
import Number from "../components/Number";
import BodyText from "../components/BodyText";
import PrimaryButton from "../components/PrimaryButton";

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateWidth = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }

    Dimensions.addEventListener('change', updateWidth);
    return () => {
      Dimensions.removeEventListener('change', updateWidth)
    };
  })

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    isInvalid(chosenNumber) ?
      Alert.alert(
        'Invalid Number',
        'The entered value has to be a number between 1 and 99',
        [{ text: 'Got it', style: 'destructive', onPress: resetInputHandler }]
      ) :
      correctValueHandler(chosenNumber);
  };

  const correctValueHandler = chosenNumber => {
    setConfirmed(true);
    setSelectedNumber(parseInt(chosenNumber));
    setEnteredValue('');
    Keyboard.dismiss();
  };

  const isInvalid = chosenNumber => {
    return isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99;
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You've selected </BodyText>
        <Number>{selectedNumber}</Number>
        <PrimaryButton onPress={() => onStartGame(selectedNumber)}>START GAME</PrimaryButton>
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30} >
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonsContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={Colors.secondary}
                    title="Reset"
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={Colors.primary}
                    title="Confirm"
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: "center"
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 10
  },
  input: {
    width: '30%',
    textAlign: "center"
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
