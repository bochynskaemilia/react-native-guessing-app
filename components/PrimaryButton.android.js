import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

import Colors from "../constants/colors";
import { Platform } from '@unimodules/core';

const PrimaryButton = props => {
  let Button = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback
  }

  return (
    <View style={styles.buttonContainer}>
      <Button activeOpacity={0.6} onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={styles.buttonText}>
            {props.children}
          </Text>
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

export default PrimaryButton;
