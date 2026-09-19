import { getAllRowsNoFav, updateCount, ZikirLog } from '@/db';
import { ImageBackground } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function zikir() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [zikirler, setZikirler] = useState<ZikirLog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  const rows = getAllRowsNoFav();

  if (rows && rows.length > 0) {
    setZikirler(rows);
    
    if (id) {
      const i = rows.findIndex(r => r.id === Number(id));
      if (i >= 0) setCurrentIndex(i);
    }
  }
}, [id]);

  const controlledDecrementIndex = () => {
    if(currentIndex == 0){
      setCurrentIndex(zikirler.length-1);
    }else{
      setCurrentIndex(currentIndex-1);
    }
  };
    const controlledIncrementIndex = () => {
    if(currentIndex == zikirler.length-1){
      setCurrentIndex(0);
    }else{
      setCurrentIndex(currentIndex+1);
    }
  };

const updateZikirCount = (delta: number) => {
  const currentZikir = zikirler[currentIndex];
  if (!currentZikir) return;

  const newCount = currentZikir.count + delta;
  if (newCount < 0) return; // 0'ın altına düşmeme garantisi

  const success = updateCount(currentZikir.id, newCount);

  if (success) {
    setZikirler((prev) => {
      const updated = [...prev];
      updated[currentIndex] = {
        ...currentZikir,
        count: newCount,
        updated_at: new Date().toISOString(),
      };
      return updated;
    });
  }
};

// Kullanımı:
const handleZikirCek = () => updateZikirCount(1);
const handleZikirAzalt = () => updateZikirCount(-1);

  return (
    zikirler.length === 0 ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Zikir eklemediniz</Text>
    </View>
  ) :(
    <ImageBackground
    source={require("@/assets/images/background-zikir1.jpg")}
    style={styles.backgroundImage}>
      <View style={{flexDirection: 'row', 
    alignItems: 'center',width:'100%', height:'40%', justifyContent:'center'}}>
        <Text style={{fontSize:32}}>{zikirler[currentIndex].name}</Text>
      </View>
      <View style={[styles.card,{margin:24, marginTop:36, justifyContent:'center'}]}>
          <Text style={{fontSize: 26}}>{zikirler[currentIndex].count}{zikirler[currentIndex].target_count ? `/${zikirler[currentIndex].target_count}` : ''}
          </Text>
      </View>

      <View style={[styles.cardx, {width:'100%', height:'40%',justifyContent:'space-between'}]}>
        <View style={{flexDirection:'column', backgroundColor:'#00000040',justifyContent:'center'}}>
          <TouchableOpacity onPress={controlledDecrementIndex}>
            <Text style={{fontSize:42, color:'white'}}>{"<"}</Text>
          </TouchableOpacity>
        </View>
            <View style={{flexDirection:'column', width:'40%',alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity style={styles.button} onPress={handleZikirCek}>
                  <Text style={styles.buttonText}>Zikir Çek</Text>
                </TouchableOpacity>
          </View>
        <View style={{flexDirection:'column', backgroundColor:'#00000040',justifyContent:'center'}}>
          <TouchableOpacity onPress={controlledIncrementIndex}>
            <Text style={{fontSize:42, color:'white'}}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems:'center', backgroundColor:'#00000040'}}>
        <TouchableOpacity onPress={handleZikirAzalt}>
            <Text style={{fontSize:20, color:'white'}}>Azalt</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  )
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
    cardx: { 
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.4)',
    borderRadius: 12,
    marginBottom:16 },

    button: {
    backgroundColor: '#00000040',
    width:240,
    height:240,
    borderRadius: 120,
    alignItems:'center', justifyContent:'center'
  },
  buttonText: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '600',
  },
})