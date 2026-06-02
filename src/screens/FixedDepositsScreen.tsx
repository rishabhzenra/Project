import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../services/api';
import { FixedDeposit } from '../types';
import { Colors } from '../constants/colors';

export default function FixedDepositsScreen() {
  const insets = useSafeAreaInsets();
  const [fds, setFds] = useState<FixedDeposit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFixedDeposits().then(setFds).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const totalInvested = fds.reduce((s, fd) => s + fd.principal, 0);
  const totalMaturity = fds.reduce((s, fd) => s + fd.maturityAmount, 0);

  return (
    <FlatList
      data={fds}
      keyExtractor={item => item.id}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 16 }]}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.bank}>{item.bank}</Text>
            <View style={[
              styles.badge,
              { backgroundColor: item.status === 'active' ? Colors.successLight : Colors.divider }
            ]}>
              <Text style={[
                styles.badgeText,
                { color: item.status === 'active' ? Colors.success : Colors.textSecondary }
              ]}>
                {item.status}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.metaLabel}>Principal</Text>
              <Text style={styles.metaValue}>{'₹'}{item.principal.toLocaleString('en-IN')}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.metaLabel}>Interest Rate</Text>
              <Text style={[styles.metaValue, { color: Colors.success }]}>{item.interestRate}% p.a.</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.metaLabel}>Matures On</Text>
              <Text style={styles.metaValue}>{item.maturityDate}</Text>
            </View>
          </View>
          <View style={styles.maturityRow}>
            <Text style={styles.maturityLabel}>Maturity Amount</Text>
            <Text style={styles.maturityValue}>{'₹'}{item.maturityAmount.toLocaleString('en-IN')}</Text>
          </View>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Invested</Text>
            <Text style={styles.summaryValue}>{'₹'}{totalInvested.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.vDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>At Maturity</Text>
            <Text style={[styles.summaryValue, { color: Colors.success }]}>
              {'₹'}{totalMaturity.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  list: { padding: 16 },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 5 },
  summaryValue: { fontSize: 16, fontWeight: '700', color: Colors.text },
  vDivider: { width: 1, backgroundColor: Colors.border },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  bank: { fontSize: 15, fontWeight: '700', color: Colors.text },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  metaLabel: { fontSize: 11, color: Colors.textSecondary, marginBottom: 3 },
  metaValue: { fontSize: 13, fontWeight: '600', color: Colors.text },
  maturityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 12,
  },
  maturityLabel: { fontSize: 12, color: Colors.textSecondary },
  maturityValue: { fontSize: 15, fontWeight: '700', color: Colors.primary },
});
