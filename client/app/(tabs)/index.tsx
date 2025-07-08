import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://192.168.100.51:3000/') // 🔁 Replace with your actual IP
      .then(res => res.text())
      .then(data => {
        console.log('✅ Connected to server:', data);
        setMessage(data);
      })
      .catch(err => {
        console.error('❌ API error:', err);
        setMessage('Failed to connect to backend.');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backend Says:</Text>
      <Text style={styles.message}>{message || 'Loading...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // to match dark theme
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
  },
  message: {
    fontSize: 18,
    color: 'lime',
    marginTop: 10,
  },
});
