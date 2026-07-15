import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useOrder } from '../../context/OrderContext';

export default function HistoryScreen() {
  const { orderHistory } = useOrder();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Pesanan</Text>
        <Text style={styles.headerSubtitle}>Daftar pesanan Anda sebelumnya</Text>
      </View>

      {orderHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada riwayat pesanan.</Text>
        </View>
      ) : (
        orderHistory.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>#ORD-{order.id.slice(-6)}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.itemsContainer}>
              {order.items.map((item, idx) => (
                <Text key={idx} style={styles.itemText}>
                  {item.qty}x {item.name}
                </Text>
              ))}
            </View>

            <View style={styles.divider} />

            <Text style={styles.addressTitle}>Dikirim ke:</Text>
            <Text style={styles.addressText}>{order.address || 'Alamat tidak diisi'}</Text>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Pembayaran:</Text>
              <Text style={styles.totalValue}>Rp {order.total.toLocaleString('id-ID')}</Text>
            </View>

            {order.photo && (
              <View style={styles.photoContainer}>
                <Text style={styles.photoLabel}>Bukti Pengiriman:</Text>
                <Image source={{ uri: order.photo }} style={styles.photo} />
              </View>
            )}
          </View>
        ))
      )}
      
      <View style={{ height: 40 }} />
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
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginBottom: 12,
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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  itemsContainer: {
    gap: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#444',
  },
  addressTitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
  },
  photoContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  photoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  photo: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});
