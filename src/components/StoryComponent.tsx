import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
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

const {width, height} = Dimensions.get('window');

const StoryComponent: React.FC<StoryComponentProps> = ({
  stories,
  scrollTo,
  isVisible,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const pausedProgress = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const carouselRef = useRef<any>(null);

  const renderStoryContent = (story: any) => {
    switch (story.type) {
      case 'image':
        return <Image source={story.image} style={styles.backgroundImage} />;
      case 'video':
        return (
          <Video
            source={story.video}
            resizeMode="cover"
            style={styles.backgroundImage}
            paused={isPaused}
            muted={isMuted}
          />
        );
      case 'lottie':
        return (
          <LottieView
            source={story.lottie}
            style={styles.backgroundImage}
            speed={isPaused ? 0 : 1}
            autoPlay
            // loop
          />
        );
      default:
        return null;
    }
  };

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      carouselRef.current?.next();
    } else {
      scrollTo();
    }
  };

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      carouselRef.current?.prev();
    }
  };

  const handlePress = event => {
    const touchX = event.nativeEvent.locationX;

    if (touchX < width / 2) {
      console.log(
        'This is touchX:',
        touchX,
        'this is touchX < width / 2',
        touchX < width / 2,
      );
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const getProgressBarWidth = (storyIndex: number, currentIndex: number) => {
    if (currentIndex > storyIndex) {
      return '100%';
    }

    if (currentIndex === storyIndex) {
      return progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      });
    }

    return '0%';
  };

  const runProgressAnimation = () => {
    progressAnimation.setValue(pausedProgress.current);
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: (1 - pausedProgress.current) * 3000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        goToNextStory();
      }
    });
  };

  useEffect(() => {
    if (!isPaused) {
      runProgressAnimation();
    } else {
      progressAnimation.stopAnimation(value => {
        pausedProgress.current = value;
      });
    }
  }, [isPaused]);

  useEffect(() => {
    if (isVisible) {
      setCurrentStoryIndex(0);
      carouselRef.current?.scrollTo({index: currentStoryIndex});
      progressAnimation.setValue(0);
      pausedProgress.current = 0;
      setIsPaused(false);
      runProgressAnimation();
    } else {
      progressAnimation.stopAnimation();
      progressAnimation.setValue(0);
      pausedProgress.current = 0;
      setCurrentStoryIndex(0);
    }
  }, [isVisible]);

  return (
    <Carousel
      ref={carouselRef}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      loop={false}
      width={width}
      height={height - 25}
      data={stories}
      scrollAnimationDuration={500}
      onSnapToItem={idx => {
        setCurrentStoryIndex(idx);
        progressAnimation.setValue(0);
        pausedProgress.current = 0;
        setIsPaused(false);
        runProgressAnimation();
      }}
      renderItem={({item}) => {
        return (
          <Pressable
            onPress={handlePress}
            onPressIn={() => setIsPaused(true)}
            onPressOut={() => setIsPaused(false)}
            style={({pressed}) => [
              {opacity: pressed ? 0.9 : 1},
              styles.container,
            ]}>
            <View style={styles.viewContainer}>
              {item.type && renderStoryContent(item)}

              <View style={styles.progressBarContainer}>
                {stories.map((story, i) => {
                  return (
                    <View style={styles.progressBarBackground} key={i}>
                      <Animated.View
                        style={[
                          styles.progressBar,
                          {width: getProgressBarWidth(i, currentStoryIndex)},
                        ]}
                      />
                    </View>
                  );
                })}
              </View>

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
                <Image
                  source={clock}
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: 'white',
                    borderRadius: 50,
                  }}
                />
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  00:45
                </Text>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  Advanced
                </Text>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: height - 25,
    padding: 13,
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
    paddingTop: 10,
    justifyContent: 'center',
    height: 3,
    backgroundColor: 'transparent',
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
    top: 25,
    flexDirection: 'row',
    gap: 10,
  },

  titlesContainer: {
    justifyContent: 'space-between',
  },
  workoutTitle: {
    width: width - 86,
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
