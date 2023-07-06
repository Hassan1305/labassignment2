import {FlatList, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Card, Text} from 'react-native-paper';
import {Buffer} from 'buffer';

const ViewRecordsScreen = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const getRecords = async () => {
      try {
        await fetch('http://192.168.42.215/get_records.php')
          .then(response => response.text()) // get response text
          .then(text => {
            try {
              let data = JSON.parse(text); // try to parse as JSON
              // Handle JSON data
              console.log('Data length is: ', data?.length);
              setRecords(data);
            } catch {
              let buffer = Buffer.from(text, 'base64'); // not JSON, try as base64
              console.log('Buffer Triggered');
              // Handle binary data
            }
          })
          .catch(error => console.error(error));
      } catch (error) {
        console.error(error);
      }
    };

    getRecords();
  }, []);

  const renderItem = ({item}) => (
    <Card style={{margin: 10}}>
      <Card.Content>
        <Text>CNIC: {item.CNIC}</Text>
        <Text>Latitude: {item.latitude}</Text>
        <Text>Longitude: {item.longitude}</Text>
      </Card.Content>
      <Card.Cover source={{uri: 'data:image/jpeg;base64,' + item.ss}} />
    </Card>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Text variant="titleLarge">Existing Records</Text>
      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default ViewRecordsScreen;
