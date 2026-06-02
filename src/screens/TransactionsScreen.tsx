import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../services/api';
import { Transaction } from '../types';
import { Colors } from '../constants/colors';
import TransactionItem from '../components/TransactionItem';

export default function TransactionsScreen() {
  const insets = useSafeAreaInsets();
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTransactions().then(setTxns).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const totalIn = txns.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalOut = txns.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

  return (
    <FlatList
      data={txns}
      keyExtractor={item => item.id}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 16 }]}
      renderItem={({ item }) => <TransactionItem tx={item} />}
      ListHeaderComponent={
        <View>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Money In</Text>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>
                {'₹'}{totalIn.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Money Out</Text>
              <Text style={[styles.summaryValue, { color: Colors.danger }]}>
                {'₹'}{totalOut.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
          <Text style={styles.heading}>All Transactions</Text>
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 5 },
  summaryValue: { fontSize: 16, fontWeight: '700' },
  vDivider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  heading: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 4 },
});
