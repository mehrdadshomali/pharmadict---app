# 📱 PHARMADICT - PROJE YOL HARİTASI

Bu dosya projenin klasör yapısını ve her dosyanın ne işe yaradığını açıklar.

---

## 📁 ANA KLASÖR YAPISI

```
pharmadict/
├── 📁 src/                    # 🎯 FRONTEND - Tüm uygulama kodu burada
├── 📁 scripts/                # 🔧 BACKEND - Veri oluşturma scriptleri
├── 📁 docs/                   # 📚 DOKÜMANTASYON
├── 📁 assets/                 # 🖼️ Uygulama ikonları
├── 📁 ios/                    # 📱 iOS native kodu (Xcode)
├── 📁 node_modules/           # 📦 Bağımlılıklar (npm paketleri)
└── Yapılandırma dosyaları     # ⚙️ Config dosyaları
```

---

## 🎯 SRC KLASÖRÜ (FRONTEND - ANA KOD)

Bu klasör uygulamanın tüm React Native kodunu içerir.

### 📁 src/components/ - UI BİLEŞENLERİ
Tekrar kullanılabilir arayüz parçaları.

| Dosya | Açıklama |
|-------|----------|
| `TermCard.tsx` | Terim kartı bileşeni - Liste ve öne çıkan görünümleri |
| `CategoryCarousel.tsx` | Yatay kaydırmalı kategori listesi |
| `MiniQuizCard.tsx` | Ana sayfadaki mini quiz kartı |

### 📁 src/pages/ - SAYFALAR
Uygulamadaki her ekran için bir dosya.

| Dosya | Açıklama |
|-------|----------|
| `HomeView.tsx` | 🏠 Ana sayfa - Öne çıkanlar, kategoriler, son eklenenler |
| `SearchView.tsx` | 🔍 Arama sayfası - Terim arama, geçmiş, öneriler |
| `CategoriesView.tsx` | 📂 Kategoriler sayfası - Tüm kategorilerin listesi |
| `CategoryDetailView.tsx` | 📋 Kategori detay - Bir kategorideki tüm terimler |
| `BookmarksView.tsx` | ❤️ Favoriler sayfası - Kaydedilen terimler |
| `TermDetailView.tsx` | 📖 Terim detay - Tek bir terimin tüm bilgileri |
| `AdminView.tsx` | ⚙️ Admin paneli - Yeni terim ekleme |

### 📁 src/services/ - SERVİSLER (API & VERİTABANI)
Veri işlemleri ve dış servislerle iletişim.

| Dosya | Açıklama |
|-------|----------|
| `FirebaseService.ts` | 🔥 Firebase Firestore CRUD işlemleri |
| `PharmacyTermService.ts` | 💊 Terim servisi - Veri yönetimi katmanı |
| `DrugAPIService.ts` | 💉 Harici ilaç API'si entegrasyonu |
| `GeminiService.ts` | 🤖 Google Gemini AI entegrasyonu |
| `NotesService.ts` | 📝 Kullanıcı notları servisi |

### 📁 src/context/ - CONTEXT (GLOBAL STATE)
Uygulama genelinde paylaşılan veriler.

| Dosya | Açıklama |
|-------|----------|
| `PharmacyContext.tsx` | 💊 Terim verileri, arama, favoriler |
| `ThemeContext.tsx` | 🎨 Tema yönetimi (açık/koyu mod) |

### 📁 src/config/ - YAPILANDIRMA
Uygulama ayarları ve bağlantılar.

| Dosya | Açıklama |
|-------|----------|
| `firebase.ts` | 🔥 Firebase bağlantı ayarları |

### 📁 src/types/ - TİP TANIMLARI
TypeScript tip tanımları.

| Dosya | Açıklama |
|-------|----------|
| `models.ts` | 📋 Veri modelleri (PharmacyTerm, TermCategory, vb.) |

### 📁 src/data/ - STATİK VERİLER
Yerel veri dosyaları.

