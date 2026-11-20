import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { statusColor } from '../theme/theme';

export default function StatusBadge({ status }) {
  const color = statusColor[status] || '#999';
  return (
    <View style={[styles.badge, { backgroundColor: color + '26', borderColor: color }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, borderWidth: 1,
  },
  dot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  text: { fontSize: 12, fontWeight: '700' },
});
