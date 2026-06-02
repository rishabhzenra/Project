import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { BillCategory } from '../types';

export default function BillPayScreen({ route, navigation }: any) {
  const insets = useSafeAreaInsets();
  const category: BillCategory = route.params?.category;
  const [consumer, setConsumer] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if (!consumer || !amount) {
      Alert.alert('Required', 'Please fill all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Payment Successful',
        `₹${Number(amount).toLocaleString('en-IN')} paid for ${category?.label}`,
        [{ text: 'Done', onPress: () => navigation.goBack() }]
      );
    }, 1200);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView
        style={styles.safe}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerCard}>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>{category?.label?.slice(0, 2).toUpperCase() || 'BP'}</Text>
          </View>
          <Text style={styles.categoryName}>{category?.label || 'Bill Payment'}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Consumer / Account Number</Text>
            <TextInput
              style={styles.input}
              value={consumer}
              onChangeText={setConsumer}
              placeholder="Enter number"
              placeholderTextColor={Colors.textLight}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Amount (₹)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={Colors.textLight}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handlePay}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text style={styles.btnText}>{loading ? 'Processing...' : 'Pay Now'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconText: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  categoryName: { fontSize: 17, fontWeight: '700', color: Colors.text },
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
  btn: { backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnDisabled: { backgroundColor: Colors.textLight },
  btnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
