# PHARMADICT: MOBİL TIBBİ TERİMLER SÖZLÜĞÜ UYGULAMASI

## BİTİRME PROJESİ

---

**Hazırlayan:** [Öğrenci Adı Soyadı]

**Öğrenci Numarası:** [Numara]

**Danışman:** [Danışman Adı]

**Bölüm:** [Bölüm Adı]

**Tarih:** Aralık 2024

---

## ÖZET

Bu bitirme projesi kapsamında, eczacılık ve sağlık alanında eğitim gören öğrenciler ile sağlık profesyonellerinin tıbbi terimlere hızlı ve kolay erişimini sağlamak amacıyla "Pharmadict" adlı mobil uygulama geliştirilmiştir. Uygulama, React Native framework'ü ve Expo platformu kullanılarak cross-platform olarak tasarlanmıştır. TypeScript programlama dili ile geliştirilen uygulama, 850'den fazla tıbbi terimi sekiz farklı kategoride sunmaktadır. Kullanıcılar terimleri arayabilir, favorilere ekleyebilir, kişisel notlar alabilir ve bilgi yarışması ile öğrendiklerini test edebilmektedir. Uygulama, modern kullanıcı arayüzü tasarımı, offline çalışabilme özelliği ve kişiselleştirme seçenekleri ile kullanıcı deneyimini ön planda tutmaktadır.

**Anahtar Kelimeler:** Mobil Uygulama, React Native, Tıbbi Terimler, Eczacılık, Cross-Platform

---

## ABSTRACT

Within the scope of this graduation project, a mobile application named "Pharmadict" has been developed to provide quick and easy access to medical terminology for students studying in pharmacy and healthcare fields, as well as healthcare professionals. The application is designed as cross-platform using React Native framework and Expo platform. Developed with TypeScript programming language, the application offers more than 850 medical terms in eight different categories. Users can search terms, add to favorites, take personal notes, and test their knowledge with quizzes. The application prioritizes user experience with modern user interface design, offline functionality, and personalization options.

**Keywords:** Mobile Application, React Native, Medical Terms, Pharmacy, Cross-Platform

---

## İÇİNDEKİLER

- ÖZET ...................................................................................................................... ii
- ABSTRACT ........................................................................................................... iii
- İÇİNDEKİLER ....................................................................................................... iv
- ŞEKİL LİSTESİ ..................................................................................................... vi
- TABLO LİSTESİ ................................................................................................... vii
- KISALTMALAR .................................................................................................... viii

**1. GİRİŞ**

- 1.1 Projenin Genel Tanımı ..................................................................................... 1
- 1.2 Projenin Amacı ve Önemi ................................................................................ 2
- 1.3 Projenin Kapsamı ............................................................................................. 3
- 1.4 Uygulamanın Genel Tanıtımı ........................................................................... 4
  - 1.4.1 Açılış Ekranı (Splash Screen) .................................................................... 4
  - 1.4.2 Ana Sayfa Ekranı ...................................................................................... 5
  - 1.4.3 Arama Ekranı ............................................................................................ 6
  - 1.4.4 Kategoriler Ekranı ..................................................................................... 7
  - 1.4.5 Favoriler Ekranı ........................................................................................ 8
  - 1.4.6 Terim Detay Ekranı ................................................................................... 9
  - 1.4.7 Quiz Bölümü ............................................................................................. 10

**2. MATERYAL VE YÖNTEM**

- 2.1 Geliştirme Ortamı ve Araçları .......................................................................... 11
  - 2.1.1 React Native ............................................................................................. 11
  - 2.1.2 Expo ......................................................................................................... 12
  - 2.1.3 TypeScript ................................................................................................ 13
  - 2.1.4 Visual Studio Code ................................................................................... 13
- 2.2 Kullanılan Kütüphaneler .................................................................................. 14
  - 2.2.1 React Navigation ...................................................................................... 14
  - 2.2.2 AsyncStorage ........................................................................................... 15
  - 2.2.3 Expo Linear Gradient ............................................................................... 15
  - 2.2.4 Expo Blur ................................................................................................. 16
- 2.3 State Yönetimi ................................................................................................. 16
  - 2.3.1 React Context API .................................................................................... 16
  - 2.3.2 React Hooks ............................................................................................. 17
- 2.4 Veri Yapısı ve Modelleme ............................................................................... 18
  - 2.4.1 Terim Veri Modeli .................................................................................... 18
  - 2.4.2 Kategori Yapısı ........................................................................................ 19
- 2.5 Kullanıcı Arayüzü Tasarımı ............................................................................. 20
  - 2.5.1 Renk Paleti ............................................................................................... 20
  - 2.5.2 Tipografi .................................................................................................. 21
  - 2.5.3 Bileşen Tasarımı ...................................................................................... 21

**3. BULGULAR - PROJENİN ÇALIŞMASI VE KABİLİYETLERİ**

- 3.1 Sistem Mimarisi ............................................................................................... 22
- 3.2 Veri Akış Diyagramı ........................................................................................ 23
- 3.3 Kullanıcı Akış Diyagramı ................................................................................ 24
- 3.4 Sınıf Diyagramı ............................................................................................... 25
- 3.5 Dosya Yapısı ................................................................................................... 26
- 3.6 Servis Katmanı ................................................................................................ 27
- 3.7 Veritabanı Yapısı ............................................................................................. 28

**4. TARTIŞMA VE SONUÇ**

- 4.1 Projenin Değerlendirilmesi .............................................................................. 29
- 4.2 Amaca Ulaşma Değerlendirmesi ..................................................................... 29
- 4.3 Karşılaşılan Zorluklar ve Çözümler ................................................................. 30
- 4.4 Gelecek Çalışmalar .......................................................................................... 31

**5. KAYNAKLAR** ................................................................................................. 32

**6. EKLER** ............................................................................................................. 33

---

## ŞEKİL LİSTESİ

- Şekil 1. Sistemin Genel Yapısı .............................................................................. 1
- Şekil 2. Uygulama Logosu ..................................................................................... 2
- Şekil 3. Açılış Ekranı (Splash Screen) ................................................................... 4
- Şekil 4. Ana Sayfa Ekran Görüntüsü ..................................................................... 5
- Şekil 5. Ana Sayfa - Kategori Carousel ................................................................. 5
- Şekil 6. Arama Ekranı Görüntüsü .......................................................................... 6
- Şekil 7. Arama Sonuçları Ekranı ............................................................................ 6
- Şekil 8. Kategoriler Ekran Görüntüsü .................................................................... 7
- Şekil 9. Kategori Detay Ekranı .............................................................................. 7
- Şekil 10. Favoriler Ekran Görüntüsü ..................................................................... 8
- Şekil 11. Terim Detay Ekranı - Üst Kısım ............................................................. 9
- Şekil 12. Terim Detay Ekranı - Alt Kısım ............................................................. 9
- Şekil 13. Kişisel Not Ekleme Modalı .................................................................... 10
- Şekil 14. Quiz Bölümü Ekran Görüntüsü .............................................................. 10
- Şekil 15. React Native Çalışma Prensibi ............................................................... 11
- Şekil 16. Expo Geliştirme Ortamı ......................................................................... 12
- Şekil 17. Navigasyon Yapısı Şeması ..................................................................... 14
- Şekil 18. Context API Veri Akışı .......................................................................... 16
- Şekil 19. Terim Veri Modeli Şeması ..................................................................... 18
- Şekil 20. Kategori Renk Paleti .............................................................................. 20
- Şekil 21. Koyu Tema Renk Paleti ......................................................................... 20
- Şekil 22. Açık Tema Renk Paleti .......................................................................... 21
- Şekil 23. Sistem Mimarisi Diyagramı ................................................................... 22
- Şekil 24. Veri Akış Diyagramı .............................................................................. 23
- Şekil 25. Kullanıcı Akış Diyagramı ...................................................................... 24
- Şekil 26. Sınıf Diyagramı ...................................................................................... 25
- Şekil 27. Proje Dosya Yapısı ................................................................................. 26

---

## TABLO LİSTESİ

- Tablo 1. Kullanılan Teknolojiler ve Versiyonları .................................................. 11
- Tablo 2. Kullanılan Kütüphaneler ......................................................................... 14
- Tablo 3. Kategori Bilgileri .................................................................................... 19
- Tablo 4. AsyncStorage Veri Anahtarları ............................................................... 28
- Tablo 5. Terim Sayıları (Kategorilere Göre) ......................................................... 29

---

## KISALTMALAR

- **API:** Application Programming Interface (Uygulama Programlama Arayüzü)
- **CSS:** Cascading Style Sheets (Basamaklı Stil Şablonları)
- **HTML:** HyperText Markup Language (Hiper Metin İşaretleme Dili)
- **IDE:** Integrated Development Environment (Tümleşik Geliştirme Ortamı)
- **iOS:** iPhone Operating System (iPhone İşletim Sistemi)
- **JSON:** JavaScript Object Notation (JavaScript Nesne Gösterimi)
- **SDK:** Software Development Kit (Yazılım Geliştirme Kiti)
- **UI:** User Interface (Kullanıcı Arayüzü)
- **UX:** User Experience (Kullanıcı Deneyimi)

