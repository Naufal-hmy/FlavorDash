import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Mengecek sesi JWT aktif di Supabase saat aplikasi dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listener (Middleware) untuk memantau perubahan status JWT/Auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Logika Proteksi Rute (Route Protection / Middleware logic)
  useEffect(() => {
    if (isAuthenticated === null) return; // Menunggu pengecekan awal selesai

    // segments[0] mendeteksi grup folder aktif.
    // Misalnya, halaman 'Detail Pesanan' ada di route selain '(auth)'
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Jika TIDAK ADA JWT (belum login) dan mencoba akses halaman terproteksi
      // Arahkan paksa kembali ke halaman login
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Jika ADA JWT (sudah login) tapi mencoba akses halaman login,
      // Arahkan ke halaman utama katalog
      router.replace('/(tabs)/katalog');
    }
  }, [isAuthenticated, segments]);

  // Menggunakan Stack untuk merender halaman anak-anaknya secara terpusat
  return <Stack screenOptions={{ headerShown: false }} />;
}