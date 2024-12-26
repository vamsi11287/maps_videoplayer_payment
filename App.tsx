import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeRoutes} from './src/HomeScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeRoutes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
