# 🚀 Hızlı Başlangıç - Veri Ekleme Rehberi

## 📝 Veri Eklemenin 3 Yolu

### 1️⃣ JSON Dosyasından Ekleme (EN KOLAY) ⭐

**Dosya:** `src/data/pharmacyTerms.json`

#### Adımlar:

1. **Dosyayı açın:**
   ```
   src/data/pharmacyTerms.json
   ```

2. **İlgili kategoriye veri ekleyin:**

   **Örnek - İlaç ekleme:**
   ```json
   {
     "drugs": [
       {
         "latinName": "YENİ İLAÇ İSMİ",
         "turkishName": "Türkçe İsim",
         "definition": "Ne işe yaradığı, özellikleri, kullanım alanları",
         "components": ["Bileşen 1", "Bileşen 2"],
         "relatedTerms": ["İlgili terim"],
         "usage": "Kullanım alanları",
         "sideEffects": ["Yan etki"],
         "dosage": "Dozaj bilgisi",
         "synonyms": ["Eş anlamlı"]
       }
     ]
   }
   ```

3. **Dosyayı kaydedin**

4. **Uygulamayı yeniden başlatın**

#### Kategoriler:
- `drugs` - İlaçlar
- `plants` - Bitkiler
- `vitamins` - Vitaminler
- `minerals` - Mineraller
- `insects` - Böcekler
- `components` - Bileşenler
- `diseases` - Hastalıklar
- `anatomy` - Anatomi

---

### 2️⃣ API'den Otomatik Yükleme 🌐

**Uygulama başladığında otomatik olarak 100 ilaç yüklenir.**

#### Manuel yükleme (kod içinde):

```typescript
import { usePharmacy } from '../context/PharmacyContext';

const { loadDrugsFromAPI } = usePharmacy();

// 200 ilaç yükle
await loadDrugsFromAPI(200);
```

**Detaylı bilgi:** `API_KULLANIM_REHBERI.md` dosyasına bakın.

---

### 3️⃣ Kod İçinde Manuel Ekleme 💻

**Dosya:** `src/services/PharmacyTermService.ts`

#### Adımlar:

1. **İlgili fonksiyonu bulun:**
   - `createDrugTerms()` - İlaçlar için
   - `createPlantTerms()` - Bitkiler için
   - `createVitaminTerms()` - Vitaminler için
   - vb.

2. **Yeni terim ekleyin:**
   ```typescript
   this.createTerm({
     latinName: "Yeni İlaç",
     turkishName: "Türkçe İsim",
     category: TermCategory.DRUG,
     definition: "Açıklama...",
     // ... diğer alanlar
   })
   ```

3. **Uygulamayı yeniden başlatın**

---

## 📋 Örnek: Yeni İlaç Ekleme

### JSON Yöntemi (Önerilen):

```json
{
  "drugs": [
    {
      "latinName": "Aspirin",
      "turkishName": "Aspirin",
      "definition": "Ağrı kesici ve ateş düşürücü ilaç.",
      "components": ["Asetilsalisilik asit"],
      "relatedTerms": ["Analjezik"],
      "usage": "Ağrı ve ateş tedavisi",
      "sideEffects": ["Mide rahatsızlığı"],
      "dosage": "500 mg",
      "synonyms": ["ASA"]
    }
  ]
}
```

### Kod Yöntemi:

```typescript
// src/services/PharmacyTermService.ts
private createDrugTerms(): PharmacyTerm[] {
  return [
    // ... mevcut ilaçlar
    this.createTerm({
      latinName: "Aspirin",
      turkishName: "Aspirin",
      category: TermCategory.DRUG,
      definition: "Ağrı kesici ve ateş düşürücü ilaç.",
      components: ["Asetilsalisilik asit"],
      relatedTerms: ["Analjezik"],
      usage: "Ağrı ve ateş tedavisi",
      sideEffects: ["Mide rahatsızlığı"],
      dosage: "500 mg",
      synonyms: ["ASA"]
    }),
  ];
}
```

---

## ✅ Hangi Yöntemi Seçmeliyim?

| Yöntem | Avantajlar | Ne Zaman Kullanılır |
|--------|------------|---------------------|
| **JSON Dosyası** | ✅ En kolay<br>✅ Kod değişikliği yok<br>✅ Toplu ekleme | ⭐ **ÖNERİLEN** - Her zaman |
| **API** | ✅ Otomatik<br>✅ Güncel veriler | İlaç verileri için |
| **Kod İçi** | ✅ Programatik kontrol | Özel işlemler için |

---

## 🎯 Hızlı Test

1. `src/data/pharmacyTerms.json` dosyasını açın
2. `drugs` dizisine yeni bir ilaç ekleyin
3. Dosyayı kaydedin
4. Uygulamayı yeniden başlatın (`r` tuşuna basın veya Expo Go'da reload)
5. İlaçlar kategorisinde yeni ilacı görün!

---

## 📚 Detaylı Rehberler

- **JSON Ekleme:** `VERI_EKLEME_REHBERI.md`
- **API Kullanımı:** `API_KULLANIM_REHBERI.md`

---

## ⚠️ Önemli Notlar

1. **JSON Formatı:** Dosya geçerli JSON formatında olmalı (virgül, parantez hatalarına dikkat)
2. **Zorunlu Alanlar:** `latinName`, `turkishName`, `definition`
3. **Dizi Alanlar:** `components`, `sideEffects` vb. her zaman `[]` formatında
4. **Yeniden Başlatma:** Veri ekledikten sonra uygulamayı yeniden başlatın

---

## 🆘 Sorun Giderme

**Veriler görünmüyor:**
- JSON formatını kontrol edin (https://jsonlint.com/)
- Uygulamayı tamamen kapatıp yeniden açın
- Console loglarını kontrol edin

**JSON hatası:**
- Her virgül ve parantezin doğru olduğundan emin olun
- Son elemandan sonra virgül olmamalı

