// Final 109 - Son terimler - 10,000 hedefi
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  writeBatch,
  doc,
} = require("firebase/firestore");

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

const TermCategory = {
  DRUG: "İlaçlar",
  PLANT: "Bitkiler",
  VITAMIN: "Vitaminler",
  MINERAL: "Mineraller",
  DISEASE: "Hastalıklar",
  INSECT: "Böcekler",
  COMPONENT: "Bileşenler",
  ANATOMY: "Anatomi",
};

const createTerm = (latin, turkish, category, def) => ({
  latinName: latin,
  turkishName: turkish,
  category,
  definition: def,
  components: [],
  relatedTerms: [],
  etymology: "",
  usage: "",
  sideEffects: [],
  dosage: "",
  contraindications: [],
  interactions: [],
  synonyms: [],
});

// Pediatrik hastalıklar
const generatePediatricDiseases = () => {
  const diseases = [
    ["Neonatal jaundice", "Yenidoğan Sarılığı", "Bebek sarılığı"],
    ["Neonatal sepsis", "Yenidoğan Sepsisi", "Bebek enfeksiyonu"],
    [
      "Respiratory distress syndrome",
      "Solunum Sıkıntısı Sendromu",
      "Prematüre akciğer",
    ],
    [
      "Bronchopulmonary dysplasia",
      "Bronkopulmoner Displazi",
      "Kronik akciğer hastalığı",
    ],
    ["Necrotizing enterocolitis", "Nekrotizan Enterokolit", "Bağırsak nekrozu"],
    [
      "Retinopathy of prematurity",
      "Prematüre Retinopatisi",
      "Prematüre göz hastalığı",
    ],
    [
      "Intraventricular hemorrhage",
      "İntraventriküler Kanama",
      "Beyin kanaması",
    ],
    ["Patent ductus arteriosus", "Patent Duktus Arteriozus", "Açık duktus"],
    [
      "Meconium aspiration syndrome",
      "Mekonyum Aspirasyon Sendromu",
      "Mekonyum aspirasyonu",
    ],
    [
      "Transient tachypnea of newborn",
      "Yenidoğanın Geçici Takipnesi",
      "Geçici hızlı solunum",
    ],
    ["Croup", "Krup", "Laringotrakeobronşit"],
    ["Bronchiolitis", "Bronşiyolit", "Küçük bronş iltihabı"],
    [
      "Kawasaki disease",
      "Kawasaki Hastalığı",
      "Mukokutanöz lenf nodu sendromu",
    ],
    ["Henoch-Schonlein purpura", "Henoch-Schönlein Purpurası", "IgA vasküliti"],
    ["Intussusception", "İntusepsiyon", "Bağırsak içine girme"],
    ["Pyloric stenosis", "Pilor Stenozu", "Mide çıkış darlığı"],
    ["Hirschsprung disease", "Hirschsprung Hastalığı", "Aganglionik megakolon"],
    ["Wilms tumor", "Wilms Tümörü", "Nefroblastom"],
    ["Neuroblastoma", "Nöroblastom", "Sinir doku tümörü"],
    ["Retinoblastoma", "Retinoblastom", "Göz tümörü"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Jinekolojik hastalıklar
const generateGynecologicalDiseases = () => {
  const diseases = [
    ["Endometriosis", "Endometriozis", "Rahim dışı endometrium"],
    ["Adenomyosis", "Adenomiyozis", "Rahim kası endometriozu"],
    ["Uterine fibroids", "Uterin Fibroid", "Rahim miyomu"],
    ["Ovarian cyst", "Over Kisti", "Yumurtalık kisti"],
    ["Polycystic ovary syndrome", "Polikistik Over Sendromu", "PKOS"],
    ["Pelvic inflammatory disease", "Pelvik İnflamatuvar Hastalık", "PİH"],
    ["Ectopic pregnancy", "Ektopik Gebelik", "Dış gebelik"],
    ["Molar pregnancy", "Mol Gebelik", "Üzüm gebeliği"],
    ["Placenta previa", "Plasenta Previa", "Ön yerleşimli plasenta"],
    ["Placental abruption", "Plasenta Dekolmanı", "Plasenta ayrılması"],
    ["Preeclampsia", "Preeklampsi", "Gebelik zehirlenmesi"],
    ["Eclampsia", "Eklampsi", "Gebelik nöbeti"],
    ["HELLP syndrome", "HELLP Sendromu", "Gebelik komplikasyonu"],
    ["Gestational diabetes", "Gestasyonel Diyabet", "Gebelik şekeri"],
    [
      "Hyperemesis gravidarum",
      "Hiperemezis Gravidarum",
      "Şiddetli gebelik bulantısı",
    ],
    ["Cervical dysplasia", "Servikal Displazi", "Rahim ağzı hücre değişimi"],
    ["Cervical cancer", "Serviks Kanseri", "Rahim ağzı kanseri"],
    ["Endometrial cancer", "Endometrium Kanseri", "Rahim kanseri"],
    ["Ovarian cancer", "Over Kanseri", "Yumurtalık kanseri"],
    ["Vulvar cancer", "Vulva Kanseri", "Dış genital kanser"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Ürolojik hastalıklar
const generateUrologicalDiseases = () => {
  const diseases = [
    [
      "Benign prostatic hyperplasia",
      "Benign Prostat Hiperplazisi",
      "İyi huylu prostat büyümesi",
    ],
    ["Prostate cancer", "Prostat Kanseri", "Prostat kanseri"],
    ["Prostatitis", "Prostatit", "Prostat iltihabı"],
    ["Erectile dysfunction", "Erektil Disfonksiyon", "Sertleşme bozukluğu"],
    ["Premature ejaculation", "Erken Boşalma", "Prematür ejakülasyon"],
    ["Male infertility", "Erkek İnfertilitesi", "Erkek kısırlığı"],
    ["Varicocele", "Varikosel", "Testis damar genişlemesi"],
    ["Hydrocele", "Hidrosel", "Testis sıvı birikimi"],
    ["Testicular torsion", "Testis Torsiyonu", "Testis dönmesi"],
    ["Testicular cancer", "Testis Kanseri", "Testis kanseri"],
    ["Epididymitis", "Epididimit", "Epididim iltihabı"],
    ["Orchitis", "Orşit", "Testis iltihabı"],
    ["Urethral stricture", "Üretra Darlığı", "İdrar yolu darlığı"],
    ["Urinary incontinence", "Üriner İnkontinans", "İdrar kaçırma"],
    ["Stress incontinence", "Stres İnkontinans", "Efor idrar kaçırma"],
    ["Urge incontinence", "Urge İnkontinans", "Sıkışma idrar kaçırma"],
    ["Overactive bladder", "Aşırı Aktif Mesane", "Mesane aşırı aktivitesi"],
    ["Neurogenic bladder", "Nörojenik Mesane", "Sinir kaynaklı mesane"],
    ["Bladder cancer", "Mesane Kanseri", "İdrar kesesi kanseri"],
    ["Penile cancer", "Penis Kanseri", "Penis kanseri"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Psikiyatrik hastalıklar
const generatePsychiatricDiseases = () => {
  const diseases = [
    [
      "Major depressive disorder",
      "Majör Depresif Bozukluk",
      "Klinik depresyon",
    ],
    ["Bipolar disorder", "Bipolar Bozukluk", "İki uçlu bozukluk"],
    [
      "Generalized anxiety disorder",
      "Yaygın Anksiyete Bozukluğu",
      "Genel kaygı",
    ],
    ["Panic disorder", "Panik Bozukluk", "Panik atak hastalığı"],
    ["Social anxiety disorder", "Sosyal Anksiyete Bozukluğu", "Sosyal fobi"],
    ["Obsessive-compulsive disorder", "Obsesif Kompulsif Bozukluk", "OKB"],
    [
      "Post-traumatic stress disorder",
      "Travma Sonrası Stres Bozukluğu",
      "TSSB",
    ],
    ["Schizophrenia", "Şizofreni", "Psikotik bozukluk"],
    ["Schizoaffective disorder", "Şizoaffektif Bozukluk", "Karma psikoz"],
    ["Delusional disorder", "Sanrısal Bozukluk", "Hezeyan bozukluğu"],
    [
      "Borderline personality disorder",
      "Borderline Kişilik Bozukluğu",
      "Sınır kişilik",
    ],
    [
      "Antisocial personality disorder",
      "Antisosyal Kişilik Bozukluğu",
      "Sosyopati",
    ],
    [
      "Narcissistic personality disorder",
      "Narsisistik Kişilik Bozukluğu",
      "Narsisizm",
    ],
    [
      "Attention deficit hyperactivity disorder",
      "Dikkat Eksikliği Hiperaktivite Bozukluğu",
      "DEHB",
    ],
    ["Autism spectrum disorder", "Otizm Spektrum Bozukluğu", "Otizm"],
    ["Anorexia nervosa", "Anoreksiya Nervoza", "Yeme bozukluğu"],
    ["Bulimia nervosa", "Bulimiya Nervoza", "Yeme bozukluğu"],
    ["Binge eating disorder", "Tıkınırcasına Yeme Bozukluğu", "Aşırı yeme"],
    ["Insomnia disorder", "İnsomni Bozukluğu", "Uykusuzluk"],
    ["Substance use disorder", "Madde Kullanım Bozukluğu", "Bağımlılık"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 FINAL 109 - 10,000 HEDEFİNE ULAŞMA");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const pediatricDiseases = generatePediatricDiseases();
  const gynecologicalDiseases = generateGynecologicalDiseases();
  const urologicalDiseases = generateUrologicalDiseases();
  const psychiatricDiseases = generatePsychiatricDiseases();

  const allTerms = [
    ...pediatricDiseases,
    ...gynecologicalDiseases,
    ...urologicalDiseases,
    ...psychiatricDiseases,
  ];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(`   Pediatrik: ${pediatricDiseases.length}`);
  console.log(`   Jinekolojik: ${gynecologicalDiseases.length}`);
  console.log(`   Ürolojik: ${urologicalDiseases.length}`);
  console.log(`   Psikiyatrik: ${psychiatricDiseases.length}`);
  console.log(`   ─────────────────────────────`);
  console.log(`   TOPLAM: ${allTerms.length} terim\n`);

  console.log("🔍 Mevcut terimler kontrol ediliyor...");
  const termsRef = collection(db, "terms");
  const existingSnapshot = await getDocs(termsRef);
  const existingTerms = new Set();

  existingSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.latinName) existingTerms.add(data.latinName.toLowerCase());
    if (data.turkishName) existingTerms.add(data.turkishName.toLowerCase());
  });

  console.log(`   Mevcut terim sayısı: ${existingSnapshot.size}`);

  const newTerms = allTerms.filter((term) => {
    const latinLower = term.latinName?.toLowerCase();
    const turkishLower = term.turkishName?.toLowerCase();
    return !existingTerms.has(latinLower) && !existingTerms.has(turkishLower);
  });

  console.log(`   Yeni eklenecek terim sayısı: ${newTerms.length}\n`);

  if (newTerms.length === 0) {
    console.log("✅ Tüm terimler zaten mevcut.");
    process.exit(0);
  }

  const BATCH_SIZE = 400;
  let uploadedCount = 0;
  let batchNumber = 1;

  console.log("📤 Firebase'e yükleme başlıyor...\n");

  for (let i = 0; i < newTerms.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    const batchTerms = newTerms.slice(i, i + BATCH_SIZE);

    for (const term of batchTerms) {
      const docRef = doc(collection(db, "terms"));
      batch.set(docRef, {
        ...term,
        createdAt: new Date(),
        updatedAt: new Date(),
        isBookmarked: false,
      });
    }

    try {
      await batch.commit();
      uploadedCount += batchTerms.length;
      console.log(
        `   ✅ Batch ${batchNumber}: ${batchTerms.length} terim yüklendi (Toplam: ${uploadedCount}/${newTerms.length})`
      );
      batchNumber++;
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`   ❌ Batch ${batchNumber} hatası:`, error.message);
    }
  }

  console.log("\n" + "═".repeat(60));
  console.log("📊 YÜKLEME TAMAMLANDI");
  console.log("═".repeat(60));
  console.log(`   Önceki terim sayısı: ${existingSnapshot.size}`);
  console.log(`   Yeni eklenen: ${uploadedCount}`);
  console.log(
    `   Toplam terim sayısı: ${existingSnapshot.size + uploadedCount}`
  );
  console.log("═".repeat(60) + "\n");

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Hata:", error);
  process.exit(1);
});