---

## 1. GİRİŞ

### 1.1 Projenin Genel Tanımı

Pharmadict, eczacılık ve sağlık alanında eğitim gören öğrenciler ile sağlık profesyonellerinin tıbbi terimlere hızlı ve kolay erişimini sağlamak amacıyla geliştirilmiş kapsamlı bir mobil uygulamadır. Uygulama adı, "Pharmacy" (eczacılık) ve "Dictionary" (sözlük) kelimelerinin birleşiminden oluşmaktadır.

Günümüzde tıp ve eczacılık alanında kullanılan terminoloji oldukça geniş ve karmaşıktır. Öğrenciler ve profesyoneller, bu terimleri öğrenmek ve hatırlamak için çeşitli kaynaklara başvurmak zorunda kalmaktadır. Geleneksel basılı sözlükler taşınabilirlik açısından pratik değildir ve güncel tutulması zordur. İnternet tabanlı kaynaklar ise her zaman güvenilir olmayabilir ve internet bağlantısı gerektirmektedir.

Pharmadict, bu sorunlara çözüm olarak tasarlanmıştır. Uygulama, offline çalışabilme özelliği sayesinde internet bağlantısı olmadan da kullanılabilmektedir. Kapsamlı veritabanı, güvenilir kaynaklardan derlenen 850'den fazla tıbbi terimi içermektedir. Modern ve kullanıcı dostu arayüzü ile terimlere hızlı erişim sağlanmaktadır.

[Şekil 1. Sistemin Genel Yapısı buraya eklenecek]

Uygulama, React Native framework'ü kullanılarak geliştirilmiştir. Bu teknoloji sayesinde tek bir kod tabanı ile hem iOS hem de Android platformlarında çalışabilen bir uygulama elde edilmiştir. Cross-platform yaklaşım, geliştirme süresini kısaltmış ve bakım maliyetlerini düşürmüştür.

---

### 1.2 Projenin Amacı ve Önemi

Bu projenin temel amacı, tıbbi terminoloji öğrenimini kolaylaştıran, kullanıcı dostu ve kapsamlı bir mobil uygulama geliştirmektir. Projenin spesifik amaçları şunlardır:

**Eğitim Desteği:** Eczacılık ve sağlık alanında eğitim gören öğrencilerin ders çalışma süreçlerini desteklemek ve tıbbi terimleri daha kolay öğrenmelerini sağlamak.

**Hızlı Erişim:** Sağlık profesyonellerinin günlük çalışmalarında karşılaştıkları terimlere hızlı ve güvenilir bir şekilde erişmelerini sağlamak.

**Offline Kullanım:** İnternet bağlantısı olmayan ortamlarda da uygulamanın kullanılabilmesini sağlamak.

**Kişiselleştirme:** Kullanıcıların kendi öğrenme süreçlerini yönetebilmeleri için favori ve not ekleme özellikleri sunmak.

**Bilgi Testi:** Quiz özelliği ile kullanıcıların öğrendiklerini test etmelerini sağlamak.

[Şekil 2. Uygulama Logosu buraya eklenecek]

Projenin önemi, tıbbi eğitimde dijital araçların artan rolü ile doğrudan ilişkilidir. Mobil cihazların yaygınlaşması, öğrencilerin ve profesyonellerin bilgiye her an her yerden erişme beklentisini artırmıştır. Pharmadict, bu beklentiyi karşılayan modern bir çözüm sunmaktadır.

---

### 1.3 Projenin Kapsamı

Pharmadict uygulaması, sekiz farklı kategoride toplam 850'den fazla tıbbi terimi kapsamaktadır. Bu kategoriler şunlardır:

**İlaçlar (100 terim):** Yaygın kullanılan ilaçlar, etken maddeleri, kullanım alanları, yan etkileri ve dozaj bilgileri.

**Bitkiler (100 terim):** Tıbbi amaçlarla kullanılan bitkiler, aktif bileşenleri ve geleneksel kullanım alanları.

**Vitaminler (100 terim):** Suda ve yağda çözünen vitaminler, fonksiyonları ve eksiklik belirtileri.

**Mineraller (100 terim):** Vücut için gerekli mineraller ve eser elementler, fonksiyonları ve kaynakları.

**Hastalıklar (150 terim):** Yaygın hastalıklar, semptomları, tanı yöntemleri ve tedavi yaklaşımları.

**Böcekler (100 terim):** Tıbbi öneme sahip böcekler, zehirleri ve tedavi yöntemleri.

**Bileşenler (100 terim):** Farmakolojik bileşenler, alkaloidler, flavonoidler ve diğer aktif maddeler.

**Anatomi (100 terim):** İnsan vücudunun anatomik yapıları, organlar ve sistemler.

Her terim için şu bilgiler sunulmaktadır:

- Latince/İngilizce isim
- Türkçe karşılık
- Tanım
- Etimoloji (köken bilgisi)
- Kullanım alanı
- Bileşenler
- Yan etkiler
- Dozaj bilgisi
- Kontrendikasyonlar
- İlaç etkileşimleri
- Eş anlamlılar
- İlgili terimler

---

### 1.4 Uygulamanın Genel Tanıtımı

Bu bölümde uygulamanın ekranları ve özellikleri detaylı olarak tanıtılmaktadır.

#### 1.4.1 Açılış Ekranı (Splash Screen)

Uygulama başlatıldığında kullanıcıyı animasyonlu bir açılış ekranı karşılamaktadır. Bu ekranda uygulama logosu, "PHARMADICT" yazısı ve "Merhaba" karşılama mesajı yer almaktadır.

Açılış ekranı, kullanıcıya profesyonel bir ilk izlenim vermek ve uygulamanın yüklenme sürecini görsel olarak zenginleştirmek amacıyla tasarlanmıştır. Ekranda gradient arka plan kullanılmış ve logo ile yazılar fade-in animasyonu ile görünür hale gelmektedir.

Açılış ekranı yaklaşık 2.5 saniye sürmekte ve ardından otomatik olarak ana sayfaya geçiş yapılmaktadır. Bu süre, uygulamanın arka planda verileri yüklemesi için yeterli zaman sağlamaktadır.

[Şekil 3. Açılış Ekranı (Splash Screen) buraya eklenecek]

---

#### 1.4.2 Ana Sayfa Ekranı

Ana sayfa, uygulamanın merkezi noktasıdır ve kullanıcıya çeşitli özelliklere hızlı erişim sağlamaktadır. Ana sayfada şu bölümler yer almaktadır:

**Header (Üst Kısım):** Uygulama logosu, ismi ve tema değiştirme butonu bulunmaktadır. Blur efekti ile modern bir görünüm sağlanmıştır.

**Hero Kartı:** Uygulamayı tanıtan ve kullanıcıyı motive eden bir karşılama kartıdır. "Pharmadict İle Keşfet" başlığı ve "1000'den fazla terim ile eczacılık dünyasını keşfet" alt başlığı yer almaktadır.

**Arama Çubuğu:** Kullanıcıların hızlı arama yapabilmesi için bir arama alanı bulunmaktadır. Arama çubuğuna tıklandığında arama sayfasına yönlendirme yapılmaktadır.

**Kategori Carousel:** Yatay kaydırılabilir kategori kartları ile kullanıcılar istedikleri kategoriye hızlıca erişebilmektedir. Her kategori kendine özgü renk ve ikon ile temsil edilmektedir.

**Öne Çıkanlar:** En çok ziyaret edilen terimler bu bölümde listelenmektedir. Kullanıcının ilgi alanlarına göre dinamik olarak güncellenmektedir.

**Mini Quiz:** Kullanıcıların bilgilerini test edebilecekleri interaktif bir quiz bölümü bulunmaktadır.

**Son Eklenenler:** Veritabanına en son eklenen terimler bu bölümde gösterilmektedir.

[Şekil 4. Ana Sayfa Ekran Görüntüsü buraya eklenecek]

[Şekil 5. Ana Sayfa - Kategori Carousel buraya eklenecek]

---

#### 1.4.3 Arama Ekranı

Arama ekranı, kullanıcıların terimleri hızlı ve etkili bir şekilde bulmalarını sağlamaktadır. Arama özelliği gerçek zamanlı olarak çalışmakta, kullanıcı yazmaya başladığında sonuçlar anında listelenmektedir.

**Arama Özellikleri:**

- Latince/İngilizce isim üzerinden arama
- Türkçe karşılık üzerinden arama
- Tanım içinde arama
- Eş anlamlılar üzerinden arama

**Arama Geçmişi:** Kullanıcının önceki aramaları kaydedilmekte ve hızlı erişim için listelenmektedir. Kullanıcı istediği zaman arama geçmişini temizleyebilmektedir.

