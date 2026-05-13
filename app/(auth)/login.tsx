import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Terjemahkan pesan error Supabase ke Bahasa Indonesia
  const parseError = (message: string): string => {
    if (message.includes('rate limit') || message.includes('too many requests')) {
      return 'Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi.';
    }
    if (message.includes('Email not confirmed')) {
      return 'Email belum dikonfirmasi. Cek inbox email kamu dan klik link konfirmasi, ATAU minta admin matikan "Email Confirmation" di Supabase Dashboard.';
    }
    if (message.includes('Invalid login credentials')) {
      return 'Email atau password salah.';
    }
    if (message.includes('User already registered')) {
      return 'Email ini sudah terdaftar. Silakan langsung login.';
    }
    if (message.includes('Password should be')) {
      return 'Password minimal 6 karakter.';
    }
    return message;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Login Gagal', parseError(error.message));
    }
    // Jika sukses, onAuthStateChange di _layout.tsx akan otomatis redirect ke /(tabs)/katalog
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Registrasi Gagal', parseError(error.message));
    } else if (data.user && data.session === null) {
      // Supabase kirim email konfirmasi (fitur aktif)
      Alert.alert(
        'Cek Email Kamu! 📧',
        `Link konfirmasi telah dikirim ke ${email}. Klik link tersebut untuk mengaktifkan akun, lalu login di sini.`
      );
    } else {
      Alert.alert('Sukses! 🎉', 'Akun berhasil dibuat! Kamu sudah bisa masuk.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        {/* Header */}
        <Text style={styles.logo}>🍔 FlavorDash</Text>
        <Text style={styles.subtitle}>Temukan makanan favoritmu</Text>

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Tombol Login */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Masuk</Text>
          )}
        </TouchableOpacity>

        {/* Tombol Register */}
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: '#E63946' }]}>Daftar Akun Baru</Text>
        </TouchableOpacity>

        {/* Info hint */}
        <Text style={styles.hint}>
          💡 Gunakan email asli yang bisa diakses (misal: email kampus atau Gmail aktif)
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    color: '#1A1A2E',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    marginBottom: 14,
    backgroundColor: '#FAFAFA',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#E63946',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#E63946',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  hint: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
});
