import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapsScreen() {
  const restaurants = [
    { id: '1', title: 'FlavorDash Jakarta', lat: -6.175392, lon: 106.827153, desc: 'Pusat Jakarta' },
    { id: '2', title: 'FlavorDash Bandung', lat: -6.914744, lon: 107.609810, desc: 'Cabang Bandung' },
    { id: '3', title: 'FlavorDash Surabaya', lat: -7.250445, lon: 112.768845, desc: 'Cabang Surabaya' },
    { id: '4', title: 'FlavorDash Bali', lat: -8.409518, lon: 115.188919, desc: 'Cabang Bali' },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Izin Lokasi Ditolak', 'Tolong aktifkan layanan lokasi.');
        return;
      }
      
      const providerStatus = await Location.getProviderStatusAsync();
      if (!providerStatus.locationServicesEnabled) {
        Alert.alert('GPS Mati', 'Lokasi perangkat Anda (GPS) sedang mati.');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lokasi Restoran</Text>
        <Text style={styles.headerSubtitle}>Temukan lokasi FlavorDash di Indonesia</Text>
      </View>
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -4.0, // Center of Indonesia roughly
          longitude: 112.0,
          latitudeDelta: 20.0,
          longitudeDelta: 20.0,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {restaurants.map(res => (
          <Marker
            key={res.id}
            coordinate={{ latitude: res.lat, longitude: res.lon }}
            title={res.title}
            description={res.desc}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    zIndex: 1, // Memastikan header berada di atas map
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
