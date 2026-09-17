import { ImageBackground } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteRow, getAllRows, toggleFavorite, ZikirLog } from '../db';


export default function ZikirlerScreen() {
  const [zikirler, setZikirler] = useState<ZikirLog[]>([]);

  const yukle = useCallback(() => {
    const rows = getAllRows();
    setZikirler(rows ?? []);
  }, []);

  // Ekrana her dönüldüğünde listeyi tazele
  useFocusEffect(useCallback(() => { yukle(); }, [yukle]));


  const sil = (id: number) => {
    if (deleteRow(id)) setZikirler(prev => prev.filter(z => z.id !== id));
  };

  const favori = (item: ZikirLog) => {
    toggleFavorite(item.id, item.is_favorite ?? 0);
    yukle(); // sıralama değiştiği için tam yeniden okuma mantıklı
  };

  const renderItem = ({ item }: { item: ZikirLog }) => (
    <Pressable style={styles.card} onPress={() => {}} onLongPress={() => createTwoButtonAlert(item.id)}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
      </View>
      <Text style={styles.count}>
        {item.count}{item.target_count ? ` / ${item.target_count}` : ''}
      </Text>
      <Pressable onPress={() => favori(item)} hitSlop={10}>
        <Text style={styles.star}>{item.is_favorite ? '★' : '☆'}</Text>
      </Pressable>
    </Pressable>
  );

    const informAlert = () => Alert.alert('Bilgilendirme', 'Zikire basarak o zikiri çekmeye başlayabilirsiniz. Zikir kartının üzerine uzun basarak o zikri silebilirsiniz. Zikir kartının sağ kısmında bulunan yıldız işaretine basarak zikirlerinizi favorileyebilir ve en üstte görünmesini sağlayabilirsiniz. ', [
      {text: 'Anladım'},
    ]);
    
    const createTwoButtonAlert = (id:number) =>
    Alert.alert('Sil', 'Bu zikiri silmek istiyor musunuz?', [
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
      {text: 'Evet', onPress: ()=> sil(id)},
    ]);

  return (
    <ImageBackground
    source={require("@/assets/images/background-zikirler.jpg")}
    style={styles.backgroundImage}>
      <View style= {{flexDirection: 'row', justifyContent:'flex-end',marginTop: 30, marginRight:24 }}>
        <TouchableOpacity onPress={informAlert} style={{width:44, height:44,borderRadius: 22,backgroundColor:'rgba(255,255,255,0.15)', borderWidth:1, borderColor:'rgba(255,255,255,0.4)', alignItems:'center', justifyContent:'center'}}><Text style={{color:'white', fontSize:24}}>?</Text></TouchableOpacity>
      </View>

      <View style= {{flexDirection: 'row'}}>
        <FlatList
              data={zikirler}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.list}     
              ListEmptyComponent={<Text style={styles.empty}>Henüz zikir eklenmedi.</Text>}
            />
      </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
    backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  list: {padding: 16, flexGrow: 1 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16,
          backgroundColor: 'rgba(255,255,255,0.15)', borderWidth:1, borderColor:'rgba(255,255,255,0.4)', borderRadius: 12, marginBottom:16 },
  name: { color: 'white' ,fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 13, color: '#666', marginTop: 2 },
  count: {color: 'white', fontSize: 18, fontWeight: '700' },
  star: { fontSize: 22, color: '#f0a500' },
  sep: { height: 10 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
});