**Popüler Aramalar:** En çok aranan terimler bu bölümde gösterilmektedir.

**Arama Önerileri:** Kullanıcı yazmaya başladığında, girilen metne uygun terim önerileri sunulmaktadır.

[Şekil 6. Arama Ekranı Görüntüsü buraya eklenecek]

[Şekil 7. Arama Sonuçları Ekranı buraya eklenecek]

---

#### 1.4.4 Kategoriler Ekranı

Kategoriler ekranı, terimlerin kategorilere göre organize edildiği bir görünüm sunmaktadır. Bento grid tasarımı ile modern ve görsel olarak çekici bir arayüz oluşturulmuştur.

Her kategori kartında şu bilgiler yer almaktadır:

- Kategori ikonu
- Kategori adı
- Kategorideki terim sayısı
- Kısa açıklama

Kategoriler gradient arka planlar ile renklendirilmiştir. Her kategorinin kendine özgü bir renk teması bulunmaktadır:

- İlaçlar: Mavi
- Bitkiler: Yeşil
- Vitaminler: Turuncu
- Mineraller: Mor
- Hastalıklar: Pembe
- Böcekler: Turuncu
- Bileşenler: Kırmızı
- Anatomi: İndigo

Kullanıcı bir kategoriye tıkladığında, o kategorideki tüm terimler listelenmektedir.

[Şekil 8. Kategoriler Ekran Görüntüsü buraya eklenecek]

[Şekil 9. Kategori Detay Ekranı buraya eklenecek]

---

#### 1.4.5 Favoriler Ekranı

Favoriler ekranı, kullanıcının beğendiği ve kaydettiği terimleri listelemektedir. Bu özellik, sık kullanılan terimlere hızlı erişim sağlamak ve kişisel bir çalışma listesi oluşturmak için tasarlanmıştır.

**Özellikler:**

- Favori terim sayısı gösterimi
- Terim kartları ile liste görünümü
- Not eklenen terimlerde özel ikon gösterimi
- Favorilerden çıkarma özelliği

Favori veriler cihazın yerel hafızasında saklanmakta ve uygulama kapatılsa bile korunmaktadır.

[Şekil 10. Favoriler Ekran Görüntüsü buraya eklenecek]

---

#### 1.4.6 Terim Detay Ekranı

Terim detay ekranı, seçilen terim hakkında kapsamlı bilgi sunmaktadır. Ekran, kullanıcı deneyimini ön planda tutan modern bir tasarıma sahiptir.

**Hero Bölümü:** Ekranın üst kısmında, terimin kategorisine özgü gradient arka plan üzerinde kategori ikonu, terim adı ve Türkçe karşılığı yer almaktadır.

**Bilgi Kartları:** Terim hakkındaki bilgiler, ayrı kartlar halinde düzenlenmiştir:

- **Tanım Kartı:** Terimin detaylı açıklaması
- **Etimoloji Kartı:** Terimin köken bilgisi
- **Kullanım Kartı:** Terimin kullanım alanları
- **Bileşenler Kartı:** Terimin içerdiği bileşenler (tag formatında)
- **Yan Etkiler Kartı:** Olası yan etkiler (uyarı formatında)
- **Dozaj Kartı:** Dozaj bilgileri
- **Kişisel Notlar Kartı:** Kullanıcının eklediği notlar

**Aksiyon Butonları:**

- Favori ekleme/çıkarma (kalp ikonu)
- Paylaşım (share ikonu)
- Geri dönme (ok ikonu)

**İlgili Terimler:** Ekranın alt kısmında, mevcut terimle ilişkili diğer terimler listelenmektedir. Kullanıcı bu terimlere tıklayarak detay sayfalarına gidebilmektedir.

[Şekil 11. Terim Detay Ekranı - Üst Kısım buraya eklenecek]

[Şekil 12. Terim Detay Ekranı - Alt Kısım buraya eklenecek]

**Kişisel Not Özelliği:**

Kullanıcılar her terim için kişisel not ekleyebilmektedir. Bu özellik özellikle sınav hazırlığı yapan öğrenciler için tasarlanmıştır. Not ekleme işlemi modal pencere üzerinden yapılmaktadır.

Not özellikleri:

- Metin girişi için geniş alan
- Kaydetme ve iptal butonları
- Mevcut notu silme seçeneği
- Son güncelleme tarihi gösterimi

[Şekil 13. Kişisel Not Ekleme Modalı buraya eklenecek]

---

#### 1.4.7 Quiz Bölümü

Quiz bölümü, kullanıcıların tıbbi bilgilerini eğlenceli bir şekilde test etmelerini sağlamaktadır. Ana sayfada yer alan mini quiz widget'ı, interaktif bir öğrenme deneyimi sunmaktadır.

**Quiz Özellikleri:**

- 24 soruluk soru havuzu
- 6 set halinde 4'er soru
- Çoktan seçmeli sorular (3 seçenek)
- Anlık geri bildirim (doğru/yanlış animasyonları)
- Skor takibi
- İlerleme çubuğu
- Set göstergesi

**Soru Tipleri:**

- İlaç etken maddeleri
- Vitamin fonksiyonları
- Mineral kaynakları
- Bitki kullanım alanları
- Organ fonksiyonları
- Hastalık belirtileri

Quiz tamamlandığında kullanıcı yeni bir sete geçebilmekte ve bilgilerini pekiştirebilmektedir.

[Şekil 14. Quiz Bölümü Ekran Görüntüsü buraya eklenecek]

---

## 2. MATERYAL VE YÖNTEM

### 2.1 Geliştirme Ortamı ve Araçları

Bu bölümde projenin geliştirilmesinde kullanılan teknolojiler ve araçlar detaylı olarak açıklanmaktadır.

#### 2.1.1 React Native

React Native, Facebook tarafından 2015 yılında açık kaynak olarak yayınlanan bir mobil uygulama geliştirme framework'üdür. JavaScript ve React kullanarak native mobil uygulamalar geliştirmeyi mümkün kılmaktadır.

**React Native'in Avantajları:**

- **Cross-Platform Geliştirme:** Tek bir kod tabanı ile hem iOS hem de Android uygulamaları geliştirilebilmektedir. Bu durum geliştirme süresini ve maliyetini önemli ölçüde azaltmaktadır.

- **Native Performans:** React Native, JavaScript kodunu native bileşenlere dönüştürmektedir. Bu sayede web tabanlı hibrit uygulamalara kıyasla çok daha iyi performans elde edilmektedir.

- **Hot Reloading:** Geliştirme sürecinde yapılan değişiklikler anında uygulamaya yansımaktadır. Bu özellik geliştirme hızını artırmaktadır.

- **Geniş Ekosistem:** React Native, geniş bir kütüphane ve araç ekosistemine sahiptir. Topluluk desteği güçlüdür ve sürekli gelişmektedir.

- **Kod Paylaşımı:** İş mantığı kodunun büyük bir kısmı platformlar arasında paylaşılabilmektedir.

[Şekil 15. React Native Çalışma Prensibi buraya eklenecek]

**Tablo 1. Kullanılan Teknolojiler ve Versiyonları**

| Teknoloji    | Versiyon | Açıklama                   |
| ------------ | -------- | -------------------------- |
| React Native | 0.76.x   | Mobil uygulama framework'ü |
| React        | 19.1.0   | UI kütüphanesi             |
| TypeScript   | 5.3.3    | Programlama dili           |
| Expo         | 54.0.0   | Geliştirme platformu       |
| Node.js      | 18+      | JavaScript runtime         |

---

#### 2.1.2 Expo

Expo, React Native geliştirme sürecini kolaylaştıran ve hızlandıran bir platform ve araç setidir. Expo kullanmanın başlıca avantajları şunlardır:

**Kolay Başlangıç:** Expo ile yeni bir proje oluşturmak ve çalıştırmak oldukça basittir. Native geliştirme ortamı kurulumu gerektirmeden hızlıca başlanabilmektedir.

**Expo Go Uygulaması:** Geliştirme sürecinde uygulamayı fiziksel cihazda test etmek için Expo Go uygulaması kullanılmaktadır. QR kod tarayarak uygulama anında cihazda çalıştırılabilmektedir.

**Hazır API'ler:** Kamera, konum, bildirimler, dosya sistemi gibi native özelliklere erişim için hazır API'ler sunulmaktadır.

**OTA Güncellemeler:** Over-the-air güncellemeler sayesinde uygulama mağaza onayı beklemeden güncellenebilmektedir.

**Build Servisleri:** Expo Application Services (EAS) ile bulut tabanlı build işlemleri yapılabilmektedir.

[Şekil 16. Expo Geliştirme Ortamı buraya eklenecek]

---

#### 2.1.3 TypeScript

TypeScript, Microsoft tarafından geliştirilen ve JavaScript'in üzerine inşa edilmiş bir programlama dilidir. JavaScript'e statik tip kontrolü eklemektedir.

