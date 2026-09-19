import { addRow } from '@/db';
import { ImageBackground } from 'expo-image';
import { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function newScreen() {
  const [zikirName, setZikirName] = useState('');
  const [ustSinir, setUstSinir] = useState('');
  const [fazilet, setFazilet] = useState('');

  const handlesubmit = () => {
    if (!zikirName.trim()) {
      Alert.alert('Hata', 'Lütfen bir zikir adı girin.');
      return;
    }
    Keyboard.dismiss();
    const ustSinirSayi = parseInt(ustSinir, 10);

    const insertedId = addRow({
      name: zikirName.trim(),
      count: 0,
      target_count: ustSinirSayi > 0 ? ustSinirSayi : null,
      description: fazilet.trim() || null,
    });

    if (insertedId) {
      // Kayıttan sonra kutuları temizle (value prop'ları sayesinde ekrandan da silinir)
      setZikirName('');
      setUstSinir('');
      setFazilet('');
      Alert.alert('Kaydedildi', 'Zikir eklendi.');
    }
  };

  return (
    <ImageBackground
     source={require('../../assets/images/background-adding-page.jpg')}
     style= {styles.backgroundImage}>
      <TextInput
      style={styles.input}
      value= {zikirName}
      placeholder='Zikir Adı'
      placeholderTextColor={'#000'}
      onChangeText={(val)=>{setZikirName(val)}}
      />
      <TextInput
        style={styles.input}
        value={ustSinir}
        placeholder='Üst Sınır'
        placeholderTextColor={'#000'}
        inputMode='numeric'
        maxLength={9}
        onChangeText={(val) => setUstSinir(val.replace(/[^0-9]/g, ''))}
      />
      <TextInput
      style={styles.fazilet}
      value={fazilet}
      placeholder='Fazileti - (Boş bırakılabilir)'
      placeholderTextColor={'#000'}
      multiline
      onChangeText={(val)=>{setFazilet(val)}}
      />
    <TouchableOpacity
      style={styles.saveButton}
      activeOpacity={0.7}
      onPress={handlesubmit}
    >
      <Text style={{color:'#000', fontSize:18}}>Kaydet</Text>
    </TouchableOpacity>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 60,
    borderColor:'rgba(255,255,255,0.15)',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    fontSize: 18
  },
  fazilet: {
    height: 120,
    width: 160,
    borderWidth: 1,
    borderRadius: 30,
    borderColor:'rgba(255,255,255,0.15)',
    margin:12,
    marginBottom: 24,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    fontSize: 16,
    fontWeight: '400'
  },
  saveButton: {
  width: 160,
  height: 48,
  borderRadius: 60,
  backgroundColor: 'rgba(255,255,255,0.15)',
  borderWidth: 1,
  borderColor:'rgba(255,255,255,0.15)',
  alignItems: 'center',
  justifyContent: 'center'
}
})