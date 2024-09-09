import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

type VideoComponentProps = {
  uri: string;
};

const VideoComponent: React.FC<VideoComponentProps> = ({uri}) => {
  const [isLoading, setVideoIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  console.log('This is video is loading:', isLoading);
  console.log('This is video is isBuffering:', isBuffering);

  return (
    <View style={styles.backgroundImage}>
      {/* {isLoading || isBuffering ? (
        <ActivityIndicator size="small" color="#fff" style={styles.loading} />
      ) : ( */}
      <Video
        source={{uri: uri}} // Use the .m3u8 URL here
        style={styles.backgroundImage}
        controls={false} // Show video controls
        resizeMode="cover" // Resize mode
        onBuffer={({isBuffering}) => {
          setIsBuffering(isBuffering);
          console.log('Buffering:', isBuffering);
        }} // Buffering status
        onError={error => {
          console.error('Video error:', error);
          setVideoIsLoading(false); // Stop loader on error
        }} // Error handling
        onLoadStart={() => {
          setVideoIsLoading(true);
          console.log('Video loading started');
        }}
        onLoad={() => {
          setVideoIsLoading(false);
          console.log('Video loaded');
        }} // Loaded callback
        onEnd={() => console.log('Video ended')} // End callback
        paused={false} // Autoplay video
      />
      {/* //   )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius: 18,
    overflow: 'hidden',
  },

  loading: {
    flex: 1,
    // position: 'absolute',
    // zIndex: 999999999999999,
  },
});

export default VideoComponent;