**TypeScript'in Avantajları:**

- **Tip Güvenliği:** Değişkenlerin ve fonksiyonların tipleri tanımlanarak derleme zamanında hata kontrolü yapılmaktadır.

- **Gelişmiş IDE Desteği:** Otomatik tamamlama, refactoring ve hata gösterimi gibi özellikler geliştirilmiştir.

- **Daha İyi Dokümantasyon:** Tip tanımları kodun kendini dokümante etmesini sağlamaktadır.

- **Büyük Projelerde Ölçeklenebilirlik:** Tip sistemi sayesinde büyük projelerde kod kalitesi korunmaktadır.

```typescript
// TypeScript ile tip tanımlama örneği
interface PharmacyTerm {
  id: string;
  latinName: string;
  turkishName: string;
  category: TermCategory;
  definition: string;
  isBookmarked: boolean;
}
```

---

#### 2.1.4 Visual Studio Code

Proje geliştirme sürecinde Visual Studio Code (VS Code) editörü kullanılmıştır. VS Code, Microsoft tarafından geliştirilen ücretsiz ve açık kaynaklı bir kod editörüdür.

**Kullanılan Eklentiler:**

- ESLint: Kod kalitesi kontrolü
- Prettier: Kod formatlama
- React Native Tools: React Native geliştirme desteği
- TypeScript: TypeScript dil desteği

---

### 2.2 Kullanılan Kütüphaneler

Projede çeşitli üçüncü parti kütüphaneler kullanılmıştır. Bu kütüphaneler, geliştirme sürecini hızlandırmış ve uygulamanın işlevselliğini artırmıştır.

**Tablo 2. Kullanılan Kütüphaneler**

| Kütüphane                      | Versiyon | Kullanım Amacı        |
| ------------------------------ | -------- | --------------------- |
| @react-navigation/native       | 6.1.9    | Navigasyon yönetimi   |
| @react-navigation/bottom-tabs  | 6.5.11   | Alt tab navigasyonu   |
| @react-navigation/native-stack | 6.9.17   | Stack navigasyonu     |
| @react-native-async-storage    | 2.2.0    | Yerel veri depolama   |
| expo-linear-gradient           | 15.0.8   | Gradient arka planlar |
| expo-blur                      | 15.0.8   | Blur efektleri        |
| @expo/vector-icons             | 15.0.3   | İkon seti             |
| @expo-google-fonts/inter       | 0.4.2    | Inter font ailesi     |
| @expo-google-fonts/poppins     | 0.4.1    | Poppins font ailesi   |
| uuid                           | 9.0.0    | Benzersiz ID üretimi  |

---

#### 2.2.1 React Navigation

React Navigation, React Native uygulamalarında navigasyon yönetimi için kullanılan en popüler kütüphanedir. Projede iki tür navigasyon kullanılmıştır:

**Stack Navigator:** Sayfaların üst üste yığılması prensibine dayanmaktadır. Terim detay sayfası ve kategori detay sayfası stack navigator ile açılmaktadır. Kullanıcı geri butonuna bastığında önceki sayfaya dönmektedir.

**Bottom Tab Navigator:** Ekranın alt kısmında sabit bir tab bar oluşturmaktadır. Ana sayfa, arama, kategoriler ve favoriler sekmeleri bu navigator ile yönetilmektedir.

[Şekil 17. Navigasyon Yapısı Şeması buraya eklenecek]

```typescript
// Navigasyon yapısı örneği
<Stack.Navigator>
  <Stack.Screen name="Main" component={MainTabs} />
  <Stack.Screen name="TermDetail" component={TermDetailView} />
  <Stack.Screen name="CategoryDetail" component={CategoryDetailView} />
</Stack.Navigator>
```

---

#### 2.2.2 AsyncStorage

AsyncStorage, React Native uygulamalarında anahtar-değer çiftleri şeklinde veri depolamak için kullanılan bir kütüphanedir. Web'deki localStorage'a benzer şekilde çalışmaktadır.

**Kullanım Alanları:**

- Favori terimlerin saklanması
- Kişisel notların saklanması
- Tema tercihinin saklanması
- Arama geçmişinin saklanması
- Terim ziyaret sayılarının saklanması

```typescript
// AsyncStorage kullanım örneği
// Veri kaydetme
await AsyncStorage.setItem("favorites", JSON.stringify(favoriteIds));

// Veri okuma
const stored = await AsyncStorage.getItem("favorites");
const favorites = stored ? JSON.parse(stored) : [];
```

---

#### 2.2.3 Expo Linear Gradient

Expo Linear Gradient, renk geçişli arka planlar oluşturmak için kullanılmaktadır. Uygulamada kategori kartları, hero kartları ve butonlarda gradient efektler kullanılmıştır.

```typescript
// Gradient kullanım örneği
<LinearGradient
  colors={["#14B8A6", "#0D9488"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.card}
>
  <Text>İçerik</Text>
</LinearGradient>
```

---

#### 2.2.4 Expo Blur

Expo Blur, bulanıklık efekti oluşturmak için kullanılmaktadır. Uygulamada header bölümünde cam efekti (glassmorphism) oluşturmak için kullanılmıştır.

```typescript
// Blur kullanım örneği
<BlurView intensity={40} tint="dark" style={styles.header}>
  <Text>Header İçeriği</Text>
</BlurView>
```

---

### 2.3 State Yönetimi

State yönetimi, React uygulamalarında verilerin tutulması ve güncellenmesi sürecini ifade etmektedir. Projede React Context API ve React Hooks kullanılarak state yönetimi sağlanmıştır.

#### 2.3.1 React Context API

Context API, React'ın yerleşik state yönetim çözümüdür. Verilerin component ağacı boyunca "prop drilling" yapmadan paylaşılmasını sağlamaktadır.

Projede iki ana context oluşturulmuştur:

**PharmacyContext:** Terim verileri ve ilgili işlemleri yönetmektedir.

- Tüm terimler listesi
- Yükleme durumu
- Arama metni ve sonuçları
- Favori işlemleri
- Kategori filtreleme

**ThemeContext:** Tema ayarlarını yönetmektedir.

- Aktif tema (koyu/açık)
- Renk paleti
- Tema değiştirme fonksiyonu

[Şekil 18. Context API Veri Akışı buraya eklenecek]

```typescript
// Context Provider yapısı
<ThemeProvider>
  <PharmacyProvider>
    <App />
  </PharmacyProvider>
</ThemeProvider>;

// Context kullanımı
const { terms, isLoading, toggleBookmark } = usePharmacy();
const { colors, isDark, toggleTheme } = useTheme();
```

---

#### 2.3.2 React Hooks

React Hooks, fonksiyonel component'lerde state ve lifecycle özelliklerini kullanmayı sağlayan fonksiyonlardır. Projede kullanılan başlıca hook'lar şunlardır:

**useState:** Component içinde state tutmak için kullanılmaktadır.

