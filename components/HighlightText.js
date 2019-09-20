import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HighlightText = props => {
  return (
    <Text style={{ ...styles.highlight, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

export default HighlightText;