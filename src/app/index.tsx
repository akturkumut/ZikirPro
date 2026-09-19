import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

export default function Index() {
  const router= useRouter();

  useEffect
  return (
    <SafeAreaView style={styles.container}>


    <ImageBackground
    source={require('../../assets/images/background-main.jpg')}
    style={styles.backgroundImage}
    resizeMode="cover"
    >

      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={[styles.button,styles.primaryButton]}
        onPress={()=> router.push("/newScreen")}
        >
          <Text style={styles.primaryButtonText}>Zikir Oluştur</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        style={[styles.button,styles.primaryButton]}
        onPress={()=>{router.push("/zikirler")}}
        >
          <Text style={styles.primaryButtonText}>Zikirlerim</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[styles.button,styles.primaryButton]}
        onPress={()=>{router.push("/zikir")}}
        >
          <Text style={styles.primaryButtonText}>Zikir Çek</Text>
        </TouchableOpacity>
      </View>
</ImageBackground>
</SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212'},
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: '80%',
    gap: 16, // Butonlar arası boşluk (React Native >= 0.71)
    marginBottom: 20,
  },
button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
},
buttonText: {
  color: '#F9FAFB',
  fontSize: 16,        // Metin boyutunu büyütür
  fontWeight: '600',   // Metni kalınlaştırır (Semi-bold)
},
primaryButton: {
    backgroundColor: '#ffffff20', // Seçtiğiniz zümrüt yeşili
    borderColor: '#F9FAFB40',
    borderWidth: 1
  },
  primaryButtonText: {
    color: '#F9FAFBDD',
    fontSize: width * 0.042,
    fontWeight: '600',
  }
})
