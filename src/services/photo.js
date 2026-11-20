// Captura/escolha de foto e gravação na galeria do dispositivo.
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

// Tira a foto na hora, salva na galeria e devolve o uri.
export async function takePhoto() {
  const cam = await ImagePicker.requestCameraPermissionsAsync();
  if (!cam.granted) {
    Alert.alert('Permissão negada', 'Sem acesso à câmera não é possível tirar a foto.');
    return null;
  }
  const res = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: true,
    aspect: [4, 3],
  });
  if (res.canceled) return null;
  const uri = res.assets[0].uri;

  // Salva a foto na galeria do aparelho (expo-media-library).
  const lib = await MediaLibrary.requestPermissionsAsync(true);
  if (lib.granted) {
    try {
      await MediaLibrary.saveToLibraryAsync(uri);
    } catch (e) {
      Alert.alert('Aviso', 'A foto foi tirada, mas não foi possível salvá-la na galeria.');
    }
  } else {
    Alert.alert('Permissão negada', 'Sem acesso à galeria a foto não será salva no aparelho.');
  }
  return uri;
}

// Escolhe uma foto já existente na galeria.
export async function pickFromGallery() {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) {
    Alert.alert('Permissão negada', 'Sem acesso à galeria não é possível escolher a foto.');
    return null;
  }
  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.7,
    allowsEditing: true,
    aspect: [4, 3],
  });
  if (res.canceled) return null;
  return res.assets[0].uri;
}
