import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { api } from '../services/api';
import { UserProfile } from '../types';

export default function UPIScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUserProfile().then(setProfile).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.safe}
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <View style={styles.qrBox}>
          <View style={styles.qrGrid}>
            {[...Array(9)].map((_, i) => (
              <View key={i} style={[styles.qrCell, { opacity: [0, 2, 4, 6, 8].includes(i) ? 1 : 0.25 }]} />
            ))}
          </View>
          <Text style={styles.qrLabel}>Scan to pay</Text>
        </View>

        <View style={styles.upiRow}>
          <Text style={styles.upiId}>{profile?.upiId}</Text>
        </View>
        <Text style={styles.name}>{profile?.name}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('FundTransfer')} activeOpacity={0.8}>
          <Text style={styles.actionAbbr}>SN</Text>
          <Text style={styles.actionLabel}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('UPIHistory')} activeOpacity={0.8}>
          <Text style={styles.actionAbbr}>HX</Text>
          <Text style={styles.actionLabel}>UPI History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  card: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  qrBox: { marginBottom: 22, alignItems: 'center' },
  qrGrid: {
    width: 120,
    height: 120,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 10,
    gap: 6,
    marginBottom: 10,
  },
  qrCell: {
    width: 26,
    height: 26,
    borderRadius: 4,
    backgroundColor: Colors.text,
  },
  qrLabel: { fontSize: 11, color: Colors.textSecondary },
  upiRow: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  upiId: { fontSize: 15, fontWeight: '700', color: Colors.primary, letterSpacing: 0.3 },
  name: { fontSize: 13, color: Colors.textSecondary },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  actionBtn: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionAbbr: { fontSize: 16, fontWeight: '700', color: Colors.primary, marginBottom: 6 },
  actionLabel: { fontSize: 12, fontWeight: '600', color: Colors.text },
});
