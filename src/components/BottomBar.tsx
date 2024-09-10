import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {clock} from '../helper/exportedFunction';
import {timeFormat} from '../utils/TimeFormat';

type BottomBarProps = {
  difficulty: number;
  duration: number;
};

const BottomBar: React.FC<BottomBarProps> = ({difficulty, duration}) => {
  const difficultyLevel =
    difficulty === 0
      ? 'Beginner'
      : difficulty === 1
      ? 'Intermediate'
      : 'Advanced';

  return (
    <View style={styles.bottomBar}>
      <Image source={clock} style={styles.bottomBarIcon} />
      <Text style={styles.bottomBarText}>{timeFormat(duration)}</Text>
      <Text style={styles.bottomBarText}>{difficultyLevel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    paddingHorizontal: 12,
    position: 'absolute',
    width: '100%',
    bottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  bottomBarIcon: {
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 50,
  },

  bottomBarText: {color: 'white', fontWeight: 'bold', fontSize: 18},
});

export default BottomBar;
