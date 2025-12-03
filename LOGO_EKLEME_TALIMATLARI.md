# Logo Ekleme Talimatları

## Adım 1: Logo Dosyanızı Hazırlayın

1. Logo dosyanızı hazırlayın:
   - **Format**: PNG (önerilir) veya JPG
   - **Boyut**: 200x200 piksel veya daha yüksek çözünürlük (otomatik ölçeklenecek)
   - **Arka plan**: Şeffaf arka plan önerilir (PNG ile)

## Adım 2: Logo Dosyasını Projeye Ekleyin

1. Logo dosyanızı `src/assets/` klasörüne kopyalayın
2. Dosya adını `logo.png` olarak kaydedin
   - Örnek: `src/assets/logo.png`

## Adım 3: Uygulamayı Yenileyin

Logo dosyasını ekledikten sonra:
- Expo Go'da uygulamayı yenileyin (shake yapıp "Reload" seçin)
- Veya terminalde `r` tuşuna basın

## Logo Görünümü

- Logo, mavi arka planlı container içinde gösterilecek
- Boyut: 50x50 piksel
- Yuvarlatılmış köşeler (14px border radius)

## Logo Arka Planını Kaldırma

Eğer logonuz zaten arka plan içeriyorsa ve mavi arka planı kaldırmak istiyorsanız:

`src/pages/HomeView.tsx` dosyasında `logoContainer` stilini bulun ve:

```tsx
backgroundColor: '#3b82f6',  // Bu satırı kaldırın veya
backgroundColor: 'transparent',  // Şununla değiştirin
```

## Alternatif: Farklı Dosya Adı Kullanma

Eğer logo dosyanızın adı farklıysa (örneğin `mylogo.png`):

`src/pages/HomeView.tsx` dosyasında 60. satırı bulun ve:

```tsx
require('../assets/logo.png')
```

kısmını:

```tsx
require('../assets/mylogo.png')
```

olarak değiştirin.

## Not

- Logo dosyası yoksa, varsayılan olarak 💊 emoji'si gösterilecektir
- Logo dosyası eklendiğinde otomatik olarak görünecektir

