import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Widget, BillCategory } from '../../types';
import SectionHeader from '../SectionHeader';
import { Colors } from '../../constants/colors';
import { api } from '../../services/api';

interface Props {
  widget: Widget;
  navigation: any;
}

export default function BillPaymentWidget({ widget, navigation }: Props) {
  const [categories, setCategories] = useState<BillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBillCategories().then(setCategories).finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <SectionHeader title={widget.title} />
      {loading ? (
        <ActivityIndicator color={Colors.primary} style={{ marginVertical: 16 }} />
      ) : (
        <View style={styles.grid}>
          {categories.slice(0, 8).map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={styles.item}
              onPress={() => navigation.navigate('BillPay', { category: cat })}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <Text style={styles.iconText}>{cat.label.slice(0, 2).toUpperCase()}</Text>
              </View>
              <Text style={styles.label} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  item: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 14,
  },
});
