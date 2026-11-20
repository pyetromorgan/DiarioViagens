// Converte o endereço digitado em latitude/longitude com Location.geocodeAsync.
import * as Location from 'expo-location';

export async function enderecoParaCoordenadas({ rua, numero, cidade, estado }) {
  const enderecoCompleto = `${rua}, ${numero}, ${cidade} - ${estado}, Brasil`;
  const resultado = await Location.geocodeAsync(enderecoCompleto);
  if (!resultado || resultado.length === 0) return null; // endereço não encontrado
  return { latitude: resultado[0].latitude, longitude: resultado[0].longitude };
}
