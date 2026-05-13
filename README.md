# FlavorDash - Tugas Mobile Development

Proyek ini adalah repositori untuk menjawab studi kasus pengembangan mobile menggunakan framework **React Native (Expo Go)** dan backend **Supabase**.

## 🚀 Cara Menjalankan Project

### Prasyarat
- Node.js terinstall
- Aplikasi **Expo Go** terinstall di HP (Android/iOS)

### Langkah-langkah

```bash
# 1. Clone repositori ini
git clone <url-repo-ini>

# 2. Masuk ke folder project
cd FlavorDash

# 3. Install semua dependencies (WAJIB sebelum menjalankan)
npm install

# 4. Jalankan development server
npx expo start
```

Setelah `npx expo start` berjalan, scan QR code yang muncul menggunakan aplikasi **Expo Go** di HP kamu.

> ⚠️ **Catatan:** Pastikan HP dan laptop/PC berada dalam **jaringan WiFi yang sama**.

---



## SOAL 1: Merancang Layout Katalog & Analisis Responsivitas

### Gambar Bukti / Hasil Kode
![Hasil Katalog](./assets/Bukti1.jpeg)
![Hasil Katalog](./assets/Bukti2.jpeg)  
![Hasil Katalog](./assets/Bukti3.jpeg)


### Analisis Responsivitas
**Mengapa penggunaan unit proporsional (`flex: 1` atau persentase) lebih disarankan daripada ukuran absolut (pixel) dalam menangani fragmentasi layar pada perangkat Android dan iOS?**

Fragmentasi layar adalah tantangan utama di ekosistem mobile di mana terdapat ribuan jenis perangkat Android dan iOS dengan ukuran, rasio, dan kepadatan piksel (DPI) yang berbeda-beda. 
1. **Kelemahan Ukuran Absolut (Pixel):** Jika kita menggunakan ukuran absolut (misalnya `width: 300px` untuk teks), tata letak mungkin terlihat bagus dan proporsional di layar yang lebar (seperti iPhone 14 Pro Max). Namun, jika aplikasi dijalankan di layar yang lebih kecil (seperti iPhone SE atau perangkat Android entry-level), elemen tersebut akan menabrak batas layar (*overflow*), menyebabkan teks terpotong, atau merusak keseluruhan komposisi antarmuka.
2. **Keunggulan Unit Proporsional (Flexbox / `flex: 1`):** Algoritma Flexbox bekerja secara matematis dengan menghitung dan membagi **sisa ruang yang tersedia (*available space*)**. Dengan menggunakan `flex: 1` pada kontainer deskripsi teks (yang berada di samping gambar produk), React Native akan secara dinamis menyesuaikan lebar kontainer agar selalu mengisi sisa ruang secara penuh tanpa melebihi layar. Hal ini menjamin desain selalu terlihat proporsional, konsisten, dan terhindar dari *overflow* di seluruh ukuran perangkat, tanpa perlu menuliskan konfigurasi layar yang rumit (*media query*) untuk setiap model HP.

---

## SOAL 2: Route Protection (Middleware) & Analisis Keamanan Stateless

### Gambar Bukti / Hasil Kode
![Halaman Login Otomatis](./assets/Bukti3.jpeg)

*Keterangan: Halaman login di atas muncul secara otomatis saat aplikasi dijalankan (sebelum login). Ini membuktikan bahwa Middleware berhasil mendeteksi pengguna yang belum terautentikasi dan melakukan proteksi rute dengan mengalihkan akses dari halaman utama ke halaman login.*

### Analisis Keamanan Stateless
**Perbedaan antara *Stateful (Session-based)* dan *Stateless (JWT-based)*, serta alasan teknis mengapa metode Stateless lebih efisien untuk aplikasi mobile dengan jutaan pengguna:**

**1. Perbedaan Mendasar:**
- **Stateful (Session-based):** Pada arsitektur ini, server bertugas membuat dan menyimpan status login pengguna (sesi) di dalam memori internalnya (atau database). Klien (aplikasi mobile) hanya diberikan sebuah ID rujukan singkat (biasanya berupa *Cookie*). Setiap kali klien meminta data dari API, server harus secara aktif "mencari" dan mencocokkan Session ID tersebut di databasenya untuk memverifikasi siapa penggunanya.
- **Stateless (JWT-based):** Server tidak menyimpan sesi sama sekali. Saat login berhasil, server meracik token **JWT (JSON Web Token)** yang menampung 3 bagian utama:
    - *Header:* Informasi algoritma kriptografi.
    - *Payload:* Data diri pengguna (ID, Email, Role/Klaim).
    - *Signature:* Kriptografi kunci rahasia (*secret key*) yang berfungsi sebagai tanda tangan digital (anti-pemalsuan).
  Token JWT ini diberikan secara utuh ke perangkat mobile. Saat meminta data, perangkat memberikan token tersebut, dan server cukup "memvalidasi *Signature*" dari token tanpa perlu mencari apapun di memori database.

**2. Alasan Teknis Stateless Lebih Efisien untuk Skala Jutaan Pengguna:**
- **Penskalaan Horizontal Tanpa Hambatan (*Horizontal Scalability*):** Jika aplikasi mencapai jutaan pengguna aktif, sistem Stateful akan menghabiskan sangat banyak kapasitas RAM server hanya untuk merekam siapa saja yang sedang online. Saat kita ingin menambah jumlah server (*Load Balancing*), sinkronisasi sesi antar server menjadi sangat lambat dan kompleks. Dengan JWT (Stateless), **tidak ada beban memori di server**. Server backend mana pun di seluruh dunia dapat memvalidasi token pengguna secara instan dan mandiri, memungkinkan aplikasi melayani jutaan request dengan sangat ringan dan murah.
- **Sangat Tangguh untuk Lingkungan Mobile:** Karena JWT disimpan di sisi perangkat dan tidak bergantung pada satu sesi di satu server tertentu, ia menjadi standar emas untuk API *Backend as a Service* (seperti Supabase). Ini sangat ideal untuk aplikasi mobile yang sering mengalami *drop signal* atau putus koneksi jaringan, memastikan keamanan data terjaga lewat validasi *Signature* seketika.
