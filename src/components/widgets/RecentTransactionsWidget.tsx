import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Widget, Transaction } from '../../types';
import SectionHeader from '../SectionHeader';
import TransactionItem from '../TransactionItem';
import { Colors } from '../../constants/colors';
import { api } from '../../services/api';

interface Props {
  widget: Widget;
  navigation: any;
}

export default function RecentTransactionsWidget({ widget, navigation }: Props) {
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTransactions().then(data => setTxns(data.slice(0, 5))).finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <SectionHeader title={widget.title} onViewAll={() => navigation.navigate('Transactions')} />
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginVertical: 20 }} />
        ) : (
          txns.map(tx => <TransactionItem key={tx.id} tx={tx} />)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 14,
    paddingHorizontal: 14,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
});
