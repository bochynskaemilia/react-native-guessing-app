import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from "../constants/colors";

import BodyText from "./BodyText";

const ListItem = (value, numOfRounds) => {
  return (
    <View style={styles.listItem} key={value}>
      <BodyText>#{numOfRounds}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.lineColor,
    borderRightWidth: 1,
    borderRadius: 3,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default ListItem;
