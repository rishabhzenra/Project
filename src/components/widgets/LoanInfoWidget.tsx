import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Widget, Loan } from '../../types';
import SectionHeader from '../SectionHeader';
import { Colors } from '../../constants/colors';
import { api } from '../../services/api';

interface Props {
  widget: Widget;
  navigation: any;
}

export default function LoanInfoWidget({ widget, navigation }: Props) {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLoans().then(setLoans).finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <SectionHeader title={widget.title} onViewAll={() => navigation.navigate('Loans')} />
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginVertical: 16 }} />
        ) : (
          loans.slice(0, 2).map(loan => (
            <TouchableOpacity
              key={loan.id}
              style={styles.row}
              onPress={() => navigation.navigate('Loans')}
              activeOpacity={0.8}
            >
              <View style={styles.left}>
                <Text style={styles.type}>{loan.type}</Text>
                <Text style={styles.meta}>EMI Due: {loan.nextDueDate}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.outstanding}>₹{loan.outstanding.toLocaleString('en-IN')}</Text>
                <Text style={styles.emi}>EMI ₹{loan.emi.toLocaleString('en-IN')}/mo</Text>
              </View>
            </TouchableOpacity>
          ))
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  left: {},
  right: { alignItems: 'flex-end' },
  type: { fontSize: 14, fontWeight: '600', color: Colors.text },
  meta: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  outstanding: { fontSize: 15, fontWeight: '700', color: Colors.danger },
  emi: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
});
