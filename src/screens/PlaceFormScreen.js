import React, { useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import { usePlaces } from '../context/PlacesContext';
import { enderecoParaCoordenadas } from '../services/geocode';
import { takePhoto, pickFromGallery } from '../services/photo';
import { colors, STATUS, statusColor } from '../theme/theme';

export default function PlaceFormScreen({ route, navigation }) {
  const { addPlace, updatePlace, getPlace } = usePlaces();
  const editing = route.params?.placeId ? getPlace(route.params.placeId) : null;

  const [form, setForm] = useState({
    nome: editing?.nome ?? '',
    descricao: editing?.descricao ?? '',
    rua: editing?.rua ?? '',
    numero: editing?.numero ?? '',
    cidade: editing?.cidade ?? '',
    estado: editing?.estado ?? '',
    status: editing?.status ?? STATUS.QUERO,
  });
  const [fotoUri, setFotoUri] = useState(editing?.fotoUri ?? null);
  const [saving, setSaving] = useState(false);

  const set = (campo) => (valor) => setForm((f) => ({ ...f, [campo]: valor }));

  const onTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) setFotoUri(uri);
  };
  const onPickPhoto = async () => {
    const uri = await pickFromGallery();
    if (uri) setFotoUri(uri);
  };

  const salvar = async () => {
    const obrigatorios = ['nome', 'rua', 'numero', 'cidade', 'estado'];
    if (obrigatorios.some((c) => !form[c].trim())) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, rua, número, cidade e estado.');
      return;
    }

    setSaving(true);
    try {
      const perm = await Location.requestForegroundPermissionsAsync();
      if (perm.status !== 'granted') {
        Alert.alert('Permissão de localização negada', 'Vamos tentar encontrar o endereço mesmo assim.');
      }

      const coords = await enderecoParaCoordenadas({
        rua: form.rua.trim(), numero: form.numero.trim(),
        cidade: form.cidade.trim(), estado: form.estado.trim(),
      });

      if (!coords) {
        Alert.alert('Endereço não encontrado', 'Confira rua, número, cidade e estado e tente de novo.');
        return;
      }

      const dados = {
        ...form,
        nome: form.nome.trim(), descricao: form.descricao.trim(),
        rua: form.rua.trim(), numero: form.numero.trim(),
        cidade: form.cidade.trim(), estado: form.estado.trim().toUpperCase(),
        fotoUri, ...coords,
      };

      if (editing) updatePlace(editing.id, dados);
      else addPlace(dados);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível converter o endereço. Verifique sua conexão e tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.photoBox}>
          {fotoUri ? (
            <Image source={{ uri: fotoUri }} style={styles.photo} />
          ) : (
            <View style={[styles.photo, styles.noPhoto]}><Text style={{ color: colors.muted }}>Sem foto</Text></View>
          )}
          <View style={styles.photoButtons}>
            <TouchableOpacity style={styles.outlineBtn} onPress={onTakePhoto}>
              <Text style={styles.outlineText}>Tirar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineBtn} onPress={onPickPhoto}>
              <Text style={styles.outlineText}>Escolher da galeria</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={form.nome} onChangeText={set('nome')} placeholder="Ex.: Cristo Redentor" />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]} multiline
          value={form.descricao} onChangeText={set('descricao')} placeholder="Por que quer conhecer este lugar?"
        />

        <Text style={styles.label}>Rua</Text>
        <TextInput style={styles.input} value={form.rua} onChangeText={set('rua')} placeholder="Ex.: Av. Paulista" />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Número</Text>
            <TextInput style={styles.input} value={form.numero} onChangeText={set('numero')} keyboardType="default" placeholder="1000" />
          </View>
          <View style={{ flex: 2, marginLeft: 10 }}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput style={styles.input} value={form.cidade} onChangeText={set('cidade')} placeholder="São Paulo" />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.label}>Estado</Text>
            <TextInput style={styles.input} value={form.estado} onChangeText={set('estado')} maxLength={2} autoCapitalize="characters" placeholder="SP" />
          </View>
        </View>

        <Text style={styles.label}>Status</Text>
        <View style={styles.row}>
          {Object.values(STATUS).map((s) => {
            const ativo = form.status === s;
            return (
              <TouchableOpacity
                key={s}
                style={[styles.statusBtn, ativo && { backgroundColor: statusColor[s], borderColor: statusColor[s] }]}
                onPress={() => set('status')(s)}
              >
                <Text style={[styles.statusText, ativo && { color: '#fff' }]}>{s}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={salvar} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>{editing ? 'Salvar alterações' : 'Salvar lugar'}</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 40 },
  photoBox: { marginBottom: 8 },
  photo: { width: '100%', height: 190, borderRadius: 12, backgroundColor: colors.border },
  noPhoto: { alignItems: 'center', justifyContent: 'center' },
  photoButtons: { flexDirection: 'row', marginTop: 10, gap: 10 },
  outlineBtn: { flex: 1, borderWidth: 1.5, borderColor: colors.primary, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  outlineText: { color: colors.primary, fontWeight: '700' },
  label: { marginTop: 12, marginBottom: 4, fontWeight: '700', color: colors.text },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  row: { flexDirection: 'row' },
  statusBtn: { flex: 1, borderWidth: 1.5, borderColor: colors.border, backgroundColor: '#fff', borderRadius: 10, paddingVertical: 11, alignItems: 'center', marginRight: 8 },
  statusText: { fontWeight: '700', color: colors.text },
  saveBtn: { marginTop: 24, backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
