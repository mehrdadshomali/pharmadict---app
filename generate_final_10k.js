// Final 10K - Son terimler
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

// Programatik üretim - Anatomik yapı kombinasyonları
const generateAnatomicalStructures = () => {
  const structures = [
    ["Superior", "Süperior", "Üst"],
    ["Inferior", "İnferior", "Alt"],
    ["Anterior", "Anterior", "Ön"],
    ["Posterior", "Posterior", "Arka"],
    ["Medial", "Mediyal", "İç"],
    ["Lateral", "Lateral", "Dış"],
    ["Proximal", "Proksimal", "Yakın"],
    ["Distal", "Distal", "Uzak"],
    ["Superficial", "Yüzeyel", "Yüzeyde"],
    ["Deep", "Derin", "Derinlikte"],
  ];

  const bodyParts = [
    ["cervical region", "servikal bölge", "Boyun bölgesi"],
    ["thoracic region", "torasik bölge", "Göğüs bölgesi"],
    ["lumbar region", "lomber bölge", "Bel bölgesi"],
    ["sacral region", "sakral bölge", "Kuyruk bölgesi"],
    ["abdominal region", "abdominal bölge", "Karın bölgesi"],
    ["pelvic region", "pelvik bölge", "Pelvis bölgesi"],
    ["cranial region", "kraniyal bölge", "Kafa bölgesi"],
    ["facial region", "fasiyal bölge", "Yüz bölgesi"],
    ["orbital region", "orbital bölge", "Göz çukuru bölgesi"],
    ["nasal region", "nazal bölge", "Burun bölgesi"],
    ["oral region", "oral bölge", "Ağız bölgesi"],
    ["auricular region", "auriküler bölge", "Kulak bölgesi"],
    ["temporal region", "temporal bölge", "Şakak bölgesi"],
    ["occipital region", "oksipital bölge", "Ense bölgesi"],
    ["frontal region", "frontal bölge", "Alın bölgesi"],
    ["parietal region", "parietal bölge", "Tepe bölgesi"],
    ["axillary region", "aksiller bölge", "Koltuk altı bölgesi"],
    ["brachial region", "brakiyal bölge", "Kol bölgesi"],
    ["antebrachial region", "antebrakiyal bölge", "Önkol bölgesi"],
    ["carpal region", "karpal bölge", "El bileği bölgesi"],
    ["palmar region", "palmar bölge", "Avuç içi bölgesi"],
    ["dorsal hand region", "el sırtı bölgesi", "El sırtı bölgesi"],
    ["digital region", "dijital bölge", "Parmak bölgesi"],
    ["gluteal region", "gluteal bölge", "Kalça bölgesi"],
    ["femoral region", "femoral bölge", "Uyluk bölgesi"],
    ["patellar region", "patellar bölge", "Diz kapağı bölgesi"],
    ["popliteal region", "popliteal bölge", "Diz arkası bölgesi"],
    ["crural region", "krural bölge", "Baldır bölgesi"],
    ["tarsal region", "tarsal bölge", "Ayak bileği bölgesi"],
    ["plantar region", "plantar bölge", "Ayak tabanı bölgesi"],
  ];

  const terms = [];
  structures.forEach(([strEn, strTr, strDef]) => {
    bodyParts.forEach(([partEn, partTr, partDef]) => {
      terms.push(
        createTerm(
          `${strEn} ${partEn}`,
          `${strTr} ${partTr}`,
          TermCategory.ANATOMY,
          `${strDef} ${partDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Kas grupları
const generateMuscleGroups = () => {
  const muscles = [
    [
      "Flexor muscles of forearm",
      "Önkol Fleksör Kasları",
      "Önkol bükücü kaslar",
    ],
    [
      "Extensor muscles of forearm",
      "Önkol Ekstansör Kasları",
      "Önkol açıcı kaslar",
    ],
    ["Thenar muscles", "Tenar Kaslar", "Başparmak kasları"],
    ["Hypothenar muscles", "Hipotenar Kaslar", "Serçe parmak kasları"],
    [
      "Interosseous muscles of hand",
      "El İnterosseöz Kasları",
      "Parmak arası kaslar",
    ],
    ["Lumbrical muscles of hand", "El Lumbrikal Kasları", "Solucan kaslar"],
    ["Rotator cuff muscles", "Rotator Manşet Kasları", "Omuz döndürücü kaslar"],
    ["Erector spinae muscles", "Erektör Spina Kasları", "Omurga dikleştirici"],
    [
      "Transversospinalis muscles",
      "Transversospinalis Kasları",
      "Derin sırt kasları",
    ],
    ["Suboccipital muscles", "Suboksipital Kaslar", "Ense altı kasları"],
    ["Prevertebral muscles", "Prevertebral Kaslar", "Omurga önü kasları"],
    ["Scalene muscles", "Skalen Kaslar", "Boyun yan kasları"],
    ["Infrahyoid muscles", "İnfrahiyoid Kaslar", "Dil kemiği altı kasları"],
    ["Suprahyoid muscles", "Suprahiyoid Kaslar", "Dil kemiği üstü kasları"],
    ["Muscles of mastication", "Çiğneme Kasları", "Çene kasları"],
    ["Muscles of facial expression", "Mimik Kasları", "Yüz ifade kasları"],
    ["Extraocular muscles", "Ekstraoküler Kaslar", "Göz dışı kasları"],
    [
      "Intrinsic muscles of tongue",
      "Dilin İntrinsik Kasları",
      "Dil iç kasları",
    ],
    [
      "Extrinsic muscles of tongue",
      "Dilin Ekstrinsik Kasları",
      "Dil dış kasları",
    ],
    ["Muscles of soft palate", "Yumuşak Damak Kasları", "Damak kasları"],
    ["Pharyngeal muscles", "Farinks Kasları", "Yutak kasları"],
    ["Laryngeal muscles", "Larinks Kasları", "Gırtlak kasları"],
    ["Intercostal muscles", "İnterkostal Kaslar", "Kaburga arası kaslar"],
    ["Diaphragm", "Diyafram", "Karın-göğüs zarı"],
    ["Abdominal wall muscles", "Karın Duvarı Kasları", "Karın kasları"],
    ["Pelvic floor muscles", "Pelvik Taban Kasları", "Pelvis tabanı"],
    ["Perineal muscles", "Perine Kasları", "Perine kasları"],
    ["Hip flexor muscles", "Kalça Fleksör Kasları", "Kalça bükücü"],
    ["Hip extensor muscles", "Kalça Ekstansör Kasları", "Kalça açıcı"],
    ["Hip abductor muscles", "Kalça Abdüktör Kasları", "Kalça uzaklaştırıcı"],
    ["Hip adductor muscles", "Kalça Addüktör Kasları", "Kalça yaklaştırıcı"],
    ["Hip rotator muscles", "Kalça Rotatör Kasları", "Kalça döndürücü"],
    ["Knee flexor muscles", "Diz Fleksör Kasları", "Diz bükücü"],
    ["Knee extensor muscles", "Diz Ekstansör Kasları", "Diz açıcı"],
    [
      "Ankle dorsiflexor muscles",
      "Ayak Bileği Dorsifleksör Kasları",
      "Ayak kaldırıcı",
    ],
    [
      "Ankle plantarflexor muscles",
      "Ayak Bileği Plantarfleksör Kasları",
      "Ayak indirici",
    ],
    ["Foot invertor muscles", "Ayak İnvertör Kasları", "Ayak içe çevirici"],
    ["Foot evertor muscles", "Ayak Evertör Kasları", "Ayak dışa çevirici"],
    [
      "Intrinsic muscles of foot",
      "Ayağın İntrinsik Kasları",
      "Ayak iç kasları",
    ],
    ["Plantar muscles", "Plantar Kaslar", "Ayak tabanı kasları"],
  ];
  return muscles.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Damar yapıları
const generateVascularStructures = () => {
  const vessels = [
    ["Brachiocephalic trunk", "Brakiyosefalik Trunk", "Kol-baş ana damarı"],
    [
      "Left common carotid artery",
      "Sol Ana Karotis Arter",
      "Sol boyun ana damarı",
    ],
    [
      "Left subclavian artery",
      "Sol Subklaviyan Arter",
      "Sol köprücük altı damarı",
    ],
    ["Internal thoracic artery", "İnternal Torasik Arter", "İç göğüs damarı"],
    ["Thyrocervical trunk", "Tiroservikal Trunk", "Tiroid-boyun damarı"],
    ["Costocervical trunk", "Kostoservikal Trunk", "Kaburga-boyun damarı"],
    ["Vertebral artery", "Vertebral Arter", "Omurga damarı"],
    ["Anterior cerebral artery", "Anterior Serebral Arter", "Ön beyin damarı"],
    ["Middle cerebral artery", "Orta Serebral Arter", "Orta beyin damarı"],
    [
      "Posterior cerebral artery",
      "Posterior Serebral Arter",
      "Arka beyin damarı",
    ],
    [
      "Anterior communicating artery",
      "Anterior Komunikan Arter",
      "Ön bağlantı damarı",
    ],
    [
      "Posterior communicating artery",
      "Posterior Komunikan Arter",
      "Arka bağlantı damarı",
    ],
    ["Ophthalmic artery", "Oftalmik Arter", "Göz damarı"],
    ["Maxillary artery", "Maksiller Arter", "Üst çene damarı"],
    ["Facial artery", "Fasiyal Arter", "Yüz damarı"],
    ["Lingual artery", "Lingual Arter", "Dil damarı"],
    ["Superior thyroid artery", "Süperior Tiroid Arter", "Üst tiroid damarı"],
    ["Inferior thyroid artery", "İnferior Tiroid Arter", "Alt tiroid damarı"],
    ["Thoracic aorta branches", "Torasik Aort Dalları", "Göğüs aort dalları"],
    ["Bronchial arteries", "Bronşiyal Arterler", "Bronş damarları"],
    ["Esophageal arteries", "Özofageal Arterler", "Yemek borusu damarları"],
    [
      "Posterior intercostal arteries",
      "Posterior İnterkostal Arterler",
      "Arka kaburga arası damarlar",
    ],
    [
      "Superior phrenic arteries",
      "Süperior Frenik Arterler",
      "Üst diyafram damarları",
    ],
    [
      "Celiac trunk branches",
      "Çölyak Trunk Dalları",
      "Karın organları damarları",
    ],
    ["Left gastric artery", "Sol Gastrik Arter", "Sol mide damarı"],
    ["Splenic artery", "Splenik Arter", "Dalak damarı"],
    ["Common hepatic artery", "Ana Hepatik Arter", "Ana karaciğer damarı"],
    ["Proper hepatic artery", "Hepatik Arter Propria", "Öz karaciğer damarı"],
    [
      "Gastroduodenal artery",
      "Gastroduodenal Arter",
      "Mide-onikiparmak damarı",
    ],
    ["Right gastric artery", "Sağ Gastrik Arter", "Sağ mide damarı"],
    [
      "Superior mesenteric artery branches",
      "Süperior Mezenterik Arter Dalları",
      "Üst bağırsak damar dalları",
    ],
    [
      "Inferior pancreaticoduodenal artery",
      "İnferior Pankreatikoduodenal Arter",
      "Alt pankreas-onikiparmak damarı",
    ],
    ["Jejunal arteries", "Jejunal Arterler", "Boş bağırsak damarları"],
    ["Ileal arteries", "İleal Arterler", "Kıvrım bağırsak damarları"],
    ["Ileocolic artery", "İleokolik Arter", "İnce-kalın bağırsak damarı"],
    ["Right colic artery", "Sağ Kolik Arter", "Sağ kolon damarı"],
    ["Middle colic artery", "Orta Kolik Arter", "Orta kolon damarı"],
    [
      "Inferior mesenteric artery branches",
      "İnferior Mezenterik Arter Dalları",
      "Alt bağırsak damar dalları",
    ],
    ["Left colic artery", "Sol Kolik Arter", "Sol kolon damarı"],
    ["Sigmoid arteries", "Sigmoid Arterler", "Sigmoid kolon damarları"],
    ["Superior rectal artery", "Süperior Rektal Arter", "Üst rektum damarı"],
    ["Renal artery branches", "Renal Arter Dalları", "Böbrek damar dalları"],
    [
      "Segmental renal arteries",
      "Segmental Renal Arterler",
      "Böbrek segment damarları",
    ],
    ["Interlobar arteries", "İnterlober Arterler", "Lob arası damarlar"],
    ["Arcuate arteries", "Arkuat Arterler", "Yay damarları"],
    ["Interlobular arteries", "İnterlobüler Arterler", "Lobül arası damarlar"],
    ["Afferent arterioles", "Afferent Arteriyoller", "Getirici damarlar"],
    ["Efferent arterioles", "Efferent Arteriyoller", "Götürücü damarlar"],
    ["Gonadal arteries", "Gonadal Arterler", "Üreme bezi damarları"],
    ["Lumbar arteries", "Lomber Arterler", "Bel damarları"],
  ];
  return vessels.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Lenf sistemi
const generateLymphaticSystem = () => {
  const structures = [
    ["Cervical lymph nodes", "Servikal Lenf Nodları", "Boyun lenf bezleri"],
    [
      "Submandibular lymph nodes",
      "Submandibular Lenf Nodları",
      "Çene altı lenf bezleri",
    ],
    [
      "Submental lymph nodes",
      "Submental Lenf Nodları",
      "Çene ucu lenf bezleri",
    ],
    [
      "Preauricular lymph nodes",
      "Preauriküler Lenf Nodları",
      "Kulak önü lenf bezleri",
    ],
    [
      "Postauricular lymph nodes",
      "Postauriküler Lenf Nodları",
      "Kulak arkası lenf bezleri",
    ],
    ["Occipital lymph nodes", "Oksipital Lenf Nodları", "Ense lenf bezleri"],
    [
      "Supraclavicular lymph nodes",
      "Supraklaviküler Lenf Nodları",
      "Köprücük üstü lenf bezleri",
    ],
    [
      "Axillary lymph nodes",
      "Aksiller Lenf Nodları",
      "Koltuk altı lenf bezleri",
    ],
    ["Pectoral lymph nodes", "Pektoral Lenf Nodları", "Göğüs lenf bezleri"],
    [
      "Subscapular lymph nodes",
      "Subskapular Lenf Nodları",
      "Kürek altı lenf bezleri",
    ],
    [
      "Lateral axillary lymph nodes",
      "Lateral Aksiller Lenf Nodları",
      "Yan koltuk altı lenf bezleri",
    ],
    [
      "Central axillary lymph nodes",
      "Santral Aksiller Lenf Nodları",
      "Merkez koltuk altı lenf bezleri",
    ],
    [
      "Apical axillary lymph nodes",
      "Apikal Aksiller Lenf Nodları",
      "Tepe koltuk altı lenf bezleri",
    ],
    [
      "Mediastinal lymph nodes",
      "Mediastinal Lenf Nodları",
      "Göğüs ortası lenf bezleri",
    ],
    [
      "Paratracheal lymph nodes",
      "Paratrakeal Lenf Nodları",
      "Nefes borusu yanı lenf bezleri",
    ],
    [
      "Tracheobronchial lymph nodes",
      "Trakeobronşiyal Lenf Nodları",
      "Nefes borusu-bronş lenf bezleri",
    ],
    [
      "Bronchopulmonary lymph nodes",
      "Bronkopulmoner Lenf Nodları",
      "Bronş-akciğer lenf bezleri",
    ],
    ["Hilar lymph nodes", "Hiler Lenf Nodları", "Akciğer kapısı lenf bezleri"],
    [
      "Celiac lymph nodes",
      "Çölyak Lenf Nodları",
      "Karın organları lenf bezleri",
    ],
    ["Gastric lymph nodes", "Gastrik Lenf Nodları", "Mide lenf bezleri"],
    ["Hepatic lymph nodes", "Hepatik Lenf Nodları", "Karaciğer lenf bezleri"],
    [
      "Pancreatic lymph nodes",
      "Pankreatik Lenf Nodları",
      "Pankreas lenf bezleri",
    ],
    ["Splenic lymph nodes", "Splenik Lenf Nodları", "Dalak lenf bezleri"],
    [
      "Mesenteric lymph nodes",
      "Mezenterik Lenf Nodları",
      "Bağırsak lenf bezleri",
    ],
    [
      "Para-aortic lymph nodes",
      "Para-Aortik Lenf Nodları",
      "Aort yanı lenf bezleri",
    ],
    ["Iliac lymph nodes", "İliyak Lenf Nodları", "Kalça lenf bezleri"],
    ["Inguinal lymph nodes", "İnguinal Lenf Nodları", "Kasık lenf bezleri"],
    [
      "Superficial inguinal lymph nodes",
      "Yüzeyel İnguinal Lenf Nodları",
      "Yüzeyel kasık lenf bezleri",
    ],
    [
      "Deep inguinal lymph nodes",
      "Derin İnguinal Lenf Nodları",
      "Derin kasık lenf bezleri",
    ],
    [
      "Popliteal lymph nodes",
      "Popliteal Lenf Nodları",
      "Diz arkası lenf bezleri",
    ],
    ["Thoracic duct", "Torasik Kanal", "Göğüs lenf kanalı"],
    ["Right lymphatic duct", "Sağ Lenfatik Kanal", "Sağ lenf kanalı"],
    ["Cisterna chyli", "Sisterna Kili", "Şilus sarnıcı"],
    ["Thymus", "Timus", "Timus bezi"],
    ["Spleen", "Dalak", "Dalak"],
    ["Tonsils", "Tonsiller", "Bademcikler"],
    ["Palatine tonsils", "Palatin Tonsiller", "Damak bademcikleri"],
    ["Pharyngeal tonsil", "Faringeal Tonsil", "Geniz eti"],
    ["Lingual tonsil", "Lingual Tonsil", "Dil bademciği"],
    ["Tubal tonsil", "Tubal Tonsil", "Tüp bademciği"],
    ["Peyer patches", "Peyer Plakları", "Bağırsak lenf dokusu"],
    ["Appendix", "Apendiks", "Kör bağırsak uzantısı"],
    ["Bone marrow", "Kemik İliği", "Kan yapıcı doku"],
    ["Red bone marrow", "Kırmızı Kemik İliği", "Aktif kemik iliği"],
    ["Yellow bone marrow", "Sarı Kemik İliği", "Yağlı kemik iliği"],
    ["Lymphoid tissue", "Lenfoid Doku", "Lenf dokusu"],
    ["MALT", "MALT", "Mukoza ilişkili lenfoid doku"],
    ["GALT", "GALT", "Bağırsak ilişkili lenfoid doku"],
    ["BALT", "BALT", "Bronş ilişkili lenfoid doku"],
    ["NALT", "NALT", "Burun ilişkili lenfoid doku"],
  ];
  return structures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Sinir pleksusları ve ganglionlar
const generateNervousStructures = () => {
  const structures = [
    ["Cervical plexus", "Servikal Pleksus", "Boyun sinir ağı"],
    ["Brachial plexus", "Brakiyal Pleksus", "Kol sinir ağı"],
    ["Lumbar plexus", "Lomber Pleksus", "Bel sinir ağı"],
    ["Sacral plexus", "Sakral Pleksus", "Kuyruk sinir ağı"],
    ["Coccygeal plexus", "Koksigeal Pleksus", "Kuyruk kemiği sinir ağı"],
    ["Celiac plexus", "Çölyak Pleksus", "Karın sinir ağı"],
    [
      "Superior mesenteric plexus",
      "Süperior Mezenterik Pleksus",
      "Üst bağırsak sinir ağı",
    ],
    [
      "Inferior mesenteric plexus",
      "İnferior Mezenterik Pleksus",
      "Alt bağırsak sinir ağı",
    ],
    ["Hypogastric plexus", "Hipogastrik Pleksus", "Alt karın sinir ağı"],
    ["Cardiac plexus", "Kardiyak Pleksus", "Kalp sinir ağı"],
    ["Pulmonary plexus", "Pulmoner Pleksus", "Akciğer sinir ağı"],
    ["Esophageal plexus", "Özofageal Pleksus", "Yemek borusu sinir ağı"],
    ["Renal plexus", "Renal Pleksus", "Böbrek sinir ağı"],
    ["Prostatic plexus", "Prostatik Pleksus", "Prostat sinir ağı"],
    ["Uterovaginal plexus", "Uterovajinal Pleksus", "Rahim-vajina sinir ağı"],
    ["Vesical plexus", "Vezikal Pleksus", "Mesane sinir ağı"],
    ["Rectal plexus", "Rektal Pleksus", "Rektum sinir ağı"],
    ["Cervical ganglia", "Servikal Ganglionlar", "Boyun sinir düğümleri"],
    [
      "Superior cervical ganglion",
      "Süperior Servikal Ganglion",
      "Üst boyun sinir düğümü",
    ],
    [
      "Middle cervical ganglion",
      "Orta Servikal Ganglion",
      "Orta boyun sinir düğümü",
    ],
    [
      "Inferior cervical ganglion",
      "İnferior Servikal Ganglion",
      "Alt boyun sinir düğümü",
    ],
    ["Stellate ganglion", "Stellat Ganglion", "Yıldız sinir düğümü"],
    ["Thoracic ganglia", "Torasik Ganglionlar", "Göğüs sinir düğümleri"],
    ["Lumbar ganglia", "Lomber Ganglionlar", "Bel sinir düğümleri"],
    ["Sacral ganglia", "Sakral Ganglionlar", "Kuyruk sinir düğümleri"],
    ["Celiac ganglia", "Çölyak Ganglionlar", "Karın sinir düğümleri"],
    [
      "Superior mesenteric ganglion",
      "Süperior Mezenterik Ganglion",
      "Üst bağırsak sinir düğümü",
    ],
    [
      "Inferior mesenteric ganglion",
      "İnferior Mezenterik Ganglion",
      "Alt bağırsak sinir düğümü",
    ],
    [
      "Aorticorenal ganglia",
      "Aortikorenal Ganglionlar",
      "Aort-böbrek sinir düğümleri",
    ],
    ["Ciliary ganglion", "Siliyer Ganglion", "Kirpik sinir düğümü"],
    [
      "Pterygopalatine ganglion",
      "Pterigopalatin Ganglion",
      "Kanat-damak sinir düğümü",
    ],
    [
      "Submandibular ganglion",
      "Submandibular Ganglion",
      "Çene altı sinir düğümü",
    ],
    ["Otic ganglion", "Otik Ganglion", "Kulak sinir düğümü"],
    ["Trigeminal ganglion", "Trigeminal Ganglion", "Üçüz sinir düğümü"],
    ["Geniculate ganglion", "Genikulat Ganglion", "Diz sinir düğümü"],
    ["Spiral ganglion", "Spiral Ganglion", "Sarmal sinir düğümü"],
    ["Vestibular ganglion", "Vestibüler Ganglion", "Denge sinir düğümü"],
    [
      "Superior ganglion of vagus",
      "Vagusun Süperior Ganglionu",
      "Vagus üst sinir düğümü",
    ],
    [
      "Inferior ganglion of vagus",
      "Vagusun İnferior Ganglionu",
      "Vagus alt sinir düğümü",
    ],
    [
      "Dorsal root ganglia",
      "Dorsal Kök Ganglionları",
      "Arka kök sinir düğümleri",
    ],
    ["Sympathetic trunk", "Sempatik Trunk", "Sempatik zincir"],
    [
      "Parasympathetic ganglia",
      "Parasempatik Ganglionlar",
      "Parasempatik sinir düğümleri",
    ],
    [
      "Enteric nervous system",
      "Enterik Sinir Sistemi",
      "Bağırsak sinir sistemi",
    ],
    ["Myenteric plexus", "Miyenterik Pleksus", "Auerbach pleksusu"],
    ["Submucosal plexus", "Submukozal Pleksus", "Meissner pleksusu"],
    [
      "Autonomic nervous system",
      "Otonom Sinir Sistemi",
      "İstemsiz sinir sistemi",
    ],
    [
      "Sympathetic nervous system",
      "Sempatik Sinir Sistemi",
      "Savaş-kaç sistemi",
    ],
    [
      "Parasympathetic nervous system",
      "Parasempatik Sinir Sistemi",
      "Dinlen-sindir sistemi",
    ],
    [
      "Somatic nervous system",
      "Somatik Sinir Sistemi",
      "İstemli sinir sistemi",
    ],
    ["Central nervous system", "Merkezi Sinir Sistemi", "MSS"],
  ];
  return structures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Eklem yapıları
const generateJointStructures = () => {
  const joints = [
    ["Temporomandibular joint", "Temporomandibular Eklem", "Çene eklemi"],
    ["Atlantooccipital joint", "Atlantooksipital Eklem", "Kafa-atlas eklemi"],
    ["Atlantoaxial joint", "Atlantoaksiyal Eklem", "Atlas-aksis eklemi"],
    [
      "Intervertebral joints",
      "İntervertebral Eklemler",
      "Omurlar arası eklemler",
    ],
    ["Facet joints", "Faset Eklemler", "Zigapofizyal eklemler"],
    [
      "Costovertebral joints",
      "Kostovertebral Eklemler",
      "Kaburga-omur eklemleri",
    ],
    [
      "Costotransverse joints",
      "Kostotransvers Eklemler",
      "Kaburga-çıkıntı eklemleri",
    ],
    [
      "Sternoclavicular joint",
      "Sternoklaviküler Eklem",
      "Göğüs-köprücük eklemi",
    ],
    [
      "Acromioclavicular joint",
      "Akromiyoklaviküler Eklem",
      "Omuz-köprücük eklemi",
    ],
    ["Glenohumeral joint", "Glenohumeral Eklem", "Omuz eklemi"],
    ["Elbow joint", "Dirsek Eklemi", "Dirsek eklemi"],
    ["Humeroulnar joint", "Humeroulnar Eklem", "Kol-dirsek eklemi"],
    ["Humeroradial joint", "Humeroradyal Eklem", "Kol-döner eklemi"],
    [
      "Proximal radioulnar joint",
      "Proksimal Radyoulnar Eklem",
      "Üst döner-dirsek eklemi",
    ],
    [
      "Distal radioulnar joint",
      "Distal Radyoulnar Eklem",
      "Alt döner-dirsek eklemi",
    ],
    ["Wrist joint", "El Bileği Eklemi", "Radiokarpal eklem"],
    ["Midcarpal joint", "Midkarpal Eklem", "Orta el bileği eklemi"],
    [
      "Carpometacarpal joints",
      "Karpometakarpal Eklemler",
      "El bileği-tarak eklemleri",
    ],
    [
      "Metacarpophalangeal joints",
      "Metakarpofalangeal Eklemler",
      "Tarak-parmak eklemleri",
    ],
    [
      "Interphalangeal joints of hand",
      "El İnterfalangeal Eklemleri",
      "Parmak eklemleri",
    ],
    ["Sacroiliac joint", "Sakroiliyak Eklem", "Kuyruk-kalça eklemi"],
    ["Pubic symphysis", "Pubik Simfiz", "Çatı kemiği eklemi"],
    ["Hip joint", "Kalça Eklemi", "Koksa eklemi"],
    ["Knee joint", "Diz Eklemi", "Diz eklemi"],
    ["Tibiofemoral joint", "Tibiofemoral Eklem", "Kaval-uyluk eklemi"],
    ["Patellofemoral joint", "Patellofemoral Eklem", "Diz kapağı-uyluk eklemi"],
    [
      "Proximal tibiofibular joint",
      "Proksimal Tibiofibular Eklem",
      "Üst kaval-baldır eklemi",
    ],
    [
      "Distal tibiofibular joint",
      "Distal Tibiofibular Eklem",
      "Alt kaval-baldır eklemi",
    ],
    ["Ankle joint", "Ayak Bileği Eklemi", "Talocrural eklem"],
    ["Subtalar joint", "Subtalar Eklem", "Aşık altı eklemi"],
    ["Talonavicular joint", "Talonaviküler Eklem", "Aşık-kayık eklemi"],
    ["Calcaneocuboid joint", "Kalkaneoküboid Eklem", "Topuk-küp eklemi"],
    [
      "Tarsometatarsal joints",
      "Tarsometatarsal Eklemler",
      "Ayak bileği-tarak eklemleri",
    ],
    [
      "Metatarsophalangeal joints",
      "Metatarsofalangeal Eklemler",
      "Ayak tarak-parmak eklemleri",
    ],
    [
      "Interphalangeal joints of foot",
      "Ayak İnterfalangeal Eklemleri",
      "Ayak parmak eklemleri",
    ],
    ["Synovial membrane", "Sinoviyal Membran", "Eklem zarı"],
    ["Articular cartilage", "Artiküler Kıkırdak", "Eklem kıkırdağı"],
    ["Joint capsule", "Eklem Kapsülü", "Eklem zarı"],
    ["Ligament", "Ligament", "Bağ"],
    ["Meniscus", "Menisküs", "Eklem diski"],
    ["Bursa", "Bursa", "Eklem kesesi"],
    ["Tendon sheath", "Tendon Kılıfı", "Tendon zarı"],
    ["Labrum", "Labrum", "Eklem dudağı"],
    ["Synovial fluid", "Sinoviyal Sıvı", "Eklem sıvısı"],
    ["Fibrous joint", "Fibröz Eklem", "Lifli eklem"],
    ["Cartilaginous joint", "Kartilajinöz Eklem", "Kıkırdaklı eklem"],
    ["Synovial joint", "Sinoviyal Eklem", "Oynar eklem"],
    ["Ball and socket joint", "Top ve Yuva Eklemi", "Küresel eklem"],
    ["Hinge joint", "Menteşe Eklemi", "Tek eksenli eklem"],
    ["Pivot joint", "Pivot Eklem", "Döner eklem"],
  ];
  return joints.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Daha fazla bitkiler
const generateMorePlants = () => {
  const plants = [
    ["Aconitum napellus", "Kaplanboğan", "Zehirli bitki, homeopati"],
    ["Aesculus hippocastanum", "At Kestanesi", "Venöz yetmezlik"],
    ["Agrimonia eupatoria", "Koyun Otu", "Sindirim düzenleyici"],
    ["Ajuga reptans", "Sürüngen Mayasıl Otu", "Yara iyileştirici"],
    ["Alchemilla vulgaris", "Aslanpençesi", "Kadın hastalıkları"],
    ["Angelica archangelica", "Melek Otu", "Sindirim, solunum"],
    ["Arctium lappa", "Dulavrat Otu", "Deri hastalıkları"],
    ["Artemisia absinthium", "Pelin Otu", "Sindirim, parazit"],
    ["Artemisia annua", "Tatlı Pelin", "Sıtma tedavisi"],
    ["Astragalus membranaceus", "Astragalus", "Bağışıklık güçlendirici"],
    ["Avena sativa", "Yulaf", "Sinir sistemi, kolesterol"],
    ["Berberis vulgaris", "Kadın Tuzluğu", "Karaciğer, safra"],
    ["Betula pendula", "Huş Ağacı", "Diüretik, romatizma"],
    ["Borago officinalis", "Hodan", "GLA kaynağı, deri"],
    ["Bupleurum falcatum", "Tavşan Kulağı", "Karaciğer koruyucu"],
    ["Calendula officinalis", "Aynısefa", "Yara iyileştirici"],
    ["Capsicum annuum", "Acı Biber", "Ağrı kesici, dolaşım"],
    ["Carum carvi", "Kimyon", "Sindirim, gaz giderici"],
    ["Cassia angustifolia", "Sinameki", "Laksatif"],
    ["Chelidonium majus", "Kırlangıç Otu", "Karaciğer, safra"],
    ["Cichorium intybus", "Hindiba", "Karaciğer, sindirim"],
    ["Cinnamomum verum", "Tarçın", "Kan şekeri, antimikrobiyal"],
    ["Cnicus benedictus", "Şevketi Bostan", "Sindirim, iştah açıcı"],
    ["Colchicum autumnale", "Güz Çiğdemi", "Gut tedavisi"],
    ["Commiphora myrrha", "Mür", "Antiseptik, ağız sağlığı"],
    ["Convallaria majalis", "İnci Çiçeği", "Kalp glikozidi"],
    ["Coriandrum sativum", "Kişniş", "Sindirim, antioksidan"],
    ["Crocus sativus", "Safran", "Antidepresan, antioksidan"],
    ["Datura stramonium", "Boru Çiçeği", "Antikolinerjik, zehirli"],
    ["Digitalis lanata", "Yünlü Yüksük Otu", "Kalp glikozidi"],
    ["Dioscorea villosa", "Yabani Yam", "Hormonal denge"],
    ["Equisetum arvense", "At Kuyruğu", "Diüretik, silika kaynağı"],
    ["Eucalyptus globulus", "Okaliptüs", "Solunum, antiseptik"],
    ["Eupatorium perfoliatum", "Kemik Otu", "Grip, ateş düşürücü"],
    ["Euphrasia officinalis", "Göz Otu", "Göz sağlığı"],
    ["Filipendula ulmaria", "Çayır Kraliçesi", "Antiinflamatuvar"],
    ["Frangula alnus", "Barut Ağacı", "Laksatif"],
    ["Fucus vesiculosus", "Mesane Yosunu", "Tiroid, kilo kontrolü"],
    ["Galium aparine", "Yogurt Otu", "Lenfatik sistem"],
    ["Gentiana lutea", "Sarı Centiyan", "Sindirim, iştah açıcı"],
    ["Geranium maculatum", "Benekli Sardunya", "Astrenjan, ishal"],
    ["Glechoma hederacea", "Yer Sarmaşığı", "Solunum, sindirim"],
    ["Grindelia robusta", "Grindelia", "Astım, bronşit"],
    ["Gymnema sylvestre", "Gymnema", "Kan şekeri düzenleyici"],
    ["Hamamelis virginiana", "Cadı Fındığı", "Astrenjan, hemoroid"],
    ["Hedera helix", "Sarmaşık", "Öksürük, bronşit"],
    ["Helichrysum italicum", "Ölmez Çiçek", "Antiinflamatuvar, deri"],
    ["Hibiscus sabdariffa", "Hibiskus", "Tansiyon düşürücü"],
    ["Hyssopus officinalis", "Çördük Otu", "Solunum, sindirim"],
    ["Inula helenium", "Andız Otu", "Solunum, sindirim"],
  ];
  return plants.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.PLANT, def)
  );
};

// Daha fazla bitkiler 2
const generateMorePlants2 = () => {
  const plants = [
    ["Juniperus communis", "Ardıç", "Diüretik, sindirim"],
    ["Lamium album", "Beyaz Ballıbaba", "Kadın hastalıkları"],
    ["Leonurus cardiaca", "Aslan Kuyruğu", "Kalp, anksiyete"],
    ["Linum usitatissimum", "Keten", "Omega-3, sindirim"],
    ["Lobelia inflata", "Lobelia", "Solunum, sigara bırakma"],
    ["Lycopus virginicus", "Bugleweed", "Tiroid, kalp"],
    ["Mahonia aquifolium", "Oregon Üzümü", "Deri hastalıkları"],
    ["Marrubium vulgare", "Boz Ot", "Öksürük, sindirim"],
    ["Melilotus officinalis", "Sarı Taş Yoncası", "Venöz yetmezlik"],
    ["Menyanthes trifoliata", "Su Yoncası", "Sindirim, iştah açıcı"],
    ["Nepeta cataria", "Kedi Nanesi", "Sakinleştirici, sindirim"],
    ["Oenothera biennis", "Çuha Çiçeği", "GLA kaynağı, deri"],
    ["Olea europaea", "Zeytin", "Kardiyovasküler, antioksidan"],
    ["Opuntia ficus-indica", "Hint İnciri", "Kan şekeri, kolesterol"],
    ["Orthosiphon stamineus", "Java Çayı", "Diüretik, böbrek"],
    ["Paeonia lactiflora", "Şakayık", "Kadın hastalıkları, ağrı"],
    ["Panax notoginseng", "Notoginseng", "Kanama, dolaşım"],
    ["Pelargonium sidoides", "Umckaloabo", "Solunum enfeksiyonları"],
    ["Phytolacca americana", "Amerikan Şahtere", "Lenfatik, romatizma"],
    ["Pimpinella anisum", "Anason", "Sindirim, solunum"],
    ["Piper nigrum", "Karabiber", "Sindirim, biyoyararlanım"],
    ["Plantago lanceolata", "Dar Yapraklı Sinir Otu", "Öksürük, yara"],
    ["Podophyllum peltatum", "Mayapple", "Siğil tedavisi"],
    ["Polygala senega", "Senega", "Ekspektoran"],
    ["Polygonum multiflorum", "Fo-Ti", "Anti-aging, saç"],
    ["Populus tremula", "Titrek Kavak", "Antiinflamatuvar, ateş"],
    ["Potentilla erecta", "Beşparmak Otu", "Astrenjan, ishal"],
    ["Primula veris", "Çuha Çiçeği", "Solunum, öksürük"],
    ["Prunella vulgaris", "Gelincik Otu", "Antiviral, yara"],
    ["Prunus africana", "Afrika Eriği", "Prostat sağlığı"],
    ["Quercus robur", "Meşe", "Astrenjan, ishal"],
    ["Rhamnus purshiana", "Cascara", "Laksatif"],
    ["Rheum palmatum", "Çin Ravent", "Laksatif, sindirim"],
    ["Ribes nigrum", "Siyah Frenk Üzümü", "Antiinflamatuvar, alerji"],
    ["Rosa canina", "Kuşburnu", "C vitamini, bağışıklık"],
    ["Rubus idaeus", "Ahududu", "Kadın sağlığı, doğum"],
    ["Ruscus aculeatus", "Tavşan Memesi", "Venöz yetmezlik"],
    ["Ruta graveolens", "Sedef Otu", "Damar güçlendirici"],
    ["Sabal serrulata", "Testere Palmiyesi", "Prostat sağlığı"],
    ["Salvia miltiorrhiza", "Dan Shen", "Kardiyovasküler"],
    ["Sambucus nigra", "Mürver", "Bağışıklık, grip"],
    ["Sanguinaria canadensis", "Kan Kökü", "Solunum, deri"],
    ["Scutellaria baicalensis", "Çin Kaside", "Antiinflamatuvar, alerji"],
    ["Scutellaria lateriflora", "Kaside", "Anksiyete, sinir"],
    ["Senecio aureus", "Altın Ragwort", "Kadın hastalıkları"],
    ["Silybum marianum", "Deve Dikeni", "Karaciğer koruyucu"],
    ["Smilax officinalis", "Sarsaparilla", "Deri, detoks"],
    ["Solidago virgaurea", "Altın Başak", "Diüretik, böbrek"],
    ["Stachys officinalis", "Betony", "Baş ağrısı, sinir"],
    ["Stellaria media", "Kuş Otu", "Deri, kaşıntı"],
  ];
  return plants.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.PLANT, def)
  );
};

// Daha fazla bitkiler 3
const generateMorePlants3 = () => {
  const plants = [
    ["Symphytum officinale", "Karakafes Otu", "Yara, kemik iyileşmesi"],
    ["Syzygium aromaticum", "Karanfil", "Antiseptik, ağrı kesici"],
    ["Tabebuia impetiginosa", "Pau d'Arco", "Antifungal, bağışıklık"],
    ["Tanacetum parthenium", "Gümüş Düğme", "Migren önleyici"],
    ["Taraxacum officinale", "Karahindiba", "Karaciğer, diüretik"],
    ["Terminalia arjuna", "Arjuna", "Kalp sağlığı"],
    ["Thuja occidentalis", "Batı Mazısı", "Siğil, bağışıklık"],
    ["Thymus serpyllum", "Kekik", "Antiseptik, öksürük"],
    ["Tilia cordata", "Ihlamur", "Sakinleştirici, soğuk algınlığı"],
    ["Trigonella foenum-graecum", "Çemen Otu", "Kan şekeri, süt artırıcı"],
    ["Turnera diffusa", "Damiana", "Afrodizyak, enerji"],
    ["Tussilago farfara", "Öksürük Otu", "Öksürük, solunum"],
    ["Ulmus rubra", "Kaygan Karaağaç", "Sindirim, boğaz"],
    ["Uncaria tomentosa", "Kedi Pençesi", "Bağışıklık, antiinflamatuvar"],
    ["Urtica dioica", "Isırgan Otu", "Alerji, prostat"],
    ["Usnea barbata", "Sakal Likeni", "Antibiyotik, solunum"],
    ["Vaccinium macrocarpon", "Kızılcık", "İdrar yolu enfeksiyonu"],
    ["Vaccinium myrtillus", "Yaban Mersini", "Göz sağlığı, antioksidan"],
    ["Valeriana officinalis", "Kediotu", "Uyku, anksiyete"],
    ["Verbascum thapsus", "Sığır Kuyruğu", "Solunum, kulak"],
    ["Verbena officinalis", "Mine Çiçeği", "Sinir, sindirim"],
    ["Viburnum opulus", "Gilaburu", "Kas gevşetici, kadın sağlığı"],
    ["Viburnum prunifolium", "Siyah Haw", "Kadın sağlığı, kramp"],
    ["Vinca minor", "Küçük Cezayir Menekşesi", "Beyin dolaşımı"],
    ["Viola tricolor", "Hercai Menekşe", "Deri hastalıkları"],
    ["Viscum album", "Ökse Otu", "Tansiyon, kanser"],
    ["Vitex agnus-castus", "Hayıt", "Hormonal denge, PMS"],
    ["Vitis vinifera", "Üzüm", "Antioksidan, dolaşım"],
    ["Withania somnifera", "Ashwagandha", "Adaptojenik, stres"],
    ["Zanthoxylum americanum", "Dikenli Kül", "Dolaşım, sindirim"],
    ["Zingiber officinale", "Zencefil", "Bulantı, antiinflamatuvar"],
    ["Ziziphus jujuba", "Hünnap", "Uyku, anksiyete"],
    ["Achillea millefolium", "Civanperçemi", "Yara, sindirim"],
    ["Agaricus blazei", "Brezilya Mantarı", "Bağışıklık, kanser"],
    ["Agave americana", "Amerikan Agavesi", "Yara, antiseptik"],
    ["Albizia julibrissin", "İpek Ağacı", "Anksiyete, uyku"],
    ["Allium cepa", "Soğan", "Antimikrobiyal, kardiyovasküler"],
    ["Allium ursinum", "Ayı Sarımsağı", "Kardiyovasküler, detoks"],
    ["Alpinia galanga", "Galangal", "Sindirim, antiinflamatuvar"],
    ["Althaea officinalis", "Hatmi", "Yumuşatıcı, öksürük"],
    ["Andrographis paniculata", "Andrographis", "Bağışıklık, soğuk algınlığı"],
    ["Anethum graveolens", "Dereotu", "Sindirim, gaz giderici"],
    ["Apium graveolens", "Kereviz", "Diüretik, tansiyon"],
    ["Aralia racemosa", "Amerikan Sarmaşığı", "Solunum, adaptojenik"],
    ["Arctostaphylos uva-ursi", "Ayı Üzümü", "İdrar yolu enfeksiyonu"],
    ["Armoracia rusticana", "Yaban Turpu", "Sindirim, solunum"],
    ["Arnica montana", "Arnika", "Çürük, şişlik"],
    ["Asparagus racemosus", "Shatavari", "Kadın sağlığı, adaptojenik"],
    ["Atractylodes macrocephala", "Bai Zhu", "Sindirim, bağışıklık"],
    ["Azadirachta indica", "Neem", "Antimikrobiyal, deri"],
  ];
  return plants.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.PLANT, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Final 10K Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(60));

  console.log("📝 Terimler oluşturuluyor...");

  const anatomicalStructures = generateAnatomicalStructures();
  const muscleGroups = generateMuscleGroups();
  const vascularStructures = generateVascularStructures();
  const lymphaticSystem = generateLymphaticSystem();
  const nervousStructures = generateNervousStructures();
  const jointStructures = generateJointStructures();
  const morePlants = generateMorePlants();
  const morePlants2 = generateMorePlants2();
  const morePlants3 = generateMorePlants3();

  const allTerms = [
    ...anatomicalStructures,
    ...muscleGroups,
    ...vascularStructures,
    ...lymphaticSystem,
    ...nervousStructures,
    ...jointStructures,
    ...morePlants,
    ...morePlants2,
    ...morePlants3,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Anatomik Yapılar: ${anatomicalStructures.length}`);
  console.log(`   Kas Grupları: ${muscleGroups.length}`);
  console.log(`   Damar Yapıları: ${vascularStructures.length}`);
  console.log(`   Lenf Sistemi: ${lymphaticSystem.length}`);
  console.log(`   Sinir Yapıları: ${nervousStructures.length}`);
  console.log(`   Eklem Yapıları: ${jointStructures.length}`);
  console.log(`   Bitkiler 1: ${morePlants.length}`);
  console.log(`   Bitkiler 2: ${morePlants2.length}`);
  console.log(`   Bitkiler 3: ${morePlants3.length}`);
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