```typescript
const [searchText, setSearchText] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

**useEffect:** Yan etkileri (API çağrıları, abonelikler vb.) yönetmek için kullanılmaktadır.

```typescript
useEffect(() => {
  loadAllTerms();
}, []); // Component mount olduğunda çalışır
```

**useCallback:** Fonksiyonları memoize etmek için kullanılmaktadır.

```typescript
const toggleBookmark = useCallback(async (termId: string) => {
  // Favori toggle işlemi
}, []);
```

**useRef:** DOM referansları ve değişmeyen değerler için kullanılmaktadır.

```typescript
const inputRef = useRef<TextInput>(null);
const animValue = useRef(new Animated.Value(0)).current;
```

**useContext:** Context değerlerine erişmek için kullanılmaktadır.

```typescript
const context = useContext(PharmacyContext);
```

---

### 2.4 Veri Yapısı ve Modelleme

#### 2.4.1 Terim Veri Modeli

Uygulamadaki her terim, belirli bir veri yapısına sahiptir. TypeScript interface'i ile tanımlanan bu yapı, veri tutarlılığını sağlamaktadır.

[Şekil 19. Terim Veri Modeli Şeması buraya eklenecek]

```typescript
interface PharmacyTerm {
  id: string; // Benzersiz kimlik
  latinName: string; // Latince/İngilizce isim
  turkishName: string; // Türkçe karşılık
  category: TermCategory; // Kategori
  definition: string; // Tanım
  components: string[]; // Bileşenler
  relatedTerms: string[]; // İlgili terimler
  etymology?: string; // Etimoloji (opsiyonel)
  usage?: string; // Kullanım alanı (opsiyonel)
  sideEffects?: string[]; // Yan etkiler (opsiyonel)
  dosage?: string; // Dozaj (opsiyonel)
  contraindications?: string[]; // Kontrendikasyonlar (opsiyonel)
  interactions?: string[]; // İlaç etkileşimleri (opsiyonel)
  synonyms: string[]; // Eş anlamlılar
  isBookmarked: boolean; // Favori durumu
  createdAt: Date; // Oluşturulma tarihi
  updatedAt: Date; // Güncellenme tarihi
}
```

**ID Oluşturma Stratejisi:**

Terim ID'leri, kategori ve Latince isim kombinasyonundan oluşturulmaktadır. Bu yaklaşım, ID'lerin tahmin edilebilir ve tutarlı olmasını sağlamaktadır.

```typescript
// ID oluşturma örneği
const id = `${category}_${latinName.toLowerCase().replace(/\s+/g, "_")}`;
// Örnek: "İlaçlar_aspirin"
```

---

#### 2.4.2 Kategori Yapısı

Terimler sekiz ana kategoride sınıflandırılmıştır. Her kategori için enum değeri, ikon, renk ve açıklama tanımlanmıştır.

```typescript
enum TermCategory {
  DRUG = "İlaçlar",
  PLANT = "Bitkiler",
  VITAMIN = "Vitaminler",
  MINERAL = "Mineraller",
  DISEASE = "Hastalıklar",
  INSECT = "Böcekler",
  COMPONENT = "Bileşenler",
  ANATOMY = "Anatomi",
}
```

**Tablo 3. Kategori Bilgileri**

| Kategori    | İkon    | Renk Kodu | Terim Sayısı |
| ----------- | ------- | --------- | ------------ |
| İlaçlar     | medical | #3B82F6   | 100          |
| Bitkiler    | leaf    | #10B981   | 100          |
| Vitaminler  | flask   | #F59E0B   | 100          |
| Mineraller  | diamond | #8B5CF6   | 100          |
| Hastalıklar | fitness | #EC4899   | 150          |
| Böcekler    | bug     | #F97316   | 100          |
| Bileşenler  | nuclear | #EF4444   | 100          |
| Anatomi     | body    | #6366F1   | 100          |

---

### 2.5 Kullanıcı Arayüzü Tasarımı

#### 2.5.1 Renk Paleti

Uygulama, koyu ve açık tema olmak üzere iki renk paleti sunmaktadır. Renk seçiminde erişilebilirlik ve göz yorgunluğu faktörleri göz önünde bulundurulmuştur.

[Şekil 20. Kategori Renk Paleti buraya eklenecek]

**Koyu Tema Renkleri:**

[Şekil 21. Koyu Tema Renk Paleti buraya eklenecek]

| Özellik    | Renk Kodu | Kullanım        |
| ---------- | --------- | --------------- |
| Background | #0A0E14   | Ana arka plan   |
| Surface    | #151B23   | Kart arka planı |
| Primary    | #14B8A6   | Ana vurgu rengi |
| Text       | #F0F4F8   | Ana metin       |
| Border     | #2A3544   | Kenar çizgileri |

**Açık Tema Renkleri:**

[Şekil 22. Açık Tema Renk Paleti buraya eklenecek]

| Özellik    | Renk Kodu | Kullanım        |
| ---------- | --------- | --------------- |
| Background | #FAFBFC   | Ana arka plan   |
| Surface    | #FFFFFF   | Kart arka planı |
| Primary    | #0D9488   | Ana vurgu rengi |
| Text       | #111827   | Ana metin       |
| Border     | #E5E7EB   | Kenar çizgileri |

---

#### 2.5.2 Tipografi

Uygulamada iki font ailesi kullanılmıştır:

**Poppins:** Başlıklar ve logo için kullanılmaktadır. Bold ağırlık tercih edilmiştir.

**Inter:** Gövde metinleri için kullanılmaktadır. Regular, Medium, SemiBold ve Bold ağırlıkları kullanılmıştır.

Font boyutları 11px ile 30px arasında değişmektedir. Başlıklar için büyük boyutlar, açıklama metinleri için küçük boyutlar tercih edilmiştir.

---

#### 2.5.3 Bileşen Tasarımı

Uygulama arayüzü, yeniden kullanılabilir bileşenler üzerine inşa edilmiştir. Başlıca bileşenler şunlardır:

**TermCard:** Terim listelerinde kullanılan kart bileşenidir. İki varyantı bulunmaktadır: default ve featured.

**CategoryCarousel:** Yatay kaydırılabilir kategori kartları bileşenidir.

**MiniQuizCard:** Quiz widget bileşenidir. Soru, seçenekler ve skor gösterimini içermektedir.

Bileşenler, StyleSheet API kullanılarak stillendirilmiştir. Dinamik stiller için tema renkleri kullanılmaktadır.

---

## 3. BULGULAR - PROJENİN ÇALIŞMASI VE KABİLİYETLERİ

Bu bölümde projenin teknik yapısı, veri akışı ve sistem mimarisi detaylı olarak açıklanmaktadır.

### 3.1 Sistem Mimarisi

Pharmadict uygulaması, katmanlı mimari (layered architecture) prensiplerine uygun olarak tasarlanmıştır. Bu mimari yaklaşım, kodun modüler, test edilebilir ve bakımı kolay olmasını sağlamaktadır.

[Şekil 23. Sistem Mimarisi Diyagramı buraya eklenecek]

**Mimari Katmanlar:**

**1. Sunum Katmanı (Presentation Layer):**
Bu katman, kullanıcı arayüzü bileşenlerini içermektedir. React Native component'leri bu katmanda yer almaktadır.

- Pages (Sayfalar): HomeView, SearchView, CategoriesView, BookmarksView, TermDetailView, CategoryDetailView
- Components (Bileşenler): TermCard, CategoryCarousel, MiniQuizCard

**2. İş Mantığı Katmanı (Business Logic Layer):**
Context API ve custom hook'lar bu katmanda yer almaktadır. Uygulama mantığı ve state yönetimi bu katmanda gerçekleştirilmektedir.

- PharmacyContext: Terim verileri ve işlemleri
- ThemeContext: Tema yönetimi
- Custom Hooks: usePharmacy, useTheme

**3. Servis Katmanı (Service Layer):**
Veri işlemleri ve dış kaynaklarla iletişim bu katmanda gerçekleştirilmektedir.

- PharmacyTermService: Terim CRUD işlemleri
- NotesService: Not yönetimi
- AsyncStorage: Yerel veri depolama

**4. Veri Katmanı (Data Layer):**
Statik veri dosyaları ve veri modelleri bu katmanda yer almaktadır.

- Data Files: plantsData.ts, drugsData.ts, vitaminsData.ts, vb.
- Types: PharmacyTerm, TermCategory, Note

---

### 3.2 Veri Akış Diyagramı

Uygulamada veri akışı tek yönlü (unidirectional) olarak tasarlanmıştır. Bu yaklaşım, React'ın önerdiği veri akış modeline uygundur ve uygulamanın davranışını tahmin edilebilir kılmaktadır.

[Şekil 24. Veri Akış Diyagramı buraya eklenecek]

**Veri Akış Adımları:**

```
1. Kullanıcı Etkileşimi
   ↓
2. Event Handler (Olay İşleyici)
   ↓
3. Context Action (Bağlam Aksiyonu)
   ↓
4. Service Layer (Servis Katmanı)
   ↓
5. AsyncStorage (Yerel Depolama)
   ↓
6. State Güncelleme
   ↓
