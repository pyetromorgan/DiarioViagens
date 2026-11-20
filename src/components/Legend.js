// Legenda dos gráficos: cor, nome e valor de cada fatia.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/theme';

export default function Legend({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <View style={styles.box}>
      {data.map((d) => (
        <View key={d.key} style={styles.row}>
          <View style={[styles.swatch, { backgroundColor: d.svg.fill }]} />
          <Text style={styles.label}>{d.label}</Text>
          <Text style={styles.value}>
            {d.value} ({total ? Math.round((d.value / total) * 100) : 0}%)
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  swatch: { width: 16, height: 16, borderRadius: 4, marginRight: 10 },
  label: { flex: 1, color: colors.text, fontSize: 15 },
  value: { color: colors.text, fontWeight: '700', fontSize: 15 },
});
