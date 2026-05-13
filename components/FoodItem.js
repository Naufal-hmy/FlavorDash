import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const FoodItem = ({ imageUrl, title, description, price }) => {
  return (
    // Nested View: Container Utama
    <View style={styles.cardContainer}>
      
      {/* View untuk Gambar */}
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      
      {/* Nested View: Container untuk Teks (Deskripsi) */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', // Implementasi Flexbox menyamping sesuai syarat
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    // Shadow untuk efek kedalaman
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  textContainer: {
    // KUNCI RESPONSIVITAS: Menggunakan flex 1 mengambil sisa lebar ruang yang ada 
    // tanpa menabrak sisi kanan layar, menjadikannya proporsional
    flex: 1, 
    marginLeft: 16,
    justifyContent: 'space-around', 
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E63946',
  },
});

export default FoodItem;