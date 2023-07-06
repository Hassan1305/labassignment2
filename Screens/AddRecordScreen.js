import React, {useState, useRef} from 'react';
import {View, ToastAndroid, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Card, Paragraph} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import RenderCamera from './components/RenderCamera';

const AddRecordScreen = ({navigation}) => {
  const [cnic, setCnic] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [snapshot, setSnapshot] = useState('');
  const [isCameraDisabled, setIsCameraDisabled] = useState(false);
  const cameraRef = useRef();

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({latitude, longitude});
        },
        error => {
          console.log(error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10,
        },
      );
    });
  };

  const handleGetLocation = () => {
    ToastAndroid.show('Fetching Fresh Coords', ToastAndroid.SHORT);
    getCurrentLocation()
      .then(coords => {
        console.log('Latitude:', coords.latitude);
        console.log('Longitude:', coords.longitude);
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      })
      .catch(error => {
        console.log('Error getting location:', error);
        ToastAndroid.show('ERROR: ' + error.message, ToastAndroid.SHORT);
      });
  };

  const handleCaptureSnapshot = capturedSnapshot => {
    setSnapshot(capturedSnapshot);
  };

  const handleSubmit = async () => {
    if (!cnic) {
      ToastAndroid.show('Please enter a CNIC.', ToastAndroid.SHORT);
      return;
    }

    if (!latitude && !longitude) {
      ToastAndroid.show('Please attack the location ', ToastAndroid.SHORT);
      return;
    }

    if (!snapshot) {
      ToastAndroid.show('Please capture a snapshot.', ToastAndroid.SHORT);
      return;
    }
    try {
      // Send data to insert_record.php using fetch or other methods
      const response = await fetch('http://192.168.42.215/insert_record.php', {
        method: 'POST',
        body: JSON.stringify({
          cnic: cnic,
          latitude: latitude,
          longitude: longitude,
          snapshot: snapshot,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = JSON.parse(await response.text());
      console.log(json[0].Message);
      ToastAndroid.show(json[0].Message, ToastAndroid.LONG);
      console.log('CNIC: ', cnic);

      navigation.goBack();
    } catch (error) {
      console.error('ERRRRRRROR ', error);
    }
  };

  return (
    <>
      {isCameraDisabled && (
        <RenderCamera
          cameraRef={cameraRef}
          snapshot={snapshot}
          setSnapshot={handleCaptureSnapshot}
          setIsDisabled={setIsCameraDisabled}
        />
      )}
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="CNIC"
              value={cnic}
              onChangeText={text => setCnic(text)}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleGetLocation}
              style={styles.button}>
              {latitude && longitude ? 'Retake Location' : 'Get Location'}
            </Button>
            <Card style={styles.coordinatesCard}>
              {latitude && longitude ? (
                <>
                  <Paragraph>Latitude: {latitude}</Paragraph>
                  <Paragraph>Longitude: {longitude}</Paragraph>
                </>
              ) : (
                <Paragraph>No coordinates</Paragraph>
              )}
            </Card>
            <Button
              mode="contained"
              onPress={() => setIsCameraDisabled(true)}
              style={styles.button}>
              {snapshot ? 'Retake Picture' : 'Attach Picture'}
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}>
              Submit
            </Button>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    width: '100%',
    maxWidth: 500, // Adjust as needed
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  coordinatesCard: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
});

export default AddRecordScreen;