7. UI Yeniden Render
```

**Örnek Veri Akışı - Favori Ekleme:**

1. Kullanıcı kalp ikonuna tıklar
2. `onPress` event handler tetiklenir
3. `toggleBookmark(termId)` fonksiyonu çağrılır
4. PharmacyTermService favori durumunu günceller
5. AsyncStorage'a yeni favori listesi kaydedilir
6. Context state güncellenir
7. İlgili component'ler yeniden render edilir

---

### 3.3 Kullanıcı Akış Diyagramı

Kullanıcı akış diyagramı, kullanıcının uygulama içindeki olası yolculuklarını göstermektedir.

[Şekil 25. Kullanıcı Akış Diyagramı buraya eklenecek]

**Ana Kullanıcı Akışları:**

**Akış 1: Terim Arama**

```
Splash Screen → Ana Sayfa → Arama Çubuğu → Arama Ekranı → Arama Sonuçları → Terim Detay
```

**Akış 2: Kategori Gezinme**

```
Ana Sayfa → Kategoriler Tab → Kategori Seçimi → Kategori Detay → Terim Listesi → Terim Detay
```

**Akış 3: Favori Yönetimi**

```
Terim Detay → Favori Ekle → Favoriler Tab → Favori Listesi → Terim Detay
```

**Akış 4: Not Ekleme**

```
Terim Detay → Not Butonu → Not Modal → Not Yazma → Kaydet → Terim Detay
```

**Akış 5: Quiz Çözme**

```
Ana Sayfa → Mini Quiz → Soru Görüntüleme → Cevap Seçimi → Sonuç → Sonraki Soru
```

---

### 3.4 Sınıf Diyagramı

TypeScript interface'leri ve sınıfları arasındaki ilişkiler aşağıda gösterilmektedir.

[Şekil 26. Sınıf Diyagramı buraya eklenecek]

**Ana Interface'ler:**

```typescript
// PharmacyTerm Interface
interface PharmacyTerm {
  id: string;
  latinName: string;
  turkishName: string;
  category: TermCategory;
  definition: string;
  components: string[];
  relatedTerms: string[];
  etymology?: string;
  usage?: string;
  sideEffects?: string[];
  dosage?: string;
  contraindications?: string[];
  interactions?: string[];
  synonyms: string[];
  isBookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Note Interface
interface Note {
  id: string;
  termId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// QuizQuestion Interface
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
```

**Context Interface'leri:**

```typescript
// PharmacyContextType
interface PharmacyContextType {
  terms: PharmacyTerm[];
  isLoading: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  filteredTerms: PharmacyTerm[];
  toggleBookmark: (termId: string) => Promise<void>;
  getTermsByCategory: (category: TermCategory) => PharmacyTerm[];
  getBookmarkedTerms: () => PharmacyTerm[];
  incrementVisitCount: (termId: string) => Promise<void>;
  getMostVisitedTerms: () => PharmacyTerm[];
}

// ThemeContextType
interface ThemeContextType {
  isDark: boolean;
  colors: ColorPalette;
  toggleTheme: () => void;
}
```

---

### 3.5 Dosya Yapısı

Proje dosyaları, işlevlerine göre organize edilmiştir. Bu organizasyon, kodun bulunabilirliğini ve bakımını kolaylaştırmaktadır.

[Şekil 27. Proje Dosya Yapısı buraya eklenecek]

```
pharmadict/
├── src/
│   ├── App.tsx                    # Ana uygulama bileşeni
│   ├── main.tsx                   # Uygulama giriş noktası
│   │
│   ├── components/                # Yeniden kullanılabilir bileşenler
│   │   ├── TermCard.tsx          # Terim kartı bileşeni
│   │   ├── CategoryCarousel.tsx  # Kategori carousel bileşeni
│   │   └── MiniQuizCard.tsx      # Quiz widget bileşeni
│   │
│   ├── pages/                     # Sayfa bileşenleri
│   │   ├── HomeView.tsx          # Ana sayfa
│   │   ├── SearchView.tsx        # Arama sayfası
│   │   ├── CategoriesView.tsx    # Kategoriler sayfası
│   │   ├── BookmarksView.tsx     # Favoriler sayfası
│   │   ├── TermDetailView.tsx    # Terim detay sayfası
│   │   ├── CategoryDetailView.tsx # Kategori detay sayfası
│   │   └── AdminView.tsx         # Yönetim sayfası
│   │
│   ├── context/                   # Context dosyaları
│   │   ├── PharmacyContext.tsx   # Terim context'i
│   │   └── ThemeContext.tsx      # Tema context'i
│   │
│   ├── services/                  # Servis dosyaları
│   │   ├── PharmacyTermService.ts # Terim servisi
│   │   ├── NotesService.ts       # Not servisi
│   │   ├── FirebaseService.ts    # Firebase servisi
│   │   └── GeminiService.ts      # AI servisi
│   │
│   ├── data/                      # Veri dosyaları
│   │   ├── plantsData.ts         # Bitki verileri (100 terim)
│   │   ├── drugsData.ts          # İlaç verileri (100 terim)
│   │   ├── vitaminsData.ts       # Vitamin verileri (100 terim)
│   │   ├── mineralsData.ts       # Mineral verileri (100 terim)
│   │   ├── diseasesData.ts       # Hastalık verileri (150 terim)
│   │   ├── insectsData.ts        # Böcek verileri (100 terim)
│   │   ├── componentsData.ts     # Bileşen verileri (100 terim)
│   │   └── anatomyData.ts        # Anatomi verileri (100 terim)
│   │
│   ├── styles/                    # Stil dosyaları
│   │   └── index.css             # Global stiller
│   │
│   └── types/                     # Tip tanımları
│       └── index.ts              # TypeScript tipleri
│
├── assets/                        # Statik dosyalar
│   ├── images/                   # Görseller
│   └── fonts/                    # Font dosyaları
│
├── app.json                       # Expo yapılandırması
├── package.json                   # Bağımlılıklar
├── tsconfig.json                  # TypeScript yapılandırması
└── babel.config.js               # Babel yapılandırması
```

---

### 3.6 Servis Katmanı

Servis katmanı, veri işlemlerini ve iş mantığını kapsüllemektedir. Bu katman, sunum katmanından bağımsız olarak test edilebilir ve değiştirilebilir yapıdadır.

**3.6.1 PharmacyTermService**

Bu servis, terim verilerinin yönetiminden sorumludur.

```typescript
class PharmacyTermService {
  // Tüm terimleri yükle
  static async loadAllTerms(): Promise<PharmacyTerm[]>;

  // Kategoriye göre terimleri getir
  static getTermsByCategory(
    terms: PharmacyTerm[],
    category: TermCategory
  ): PharmacyTerm[];

  // Favori durumunu değiştir
  static async toggleBookmark(termId: string): Promise<void>;

  // Favori terimleri getir
  static async getBookmarkedTermIds(): Promise<string[]>;

  // Ziyaret sayısını artır
  static async incrementVisitCount(termId: string): Promise<void>;

  // En çok ziyaret edilen terimleri getir
  static async getMostVisitedTermIds(): Promise<string[]>;

  // Arama geçmişini kaydet
  static async saveSearchHistory(query: string): Promise<void>;

  // Arama geçmişini getir
  static async getSearchHistory(): Promise<string[]>;
}
```

**3.6.2 NotesService**

Bu servis, kullanıcı notlarının yönetiminden sorumludur.

```typescript
class NotesService {
  // Tüm notları getir
  static async getAllNotes(): Promise<Note[]>;

  // Terime ait notu getir
  static async getNoteByTermId(termId: string): Promise<Note | null>;

  // Not kaydet veya güncelle
  static async saveNote(termId: string, content: string): Promise<Note>;

  // Not sil
  static async deleteNote(termId: string): Promise<void>;

