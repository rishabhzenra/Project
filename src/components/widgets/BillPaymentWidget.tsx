import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
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
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>{cat.icon}</Text>
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
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
  },
  icon: {
    fontSize: 22,
  },
  label: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
