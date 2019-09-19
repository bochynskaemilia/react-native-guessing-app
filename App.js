import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = number => {
    setRounds(number);
  }

  if (rounds > 0) {
    return <GameOver />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess the Number" />
      {
        userNumber ?
          (
            <GameScreen onGameOver={gameOverHandler} userChoice={userNumber} />
          ) :
          (
            <StartGameScreen onStartGame={startGameHandler} />
          )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
