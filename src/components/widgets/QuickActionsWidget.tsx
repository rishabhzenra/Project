import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Widget } from '../../types';
import SectionHeader from '../SectionHeader';
import { Colors } from '../../constants/colors';

const ACTIONS = [
  { label: 'QR Code', abbr: 'QR', route: 'QRCode' },
  { label: 'UPI ID', abbr: 'UP', route: 'UPI' },
  { label: 'History', abbr: 'HX', route: 'UPIHistory' },
  { label: 'Send', abbr: 'SN', route: 'FundTransfer' },
];

interface Props {
  widget: Widget;
  navigation: any;
}

export default function QuickActionsWidget({ widget, navigation }: Props) {
  return (
    <View>
      <SectionHeader title={widget.title} />
      <View style={styles.row}>
        {ACTIONS.map(action => (
          <TouchableOpacity
            key={action.label}
            style={styles.item}
            onPress={() => navigation.navigate(action.route)}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.abbr}>{action.abbr}</Text>
            </View>
            <Text style={styles.label}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  item: {
    alignItems: 'center',
    width: 72,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0D5C8',
  },
  abbr: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