  // Notlu terim ID'lerini getir
  static async getTermIdsWithNotes(): Promise<string[]>;
}
```

---

### 3.7 Veritabanı Yapısı

Uygulama, yerel veri depolama için AsyncStorage kullanmaktadır. Bu yaklaşım, offline çalışabilme özelliğini mümkün kılmaktadır.

**Tablo 4. AsyncStorage Veri Anahtarları**

| Anahtar                      | Veri Tipi              | Açıklama                  |
| ---------------------------- | ---------------------- | ------------------------- |
| `@pharmadict_bookmarks`      | string[]               | Favori terim ID'leri      |
| `@pharmadict_notes`          | Note[]                 | Kullanıcı notları         |
| `@pharmadict_theme`          | string                 | Tema tercihi (dark/light) |
| `@pharmadict_search_history` | string[]               | Arama geçmişi             |
| `@pharmadict_visit_counts`   | Record<string, number> | Terim ziyaret sayıları    |

**Veri Depolama Stratejisi:**

Veriler JSON formatında serileştirilerek saklanmaktadır. Her okuma ve yazma işlemi asenkron olarak gerçekleştirilmektedir.

```typescript
// Veri kaydetme örneği
const saveBookmarks = async (bookmarkIds: string[]) => {
  await AsyncStorage.setItem(
    "@pharmadict_bookmarks",
    JSON.stringify(bookmarkIds)
  );
};

// Veri okuma örneği
const loadBookmarks = async (): Promise<string[]> => {
  const stored = await AsyncStorage.getItem("@pharmadict_bookmarks");
  return stored ? JSON.parse(stored) : [];
};
```

**Veri Bütünlüğü:**

Uygulama başlatıldığında, AsyncStorage'dan yüklenen veriler ile statik veri dosyaları senkronize edilmektedir. Bu işlem, favori durumlarının ve notların doğru şekilde yansıtılmasını sağlamaktadır.

---

## 4. TARTIŞMA VE SONUÇ

### 4.1 Projenin Değerlendirilmesi

Pharmadict projesi, belirlenen hedefler doğrultusunda başarıyla tamamlanmıştır. Uygulama, tıbbi terminoloji öğrenimini destekleyen kapsamlı ve kullanıcı dostu bir mobil çözüm sunmaktadır.

**Tablo 5. Terim Sayıları (Kategorilere Göre)**

| Kategori    | Planlanan | Gerçekleşen | Başarı Oranı |
| ----------- | --------- | ----------- | ------------ |
| İlaçlar     | 100       | 100         | %100         |
| Bitkiler    | 100       | 100         | %100         |
| Vitaminler  | 100       | 100         | %100         |
| Mineraller  | 100       | 100         | %100         |
| Hastalıklar | 150       | 150         | %100         |
| Böcekler    | 100       | 100         | %100         |
| Bileşenler  | 100       | 100         | %100         |
| Anatomi     | 100       | 100         | %100         |
| **TOPLAM**  | **850**   | **850**     | **%100**     |

**Teknik Değerlendirme:**

Proje, modern yazılım geliştirme pratiklerine uygun olarak geliştirilmiştir. TypeScript kullanımı, tip güvenliği sağlamış ve hata oranını azaltmıştır. React Native ve Expo kombinasyonu, cross-platform geliştirme sürecini verimli kılmıştır.

Kod kalitesi açısından şu metrikler elde edilmiştir:

- Toplam TypeScript dosyası: 25+
- Yeniden kullanılabilir bileşen sayısı: 10+
- Servis sınıfı sayısı: 4
- Context sayısı: 2
- Toplam kod satırı: 5000+

**Kullanıcı Deneyimi Değerlendirmesi:**

Uygulama arayüzü, modern tasarım trendlerine uygun olarak geliştirilmiştir. Koyu ve açık tema seçenekleri, farklı kullanım senaryolarına uyum sağlamaktadır. Animasyonlar ve geçiş efektleri, kullanıcı deneyimini zenginleştirmektedir.

---

### 4.2 Amaca Ulaşma Değerlendirmesi

Projenin başlangıcında belirlenen amaçlar ve bu amaçlara ulaşma durumu aşağıda değerlendirilmektedir.

**Amaç 1: Kapsamlı Terim Veritabanı Oluşturma**

- Hedef: 800+ terim
- Sonuç: 850 terim
- Değerlendirme: ✓ Başarılı

Sekiz farklı kategoride toplam 850 terim başarıyla eklenerek hedefin üzerine çıkılmıştır. Her terim için detaylı bilgiler (tanım, etimoloji, kullanım, yan etkiler vb.) sağlanmıştır.

**Amaç 2: Cross-Platform Uygulama Geliştirme**

- Hedef: iOS ve Android desteği
- Sonuç: Her iki platform desteklenmektedir
- Değerlendirme: ✓ Başarılı

React Native ve Expo kullanılarak tek kod tabanından hem iOS hem de Android platformlarında çalışan uygulama geliştirilmiştir.

**Amaç 3: Offline Çalışabilme**

- Hedef: İnternet bağlantısı olmadan kullanım
- Sonuç: Tüm terimler offline erişilebilir
- Değerlendirme: ✓ Başarılı

Terim verileri uygulama içinde statik olarak saklanmakta, favori ve notlar AsyncStorage ile yerel olarak depolanmaktadır.

**Amaç 4: Kişiselleştirme Özellikleri**

- Hedef: Favori ve not ekleme
- Sonuç: Her iki özellik de mevcut
- Değerlendirme: ✓ Başarılı

Kullanıcılar terimleri favorilere ekleyebilmekte ve kişisel notlar alabilmektedir. Bu veriler cihazda kalıcı olarak saklanmaktadır.

**Amaç 5: Bilgi Testi Özelliği**

- Hedef: Quiz bölümü
- Sonuç: 24 soruluk quiz sistemi
- Değerlendirme: ✓ Başarılı

Mini quiz widget'ı ile kullanıcılar bilgilerini test edebilmektedir. Anlık geri bildirim ve skor takibi özellikleri mevcuttur.

---

### 4.3 Karşılaşılan Zorluklar ve Çözümler

Proje geliştirme sürecinde çeşitli teknik ve tasarımsal zorluklarla karşılaşılmıştır. Bu zorluklar ve uygulanan çözümler aşağıda açıklanmaktadır.

**Zorluk 1: Büyük Veri Setinin Yönetimi**

850 terimin yönetimi ve performanslı bir şekilde sunulması başlangıçta zorluk oluşturmuştur.

_Çözüm:_ Veriler kategorilere göre ayrı dosyalarda organize edilmiştir. Lazy loading ve memoization teknikleri kullanılarak performans optimize edilmiştir.

**Zorluk 2: State Yönetimi Karmaşıklığı**

Birden fazla ekran arasında veri paylaşımı ve senkronizasyonu karmaşık hale gelmiştir.

_Çözüm:_ React Context API kullanılarak merkezi state yönetimi sağlanmıştır. Custom hook'lar ile kod tekrarı önlenmiştir.

**Zorluk 3: Tema Değişikliği**

Koyu ve açık tema arasında geçiş yaparken tüm bileşenlerin tutarlı şekilde güncellenmesi gerekmiştir.

_Çözüm:_ ThemeContext oluşturularak renk paleti merkezi olarak yönetilmiştir. Tüm bileşenler dinamik olarak tema renklerini kullanmaktadır.

**Zorluk 4: Navigasyon Yapısı**

Tab navigasyonu ve stack navigasyonunun birlikte çalışması karmaşıklık oluşturmuştur.

_Çözüm:_ React Navigation kütüphanesi ile nested navigator yapısı kurulmuştur. Tab navigator içinde stack navigator kullanılarak sorun çözülmüştür.

**Zorluk 5: Veri Kalıcılığı**

Favori ve not verilerinin uygulama kapatıldığında kaybolmaması gerekmiştir.

_Çözüm:_ AsyncStorage kullanılarak veriler cihazın yerel hafızasında kalıcı olarak saklanmıştır.

---

### 4.4 Gelecek Çalışmalar

Pharmadict uygulaması, mevcut haliyle işlevsel ve kapsamlı bir çözüm sunmaktadır. Ancak gelecekte yapılabilecek geliştirmeler ile uygulama daha da zenginleştirilebilir.

**Kısa Vadeli Geliştirmeler (1-3 ay):**

1. **Terim Sayısının Artırılması:** Mevcut 850 terime ek olarak yeni terimler eklenebilir. Özellikle hastalıklar ve ilaçlar kategorilerinde genişleme yapılabilir.

2. **Sesli Telaffuz:** Terimlerin doğru telaffuzunu öğrenmek için ses dosyaları eklenebilir. Text-to-speech API'leri kullanılabilir.

3. **Görsel İçerik:** Anatomi ve bitki kategorilerinde görsel içerikler eklenebilir. Bu özellik öğrenmeyi kolaylaştıracaktır.

4. **Gelişmiş Quiz:** Daha fazla soru tipi (eşleştirme, boşluk doldurma) ve zorluk seviyeleri eklenebilir.

**Orta Vadeli Geliştirmeler (3-6 ay):**

1. **Bulut Senkronizasyonu:** Firebase veya benzeri bir backend ile kullanıcı verilerinin bulutta saklanması sağlanabilir. Bu sayede farklı cihazlar arasında senkronizasyon mümkün olacaktır.

2. **Kullanıcı Hesapları:** Kayıt ve giriş sistemi eklenerek kişiselleştirilmiş deneyim sunulabilir.

3. **Sosyal Özellikler:** Kullanıcıların notlarını paylaşabilmesi ve topluluk oluşturması sağlanabilir.

4. **Çoklu Dil Desteği:** İngilizce ve diğer dillerde arayüz desteği eklenebilir.

**Uzun Vadeli Geliştirmeler (6-12 ay):**

1. **Yapay Zeka Entegrasyonu:** AI destekli soru-cevap sistemi ile kullanıcılar tıbbi konularda sorular sorabilir.

2. **Spaced Repetition:** Bilimsel öğrenme tekniklerine dayalı tekrar sistemi eklenebilir.

3. **Gamification:** Rozet, seviye ve başarı sistemi ile kullanıcı motivasyonu artırılabilir.

4. **Offline-First Mimari:** Daha gelişmiş offline senkronizasyon mekanizmaları uygulanabilir.

---

## 5. KAYNAKLAR

1. React Native Documentation. (2024). _Getting Started with React Native_. https://reactnative.dev/docs/getting-started

2. Expo Documentation. (2024). _Expo SDK Documentation_. https://docs.expo.dev/

3. TypeScript Documentation. (2024). _TypeScript Handbook_. https://www.typescriptlang.org/docs/

4. React Documentation. (2024). _React Hooks_. https://react.dev/reference/react

5. React Navigation. (2024). _React Navigation Documentation_. https://reactnavigation.org/docs/getting-started

6. AsyncStorage. (2024). _React Native Async Storage_. https://react-native-async-storage.github.io/async-storage/

7. Expo Linear Gradient. (2024). _Expo Linear Gradient Documentation_. https://docs.expo.dev/versions/latest/sdk/linear-gradient/

8. Expo Blur. (2024). _Expo Blur Documentation_. https://docs.expo.dev/versions/latest/sdk/blur-view/

9. Google Fonts. (2024). _Inter Font Family_. https://fonts.google.com/specimen/Inter

10. Google Fonts. (2024). _Poppins Font Family_. https://fonts.google.com/specimen/Poppins

11. Ionicons. (2024). _Ionicons Icon Library_. https://ionic.io/ionicons

12. MDN Web Docs. (2024). _JavaScript Reference_. https://developer.mozilla.org/en-US/docs/Web/JavaScript

13. Node.js Documentation. (2024). _Node.js v18 Documentation_. https://nodejs.org/docs/latest-v18.x/api/

14. Yarn Package Manager. (2024). _Yarn Documentation_. https://yarnpkg.com/getting-started

15. Visual Studio Code. (2024). _VS Code Documentation_. https://code.visualstudio.com/docs

16. ESLint. (2024). _ESLint User Guide_. https://eslint.org/docs/user-guide/

17. Prettier. (2024). _Prettier Documentation_. https://prettier.io/docs/en/index.html

18. Git Documentation. (2024). _Git Reference Manual_. https://git-scm.com/docs

19. GitHub. (2024). _GitHub Docs_. https://docs.github.com/

20. Türk Eczacıları Birliği. (2024). _Eczacılık Terimleri Sözlüğü_. https://www.teb.org.tr/

21. Türk Dil Kurumu. (2024). _Güncel Türkçe Sözlük_. https://sozluk.gov.tr/

22. PubMed. (2024). _Medical Terminology Database_. https://pubmed.ncbi.nlm.nih.gov/

23. MedlinePlus. (2024). _Medical Encyclopedia_. https://medlineplus.gov/

24. DrugBank. (2024). _Drug Database_. https://go.drugbank.com/

25. World Health Organization. (2024). _International Classification of Diseases_. https://www.who.int/classifications/icd/

---

## 6. EKLER

### EK-1: Uygulama Ekran Görüntüleri

Bu bölümde uygulamanın çeşitli ekranlarından alınan görüntüler yer almaktadır.

[Ek Şekil 1. Açılış Ekranı - Koyu Tema]

[Ek Şekil 2. Açılış Ekranı - Açık Tema]

[Ek Şekil 3. Ana Sayfa - Koyu Tema]

[Ek Şekil 4. Ana Sayfa - Açık Tema]

[Ek Şekil 5. Arama Ekranı]

[Ek Şekil 6. Arama Sonuçları]

[Ek Şekil 7. Kategoriler Ekranı]

[Ek Şekil 8. Kategori Detay - İlaçlar]

[Ek Şekil 9. Kategori Detay - Bitkiler]

[Ek Şekil 10. Favoriler Ekranı]

[Ek Şekil 11. Terim Detay - Üst Kısım]

[Ek Şekil 12. Terim Detay - Alt Kısım]

[Ek Şekil 13. Not Ekleme Modalı]

[Ek Şekil 14. Quiz Bölümü]

---

### EK-2: Örnek Kod Parçaları

**EK-2.1: PharmacyContext Örneği**

```typescript
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { PharmacyTerm, TermCategory } from "../types";
import { PharmacyTermService } from "../services/PharmacyTermService";

interface PharmacyContextType {
  terms: PharmacyTerm[];
  isLoading: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  filteredTerms: PharmacyTerm[];
  toggleBookmark: (termId: string) => Promise<void>;
  getTermsByCategory: (category: TermCategory) => PharmacyTerm[];
  getBookmarkedTerms: () => PharmacyTerm[];
}

const PharmacyContext = createContext<PharmacyContextType | undefined>(
  undefined
);

export const PharmacyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [terms, setTerms] = useState<PharmacyTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadTerms();
  }, []);

  const loadTerms = async () => {
    setIsLoading(true);
    const loadedTerms = await PharmacyTermService.loadAllTerms();
    setTerms(loadedTerms);
    setIsLoading(false);
  };

  const toggleBookmark = useCallback(async (termId: string) => {
    await PharmacyTermService.toggleBookmark(termId);
    setTerms((prev) =>
      prev.map((term) =>
        term.id === termId
          ? { ...term, isBookmarked: !term.isBookmarked }
          : term
      )
    );
  }, []);

  // ... diğer fonksiyonlar

  return (
    <PharmacyContext.Provider
      value={{ terms, isLoading, searchText, setSearchText /* ... */ }}
    >
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error("usePharmacy must be used within PharmacyProvider");
  }
  return context;
};
```

---

**EK-2.2: TermCard Bileşeni Örneği**

```typescript
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { PharmacyTerm } from "../types";
import { useTheme } from "../context/ThemeContext";
import { getCategoryColors } from "../utils/categoryUtils";

