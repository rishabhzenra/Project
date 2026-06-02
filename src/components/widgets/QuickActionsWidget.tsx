import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Widget } from '../../types';
import SectionHeader from '../SectionHeader';
import { Colors } from '../../constants/colors';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ACTIONS: { label: string; icon: IoniconName; route: string }[] = [
  { label: 'QR Code', icon: 'qr-code-outline', route: 'QRCode' },
  { label: 'UPI ID', icon: 'phone-portrait-outline', route: 'UPI' },
  { label: 'History', icon: 'time-outline', route: 'UPIHistory' },
  { label: 'Send Money', icon: 'arrow-up-circle-outline', route: 'FundTransfer' },
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
              <Ionicons name={action.icon} size={24} color={Colors.primary} />
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
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
