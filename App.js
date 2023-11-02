import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Gyroscope from './gyroscope';
import Finger from './finger';

 
const Stack = createStackNavigator();

 
export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Gyroscope" component={Gyroscope} />
        <Stack.Screen name="Finger" component={Finger} />
      </Stack.Navigator>
     </NavigationContainer>

  );
}
