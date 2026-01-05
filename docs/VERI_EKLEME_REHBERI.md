# 📚 Veri Ekleme Rehberi

Bu rehber, Pharmadict uygulamasına sınırsız veri eklemenizi sağlar.

## 📁 Veri Dosyası Konumu

Tüm veriler `src/data/pharmacyTerms.json` dosyasında saklanır.

## 🎯 Nasıl Veri Eklenir?

### 1. JSON Dosyasını Açın

`src/data/pharmacyTerms.json` dosyasını bir metin editörü ile açın.

### 2. Kategoriye Göre Veri Ekleyin

Her kategori için bir dizi (array) vardır:
- `drugs` - İlaçlar
- `plants` - Bitkiler
- `vitamins` - Vitaminler
- `minerals` - Mineraller
- `insects` - Böcekler
- `components` - Bileşenler
- `diseases` - Hastalıklar
- `anatomy` - Anatomi

### 3. Yeni Terim Ekleme Formatı

Her terim için şu bilgileri sağlayın:

```json
{
  "latinName": "Latince veya İngilizce isim",
  "turkishName": "Türkçe karşılık",
  "definition": "Detaylı açıklama (ne işe yaradığı, özellikleri)",
  "components": ["Bileşen 1", "Bileşen 2"],
  "relatedTerms": ["İlgili terim 1", "İlgili terim 2"],
  "etymology": "Etimoloji bilgisi (isteğe bağlı)",
  "usage": "Kullanım alanları",
  "sideEffects": ["Yan etki 1", "Yan etki 2"],
  "dosage": "Dozaj bilgisi",
  "contraindications": ["Kontrendikasyon 1"],
  "interactions": ["Etkileşim 1"],
  "synonyms": ["Eş anlamlı 1", "Eş anlamlı 2"]
}
```

## 📝 Örnekler

### İlaç Örneği

```json
{
  "latinName": "Paracetamol",
  "turkishName": "Parasetamol",
  "definition": "Ağrı kesici ve ateş düşürücü etkisi olan analjezik ilaç. Mideye daha az zararlıdır.",
  "components": ["Para-aminofenol"],
  "relatedTerms": ["Analjezik", "Antipiretik"],
  "etymology": "Para-acetyl-amino-phenol",
  "usage": "Ağrı ve ateş tedavisi",
  "sideEffects": ["Karaciğer hasarı (yüksek dozda)"],
  "dosage": "500-1000 mg, 4-6 saatte bir",
  "contraindications": ["Karaciğer yetmezliği"],
  "interactions": ["Warfarin"],
  "synonyms": ["Acetaminophen", "Tylenol"]
}
```

### Bitki Örneği

```json
{
  "latinName": "Ginkgo biloba",
  "turkishName": "Ginkgo biloba",
  "definition": "Bellek ve dolaşım sistemi için kullanılan, en eski ağaç türlerinden biri.",
  "components": ["Ginkgolidler", "Flavonoidler"],
  "relatedTerms": ["Nootropik", "Dolaşım"],
  "etymology": "Japonca ginkyo (gümüş kayısı) + Latince biloba (iki loblu)",
  "usage": "Bellek desteği, dolaşım problemleri",
  "sideEffects": ["Baş ağrısı", "Mide rahatsızlığı"],
  "dosage": "120-240 mg/gün",
  "contraindications": ["Kanama bozuklukları"],
  "interactions": ["Antikoagülanlar"],
  "synonyms": ["Mabet ağacı"]
}
```

### Vitamin Örneği

```json
{
  "latinName": "Vitamin C",
  "turkishName": "C Vitamini",
  "definition": "Askorbik asit olarak da bilinen, suda çözünen antioksidan vitamin. Bağışıklık sistemi için önemlidir.",
  "components": ["Askorbik asit"],
  "relatedTerms": ["Antioksidan", "Bağışıklık"],
  "etymology": "Latince vita (hayat) + amine",
  "usage": "Bağışıklık desteği, kolajen sentezi, demir emilimi",
  "sideEffects": ["İshal (yüksek dozda)", "Böbrek taşı riski"],
  "dosage": "75-90 mg/gün (kadın/erkek), 1000 mg/gün (maksimum)",
  "contraindications": ["Böbrek taşı öyküsü"],
  "interactions": ["Demir preparatları"],
  "synonyms": ["Askorbik asit", "L-askorbik asit"]
}
```

### Böcek Örneği

```json
{
  "latinName": "Tenebrio molitor",
  "turkishName": "Un Kurdu",
  "definition": "Yüksek protein içeriği nedeniyle alternatif gıda kaynağı olarak kullanılan böcek türü.",
  "components": ["Protein", "Yağ", "Fiber"],
  "relatedTerms": ["Alternatif protein", "Sürdürülebilir gıda"],
  "etymology": "Latince tenebrio (karanlık) + molitor (değirmenci)",
  "usage": "Alternatif protein kaynağı, hayvan yemi, insan gıdası",
  "sideEffects": ["Alerji (nadir)"],
  "dosage": "",
  "contraindications": ["Kabuklu deniz ürünleri alerjisi"],
  "interactions": [],
  "synonyms": ["Mealworm", "Un kurdu"]
}
```

## ⚠️ Önemli Notlar

1. **JSON Formatı**: Dosya geçerli bir JSON formatında olmalıdır. Virgül ve parantez hatalarına dikkat edin.

2. **Zorunlu Alanlar**: 
   - `latinName` (zorunlu)
   - `turkishName` (zorunlu)
   - `definition` (zorunlu)

3. **İsteğe Bağlı Alanlar**: Diğer tüm alanlar isteğe bağlıdır. Boş bırakılabilir veya boş dizi `[]` olarak eklenebilir.

4. **Dizi Alanlar**: `components`, `relatedTerms`, `sideEffects`, `contraindications`, `interactions`, `synonyms` her zaman dizi (array) olmalıdır.

5. **Uygulamayı Yeniden Başlatma**: Veri ekledikten sonra uygulamayı yeniden başlatmanız gerekebilir.

## 🚀 Hızlı Başlangıç

1. `src/data/pharmacyTerms.json` dosyasını açın
2. İlgili kategori dizisine yeni bir obje ekleyin
3. Gerekli bilgileri doldurun
4. Dosyayı kaydedin
5. Uygulamayı yeniden başlatın

## 📊 Toplu Veri Ekleme

Birden fazla terim eklemek için, ilgili kategori dizisine birden fazla obje ekleyin:

```json
"drugs": [
  { ... ilaç 1 ... },
  { ... ilaç 2 ... },
  { ... ilaç 3 ... }
]
```

## ✅ Kontrol Listesi

- [ ] JSON formatı geçerli mi?
- [ ] `latinName` eklendi mi?
- [ ] `turkishName` eklendi mi?
- [ ] `definition` eklendi mi?
- [ ] Dizi alanlar doğru formatta mı?
- [ ] Dosya kaydedildi mi?
- [ ] Uygulama yeniden başlatıldı mı?

## 🆘 Sorun Giderme

**Veriler görünmüyor:**
- JSON formatını kontrol edin (virgül, parantez hataları)
- Uygulamayı tamamen kapatıp yeniden açın
- Console loglarını kontrol edin

**JSON hatası:**
- Online JSON validator kullanın: https://jsonlint.com/
- Her virgül ve parantezin doğru olduğundan emin olun

## 📞 Yardım

Sorun yaşarsanız, console loglarını kontrol edin:
- `📁 JSON data loaded: X terms` mesajını görmelisiniz
- Eğer `⚠️ Could not load JSON data file` görüyorsanız, JSON formatını kontrol edin

