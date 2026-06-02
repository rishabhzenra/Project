import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Account } from '../types';

export default function AccountDetailScreen({ route, navigation }: any) {
  const insets = useSafeAreaInsets();
  const account: Account = route.params?.account;

  const actions = [
    { label: 'Transfer', abbr: 'TR', route: 'FundTransfer' },
    { label: 'Statement', abbr: 'ST', route: 'Transactions' },
    { label: 'UPI', abbr: 'UP', route: 'UPI' },
  ];

  return (
    <ScrollView
      style={styles.safe}
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <View style={styles.iconShape} />
        </View>
        <Text style={styles.bankName}>{account.bankName}</Text>
        <Text style={styles.accType}>{account.accountType} Account</Text>
        <Text style={styles.accNumber}>
          {'**** **** **** '}{account.accountNumber.slice(-4)}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balance}>
          {'₹'} {account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        {actions.map(a => (
          <TouchableOpacity
            key={a.label}
            style={styles.actionBtn}
            onPress={() => navigation.navigate(a.route)}
            activeOpacity={0.8}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionAbbr}>{a.abbr}</Text>
            </View>
            <Text style={styles.actionLabel}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  card: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconShape: {
    width: 28,
    height: 20,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    opacity: 0.8,
  },
  bankName: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  accType: { fontSize: 13, color: Colors.textSecondary, textTransform: 'capitalize', marginBottom: 6 },
  accNumber: { fontSize: 13, color: Colors.textLight, letterSpacing: 1 },
  divider: { width: '100%', height: 1, backgroundColor: Colors.divider, marginVertical: 22 },
  balanceLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8 },
  balance: { fontSize: 34, fontWeight: '700', color: Colors.text, letterSpacing: -0.5 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  actionBtn: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionAbbr: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  actionLabel: { fontSize: 12, fontWeight: '600', color: Colors.text },
});
