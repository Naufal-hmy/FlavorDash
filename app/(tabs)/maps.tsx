import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapsScreen() {
  // Koordinat lokasi restoran (contoh: Monas, Jakarta sebagai dummy)
  const restaurantLocation = {
    latitude: -6.175392,
    longitude: 106.827153,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lokasi Restoran</Text>
        <Text style={styles.headerSubtitle}>Temukan lokasi FlavorDash terdekat</Text>
      </View>
      
      <MapView
        style={styles.map}
        initialRegion={restaurantLocation}
      >
        <Marker
          coordinate={{
            latitude: restaurantLocation.latitude,
            longitude: restaurantLocation.longitude,
          }}
          title="FlavorDash Central"
          description="Pusat pengiriman pesanan Anda"
        />
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
