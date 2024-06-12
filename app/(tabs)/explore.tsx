import React, { useState, useEffect } from 'react';
import { Platform, Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
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
  const [searchText, setSearchText] = useState<string>(''); // État pour stocker le texte de recherche
  
  useEffect(() => {
    (async () => { 
      if(searchText.length >= 3){

        const API_URL=`https://api-adresse.data.gouv.fr/search/?q=${searchText}&type=street&limit=10`; // https://api-adresse.data.gouv.fr/search/?q=${tata}&type=street&limit=10
        fetch(API_URL)
          .then(response => response.json())
          .then(data => {
            setSearchResult(data.features)
          })
          .catch(error => console.error('Error fatching data', error))
      }
    })();
  }, [searchText]); 

  
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

  const handleLocationSelect =(feature: any) => {
      setSelectedLocation({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })
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
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder='Rechercher une adresse'
      onChangeText={setSearchText}
      value={searchText}/>
      <FlatList 
      data={searchResult}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.item} onPress={() => handleLocationSelect(item)}>
          <Text style={styles.textWhite}>{item.properties.label}</Text>
        </TouchableOpacity>
      )}/>
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
    display: 'flex',
    flexDirection: 'column',
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    color: 'white'
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'white'
  },
  map: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    color:'white'

  },
  textWhite: {
    color: 'white'
  }
});

//stocker info api tableau
//fetch de l'api
