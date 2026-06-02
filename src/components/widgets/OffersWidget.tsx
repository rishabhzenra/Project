import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Widget, Offer } from '../../types';
import SectionHeader from '../SectionHeader';
import { Colors } from '../../constants/colors';
import { api } from '../../services/api';

interface Props {
  widget: Widget;
  navigation: any;
}

export default function OffersWidget({ widget, navigation }: Props) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOffers().then(setOffers).finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <SectionHeader title={widget.title} onViewAll={() => navigation.navigate('Offers')} />
      {loading ? (
        <ActivityIndicator color={Colors.primary} style={{ marginVertical: 16 }} />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {offers.map(offer => (
            <TouchableOpacity
              key={offer.id}
              style={styles.card}
              onPress={() => navigation.navigate('Offers')}
              activeOpacity={0.85}
            >
              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{offer.tag}</Text>
                </View>
              </View>
              <Text style={styles.title} numberOfLines={2}>{offer.title}</Text>
              <Text style={styles.desc} numberOfLines={2}>{offer.description}</Text>
              <Text style={styles.validity}>Valid till {offer.validTill}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 16, paddingBottom: 4 },
  card: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 14,
    padding: 16,
    width: 210,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F0D5C8',
  },
  tagRow: { marginBottom: 10 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: { fontSize: 10, color: Colors.white, fontWeight: '700', letterSpacing: 0.5 },
  title: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 5, lineHeight: 18 },
  desc: { fontSize: 11, color: Colors.textSecondary, marginBottom: 10, lineHeight: 16 },
  validity: { fontSize: 10, color: Colors.primary, fontWeight: '600' },
});
