# Pharmadict Mobil Uygulama - Proje İlerleme Raporu (%30)

## Proje Özeti
Pharmadict, eczacılık öğrencileri ve profesyoneller için geliştirilen bir mobil terim sözlüğü uygulamasıdır. React Native ve Expo framework'ü kullanılarak geliştirilmektedir.

## Tamamlanan İşler

### 1. Proje Altyapısı
- React Native + Expo SDK 54 kurulumu tamamlandı
- TypeScript entegrasyonu yapıldı
- React Navigation ile sayfa yönlendirme sistemi kuruldu
- NativeWind (Tailwind CSS) ile stil yönetimi eklendi

### 2. Ana Ekranlar
- **HomeView**: Ana sayfa tasarımı tamamlandı, kategoriler carousel olarak gösteriliyor
- **CategoriesView**: Bento Grid tasarımı ile kategori listesi oluşturuldu
- **SearchView**: Arama ekranı ve filtreleme özellikleri eklendi
- **BookmarksView**: Favoriler sayfası tasarımı tamamlandı

### 3. Veri Yönetimi
- 8 kategori için veri yapısı oluşturuldu (İlaçlar, Bitkiler, Vitaminler, Mineraller, Böcekler, Bileşenler, Hastalıklar, Anatomi)
- JSON formatında veri seti hazırlandı (yaklaşık 500+ terim)
- TermService ile veri erişim katmanı oluşturuldu
- PharmacyContext ile global state yönetimi kuruldu

### 4. UI/UX Bileşenleri
- LivingBackground: Animasyonlu arka plan efekti eklendi
- BentoCard: Modern kart tasarımı oluşturuldu
- TermCard: Terim kartı bileşeni tasarlandı
- Glassmorphism efektleri ile modern header tasarımları yapıldı

### 5. Özellikler
- Kategori bazlı terim listeleme
- Arama fonksiyonu (Latin, Türkçe isim ve tanımda arama)
- Favorilere ekleme/çıkarma (AsyncStorage ile kalıcı depolama)
- Terim detay sayfası (tanım, kullanım, yan etkiler, bileşenler)
- Kategori detay sayfası

## Kullanılan Teknolojiler
- React Native 0.81.5
- Expo SDK 54
- TypeScript
- React Navigation
- AsyncStorage
- Expo Blur
- React Native Reanimated

## Sonraki Adımlar
- API entegrasyonu (OpenFDA)
- Kullanıcı girişi ve kayıt sistemi
- Offline mod desteği
- Push notification
- Performans optimizasyonları
- Test yazımı

