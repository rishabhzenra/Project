import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView, View, Text, StyleSheet,
  TouchableOpacity, RefreshControl, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../services/api';
import { Widget, UserProfile } from '../types';
import BalanceCard from '../components/BalanceCard';
import WidgetRenderer from '../components/WidgetRenderer';
import { Colors } from '../constants/colors';

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
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

  const handleRefreshBalance = () => {
    setBalanceLoading(true);
    api.getUserProfile().then(setProfile).finally(() => setBalanceLoading(false));
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.userName}>{profile?.name || 'User'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="notifications" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); loadData(true); }}
            tintColor={Colors.primary}
          />
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

        <View style={{ height: insets.bottom + 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  greeting: { fontSize: 11, color: Colors.textSecondary, marginBottom: 1 },
  userName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
