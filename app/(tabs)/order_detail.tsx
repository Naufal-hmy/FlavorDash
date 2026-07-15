import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useOrder } from '../../context/OrderContext';

export default function OrderDetailScreen() {
  const { orderStatus } = useOrder();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detail Pesanan</Text>
        <Text style={styles.orderId}>Order ID: #ORD-987654</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Status Pesanan</Text>
        <Text style={styles.statusText}>{orderStatus}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
        <View style={styles.orderItem}>
          <Text style={styles.itemText}>1x Nasi Goreng Spesial</Text>
          <Text style={styles.priceText}>Rp 25.000</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.itemText}>2x Es Teh Manis</Text>
          <Text style={styles.priceText}>Rp 10.000</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.orderItem}>
          <Text style={[styles.itemText, { fontWeight: 'bold' }]}>Total Pembayaran</Text>
          <Text style={[styles.priceText, { fontWeight: 'bold' }]}>Rp 35.000</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
        <Text style={styles.infoText}>Alamat: Jl. Sudirman No. 123, Jakarta</Text>
        <Text style={styles.infoText}>Estimasi Waktu: 15-20 Menit</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  orderId: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 16,
    color: '#E63946',
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 15,
    color: '#444',
  },
  priceText: {
    fontSize: 15,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
});
