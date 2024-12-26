import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

const VideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null);
  const background = require('./assets/video.mp4');
  return (
    <View>
      <Text>VideoPlayer</Text>
      <Video
        source={background}
        ref={videoRef}
        controls={true}
        fullscreen
        fullscreenAutorotate
        resizeMode="cover"
        style={styles.backgroundVideo}
      />
    </View>
  );
};

export default VideoPlayer;
const styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    height: 300,
    width: '100%',
    borderWidth: 1,
  },
});
