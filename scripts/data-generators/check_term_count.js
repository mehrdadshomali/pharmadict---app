// Firebase terim sayısı kontrolü
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCETgJvY3XPdHF0gVQhdsEVd9UIEwYyWbw",
  authDomain: "pharmadict-66629.firebaseapp.com",
  projectId: "pharmadict-66629",
  storageBucket: "pharmadict-66629.firebasestorage.app",
  messagingSenderId: "55210435202",
  appId: "1:55210435202:web:cffc317dfdd7dbbcac8a9b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkTermCount() {
  console.log("\n" + "═".repeat(50));
  console.log("📊 PHARMADICT VERİTABANI DURUMU");
  console.log("═".repeat(50) + "\n");

  const termsRef = collection(db, "terms");
  const snapshot = await getDocs(termsRef);

  // Kategori sayımı
  const categories = {};
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const cat = data.category || "Bilinmeyen";
    categories[cat] = (categories[cat] || 0) + 1;
  });

  console.log("📁 Kategori Dağılımı:");
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} terim`);
    });

  console.log("\n" + "─".repeat(50));
  console.log(`\n🎯 TOPLAM TERİM SAYISI: ${snapshot.size}\n`);
  console.log("═".repeat(50) + "\n");

  process.exit(0);
}

checkTermCount().catch((error) => {
  console.error("❌ Hata:", error);
  process.exit(1);
});
