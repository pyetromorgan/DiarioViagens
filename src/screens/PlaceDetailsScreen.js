import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { usePlaces } from '../context/PlacesContext';
import StatusBadge from '../components/StatusBadge';
import { colors, STATUS } from '../theme/theme';

export default function PlaceDetailsScreen({ route, navigation }) {
  const { getPlace, markVisited, removePlace } = usePlaces();
  const place = getPlace(route.params.placeId);

  
  if (!place) return null;

  const confirmarRemocao = () => {
    Alert.alert('Remover lugar', `Deseja remover "${place.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive',
        onPress: () => { navigation.goBack(); removePlace(place.id); },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {place.fotoUri ? (
        <Image source={{ uri: place.fotoUri }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.noPhoto]}><Text style={{ color: colors.muted }}>Sem foto</Text></View>
      )}

      <View style={styles.body}>
        <Text style={styles.name}>{place.nome}</Text>
        <StatusBadge status={place.status} />

        <Text style={styles.section}>Descrição</Text>
        <Text style={styles.text}>{place.descricao || 'Sem descrição.'}</Text>

        <Text style={styles.section}>Endereço</Text>
        <Text style={styles.text}>{place.rua}, {place.numero}</Text>
        <Text style={styles.text}>{place.cidade} - {place.estado}</Text>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: place.latitude, longitude: place.longitude,
            latitudeDelta: 0.01, longitudeDelta: 0.01,
          }}
          scrollEnabled={false} zoomEnabled={false}
        >
          <Marker coordinate={{ latitude: place.latitude, longitude: place.longitude }} title={place.nome} />
        </MapView>

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Cadastro', { placeId: place.id })}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        {place.status !== STATUS.VISITADO && (
          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.visitado }]} onPress={() => markVisited(place.id)}>
            <Text style={styles.btnText}>Marcar como Visitado</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.danger }]} onPress={confirmarRemocao}>
          <Text style={styles.btnText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  photo: { width: '100%', height: 230, backgroundColor: colors.border },
  noPhoto: { alignItems: 'center', justifyContent: 'center' },
  body: { padding: 16 },
  name: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 8 },
  section: { marginTop: 16, marginBottom: 2, fontWeight: '700', color: colors.primary },
  text: { fontSize: 15, color: colors.text, lineHeight: 21 },
  map: { height: 180, borderRadius: 12, marginTop: 16, marginBottom: 8 },
  btn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
