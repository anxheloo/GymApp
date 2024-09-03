import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Feed from './components/Feed';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: Colors.darker,
    flex: 1,
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'red'}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Feed />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});

export default App;
