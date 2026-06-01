import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '../services/api';
import { Offer } from '../types';
import { Colors } from '../constants/colors';

export default function OffersScreen() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOffers().then(setOffers).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={offers}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.85}>
            <View style={styles.cardTop}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
              <Text style={styles.validity}>Till {item.validTill}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <TouchableOpacity style={styles.claimBtn} activeOpacity={0.8}>
              <Text style={styles.claimText}>View Offer</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.heading}>Offers & Promotions</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 16 },
  heading: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tag: { backgroundColor: Colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tagText: { fontSize: 11, color: Colors.primary, fontWeight: '700' },
  validity: { fontSize: 11, color: Colors.textLight },
  title: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  desc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18, marginBottom: 14 },
  claimBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimText: { fontSize: 13, color: Colors.primary, fontWeight: '700' },
});
