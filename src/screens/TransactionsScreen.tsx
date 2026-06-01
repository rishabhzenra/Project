import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { api } from '../services/api';
import { Transaction } from '../types';
import { Colors } from '../constants/colors';
import TransactionItem from '../components/TransactionItem';

export default function TransactionsScreen() {
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTransactions().then(setTxns).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      </SafeAreaView>
    );
  }

  const total = txns.reduce((acc, tx) => tx.type === 'credit' ? acc + tx.amount : acc - tx.amount, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total In</Text>
          <Text style={[styles.summaryValue, { color: Colors.success }]}>
            ₹{txns.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0).toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Out</Text>
          <Text style={[styles.summaryValue, { color: Colors.danger }]}>
            ₹{txns.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0).toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Net</Text>
          <Text style={[styles.summaryValue, { color: total >= 0 ? Colors.success : Colors.danger }]}>
            ₹{Math.abs(total).toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      <FlatList
        data={txns}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <TransactionItem tx={item} />}
        ListHeaderComponent={<Text style={styles.heading}>All Transactions</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loader: { flex: 1 },
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
  summaryValue: { fontSize: 14, fontWeight: '700' },
  divider: { width: 1, backgroundColor: Colors.border },
  list: { paddingHorizontal: 16 },
  heading: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 8 },
});