| Dosya | Açıklama |
|-------|----------|
| `drugsData.ts` | İlaç verileri |
| `plantsData.ts` | Bitki verileri |
| `vitaminsData.ts` | Vitamin verileri |
| `mineralsData.ts` | Mineral verileri |
| `insectsData.ts` | Böcek verileri |
| `anatomyData.ts` | Anatomi verileri |
| `diseasesData.ts` | Hastalık verileri |
| `componentsData.ts` | Bileşen verileri |

### 📁 src/styles/ - STİLLER
CSS ve stil dosyaları.

| Dosya | Açıklama |
|-------|----------|
| `index.css` | Global CSS stilleri |

### Ana Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `App.tsx` | 🚀 Ana uygulama dosyası - Navigation, Providers |
| `main.tsx` | Uygulama giriş noktası |
| `index.css` | Global stiller |

---

## 🔧 SCRIPTS KLASÖRÜ (BACKEND - VERİ İŞLEMLERİ)

### 📁 scripts/data-generators/
Firebase'e veri yüklemek için kullanılan scriptler.

| Dosya | Açıklama |
|-------|----------|
| `uploadToFirebase.ts` | Firebase'e veri yükleme |
| `generate_*.js` | Toplu terim oluşturma scriptleri |
| `add_*.py` | Python ile veri ekleme scriptleri |
| `check_term_count.js` | Terim sayısı kontrolü |

---

## 📚 DOCS KLASÖRÜ (DOKÜMANTASYON)

| Dosya | Açıklama |
|-------|----------|
| `API_KULLANIM_REHBERI.md` | API kullanım kılavuzu |
| `VERI_EKLEME_REHBERI.md` | Veri ekleme talimatları |
| `LOGO_EKLEME.md` | Logo ekleme rehberi |

---

## ⚙️ YAPILANDIRMA DOSYALARI (ROOT)

| Dosya | Açıklama |
|-------|----------|
| `package.json` | 📦 Proje bağımlılıkları ve scriptler |
| `app.json` | 📱 Expo uygulama ayarları |
| `tsconfig.json` | TypeScript yapılandırması |
| `babel.config.js` | Babel transpiler ayarları |
| `tailwind.config.js` | Tailwind CSS ayarları |
| `metro.config.js` | Metro bundler ayarları |
| `vite.config.ts` | Vite build ayarları |
| `.gitignore` | Git'e dahil edilmeyecek dosyalar |

---

## 🔄 VERİ AKIŞI

```
┌─────────────────────────────────────────────────────────────┐
│                        KULLANICI                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PAGES (Sayfalar)                         │
│  HomeView, SearchView, CategoriesView, TermDetailView...    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  COMPONENTS (Bileşenler)                    │
│         TermCard, CategoryCarousel, MiniQuizCard            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONTEXT (Global State)                    │
│           PharmacyContext, ThemeContext                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVICES (Servisler)                     │
│    FirebaseService, PharmacyTermService, DrugAPIService     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   FIREBASE (Veritabanı)                     │
│                    Cloud Firestore                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 KULLANILAN TEKNOLOJİLER

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| **React Native** | Mobil uygulama framework'ü |
| **Expo** | React Native geliştirme araçları |
| **TypeScript** | Tip güvenli JavaScript |
| **Firebase Firestore** | NoSQL veritabanı |
| **React Navigation** | Sayfa yönlendirme |
| **NativeWind** | Tailwind CSS for React Native |
| **Expo Linear Gradient** | Renk geçişleri |
| **AsyncStorage** | Yerel veri depolama |

---

## 🚀 UYGULAMA BAŞLATMA

```bash
# Bağımlılıkları yükle
yarn install

# Web'de çalıştır
yarn web

# iOS'ta çalıştır
yarn ios

# Android'de çalıştır
yarn android
```

---

## 📝 ÖNEMLİ NOTLAR

1. **Ana giriş noktası**: `src/App.tsx`
2. **Veritabanı işlemleri**: `src/services/FirebaseService.ts`
3. **Global state**: `src/context/PharmacyContext.tsx`
4. **Veri modelleri**: `src/types/models.ts`
5. **Firebase ayarları**: `src/config/firebase.ts`
