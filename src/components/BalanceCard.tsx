import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  netWorth: number | null;
  loading: boolean;
  onRefresh: () => void;
}

export default function BalanceCard({ netWorth, loading, onRefresh }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Your Net Worth</Text>
      {loading ? (
        <ActivityIndicator color={Colors.primary} style={{ marginVertical: 8 }} />
      ) : (
        <Text style={styles.amount}>
          ₹ {netWorth?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Text>
      )}
      <TouchableOpacity style={styles.refreshRow} onPress={onRefresh}>
        <Text style={styles.refreshText}>Refresh Net Worth ↻</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  amount: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.text,
    marginVertical: 4,
  },
  refreshRow: {
    marginTop: 6,
  },
  refreshText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500',
  },
});
