import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {PERMISSIONS, request} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import Video from 'react-native-video';
const url = 'http://192.168.0.137:3000';

const requestPermissions = async () => {
  try {
    const filesPermission = await request(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    const filesWrite = await request(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
  } catch (err) {
    console.warn(err);
  }
};

const VisionCamera = () => {
  const [data, setData] = useState(null);
  const [allFiles, setAllFiles] = useState([]);

  const selection = async () => {
    await requestPermissions(); // Ensure permissions are granted
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.audio,
          DocumentPicker.types.images,
          DocumentPicker.types.video,
        ],
      });

      if (doc) {
        setData(doc[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  const handleUpload = async () => {
    if (data === null) return Alert.alert('Please select any file');

    const param = data.name?.endsWith('mp3')
      ? 'audio'
      : data.name?.endsWith('mp4')
      ? 'video'
      : 'image';

    const formData = new FormData();
    formData.append(param, data);

    try {
      const response = await fetch(`${url}/upload`, {
        method: 'POST',
        body: formData,
      });
      const json = await response.json();
      if (json.message) {
        Alert.alert('File uploaded successfully');
        setData(null);
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred');
    }
  };

  const handleRemove = () => {
    setData(null);
  };
  const fetchData = async () => {
    const response = await fetch(`${url}/getAllFiles`);
    const json = await response.json();

    setAllFiles(json);
  };
  useEffect(() => {
    fetchData();
    setupTrack();
  }, []);
  const setupTrack = async () => {
    await TrackPlayer.setupPlayer();
    console.log('success');
  };
  const handlePlay = async (item: string) => {
    try {
      await TrackPlayer.add([{url: item, title: 'jhdsvj'}]);
      await TrackPlayer.play();
    } catch (err) {
      console.log(err);
    }
  };
  const handlePause = async () => {
    await TrackPlayer.pause();
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <View
        style={{
          marginTop: 10,
          padding: 5,
          borderWidth: 2,
          borderColor: 'white',
          elevation: 2,
        }}>
        {item?.fieldname == 'image' && (
          <>
            <Image
              source={{uri: item?.url}}
              style={{height: 150, width: '100%'}}
              resizeMode="cover"
            />
          </>
        )}
        {item?.fieldname == 'video' && (
          <>
            <Video
              // source={{}}
              source={{uri: item?.url}}
              style={styles.backgroundVideo}
              controls
              fullscreen
            />
          </>
        )}
        {item?.fieldname == 'audio' && (
          <ImageBackground
            source={{uri: item?.url}}
            style={{
              height: 150,
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            resizeMode="cover">
            <View style={{flexDirection: 'row', gap: 5}}>
              <TouchableOpacity
                onPress={() => handlePlay(item?.url)}
                style={styles.audioPlayBtn}>
                <Text style={{color: 'white'}}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePause} style={styles.audioPause}>
                <Text style={{color: 'white'}}>Pause</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
      <View style={styles.card}>
        <Image
          resizeMode="cover"
          source={require('./assets/uploadtag.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Drop Images/Videos/Audio files here.</Text>
        {data && <Text style={styles.fileName}>{data.name}</Text>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={selection} style={styles.btn}>
            <Text style={styles.btnText}>Browse files</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpload} style={styles.btn}>
            <Text style={styles.btnText}>Upload file</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemove} style={styles.btn}>
            <Text style={styles.btnText}>Remove file</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.allFilesTitle}>All Files</Text>
        {allFiles.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 350,
            }}>
            <ActivityIndicator size="large" animating={true} color="#00ff00" />
          </View>
        ) : (
          <View style={{height: '100%'}}>
            <FlatList
              data={allFiles && allFiles}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: 400}}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    padding: 12,
  },
  card: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
    height: 255,
    borderRadius: 10,
  },
  image: {
    marginTop: -50,
    height: 150,
    width: Platform.OS === 'android' ? 150 : 150,
  },
  title: {
    marginTop: -30,
    color: 'black',
    fontWeight: '700',
  },
  fileName: {
    color: 'orange',
    fontWeight: '700',
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    height: 45,
    width: 100,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
    elevation: 1,
  },
  btnText: {
    color: 'white',
    fontSize: 13,
  },
  allFilesTitle: {
    color: 'white',
    fontSize: 30,
    margin: 12,
  },
  backgroundVideo: {
    height: 150,
    width: '100%',
  },
  audioPlayBtn: {
    backgroundColor: 'green',
    marginTop: 12,
    width: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 12,
    height: 35,
  },
  audioPause: {
    backgroundColor: 'red',
    marginTop: 12,
    width: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 12,
    height: 35,
  },
});

export default VisionCamera;
