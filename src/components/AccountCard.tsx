import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Account } from '../types';

interface Props {
  account: Account;
  onPress: () => void;
}

export default function AccountCard({ account, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconBox}>
        <Text style={styles.iconText}>🏦</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.bankName} numberOfLines={1}>{account.bankName}</Text>
        <Text style={styles.accNumber}>{account.accountNumber}</Text>
        <Text style={styles.accType}>{account.accountType}</Text>
        <Text style={styles.balance}>
          ₹ {account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    width: 170,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconText: {
    fontSize: 16,
  },
  info: {
    flex: 1,
  },
  bankName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  accNumber: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 1,
  },
  accType: {
    fontSize: 10,
    color: Colors.textLight,
    marginBottom: 4,
  },
  balance: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
});
