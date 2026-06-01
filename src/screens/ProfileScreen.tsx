import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '../services/api';
import { UserProfile } from '../types';
import { Colors } from '../constants/colors';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUserProfile().then(setProfile).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  const rows = [
    { label: 'Full Name', value: profile?.name },
    { label: 'Mobile', value: profile?.phone },
    { label: 'UPI ID', value: profile?.upiId },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile?.name?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.upi}>{profile?.upiId}</Text>
      </View>

      <View style={styles.card}>
        {rows.map((row, i) => (
          <View key={row.label} style={[styles.row, i < rows.length - 1 && styles.rowBorder]}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  avatarSection: { alignItems: 'center', paddingVertical: 28 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 34, fontWeight: '700', color: Colors.white },
  name: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  upi: { fontSize: 13, color: Colors.textSecondary },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 14,
    paddingHorizontal: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  rowLabel: { fontSize: 13, color: Colors.textSecondary },
  rowValue: { fontSize: 14, fontWeight: '600', color: Colors.text },
  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: Colors.danger,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: { color: Colors.danger, fontSize: 15, fontWeight: '700' },
});
