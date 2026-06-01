import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';
import { api } from '../services/api';
import { UserProfile } from '../types';

export default function UPIScreen({ navigation }: any) {
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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <View style={styles.qrBox}>
          <View style={styles.qrPlaceholder}>
            <Text style={styles.qrIcon}>⬛</Text>
            <Text style={styles.qrLabel}>QR Code</Text>
          </View>
        </View>
        <Text style={styles.upiLabel}>Your UPI ID</Text>
        <View style={styles.upiRow}>
          <Text style={styles.upiId}>{profile?.upiId}</Text>
        </View>
        <Text style={styles.name}>{profile?.name}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('FundTransfer')}>
          <Text style={styles.actionIcon}>💸</Text>
          <Text style={styles.actionLabel}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('UPIHistory')}>
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionLabel}>UPI History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background, justifyContent: 'flex-start' },
  card: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  qrBox: { marginBottom: 20 },
  qrPlaceholder: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  qrIcon: { fontSize: 60 },
  qrLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 6 },
  upiLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6 },
  upiRow: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  upiId: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  name: { fontSize: 13, color: Colors.textSecondary },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
  actionBtn: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: 130,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: { fontSize: 24, marginBottom: 6 },
  actionLabel: { fontSize: 12, fontWeight: '600', color: Colors.text },
});
