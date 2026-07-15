import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useOrder } from '../../context/OrderContext';

export default function OrderDetailScreen() {
  const router = useRouter();
  const { orderStatus, cart, updateQty, confirmOrder, proofPhoto } = useOrder();

  const totalPayment = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detail Pesanan</Text>
        {cart.length > 0 && <Text style={styles.orderId}>Order ID: #ORD-{Math.floor(Math.random() * 900000) + 100000}</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Status Pesanan</Text>
        <Text style={styles.statusText}>{orderStatus}</Text>
      </View>

      {cart.length === 0 && orderStatus === 'Belum Ada Pesanan' ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Keranjang Anda masih kosong.</Text>
          <Text style={styles.emptyCartSubText}>Silakan pilih makanan di Katalog.</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
          
          {cart.map((item) => (
            <View key={item.id} style={styles.orderItemWrapper}>
              <View style={styles.orderItem}>
                <Text style={styles.itemText}>{item.qty}x {item.name}</Text>
                <Text style={styles.priceText}>Rp {(item.price * item.qty).toLocaleString('id-ID')}</Text>
              </View>
              
              {orderStatus === 'Belum Ada Pesanan' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}>
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.removeBtn} onPress={() => updateQty(item.id, -item.qty)}>
                    <Text style={styles.removeBtnText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}

          <View style={styles.divider} />
          
          <View style={styles.orderItem}>
            <Text style={[styles.itemText, { fontWeight: 'bold' }]}>Total Pembayaran</Text>
            <Text style={[styles.priceText, { fontWeight: 'bold' }]}>Rp {totalPayment.toLocaleString('id-ID')}</Text>
          </View>
        </View>
      )}

      {cart.length > 0 && orderStatus === 'Belum Ada Pesanan' && (
        <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
          <Text style={styles.confirmButtonText}>Konfirmasi Pesanan</Text>
        </TouchableOpacity>
      )}

      {cart.length > 0 && orderStatus !== 'Belum Ada Pesanan' && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
          <Text style={styles.infoText}>Alamat: Jl. Sudirman No. 123, Jakarta</Text>
          <Text style={styles.infoText}>Estimasi Waktu: 15-20 Menit</Text>
        </View>
      )}

      {orderStatus === 'Sedang Diantar 🛵' && (
        <TouchableOpacity 
          style={[styles.confirmButton, { backgroundColor: '#457b9d', marginTop: 12 }]} 
          onPress={() => router.push('/(tabs)/camera')}
        >
          <Text style={styles.confirmButtonText}>Ambil Foto Bukti (Kamera)</Text>
        </TouchableOpacity>
      )}

      {proofPhoto && orderStatus.includes('Selesai') && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bukti Penerimaan</Text>
          <Image source={{ uri: proofPhoto }} style={styles.proofImage} resizeMode="cover" />
        </View>
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
  orderItemWrapper: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    backgroundColor: '#EEE',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  removeBtn: {
    marginLeft: 'auto',
  },
  removeBtnText: {
    color: '#E63946',
    fontSize: 13,
    fontWeight: '600',
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
  emptyCartContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  emptyCartSubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  confirmButton: {
    backgroundColor: '#E63946',
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  proofImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  }
});
