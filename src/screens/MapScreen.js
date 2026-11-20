// Tela 4: mapa com um marcador por lugar e a localização atual (hook useLocation).
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { usePlaces } from '../context/PlacesContext';
import useLocation from '../hooks/useLocation';
import { colors, statusColor } from '../theme/theme';

const FRANCA = { latitude: -20.5386, longitude: -47.4008 }; // região padrão

export default function MapScreen({ navigation }) {
  const { places } = usePlaces();
  const { location, errorMsg, loading, refresh } = useLocation();
  const mapRef = useRef(null);

  const inicio = places[0] || FRANCA;

  const irParaMim = () => {
    if (location) {
      mapRef.current?.animateToRegion({ ...location, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 600);
    } else {
      refresh();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{ latitude: inicio.latitude, longitude: inicio.longitude, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
      >
        {places.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            title={p.nome}
            description={p.status}
            onPress={() => navigation.navigate('Detalhes', { placeId: p.id })} // abre os detalhes
          >
            {/* Rótulo sempre visível com o nome do lugar */}
            <View style={styles.pin}>
              <Text style={styles.pinText} numberOfLines={1}>{p.nome}</Text>
              <View style={[styles.pinDot, { backgroundColor: statusColor[p.status] }]} />
            </View>
          </Marker>
        ))}

        {location && (
          <Marker coordinate={location} title="Você está aqui" pinColor="#1E6FD9" />
        )}
      </MapView>

      {loading && <ActivityIndicator style={styles.loading} color={colors.primary} />}
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      <TouchableOpacity style={styles.meBtn} onPress={irParaMim}>
        <Text style={styles.meText}>Minha localização</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  pin: { alignItems: 'center' },
  pinText: {
    backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
    fontWeight: '700', fontSize: 12, color: colors.text, maxWidth: 140, overflow: 'hidden',
    borderWidth: 1, borderColor: colors.border,
  },
  pinDot: { width: 14, height: 14, borderRadius: 7, marginTop: 3, borderWidth: 2, borderColor: '#fff' },
  loading: { position: 'absolute', top: 14, alignSelf: 'center' },
  error: {
    position: 'absolute', top: 10, left: 10, right: 10, backgroundColor: '#fff',
    padding: 10, borderRadius: 8, color: colors.danger, textAlign: 'center',
  },
  meBtn: { position: 'absolute', bottom: 16, right: 16, backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 24 },
  meText: { color: '#fff', fontWeight: '700' },
});
