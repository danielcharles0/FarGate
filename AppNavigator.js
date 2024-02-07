import {React, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CommandsScreen from './screens/CommandsScreen';
import InitScreen from './screens/InitScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        [global.botSender, global.channelID] = await Promise.all([
        AsyncStorage.getItem('botSender'),
        AsyncStorage.getItem('channelID'),
        ]);

        //if null change it to empty string to make the if condition for selecting the screen simpler
        if (global.botSender == null)
          global.botSender = ''
        if (global.channelID == null)
          global.channelID = ''

        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if(!isDataLoaded){
    screen='Init';
  }

  //if both variables empty then InitScreen, i.e. never been in InitScreen or didn't write anything, otherwise CommandsScreen
  if (global.botSender == '' && global.channelID == '')
    screen = "Init"
  else
    screen = "Commands"
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screen} 
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Init" component={InitScreen} />
        <Stack.Screen name="Commands" component={CommandsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;