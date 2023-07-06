import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

const RenderCamera = ({setSnapshot, cameraRef, setIsDisabled}) => {
  const devices = useCameraDevices();
  const device = devices.back;

  const takePhoto = async () => {
    if (cameraRef?.current) {
      const photo = await cameraRef.current.takePhoto();
      //console.log('Photo: ', photo);

      const compressedImage = await ImageResizer.createResizedImage(
        photo.path,
        800,
        1600,
        'JPEG',
        80,
      );
      const compressedImageData = await RNFS.readFile(
        compressedImage.uri,
        'base64',
      );
      setSnapshot(compressedImageData);
      console.log('Photo Taken');
      setIsDisabled(false);
    } else {
      console.log('Camera is null');
    }
  };

  if (!device) {
    return <Text>Loading camera...</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        zIndex: 1,
      }}>
      <Camera
        ref={cameraRef}
        style={{flex: 1}}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 16,
          alignSelf: 'center',
          backgroundColor: '#1e88e5',
          borderRadius: 5,
          padding: 10,
        }}
        onPress={takePhoto}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Capture
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenderCamera;
