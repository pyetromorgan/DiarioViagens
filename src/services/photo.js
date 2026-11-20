import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


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
