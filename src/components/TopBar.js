import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const TopBar = ({workoutTitle, storyTitle, profileUri}) => {
  return (
    <View style={styles.topBar}>
      <Image source={{uri: profileUri}} style={styles.logo} />
      <View style={styles.titlesContainer}>
        <Text style={styles.workoutTitle}>{workoutTitle}</Text>
        <Text style={styles.workoutSmallTitle}>{storyTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 12,
    position: 'absolute',
    width: '100%',
    top: 25,
    flexDirection: 'row',
    gap: 10,
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: 'red',
    resizeMode: 'contain',
  },

  titlesContainer: {
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  workoutTitle: {
    width: width - 96,
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
    flexShrink: 1,
  },

  workoutSmallTitle: {
    color: 'gray',
    fontSize: 12,
  },
});

export default TopBar;
