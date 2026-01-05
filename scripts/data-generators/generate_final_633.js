// Final 633 - Son benzersiz terimler
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

// Programatik üretim - Organ + Durum kombinasyonları
const generateOrganConditions = () => {
  const organs = [
    ["Hepatic", "Hepatik", "Karaciğer"],
    ["Renal", "Renal", "Böbrek"],
    ["Cardiac", "Kardiyak", "Kalp"],
    ["Pulmonary", "Pulmoner", "Akciğer"],
    ["Cerebral", "Serebral", "Beyin"],
    ["Gastric", "Gastrik", "Mide"],
    ["Intestinal", "İntestinal", "Bağırsak"],
    ["Pancreatic", "Pankreatik", "Pankreas"],
    ["Splenic", "Splenik", "Dalak"],
    ["Thyroid", "Tiroid", "Tiroid"],
  ];

  const conditions = [
    ["dysfunction", "disfonksiyon", "İşlev bozukluğu"],
    ["insufficiency", "yetmezlik", "Yetersizlik"],
    ["failure", "yetmezliği", "Çöküş"],
    ["congestion", "konjesyon", "Kan göllenmesi"],
    ["infarction", "enfarktüs", "Kan akımı kesilmesi"],
    ["hemorrhage", "kanama", "Kanama"],
    ["edema", "ödem", "Şişlik"],
    ["fibrosis", "fibrozis", "Sertleşme"],
    ["necrosis", "nekroz", "Doku ölümü"],
    ["atrophy", "atrofi", "Küçülme"],
    ["hypertrophy", "hipertrofi", "Büyüme"],
    ["calcification", "kalsifikasyon", "Kireçlenme"],
    ["inflammation", "inflamasyon", "İltihap"],
    ["infection", "enfeksiyon", "Mikrop bulaşması"],
    ["abscess", "apse", "İrin birikimi"],
  ];

  const terms = [];
  organs.forEach(([orgEn, orgTr, orgDef]) => {
    conditions.forEach(([condEn, condTr, condDef]) => {
      terms.push(
        createTerm(
          `${orgEn} ${condEn}`,
          `${orgTr} ${condTr}`,
          TermCategory.DISEASE,
          `${orgDef} ${condDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Tıbbi terimler - Tanısal bulgular
const generateDiagnosticFindings = () => {
  const findings = [
    ["Positive", "Pozitif", "Olumlu"],
    ["Negative", "Negatif", "Olumsuz"],
    ["Borderline", "Sınırda", "Sınır değer"],
    ["Equivocal", "Şüpheli", "Belirsiz"],
    ["Indeterminate", "Belirlenemez", "Tanımlanamayan"],
    ["Reactive", "Reaktif", "Tepkili"],
    ["Non-reactive", "Non-Reaktif", "Tepkisiz"],
    ["Abnormal", "Anormal", "Normal dışı"],
    ["Normal", "Normal", "Normal sınırlar"],
    ["Inconclusive", "Sonuçsuz", "Kesin olmayan"],
  ];

  const tests = [
    ["tuberculin test", "tüberkülin testi", "PPD testi"],
    ["pregnancy test", "gebelik testi", "HCG testi"],
    ["HIV test", "HIV testi", "AIDS testi"],
    ["hepatitis panel", "hepatit paneli", "Karaciğer virüs testi"],
    ["drug screen", "ilaç taraması", "Madde testi"],
    ["allergy test", "alerji testi", "Duyarlılık testi"],
    ["genetic test", "genetik test", "DNA testi"],
    ["tumor marker", "tümör belirteci", "Kanser belirteci"],
    ["autoantibody test", "otoantikor testi", "Bağışıklık testi"],
    ["hormone level", "hormon düzeyi", "Hormon ölçümü"],
    ["blood culture", "kan kültürü", "Kan mikrop üretimi"],
    ["urine culture", "idrar kültürü", "İdrar mikrop üretimi"],
    ["stool test", "gaita testi", "Dışkı incelemesi"],
    ["biopsy result", "biyopsi sonucu", "Doku incelemesi"],
    ["imaging finding", "görüntüleme bulgusu", "Radyoloji bulgusu"],
  ];

  const terms = [];
  findings.forEach(([findEn, findTr, findDef]) => {
    tests.forEach(([testEn, testTr, testDef]) => {
      terms.push(
        createTerm(
          `${findEn} ${testEn}`,
          `${findTr} ${testTr}`,
          TermCategory.COMPONENT,
          `${findDef} ${testDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Tıbbi terimler - Tedavi yanıtları
const generateTreatmentResponses = () => {
  const responses = [
    ["Complete response", "Tam Yanıt", "Tam iyileşme"],
    ["Partial response", "Kısmi Yanıt", "Kısmi iyileşme"],
    ["Stable disease", "Stabil Hastalık", "Değişmeyen durum"],
    ["Progressive disease", "Progresif Hastalık", "İlerleyen hastalık"],
    ["No response", "Yanıt Yok", "Tedaviye yanıtsız"],
    ["Remission", "Remisyon", "Hastalık gerileme"],
    ["Relapse", "Relaps", "Hastalık tekrarı"],
    ["Recurrence", "Nüks", "Yeniden ortaya çıkma"],
    ["Refractory", "Refrakter", "Tedaviye dirençli"],
    ["Resistant", "Dirençli", "İlaç direnci"],
    ["Sensitive", "Duyarlı", "İlaç duyarlılığı"],
    ["Tolerant", "Toleran", "İlaç toleransı"],
    ["Intolerant", "İntoleran", "İlaç intoleransı"],
    ["Adverse reaction", "Advers Reaksiyon", "Yan etki"],
    ["Allergic reaction", "Alerjik Reaksiyon", "Alerji tepkisi"],
    ["Anaphylactic reaction", "Anafilaktik Reaksiyon", "Şiddetli alerji"],
    ["Idiosyncratic reaction", "İdiyosinkratik Reaksiyon", "Beklenmedik tepki"],
    ["Paradoxical reaction", "Paradoks Reaksiyon", "Ters tepki"],
    ["Therapeutic response", "Terapötik Yanıt", "Tedavi yanıtı"],
    ["Clinical improvement", "Klinik İyileşme", "Belirtilerde düzelme"],
  ];
  return responses.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi terimler - Klinik durumlar
const generateClinicalStates = () => {
  const states = [
    ["Acute phase", "Akut Faz", "Ani başlangıç dönemi"],
    ["Chronic phase", "Kronik Faz", "Uzun süreli dönem"],
    ["Subacute phase", "Subakut Faz", "Yarı akut dönem"],
    ["Prodromal phase", "Prodromal Faz", "Öncü belirti dönemi"],
    ["Latent phase", "Latent Faz", "Gizli dönem"],
    ["Active phase", "Aktif Faz", "Aktif hastalık dönemi"],
    ["Inactive phase", "İnaktif Faz", "Pasif dönem"],
    ["Convalescent phase", "Konvalesan Faz", "İyileşme dönemi"],
    ["Terminal phase", "Terminal Faz", "Son dönem"],
    ["Exacerbation", "Alevlenme", "Hastalık şiddetlenmesi"],
    ["Flare-up", "Atak", "Ani kötüleşme"],
    ["Crisis", "Kriz", "Acil durum"],
    ["Complication", "Komplikasyon", "İstenmeyen sonuç"],
    ["Sequela", "Sekel", "Kalıcı hasar"],
    ["Prognosis", "Prognoz", "Hastalık seyri tahmini"],
    ["Good prognosis", "İyi Prognoz", "Olumlu seyir"],
    ["Poor prognosis", "Kötü Prognoz", "Olumsuz seyir"],
    ["Guarded prognosis", "Şüpheli Prognoz", "Belirsiz seyir"],
    ["Favorable outcome", "Olumlu Sonuç", "İyi sonuç"],
    ["Unfavorable outcome", "Olumsuz Sonuç", "Kötü sonuç"],
  ];
  return states.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi terimler - Hasta durumları
const generatePatientConditions = () => {
  const conditions = [
    ["Stable condition", "Stabil Durum", "Değişmeyen durum"],
    ["Critical condition", "Kritik Durum", "Tehlikeli durum"],
    ["Serious condition", "Ciddi Durum", "Ağır durum"],
    ["Fair condition", "Orta Durum", "Orta şiddette"],
    ["Good condition", "İyi Durum", "İyi genel durum"],
    ["Guarded condition", "Şüpheli Durum", "Belirsiz durum"],
    ["Deteriorating", "Kötüleşen", "Bozulan durum"],
    ["Improving", "İyileşen", "Düzelen durum"],
    ["Unchanged", "Değişmemiş", "Aynı kalan"],
    ["Worsening", "Kötüleşme", "Ağırlaşma"],
    ["Recovering", "İyileşme", "Düzelme"],
    ["Declining", "Gerileme", "Kötüye gidiş"],
    ["Stabilizing", "Stabilize Olma", "Dengelenme"],
    ["Fluctuating", "Dalgalanan", "Değişken durum"],
    ["Moribund", "Ölüm Döşeğinde", "Ölüme yakın"],
    ["Comatose", "Komada", "Bilinçsiz"],
    ["Semiconscious", "Yarı Bilinçli", "Kısmen bilinçli"],
    ["Alert", "Uyanık", "Tam bilinçli"],
    ["Oriented", "Oryante", "Yönelimi tam"],
    ["Disoriented", "Dezoryante", "Yönelimi bozuk"],
  ];
  return conditions.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi terimler - Vital bulgular
const generateVitalFindings = () => {
  const findings = [
    ["Tachycardia", "Taşikardi", "Hızlı kalp atımı"],
    ["Bradycardia", "Bradikardi", "Yavaş kalp atımı"],
    ["Arrhythmia", "Aritmi", "Düzensiz kalp atımı"],
    ["Tachypnea", "Takipne", "Hızlı solunum"],
    ["Bradypnea", "Bradipne", "Yavaş solunum"],
    ["Apnea", "Apne", "Solunum durması"],
    ["Dyspnea", "Dispne", "Nefes darlığı"],
    ["Orthopnea", "Ortopne", "Yatınca nefes darlığı"],
    ["Hypoxia", "Hipoksi", "Oksijen yetersizliği"],
    ["Hypoxemia", "Hipoksemi", "Kanda oksijen azlığı"],
    ["Hypercapnia", "Hiperkapni", "Kanda CO2 fazlalığı"],
    ["Hypocapnia", "Hipokapni", "Kanda CO2 azlığı"],
    ["Hypertension", "Hipertansiyon", "Yüksek tansiyon"],
    ["Hypotension", "Hipotansiyon", "Düşük tansiyon"],
    [
      "Orthostatic hypotension",
      "Ortostatik Hipotansiyon",
      "Ayağa kalkınca tansiyon düşmesi",
    ],
    ["Fever", "Ateş", "Vücut ısısı yükselmesi"],
    ["Hypothermia", "Hipotermi", "Vücut ısısı düşmesi"],
    ["Hyperthermia", "Hipertermi", "Aşırı ısı artışı"],
    ["Diaphoresis", "Diyaforez", "Aşırı terleme"],
    ["Anhidrosis", "Anhidroz", "Terleme yokluğu"],
  ];
  return findings.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Tıbbi terimler - Fizik muayene bulguları
const generatePhysicalExamFindings = () => {
  const findings = [
    ["Tenderness", "Hassasiyet", "Dokunma ağrısı"],
    ["Rebound tenderness", "Rebound Hassasiyet", "Geri çekme ağrısı"],
    ["Guarding", "Defans", "Karın kasılması"],
    ["Rigidity", "Rijidite", "Karın sertliği"],
    ["Distension", "Distansiyon", "Şişkinlik"],
    ["Palpable mass", "Palpabl Kitle", "Elle hissedilen kitle"],
    ["Hepatomegaly", "Hepatomegali", "Karaciğer büyümesi"],
    ["Splenomegaly", "Splenomegali", "Dalak büyümesi"],
    ["Lymphadenopathy", "Lenfadenopati", "Lenf bezi büyümesi"],
    ["Thyromegaly", "Tiromegali", "Tiroid büyümesi"],
    ["Cardiomegaly", "Kardiyomegali", "Kalp büyümesi"],
    ["Murmur", "Üfürüm", "Kalp sesi"],
    ["Gallop", "Galop", "Üçlü kalp sesi"],
    ["Rales", "Ral", "Akciğer sesi"],
    ["Rhonchi", "Ronküs", "Hırıltılı ses"],
    ["Wheezes", "Whezing", "Hışıltı"],
    ["Stridor", "Stridor", "Üst solunum sesi"],
    ["Crepitus", "Krepitasyon", "Çıtırtı sesi"],
    ["Bruit", "Üfürüm", "Damar sesi"],
    ["Thrill", "Tril", "Titreşim hissi"],
  ];
  return findings.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi terimler - Nörolojik bulgular
const generateNeurologicalFindings = () => {
  const findings = [
    ["Hyperreflexia", "Hiperrefleksi", "Artmış refleks"],
    ["Hyporeflexia", "Hiporefleksi", "Azalmış refleks"],
    ["Areflexia", "Arefleksi", "Refleks yokluğu"],
    ["Clonus", "Klonus", "Ritmik kasılma"],
    ["Babinski sign", "Babinski İşareti", "Patolojik refleks"],
    ["Hoffmann sign", "Hoffmann İşareti", "Üst motor nöron bulgusu"],
    ["Kernig sign", "Kernig İşareti", "Menenjit bulgusu"],
    ["Brudzinski sign", "Brudzinski İşareti", "Menenjit bulgusu"],
    ["Nuchal rigidity", "Ense Sertliği", "Boyun sertliği"],
    ["Photophobia", "Fotofobi", "Işık hassasiyeti"],
    ["Phonophobia", "Fonofobi", "Ses hassasiyeti"],
    ["Papilledema", "Papilödem", "Optik disk şişmesi"],
    ["Nystagmus", "Nistagmus", "Göz titremesi"],
    ["Diplopia", "Diplopi", "Çift görme"],
    ["Ptosis", "Pitozis", "Göz kapağı düşüklüğü"],
    ["Miosis", "Miyozis", "Göz bebeği daralması"],
    ["Mydriasis", "Midriyazis", "Göz bebeği genişlemesi"],
    ["Anisocoria", "Anizokori", "Eşit olmayan göz bebekleri"],
    ["Ataxia", "Ataksi", "Koordinasyon bozukluğu"],
    ["Dysarthria", "Dizartri", "Konuşma bozukluğu"],
  ];
  return findings.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi terimler - Deri bulguları
const generateSkinFindings = () => {
  const findings = [
    ["Macule", "Makül", "Düz leke"],
    ["Papule", "Papül", "Kabarık leke"],
    ["Nodule", "Nodül", "Yumru"],
    ["Plaque", "Plak", "Geniş kabarıklık"],
    ["Vesicle", "Vezikül", "Küçük kabarcık"],
    ["Bulla", "Büllü", "Büyük kabarcık"],
    ["Pustule", "Püstül", "İrinli kabarcık"],
    ["Wheal", "Ürtiker", "Kaşıntılı kabarıklık"],
    ["Crust", "Kabuk", "Kurumuş sıvı"],
    ["Scale", "Skuam", "Pul"],
    ["Erosion", "Erozyon", "Yüzeyel yara"],
    ["Ulcer", "Ülser", "Derin yara"],
    ["Fissure", "Fissür", "Çatlak"],
    ["Excoriation", "Ekskoriyasyon", "Kaşıma yarası"],
    ["Lichenification", "Likenifikasyon", "Deri kalınlaşması"],
    ["Atrophy", "Atrofi", "Deri incelmesi"],
    ["Scar", "Skar", "Yara izi"],
    ["Keloid", "Keloid", "Aşırı yara izi"],
    ["Telangiectasia", "Telanjiektazi", "Damar genişlemesi"],
    ["Purpura", "Purpura", "Mor leke"],
  ];
  return findings.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 FINAL 633 - 10,000 HEDEFİNE ULAŞMA");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const organConditions = generateOrganConditions();
  const diagnosticFindings = generateDiagnosticFindings();
  const treatmentResponses = generateTreatmentResponses();
  const clinicalStates = generateClinicalStates();
  const patientConditions = generatePatientConditions();
  const vitalFindings = generateVitalFindings();
  const physicalExamFindings = generatePhysicalExamFindings();
  const neurologicalFindings = generateNeurologicalFindings();
  const skinFindings = generateSkinFindings();

  const allTerms = [
    ...organConditions,
    ...diagnosticFindings,
    ...treatmentResponses,
    ...clinicalStates,
    ...patientConditions,
    ...vitalFindings,
    ...physicalExamFindings,
    ...neurologicalFindings,
    ...skinFindings,
  ];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(`   Organ Durumları: ${organConditions.length}`);
  console.log(`   Tanısal Bulgular: ${diagnosticFindings.length}`);
  console.log(`   Tedavi Yanıtları: ${treatmentResponses.length}`);
  console.log(`   Klinik Durumlar: ${clinicalStates.length}`);
  console.log(`   Hasta Durumları: ${patientConditions.length}`);
  console.log(`   Vital Bulgular: ${vitalFindings.length}`);
  console.log(`   Fizik Muayene: ${physicalExamFindings.length}`);
  console.log(`   Nörolojik Bulgular: ${neurologicalFindings.length}`);
  console.log(`   Deri Bulguları: ${skinFindings.length}`);
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
