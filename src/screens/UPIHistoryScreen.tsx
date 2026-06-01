import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { api } from '../services/api';
import { Transaction } from '../types';
import { Colors } from '../constants/colors';
import TransactionItem from '../components/TransactionItem';

export default function UPIHistoryScreen() {
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTransactions()
      .then(data => setTxns(data.filter(t => t.category === 'upi')))
      .finally(() => setLoading(false));
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
      <FlatList
        data={txns.length > 0 ? txns : []}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <TransactionItem tx={item} />}
        ListHeaderComponent={<Text style={styles.heading}>UPI Transactions</Text>}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No UPI transactions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 16 },
  heading: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 14, color: Colors.textSecondary },
});
