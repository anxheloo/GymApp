import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Workout = ({details}) => {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={windowWidth}
        height={windowHeight - 40}
        // autoPlay={true}
        autoPlayInterval={3000}
        data={details.routines}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => (
          <ImageBackground>
            <Text>{item.name}</Text>
          </ImageBackground>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight - 40,
    borderRadius: 6,
    backgroundColor: 'gray',
    overflow: 'hidden',
  },
});

export default Workout;
