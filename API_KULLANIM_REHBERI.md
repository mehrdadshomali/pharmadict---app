# 🌐 API Kullanım Rehberi

Bu rehber, Pharmadict uygulamasına API'den ilaç verileri eklemenizi sağlar.

## 📡 Entegre Edilen API'ler

### 1. OpenFDA API (Ana API)
- **URL**: `https://api.fda.gov/drug/label.json`
- **Ücretsiz**: Evet
- **Limit**: Sınırsız (rate limit var)
- **Veri**: FDA onaylı ilaçlar, yan etkiler, kullanım alanları, dozaj bilgileri

### 2. RxNav API (Alternatif)
- **URL**: `https://rxnav.nlm.nih.gov/REST`
- **Ücretsiz**: Evet
- **Özellik**: İlaç arama ve bilgi

## 🚀 Otomatik Veri Yükleme

Uygulama başladığında otomatik olarak API'den ilaç verileri yüklenir:

- **Varsayılan**: 100 ilaç
- **Kaynak**: OpenFDA API
- **Otomatik**: Evet

## 🔧 Manuel Veri Yükleme

### Context Üzerinden

```typescript
import { usePharmacy } from '../context/PharmacyContext';

const MyComponent = () => {
  const { loadDrugsFromAPI } = usePharmacy();
  
  const handleLoadDrugs = async () => {
    const count = await loadDrugsFromAPI(200); // 200 ilaç yükle
    console.log(`${count} yeni ilaç yüklendi`);
  };
  
  return <Button onPress={handleLoadDrugs}>İlaçları Yükle</Button>;
};
```

### Service Üzerinden

```typescript
import { pharmacyTermService } from '../services/PharmacyTermService';

// 100 ilaç yükle
const count = await pharmacyTermService.refreshDrugsFromAPI(100);

// Belirli bir ilaç için detaylı bilgi
const drug = await pharmacyTermService.fetchDrugFromAPI('Aspirin');
```

## 📊 API'den Gelen Veriler

Her ilaç için şu bilgiler otomatik olarak doldurulur:

- ✅ **latinName**: Generic name (jenerik isim)
- ✅ **turkishName**: Generic name (Türkçe çeviri yoksa aynı)
- ✅ **definition**: Kullanım alanları ve açıklama
- ✅ **components**: Aktif bileşenler
- ✅ **usage**: Kullanım alanları
- ✅ **sideEffects**: Yan etkiler ve uyarılar
- ✅ **dosage**: Dozaj bilgileri
- ✅ **contraindications**: Kontrendikasyonlar
- ✅ **interactions**: İlaç etkileşimleri
- ✅ **synonyms**: Marka isimleri

## 🎯 Kullanım Senaryoları

### Senaryo 1: Uygulama Başlangıcında Otomatik Yükleme

Uygulama açıldığında otomatik olarak 100 ilaç yüklenir. Bu zaten aktif.

### Senaryo 2: Kullanıcı İsteğine Göre Yükleme

Bir buton ekleyerek kullanıcının manuel olarak daha fazla ilaç yüklemesini sağlayabilirsiniz:

```typescript
// HomeView.tsx veya başka bir sayfada
const { loadDrugsFromAPI, isLoading } = usePharmacy();

<TouchableOpacity 
  onPress={() => loadDrugsFromAPI(200)}
  disabled={isLoading}
>
  <Text>{isLoading ? 'Yükleniyor...' : 'Daha Fazla İlaç Yükle'}</Text>
</TouchableOpacity>
```

### Senaryo 3: Belirli İlaç Arama

Kullanıcı bir ilaç adı girdiğinde API'den detaylı bilgi çekebilirsiniz:

```typescript
import { pharmacyTermService } from '../services/PharmacyTermService';

const searchDrug = async (drugName: string) => {
  const drug = await pharmacyTermService.fetchDrugFromAPI(drugName);
  if (drug) {
    console.log('İlaç bulundu:', drug);
    // İlaç detaylarını göster
  }
};
```

## ⚙️ API Servis Özellikleri

### DrugAPIService Metodları

1. **fetchFromOpenFDA(limit)**: OpenFDA'dan ilaç çeker
2. **searchRxNav(query)**: RxNav'de ilaç arar
3. **fetchFromMultipleSources(limit)**: Birden fazla API'den toplu çeker
4. **getDrugDetails(drugName)**: Belirli bir ilaç için detaylı bilgi

### PharmacyTermService Metodları

1. **refreshDrugsFromAPI(limit)**: API'den yeni ilaçlar yükler
2. **fetchDrugFromAPI(drugName)**: Belirli bir ilaç çeker

## 🔍 Örnek Kullanım

### HomeView'a Buton Ekleme

```typescript
// HomeView.tsx
import { usePharmacy } from '../context/PharmacyContext';

const HomeView = () => {
  const { loadDrugsFromAPI, isLoading, terms } = usePharmacy();
  
  return (
    <ScrollView>
      {/* Mevcut içerik */}
      
      {/* API'den yükleme butonu */}
      <TouchableOpacity 
        style={styles.loadButton}
        onPress={() => loadDrugsFromAPI(100)}
        disabled={isLoading}
      >
        <Text style={styles.loadButtonText}>
          {isLoading ? 'Yükleniyor...' : `API'den İlaç Yükle (${terms.length} ilaç)`}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
```

## 📝 Notlar

1. **Rate Limiting**: OpenFDA API'si rate limit'e sahiptir. Çok fazla istek göndermeyin.

2. **Duplicate Kontrolü**: Aynı isimdeki ilaçlar otomatik olarak filtrelenir.

3. **Offline Çalışma**: API'den yüklenen veriler uygulama içinde saklanır.

4. **Hata Yönetimi**: API hataları console'da loglanır ve kullanıcıya gösterilir.

## 🆘 Sorun Giderme

**API'den veri gelmiyor:**
- İnternet bağlantınızı kontrol edin
- Console loglarını kontrol edin
- Rate limit'e takılmış olabilirsiniz (birkaç dakika bekleyin)

**Yavaş yükleme:**
- Limit değerini düşürün (örn: 50 yerine 100)
- API yanıt süresi değişken olabilir

**Duplicate ilaçlar:**
- Sistem otomatik olarak duplicate'leri filtreler
- Aynı isimdeki ilaçlar sadece bir kez eklenir

## 🎉 Avantajlar

✅ **Otomatik Güncelleme**: API'den güncel veriler
✅ **Kapsamlı Bilgi**: Yan etkiler, dozaj, etkileşimler
✅ **Sınırsız Veri**: İstediğiniz kadar ilaç yükleyebilirsiniz
✅ **Ücretsiz**: Tüm API'ler ücretsiz
✅ **Kolay Kullanım**: Tek fonksiyon çağrısı ile yükleme

