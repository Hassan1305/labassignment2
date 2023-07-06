import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Text} from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  const [permissions, setPermissions] = useState(false);

  useEffect(() => {
    //requesting permissions on the start of the application
    requestPermissions().then(() => console.log('Permissions: ', permissions));
  }, []);

  const requestPermissions = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      const results = await PermissionsAndroid.requestMultiple(permissions);
      if (
        results[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        results[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        results[PermissionsAndroid.PERMISSIONS.CAMERA] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('All message permissions granted');
        setPermissions(true);
      } else {
        console.log('Some permissions were not granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const handleAddRecord = () => {
    navigation.navigate('AddRecord');
  };

  const handleViewRecords = () => {
    navigation.navigate('ViewRecords');
  };
  return (
    <>
      {!permissions ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text variant="titleLarge">Please grant permissions first </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text variant="titleLarge">Welcome to Meter Reading App</Text>
          <Button
            mode="contained"
            onPress={handleAddRecord}
            style={styles.button}>
            Add New Record
          </Button>
          <Button
            mode="contained"
            onPress={handleViewRecords}
            style={styles.button}>
            View Records
          </Button>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default HomeScreen;
