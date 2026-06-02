import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../services/api';
import { Loan } from '../types';
import { Colors } from '../constants/colors';

export default function LoansScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLoans().then(setLoans).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const totalOutstanding = loans.reduce((s, l) => s + l.outstanding, 0);

  return (
    <FlatList
      data={loans}
      keyExtractor={item => item.id}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 16 }]}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.type}>{item.type}</Text>
            <View style={[
              styles.badge,
              { backgroundColor: item.status === 'active' ? Colors.dangerLight : Colors.successLight }
            ]}>
              <Text style={[
                styles.badgeText,
                { color: item.status === 'active' ? Colors.danger : Colors.success }
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
              <Text style={styles.metaLabel}>Outstanding</Text>
              <Text style={[styles.metaValue, { color: Colors.danger }]}>
                {'₹'}{item.outstanding.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.metaLabel}>Next Due</Text>
              <Text style={styles.metaValue}>{item.nextDueDate}</Text>
            </View>
          </View>
          <View style={styles.emiRow}>
            <Text style={styles.emiLabel}>Monthly EMI  {'₹'}{item.emi.toLocaleString('en-IN')}</Text>
            <TouchableOpacity
              style={styles.payBtn}
              onPress={() => navigation.navigate('FundTransfer')}
              activeOpacity={0.8}
            >
              <Text style={styles.payBtnText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Outstanding</Text>
          <Text style={styles.summaryValue}>{'₹'}{totalOutstanding.toLocaleString('en-IN')}</Text>
          <Text style={styles.summaryMeta}>{loans.length} active loan{loans.length !== 1 ? 's' : ''}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  list: { padding: 16 },
  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryLabel: { fontSize: 12, color: '#FFD9C0', marginBottom: 6 },
  summaryValue: { fontSize: 30, fontWeight: '700', color: Colors.white, letterSpacing: -0.5 },
  summaryMeta: { fontSize: 12, color: '#FFD9C0', marginTop: 4 },
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
  type: { fontSize: 16, fontWeight: '700', color: Colors.text },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  metaLabel: { fontSize: 11, color: Colors.textSecondary, marginBottom: 3 },
  metaValue: { fontSize: 13, fontWeight: '600', color: Colors.text },
  emiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 12,
  },
  emiLabel: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  payBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  payBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
});
