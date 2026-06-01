import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import { FixedDeposit } from '../types';
import { Colors } from '../constants/colors';

export default function FixedDepositsScreen() {
  const [fds, setFds] = useState<FixedDeposit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFixedDeposits().then(setFds).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  const totalInvested = fds.reduce((s, fd) => s + fd.principal, 0);
  const totalMaturity = fds.reduce((s, fd) => s + fd.maturityAmount, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Invested</Text>
          <Text style={styles.summaryValue}>₹{totalInvested.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>At Maturity</Text>
          <Text style={[styles.summaryValue, { color: Colors.success }]}>
            ₹{totalMaturity.toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Gain</Text>
          <Text style={[styles.summaryValue, { color: Colors.success }]}>
            ₹{(totalMaturity - totalInvested).toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      <FlatList
        data={fds}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.bank}>{item.bank}</Text>
              <View style={[styles.badge, { backgroundColor: item.status === 'active' ? Colors.successLight : Colors.border }]}>
                <Text style={[styles.badgeText, { color: item.status === 'active' ? Colors.success : Colors.textSecondary }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.metaLabel}>Principal</Text>
                <Text style={styles.metaValue}>₹{item.principal.toLocaleString('en-IN')}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.metaLabel}>Rate</Text>
                <Text style={[styles.metaValue, { color: Colors.success }]}>{item.interestRate}%</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metaLabel}>Matures</Text>
                <Text style={styles.metaValue}>{item.maturityDate}</Text>
              </View>
            </View>
            <View style={styles.maturityRow}>
              <Text style={styles.maturityLabel}>Maturity Amount</Text>
              <Text style={styles.maturityValue}>₹{item.maturityAmount.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 14,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: { fontSize: 11, color: Colors.textSecondary, marginBottom: 4 },
  summaryValue: { fontSize: 14, fontWeight: '700', color: Colors.text },
  divider: { width: 1, backgroundColor: Colors.border },
  list: { paddingHorizontal: 16 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  bank: { fontSize: 15, fontWeight: '700', color: Colors.text },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  metaLabel: { fontSize: 11, color: Colors.textSecondary, marginBottom: 2 },
  metaValue: { fontSize: 14, fontWeight: '600', color: Colors.text },
  maturityRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.divider, paddingTop: 10 },
  maturityLabel: { fontSize: 12, color: Colors.textSecondary },
  maturityValue: { fontSize: 15, fontWeight: '700', color: Colors.primary },
});
