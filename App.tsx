import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import AddRecordScreen from './Screens/AddRecordScreen';
import ViewRecordsScreen from './Screens/ViewRecordsScreen';
import HomeScreen from './Screens/HomeScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddRecord" component={AddRecordScreen} />
          <Stack.Screen name="ViewRecords" component={ViewRecordsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
