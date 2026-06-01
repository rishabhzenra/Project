import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '../services/api';
import { Loan } from '../types';
import { Colors } from '../constants/colors';

export default function LoansScreen({ navigation }: any) {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLoans().then(setLoans).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  const totalOutstanding = loans.reduce((s, l) => s + l.outstanding, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Outstanding</Text>
        <Text style={styles.summaryValue}>₹{totalOutstanding.toLocaleString('en-IN')}</Text>
        <Text style={styles.summaryMeta}>{loans.length} active loan{loans.length !== 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={loans}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('FundTransfer')}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.type}>{item.type}</Text>
              <View style={[styles.badge, { backgroundColor: item.status === 'active' ? Colors.dangerLight : Colors.successLight }]}>
                <Text style={[styles.badgeText, { color: item.status === 'active' ? Colors.danger : Colors.success }]}>
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
                <Text style={styles.metaLabel}>Outstanding</Text>
                <Text style={[styles.metaValue, { color: Colors.danger }]}>₹{item.outstanding.toLocaleString('en-IN')}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metaLabel}>Next EMI</Text>
                <Text style={styles.metaValue}>{item.nextDueDate}</Text>
              </View>
            </View>

            <View style={styles.emiRow}>
              <Text style={styles.emiLabel}>Monthly EMI</Text>
              <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('FundTransfer')}>
                <Text style={styles.payBtnText}>Pay ₹{item.emi.toLocaleString('en-IN')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  summaryCard: {
    backgroundColor: Colors.primary,
    margin: 16,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  summaryLabel: { fontSize: 12, color: '#FFD9C0', marginBottom: 4 },
  summaryValue: { fontSize: 28, fontWeight: '700', color: Colors.white },
  summaryMeta: { fontSize: 11, color: '#FFD9C0', marginTop: 4 },
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
  type: { fontSize: 16, fontWeight: '700', color: Colors.text },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  metaLabel: { fontSize: 11, color: Colors.textSecondary, marginBottom: 2 },
  metaValue: { fontSize: 13, fontWeight: '600', color: Colors.text },
  emiRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.divider, paddingTop: 10 },
  emiLabel: { fontSize: 12, color: Colors.textSecondary },
  payBtn: { backgroundColor: Colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  payBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
});
