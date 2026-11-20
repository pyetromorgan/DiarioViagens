// Tela 1 (inicial): lista de lugares.
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlaces } from '../context/PlacesContext';
import PlaceCard from '../components/PlaceCard';
import { colors } from '../theme/theme';

export default function PlacesListScreen({ navigation }) {
  const { places } = usePlaces();

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PlaceCard place={item} onPress={() => navigation.navigate('Detalhes', { placeId: item.id })} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nenhum lugar cadastrado</Text>
            <Text style={styles.emptyText}>Toque em "Adicionar lugar" para registrar o primeiro.</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.fabText}>+ Adicionar lugar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 14, paddingBottom: 90 },
  empty: { alignItems: 'center', marginTop: 80, paddingHorizontal: 30 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  emptyText: { marginTop: 6, color: colors.muted, textAlign: 'center' },
  fab: {
    position: 'absolute', right: 16, bottom: 16, backgroundColor: colors.primary,
    paddingHorizontal: 20, paddingVertical: 14, borderRadius: 28, elevation: 4,
  },
  fabText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
