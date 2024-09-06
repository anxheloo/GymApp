import React from 'react';
import {StyleSheet, View, ImageBackground, Text} from 'react-native';

const SpecificWorkout = ({details, index}) => {
  return (
    <ImageBackground style={styles.imageBgContainer}>
      <Text>{details.name}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
  },
});

export default SpecificWorkout;
