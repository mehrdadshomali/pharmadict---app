# PHARMADICT: MOBİL TIBBİ TERİMLER SÖZLÜĞÜ UYGULAMASI

## 1. GİRİŞ

### 1.1 Projenin Amacı

Pharmadict, eczacılık ve sağlık alanında eğitim gören öğrenciler ile sağlık profesyonellerinin tıbbi terimlere hızlı ve kolay erişimini sağlamak amacıyla geliştirilmiş bir mobil uygulamadır. Uygulama, ilaçlar, tıbbi bitkiler, vitaminler, mineraller, hastalıklar, böcekler, farmakolojik bileşenler ve anatomi terimlerini kapsayan geniş bir veritabanı sunmaktadır.

### 1.2 Projenin Kapsamı

Uygulama, 850'den fazla tıbbi terimi sekiz farklı kategoride sunmaktadır. Her terim için Latince ve Türkçe isim, tanım, etimoloji, kullanım alanı, yan etkiler, dozaj bilgisi, kontrendikasyonlar ve ilaç etkileşimleri gibi detaylı bilgiler yer almaktadır. Kullanıcılar terimleri arayabilir, favorilere ekleyebilir ve kişisel notlar alabilmektedir.

### 1.3 Hedef Kitle

Uygulamanın birincil hedef kitlesi eczacılık fakültesi öğrencileridir. Bunun yanı sıra tıp öğrencileri, hemşirelik öğrencileri, eczacılar ve diğer sağlık profesyonelleri de uygulamadan faydalanabilmektedir.

## 2. TEKNOLOJİK ALTYAPI

### 2.1 Geliştirme Platformu

Pharmadict, React Native framework'ü kullanılarak geliştirilmiştir. React Native, Facebook tarafından geliştirilen açık kaynaklı bir mobil uygulama geliştirme framework'üdür. Bu teknoloji sayesinde tek bir kod tabanı ile hem iOS hem de Android platformlarında çalışabilen uygulamalar geliştirmek mümkündür.

Proje, Expo platformu üzerinde inşa edilmiştir. Expo, React Native geliştirme sürecini kolaylaştıran ve hızlandıran bir araç setidir. Kamera, konum servisleri, bildirimler gibi native özelliklere kolay erişim sağlamakta ve uygulama derleme süreçlerini basitleştirmektedir.

### 2.2 Programlama Dili

Uygulama TypeScript programlama dili ile yazılmıştır. TypeScript, JavaScript'in tip güvenli bir üst kümesidir. Statik tip kontrolü sayesinde geliştirme aşamasında hataların erken tespit edilmesini sağlamakta ve kod kalitesini artırmaktadır.

### 2.3 Veri Yönetimi

Uygulama verileri yerel olarak cihazda depolanmaktadır. AsyncStorage kütüphanesi kullanılarak kullanıcı tercihleri, favoriler ve kişisel notlar cihazın yerel hafızasında saklanmaktadır. Bu yaklaşım, uygulamanın internet bağlantısı olmadan da çalışabilmesini sağlamaktadır.

Terim verileri statik dosyalar halinde uygulama içinde tutulmaktadır. Her kategori için ayrı veri dosyaları oluşturulmuş ve bu dosyalar uygulama başlatıldığında belleğe yüklenmektedir.

### 2.4 Kullanıcı Arayüzü

Kullanıcı arayüzü modern tasarım prensiplerine uygun olarak geliştirilmiştir. Uygulama koyu ve açık tema seçenekleri sunmaktadır. Gradient arka planlar, blur efektleri ve animasyonlar ile görsel olarak çekici bir deneyim sağlanmaktadır.

Navigasyon yapısı olarak alt tab bar ve stack navigasyon kombinasyonu kullanılmıştır. Ana sayfa, arama, kategoriler ve favoriler olmak üzere dört ana sekme bulunmaktadır. Terim detay sayfaları stack navigasyon ile açılmaktadır.

## 3. UYGULAMA ÖZELLİKLERİ

### 3.1 Ana Sayfa

Ana sayfa, uygulamanın giriş noktasıdır. Kullanıcıyı animasyonlu bir açılış ekranı karşılamaktadır. Ana sayfada hızlı arama çubuğu, kategori kaydırıcısı, en çok ziyaret edilen terimler ve son eklenen terimler yer almaktadır. Ayrıca kullanıcıların bilgilerini test edebilecekleri bir mini quiz bölümü bulunmaktadır.

### 3.2 Arama Özelliği

Arama özelliği gerçek zamanlı olarak çalışmaktadır. Kullanıcı yazmaya başladığında sonuçlar anında listelenmektedir. Arama, terim adı, Türkçe karşılık, tanım ve eş anlamlılar üzerinden yapılmaktadır. Arama geçmişi kaydedilmekte ve popüler aramalar gösterilmektedir.

### 3.3 Kategori Sistemi

