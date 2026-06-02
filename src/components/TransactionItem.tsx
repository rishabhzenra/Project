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
      <View style={[styles.dot, { backgroundColor: isCredit ? Colors.successLight : Colors.dangerLight }]}>
        <View style={[styles.dotInner, { backgroundColor: isCredit ? Colors.success : Colors.danger }]} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{tx.title}</Text>
        <Text style={styles.subtitle}>{tx.subtitle}{'  '}{tx.date}</Text>
      </View>
      <Text style={[styles.amount, { color: isCredit ? Colors.success : Colors.danger }]}>
        {isCredit ? '+' : '-'}{'₹'}{Math.abs(tx.amount).toLocaleString('en-IN')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
});
