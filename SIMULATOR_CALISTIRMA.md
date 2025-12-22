# 📱 Simülatörde Çalıştırma Rehberi

Artık Expo Go'ya ihtiyaç duymadan direkt iOS simülatörde çalıştırabilirsiniz!

## 🚀 Hızlı Başlangıç

### 1. Projeyi Simülatörde Çalıştırma

```bash
npm run ios
```

Bu komut:
- Metro bundler'ı başlatır
- iOS simülatörü otomatik olarak açar
- Uygulamayı build eder ve simülatöre yükler
- Expo Go'ya ihtiyaç duymaz!

### 2. Alternatif Komutlar

```bash
# Sadece Metro bundler'ı başlat (manuel build için)
npm start

# Belirli bir simülatörde çalıştır
npx expo run:ios --simulator="iPhone 15 Pro"

# Release modunda build et
npm run build:ios
```

## 📋 Ön Gereksinimler

✅ Xcode yüklü olmalı
✅ iOS Simülatör yüklü olmalı
✅ CocoaPods bağımlılıkları yüklü (zaten yapıldı)

## 🔧 Sorun Giderme

### Pod'ları Yeniden Yükleme
```bash
npm run pod:install
```

### Simülatörü Manuel Açma
```bash
open -a Simulator
```

### Temiz Build
```bash
cd ios
rm -rf build Pods Podfile.lock
pod install
cd ..
npm run ios
```

## ✨ Artık Expo Go Gerekmiyor!

Uygulama artık native build olarak çalışıyor. Herhangi bir Expo Go uygulamasına ihtiyaç duymadan direkt simülatörde açılacak.


