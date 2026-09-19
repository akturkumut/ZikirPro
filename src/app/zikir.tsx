import { getAllRowsNoFav, updateCount, ZikirLog } from '@/db';
import { ImageBackground } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function zikir() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [zikirler, setZikirler] = useState<ZikirLog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalGorunur, setModalGorunur] = useState(false); // pencere açık mı?
  const [toplamSayi, setToplamSayi] = useState('');        // yazılan sayı

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

const topluEkle = () => {
  const sayi = parseInt(toplamSayi, 10);

  if (!sayi || sayi <= 0) {
    Alert.alert('Hata', 'Lütfen geçerli bir sayı girin.');
    return;
  }

  updateZikirCount(sayi); // mevcut fonksiyonun, sayıyı direkt ekler
  kapat();
};

const kapat = () => {
  Keyboard.dismiss();
  setToplamSayi('');
  setModalGorunur(false);
};

  return (
    zikirler.length === 0 ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Zikir eklemediniz</Text>
    </View>
  ) :(
    <ImageBackground
    source={require("@/assets/images/background-zikir1.jpg")}
    style={styles.backgroundImage}>
      <View style= {{flexDirection: 'row', justifyContent:'flex-end',marginTop: 15, marginRight:24 }}>
        <TouchableOpacity onPress={() => setModalGorunur(true)} style={{width:44, height:44,borderRadius: 22, alignItems:'center', justifyContent:'center'}}><Text style={{color:'#000', fontSize:26}}>+</Text></TouchableOpacity>
      </View>
  <Modal
  visible={modalGorunur}
  transparent
  animationType="slide"
  statusBarTranslucent
  onRequestClose={kapat}   // Android geri tuşuna basınca kapansın
>
  <View style={styles.modalArkaplan}>
    <View style={styles.modalKutu}>
      <Text style={styles.modalBaslik}>Toplu Zikir Ekle</Text>
      <Text style={styles.modalAciklama}>
        Bu zikir için daha önce çektiğiniz sayıyı girin.
      </Text>

      <TextInput
        style={styles.modalInput}
        value={toplamSayi}
        onChangeText={(val) => setToplamSayi(val.replace(/[^0-9]/g, ''))}
        placeholder="Örn: 100"
        placeholderTextColor="#999"
        inputMode="numeric"
        maxLength={9}
        autoFocus
      />

      <View style={styles.modalButonlar}>
        <TouchableOpacity style={styles.modalButon} onPress={kapat}>
          <Text style={styles.modalButonYazi}>Vazgeç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.modalButon, styles.modalEkle]} onPress={topluEkle}>
          <Text style={styles.modalButonYazi}>Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
      <View style={{flexDirection: 'row', 
    alignItems: 'center',width:'100%', height:'34%', justifyContent:'center'}}>
        <Text style={{fontSize:32}}>{zikirler[currentIndex].name}</Text>
      </View>
      <View style={[styles.card,{margin:24, marginTop:36, justifyContent:'center'}]}>
          <Text style={{fontSize: 26}}>{zikirler[currentIndex].count}{zikirler[currentIndex].target_count ? `/${zikirler[currentIndex].target_count}` : ''}
          </Text>
      </View>

      <View style={[styles.cardx, {width:'100%', height:'40%',justifyContent:'space-between'}]}>
        <View style={{flexDirection:'column', justifyContent:'center'}}>
          <TouchableOpacity onPress={controlledDecrementIndex}>
            <Text style={{fontSize:42, color:'white'}}>{"<"}</Text>
          </TouchableOpacity>
        </View>
            <View style={{flexDirection:'column', width:'40%',alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity style={styles.button} onPress={handleZikirCek}>
                  <Text style={styles.buttonText}>Zikir Çek</Text>
                </TouchableOpacity>
          </View>
        <View style={{flexDirection:'column', justifyContent:'center'}}>
          <TouchableOpacity onPress={controlledIncrementIndex}>
            <Text style={{fontSize:42, color:'white'}}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems:'center'}}>
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
    marginBottom:16 },
    cardx: { 
    flexDirection: 'row',
    gap: 12,
    padding: 16,
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
  plusButton: {
  position: 'absolute',   // diğer elemanları itmeden köşeye yapışır
  top: 40,
  right: 20,
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: 'rgba(255,255,255,0.15)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.4)',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
},
plusText: { color: 'white', fontSize: 26, marginTop: -2 },

modalArkaplan: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',  // arkayı karartır
  justifyContent: 'center',        // pencere ekranın ÜSTÜNDE açılır
  paddingTop: 80,
  paddingHorizontal: 24,
},
modalKutu: {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: 16,
  padding: 20,
  marginBottom:300,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.3)',
},
modalBaslik: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 6 },
modalAciklama: { color: '#fff', fontSize: 14, marginBottom: 16 },
modalInput: {
  color: 'white',
  height: 48,
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 12,
  paddingHorizontal: 12,
  fontSize: 18,
  backgroundColor: '#ffffff20',
},
modalButonlar: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 16 },
modalButon: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.4)',
},
modalEkle: { backgroundColor: '#05966960' },
modalButonYazi: { color: 'white', fontSize: 16, fontWeight: '600' }
})