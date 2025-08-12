# TikMesaj React Native (Expo) — Proje Dosyaları

Aşağıda tek bir React Native (Expo) projesi için gerekli **tam kaynak kodu** dosyaları birleşik bir formatta verilmiştir. Her dosya başında `// --- <dosya yolu>` şeklinde bir başlık var. Bu projeyi kopyalayıp yerel bir klasöre yapıştırdıktan sonra çalıştırabilirsin.

> NOT: Lokal sunucuna (server.js) bağlanırken emülatör / gerçek cihaz farkları var. Android emulator (Android Studio) için `http://10.0.2.2:5000` kullan; iOS simulator için `http://localhost:5000` kullanılabilir. Gerçek cihaz kullanacaksan bilgisayarının LAN IP'sini (ör. `http://192.168.1.42:5000`) `API_BASE_URL` olarak ayarla.

// --- package.json
{
  "name": "tikmesaj-app",
  "version": "1.0.0",
  "private": true,
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios"
  },
  "dependencies": {
    "expo": "~48.0.0",
    "expo-status-bar": "~1.4.0",
    "react": "18.2.0",
    "react-native": "0.71.8",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "react-native-gesture-handler": "~2.9.0",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0"
  }
}

// --- App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- config/api.js
// API_BASE_URL'i ortamına göre değiştir: 
// - Android emulator: http://10.0.2.2:5000
// - iOS simulator: http://localhost:5000
// - Gerçek cihaz: http://<YOUR_COMPUTER_IP>:5000
export const API_BASE_URL = 'http://10.0.2.2:5000';
export const WS_BASE = 'ws://10.0.2.2:5000/ws';

// --- screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../config/api';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Giriş başarısız');

      navigation.replace('Home', { user: data.user });
    } catch (err) {
      Alert.alert('Hata', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TıkMesaj - Giriş</Text>
      <TextInput placeholder="Kullanıcı adı" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Giriş Yap" onPress={login} />
      <View style={{ height: 10 }} />
      <Button title="Kayıt Ol" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 6 }
});

// --- screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../config/api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Kayıt başarısız');

      Alert.alert('Başarılı', 'Kayıt başarılı, giriş yapabilirsiniz');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Hata', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TıkMesaj - Kayıt</Text>
      <TextInput placeholder="İsim" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Kullanıcı adı" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Kayıt Ol" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 6 }
});

// --- screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { API_BASE_URL } from '../config/api';

export default function HomeScreen({ route, navigation }) {
  const { user } = route.params;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Not: server.js'de toplu kullanıcı endpoint'i yok, bu örnek için users Map'ini almak yerine
      // sadece destek hesabını ve kendi kullanıcı adını göstereceğiz.
      // İstersen server.js'e `/api/all-users` endpoint'i ekleyebilirim.
      setUsers([{ username: 'tikmesajdestek', name: 'TıkMesaj Destek' }, { username: user.username, name: user.name }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Hoşgeldin, {user.name}</Text>
      <Text style={{ marginBottom: 8 }}>Kullanıcılar:</Text>
      <FlatList
        data={users}
        keyExtractor={(i) => i.username}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Chat', { user, otherUser: item })}>
            <Text>{item.name} ({item.username})</Text>
            <Text style={{ color: '#888' }}>{item.username === user.username ? 'Ben' : 'Sohbet başlat'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ row: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' } });

// --- screens/ChatScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { WS_BASE, API_BASE_URL } from '../config/api';

export default function ChatScreen({ route }) {
  const { user, otherUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const wsRef = useRef(null);

  const chatId = `private_${Math.min(user.id || 0, otherUser.username)}_${Math.max(user.id || 0, otherUser.username)}`; // basit id

  useEffect(() => {
    // Fetch old messages
    const loadMessages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/messages/${chatId}`);
        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.warn(err);
      }
    };

    loadMessages();

    // WebSocket connect
    const wsUrl = WS_BASE;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WS open');
      ws.send(JSON.stringify({ type: 'userOnline', userId: user.username }));
    };

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'newMessage') {
          setMessages((prev) => [...prev, msg.message]);
        }
      } catch (err) {
        console.error('WS parse error', err);
      }
    };

    ws.onerror = (err) => console.error('WS error', err);
    ws.onclose = () => console.log('WS closed');

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    const payload = {
      type: 'sendMessage',
      chatId: `${user.username}_${otherUser.username}`,
      senderId: user.username,
      text
    };

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
      setText('');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ flex: 1, padding: 12 }}>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>{otherUser.name} ile sohbet</Text>

        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View style={[styles.msg, item.senderId === user.username ? styles.mine : styles.theirs]}>
              <Text>{item.text}</Text>
              <Text style={{ fontSize: 10, color: '#666' }}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
            </View>
          )}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput value={text} onChangeText={setText} placeholder="Mesaj yaz..." style={styles.input} />
          <Button title="Gönder" onPress={sendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, marginRight: 8, borderRadius: 6 },
  msg: { padding: 8, marginVertical: 6, borderRadius: 8, maxWidth: '80%' },
  mine: { alignSelf: 'flex-end', backgroundColor: '#d1ffd6' },
  theirs: { alignSelf: 'flex-start', backgroundColor: '#f1f1f1' }
});

// --- README
/*
Çalıştırma talimatları:
1) Bilgisayarında Node.js ve npm/yarn olmalı.
2) Bu dosyaları bir klasöre koy: örn: tikmesaj-app/
3) Terminalde klasöre gir:
   npm install
   npm start
4) Eğer Android emulator kullanıyorsan: expo run:android (veya `npm run android`). iOS simulator için `npm run ios`.
5) API sunucunu (server.js) çalıştır: node server.js
6) Android emulator için API_BASE_URL ve WS_BASE değerlerini `http://10.0.2.2:5000` ve `ws://10.0.2.2:5000/ws` olarak ayarladım. Gerçek cihaz/different env kullanıyorsan `config/api.js` içindeki URL'leri değiştir.

Notlar:
- server.js'de toplu kullanıcı listeleme endpoint'i yok. Eğer kullanıcı listesini sunucudan almak istersen, server.js'e `/api/all-users` gibi bir endpoint ekleyebilirim.
- Ben demo amaçlı basit, hızlı ve çalışacak bir yapı verdim. Güvenlik (şifreleme, token, HTTPS) ve hata yönetimi için geliştirme yapmalısın.
*/
