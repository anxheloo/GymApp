import React, {Suspense, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {logo, clock, StoryComponentProps} from '../helper/exportedFunction';
import Video from 'react-native-video';
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-reanimated-carousel';
import VideoComponent from './VideoComponent';

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

  const renderStoryContent = (story: any) => {
    switch (story.type) {
      case 'image':
        return <Image source={story.image} style={styles.backgroundImage} />;
      case 'video':
        return <VideoComponent uri={story.video} />;
      default:
        return null;
    }
  };

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      progressAnimation.stopAnimation();
      progressAnimation.setValue(0);
      setCurrentStoryIndex(currentStoryIndex + 1);
      carouselRef.current?.next();
    } else {
      scrollTo(workoutIndex);
    }
  };

  const goToPreviousStory = () => {
    progressAnimation.stopAnimation();
    progressAnimation.setValue(0);
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
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

  const getProgressBarWidth = (index: number, currentIndex: number) => {
    if (currentIndex > index) {
      return '100%';
    }

    if (currentIndex === index) {
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
      setCurrentStoryIndex(0);
      progressAnimation.stopAnimation();
      progressAnimation.setValue(0);
    }
  }, [isVisible]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.progressBarContainer}>
        {stories.map((story, index) => (
          <View style={styles.progressBarBackground} key={index}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: getProgressBarWidth(index, currentStoryIndex),
                },
              ]}
            />
          </View>
        ))}
      </View>

      <Carousel
        ref={carouselRef}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        loop={false}
        width={width}
        height={height - 26}
        data={stories}
        scrollAnimationDuration={500}
        onSnapToItem={idx => {
          setCurrentStoryIndex(idx);
          runProgressAnimation();
        }}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={event => handlePress(event)}
              style={({pressed}) => [
                {opacity: pressed ? 0.9 : 1},
                styles.container,
              ]}>
              <View style={styles.viewContainer}>
                {item.type && (
                  <View pointerEvents="none" style={styles.backgroundImage}>
                    {renderStoryContent(item)}
                  </View>
                )}

                <View style={styles.topBar}>
                  <Image source={logo} style={styles.logo} />
                  <View style={styles.titlesContainer}>
                    <Text style={styles.workoutTitle}>
                      FAT LOSS WORKOUT FOR WOMEN LOREM IPSUM DOLOR SIT AMET
                    </Text>
                    <Text style={styles.workoutSmallTitle}>
                      Stiff legged deadlift
                    </Text>
                  </View>
                </View>

                <View style={styles.bottomBar}>
                  <Image source={clock} style={styles.bottomBarIcon} />
                  <Text style={styles.bottomBarText}>00:45</Text>
                  <Text style={styles.bottomBarText}>Advanced</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
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
    // paddingTop: 10,
    justifyContent: 'center',
    height: 3,
    position: 'absolute',
    left: 13,
    right: 13,
    marginHorizontal: 'auto',
    top: 20,
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

  topBar: {
    paddingHorizontal: 12,
    position: 'absolute',
    width: '100%',
    top: 20,
    flexDirection: 'row',
    gap: 10,
  },

  titlesContainer: {
    justifyContent: 'space-between',
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

  logo: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: 'red',
    resizeMode: 'contain',
  },

  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },

  buttonContainer: {
    position: 'absolute',
    right: 10,
    top: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default StoryComponent;
