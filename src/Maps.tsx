import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';

const Maps = () => {
  const [location, setLocation] = useState({
    latitude: 16.7545,
    longitude: 81.568,
  });
  const [error, setError] = useState('');
  const [pin, setPin] = useState({latitude: 16.7545, longitude: 81.568});

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need your location to show you on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
          setError('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
        setError('Error requesting location permission');
      }
    } else {
      // For iOS, permissions are handled differently
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setPin({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
        setError('Error getting location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const onDragEnd = e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    console.log(latitude, longitude, '______');
    console.log('Marker dragged to:', latitude, longitude);
    setPin({latitude, longitude});
  };

  const handleDargs = e => {
    console.log(e);
  };
  const onMapPress = e => {
    const {coordinate} = e.nativeEvent;
    console.log('fghjkl', coordinate);
    setPin({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const onRegionChange = e => {
    console.log(e, 'tyuio;');
  };
  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <MapView
        style={styles.map}
        showsUserLocation={true}
        onPress={onMapPress}
        region={{
          latitude: pin.latitude,
          longitude: pin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          key={'i29'}
          coordinate={pin}
          title="Drag me!"
          onDragEnd={onDragEnd}
          description="I am a draggable marker"
        
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    color: 'red',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
});

export default Maps;
