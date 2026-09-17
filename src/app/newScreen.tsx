import { addRow } from '@/db';
import { ImageBackground } from 'expo-image';
import { useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, TextInput } from 'react-native';

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
    const ustSinirSayi = Number(ustSinir) || null;
    // Zikir kaydetme işlemi...
    const insertedId = addRow({
      name: zikirName,
      count: 0,
      target_count: ustSinirSayi,
      description: fazilet.trim() || null,
    });

    if (insertedId) {
      // Kayıttan sonra kutuları temizle (value prop'ları sayesinde ekrandan da silinir)
      setZikirName('');
      setUstSinir('');
      setFazilet('');
      console.log("Kaydedildi");
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
      placeholderTextColor={'#ffffff'}
      onChangeText={(val)=>{setZikirName(val)}}
      />
      <TextInput
      style={styles.input}
      value={ustSinir}
      placeholder='Üst Sınır'
      placeholderTextColor={'#ffffff'}
      inputMode='decimal'
      onChangeText={(val)=>{setUstSinir(val)}}
      />
      <TextInput
      style={styles.fazilet}
      value={fazilet}
      placeholder='Fazileti - (Boş bırakılabilir)'
      placeholderTextColor={'#ffffff'}
      multiline
      onChangeText={(val)=>{setFazilet(val)}}
      />
      <Button 
      title='Kaydet'
      color={'#46967d4d'}
      onPress={handlesubmit}
      ></Button>

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
    color:'white',
    height: 40,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 60,
    borderColor:'white',
    padding: 10,
    backgroundColor: '#ffffff20',
    fontSize: 16
  },
  fazilet: {
    color:'white',
    height: 100,
    width: 160,
    borderWidth: 1,
    borderRadius: 30,
    borderColor:'white',
    margin:12,
    marginBottom: 24,
    padding: 10,
    backgroundColor: '#ffffff20',
    fontSize: 16,
  }
})