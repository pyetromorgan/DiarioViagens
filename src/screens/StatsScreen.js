// Tela 5: estatísticas. Os gráficos são calculados a partir dos lugares cadastrados.
import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { usePlaces } from '../context/PlacesContext';
import Legend from '../components/Legend';
import { colors, STATUS, statusColor, chartPalette } from '../theme/theme';

export default function StatsScreen() {
  const { places } = usePlaces();

  // Gráfico 1: quantidade por status.
  const porStatus = useMemo(
    () =>
      Object.values(STATUS)
        .map((s) => ({
          key: s, label: s,
          value: places.filter((p) => p.status === s).length,
          svg: { fill: statusColor[s] },
        }))
        .filter((d) => d.value > 0),
    [places]
  );

  // Gráfico 2: quantidade por cidade/estado.
  const porCidade = useMemo(() => {
    const contagem = {};
    places.forEach((p) => {
      const chave = `${p.cidade} - ${p.estado}`;
      contagem[chave] = (contagem[chave] || 0) + 1;
    });
    return Object.entries(contagem).map(([nome, valor], i) => ({
      key: nome, label: nome, value: valor,
      svg: { fill: chartPalette[i % chartPalette.length] },
    }));
  }, [places]);

  if (places.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Sem dados para mostrar</Text>
        <Text style={styles.emptyText}>Cadastre lugares para ver os gráficos.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Lugares por status</Text>
        <PieChart style={styles.chart} data={porStatus} innerRadius="35%" outerRadius="95%" />
        <Legend data={porStatus} />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Lugares por cidade</Text>
        <PieChart style={styles.chart} data={porCidade} innerRadius="35%" outerRadius="95%" />
        <Legend data={porCidade} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 14, paddingBottom: 30 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 10 },
  chart: { height: 210 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, padding: 30 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  emptyText: { marginTop: 6, color: colors.muted, textAlign: 'center' },
});
