import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { Colors } from '../constants/colors';

export default function FundTransferScreen({ navigation }: any) {
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = () => {
    if (!accountNo || !ifsc || !name || !amount) {
      Alert.alert('Missing fields', 'Please fill in all required fields.');
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Invalid amount', 'Enter a valid transfer amount.');
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
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Fund Transfer</Text>
          <Text style={styles.sub}>NEFT / IMPS / RTGS</Text>

          <View style={styles.card}>
            <View style={styles.field}>
              <Text style={styles.label}>Account Number *</Text>
              <TextInput
                style={styles.input}
                value={accountNo}
                onChangeText={setAccountNo}
                placeholder="Enter account number"
                placeholderTextColor={Colors.textLight}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>IFSC Code *</Text>
              <TextInput
                style={styles.input}
                value={ifsc}
                onChangeText={v => setIfsc(v.toUpperCase())}
                placeholder="e.g. OSBB0001234"
                placeholderTextColor={Colors.textLight}
                autoCapitalize="characters"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Beneficiary Name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                placeholderTextColor={Colors.textLight}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Amount (₹) *</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={Colors.textLight}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Remark (optional)</Text>
              <TextInput
                style={styles.input}
                value={remark}
                onChangeText={setRemark}
                placeholder="Add a note"
                placeholderTextColor={Colors.textLight}
              />
            </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  content: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  sub: { fontSize: 13, color: Colors.textSecondary, marginBottom: 20 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  field: { marginBottom: 16 },
  label: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text,
    backgroundColor: Colors.background,
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
