import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
  // Définir les coordonnées pour dessiner la lettre "A"
  const letterCoordinates = [
    { latitude: 45.186552, longitude: 5.7544637 },
    { latitude: 45.18647950980687, longitude: 5.753939151763916},
    { latitude: 45.186553, longitude: 5.7544638 },
    { latitude: 45.186560, longitude: 5.7544640 },
    { latitude: 45.187660, longitude: 5.7544637 },
    { latitude: 45.187538610724616, longitude: 5.753960274159908},
    { latitude: 45.187715598224486, longitude: 5.754729062318802}
  ];

  const letter2Coordinates = [
    { latitude: 45.18659766126507, longitude: 5.75518973171711}
  ]

  const handleMapPress = (event: { nativeEvent: { coordinate: any; }; }) => {
    const { coordinate } = event.nativeEvent;
    console.log("Latitude:", coordinate.latitude);
    console.log("Longitude:", coordinate.longitude);
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={handleMapPress}
        style={styles.map}
        initialRegion={{
          latitude: 45.186552,
          longitude: 5.754637,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Polyline
          coordinates={letterCoordinates}
          strokeColor="#FF0000" // Couleur de la ligne
          strokeWidth={10}      // Épaisseur de la ligne
        />
        <Polyline 
        coordinates={letter2Coordinates}
        strokeColor='#FFOOOO'
        strokeWidth={40}/>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
