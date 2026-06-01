import React, { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import { api } from '../../services/api';
import { Account, Widget } from '../../types';
import SectionHeader from '../SectionHeader';
import AccountCard from '../AccountCard';
import { Colors } from '../../constants/colors';

interface Props {
  widget: Widget;
  navigation: any;
}

export default function AccountListWidget({ widget, navigation }: Props) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAccounts().then(setAccounts).finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <SectionHeader title={widget.title} onViewAll={() => navigation.navigate('Accounts')} />
      {loading ? (
        <ActivityIndicator color={Colors.primary} style={styles.loader} />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {accounts.map(acc => (
            <AccountCard
              key={acc.id}
              account={acc}
              onPress={() => navigation.navigate('AccountDetail', { account: acc })}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 16, paddingBottom: 4 },
  loader: { marginVertical: 20 },
});
