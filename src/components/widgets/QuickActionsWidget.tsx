import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Widget } from '../../types';
import SectionHeader from '../SectionHeader';
import { Colors } from '../../constants/colors';

const ACTIONS = [
  { label: 'QR Code', icon: '⬛', route: 'QRCode' },
  { label: 'UPI ID', icon: '📲', route: 'UPI' },
  { label: 'UPI History', icon: '📋', route: 'UPIHistory' },
  { label: 'Send Money', icon: '💸', route: 'FundTransfer' },
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
              <Text style={styles.icon}>{action.icon}</Text>
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
    paddingBottom: 4,
  },
  item: {
    alignItems: 'center',
    width: 72,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  icon: {
    fontSize: 22,
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
