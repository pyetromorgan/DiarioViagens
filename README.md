# Diário de Viagens

Aplicativo mobile (React Native + Expo) para registrar lugares que você quer visitar ou que já visitou, com foto, mapa e gráficos.
Nome: Pyetro Andrade Morgan - 4 DSM
## Funcionalidades

- **Lugares:** lista com foto, nome, cidade e status; botão para adicionar.
- **Cadastro:** nome, descrição, rua, número, cidade, estado, status e foto (câmera ou galeria). O endereço vira latitude/longitude com `Location.geocodeAsync`; se não for encontrado, o app avisa e não cadastra.
- **Detalhes:** todos os dados, foto, mini mapa, editar, marcar como Visitado e remover.
- **Mapa:** marcador com o nome de cada lugar e a localização atual (hook `useLocation`).
- **Estatísticas:** gráfico de pizza por status e por cidade, com legenda e dados reais.
- Fotos tiradas pela câmera são salvas na galeria do aparelho.

## Como instalar e executar

Pré-requisitos: Node.js (versão LTS), npm e o app **Expo Go** no celular (ou um emulador).

```bash
# 1. Clonar o repositório
git clone <URL-DO-REPOSITORIO>
cd DiarioViagens

# 2. Instalar as dependências
npm install --legacy-peer-deps

# 3. Iniciar o app
npx expo start
```

Escaneie o QR Code com o Expo Go (Android) ou com a câmera (iOS). Aceite as permissões de localização, câmera e galeria quando solicitado. É necessária conexão com a internet (geocodificação e mapa).

## Estrutura

```
App.js
src/
  components/   PlaceCard, StatusBadge, Legend
  context/      PlacesContext (estado global dos lugares)
  hooks/        useLocation
  navigation/   AppNavigator (abas + pilha)
  screens/      Lista, Cadastro, Detalhes, Mapa, Estatísticas
  services/     geocode (endereço -> coordenadas), photo (câmera/galeria)
  theme/        cores e constantes
```

## Bibliotecas

expo-location, react-native-maps, expo-image-picker, expo-media-library, react-native-svg, react-native-svg-charts, @react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs.
