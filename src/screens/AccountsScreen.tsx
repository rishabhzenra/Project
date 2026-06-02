import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../services/api';
import { Account } from '../types';
import { Colors } from '../constants/colors';
import AccountCard from '../components/AccountCard';

export default function AccountsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAccounts().then(setAccounts).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={accounts}
      keyExtractor={item => item.id}
      contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 16 }]}
      renderItem={({ item }) => (
        <AccountCard
          account={item}
          onPress={() => navigation.navigate('AccountDetail', { account: item })}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListHeaderComponent={<Text style={styles.heading}>My Accounts</Text>}
      style={{ backgroundColor: Colors.background }}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  list: { padding: 16 },
  heading: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: 16 },
});