Terimler sekiz ana kategoride sınıflandırılmıştır: İlaçlar, Bitkiler, Vitaminler, Mineraller, Hastalıklar, Böcekler, Bileşenler ve Anatomi. Her kategori kendine özgü renk ve ikon ile temsil edilmektedir. Kullanıcılar kategorilere göre terimleri filtreleyebilmektedir.

### 3.4 Terim Detay Sayfası

Terim detay sayfası, seçilen terim hakkında kapsamlı bilgi sunmaktadır. Sayfada terimin Latince ve Türkçe adı, kategorisi, tanımı, etimolojisi, kullanım alanı, bileşenleri, yan etkileri, dozaj bilgisi, kontrendikasyonları ve ilaç etkileşimleri yer almaktadır. Kullanıcılar terimi favorilere ekleyebilir, paylaşabilir ve kişisel not alabilmektedir.

### 3.5 Favori Sistemi

Kullanıcılar beğendikleri terimleri favorilere ekleyebilmektedir. Favori terimler ayrı bir sekmede listelenmekte ve hızlı erişim sağlanmaktadır. Favori durumu cihazda kalıcı olarak saklanmaktadır.

### 3.6 Kişisel Not Özelliği

Her terim için kullanıcılar kişisel not ekleyebilmektedir. Bu özellik özellikle sınav hazırlığı yapan öğrenciler için faydalıdır. Notlar cihazda güvenli bir şekilde saklanmakta ve terim detay sayfasında görüntülenmektedir.

### 3.7 Tema Desteği

Uygulama koyu ve açık tema seçenekleri sunmaktadır. Kullanıcı tercihi kaydedilmekte ve uygulama yeniden açıldığında aynı tema ile başlamaktadır. Koyu tema göz yorgunluğunu azaltmakta ve pil tasarrufu sağlamaktadır.

### 3.8 Quiz Özelliği

Ana sayfada yer alan mini quiz bölümü, kullanıcıların tıbbi bilgilerini test etmelerini sağlamaktadır. 24 soruluk bir havuzdan rastgele sorular seçilmekte ve kullanıcının doğru cevap sayısı takip edilmektedir.

## 4. VERİ YAPISI

### 4.1 Terim Modeli

Her terim belirli bir veri yapısına sahiptir. Terim modeli şu alanları içermektedir: benzersiz kimlik, Latince isim, Türkçe isim, kategori, tanım, bileşenler, ilgili terimler, etimoloji, kullanım alanı, yan etkiler, dozaj, kontrendikasyonlar, ilaç etkileşimleri ve eş anlamlılar.

### 4.2 Veri Kaynakları

Uygulama verileri kapsamlı bir araştırma sonucunda derlenmiştir. Her kategori için 100 ile 150 arasında terim bulunmaktadır. Veriler güvenilir tıbbi kaynaklardan alınmış ve Türkçe karşılıkları eklenmiştir.

### 4.3 Veri Depolama

Kullanıcıya özgü veriler AsyncStorage kullanılarak cihazda saklanmaktadır. Favoriler, kişisel notlar, tema tercihi ve arama geçmişi bu şekilde depolanmaktadır. Bu veriler uygulama kapatılsa bile korunmaktadır.

## 5. MİMARİ YAPI

### 5.1 Katmanlı Mimari

Uygulama katmanlı bir mimari yapıya sahiptir. Sunum katmanı kullanıcı arayüzü bileşenlerini, iş mantığı katmanı servis sınıflarını, veri katmanı ise veri dosyalarını ve depolama işlemlerini içermektedir.

### 5.2 Context API

React Context API kullanılarak global durum yönetimi sağlanmıştır. PharmacyContext terim verilerini ve ilgili işlemleri, ThemeContext ise tema ayarlarını yönetmektedir. Bu yapı sayesinde veriler tüm bileşenler arasında kolayca paylaşılabilmektedir.

### 5.3 Servis Katmanı

İş mantığı servis sınıflarında kapsüllenmiştir. PharmacyTermService terim işlemlerini, NotesService not işlemlerini yönetmektedir. Bu ayrım kodun bakımını ve test edilebilirliğini kolaylaştırmaktadır.

## 6. SONUÇ

Pharmadict, tıbbi terminoloji öğrenimini kolaylaştırmak amacıyla geliştirilmiş kapsamlı bir mobil uygulamadır. Modern teknolojiler kullanılarak geliştirilen uygulama, kullanıcı dostu arayüzü ve zengin içeriği ile hedef kitlesine değerli bir kaynak sunmaktadır.

Uygulama, cross-platform yapısı sayesinde geniş bir kullanıcı kitlesine ulaşabilmektedir. Offline çalışabilme özelliği, internet erişiminin olmadığı durumlarda bile kullanılabilirliği sağlamaktadır. Kişiselleştirme özellikleri ise kullanıcı deneyimini zenginleştirmektedir.

Gelecekte uygulamaya sesli arama, telaffuz özelliği, çoklu dil desteği ve bulut senkronizasyonu gibi özellikler eklenmesi planlanmaktadır.

---

Tarih: 30 Aralık 2024
