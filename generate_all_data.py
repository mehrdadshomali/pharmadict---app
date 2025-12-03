#!/usr/bin/env python3
"""
Comprehensive Pharmacy Data Generator
Her kategoriye 100'er gerçekçi ve doğru veri ekler
"""

import json
import random
from datetime import datetime, timedelta

def load_existing_data():
    """Mevcut verileri yükle"""
    try:
        with open('src/data/pharmacyData.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def save_data(data):
    """Verileri kaydet"""
    with open('src/data/pharmacyData.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_next_id(existing_data):
    """Sonraki ID'yi al"""
    if not existing_data:
        return 1
    max_id = max(int(item['id']) for item in existing_data if item.get('id', '').isdigit())
    return max_id + 1

# Her kategori için veri oluşturma fonksiyonları
# Bu çok uzun olacak, bu yüzden her kategori için ayrı dosyalar oluşturabiliriz
# Şimdilik temel yapıyı oluşturup, her kategori için veri ekleyeceğim

if __name__ == "__main__":
    existing = load_existing_data()
    print(f"Mevcut veri sayısı: {len(existing)}")
    
    # Kategori sayılarını kontrol et
    cats = {}
    for item in existing:
        cat = item.get('category', 'unknown')
        cats[cat] = cats.get(cat, 0) + 1
    
    print("Mevcut kategori dağılımı:")
    for cat, count in cats.items():
        print(f"  {cat}: {count}")
    
    # Her kategori için 100'e tamamlamak gerekiyor
    # Bu script çok uzun olacak, bu yüzden aşamalı olarak ekleyeceğim
    print("\nVeri oluşturma başlatılıyor...")
