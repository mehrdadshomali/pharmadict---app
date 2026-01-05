# Logo Ekleme Talimatları

## Logo Dosyasını Ekleme

1. Logo dosyanızı (PNG formatında, şeffaf arka plan önerilir) `src/assets/` klasörüne ekleyin
   - Örnek: `src/assets/logo.png`

2. `src/pages/HomeView.tsx` dosyasında, 59. satırdaki emoji yerine Image component'ini kullanın:

```tsx
// Şu satırı:
<Text style={styles.logoEmoji}>💊</Text>

// Şununla değiştirin:
<Image source={require('../assets/logo.png')} style={styles.logoImage} />
```

## Logo Özellikleri

- **Format**: PNG (şeffaf arka plan önerilir)
- **Boyut**: 56x56 piksel veya daha yüksek çözünürlük (otomatik ölçeklenecek)
- **Konum**: `src/assets/logo.png`

## Alternatif: Online Logo

Eğer logo bir URL'de ise:

```tsx
<Image 
  source={{ uri: 'https://example.com/logo.png' }} 
  style={styles.logoImage} 
/>
```

## Not

Logo container'ı mavi arka planlıdır. Eğer logonuz zaten arka plan içeriyorsa, `logoContainer` stilindeki `backgroundColor: '#3b82f6'` satırını kaldırabilir veya `transparent` yapabilirsiniz.

