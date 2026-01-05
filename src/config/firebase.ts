/**
 * ============================================================================
 * FIREBASE YAPILANDIRMASI
 * ============================================================================
 * 
 * Bu dosya Firebase bağlantı ayarlarını içerir.
 * Firebase, Google'ın sunduğu Backend-as-a-Service (BaaS) platformudur.
 * 
 * KULLANILAN FIREBASE SERVİSLERİ:
 * 1. Firestore: NoSQL veritabanı (terimler burada saklanır)
 * 2. Authentication: Kullanıcı kimlik doğrulama (gelecekte kullanılabilir)
 * 
 * YAPILANDIRMA DEĞERLERİ:
 * - apiKey: Firebase API anahtarı
 * - authDomain: Kimlik doğrulama domain'i
 * - projectId: Proje benzersiz ID'si
 * - storageBucket: Dosya depolama adresi
 * - messagingSenderId: Push bildirim ID'si
 * - appId: Uygulama ID'si
 * - measurementId: Analytics ID'si
 * 
 * NOT: Bu değerler Firebase Console'dan alınır.
 * ============================================================================
 */

import { initializeApp } from "firebase/app";        // Firebase uygulamasını başlat
import { getFirestore } from "firebase/firestore";   // Firestore veritabanı
import { getAuth } from "firebase/auth";             // Kimlik doğrulama

// Firebase yapılandırma objesi
const firebaseConfig = {
  apiKey: "AIzaSyCETgJvY3XPdHF0gVQhdsEVd9UIEwYyWbw",
  authDomain: "pharmadict-66629.firebaseapp.com",
  projectId: "pharmadict-66629",
  storageBucket: "pharmadict-66629.firebasestorage.app",
  messagingSenderId: "55210435202",
  appId: "1:55210435202:web:cffc317dfdd7dbbcac8a9b",
  measurementId: "G-DMDN57XW5C",
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firestore veritabanı instance'ı - Tüm veri işlemleri bu üzerinden yapılır
export const db = getFirestore(app);

// Auth instance'ı - Gelecekte kullanıcı girişi için
export const auth = getAuth(app);

export default app;
