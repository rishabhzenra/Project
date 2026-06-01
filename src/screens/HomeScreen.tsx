import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView, View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, RefreshControl, ActivityIndicator,
} from 'react-native';
import { api } from '../services/api';
import { Widget, UserProfile } from '../types';
import BalanceCard from '../components/BalanceCard';
import WidgetRenderer from '../components/WidgetRenderer';
import { Colors } from '../constants/colors';

export default function HomeScreen({ navigation }: any) {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);

  const loadData = useCallback(async (isRefresh = false) => {
    try {
      const [widgetData, profileData] = await Promise.all([
        api.getHomeWidgets(),
        api.getUserProfile(),
      ]);
      const visible = widgetData.filter(w => w.visible).sort((a, b) => a.order - b.order);
      setWidgets(visible);
      setProfile(profileData);
    } catch (e) {
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(true);
  };

  const handleRefreshBalance = () => {
    setBalanceLoading(true);
    api.getUserProfile()
      .then(setProfile)
      .finally(() => setBalanceLoading(false));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{profile?.name || 'User'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.notifIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.primary} />
        }
      >
        <BalanceCard
          netWorth={profile?.netWorth ?? null}
          loading={balanceLoading}
          onRefresh={handleRefreshBalance}
        />

        {widgets.map(widget => (
          <WidgetRenderer key={widget.id} widget={widget} navigation={navigation} />
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  greeting: { fontSize: 11, color: Colors.textSecondary },
  userName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  notifBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: { fontSize: 18 },
  scroll: { flex: 1 },
});
