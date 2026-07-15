import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapsScreen() {
  // Koordinat lokasi restoran (contoh: Monas, Jakarta sebagai dummy)
  const restaurantLocation = {
    latitude: -6.175392,
    longitude: 106.827153,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Izin Lokasi Ditolak',
          'Tolong aktifkan layanan lokasi di pengaturan perangkat Anda agar peta dapat menampilkan lokasi Anda dengan baik.'
        );
        return;
      }
      
      // Cek apakah location services menyala (GPS on)
      const providerStatus = await Location.getProviderStatusAsync();
      if (!providerStatus.locationServicesEnabled) {
        Alert.alert(
          'GPS Mati',
          'Lokasi perangkat Anda (GPS) sedang mati. Mohon nyalakan lokasi Anda agar peta berfungsi maksimal.'
        );
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lokasi Restoran</Text>
        <Text style={styles.headerSubtitle}>Temukan lokasi FlavorDash terdekat</Text>
      </View>
      
      <MapView
        style={styles.map}
        initialRegion={restaurantLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
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
