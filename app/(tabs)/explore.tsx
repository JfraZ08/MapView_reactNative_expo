import React, { useState, useEffect } from 'react';
import { Platform, Text, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';



// type LocationCoords = {
//   latitude: number;
//   longitude: number;
// };

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};


export default function App() {

  const [location, setLocation] = useState<Location.LocationObject |null>(null);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Region | null>(null);

  useEffect(() => {
    (async () => {
      if(tata.length >= 3){ // tata.length >= 3
        const API_URL=`https://api-adresse.data.gouv.fr/search/?q=${tata}&type=street&limit=10`;
        fetch(API_URL)
          .then(response => response.json())
          .then(data => {
            setSearchResult(data.features)
          })
          .catch(error => console.error('Error fatching data', error))
      }
    })();
  }, [tata]);// [tata]

  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handlePickerChange =(itemValue: any, itemIndex: any) => {
    const selectedFeature = searchResult[itemIndex];
    if (selectedFeature) {
      setSelectedLocation({
        latitude: selectedFeature.geometry.coordinates[1],
        longitude: selectedFeature.geometry.coordinates[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })
    }
  }

  
  let initialRegion : Region= {
    latitude: 45.186552,
    longitude: 5.754637,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  };

  if (location) {
    initialRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }
  }

  let marketTitle = "Votre position";
  if (location) {
    marketTitle = `Latitude: ${location.coords.latitude}, Longitude ${location.coords.longitude}`
  }

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }
  return (
    <View>
      {/*TextInput*/}
      <Picker 
      selectedValue={selectedLocation}
      style={{ height: 50, width: '100%', color: 'white', }}
      onValueChange={handlePickerChange}
      >
        {
          searchResult.map((result, index) => (

            <Picker.Item 
            key={index}
            label={result.properties.label}
            value={result}
            />
          ))
        }
      </Picker>
      <MapView
      style={styles.map}
      initialRegion={initialRegion}
      region={selectedLocation || initialRegion}
      >
      {location && (
        <Marker 
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }}
          title="Votre position"
        />
      )}
      {selectedLocation && (
        <Marker 
        coordinate={selectedLocation}
        title='Adresse séélectionnée'/>
      )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  map: {
    width: '100%',
    height: '100%'
  },
});

//stocker info api tableau
//fetch de l'api
