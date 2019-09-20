import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = number => {
    setRounds(number);
  };

  const newGameHandler = () => {
    setRounds(0);
    setUserNumber(null);
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={error => console.log(error)}
      />
    )
  }

  if (rounds > 0) {
    return (
      <GameOver
        onRestart={newGameHandler}
        userNumber={userNumber}
        rounds={rounds}
      />
    )
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
