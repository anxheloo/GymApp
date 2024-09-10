import React, {memo, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {StoryComponentProps} from '../helper/exportedFunction';
import VideoComponent from './VideoComponent';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const {width, height} = Dimensions.get('window');

const StoryComponent: React.FC<StoryComponentProps> = ({
  stories,
  scrollTo,
  isVisible,
  workoutIndex,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef<any>(null);

  const goToNextStory = () => {
    progressAnimation.setValue(0);
    if (currentStoryIndex < stories.routines.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      carouselRef.current?.next();
    } else {
      scrollTo(workoutIndex);
    }
  };

  const goToPreviousStory = () => {
    progressAnimation.setValue(0);
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      carouselRef.current?.prev();
    }
  };

  const handlePress = (event: GestureResponderEvent): void => {
    const touchX = event.nativeEvent.locationX;

    if (touchX < width / 2) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const getProgressBarWidth = (index: number) => {
    if (currentStoryIndex > index) {
      return '100%';
    }
    if (currentStoryIndex === index) {
      return progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      });
    }
    return '0%';
  };

  const runProgressAnimation = () => {
    progressAnimation.setValue(0);
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        goToNextStory();
      }
    });
  };

  useEffect(() => {
    if (isVisible) {
      setCurrentStoryIndex(0);
      carouselRef.current?.scrollTo({index: 0});

      runProgressAnimation();
    } else {
      progressAnimation.setValue(0);
    }
  }, [isVisible]);

  return (
    <View style={styles.mainContainer}>
      {isVisible && (
        <View style={styles.progressBarContainer}>
          {stories?.routines?.map((story, index: number) => (
            <View style={styles.progressBarBackground} key={index}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: getProgressBarWidth(index),
                  },
                ]}
              />
            </View>
          ))}
        </View>
      )}

      {!isVisible ? (
        <ActivityIndicator
          size="small"
          color="#fff"
          style={[styles.viewContainer]}
        />
      ) : (
        <Carousel
          ref={carouselRef}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          width={width}
          height={height - 26}
          data={stories.routines}
          scrollAnimationDuration={500}
          onSnapToItem={idx => {
            progressAnimation.setValue(0);
            setCurrentStoryIndex(idx);
            runProgressAnimation();
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={event => handlePress(event)}
                style={({pressed}) => [
                  {opacity: pressed ? 0.9 : 1},
                  styles.container,
                ]}>
                <View style={styles.viewContainer}>
                  <View pointerEvents="none" style={styles.backgroundImage}>
                    <VideoComponent
                      uri={item.video?.playlist_url}
                      isVisible={index === currentStoryIndex}
                    />
                  </View>

                  <TopBar
                    workoutTitle={stories?.name}
                    storyTitle={item?.name}
                    profileUri={stories?.user?.profile_photo_url}
                  />

                  <BottomBar
                    difficulty={stories?.difficulty}
                    duration={stories?.total_duration}
                  />
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
    height: height,
  },

  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 13,
    overflow: 'hidden',
  },

  viewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius: 18,
    overflow: 'hidden',
  },

  progressBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: 3,
    position: 'absolute',
    left: 13,
    right: 13,
    marginHorizontal: 'auto',
    top: 25,
    zIndex: 9999999,
  },

  progressBarBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 2,
  },

  progressBar: {
    height: 3,
    backgroundColor: '#fff',
  },

  buttonContainer: {
    position: 'absolute',
    right: 10,
    top: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default memo(StoryComponent);
