import { getAllRowsNoFav, ZikirLog } from '@/db';
import { ImageBackground } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function zikir() {
  const [zikirler, setZikirler] = useState<ZikirLog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  const rows = getAllRowsNoFav();

  if (rows && rows.length > 0) {
    setZikirler(rows);
  }
}, []);



  return (
    <ImageBackground
    source={require("@/assets/images/background-zikir1.jpg")}
    style={styles.backgroundImage}>
      <View style={{flexDirection: 'row', 
    alignItems: 'center',width:'100%', height:'40%', justifyContent:'center'}}>
        <Text style={{fontSize:32}}>Zikir Adı</Text>
      </View>
      <View style={[styles.card,{margin:24, marginTop:36, justifyContent:'center'}]}>
        <Text>100/250</Text>
      </View>
            <View style={styles.card}>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.4)',
    borderRadius: 12,
    marginBottom:16 },
})