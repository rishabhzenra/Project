import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { api } from '../services/api';
import { Account } from '../types';
import { Colors } from '../constants/colors';
import AccountCard from '../components/AccountCard';

export default function AccountsScreen({ navigation }: any) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAccounts().then(setAccounts).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={accounts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AccountCard
            account={item}
            onPress={() => navigation.navigate('AccountDetail', { account: item })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={<Text style={styles.heading}>Your Accounts</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loader: { flex: 1 },
  list: { padding: 16 },
  heading: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: 16 },
});
