import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Widget } from '../../types';
import { Colors } from '../../constants/colors';
import { api } from '../../services/api';

interface Props {
  widget: Widget;
  navigation: any;
}

export default function BalanceCardWidget({ navigation }: Props) {
  const [netWorth, setNetWorth] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.getUserProfile()
      .then(p => setNetWorth(p.netWorth))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Your Net Worth</Text>
      {loading ? (
        <ActivityIndicator color={Colors.primary} style={{ marginVertical: 10 }} />
      ) : (
        <Text style={styles.amount}>
          {'₹'} {netWorth?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Text>
      )}
      <TouchableOpacity onPress={load} style={styles.refreshBtn}>
        <Text style={styles.refreshText}>Refresh Net Worth</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  refreshBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  refreshText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
});
