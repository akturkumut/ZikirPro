# ZikirPro 📿

React Native ve Expo ile geliştirilmiş, internet gerektirmeden çalışan basit bir **zikir sayacı** uygulaması. Zikirlerini oluştur, hedef belirle, tek dokunuşla say ve ilerlemeni cihazında sakla.

<!-- Ekran görüntülerini eklemek için: assets/screenshots/ klasörüne koyup aşağıdaki gibi bağlayabilirsin
<p align="center">
  <img src="assets/screenshots/ana-sayfa.png" width="200" />
  <img src="assets/screenshots/zikir-cek.png" width="200" />
  <img src="assets/screenshots/zikirlerim.png" width="200" />
</p>
-->

## Özellikler

- **Zikir oluşturma:** Ad, üst sınır (hedef) ve isteğe bağlı fazilet/açıklama ile yeni zikir ekle.
- **Zikir çekme:** Büyük yuvarlak butonla say, gerekirse **Azalt** ile bir geri al. Sayaç 0'ın altına düşmez.
- **Zikirler arası geçiş:** `<` ve `>` butonlarıyla zikirler arasında dön.
- **Toplu ekleme:** Daha önce çektiğin zikirleri sayı girerek tek seferde ekle.
- **Zikirlerim listesi:** Tüm zikirlerini ilerleme durumuyla (`count / hedef`) gör.
- **Favoriler:** Yıldıza dokunarak zikri favorile, favoriler listenin en üstünde görünür.
- **Kartla başlama:** Listedeki karta dokun, o zikirden çekmeye başla.
- **Silme:** Karta uzun basıp onaylayarak zikri sil.
- **Çevrimdışı:** Veriler cihazdaki yerel SQLite veritabanında tutulur, hesap veya internet gerekmez.

## Kullanılan Teknolojiler

| Alan | Teknoloji |
| --- | --- |
| Framework | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) |
| Dil | TypeScript |
| Yönlendirme | [Expo Router](https://docs.expo.dev/router/introduction) (dosya tabanlı) |
| Veritabanı | [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) |
| Derleme | [EAS Build](https://docs.expo.dev/build/introduction/) |

## Kurulum

Gereksinimler: [Node.js](https://nodejs.org/) (LTS) ve bir Android/iOS cihaz veya emülatör.

```bash
# Depoyu klonla
git clone https://github.com/akturkumut/ZikirPro.git
cd ZikirPro

# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npx expo start
```

Çıkan QR kodu [Expo Go](https://expo.dev/go) ile okutabilir veya terminalden `a` tuşuyla Android emülatöründe açabilirsin.

## APK Oluşturma

Projede EAS Build yapılandırılmıştır (`eas.json`). Telefona doğrudan kurulabilir bir APK almak için:

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

Build bitince terminalde verilen bağlantıdan `.apk` dosyasını indirip telefona kurabilirsin.

> Not: `production` profili Google Play için `.aab` çıktısı üretir, telefona doğrudan kurulmaz.

## Veritabanı

Uygulama tek bir tablo kullanır: `zikir_logs`

| Sütun | Açıklama |
| --- | --- |
| `id` | Otomatik artan birincil anahtar |
| `name` | Zikir adı |
| `count` | Şu ana kadar çekilen sayı |
| `target_count` | Hedef sayı (boş olabilir) |
| `description` | Fazilet / açıklama (boş olabilir) |
| `is_favorite` | Favori durumu (0 veya 1) |
| `favourited_at` | Favorilenme zamanı |
| `updated_at` | Son güncelleme zamanı (ISO 8601) |

Tablo, uygulama ilk açıldığında otomatik oluşturulur.

## Yol Haritası

- [ ] Zikir düzenleme
- [ ] Hedefe ulaşınca titreşim/bildirim
- [ ] Günlük istatistikler
- [ ] Yedekleme ve geri yükleme

## Lisans

Bu proje [MIT](LICENSE) lisansı ile paylaşılmaktadır.

## İletişim

Geliştirici: [@akturkumut](https://github.com/akturkumut)
