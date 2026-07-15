import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useOrder } from '../../context/OrderContext';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const { setOrderStatus, setProofPhoto } = useOrder();
  const router = useRouter();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>Kami membutuhkan izin untuk menggunakan kamera</Text>
        <Button onPress={requestPermission} title="Berikan Izin Kamera" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        if (photoData) {
          setPhoto(photoData.uri);
        }
      } catch (error) {
        console.error('Failed to take picture:', error);
      }
    }
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.photoPreview} />
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.button} onPress={retakePicture}>
            <Text style={styles.buttonText}>Ambil Ulang</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              setProofPhoto(photo);
              setOrderStatus('Pesanan Selesai ✅');
              setPhoto(null);
              alert('Berhasil! Bukti foto telah terkirim.');
              router.replace('/(tabs)/order_detail');
            }}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Kirim Bukti</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <View style={styles.overlay}>
          <Text style={styles.instructionText}>Ambil Foto Bukti Pesanan</Text>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 30,
    paddingBottom: 50,
  },
  instructionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginTop: 40,
  },
  captureButton: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  photoPreview: {
    flex: 1,
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  primaryButton: {
    backgroundColor: '#E63946',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
