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
        <View style={styles.iconInner} />
      </View>
      <View style={styles.info}>
        <Text style={styles.bankName} numberOfLines={1}>{account.bankName}</Text>
        <Text style={styles.accNumber}>
          {'**** **** '}{account.accountNumber.slice(-4)}
        </Text>
        <Text style={styles.accType}>{account.accountType}</Text>
        <Text style={styles.balance}>
          {'₹'} {account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconInner: {
    width: 18,
    height: 12,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    opacity: 0.7,
  },
  info: {},
  bankName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  accNumber: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  accType: {
    fontSize: 10,
    color: Colors.textLight,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  balance: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
});