interface TermCardProps {
  term: PharmacyTerm;
  onPress: () => void;
  variant?: "default" | "featured";
}

export const TermCard: React.FC<TermCardProps> = ({
  term,
  onPress,
  variant = "default",
}) => {
  const { colors } = useTheme();
  const categoryColors = getCategoryColors(term.category);

  if (variant === "featured") {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={categoryColors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredCard}
        >
          <Text style={styles.featuredTitle}>{term.latinName}</Text>
          <Text style={styles.featuredSubtitle}>{term.turkishName}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.surface }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {term.latinName}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {term.turkishName}
        </Text>
      </View>
      {term.isBookmarked && (
        <Ionicons name="heart" size={20} color={colors.primary} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  featuredCard: {
    padding: 20,
    borderRadius: 16,
    marginRight: 12,
    width: 160,
  },
  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  featuredSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginTop: 4,
  },
});
```

---

### EK-3: Terim Veri Örneği

```typescript
// Örnek terim verisi
const exampleTerm: PharmacyTerm = {
  id: "İlaçlar_aspirin",
  latinName: "Aspirin",
  turkishName: "Asetilsalisilik Asit",
  category: "İlaçlar",
  definition:
    "Aspirin, ağrı kesici, ateş düşürücü ve iltihap giderici özelliklere sahip bir ilaçtır. Ayrıca düşük dozlarda kan sulandırıcı olarak da kullanılmaktadır.",
  etymology:
    'Aspirin adı, Spiraea ulmaria (çayır kraliçesi) bitkisinden elde edilen salisilik asitten türetilmiştir. "A" ön eki asetil grubunu, "spir" kısmı bitkiyi temsil etmektedir.',
  usage:
    "Baş ağrısı, diş ağrısı, kas ağrıları, ateş, soğuk algınlığı belirtileri ve kalp hastalıklarının önlenmesinde kullanılır.",
  components: [
    "Asetilsalisilik asit",
    "Mısır nişastası",
    "Mikrokristal selüloz",
  ],
  sideEffects: [
    "Mide rahatsızlığı",
    "Bulantı",
    "Mide kanaması riski",
    "Alerjik reaksiyonlar",
  ],
  dosage:
    "Yetişkinler için genellikle 325-650 mg, günde 3-4 kez. Kalp koruma için günde 75-100 mg.",
  contraindications: [
    "Mide ülseri",
    "Kanama bozuklukları",
    "Aspirin alerjisi",
    "12 yaş altı çocuklar",
  ],
  interactions: ["Varfarin", "İbuprofen", "Metotreksat", "ACE inhibitörleri"],
  synonyms: ["ASA", "Asetilsalisilik asit", "Acetylsalicylic acid"],
  relatedTerms: ["İbuprofen", "Parasetamol", "Naproksen"],
  isBookmarked: false,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-12-01"),
};
```

---

### EK-4: Proje İstatistikleri

**Geliştirme Süreci:**

| Metrik                   | Değer |
| ------------------------ | ----- |
| Toplam geliştirme süresi | ~3 ay |
| Toplam kod satırı        | 5000+ |
| TypeScript dosya sayısı  | 25+   |
| React component sayısı   | 15+   |
| Servis sınıfı sayısı     | 4     |
| Toplam terim sayısı      | 850   |
| Kategori sayısı          | 8     |
| Quiz soru sayısı         | 24    |

**Dosya Boyutları:**

| Dosya/Klasör  | Boyut   |
| ------------- | ------- |
| src/          | ~500 KB |
| node_modules/ | ~200 MB |
| assets/       | ~5 MB   |
| Toplam proje  | ~210 MB |

---

### EK-5: Kurulum ve Çalıştırma Talimatları

**Gereksinimler:**

- Node.js 18 veya üzeri
- Yarn veya npm
- Expo CLI
- iOS Simulator (macOS) veya Android Emulator
- Expo Go uygulaması (fiziksel cihaz için)

**Kurulum Adımları:**

```bash
# 1. Projeyi klonlayın
git clone https://github.com/[kullanici]/pharmadict.git

# 2. Proje dizinine gidin
cd pharmadict

# 3. Bağımlılıkları yükleyin
yarn install

# 4. Uygulamayı başlatın
npx expo start

# 5. QR kodu Expo Go ile tarayın veya simulator'da açın
```

**Geliştirme Komutları:**

```bash
# iOS simulator'da çalıştır
npx expo start --ios

# Android emulator'da çalıştır
npx expo start --android

# Web'de çalıştır
npx expo start --web

# Cache temizleyerek başlat
npx expo start --clear
```

---

_Bu bitirme projesi, [Üniversite Adı] [Fakülte Adı] [Bölüm Adı] lisans programı kapsamında hazırlanmıştır._

_Aralık 2024_
