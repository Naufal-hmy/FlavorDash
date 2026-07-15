import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FoodItem from '../../components/FoodItem';
import { supabase } from '../../lib/supabase';

// Mock data katalog makanan (sesuai rubrik: custom API / mockup API diperbolehkan)
const MOCK_FOOD_DATA = [
  {
    id: '1',
    title: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan bumbu rempah pilihan, telur, dan ayam suwir yang lezat.',
    price: 'Rp 25.000',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
  },
  {
    id: '2',
    title: 'Mie Ayam Bakso',
    description: 'Mie kuning kenyal dengan topping ayam cincang, bakso, dan sayuran segar.',
    price: 'Rp 20.000',
    imageUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400',
  },
  {
    id: '3',
    title: 'Ayam Bakar Kecap',
    description: 'Ayam kampung dibakar dengan bumbu kecap manis dan rempah pilihan.',
    price: 'Rp 35.000',
    imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400',
  },
  {
    id: '4',
    title: 'Soto Betawi',
    description: 'Kuah santan kental dengan daging sapi, kentang, dan tomat segar.',
    price: 'Rp 28.000',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
  },
  {
    id: '5',
    title: 'Gado-gado Jakarta',
    description: 'Sayuran rebus segar dengan bumbu kacang gurih dan kerupuk renyah.',
    price: 'Rp 18.000',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
  },
  {
    id: '6',
    title: 'Rendang Padang',
    description: 'Daging sapi empuk dimasak dengan santan dan bumbu rempah khas Minang.',
    price: 'Rp 45.000',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  },
  {
    id: '7',
    title: 'Pempek Palembang',
    description: 'Olahan ikan tenggiri dengan kuah cuka asam manis yang khas.',
    price: 'Rp 22.000',
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400',
  },
  {
    id: '8',
    title: 'Es Teh Manis',
    description: 'Teh manis segar dengan es batu, cocok menemani makananmu.',
    price: 'Rp 5.000',
    imageUrl: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400',
  },
];

export default function KatalogScreen() {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState<typeof MOCK_FOOD_DATA>([]);

  useEffect(() => {
    // Simulasi fetch API (gunakan mock data sesuai rubrik)
    const loadData = setTimeout(() => {
      setFoods(MOCK_FOOD_DATA);
      setLoading(false);
    }, 800);
    return () => clearTimeout(loadData);
  }, []);

  const handleLogout = async () => {
    Alert.alert('Keluar', 'Apakah kamu yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          // onAuthStateChange di _layout.tsx otomatis redirect ke login
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E63946" />
        <Text style={styles.loadingText}>Memuat katalog...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🍔 FlavorDash</Text>
          <Text style={styles.headerSubtitle}>Katalog Makanan Tersedia</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </View>

      {/* Daftar Makanan menggunakan FlatList + FoodItem */}
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodItem item={item} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
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
  logoutBtn: {
    backgroundColor: '#FFF0F1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E63946',
  },
  logoutText: {
    color: '#E63946',
    fontWeight: '600',
    fontSize: 13,
  },
  listContent: {
    paddingVertical: 12,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    gap: 12,
  },
  loadingText: {
    color: '#888',
    fontSize: 14,
  },
});
