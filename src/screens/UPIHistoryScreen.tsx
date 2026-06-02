import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../services/api';
import { Transaction } from '../types';
import { Colors } from '../constants/colors';
import TransactionItem from '../components/TransactionItem';

export default function UPIHistoryScreen() {
  const insets = useSafeAreaInsets();
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTransactions()
      .then(data => setTxns(data.filter(t => t.category === 'upi')))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={txns}
      keyExtractor={item => item.id}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 16 }]}
      renderItem={({ item }) => <TransactionItem tx={item} />}
      ListHeaderComponent={<Text style={styles.heading}>UPI Transactions</Text>}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No UPI transactions yet</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  list: { padding: 16 },
  heading: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 14, color: Colors.textSecondary },
});
