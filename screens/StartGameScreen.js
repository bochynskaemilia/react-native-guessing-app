import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import Colors from '../constants/colors';

import Card from "../components/Card";
import Input from "../components/Input";

const StartGameScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card styles={styles.inputContainer}>
        <Text>Select a Number</Text>
        <Input styles={styles.input} />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button
              color={Colors.secondary}
              title="Reset"
              onPress={() => { }}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title="Confirm"
              onPress={() => { }}
            />
          </View>
        </View>
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
  buttonsContainer: {
    flexDirection: "row",
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  button: {
    width: 100
  },
  input: {
    width: '30%',
    textAlign: "center"
  }
});

export default StartGameScreen;
