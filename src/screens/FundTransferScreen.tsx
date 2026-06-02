import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';

export default function FundTransferScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = () => {
    if (!accountNo || !ifsc || !name || !amount) {
      Alert.alert('Missing details', 'Please fill all required fields.');
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Transfer Successful',
        `₹${Number(amount).toLocaleString('en-IN')} sent to ${name}`,
        [{ text: 'Done', onPress: () => navigation.goBack() }]
      );
    }, 1400);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView
        style={styles.safe}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {[
            { label: 'Account Number', value: accountNo, set: setAccountNo, keyboard: 'number-pad' as const, placeholder: 'Enter account number' },
            { label: 'IFSC Code', value: ifsc, set: (v: string) => setIfsc(v.toUpperCase()), keyboard: 'default' as const, placeholder: 'e.g. OSBB0001234' },
            { label: 'Beneficiary Name', value: name, set: setName, keyboard: 'default' as const, placeholder: 'Full name as per bank' },
            { label: 'Amount (₹)', value: amount, set: setAmount, keyboard: 'decimal-pad' as const, placeholder: '0.00' },
            { label: 'Remark (optional)', value: remark, set: setRemark, keyboard: 'default' as const, placeholder: 'Add a note' },
          ].map(field => (
            <View key={field.label} style={styles.field}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                value={field.value}
                onChangeText={field.set}
                placeholder={field.placeholder}
                placeholderTextColor={Colors.textLight}
                keyboardType={field.keyboard}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleTransfer}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text style={styles.btnText}>{loading ? 'Processing...' : 'Transfer Now'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  field: { marginBottom: 16 },
  label: { fontSize: 12, color: Colors.textSecondary, marginBottom: 7, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: Colors.text,
    backgroundColor: Colors.inputBg,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnDisabled: { backgroundColor: Colors.textLight },
  btnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
