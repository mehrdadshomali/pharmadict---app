# 💊 Pharmadict - React + JavaScript

Pharmadict, eczacılık öğrencileri, eczacılar ve tıbbi terimlerle ilgilenen herkes için geliştirilmiş kapsamlı bir web uygulamasıdır. Uygulama, ilaçlar, bitkiler, vitaminler, mineraller, böcekler, bileşenler, hastalıklar ve anatomi terimlerini içeren zengin bir veri tabanına sahiptir.

## 🚀 Özellikler

- 🔍 **Gelişmiş Arama**: Latin isim, Türkçe isim, tanım, bileşenler ve eş anlamlılarda arama
- 📂 **8 Kategori**: İlaçlar, Bitkiler, Vitaminler, Mineraller, Böcekler, Bileşenler, Hastalıklar, Anatomi
- ❤️ **Favoriler**: Terimleri favorilere ekleyip çıkarabilme
- 📱 **Modern UI**: Gradient tasarımlar ve animasyonlar
- 🌐 **Online + Offline**: OpenFDA API entegrasyonu ve lokal veri desteği
- 📖 **Detaylı Bilgi**: Her terim için kapsamlı bilgi (tanım, etimoloji, kullanım, yan etkiler, vb.)

## 🛠️ Teknolojiler

- **React 18** - UI framework
- **React Router** - Sayfa yönlendirme
- **Vite** - Build tool ve dev server
- **JavaScript (ES6+)** - Programlama dili
- **CSS3** - Stil ve animasyonlar

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production preview
npm run preview
```

## 📁 Proje Yapısı

```
pharmadict-react-new/
├── src/
│   ├── components/          # React bileşenleri
│   │   ├── CategoryCard.jsx
│   │   ├── TermCard.jsx
│   │   ├── PharmadicTitle.jsx
│   │   └── MainTabView.jsx
│   ├── views/               # Sayfa görünümleri
│   │   ├── HomeView.jsx
│   │   ├── CategoriesView.jsx
│   │   ├── SearchView.jsx
│   │   ├── TermDetailView.jsx
│   │   └── BookmarksView.jsx
│   ├── models/              # Veri modelleri
│   │   ├── PharmacyTerm.js
│   │   └── TermCategory.js
│   ├── services/            # İş mantığı servisleri
│   │   └── PharmacyTermService.js
│   ├── data/                # Veri dosyaları
│   │   └── pharmacyData.js
│   ├── styles/              # CSS stilleri
│   │   └── index.css
│   ├── App.jsx              # Ana uygulama
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Kategoriler ve Renkler

- 💊 **İlaçlar** - Mavi (#3B82F6)
- 🌿 **Bitkiler** - Yeşil (#10B981)
- 💉 **Vitaminler** - Turuncu (#F97316)
- 💎 **Mineraller** - Mor (#8B5CF6)
- 🐛 **Böcekler** - Kahverengi (#92400E)
- ⚗️ **Bileşenler** - Kırmızı (#EF4444)
- 🏥 **Hastalıklar** - Pembe (#EC4899)
- 🫀 **Anatomi** - İndigo (#6366F1)

## 📊 Veri Kaynakları

- **Lokal Veriler**: Hardcoded terimler (100+)
- **OpenFDA API**: İlaç bilgileri (50+)
- **Örnek Veriler**: Bitkiler, vitaminler, hastalıklar, böcekler
- **Kapsamlı Veriler**: Anatomi (350+), Mineraller (100+)

## 🔧 Özelleştirme

### Yeni Terim Ekleme

`src/data/pharmacyData.js` dosyasındaki ilgili fonksiyonlara yeni terimler ekleyebilirsiniz:

```javascript
export function createDrugTerms() {
  return [
    {
      latinName: 'Yeni İlaç',
      turkishName: 'Türkçe İsim',
      category: TermCategory.DRUG,
      definition: 'Tanım...',
      // ...
    }
  ];
}
```

### Stil Değişiklikleri

`src/styles/index.css` dosyasında renkler, gradientler ve animasyonları özelleştirebilirsiniz.

## 🌐 API Entegrasyonu

Uygulama OpenFDA API'sini kullanarak gerçek zamanlı ilaç verileri çeker:

```javascript
// Services/PharmacyTermService.js içinde
async loadOnlineDrugs() {
  const response = await fetch('https://api.fda.gov/drug/label.json?limit=50');
  // ...
}
```

## 💾 LocalStorage

Favoriler localStorage'da saklanır:

```javascript
localStorage.setItem('pharmadict_bookmarks', JSON.stringify([...bookmarkedIds]));
```

## 📱 Responsive Tasarım

Uygulama mobil ve masaüstü cihazlarda çalışacak şekilde tasarlanmıştır.

## 🚀 Production Build

```bash
npm run build
```

Build dosyaları `dist/` klasörüne oluşturulur.

## 📝 Lisans

Bu proje eğitim amaçlıdır.

## 👨‍💻 Geliştirici

Pharmadict - Pure React + JavaScript (Xcode/Swift bağımsız)

---

**© 2025 Pharmadict - Tüm hakları saklıdır.**
