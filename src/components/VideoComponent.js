import React, {memo, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

const VideoComponent = ({uri, isVisible}) => {
  const [isLoading, setVideoIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  if (err) {
    return <Text>Something Went Wrong</Text>;
  }

  return (
    <View style={styles.backgroundImage}>
      {!isVisible && !isLoading ? (
        <ActivityIndicator size="small" color="#fff" style={styles.loading} />
      ) : (
        <Video
          source={{uri: uri}}
          style={styles.backgroundImage}
          controls={false}
          resizeMode="cover"
          onBuffer={({isBuffering}) => {
            console.log('Buffering:', isBuffering);
          }}
          onError={error => {
            setVideoIsLoading(false);
            setErr(error);
          }}
          onLoadStart={() => {
            setVideoIsLoading(true);
          }}
          onLoad={() => {
            setVideoIsLoading(false);
            console.log('Video loaded');
          }}
          onEnd={() => console.log('Video ended')} // End callback
          // playInBackground={false} // Video will not continue to play when app enters the background.
          // playWhenInactive={false}
          //   paused={!isVisible}
          paused={false}
          // bufferConfig={{
          //   minBufferMs: 5000,
          //   maxBufferMs: 30000,
          //   bufferForPlaybackMs: 1000,
          //   bufferForPlaybackAfterRebufferMs: 2000,
          // }}
        />
      )}
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
  },
});

export default memo(VideoComponent);
