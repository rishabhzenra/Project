import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Account } from '../types';

export default function AccountDetailScreen({ route, navigation }: any) {
  const account: Account = route.params?.account;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>🏦</Text>
        </View>
        <Text style={styles.bankName}>{account.bankName}</Text>
        <Text style={styles.accType}>{account.accountType} Account</Text>
        <Text style={styles.accNumber}>{account.accountNumber}</Text>
        <View style={styles.divider} />
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balance}>
          ₹ {account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('FundTransfer')}>
          <Text style={styles.actionIcon}>💸</Text>
          <Text style={styles.actionLabel}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionLabel}>Statement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('UPI')}>
          <Text style={styles.actionIcon}>📲</Text>
          <Text style={styles.actionLabel}>UPI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  card: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: { fontSize: 30 },
  bankName: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  accType: { fontSize: 13, color: Colors.textSecondary, textTransform: 'capitalize', marginBottom: 4 },
  accNumber: { fontSize: 13, color: Colors.textLight, fontFamily: 'monospace' },
  divider: { width: '100%', height: 1, backgroundColor: Colors.divider, marginVertical: 20 },
  balanceLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6 },
  balance: { fontSize: 32, fontWeight: '700', color: Colors.text },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  actionBtn: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: 100,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: { fontSize: 24, marginBottom: 6 },
  actionLabel: { fontSize: 12, fontWeight: '600', color: Colors.text },
});
