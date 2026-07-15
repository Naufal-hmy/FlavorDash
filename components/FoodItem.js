import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useOrder } from '../context/OrderContext';

// Sekarang menerima parameter item seutuhnya
const FoodItem = ({ item }) => {
  const { addToCart } = useOrder();

  const handlePress = () => {
    // Menambahkan item ke keranjang global
    addToCart({
      id: item.id,
      name: item.title,
      price: parseInt(item.price.replace(/[^0-9]/g, ''), 10), // Konversi "Rp 25.000" jadi 25000
    });
    
    Alert.alert(
      'Pesanan Ditambahkan',
      `${item.title} berhasil ditambahkan ke keranjang Anda.`
    );
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress} activeOpacity={0.8}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
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