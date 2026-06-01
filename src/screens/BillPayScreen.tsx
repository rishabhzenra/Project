import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { Colors } from '../constants/colors';
import { BillCategory } from '../types';

export default function BillPayScreen({ route, navigation }: any) {
  const category: BillCategory = route.params?.category;
  const [consumer, setConsumer] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if (!consumer || !amount) {
      Alert.alert('Required', 'Please enter consumer number and amount.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Payment Successful', `₹${Number(amount).toLocaleString('en-IN')} paid for ${category?.label}`, [
        { text: 'Done', onPress: () => navigation.goBack() },
      ]);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.content}>
          <View style={styles.headerCard}>
            <Text style={styles.icon}>{category?.icon || '💳'}</Text>
            <Text style={styles.categoryName}>{category?.label || 'Bill Payment'}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.field}>
              <Text style={styles.label}>Consumer / Account Number *</Text>
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
          </View>

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handlePay}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={styles.btnText}>{loading ? 'Processing...' : 'Pay Now'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  content: { padding: 16 },
  headerCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: { fontSize: 40, marginBottom: 8 },
  categoryName: { fontSize: 17, fontWeight: '700', color: Colors.text },
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
  btn: { backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnDisabled: { backgroundColor: Colors.textLight },
  btnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
