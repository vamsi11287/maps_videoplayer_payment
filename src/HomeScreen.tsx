import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Camera from './Camera';
import ContactsPage from './Contacts';
import Maps from './Maps';
import Razorpay from './Razorpay';
import VideoPlayer from './VideoPlayer';
import VisionCamera from './VisionCamera';
const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Contacts')}
        style={styles.btn}>
        <Text style={{color: 'white'}}>Open Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Maps')}
        style={styles.btn}>
        <Text style={{color: 'white'}}>Open Maps</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Camera')}
        style={styles.btn}>
        <Text style={{color: 'white'}}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Vision')}
        style={styles.btn}>
        <Text style={{color: 'white'}}>Open Vision</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('VideoPlayer')}
        style={styles.btn}>
        <Text style={{color: 'white'}}>Open video player</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('razorpay')}
        style={styles.btn}>
        <Text style={{color: 'white'}}>Open Razorpay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    padding: 22,
  },
  btn: {
    width: '100%',
    backgroundColor: 'orange',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export const HomeRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        component={HomeScreen}
      />

      <Stack.Screen
        name="Contacts"
        options={{headerShown: false}}
        component={ContactsPage}
      />
      <Stack.Screen
        name="Maps"
        options={{headerShown: false}}
        component={Maps}
      />
      <Stack.Screen
        name="Camera"
        options={{headerShown: false}}
        component={Camera}
      />
      <Stack.Screen
        name="Vision"
        options={{headerShown: false}}
        component={VisionCamera}
      />
      <Stack.Screen
        name="VideoPlayer"
        options={{headerShown: false}}
        component={VideoPlayer}
      />
      <Stack.Screen
        name="razorpay"
        options={{headerShown: false}}
        component={Razorpay}
      />
    </Stack.Navigator>
  );
};
