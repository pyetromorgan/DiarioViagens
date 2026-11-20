// Item da lista: miniatura, nome, cidade e status.
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';
import { colors } from '../theme/theme';

export default function PlaceCard({ place, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {place.fotoUri ? (
        <Image source={{ uri: place.fotoUri }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.noPhoto]}>
          <Text style={styles.noPhotoText}>Sem foto</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{place.nome}</Text>
        <Text style={styles.city} numberOfLines={1}>{place.cidade} - {place.estado}</Text>
        <StatusBadge status={place.status} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12,
    padding: 10, marginBottom: 10, borderWidth: 1, borderColor: colors.border,
  },
  thumb: { width: 84, height: 84, borderRadius: 8, backgroundColor: colors.border },
  noPhoto: { alignItems: 'center', justifyContent: 'center' },
  noPhotoText: { color: colors.muted, fontSize: 11 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  name: { fontSize: 17, fontWeight: '700', color: colors.text },
  city: { fontSize: 14, color: colors.muted },
});
