import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Transaction } from '../types';

interface Props {
  tx: Transaction;
}

export default function TransactionItem({ tx }: Props) {
  const isCredit = tx.type === 'credit';

  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: isCredit ? Colors.successLight : Colors.dangerLight }]}>
        <Text style={styles.iconText}>{isCredit ? '↓' : '↑'}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{tx.title}</Text>
        <Text style={styles.subtitle}>{tx.subtitle} · {tx.date}</Text>
      </View>
      <Text style={[styles.amount, { color: isCredit ? Colors.success : Colors.danger }]}>
        {isCredit ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 16,
    fontWeight: '700',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
});
