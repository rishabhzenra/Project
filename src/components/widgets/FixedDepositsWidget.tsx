import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Widget, FixedDeposit } from '../../types';
import SectionHeader from '../SectionHeader';
import { Colors } from '../../constants/colors';
import { api } from '../../services/api';

interface Props {
  widget: Widget;
  navigation: any;
}

export default function FixedDepositsWidget({ widget, navigation }: Props) {
  const [fds, setFds] = useState<FixedDeposit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFixedDeposits().then(setFds).finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <SectionHeader title={widget.title} onViewAll={() => navigation.navigate('FixedDeposits')} />
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginVertical: 16 }} />
        ) : (
          fds.slice(0, 2).map(fd => (
            <TouchableOpacity
              key={fd.id}
              style={styles.row}
              onPress={() => navigation.navigate('FixedDeposits')}
              activeOpacity={0.8}
            >
              <View style={styles.left}>
                <Text style={styles.bank}>{fd.bank}</Text>
                <Text style={styles.meta}>Matures: {fd.maturityDate}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.principal}>₹{fd.principal.toLocaleString('en-IN')}</Text>
                <View style={styles.rateBadge}>
                  <Text style={styles.rateText}>{fd.interestRate}% p.a.</Text>
                </View>
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
  bank: { fontSize: 14, fontWeight: '600', color: Colors.text },
  meta: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  principal: { fontSize: 15, fontWeight: '700', color: Colors.text },
  rateBadge: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    marginTop: 4,
  },
  rateText: { fontSize: 11, color: Colors.success, fontWeight: '600' },
});
