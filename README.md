<div align="center">

# 💊 Pharmadict

### Mobil Tıbbi Terimler Sözlüğü

[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

_Eczacılık ve sağlık öğrencileri için kapsamlı tıbbi terimler sözlüğü_

[Özellikler](#-özellikler) • [Kurulum](#-kurulum) • [Ekran Görüntüleri](#-ekran-görüntüleri) • [Teknolojiler](#-teknolojiler) • [Katkıda Bulunma](#-katkıda-bulunma)

</div>

---

## 📱 Hakkında

**Pharmadict**, eczacılık ve sağlık alanında eğitim gören öğrenciler ile sağlık profesyonellerinin tıbbi terimlere hızlı ve kolay erişimini sağlamak amacıyla geliştirilmiş kapsamlı bir mobil uygulamadır.

> 💡 **Pharmadict** = **Pharma**cy + **Dict**ionary

## ✨ Özellikler

<table>
<tr>
<td width="50%">

### 📚 Kapsamlı Veritabanı

- **850+** tıbbi terim
- **8** farklı kategori
- Detaylı tanımlar ve etimoloji
- Türkçe-Latince karşılıklar

</td>
<td width="50%">

### 🔍 Akıllı Arama

- Gerçek zamanlı arama
- Arama geçmişi
- Çoklu alan araması
- Otomatik öneriler

</td>
</tr>
<tr>
<td width="50%">

### ⭐ Kişiselleştirme

- Favori terimleri kaydetme
- Kişisel not ekleme
- Koyu/Açık tema desteği
- Offline çalışabilme

</td>
<td width="50%">

### 🎯 Bilgi Testi

- İnteraktif quiz sistemi
- 24 soruluk soru havuzu
- Anlık geri bildirim
- Skor takibi

</td>
</tr>
</table>

## 📂 Kategoriler

|    Kategori    | Terim Sayısı | Açıklama                                        |
| :------------: | :----------: | :---------------------------------------------- |
|   💊 İlaçlar   |     100      | Yaygın ilaçlar, etken maddeler, dozaj bilgileri |
|  🌿 Bitkiler   |     100      | Tıbbi bitkiler, aktif bileşenler                |
| 🧪 Vitaminler  |     100      | Suda/yağda çözünen vitaminler                   |
| 💎 Mineraller  |     100      | Vücut için gerekli mineraller                   |
| 🏥 Hastalıklar |     150      | Yaygın hastalıklar ve semptomları               |
|  🐛 Böcekler   |     100      | Tıbbi öneme sahip böcekler                      |
| ⚗️ Bileşenler  |     100      | Farmakolojik bileşenler                         |
|   🫀 Anatomi   |     100      | İnsan vücudu anatomisi                          |

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- Yarn veya npm
- Expo Go uygulaması (mobil cihaz için)

### Adımlar

```bash
# 1. Projeyi klonlayın
git clone https://github.com/mehrdadshomali/pharmadict---app.git

# 2. Proje dizinine gidin
cd pharmadict---app

# 3. Bağımlılıkları yükleyin
yarn install

# 4. Uygulamayı başlatın
npx expo start
```

### Çalıştırma Seçenekleri

```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Web tarayıcı
npx expo start --web

# LAN üzerinden (fiziksel cihaz)
npx expo start --lan
```

## 📸 Ekran Görüntüleri

<div align="center">

|              Ana Sayfa               |                  Arama                   |                   Kategoriler                    |               Terim Detay                |
| :----------------------------------: | :--------------------------------------: | :----------------------------------------------: | :--------------------------------------: |
| ![Home](assets/screenshots/home.png) | ![Search](assets/screenshots/search.png) | ![Categories](assets/screenshots/categories.png) | ![Detail](assets/screenshots/detail.png) |

</div>

> 📝 _Ekran görüntüleri eklenecek_

## 🛠 Teknolojiler

<div align="center">

|                                                        Teknoloji                                                        | Versiyon | Kullanım                 |
| :---------------------------------------------------------------------------------------------------------------------: | :------: | :----------------------- |
|     ![React Native](https://img.shields.io/badge/-React_Native-61DAFB?style=flat-square&logo=react&logoColor=black)     |   0.76   | Mobil uygulama framework |
|             ![Expo](https://img.shields.io/badge/-Expo-000020?style=flat-square&logo=expo&logoColor=white)              |   54.0   | Geliştirme platformu     |
|    ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)     |   5.3    | Programlama dili         |
| ![React Navigation](https://img.shields.io/badge/-React_Navigation-6B52AE?style=flat-square&logo=react&logoColor=white) |   6.x    | Navigasyon yönetimi      |

</div>

### Kullanılan Kütüphaneler

- **@react-navigation** - Sayfa navigasyonu
- **@react-native-async-storage** - Yerel veri depolama
- **expo-linear-gradient** - Gradient efektleri
- **expo-blur** - Blur efektleri
- **@expo/vector-icons** - İkon seti

## 📁 Proje Yapısı

```
pharmadict/
├── 📂 src/
│   ├── 📂 components/     # Yeniden kullanılabilir bileşenler
│   ├── 📂 pages/          # Sayfa bileşenleri
│   ├── 📂 context/        # React Context dosyaları
│   ├── 📂 services/       # Servis katmanı
│   ├── 📂 data/           # Terim verileri
│   ├── 📂 styles/         # Stil dosyaları
│   └── 📄 App.tsx         # Ana uygulama
├── 📂 assets/             # Görseller ve fontlar
├── 📄 app.json            # Expo yapılandırması
├── 📄 package.json        # Bağımlılıklar
└── 📄 tsconfig.json       # TypeScript yapılandırması
```

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. 🍴 Projeyi fork edin
2. 🌿 Feature branch oluşturun (`git checkout -b feature/YeniOzellik`)
3. 💾 Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. 📤 Branch'i push edin (`git push origin feature/YeniOzellik`)
5. 🔃 Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

<div align="center">

**Mehrdad Shomali**

[![GitHub](https://img.shields.io/badge/GitHub-mehrdadshomali-181717?style=for-the-badge&logo=github)](https://github.com/mehrdadshomali)

</div>

---

<div align="center">

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

Made with ❤️ and ☕

</div>
