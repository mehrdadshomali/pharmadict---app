// Daha fazla terim eklemek için ek script
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

// Ek İlaçlar - Dermatoloji, Oftalmoloji, Onkoloji
const generateDermatologyDrugs = () => {
  const drugs = [];
  const data = [
    {
      latin: "Tretinoin",
      turkish: "Tretinoin",
      def: "Retinoid, akne ve anti-aging",
    },
    { latin: "Adapalene", turkish: "Adapalen", def: "Retinoid, akne tedavisi" },
    {
      latin: "Tazarotene",
      turkish: "Tazaroten",
      def: "Retinoid, psoriazis ve akne",
    },
    {
      latin: "Isotretinoin",
      turkish: "İzotretinoin",
      def: "Oral retinoid, şiddetli akne",
    },
    {
      latin: "Benzoyl peroxide",
      turkish: "Benzoil Peroksit",
      def: "Akne tedavisi, antibakteriyel",
    },
    {
      latin: "Salicylic acid",
      turkish: "Salisilik Asit",
      def: "Keratolotik, akne ve siğil",
    },
    {
      latin: "Azelaic acid",
      turkish: "Azelaik Asit",
      def: "Akne ve rozasea tedavisi",
    },
    {
      latin: "Clindamycin topical",
      turkish: "Topikal Klindamisin",
      def: "Topikal antibiyotik, akne",
    },
    {
      latin: "Erythromycin topical",
      turkish: "Topikal Eritromisin",
      def: "Topikal antibiyotik, akne",
    },
    {
      latin: "Metronidazole topical",
      turkish: "Topikal Metronidazol",
      def: "Rozasea tedavisi",
    },
    {
      latin: "Ivermectin topical",
      turkish: "Topikal İvermektin",
      def: "Rozasea tedavisi",
    },
    {
      latin: "Brimonidine topical",
      turkish: "Topikal Brimonidin",
      def: "Rozasea kızarıklık tedavisi",
    },
    {
      latin: "Oxymetazoline topical",
      turkish: "Topikal Oksimetazolin",
      def: "Rozasea kızarıklık tedavisi",
    },
    {
      latin: "Hydrocortisone",
      turkish: "Hidrokortizon",
      def: "Hafif topikal kortikosteroid",
    },
    {
      latin: "Triamcinolone",
      turkish: "Triamsinolon",
      def: "Orta güçlü kortikosteroid",
    },
    {
      latin: "Betamethasone",
      turkish: "Betametazon",
      def: "Güçlü topikal kortikosteroid",
    },
    {
      latin: "Clobetasol",
      turkish: "Klobetazol",
      def: "Çok güçlü kortikosteroid",
    },
    {
      latin: "Fluocinonide",
      turkish: "Fluosinonid",
      def: "Güçlü kortikosteroid",
    },
    {
      latin: "Mometasone",
      turkish: "Mometazon",
      def: "Orta-güçlü kortikosteroid",
    },
    {
      latin: "Fluticasone topical",
      turkish: "Topikal Flutikason",
      def: "Orta güçlü kortikosteroid",
    },
    { latin: "Desonide", turkish: "Dezonid", def: "Hafif kortikosteroid" },
    {
      latin: "Tacrolimus topical",
      turkish: "Topikal Takrolimus",
      def: "Kalsinörin inhibitörü, egzama",
    },
    {
      latin: "Pimecrolimus",
      turkish: "Pimekrolimus",
      def: "Kalsinörin inhibitörü, egzama",
    },
    {
      latin: "Crisaborole",
      turkish: "Krisaborol",
      def: "PDE4 inhibitörü, egzama",
    },
    {
      latin: "Dupilumab",
      turkish: "Dupilumab",
      def: "IL-4/IL-13 inhibitörü, egzama",
    },
    {
      latin: "Calcipotriene",
      turkish: "Kalsipotriol",
      def: "D vitamini analoğu, psoriazis",
    },
    {
      latin: "Calcitriol topical",
      turkish: "Topikal Kalsitriol",
      def: "D vitamini, psoriazis",
    },
    { latin: "Anthralin", turkish: "Antralin", def: "Psoriazis tedavisi" },
    {
      latin: "Coal tar",
      turkish: "Kömür Katranı",
      def: "Psoriazis ve seboreik dermatit",
    },
    {
      latin: "Methotrexate",
      turkish: "Metotreksat",
      def: "İmmünosupresif, psoriazis, RA",
    },
    {
      latin: "Cyclosporine",
      turkish: "Siklosporin",
      def: "İmmünosupresif, psoriazis",
    },
    {
      latin: "Acitretin",
      turkish: "Asitretin",
      def: "Oral retinoid, psoriazis",
    },
    {
      latin: "Apremilast",
      turkish: "Apremilast",
      def: "PDE4 inhibitörü, psoriazis",
    },
    {
      latin: "Secukinumab",
      turkish: "Sekukinumab",
      def: "IL-17A inhibitörü, psoriazis",
    },
    {
      latin: "Ixekizumab",
      turkish: "İksekizumab",
      def: "IL-17A inhibitörü, psoriazis",
    },
    {
      latin: "Brodalumab",
      turkish: "Brodalumab",
      def: "IL-17 reseptör inhibitörü",
    },
    {
      latin: "Ustekinumab",
      turkish: "Ustekinumab",
      def: "IL-12/23 inhibitörü, psoriazis",
    },
    {
      latin: "Guselkumab",
      turkish: "Guselkumab",
      def: "IL-23 inhibitörü, psoriazis",
    },
    {
      latin: "Risankizumab",
      turkish: "Risankizumab",
      def: "IL-23 inhibitörü, psoriazis",
    },
    {
      latin: "Tildrakizumab",
      turkish: "Tildrakizumab",
      def: "IL-23 inhibitörü, psoriazis",
    },
    {
      latin: "Adalimumab",
      turkish: "Adalimumab",
      def: "TNF inhibitörü, psoriazis, RA",
    },
    {
      latin: "Etanercept",
      turkish: "Etanersept",
      def: "TNF inhibitörü, psoriazis, RA",
    },
    {
      latin: "Infliximab",
      turkish: "İnfliksimab",
      def: "TNF inhibitörü, psoriazis, IBD",
    },
    { latin: "Certolizumab", turkish: "Sertolizumab", def: "TNF inhibitörü" },
    { latin: "Golimumab", turkish: "Golimumab", def: "TNF inhibitörü" },
    {
      latin: "Terbinafine",
      turkish: "Terbinafin",
      def: "Antifungal, tırnak mantarı",
    },
    {
      latin: "Itraconazole",
      turkish: "İtrakonazol",
      def: "Antifungal, sistemik",
    },
    { latin: "Fluconazole", turkish: "Flukonazol", def: "Antifungal, kandida" },
    {
      latin: "Ketoconazole",
      turkish: "Ketokonazol",
      def: "Antifungal, topikal ve oral",
    },
    {
      latin: "Clotrimazole",
      turkish: "Klotrimazol",
      def: "Topikal antifungal",
    },
    { latin: "Miconazole", turkish: "Mikonazol", def: "Topikal antifungal" },
    { latin: "Econazole", turkish: "Ekonazol", def: "Topikal antifungal" },
    { latin: "Nystatin", turkish: "Nistatin", def: "Antifungal, kandida" },
    {
      latin: "Ciclopirox",
      turkish: "Siklopiroks",
      def: "Antifungal, tırnak mantarı",
    },
    {
      latin: "Efinaconazole",
      turkish: "Efinakonazol",
      def: "Topikal antifungal, tırnak",
    },
    {
      latin: "Tavaborole",
      turkish: "Tavaborol",
      def: "Topikal antifungal, tırnak",
    },
    {
      latin: "Griseofulvin",
      turkish: "Griseofulvin",
      def: "Oral antifungal, dermatofit",
    },
    { latin: "Acyclovir", turkish: "Asiklovir", def: "Antiviral, herpes" },
    {
      latin: "Valacyclovir",
      turkish: "Valasiklovir",
      def: "Antiviral, herpes",
    },
    { latin: "Famciclovir", turkish: "Famsiklovir", def: "Antiviral, herpes" },
    {
      latin: "Penciclovir",
      turkish: "Pensiklovir",
      def: "Topikal antiviral, herpes",
    },
    { latin: "Docosanol", turkish: "Dokosanol", def: "OTC herpes tedavisi" },
    {
      latin: "Imiquimod",
      turkish: "İmikimod",
      def: "İmmün modülatör, siğil, BCC",
    },
    {
      latin: "Podofilox",
      turkish: "Podofiloks",
      def: "Genital siğil tedavisi",
    },
    {
      latin: "Sinecatechins",
      turkish: "Sinekatekinler",
      def: "Yeşil çay özütü, genital siğil",
    },
    {
      latin: "Fluorouracil topical",
      turkish: "Topikal Fluorourasil",
      def: "Aktinik keratoz, BCC",
    },
    {
      latin: "Ingenol mebutate",
      turkish: "İngenol Mebutat",
      def: "Aktinik keratoz tedavisi",
    },
    {
      latin: "Diclofenac topical",
      turkish: "Topikal Diklofenak",
      def: "Aktinik keratoz tedavisi",
    },
    {
      latin: "Tirbanibulin",
      turkish: "Tirbanibulin",
      def: "Aktinik keratoz tedavisi",
    },
    {
      latin: "Vismodegib",
      turkish: "Vismodegib",
      def: "Hedgehog inhibitörü, BCC",
    },
    {
      latin: "Sonidegib",
      turkish: "Sonidegib",
      def: "Hedgehog inhibitörü, BCC",
    },
    { latin: "Cemiplimab", turkish: "Cemiplimab", def: "PD-1 inhibitörü, SCC" },
    {
      latin: "Minoxidil",
      turkish: "Minoksidil",
      def: "Saç dökülmesi tedavisi",
    },
    {
      latin: "Finasteride",
      turkish: "Finasterid",
      def: "5-alfa redüktaz inhibitörü, AGA",
    },
    {
      latin: "Dutasteride",
      turkish: "Dutasterid",
      def: "5-alfa redüktaz inhibitörü",
    },
    {
      latin: "Spironolactone",
      turkish: "Spironolakton",
      def: "Antiandrojen, kadın AGA",
    },
    { latin: "Bimatoprost", turkish: "Bimatoprost", def: "Kirpik uzatıcı" },
    {
      latin: "Eflornithine",
      turkish: "Eflornithin",
      def: "Yüz kıllanması tedavisi",
    },
    { latin: "Hydroquinone", turkish: "Hidrokinon", def: "Cilt beyazlatıcı" },
    { latin: "Kojic acid", turkish: "Kojik Asit", def: "Cilt beyazlatıcı" },
    { latin: "Arbutin", turkish: "Arbutin", def: "Cilt beyazlatıcı" },
    {
      latin: "Tranexamic acid topical",
      turkish: "Topikal Traneksamik Asit",
      def: "Melazma tedavisi",
    },
    { latin: "Cysteamine", turkish: "Sisteamin", def: "Melazma tedavisi" },
    {
      latin: "Methoxsalen",
      turkish: "Metoksalen",
      def: "PUVA tedavisi, vitiligo",
    },
    {
      latin: "Monobenzone",
      turkish: "Monobenzon",
      def: "Depigmentasyon ajanı",
    },
    {
      latin: "Afamelanotide",
      turkish: "Afamelanotid",
      def: "Melanosit stimülatörü",
    },
    {
      latin: "Ruxolitinib topical",
      turkish: "Topikal Ruksolitinib",
      def: "JAK inhibitörü, vitiligo",
    },
    { latin: "Dapsone", turkish: "Dapson", def: "Dermatitis herpetiformis" },
    { latin: "Colchicine", turkish: "Kolşisin", def: "Gut, Behçet, FMF" },
    {
      latin: "Hydroxychloroquine",
      turkish: "Hidroksiklorokin",
      def: "Lupus, RA",
    },
    { latin: "Thalidomide", turkish: "Talidomid", def: "ENL, multipl miyelom" },
    { latin: "Lenalidomide", turkish: "Lenalidomid", def: "Multipl miyelom" },
    { latin: "Pomalidomide", turkish: "Pomalidomid", def: "Multipl miyelom" },
    { latin: "Mycophenolate", turkish: "Mikofenolat", def: "İmmünosupresif" },
    { latin: "Azathioprine", turkish: "Azatioprin", def: "İmmünosupresif" },
    { latin: "Rituximab", turkish: "Rituksimab", def: "Anti-CD20, pemfigus" },
    {
      latin: "Omalizumab",
      turkish: "Omalizumab",
      def: "Anti-IgE, kronik ürtiker",
    },
    {
      latin: "Ligelizumab",
      turkish: "Ligelizumab",
      def: "Anti-IgE, kronik ürtiker",
    },
  ];
  data.forEach((d) =>
    drugs.push({
      latinName: d.latin,
      turkishName: d.turkish,
      category: TermCategory.DRUG,
      definition: d.def,
      components: [],
      relatedTerms: [],
      etymology: "",
      usage: "",
      sideEffects: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      synonyms: [],
    })
  );
  return drugs;
};

// Oftalmoloji ilaçları
const generateOphthalmologyDrugs = () => {
  const drugs = [];
  const data = [
    {
      latin: "Latanoprost",
      turkish: "Latanoprost",
      def: "Prostaglandin analoğu, glokom",
    },
    {
      latin: "Travoprost",
      turkish: "Travoprost",
      def: "Prostaglandin analoğu, glokom",
    },
    {
      latin: "Bimatoprost ophthalmic",
      turkish: "Oftalmik Bimatoprost",
      def: "Prostaglandin analoğu, glokom",
    },
    {
      latin: "Tafluprost",
      turkish: "Tafluprost",
      def: "Prostaglandin analoğu, glokom",
    },
    {
      latin: "Latanoprostene bunod",
      turkish: "Latanoprosten Bunod",
      def: "NO donör prostaglandin",
    },
    {
      latin: "Timolol ophthalmic",
      turkish: "Oftalmik Timolol",
      def: "Beta bloker, glokom",
    },
    {
      latin: "Betaxolol ophthalmic",
      turkish: "Oftalmik Betaksolol",
      def: "Beta bloker, glokom",
    },
    {
      latin: "Levobunolol",
      turkish: "Levobunolol",
      def: "Beta bloker, glokom",
    },
    {
      latin: "Carteolol ophthalmic",
      turkish: "Oftalmik Karteolol",
      def: "Beta bloker, glokom",
    },
    {
      latin: "Dorzolamide",
      turkish: "Dorzolamid",
      def: "Karbonik anhidraz inhibitörü",
    },
    {
      latin: "Brinzolamide",
      turkish: "Brinzolamid",
      def: "Karbonik anhidraz inhibitörü",
    },
    {
      latin: "Acetazolamide",
      turkish: "Asetazolamid",
      def: "Sistemik karbonik anhidraz inhibitörü",
    },
    {
      latin: "Methazolamide",
      turkish: "Metazolamid",
      def: "Sistemik karbonik anhidraz inhibitörü",
    },
    {
      latin: "Brimonidine ophthalmic",
      turkish: "Oftalmik Brimonidin",
      def: "Alfa-2 agonist, glokom",
    },
    {
      latin: "Apraclonidine",
      turkish: "Apraklonidin",
      def: "Alfa-2 agonist, glokom",
    },
    {
      latin: "Pilocarpine ophthalmic",
      turkish: "Oftalmik Pilokarpin",
      def: "Kolinerjik, glokom",
    },
    { latin: "Carbachol", turkish: "Karbakol", def: "Kolinerjik, glokom" },
    {
      latin: "Echothiophate",
      turkish: "Ekotiyofat",
      def: "Kolinesteraz inhibitörü",
    },
    {
      latin: "Netarsudil",
      turkish: "Netarsudil",
      def: "Rho kinaz inhibitörü, glokom",
    },
    {
      latin: "Ripasudil",
      turkish: "Ripasudil",
      def: "Rho kinaz inhibitörü, glokom",
    },
    {
      latin: "Mannitol",
      turkish: "Mannitol",
      def: "Osmotik diüretik, akut glokom",
    },
    {
      latin: "Prednisolone ophthalmic",
      turkish: "Oftalmik Prednizolon",
      def: "Kortikosteroid göz damlası",
    },
    {
      latin: "Dexamethasone ophthalmic",
      turkish: "Oftalmik Deksametazon",
      def: "Kortikosteroid göz damlası",
    },
    {
      latin: "Fluorometholone",
      turkish: "Fluorometolon",
      def: "Kortikosteroid göz damlası",
    },
    {
      latin: "Loteprednol",
      turkish: "Loteprednol",
      def: "Kortikosteroid göz damlası",
    },
    {
      latin: "Difluprednate",
      turkish: "Difluprednate",
      def: "Güçlü kortikosteroid göz damlası",
    },
    {
      latin: "Rimexolone",
      turkish: "Rimeksolon",
      def: "Kortikosteroid göz damlası",
    },
    {
      latin: "Cyclosporine ophthalmic",
      turkish: "Oftalmik Siklosporin",
      def: "Kuru göz tedavisi",
    },
    {
      latin: "Lifitegrast",
      turkish: "Lifitegrast",
      def: "LFA-1 antagonisti, kuru göz",
    },
    {
      latin: "Varenicline ophthalmic",
      turkish: "Oftalmik Vareniklin",
      def: "Kuru göz tedavisi",
    },
    {
      latin: "Perfluorohexyloctane",
      turkish: "Perfluoroheksiloktan",
      def: "Kuru göz tedavisi",
    },
    {
      latin: "Olopatadine ophthalmic",
      turkish: "Oftalmik Olopatadin",
      def: "Antihistaminik göz damlası",
    },
    {
      latin: "Ketotifen ophthalmic",
      turkish: "Oftalmik Ketotifen",
      def: "Antihistaminik göz damlası",
    },
    {
      latin: "Azelastine ophthalmic",
      turkish: "Oftalmik Azelastin",
      def: "Antihistaminik göz damlası",
    },
    {
      latin: "Epinastine",
      turkish: "Epinastin",
      def: "Antihistaminik göz damlası",
    },
    {
      latin: "Bepotastine",
      turkish: "Bepotastin",
      def: "Antihistaminik göz damlası",
    },
    {
      latin: "Alcaftadine",
      turkish: "Alkaftadin",
      def: "Antihistaminik göz damlası",
    },
    {
      latin: "Cetirizine ophthalmic",
      turkish: "Oftalmik Setirizin",
      def: "Antihistaminik göz damlası",
    },
    {
      latin: "Cromolyn ophthalmic",
      turkish: "Oftalmik Kromolin",
      def: "Mast hücre stabilizatörü",
    },
    {
      latin: "Nedocromil ophthalmic",
      turkish: "Oftalmik Nedokromil",
      def: "Mast hücre stabilizatörü",
    },
    {
      latin: "Lodoxamide",
      turkish: "Lodoksamid",
      def: "Mast hücre stabilizatörü",
    },
    {
      latin: "Pemirolast",
      turkish: "Pemirolast",
      def: "Mast hücre stabilizatörü",
    },
    {
      latin: "Naphazoline",
      turkish: "Nafazolin",
      def: "Dekonjestan göz damlası",
    },
    {
      latin: "Tetrahydrozoline",
      turkish: "Tetrahidrozolin",
      def: "Dekonjestan göz damlası",
    },
    {
      latin: "Phenylephrine ophthalmic",
      turkish: "Oftalmik Fenilefrin",
      def: "Midriyatik, dekonjestan",
    },
    {
      latin: "Tropicamide",
      turkish: "Tropikamid",
      def: "Midriyatik, sikloplejik",
    },
    { latin: "Cyclopentolate", turkish: "Siklopentolat", def: "Sikloplejik" },
    {
      latin: "Atropine ophthalmic",
      turkish: "Oftalmik Atropin",
      def: "Uzun etkili sikloplejik",
    },
    { latin: "Homatropine", turkish: "Homatropin", def: "Sikloplejik" },
    {
      latin: "Scopolamine ophthalmic",
      turkish: "Oftalmik Skopolamin",
      def: "Sikloplejik",
    },
    {
      latin: "Moxifloxacin ophthalmic",
      turkish: "Oftalmik Moksifloksasin",
      def: "Florokinolon göz damlası",
    },
    {
      latin: "Gatifloxacin ophthalmic",
      turkish: "Oftalmik Gatifloksasin",
      def: "Florokinolon göz damlası",
    },
    {
      latin: "Besifloxacin",
      turkish: "Besifloksasin",
      def: "Florokinolon göz damlası",
    },
    {
      latin: "Levofloxacin ophthalmic",
      turkish: "Oftalmik Levofloksasin",
      def: "Florokinolon göz damlası",
    },
    {
      latin: "Ciprofloxacin ophthalmic",
      turkish: "Oftalmik Siprofloksasin",
      def: "Florokinolon göz damlası",
    },
    {
      latin: "Ofloxacin ophthalmic",
      turkish: "Oftalmik Ofloksasin",
      def: "Florokinolon göz damlası",
    },
    {
      latin: "Tobramycin ophthalmic",
      turkish: "Oftalmik Tobramisin",
      def: "Aminoglikozid göz damlası",
    },
    {
      latin: "Gentamicin ophthalmic",
      turkish: "Oftalmik Gentamisin",
      def: "Aminoglikozid göz damlası",
    },
    {
      latin: "Neomycin ophthalmic",
      turkish: "Oftalmik Neomisin",
      def: "Aminoglikozid göz damlası",
    },
    {
      latin: "Erythromycin ophthalmic",
      turkish: "Oftalmik Eritromisin",
      def: "Makrolid göz merhemi",
    },
    {
      latin: "Azithromycin ophthalmic",
      turkish: "Oftalmik Azitromisin",
      def: "Makrolid göz damlası",
    },
    {
      latin: "Bacitracin ophthalmic",
      turkish: "Oftalmik Basitrasin",
      def: "Polipeptid antibiyotik",
    },
    {
      latin: "Polymyxin B ophthalmic",
      turkish: "Oftalmik Polimiksin B",
      def: "Polipeptid antibiyotik",
    },
    {
      latin: "Sulfacetamide",
      turkish: "Sülfasetamid",
      def: "Sülfonamid göz damlası",
    },
    { latin: "Natamycin", turkish: "Natamisin", def: "Antifungal göz damlası" },
    {
      latin: "Voriconazole ophthalmic",
      turkish: "Oftalmik Vorikonazol",
      def: "Antifungal göz damlası",
    },
    {
      latin: "Trifluridine",
      turkish: "Trifluridin",
      def: "Antiviral göz damlası, herpes",
    },
    {
      latin: "Ganciclovir ophthalmic",
      turkish: "Oftalmik Gansiklovir",
      def: "Antiviral göz jeli",
    },
    {
      latin: "Ranibizumab",
      turkish: "Ranibizumab",
      def: "Anti-VEGF, yaş tip AMD",
    },
    {
      latin: "Bevacizumab",
      turkish: "Bevasizumab",
      def: "Anti-VEGF, off-label göz",
    },
    {
      latin: "Aflibercept",
      turkish: "Aflibersept",
      def: "Anti-VEGF, AMD, DME",
    },
    { latin: "Brolucizumab", turkish: "Brolucizumab", def: "Anti-VEGF, AMD" },
    {
      latin: "Faricimab",
      turkish: "Farisimab",
      def: "Bispecific anti-VEGF/Ang-2",
    },
    { latin: "Pegaptanib", turkish: "Pegaptanib", def: "Anti-VEGF aptamer" },
    {
      latin: "Verteporfin",
      turkish: "Verteporfin",
      def: "Fotodinamik tedavi, AMD",
    },
    {
      latin: "Dexamethasone implant",
      turkish: "Deksametazon İmplantı",
      def: "İntravitreal steroid",
    },
    {
      latin: "Fluocinolone implant",
      turkish: "Fluosinolon İmplantı",
      def: "İntravitreal steroid",
    },
    {
      latin: "Triamcinolone intravitreal",
      turkish: "İntravitreal Triamsinolon",
      def: "İntravitreal steroid",
    },
    {
      latin: "Ocriplasmin",
      turkish: "Okriplazmin",
      def: "Vitreomaküler adezyon tedavisi",
    },
    {
      latin: "Voretigene neparvovec",
      turkish: "Voretigene Neparvovec",
      def: "Gen tedavisi, RPE65 mutasyonu",
    },
    {
      latin: "Luxturna",
      turkish: "Luxturna",
      def: "Gen tedavisi, kalıtsal retina distrofisi",
    },
    {
      latin: "Idebenone",
      turkish: "İdebenon",
      def: "Leber herediter optik nöropati",
    },
    {
      latin: "Elamipretide",
      turkish: "Elamipretid",
      def: "Mitokondriyal hastalık tedavisi",
    },
  ];
  data.forEach((d) =>
    drugs.push({
      latinName: d.latin,
      turkishName: d.turkish,
      category: TermCategory.DRUG,
      definition: d.def,
      components: [],
      relatedTerms: [],
      etymology: "",
      usage: "",
      sideEffects: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      synonyms: [],
    })
  );
  return drugs;
};

// Onkoloji ilaçları
const generateOncologyDrugs = () => {
  const drugs = [];
  const data = [
    {
      latin: "Cyclophosphamide",
      turkish: "Siklofosfamid",
      def: "Alkilleyici ajan, lenfoma, lösemi",
    },
    {
      latin: "Ifosfamide",
      turkish: "İfosfamid",
      def: "Alkilleyici ajan, sarkom",
    },
    {
      latin: "Melphalan",
      turkish: "Melfalan",
      def: "Alkilleyici ajan, multipl miyelom",
    },
    {
      latin: "Chlorambucil",
      turkish: "Klorambusil",
      def: "Alkilleyici ajan, KLL",
    },
    { latin: "Busulfan", turkish: "Busulfan", def: "Alkilleyici ajan, KML" },
    {
      latin: "Bendamustine",
      turkish: "Bendamustin",
      def: "Alkilleyici ajan, lenfoma",
    },
    {
      latin: "Temozolomide",
      turkish: "Temozolomid",
      def: "Alkilleyici ajan, glioblastom",
    },
    {
      latin: "Dacarbazine",
      turkish: "Dakarbazin",
      def: "Alkilleyici ajan, melanom",
    },
    {
      latin: "Procarbazine",
      turkish: "Prokarbazin",
      def: "Alkilleyici ajan, Hodgkin",
    },
    {
      latin: "Carmustine",
      turkish: "Karmustin",
      def: "Nitrozüre, beyin tümörü",
    },
    { latin: "Lomustine", turkish: "Lomustin", def: "Nitrozüre, beyin tümörü" },
    {
      latin: "Streptozocin",
      turkish: "Streptozocin",
      def: "Nitrozüre, pankreas NET",
    },
    {
      latin: "Cisplatin",
      turkish: "Sisplatin",
      def: "Platin bileşiği, çeşitli kanserler",
    },
    {
      latin: "Carboplatin",
      turkish: "Karboplatin",
      def: "Platin bileşiği, over, akciğer",
    },
    {
      latin: "Oxaliplatin",
      turkish: "Oksaliplatin",
      def: "Platin bileşiği, kolorektal",
    },
    { latin: "Nedaplatin", turkish: "Nedaplatin", def: "Platin bileşiği" },
    {
      latin: "Doxorubicin",
      turkish: "Doksorubisin",
      def: "Antrasiklin, meme, lenfoma",
    },
    {
      latin: "Epirubicin",
      turkish: "Epirubisin",
      def: "Antrasiklin, meme kanseri",
    },
    {
      latin: "Daunorubicin",
      turkish: "Daunorubisin",
      def: "Antrasiklin, lösemi",
    },
    { latin: "Idarubicin", turkish: "İdarubisin", def: "Antrasiklin, AML" },
    {
      latin: "Mitoxantrone",
      turkish: "Mitoksantron",
      def: "Antrasendion, lösemi, MS",
    },
    {
      latin: "Bleomycin",
      turkish: "Bleomisin",
      def: "Antitümör antibiyotik, Hodgkin",
    },
    {
      latin: "Mitomycin",
      turkish: "Mitomisin",
      def: "Antitümör antibiyotik, mesane",
    },
    {
      latin: "Actinomycin D",
      turkish: "Aktinomisin D",
      def: "Antitümör antibiyotik, Wilms",
    },
    {
      latin: "Methotrexate",
      turkish: "Metotreksat",
      def: "Antimetabolit, lösemi, RA",
    },
    {
      latin: "Pemetrexed",
      turkish: "Pemetreksed",
      def: "Antifolat, akciğer, mezotelyoma",
    },
    {
      latin: "Pralatrexate",
      turkish: "Pralatreksate",
      def: "Antifolat, T hücreli lenfoma",
    },
    {
      latin: "Fluorouracil",
      turkish: "Fluorourasil",
      def: "Pirimidin analoğu, GI kanserler",
    },
    {
      latin: "Capecitabine",
      turkish: "Kapesitabin",
      def: "Oral 5-FU ön ilacı",
    },
    {
      latin: "Cytarabine",
      turkish: "Sitarabin",
      def: "Pirimidin analoğu, lösemi",
    },
    {
      latin: "Gemcitabine",
      turkish: "Gemsitabin",
      def: "Pirimidin analoğu, pankreas",
    },
    {
      latin: "Azacitidine",
      turkish: "Azasitidin",
      def: "Hipometilleyici, MDS",
    },
    { latin: "Decitabine", turkish: "Desitabin", def: "Hipometilleyici, MDS" },
    {
      latin: "Mercaptopurine",
      turkish: "Merkaptopurin",
      def: "Pürin analoğu, ALL",
    },
    { latin: "Thioguanine", turkish: "Tioguanin", def: "Pürin analoğu, AML" },
    { latin: "Fludarabine", turkish: "Fludarabin", def: "Pürin analoğu, KLL" },
    { latin: "Cladribine", turkish: "Kladribin", def: "Pürin analoğu, HCL" },
    { latin: "Pentostatin", turkish: "Pentostatin", def: "Pürin analoğu, HCL" },
    { latin: "Clofarabine", turkish: "Klofarabin", def: "Pürin analoğu, ALL" },
    { latin: "Nelarabine", turkish: "Nelarabin", def: "Pürin analoğu, T-ALL" },
    {
      latin: "Hydroxyurea",
      turkish: "Hidroksiüre",
      def: "Antimetabolit, KML, orak hücre",
    },
    {
      latin: "Vincristine",
      turkish: "Vinkristin",
      def: "Vinka alkaloidi, lösemi, lenfoma",
    },
    {
      latin: "Vinblastine",
      turkish: "Vinblastin",
      def: "Vinka alkaloidi, Hodgkin",
    },
    {
      latin: "Vinorelbine",
      turkish: "Vinorelbin",
      def: "Vinka alkaloidi, akciğer, meme",
    },
    { latin: "Vindesine", turkish: "Vindesin", def: "Vinka alkaloidi" },
    {
      latin: "Paclitaxel",
      turkish: "Paklitaksel",
      def: "Taksan, meme, over, akciğer",
    },
    { latin: "Docetaxel", turkish: "Dosetaksel", def: "Taksan, meme, prostat" },
    {
      latin: "Cabazitaxel",
      turkish: "Kabazitaksel",
      def: "Taksan, prostat kanseri",
    },
    {
      latin: "Nab-paclitaxel",
      turkish: "Nab-Paklitaksel",
      def: "Albumin bağlı paklitaksel",
    },
    {
      latin: "Etoposide",
      turkish: "Etoposid",
      def: "Topoizomeraz II inhibitörü",
    },
    {
      latin: "Teniposide",
      turkish: "Teniposid",
      def: "Topoizomeraz II inhibitörü",
    },
    {
      latin: "Irinotecan",
      turkish: "İrinotekan",
      def: "Topoizomeraz I inhibitörü",
    },
    {
      latin: "Topotecan",
      turkish: "Topotekan",
      def: "Topoizomeraz I inhibitörü",
    },
    {
      latin: "Imatinib",
      turkish: "İmatinib",
      def: "BCR-ABL inhibitörü, KML, GIST",
    },
    {
      latin: "Dasatinib",
      turkish: "Dasatinib",
      def: "BCR-ABL inhibitörü, KML",
    },
    {
      latin: "Nilotinib",
      turkish: "Nilotinib",
      def: "BCR-ABL inhibitörü, KML",
    },
    {
      latin: "Bosutinib",
      turkish: "Bosutinib",
      def: "BCR-ABL inhibitörü, KML",
    },
    {
      latin: "Ponatinib",
      turkish: "Ponatinib",
      def: "BCR-ABL inhibitörü, T315I",
    },
    { latin: "Asciminib", turkish: "Asciminib", def: "STAMP inhibitörü, KML" },
    { latin: "Gefitinib", turkish: "Gefitinib", def: "EGFR inhibitörü, NSCLC" },
    {
      latin: "Erlotinib",
      turkish: "Erlotinib",
      def: "EGFR inhibitörü, NSCLC, pankreas",
    },
    {
      latin: "Afatinib",
      turkish: "Afatinib",
      def: "Pan-HER inhibitörü, NSCLC",
    },
    {
      latin: "Osimertinib",
      turkish: "Osimertinib",
      def: "3. nesil EGFR inhibitörü",
    },
    { latin: "Dacomitinib", turkish: "Dakomitinib", def: "Pan-HER inhibitörü" },
    { latin: "Lapatinib", turkish: "Lapatinib", def: "HER2 inhibitörü, meme" },
    {
      latin: "Neratinib",
      turkish: "Neratinib",
      def: "Pan-HER inhibitörü, meme",
    },
    { latin: "Tucatinib", turkish: "Tukatinib", def: "HER2 inhibitörü, meme" },
    {
      latin: "Trastuzumab",
      turkish: "Trastuzumab",
      def: "Anti-HER2, meme, mide",
    },
    { latin: "Pertuzumab", turkish: "Pertuzumab", def: "Anti-HER2, meme" },
    {
      latin: "Trastuzumab deruxtecan",
      turkish: "Trastuzumab Derukstekan",
      def: "ADC, HER2+ kanserler",
    },
    {
      latin: "Trastuzumab emtansine",
      turkish: "Trastuzumab Emtansin",
      def: "ADC, HER2+ meme",
    },
    {
      latin: "Cetuximab",
      turkish: "Setuksimab",
      def: "Anti-EGFR, kolorektal, baş-boyun",
    },
    {
      latin: "Panitumumab",
      turkish: "Panitumumab",
      def: "Anti-EGFR, kolorektal",
    },
    {
      latin: "Necitumumab",
      turkish: "Nesitumumab",
      def: "Anti-EGFR, skuamöz NSCLC",
    },
    {
      latin: "Crizotinib",
      turkish: "Krizotinib",
      def: "ALK/ROS1 inhibitörü, NSCLC",
    },
    { latin: "Ceritinib", turkish: "Seritinib", def: "ALK inhibitörü, NSCLC" },
    { latin: "Alectinib", turkish: "Alektinib", def: "ALK inhibitörü, NSCLC" },
    {
      latin: "Brigatinib",
      turkish: "Brigatinib",
      def: "ALK inhibitörü, NSCLC",
    },
    {
      latin: "Lorlatinib",
      turkish: "Lorlatinib",
      def: "ALK/ROS1 inhibitörü, NSCLC",
    },
    {
      latin: "Entrectinib",
      turkish: "Entrektinib",
      def: "TRK/ROS1/ALK inhibitörü",
    },
    { latin: "Larotrectinib", turkish: "Larotrektinib", def: "TRK inhibitörü" },
    { latin: "Selpercatinib", turkish: "Selperkatinib", def: "RET inhibitörü" },
    { latin: "Pralsetinib", turkish: "Pralsetinib", def: "RET inhibitörü" },
    {
      latin: "Capmatinib",
      turkish: "Kapmatinib",
      def: "MET inhibitörü, NSCLC",
    },
    { latin: "Tepotinib", turkish: "Tepotinib", def: "MET inhibitörü, NSCLC" },
    { latin: "Sotorasib", turkish: "Sotorasib", def: "KRAS G12C inhibitörü" },
    { latin: "Adagrasib", turkish: "Adagrasib", def: "KRAS G12C inhibitörü" },
    {
      latin: "Vemurafenib",
      turkish: "Vemurafenib",
      def: "BRAF inhibitörü, melanom",
    },
    {
      latin: "Dabrafenib",
      turkish: "Dabrafenib",
      def: "BRAF inhibitörü, melanom",
    },
    { latin: "Encorafenib", turkish: "Enkorafenib", def: "BRAF inhibitörü" },
    {
      latin: "Trametinib",
      turkish: "Trametinib",
      def: "MEK inhibitörü, melanom",
    },
    {
      latin: "Cobimetinib",
      turkish: "Kobimetinib",
      def: "MEK inhibitörü, melanom",
    },
    { latin: "Binimetinib", turkish: "Binimetinib", def: "MEK inhibitörü" },
    {
      latin: "Sorafenib",
      turkish: "Sorafenib",
      def: "Multi-kinaz inhibitörü, HCC, RCC",
    },
    {
      latin: "Sunitinib",
      turkish: "Sunitinib",
      def: "Multi-kinaz inhibitörü, RCC, GIST",
    },
    {
      latin: "Pazopanib",
      turkish: "Pazopanib",
      def: "Multi-kinaz inhibitörü, RCC, sarkom",
    },
    { latin: "Axitinib", turkish: "Aksitinib", def: "VEGFR inhibitörü, RCC" },
    {
      latin: "Cabozantinib",
      turkish: "Kabozantinib",
      def: "Multi-kinaz inhibitörü, RCC, HCC",
    },
    {
      latin: "Lenvatinib",
      turkish: "Lenvatinib",
      def: "Multi-kinaz inhibitörü, tiroid, HCC",
    },
    {
      latin: "Regorafenib",
      turkish: "Regorafenib",
      def: "Multi-kinaz inhibitörü, kolorektal",
    },
    {
      latin: "Vandetanib",
      turkish: "Vandetanib",
      def: "Multi-kinaz inhibitörü, tiroid",
    },
  ];
  data.forEach((d) =>
    drugs.push({
      latinName: d.latin,
      turkishName: d.turkish,
      category: TermCategory.DRUG,
      definition: d.def,
      components: [],
      relatedTerms: [],
      etymology: "",
      usage: "",
      sideEffects: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      synonyms: [],
    })
  );
  return drugs;
};

// Daha fazla onkoloji ve immünoterapi ilaçları
const generateImmunotherapyDrugs = () => {
  const drugs = [];
  const data = [
    {
      latin: "Pembrolizumab",
      turkish: "Pembrolizumab",
      def: "PD-1 inhibitörü, çeşitli kanserler",
    },
    {
      latin: "Nivolumab",
      turkish: "Nivolumab",
      def: "PD-1 inhibitörü, melanom, akciğer",
    },
    { latin: "Cemiplimab", turkish: "Cemiplimab", def: "PD-1 inhibitörü, SCC" },
    {
      latin: "Dostarlimab",
      turkish: "Dostarlimab",
      def: "PD-1 inhibitörü, endometrium",
    },
    {
      latin: "Atezolizumab",
      turkish: "Atezolizumab",
      def: "PD-L1 inhibitörü, akciğer, mesane",
    },
    {
      latin: "Durvalumab",
      turkish: "Durvalumab",
      def: "PD-L1 inhibitörü, akciğer",
    },
    {
      latin: "Avelumab",
      turkish: "Avelumab",
      def: "PD-L1 inhibitörü, Merkel, RCC",
    },
    {
      latin: "Ipilimumab",
      turkish: "İpilimumab",
      def: "CTLA-4 inhibitörü, melanom",
    },
    {
      latin: "Tremelimumab",
      turkish: "Tremelimumab",
      def: "CTLA-4 inhibitörü",
    },
    {
      latin: "Relatlimab",
      turkish: "Relatlimab",
      def: "LAG-3 inhibitörü, melanom",
    },
    { latin: "Tislelizumab", turkish: "Tislelizumab", def: "PD-1 inhibitörü" },
    { latin: "Sintilimab", turkish: "Sintilimab", def: "PD-1 inhibitörü" },
    { latin: "Camrelizumab", turkish: "Kamrelizumab", def: "PD-1 inhibitörü" },
    { latin: "Toripalimab", turkish: "Toripalimab", def: "PD-1 inhibitörü" },
    {
      latin: "Rituximab",
      turkish: "Rituksimab",
      def: "Anti-CD20, lenfoma, KLL",
    },
    {
      latin: "Obinutuzumab",
      turkish: "Obinutuzumab",
      def: "Anti-CD20, KLL, lenfoma",
    },
    { latin: "Ofatumumab", turkish: "Ofatumumab", def: "Anti-CD20, KLL" },
    { latin: "Alemtuzumab", turkish: "Alemtuzumab", def: "Anti-CD52, KLL, MS" },
    {
      latin: "Daratumumab",
      turkish: "Daratumumab",
      def: "Anti-CD38, multipl miyelom",
    },
    {
      latin: "Isatuximab",
      turkish: "İsatuksimab",
      def: "Anti-CD38, multipl miyelom",
    },
    {
      latin: "Elotuzumab",
      turkish: "Elotuzumab",
      def: "Anti-SLAMF7, multipl miyelom",
    },
    {
      latin: "Brentuximab vedotin",
      turkish: "Brentuksimab Vedotin",
      def: "ADC, Hodgkin, ALCL",
    },
    {
      latin: "Polatuzumab vedotin",
      turkish: "Polatuzumab Vedotin",
      def: "ADC, DLBCL",
    },
    {
      latin: "Enfortumab vedotin",
      turkish: "Enfortumab Vedotin",
      def: "ADC, mesane kanseri",
    },
    {
      latin: "Sacituzumab govitecan",
      turkish: "Sasituzumab Govitekan",
      def: "ADC, TNBC, mesane",
    },
    {
      latin: "Mirvetuximab soravtansine",
      turkish: "Mirvetuksimab Soravtansin",
      def: "ADC, over kanseri",
    },
    {
      latin: "Tisotumab vedotin",
      turkish: "Tisotumab Vedotin",
      def: "ADC, servikal kanser",
    },
    {
      latin: "Loncastuximab tesirine",
      turkish: "Lonkastuksimab Tesirin",
      def: "ADC, DLBCL",
    },
    {
      latin: "Gemtuzumab ozogamicin",
      turkish: "Gemtuzumab Ozogamisin",
      def: "ADC, AML",
    },
    {
      latin: "Inotuzumab ozogamicin",
      turkish: "İnotuzumab Ozogamisin",
      def: "ADC, ALL",
    },
    {
      latin: "Moxetumomab pasudotox",
      turkish: "Moksemomab Pasudotoks",
      def: "İmmünotoksin, HCL",
    },
    { latin: "Blinatumomab", turkish: "Blinatumomab", def: "BiTE, ALL" },
    {
      latin: "Mosunetuzumab",
      turkish: "Mosunetuzumab",
      def: "Bispecific, lenfoma",
    },
    { latin: "Glofitamab", turkish: "Glofitamab", def: "Bispecific, DLBCL" },
    { latin: "Epcoritamab", turkish: "Epkoritamab", def: "Bispecific, DLBCL" },
    {
      latin: "Teclistamab",
      turkish: "Teklistamab",
      def: "Bispecific, multipl miyelom",
    },
    {
      latin: "Talquetamab",
      turkish: "Talketamab",
      def: "Bispecific, multipl miyelom",
    },
    {
      latin: "Elranatamab",
      turkish: "Elranatamab",
      def: "Bispecific, multipl miyelom",
    },
    {
      latin: "Axicabtagene ciloleucel",
      turkish: "Aksikabtagene Silolösel",
      def: "CAR-T, DLBCL",
    },
    {
      latin: "Tisagenlecleucel",
      turkish: "Tisagenleklösel",
      def: "CAR-T, ALL, DLBCL",
    },
    {
      latin: "Brexucabtagene autoleucel",
      turkish: "Breksukabtagene Otolösel",
      def: "CAR-T, MCL, ALL",
    },
    {
      latin: "Lisocabtagene maraleucel",
      turkish: "Lisokabtagene Maralösel",
      def: "CAR-T, DLBCL",
    },
    {
      latin: "Idecabtagene vicleucel",
      turkish: "İdekabtagene Viklösel",
      def: "CAR-T, multipl miyelom",
    },
    {
      latin: "Ciltacabtagene autoleucel",
      turkish: "Siltakabtagene Otolösel",
      def: "CAR-T, multipl miyelom",
    },
    {
      latin: "Talimogene laherparepvec",
      turkish: "Talimogene Laherparepvek",
      def: "Onkolitik virüs, melanom",
    },
    {
      latin: "Sipuleucel-T",
      turkish: "Sipulösel-T",
      def: "Kanser aşısı, prostat",
    },
    {
      latin: "BCG vaccine",
      turkish: "BCG Aşısı",
      def: "İmmünoterapi, mesane kanseri",
    },
    {
      latin: "Interferon alfa-2b",
      turkish: "İnterferon Alfa-2b",
      def: "İmmünomodülatör, melanom, HCV",
    },
    {
      latin: "Peginterferon alfa-2a",
      turkish: "Peginterferon Alfa-2a",
      def: "Pegile interferon",
    },
    {
      latin: "Peginterferon alfa-2b",
      turkish: "Peginterferon Alfa-2b",
      def: "Pegile interferon",
    },
    { latin: "Aldesleukin", turkish: "Aldeslökin", def: "IL-2, melanom, RCC" },
    {
      latin: "Denileukin diftitox",
      turkish: "Denilökin Diftitoks",
      def: "IL-2 füzyon toksini",
    },
    {
      latin: "Bortezomib",
      turkish: "Bortezomib",
      def: "Proteazom inhibitörü, miyelom",
    },
    {
      latin: "Carfilzomib",
      turkish: "Karfilzomib",
      def: "Proteazom inhibitörü, miyelom",
    },
    {
      latin: "Ixazomib",
      turkish: "İksazomib",
      def: "Oral proteazom inhibitörü",
    },
    {
      latin: "Thalidomide",
      turkish: "Talidomid",
      def: "İmmünomodülatör, miyelom",
    },
    {
      latin: "Lenalidomide",
      turkish: "Lenalidomid",
      def: "İmmünomodülatör, miyelom, MDS",
    },
    {
      latin: "Pomalidomide",
      turkish: "Pomalidomid",
      def: "İmmünomodülatör, miyelom",
    },
    { latin: "Iberdomide", turkish: "İberdomid", def: "CELMoD, miyelom" },
    { latin: "Mezigdomide", turkish: "Mezigdomid", def: "CELMoD, miyelom" },
    {
      latin: "Venetoclax",
      turkish: "Venetoklaks",
      def: "BCL-2 inhibitörü, KLL, AML",
    },
    {
      latin: "Navitoclax",
      turkish: "Navitoklaks",
      def: "BCL-2/BCL-XL inhibitörü",
    },
    {
      latin: "Ibrutinib",
      turkish: "İbrutinib",
      def: "BTK inhibitörü, KLL, MCL",
    },
    {
      latin: "Acalabrutinib",
      turkish: "Akalabrutinib",
      def: "BTK inhibitörü, KLL, MCL",
    },
    {
      latin: "Zanubrutinib",
      turkish: "Zanubrutinib",
      def: "BTK inhibitörü, KLL, MCL",
    },
    {
      latin: "Pirtobrutinib",
      turkish: "Pirtobrutinib",
      def: "Non-kovalent BTK inhibitörü",
    },
    {
      latin: "Idelalisib",
      turkish: "İdelalisib",
      def: "PI3K inhibitörü, KLL, lenfoma",
    },
    {
      latin: "Duvelisib",
      turkish: "Duvelisib",
      def: "PI3K inhibitörü, KLL, lenfoma",
    },
    {
      latin: "Copanlisib",
      turkish: "Kopanlisib",
      def: "PI3K inhibitörü, lenfoma",
    },
    { latin: "Umbralisib", turkish: "Umbralisib", def: "PI3K/CK1 inhibitörü" },
    {
      latin: "Alpelisib",
      turkish: "Alpelisib",
      def: "PI3K alfa inhibitörü, meme",
    },
    {
      latin: "Everolimus",
      turkish: "Everolimus",
      def: "mTOR inhibitörü, RCC, meme",
    },
    {
      latin: "Temsirolimus",
      turkish: "Temsirolimus",
      def: "mTOR inhibitörü, RCC",
    },
    {
      latin: "Sirolimus",
      turkish: "Sirolimus",
      def: "mTOR inhibitörü, immünosupresif",
    },
    {
      latin: "Palbociclib",
      turkish: "Palbosiklib",
      def: "CDK4/6 inhibitörü, meme",
    },
    {
      latin: "Ribociclib",
      turkish: "Ribosiklib",
      def: "CDK4/6 inhibitörü, meme",
    },
    {
      latin: "Abemaciclib",
      turkish: "Abemasiklib",
      def: "CDK4/6 inhibitörü, meme",
    },
    {
      latin: "Trilaciclib",
      turkish: "Trilasiklib",
      def: "CDK4/6 inhibitörü, myeloproteksiyon",
    },
    {
      latin: "Olaparib",
      turkish: "Olaparib",
      def: "PARP inhibitörü, over, meme",
    },
    {
      latin: "Rucaparib",
      turkish: "Rukaparib",
      def: "PARP inhibitörü, over, prostat",
    },
    { latin: "Niraparib", turkish: "Niraparib", def: "PARP inhibitörü, over" },
    {
      latin: "Talazoparib",
      turkish: "Talazoparib",
      def: "PARP inhibitörü, meme",
    },
    {
      latin: "Vorinostat",
      turkish: "Vorinostat",
      def: "HDAC inhibitörü, CTCL",
    },
    {
      latin: "Romidepsin",
      turkish: "Romidepsin",
      def: "HDAC inhibitörü, CTCL, PTCL",
    },
    {
      latin: "Belinostat",
      turkish: "Belinostat",
      def: "HDAC inhibitörü, PTCL",
    },
    {
      latin: "Panobinostat",
      turkish: "Panobinostat",
      def: "HDAC inhibitörü, miyelom",
    },
    { latin: "Tucidinostat", turkish: "Tusidinostat", def: "HDAC inhibitörü" },
    {
      latin: "Tazemetostat",
      turkish: "Tazemetostat",
      def: "EZH2 inhibitörü, lenfoma, sarkom",
    },
    { latin: "Enasidenib", turkish: "Enasidenib", def: "IDH2 inhibitörü, AML" },
    {
      latin: "Ivosidenib",
      turkish: "İvosidenib",
      def: "IDH1 inhibitörü, AML, kolanjiyokarsinom",
    },
    {
      latin: "Olutasidenib",
      turkish: "Olutasidenib",
      def: "IDH1 inhibitörü, AML",
    },
    {
      latin: "Gilteritinib",
      turkish: "Gilteritinib",
      def: "FLT3 inhibitörü, AML",
    },
    {
      latin: "Midostaurin",
      turkish: "Midostaurin",
      def: "FLT3 inhibitörü, AML",
    },
    {
      latin: "Quizartinib",
      turkish: "Kizartinib",
      def: "FLT3 inhibitörü, AML",
    },
    {
      latin: "Glasdegib",
      turkish: "Glasdegib",
      def: "Hedgehog inhibitörü, AML",
    },
    {
      latin: "Ruxolitinib",
      turkish: "Ruksolitinib",
      def: "JAK inhibitörü, miyelofibrozis",
    },
    {
      latin: "Fedratinib",
      turkish: "Fedratinib",
      def: "JAK2 inhibitörü, miyelofibrozis",
    },
    {
      latin: "Pacritinib",
      turkish: "Pakritinib",
      def: "JAK2 inhibitörü, miyelofibrozis",
    },
    {
      latin: "Momelotinib",
      turkish: "Momelotinib",
      def: "JAK1/2 inhibitörü, miyelofibrozis",
    },
  ];
  data.forEach((d) =>
    drugs.push({
      latinName: d.latin,
      turkishName: d.turkish,
      category: TermCategory.DRUG,
      definition: d.def,
      components: [],
      relatedTerms: [],
      etymology: "",
      usage: "",
      sideEffects: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      synonyms: [],
    })
  );
  return drugs;
};

// Ek hastalıklar - Romatoloji, Dermatoloji, Üroloji
const generateMoreDiseases2 = () => {
  const diseases = [];
  const data = [
    // Romatolojik hastalıklar
    {
      latin: "Rheumatoid arthritis",
      turkish: "Romatoid Artrit",
      def: "Otoimmün eklem iltihabı",
    },
    {
      latin: "Osteoarthritis",
      turkish: "Osteoartrit",
      def: "Dejeneratif eklem hastalığı",
    },
    { latin: "Gout", turkish: "Gut", def: "Ürik asit kristal artropatisi" },
    {
      latin: "Pseudogout",
      turkish: "Psödogut",
      def: "Kalsiyum pirofosfat kristal hastalığı",
    },
    {
      latin: "Systemic lupus erythematosus",
      turkish: "Sistemik Lupus Eritematozus",
      def: "Otoimmün multisistem hastalık",
    },
    {
      latin: "Sjogren syndrome",
      turkish: "Sjögren Sendromu",
      def: "Otoimmün kuru göz ve ağız",
    },
    {
      latin: "Systemic sclerosis",
      turkish: "Sistemik Skleroz",
      def: "Skleroderma",
    },
    {
      latin: "Dermatomyositis",
      turkish: "Dermatomiyozit",
      def: "İnflamatuar miyopati, cilt tutulumu",
    },
    {
      latin: "Polymyositis",
      turkish: "Polimiyozit",
      def: "İnflamatuar kas hastalığı",
    },
    {
      latin: "Inclusion body myositis",
      turkish: "İnklüzyon Cisimcikli Miyozit",
      def: "Dejeneratif miyopati",
    },
    {
      latin: "Mixed connective tissue disease",
      turkish: "Mikst Bağ Dokusu Hastalığı",
      def: "Overlap sendromu",
    },
    {
      latin: "Antiphospholipid syndrome",
      turkish: "Antifosfolipid Sendromu",
      def: "Tromboz ve gebelik kaybı",
    },
    { latin: "Vasculitis", turkish: "Vaskülit", def: "Damar iltihabı" },
    {
      latin: "ANCA-associated vasculitis",
      turkish: "ANCA İlişkili Vaskülit",
      def: "Küçük damar vasküliti",
    },
    {
      latin: "Granulomatosis with polyangiitis",
      turkish: "Polianjitisli Granülomatozis",
      def: "Wegener granülomatozu",
    },
    {
      latin: "Microscopic polyangiitis",
      turkish: "Mikroskopik Polianjit",
      def: "Küçük damar vasküliti",
    },
    {
      latin: "Eosinophilic granulomatosis with polyangiitis",
      turkish: "Eozinofilik Granülomatozis",
      def: "Churg-Strauss sendromu",
    },
    {
      latin: "IgA vasculitis",
      turkish: "IgA Vasküliti",
      def: "Henoch-Schönlein purpurası",
    },
    {
      latin: "Cryoglobulinemic vasculitis",
      turkish: "Kriyoglobulinemik Vaskülit",
      def: "Soğuk çöken protein vasküliti",
    },
    {
      latin: "Behcet disease",
      turkish: "Behçet Hastalığı",
      def: "Aftöz ülser ve vaskülit",
    },
    {
      latin: "Ankylosing spondylitis",
      turkish: "Ankilozan Spondilit",
      def: "Omurga iltihabı",
    },
    {
      latin: "Psoriatic arthritis",
      turkish: "Psoriatik Artrit",
      def: "Sedef ilişkili artrit",
    },
    {
      latin: "Reactive arthritis",
      turkish: "Reaktif Artrit",
      def: "Enfeksiyon sonrası artrit",
    },
    {
      latin: "Enteropathic arthritis",
      turkish: "Enteropatik Artrit",
      def: "IBD ilişkili artrit",
    },
    {
      latin: "Juvenile idiopathic arthritis",
      turkish: "Juvenil İdiyopatik Artrit",
      def: "Çocukluk çağı artriti",
    },
    {
      latin: "Adult-onset Still disease",
      turkish: "Erişkin Still Hastalığı",
      def: "Sistemik inflamatuar hastalık",
    },
    {
      latin: "Familial Mediterranean fever",
      turkish: "Ailevi Akdeniz Ateşi",
      def: "Periyodik ateş sendromu",
    },
    {
      latin: "Fibromyalgia",
      turkish: "Fibromiyalji",
      def: "Yaygın kas ağrısı sendromu",
    },
    {
      latin: "Polymyalgia rheumatica",
      turkish: "Polimiyalji Romatika",
      def: "Proksimal kas ağrısı",
    },
    {
      latin: "Relapsing polychondritis",
      turkish: "Tekrarlayan Polikondrit",
      def: "Kıkırdak iltihabı",
    },
    {
      latin: "Sarcoidosis",
      turkish: "Sarkoidoz",
      def: "Granülomatöz hastalık",
    },
    {
      latin: "Amyloidosis",
      turkish: "Amiloidoz",
      def: "Protein birikimi hastalığı",
    },
    {
      latin: "Hemochromatosis",
      turkish: "Hemokromatozis",
      def: "Demir birikimi hastalığı",
    },
    {
      latin: "Wilson disease",
      turkish: "Wilson Hastalığı",
      def: "Bakır birikimi hastalığı",
    },
    {
      latin: "Paget disease of bone",
      turkish: "Kemik Paget Hastalığı",
      def: "Kemik yeniden yapılanma bozukluğu",
    },
    { latin: "Osteoporosis", turkish: "Osteoporoz", def: "Kemik erimesi" },
    { latin: "Osteomalacia", turkish: "Osteomalazi", def: "Kemik yumuşaması" },
    {
      latin: "Rickets",
      turkish: "Raşitizm",
      def: "Çocukluk çağı D vitamini eksikliği",
    },
    {
      latin: "Osteogenesis imperfecta",
      turkish: "Osteogenezis İmperfekta",
      def: "Kırılgan kemik hastalığı",
    },
    {
      latin: "Marfan syndrome",
      turkish: "Marfan Sendromu",
      def: "Bağ dokusu hastalığı",
    },
    {
      latin: "Ehlers-Danlos syndrome",
      turkish: "Ehlers-Danlos Sendromu",
      def: "Bağ dokusu hastalığı",
    },

    // Dermatolojik hastalıklar
    {
      latin: "Psoriasis",
      turkish: "Sedef Hastalığı",
      def: "Kronik inflamatuar cilt hastalığı",
    },
    { latin: "Atopic dermatitis", turkish: "Atopik Dermatit", def: "Egzama" },
    {
      latin: "Contact dermatitis",
      turkish: "Kontakt Dermatit",
      def: "Temas alerjisi",
    },
    {
      latin: "Seborrheic dermatitis",
      turkish: "Seboreik Dermatit",
      def: "Yağlı cilt iltihabı",
    },
    {
      latin: "Nummular dermatitis",
      turkish: "Nümüler Dermatit",
      def: "Madeni para şekilli egzama",
    },
    {
      latin: "Stasis dermatitis",
      turkish: "Staz Dermatiti",
      def: "Venöz yetmezlik dermatiti",
    },
    {
      latin: "Dyshidrotic eczema",
      turkish: "Dishidrotik Egzama",
      def: "El ve ayak vezikül egzaması",
    },
    {
      latin: "Lichen planus",
      turkish: "Liken Planus",
      def: "Mor papüler cilt hastalığı",
    },
    {
      latin: "Lichen simplex chronicus",
      turkish: "Liken Simpleks Kronikus",
      def: "Nörodermatit",
    },
    {
      latin: "Pityriasis rosea",
      turkish: "Pitiriazis Rozea",
      def: "Herald yamalı döküntü",
    },
    {
      latin: "Pityriasis versicolor",
      turkish: "Pitiriazis Versikolor",
      def: "Mantar kaynaklı renk değişimi",
    },
    {
      latin: "Tinea corporis",
      turkish: "Tinea Korporis",
      def: "Vücut mantarı",
    },
    { latin: "Tinea pedis", turkish: "Tinea Pedis", def: "Ayak mantarı" },
    { latin: "Tinea cruris", turkish: "Tinea Kruris", def: "Kasık mantarı" },
    {
      latin: "Tinea capitis",
      turkish: "Tinea Kapitis",
      def: "Saçlı deri mantarı",
    },
    { latin: "Onychomycosis", turkish: "Onikomikoz", def: "Tırnak mantarı" },
    { latin: "Candidiasis", turkish: "Kandidiyazis", def: "Maya enfeksiyonu" },
    {
      latin: "Impetigo",
      turkish: "İmpetigo",
      def: "Bakteriyel cilt enfeksiyonu",
    },
    { latin: "Cellulitis", turkish: "Selülit", def: "Derin cilt enfeksiyonu" },
    {
      latin: "Erysipelas",
      turkish: "Erizipel",
      def: "Yüzeyel cilt enfeksiyonu",
    },
    {
      latin: "Folliculitis",
      turkish: "Folikülit",
      def: "Kıl folikülü iltihabı",
    },
    { latin: "Furuncle", turkish: "Furunkül", def: "Çıban" },
    { latin: "Carbuncle", turkish: "Karbonkül", def: "Birleşik çıbanlar" },
    { latin: "Abscess", turkish: "Apse", def: "İrin birikimi" },
    {
      latin: "Necrotizing fasciitis",
      turkish: "Nekrotizan Fasiit",
      def: "Et yiyen bakteri enfeksiyonu",
    },
    { latin: "Herpes simplex", turkish: "Herpes Simpleks", def: "Uçuk" },
    { latin: "Herpes zoster", turkish: "Herpes Zoster", def: "Zona" },
    { latin: "Varicella", turkish: "Varisella", def: "Su çiçeği" },
    {
      latin: "Molluscum contagiosum",
      turkish: "Molluskum Kontagiyozum",
      def: "Viral cilt lezyonu",
    },
    { latin: "Verruca vulgaris", turkish: "Verruka Vulgaris", def: "Siğil" },
    {
      latin: "Condyloma acuminatum",
      turkish: "Kondiloma Akuminatum",
      def: "Genital siğil",
    },
    { latin: "Scabies", turkish: "Uyuz", def: "Akar enfestasyonu" },
    { latin: "Pediculosis", turkish: "Pedikulozis", def: "Bit enfestasyonu" },
    { latin: "Acne vulgaris", turkish: "Akne Vulgaris", def: "Sivilce" },
    { latin: "Rosacea", turkish: "Rozasea", def: "Yüz kızarıklığı hastalığı" },
    {
      latin: "Perioral dermatitis",
      turkish: "Perioral Dermatit",
      def: "Ağız çevresi dermatiti",
    },
    {
      latin: "Hidradenitis suppurativa",
      turkish: "Hidradenitis Süpürativa",
      def: "Ter bezi iltihabı",
    },
    {
      latin: "Alopecia areata",
      turkish: "Alopesi Areata",
      def: "Saç dökülmesi",
    },
    {
      latin: "Androgenetic alopecia",
      turkish: "Androgenetik Alopesi",
      def: "Erkek tipi kellik",
    },
    {
      latin: "Telogen effluvium",
      turkish: "Telogen Effluvium",
      def: "Yaygın saç dökülmesi",
    },
    { latin: "Vitiligo", turkish: "Vitiligo", def: "Cilt renk kaybı" },
    { latin: "Melasma", turkish: "Melazma", def: "Cilt renk artışı" },
    { latin: "Urticaria", turkish: "Ürtiker", def: "Kurdeşen" },
    { latin: "Angioedema", turkish: "Anjiyoödem", def: "Derin doku şişmesi" },
    {
      latin: "Erythema multiforme",
      turkish: "Eritema Multiforme",
      def: "Hedef lezyonlu döküntü",
    },
    {
      latin: "Stevens-Johnson syndrome",
      turkish: "Stevens-Johnson Sendromu",
      def: "Ciddi ilaç reaksiyonu",
    },
    {
      latin: "Toxic epidermal necrolysis",
      turkish: "Toksik Epidermal Nekroliz",
      def: "Şiddetli cilt reaksiyonu",
    },
    {
      latin: "Drug eruption",
      turkish: "İlaç Döküntüsü",
      def: "İlaç kaynaklı cilt reaksiyonu",
    },
    {
      latin: "Pemphigus vulgaris",
      turkish: "Pemfigus Vulgaris",
      def: "Otoimmün bül hastalığı",
    },
    {
      latin: "Bullous pemphigoid",
      turkish: "Büllöz Pemfigoid",
      def: "Otoimmün bül hastalığı",
    },
    {
      latin: "Dermatitis herpetiformis",
      turkish: "Dermatitis Herpetiformis",
      def: "Çölyak ilişkili cilt hastalığı",
    },
    {
      latin: "Epidermolysis bullosa",
      turkish: "Epidermolizis Bülloza",
      def: "Genetik bül hastalığı",
    },
    {
      latin: "Basal cell carcinoma",
      turkish: "Bazal Hücreli Karsinom",
      def: "En sık cilt kanseri",
    },
    {
      latin: "Squamous cell carcinoma",
      turkish: "Skuamöz Hücreli Karsinom",
      def: "Cilt kanseri",
    },
    { latin: "Melanoma", turkish: "Melanom", def: "Pigment hücresi kanseri" },
    {
      latin: "Actinic keratosis",
      turkish: "Aktinik Keratoz",
      def: "Güneş hasarı prekanser",
    },
    {
      latin: "Seborrheic keratosis",
      turkish: "Seboreik Keratoz",
      def: "İyi huylu cilt lezyonu",
    },
    {
      latin: "Keratoacanthoma",
      turkish: "Keratoakantom",
      def: "Hızlı büyüyen cilt lezyonu",
    },
    {
      latin: "Dermatofibroma",
      turkish: "Dermatofibrom",
      def: "İyi huylu fibröz lezyon",
    },
    { latin: "Lipoma", turkish: "Lipom", def: "Yağ dokusu tümörü" },
    { latin: "Hemangioma", turkish: "Hemanjiyom", def: "Damar tümörü" },
    {
      latin: "Kaposi sarcoma",
      turkish: "Kaposi Sarkomu",
      def: "Damar kaynaklı kanser",
    },
    {
      latin: "Cutaneous T-cell lymphoma",
      turkish: "Kutanöz T Hücreli Lenfoma",
      def: "Cilt lenfoması",
    },
    {
      latin: "Mycosis fungoides",
      turkish: "Mikozis Fungoides",
      def: "Cilt T hücreli lenfoma",
    },
  ];
  data.forEach((d) =>
    diseases.push({
      latinName: d.latin,
      turkishName: d.turkish,
      category: TermCategory.DISEASE,
      definition: d.def,
      components: [],
      relatedTerms: [],
      etymology: "",
      usage: "",
      sideEffects: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      synonyms: [],
    })
  );
  return diseases;
};

// Üroloji ve Nefroloji hastalıkları
const generateUrologyDiseases = () => {
  const diseases = [];
  const data = [
    {
      latin: "Acute kidney injury",
      turkish: "Akut Böbrek Hasarı",
      def: "Ani böbrek fonksiyon kaybı",
    },
    {
      latin: "Chronic kidney disease",
      turkish: "Kronik Böbrek Hastalığı",
      def: "İlerleyici böbrek yetmezliği",
    },
    {
      latin: "End-stage renal disease",
      turkish: "Son Dönem Böbrek Hastalığı",
      def: "Diyaliz gerektiren böbrek yetmezliği",
    },
    {
      latin: "Glomerulonephritis",
      turkish: "Glomerülonefrit",
      def: "Böbrek glomerül iltihabı",
    },
    {
      latin: "IgA nephropathy",
      turkish: "IgA Nefropatisi",
      def: "Berger hastalığı",
    },
    {
      latin: "Membranous nephropathy",
      turkish: "Membranöz Nefropati",
      def: "Glomerüler hastalık",
    },
    {
      latin: "Minimal change disease",
      turkish: "Minimal Değişiklik Hastalığı",
      def: "Çocukluk nefrotik sendromu",
    },
    {
      latin: "Focal segmental glomerulosclerosis",
      turkish: "Fokal Segmental Glomerüloskleroz",
      def: "FSGS",
    },
    {
      latin: "Diabetic nephropathy",
      turkish: "Diyabetik Nefropati",
      def: "Diyabet böbrek hasarı",
    },
    {
      latin: "Hypertensive nephrosclerosis",
      turkish: "Hipertansif Nefroskleroz",
      def: "Tansiyon böbrek hasarı",
    },
    {
      latin: "Lupus nephritis",
      turkish: "Lupus Nefriti",
      def: "SLE böbrek tutulumu",
    },
    {
      latin: "Polycystic kidney disease",
      turkish: "Polikistik Böbrek Hastalığı",
      def: "Genetik kistik böbrek",
    },
    {
      latin: "Nephrotic syndrome",
      turkish: "Nefrotik Sendrom",
      def: "Protein kaybı sendromu",
    },
    {
      latin: "Nephritic syndrome",
      turkish: "Nefritik Sendrom",
      def: "Glomerüler inflamasyon sendromu",
    },
    {
      latin: "Acute tubular necrosis",
      turkish: "Akut Tübüler Nekroz",
      def: "Böbrek tübül hasarı",
    },
    {
      latin: "Interstitial nephritis",
      turkish: "İnterstisyel Nefrit",
      def: "Böbrek interstisyum iltihabı",
    },
    {
      latin: "Pyelonephritis",
      turkish: "Piyelonefrit",
      def: "Böbrek enfeksiyonu",
    },
    {
      latin: "Urinary tract infection",
      turkish: "İdrar Yolu Enfeksiyonu",
      def: "Üriner sistem enfeksiyonu",
    },
    { latin: "Cystitis", turkish: "Sistit", def: "Mesane iltihabı" },
    { latin: "Urethritis", turkish: "Üretrit", def: "Üretra iltihabı" },
    { latin: "Prostatitis", turkish: "Prostatit", def: "Prostat iltihabı" },
    { latin: "Epididymitis", turkish: "Epididimit", def: "Epididim iltihabı" },
    { latin: "Orchitis", turkish: "Orşit", def: "Testis iltihabı" },
    { latin: "Nephrolithiasis", turkish: "Nefrolitiyazis", def: "Böbrek taşı" },
    {
      latin: "Ureterolithiasis",
      turkish: "Üreterolitiyazis",
      def: "Üreter taşı",
    },
    { latin: "Bladder stone", turkish: "Mesane Taşı", def: "Mesane içi taş" },
    {
      latin: "Hydronephrosis",
      turkish: "Hidronefroz",
      def: "Böbrek genişlemesi",
    },
    {
      latin: "Vesicoureteral reflux",
      turkish: "Vezikoüreteral Reflü",
      def: "İdrar geri akışı",
    },
    {
      latin: "Urinary incontinence",
      turkish: "İdrar Kaçırma",
      def: "İdrar tutamama",
    },
    {
      latin: "Stress incontinence",
      turkish: "Stres İnkontinansı",
      def: "Efor ile idrar kaçırma",
    },
    {
      latin: "Urge incontinence",
      turkish: "Urge İnkontinansı",
      def: "Ani sıkışma ile kaçırma",
    },
    {
      latin: "Overactive bladder",
      turkish: "Aşırı Aktif Mesane",
      def: "Sık idrara çıkma",
    },
    {
      latin: "Neurogenic bladder",
      turkish: "Nörojenik Mesane",
      def: "Sinir hasarı mesane bozukluğu",
    },
    {
      latin: "Benign prostatic hyperplasia",
      turkish: "Benign Prostat Hiperplazisi",
      def: "İyi huylu prostat büyümesi",
    },
    {
      latin: "Prostate cancer",
      turkish: "Prostat Kanseri",
      def: "Prostat malignitesi",
    },
    {
      latin: "Bladder cancer",
      turkish: "Mesane Kanseri",
      def: "Mesane malignitesi",
    },
    {
      latin: "Renal cell carcinoma",
      turkish: "Renal Hücreli Karsinom",
      def: "Böbrek kanseri",
    },
    {
      latin: "Wilms tumor",
      turkish: "Wilms Tümörü",
      def: "Çocukluk böbrek kanseri",
    },
    {
      latin: "Testicular cancer",
      turkish: "Testis Kanseri",
      def: "Testis malignitesi",
    },
    {
      latin: "Penile cancer",
      turkish: "Penis Kanseri",
      def: "Penis malignitesi",
    },
    {
      latin: "Erectile dysfunction",
      turkish: "Erektil Disfonksiyon",
      def: "Sertleşme bozukluğu",
    },
    {
      latin: "Premature ejaculation",
      turkish: "Erken Boşalma",
      def: "Prematür ejakülasyon",
    },
    {
      latin: "Male infertility",
      turkish: "Erkek İnfertilitesi",
      def: "Erkek kısırlığı",
    },
    { latin: "Varicocele", turkish: "Varikosel", def: "Testis varis" },
    { latin: "Hydrocele", turkish: "Hidrosel", def: "Testis sıvı birikimi" },
    { latin: "Spermatocele", turkish: "Spermatosel", def: "Epididim kisti" },
    {
      latin: "Testicular torsion",
      turkish: "Testis Torsiyonu",
      def: "Testis dönmesi",
    },
    {
      latin: "Cryptorchidism",
      turkish: "Kriptorşidizm",
      def: "İnmemiş testis",
    },
    { latin: "Phimosis", turkish: "Fimozis", def: "Sünnet derisi darlığı" },
    {
      latin: "Paraphimosis",
      turkish: "Parafimozis",
      def: "Sünnet derisi sıkışması",
    },
    {
      latin: "Peyronie disease",
      turkish: "Peyronie Hastalığı",
      def: "Penis eğriliği",
    },
    { latin: "Priapism", turkish: "Priapizm", def: "Uzun süreli ereksiyon" },
    { latin: "Balanitis", turkish: "Balanit", def: "Glans penis iltihabı" },
    {
      latin: "Urethral stricture",
      turkish: "Üretra Darlığı",
      def: "İdrar yolu daralması",
    },
    {
      latin: "Renal artery stenosis",
      turkish: "Renal Arter Stenozu",
      def: "Böbrek damar darlığı",
    },
    {
      latin: "Renal vein thrombosis",
      turkish: "Renal Ven Trombozu",
      def: "Böbrek toplardamar pıhtısı",
    },
    {
      latin: "Alport syndrome",
      turkish: "Alport Sendromu",
      def: "Genetik böbrek hastalığı",
    },
    {
      latin: "Fabry disease",
      turkish: "Fabry Hastalığı",
      def: "Lizozomal depo hastalığı",
    },
    {
      latin: "Renal tubular acidosis",
      turkish: "Renal Tübüler Asidoz",
      def: "Böbrek asit-baz bozukluğu",
    },
    {
      latin: "Fanconi syndrome",
      turkish: "Fanconi Sendromu",
      def: "Proksimal tübül bozukluğu",
    },
    {
      latin: "Bartter syndrome",
      turkish: "Bartter Sendromu",
      def: "Tuz kaybettiren tübülopati",
    },
    {
      latin: "Gitelman syndrome",
      turkish: "Gitelman Sendromu",
      def: "Tuz kaybettiren tübülopati",
    },
    {
      latin: "Liddle syndrome",
      turkish: "Liddle Sendromu",
      def: "Sodyum tutan tübülopati",
    },
    {
      latin: "Nephrogenic diabetes insipidus",
      turkish: "Nefrojenik Diabetes İnsipidus",
      def: "Böbrek su tutamama",
    },
    {
      latin: "Hepatorenal syndrome",
      turkish: "Hepatorenal Sendrom",
      def: "Karaciğer-böbrek yetmezliği",
    },
    {
      latin: "Cardiorenal syndrome",
      turkish: "Kardiorenal Sendrom",
      def: "Kalp-böbrek yetmezliği",
    },
    {
      latin: "Contrast-induced nephropathy",
      turkish: "Kontrast Nefropatisi",
      def: "Kontrast madde böbrek hasarı",
    },
    {
      latin: "Drug-induced nephrotoxicity",
      turkish: "İlaç Nefrotoksisitesi",
      def: "İlaç kaynaklı böbrek hasarı",
    },
  ];
  data.forEach((d) =>
    diseases.push({
      latinName: d.latin,
      turkishName: d.turkish,
      category: TermCategory.DISEASE,
      definition: d.def,
      components: [],
      relatedTerms: [],
      etymology: "",
      usage: "",
      sideEffects: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      synonyms: [],
    })
  );
  return diseases;
};

// Ek bitkiler
const generateMorePlants = () => {
  const plants = [];
  const data = [
    {
      latin: "Aconitum napellus",
      turkish: "Kurt Boğan",
      def: "Zehirli alkaloid bitkisi",
    },
    {
      latin: "Adonis vernalis",
      turkish: "Bahar Adonisi",
      def: "Kardiyak glikozid bitkisi",
    },
    {
      latin: "Agrimonia eupatoria",
      turkish: "Koyun Otu",
      def: "Astrenjan ve anti-inflamatuar bitki",
    },
    {
      latin: "Ajuga reptans",
      turkish: "Mayasıl Otu",
      def: "Yara iyileştirici bitki",
    },
    {
      latin: "Alchemilla vulgaris",
      turkish: "Aslanpençesi",
      def: "Kadın sağlığı bitkisi",
    },
    {
      latin: "Alkanna tinctoria",
      turkish: "Havacıva",
      def: "Boyar madde bitkisi",
    },
    {
      latin: "Anethum graveolens",
      turkish: "Dereotu",
      def: "Sindirim destekleyici bitki",
    },
    {
      latin: "Angelica archangelica",
      turkish: "Melek Otu",
      def: "Sindirim ve solunum bitkisi",
    },
    {
      latin: "Anthemis nobilis",
      turkish: "Roma Papatyası",
      def: "Sakinleştirici bitki",
    },
    {
      latin: "Apium graveolens",
      turkish: "Kereviz",
      def: "Diüretik ve anti-inflamatuar bitki",
    },
    {
      latin: "Armoracia rusticana",
      turkish: "Bayır Turpu",
      def: "Antimikrobiyal bitki",
    },
    {
      latin: "Artemisia absinthium",
      turkish: "Pelin Otu",
      def: "Sindirim ve parazit bitkisi",
    },
    {
      latin: "Artemisia vulgaris",
      turkish: "Yavşan Otu",
      def: "Kadın sağlığı bitkisi",
    },
    {
      latin: "Asparagus officinalis",
      turkish: "Kuşkonmaz",
      def: "Diüretik bitki",
    },
    {
      latin: "Avena sativa",
      turkish: "Yulaf",
      def: "Sinir sistemi besleyici bitki",
    },
    {
      latin: "Ballota nigra",
      turkish: "Kara Ballıbaba",
      def: "Sakinleştirici bitki",
    },
    {
      latin: "Berberis vulgaris",
      turkish: "Kadın Tuzluğu",
      def: "Berberin içeren bitki",
    },
    {
      latin: "Betula pendula",
      turkish: "Huş Ağacı",
      def: "Diüretik ve anti-inflamatuar bitki",
    },
    { latin: "Borago officinalis", turkish: "Hodan", def: "GLA kaynağı bitki" },
    {
      latin: "Brassica nigra",
      turkish: "Siyah Hardal",
      def: "Rubefasyan bitki",
    },
    { latin: "Bryonia alba", turkish: "Ak Asma", def: "Homeopatik bitki" },
    {
      latin: "Calendula officinalis",
      turkish: "Aynısefa",
      def: "Yara iyileştirici bitki",
    },
    {
      latin: "Capsella bursa-pastoris",
      turkish: "Çoban Çantası",
      def: "Hemostatik bitki",
    },
    {
      latin: "Carlina acaulis",
      turkish: "Deve Dikeni",
      def: "Antimikrobiyal bitki",
    },
    { latin: "Carum carvi", turkish: "Kimyon", def: "Karminatif bitki" },
    { latin: "Cassia senna", turkish: "Sinameki", def: "Laksatif bitki" },
    {
      latin: "Centaurea cyanus",
      turkish: "Peygamber Çiçeği",
      def: "Göz sağlığı bitkisi",
    },
    {
      latin: "Centaurium erythraea",
      turkish: "Kantaron",
      def: "Acı tonik bitki",
    },
    {
      latin: "Chelidonium majus",
      turkish: "Kırlangıç Otu",
      def: "Safra akışı bitkisi",
    },
    {
      latin: "Cichorium intybus",
      turkish: "Hindiba",
      def: "Karaciğer destekleyici bitki",
    },
    {
      latin: "Cinnamomum camphora",
      turkish: "Kafur Ağacı",
      def: "Antiseptik bitki",
    },
    {
      latin: "Cnicus benedictus",
      turkish: "Şevketi Bostan",
      def: "Acı tonik bitki",
    },
    {
      latin: "Colchicum autumnale",
      turkish: "Güz Çiğdemi",
      def: "Kolşisin kaynağı bitki",
    },
    {
      latin: "Convallaria majalis",
      turkish: "İnci Çiçeği",
      def: "Kardiyak glikozid bitkisi",
    },
    {
      latin: "Coriandrum sativum",
      turkish: "Kişniş",
      def: "Sindirim destekleyici bitki",
    },
    {
      latin: "Crataegus laevigata",
      turkish: "Alıç",
      def: "Kalp sağlığı bitkisi",
    },
    {
      latin: "Curcuma zedoaria",
      turkish: "Zerdeçal Kökü",
      def: "Anti-inflamatuar bitki",
    },
    {
      latin: "Cynara scolymus",
      turkish: "Enginar",
      def: "Karaciğer ve safra bitkisi",
    },
    {
      latin: "Datura stramonium",
      turkish: "Boru Çiçeği",
      def: "Antikolinerjik bitki",
    },
    {
      latin: "Dioscorea villosa",
      turkish: "Yabani Yam",
      def: "Hormonal denge bitkisi",
    },
    {
      latin: "Drosera rotundifolia",
      turkish: "Güneş Gülü",
      def: "Öksürük kesici bitki",
    },
    {
      latin: "Equisetum arvense",
      turkish: "Kırkkilit Otu",
      def: "Silika kaynağı bitki",
    },
    {
      latin: "Erythroxylum coca",
      turkish: "Koka Bitkisi",
      def: "Kokain kaynağı bitki",
    },
    {
      latin: "Eucalyptus globulus",
      turkish: "Okaliptüs",
      def: "Solunum yolu bitkisi",
    },
    {
      latin: "Eupatorium perfoliatum",
      turkish: "Kemik Otu",
      def: "Ateş düşürücü bitki",
    },
    {
      latin: "Euphrasia officinalis",
      turkish: "Göz Otu",
      def: "Göz sağlığı bitkisi",
    },
    {
      latin: "Filipendula ulmaria",
      turkish: "Çayır Kraliçesi",
      def: "Salisilat içeren bitki",
    },
    { latin: "Foeniculum vulgare", turkish: "Rezene", def: "Karminatif bitki" },
    { latin: "Fragaria vesca", turkish: "Yabani Çilek", def: "Diüretik bitki" },
    {
      latin: "Fraxinus excelsior",
      turkish: "Dişbudak",
      def: "Anti-inflamatuar bitki",
    },
    {
      latin: "Fumaria officinalis",
      turkish: "Şahtere",
      def: "Karaciğer bitkisi",
    },
    {
      latin: "Galega officinalis",
      turkish: "Keçi Sedefi",
      def: "Kan şekeri düzenleyici bitki",
    },
    {
      latin: "Galium aparine",
      turkish: "Yapışkan Ot",
      def: "Lenfatik sistem bitkisi",
    },
    {
      latin: "Gaultheria procumbens",
      turkish: "Kış Yeşili",
      def: "Metil salisilat bitkisi",
    },
    {
      latin: "Gentiana lutea",
      turkish: "Sarı Centiyan",
      def: "Acı tonik bitki",
    },
    {
      latin: "Geranium robertianum",
      turkish: "Turnagagası",
      def: "Astrenjan bitki",
    },
    { latin: "Geum urbanum", turkish: "Meryem Otu", def: "Astrenjan bitki" },
    {
      latin: "Glechoma hederacea",
      turkish: "Yer Sarmaşığı",
      def: "Solunum yolu bitkisi",
    },
    {
      latin: "Glycine max",
      turkish: "Soya Fasulyesi",
      def: "Fitoöstrojen bitkisi",
    },
    {
      latin: "Grindelia robusta",
      turkish: "Grindelia",
      def: "Bronşit bitkisi",
    },
    {
      latin: "Hamamelis virginiana",
      turkish: "Cadı Fındığı",
      def: "Astrenjan bitki",
    },
    { latin: "Hedera helix", turkish: "Sarmaşık", def: "Ekspektoran bitki" },
    {
      latin: "Helichrysum arenarium",
      turkish: "Ölmez Çiçek",
      def: "Safra akışı bitkisi",
    },
    {
      latin: "Helleborus niger",
      turkish: "Kara Çöpleme",
      def: "Kardiyak glikozid bitkisi",
    },
    {
      latin: "Hibiscus sabdariffa",
      turkish: "Hibiskus",
      def: "Kan basıncı düşürücü bitki",
    },
    {
      latin: "Hippophae rhamnoides",
      turkish: "Yabani İğde",
      def: "Antioksidan bitki",
    },
    {
      latin: "Humulus lupulus",
      turkish: "Şerbetçi Otu",
      def: "Sakinleştirici bitki",
    },
    {
      latin: "Hydrastis canadensis",
      turkish: "Altın Mühür",
      def: "Berberin içeren bitki",
    },
    {
      latin: "Hyoscyamus niger",
      turkish: "Banotu",
      def: "Antikolinerjik bitki",
    },
    {
      latin: "Hyssopus officinalis",
      turkish: "Çördük Otu",
      def: "Ekspektoran bitki",
    },
    {
      latin: "Ilex paraguariensis",
      turkish: "Mate",
      def: "Kafein içeren bitki",
    },
    { latin: "Inula helenium", turkish: "Andız Otu", def: "Ekspektoran bitki" },
    { latin: "Iris germanica", turkish: "Süsen", def: "Ekspektoran bitki" },
    { latin: "Juglans regia", turkish: "Ceviz", def: "Astrenjan bitki" },
    { latin: "Juniperus communis", turkish: "Ardıç", def: "Diüretik bitki" },
    {
      latin: "Lamium album",
      turkish: "Ballıbaba",
      def: "Kadın sağlığı bitkisi",
    },
    {
      latin: "Laurus nobilis",
      turkish: "Defne",
      def: "Sindirim destekleyici bitki",
    },
    {
      latin: "Leonurus cardiaca",
      turkish: "Aslanpençesi",
      def: "Kalp ve sinir bitkisi",
    },
    {
      latin: "Levisticum officinale",
      turkish: "Selam Otu",
      def: "Diüretik bitki",
    },
    {
      latin: "Linum usitatissimum",
      turkish: "Keten",
      def: "Omega-3 ve lif bitkisi",
    },
    {
      latin: "Lobelia inflata",
      turkish: "Lobelia",
      def: "Solunum yolu bitkisi",
    },
    {
      latin: "Lycopus europaeus",
      turkish: "Su Nanesi",
      def: "Tiroid düzenleyici bitki",
    },
    {
      latin: "Malva sylvestris",
      turkish: "Ebegümeci",
      def: "Yumuşatıcı bitki",
    },
    { latin: "Marrubium vulgare", turkish: "Boz Ot", def: "Ekspektoran bitki" },
    {
      latin: "Melilotus officinalis",
      turkish: "Sarı Taş Yoncası",
      def: "Venöz yetmezlik bitkisi",
    },
    {
      latin: "Mentha arvensis",
      turkish: "Tarla Nanesi",
      def: "Mentol kaynağı bitki",
    },
    {
      latin: "Menyanthes trifoliata",
      turkish: "Su Yoncası",
      def: "Acı tonik bitki",
    },
    { latin: "Myrtus communis", turkish: "Mersin", def: "Antiseptik bitki" },
    {
      latin: "Nepeta cataria",
      turkish: "Kedi Nanesi",
      def: "Sakinleştirici bitki",
    },
    {
      latin: "Olea europaea",
      turkish: "Zeytin",
      def: "Kardiyovasküler sağlık bitkisi",
    },
    { latin: "Ononis spinosa", turkish: "Kayış Kıran", def: "Diüretik bitki" },
    {
      latin: "Origanum majorana",
      turkish: "Mercanköşk",
      def: "Sindirim ve sakinleştirici bitki",
    },
    {
      latin: "Orthosiphon stamineus",
      turkish: "Java Çayı",
      def: "Diüretik bitki",
    },
    {
      latin: "Paeonia officinalis",
      turkish: "Şakayık",
      def: "Antispazmodik bitki",
    },
    {
      latin: "Papaver rhoeas",
      turkish: "Gelincik",
      def: "Hafif sedatif bitki",
    },
    {
      latin: "Petroselinum crispum",
      turkish: "Maydanoz",
      def: "Diüretik bitki",
    },
    {
      latin: "Phytolacca americana",
      turkish: "Şeker Pancarı",
      def: "Lenfatik sistem bitkisi",
    },
    { latin: "Pimpinella anisum", turkish: "Anason", def: "Karminatif bitki" },
    {
      latin: "Pinus sylvestris",
      turkish: "Sarıçam",
      def: "Solunum yolu bitkisi",
    },
    {
      latin: "Plantago lanceolata",
      turkish: "Dar Yapraklı Sinirotu",
      def: "Ekspektoran bitki",
    },
    {
      latin: "Podophyllum peltatum",
      turkish: "Mayapple",
      def: "Podofilotoksin bitkisi",
    },
    {
      latin: "Polygala senega",
      turkish: "Senega Kökü",
      def: "Ekspektoran bitki",
    },
    { latin: "Polygonum aviculare", turkish: "Kuş Otu", def: "Diüretik bitki" },
    {
      latin: "Populus tremula",
      turkish: "Titrek Kavak",
      def: "Anti-inflamatuar bitki",
    },
    {
      latin: "Potentilla erecta",
      turkish: "Beş Parmak Otu",
      def: "Astrenjan bitki",
    },
    {
      latin: "Primula veris",
      turkish: "Çuha Çiçeği",
      def: "Ekspektoran bitki",
    },
    { latin: "Prunus spinosa", turkish: "Çakal Eriği", def: "Laksatif bitki" },
    {
      latin: "Pulmonaria officinalis",
      turkish: "Ciğer Otu",
      def: "Solunum yolu bitkisi",
    },
    { latin: "Quercus robur", turkish: "Meşe", def: "Astrenjan bitki" },
    {
      latin: "Rhamnus frangula",
      turkish: "Barut Ağacı",
      def: "Laksatif bitki",
    },
    { latin: "Rheum palmatum", turkish: "Ravent", def: "Laksatif bitki" },
    {
      latin: "Ribes nigrum",
      turkish: "Siyah Frenk Üzümü",
      def: "Anti-inflamatuar bitki",
    },
    { latin: "Rosa canina", turkish: "Kuşburnu", def: "C vitamini bitkisi" },
    {
      latin: "Rosmarinus officinalis",
      turkish: "Biberiye",
      def: "Antioksidan bitki",
    },
    { latin: "Rubus idaeus", turkish: "Ahududu", def: "Kadın sağlığı bitkisi" },
    {
      latin: "Rumex crispus",
      turkish: "Kıvırcık Labada",
      def: "Laksatif bitki",
    },
    {
      latin: "Ruscus aculeatus",
      turkish: "Tavşan Memesi",
      def: "Venöz yetmezlik bitkisi",
    },
    {
      latin: "Ruta graveolens",
      turkish: "Sedef Otu",
      def: "Antispazmodik bitki",
    },
    {
      latin: "Salix alba",
      turkish: "Beyaz Söğüt",
      def: "Salisin kaynağı bitki",
    },
    {
      latin: "Salvia officinalis",
      turkish: "Adaçayı",
      def: "Antiseptik bitki",
    },
    {
      latin: "Sambucus nigra",
      turkish: "Mürver",
      def: "Soğuk algınlığı bitkisi",
    },
    {
      latin: "Sanguinaria canadensis",
      turkish: "Kan Kökü",
      def: "Ekspektoran bitki",
    },
    {
      latin: "Saponaria officinalis",
      turkish: "Çöven",
      def: "Ekspektoran bitki",
    },
    {
      latin: "Satureja hortensis",
      turkish: "Sater",
      def: "Antimikrobiyal bitki",
    },
    {
      latin: "Scrophularia nodosa",
      turkish: "Sıraca Otu",
      def: "Lenfatik sistem bitkisi",
    },
    {
      latin: "Senecio vulgaris",
      turkish: "Kanarya Otu",
      def: "Emenagog bitki",
    },
    {
      latin: "Silybum marianum",
      turkish: "Deve Dikeni",
      def: "Karaciğer koruyucu bitki",
    },
    {
      latin: "Solidago virgaurea",
      turkish: "Altın Başak",
      def: "Diüretik bitki",
    },
    {
      latin: "Stachys officinalis",
      turkish: "Betonica",
      def: "Sinir sistemi bitkisi",
    },
    {
      latin: "Stellaria media",
      turkish: "Kuş Otu",
      def: "Cilt sağlığı bitkisi",
    },
    {
      latin: "Symphytum officinale",
      turkish: "Karakafes Otu",
      def: "Yara iyileştirici bitki",
    },
    {
      latin: "Tanacetum parthenium",
      turkish: "Gümüş Düğme",
      def: "Migren bitkisi",
    },
    {
      latin: "Tanacetum vulgare",
      turkish: "Solucan Otu",
      def: "Antihelmintik bitki",
    },
    {
      latin: "Taraxacum officinale",
      turkish: "Karahindiba",
      def: "Karaciğer ve böbrek bitkisi",
    },
    {
      latin: "Teucrium chamaedrys",
      turkish: "Kısamahmut",
      def: "Sindirim bitkisi",
    },
    { latin: "Thymus serpyllum", turkish: "Kekik", def: "Antiseptik bitki" },
    { latin: "Tilia cordata", turkish: "Ihlamur", def: "Sakinleştirici bitki" },
    {
      latin: "Trigonella foenum-graecum",
      turkish: "Çemen Otu",
      def: "Kan şekeri düzenleyici bitki",
    },
    {
      latin: "Tropaeolum majus",
      turkish: "Latin Çiçeği",
      def: "Antimikrobiyal bitki",
    },
    {
      latin: "Tussilago farfara",
      turkish: "Öksürük Otu",
      def: "Ekspektoran bitki",
    },
    {
      latin: "Ulmus rubra",
      turkish: "Kaygan Karaağaç",
      def: "Yumuşatıcı bitki",
    },
    {
      latin: "Urtica dioica",
      turkish: "Isırgan Otu",
      def: "Anti-inflamatuar bitki",
    },
    {
      latin: "Vaccinium macrocarpon",
      turkish: "Turna Yemişi",
      def: "İdrar yolu sağlığı bitkisi",
    },
    {
      latin: "Valeriana officinalis",
      turkish: "Kediotu",
      def: "Sakinleştirici bitki",
    },
    {
      latin: "Verbascum thapsus",
      turkish: "Sığır Kuyruğu",
      def: "Solunum yolu bitkisi",
    },
    {
      latin: "Verbena officinalis",
      turkish: "Mine Çiçeği",
      def: "Sinir sistemi bitkisi",
    },
    {
      latin: "Veronica officinalis",
      turkish: "Yavşan Otu",
      def: "Ekspektoran bitki",
    },
    {
      latin: "Viburnum opulus",
      turkish: "Gilaburu",
      def: "Antispazmodik bitki",
    },
    {
      latin: "Vinca minor",
      turkish: "Cezayir Menekşesi",
      def: "Serebral dolaşım bitkisi",
    },
    {
      latin: "Viola tricolor",
      turkish: "Hercai Menekşe",
      def: "Cilt sağlığı bitkisi",
    },
    {
      latin: "Viscum album",
      turkish: "Ökse Otu",
      def: "Kan basıncı düşürücü bitki",
    },
    {
      latin: "Vitex agnus-castus",
      turkish: "Hayıt",
      def: "Kadın hormonal denge bitkisi",
    },
    {
      latin: "Zingiber officinale",
      turkish: "Zencefil",
      def: "Anti-inflamatuar bitki",
    },
  ];
  data.forEach((d) =>
    plants.push({
      latinName: d.latin,
      turkishName: d.turkish,
      category: TermCategory.PLANT,
      definition: d.def,
      components: [],
      relatedTerms: [],
      etymology: "",
      usage: "",
      sideEffects: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      synonyms: [],
    })
  );
  return plants;
};

// Ek anatomi terimleri
const generateMoreAnatomy = () => {
  const anatomy = [];
  const data = [
    // Sindirim sistemi
    {
      latin: "Oral cavity",
      turkish: "Ağız Boşluğu",
      def: "Sindirim sisteminin başlangıcı",
    },
    { latin: "Tongue", turkish: "Dil", def: "Tat alma ve yutma organı" },
    {
      latin: "Salivary glands",
      turkish: "Tükürük Bezleri",
      def: "Tükürük üreten bezler",
    },
    {
      latin: "Parotid gland",
      turkish: "Parotis Bezi",
      def: "En büyük tükürük bezi",
    },
    {
      latin: "Submandibular gland",
      turkish: "Submandibüler Bez",
      def: "Çene altı tükürük bezi",
    },
    {
      latin: "Sublingual gland",
      turkish: "Sublingual Bez",
      def: "Dil altı tükürük bezi",
    },
    { latin: "Pharynx", turkish: "Farinks", def: "Yutak" },
    { latin: "Nasopharynx", turkish: "Nazofarinks", def: "Burun arkası yutak" },
    { latin: "Oropharynx", turkish: "Orofarinks", def: "Ağız arkası yutak" },
    {
      latin: "Laryngopharynx",
      turkish: "Laringofarinks",
      def: "Gırtlak arkası yutak",
    },
    { latin: "Esophagus", turkish: "Özofagus", def: "Yemek borusu" },
    { latin: "Stomach", turkish: "Mide", def: "Sindirim organı" },
    { latin: "Cardia", turkish: "Kardiya", def: "Mide girişi" },
    {
      latin: "Fundus of stomach",
      turkish: "Mide Fundusu",
      def: "Mide üst kısmı",
    },
    {
      latin: "Body of stomach",
      turkish: "Mide Gövdesi",
      def: "Mide orta kısmı",
    },
    { latin: "Pylorus", turkish: "Pilor", def: "Mide çıkışı" },
    {
      latin: "Small intestine",
      turkish: "İnce Bağırsak",
      def: "Besin emilimi organı",
    },
    { latin: "Duodenum", turkish: "Duodenum", def: "Onikiparmak bağırsağı" },
    { latin: "Jejunum", turkish: "Jejunum", def: "Boş bağırsak" },
    { latin: "Ileum", turkish: "İleum", def: "Kıvrım bağırsak" },
    {
      latin: "Large intestine",
      turkish: "Kalın Bağırsak",
      def: "Su emilimi organı",
    },
    { latin: "Cecum", turkish: "Çekum", def: "Kör bağırsak" },
    { latin: "Appendix", turkish: "Apendiks", def: "Kör bağırsak uzantısı" },
    {
      latin: "Ascending colon",
      turkish: "Çıkan Kolon",
      def: "Yükselen kalın bağırsak",
    },
    {
      latin: "Transverse colon",
      turkish: "Transvers Kolon",
      def: "Enine kalın bağırsak",
    },
    {
      latin: "Descending colon",
      turkish: "İnen Kolon",
      def: "Alçalan kalın bağırsak",
    },
    {
      latin: "Sigmoid colon",
      turkish: "Sigmoid Kolon",
      def: "S şekilli kalın bağırsak",
    },
    { latin: "Rectum", turkish: "Rektum", def: "Düz bağırsak" },
    { latin: "Anal canal", turkish: "Anal Kanal", def: "Anüs kanalı" },
    { latin: "Liver", turkish: "Karaciğer", def: "Metabolizma organı" },
    {
      latin: "Right lobe of liver",
      turkish: "Karaciğer Sağ Lobu",
      def: "Karaciğer sağ kısmı",
    },
    {
      latin: "Left lobe of liver",
      turkish: "Karaciğer Sol Lobu",
      def: "Karaciğer sol kısmı",
    },
    {
      latin: "Caudate lobe",
      turkish: "Kaudat Lob",
      def: "Karaciğer kuyruklu lobu",
    },
    {
      latin: "Quadrate lobe",
      turkish: "Kuadrat Lob",
      def: "Karaciğer dörtgen lobu",
    },
    {
      latin: "Gallbladder",
      turkish: "Safra Kesesi",
      def: "Safra depolama organı",
    },
    { latin: "Bile duct", turkish: "Safra Kanalı", def: "Safra taşıma yolu" },
    {
      latin: "Common bile duct",
      turkish: "Ana Safra Kanalı",
      def: "Ortak safra kanalı",
    },
    {
      latin: "Cystic duct",
      turkish: "Sistik Kanal",
      def: "Safra kesesi kanalı",
    },
    {
      latin: "Hepatic duct",
      turkish: "Hepatik Kanal",
      def: "Karaciğer safra kanalı",
    },
    {
      latin: "Pancreas",
      turkish: "Pankreas",
      def: "Sindirim ve hormon organı",
    },
    {
      latin: "Head of pancreas",
      turkish: "Pankreas Başı",
      def: "Pankreas sağ kısmı",
    },
    {
      latin: "Body of pancreas",
      turkish: "Pankreas Gövdesi",
      def: "Pankreas orta kısmı",
    },
    {
      latin: "Tail of pancreas",
      turkish: "Pankreas Kuyruğu",
      def: "Pankreas sol kısmı",
    },
    {
      latin: "Pancreatic duct",
      turkish: "Pankreas Kanalı",
      def: "Pankreas salgı kanalı",
    },
    {
      latin: "Islets of Langerhans",
      turkish: "Langerhans Adacıkları",
      def: "Pankreas endokrin hücreleri",
    },
    { latin: "Peritoneum", turkish: "Periton", def: "Karın zarı" },
    { latin: "Mesentery", turkish: "Mezenter", def: "Bağırsak askısı" },
    { latin: "Omentum", turkish: "Omentum", def: "Karın yağ örtüsü" },
    {
      latin: "Greater omentum",
      turkish: "Büyük Omentum",
      def: "Büyük karın önlüğü",
    },
    {
      latin: "Lesser omentum",
      turkish: "Küçük Omentum",
      def: "Küçük karın önlüğü",
    },

    // Solunum sistemi
    {
      latin: "Nasal cavity",
      turkish: "Burun Boşluğu",
      def: "Burun iç boşluğu",
    },
    { latin: "Nasal septum", turkish: "Burun Septumu", def: "Burun bölmesi" },
    {
      latin: "Nasal conchae",
      turkish: "Burun Konkaları",
      def: "Burun kemik çıkıntıları",
    },
    {
      latin: "Paranasal sinuses",
      turkish: "Paranazal Sinüsler",
      def: "Burun çevresi boşlukları",
    },
    {
      latin: "Maxillary sinus",
      turkish: "Maksiller Sinüs",
      def: "Üst çene sinüsü",
    },
    { latin: "Frontal sinus", turkish: "Frontal Sinüs", def: "Alın sinüsü" },
    { latin: "Ethmoid sinus", turkish: "Etmoid Sinüs", def: "Kalbur sinüsü" },
    {
      latin: "Sphenoid sinus",
      turkish: "Sfenoid Sinüs",
      def: "Kelebek sinüsü",
    },
    { latin: "Larynx", turkish: "Larinks", def: "Gırtlak" },
    { latin: "Epiglottis", turkish: "Epiglot", def: "Gırtlak kapağı" },
    {
      latin: "Thyroid cartilage",
      turkish: "Tiroid Kıkırdak",
      def: "Kalkan kıkırdak",
    },
    {
      latin: "Cricoid cartilage",
      turkish: "Krikoid Kıkırdak",
      def: "Yüzük kıkırdak",
    },
    {
      latin: "Arytenoid cartilage",
      turkish: "Aritenoid Kıkırdak",
      def: "İbrik kıkırdak",
    },
    { latin: "Vocal cords", turkish: "Ses Telleri", def: "Ses üreten yapılar" },
    { latin: "Trachea", turkish: "Trakea", def: "Nefes borusu" },
    { latin: "Bronchi", turkish: "Bronşlar", def: "Ana hava yolları" },
    {
      latin: "Right main bronchus",
      turkish: "Sağ Ana Bronş",
      def: "Sağ akciğer bronşu",
    },
    {
      latin: "Left main bronchus",
      turkish: "Sol Ana Bronş",
      def: "Sol akciğer bronşu",
    },
    {
      latin: "Bronchioles",
      turkish: "Bronşiyoller",
      def: "Küçük hava yolları",
    },
    { latin: "Alveoli", turkish: "Alveoller", def: "Hava kesecikleri" },
    { latin: "Lungs", turkish: "Akciğerler", def: "Solunum organları" },
    { latin: "Right lung", turkish: "Sağ Akciğer", def: "Üç loblu akciğer" },
    { latin: "Left lung", turkish: "Sol Akciğer", def: "İki loblu akciğer" },
    {
      latin: "Pulmonary hilum",
      turkish: "Akciğer Hilumu",
      def: "Akciğer kapısı",
    },
    { latin: "Pleura", turkish: "Plevra", def: "Akciğer zarı" },
    {
      latin: "Visceral pleura",
      turkish: "Visseral Plevra",
      def: "İç akciğer zarı",
    },
    {
      latin: "Parietal pleura",
      turkish: "Parietal Plevra",
      def: "Dış akciğer zarı",
    },
    {
      latin: "Pleural cavity",
      turkish: "Plevral Boşluk",
      def: "Akciğer zarları arası boşluk",
    },
    { latin: "Diaphragm", turkish: "Diyafram", def: "Solunum kası" },

    // Ürogenital sistem
    { latin: "Kidneys", turkish: "Böbrekler", def: "İdrar üreten organlar" },
    {
      latin: "Renal cortex",
      turkish: "Böbrek Korteksi",
      def: "Böbrek dış tabakası",
    },
    {
      latin: "Renal medulla",
      turkish: "Böbrek Medullası",
      def: "Böbrek iç tabakası",
    },
    { latin: "Renal pelvis", turkish: "Böbrek Pelvisi", def: "Böbrek havuzu" },
    { latin: "Nephron", turkish: "Nefron", def: "Böbrek fonksiyonel birimi" },
    {
      latin: "Glomerulus",
      turkish: "Glomerül",
      def: "Böbrek kılcal damar yumağı",
    },
    {
      latin: "Bowman capsule",
      turkish: "Bowman Kapsülü",
      def: "Glomerül kapsülü",
    },
    {
      latin: "Proximal tubule",
      turkish: "Proksimal Tübül",
      def: "Yakın böbrek tübülü",
    },
    {
      latin: "Loop of Henle",
      turkish: "Henle Kulpu",
      def: "Böbrek tübül kıvrımı",
    },
    {
      latin: "Distal tubule",
      turkish: "Distal Tübül",
      def: "Uzak böbrek tübülü",
    },
    {
      latin: "Collecting duct",
      turkish: "Toplayıcı Kanal",
      def: "İdrar toplama kanalı",
    },
    { latin: "Ureters", turkish: "Üreterler", def: "İdrar taşıma kanalları" },
    { latin: "Urinary bladder", turkish: "Mesane", def: "İdrar kesesi" },
    { latin: "Trigone", turkish: "Trigon", def: "Mesane üçgeni" },
    { latin: "Urethra", turkish: "Üretra", def: "İdrar kanalı" },
    {
      latin: "Male urethra",
      turkish: "Erkek Üretrası",
      def: "Erkek idrar kanalı",
    },
    {
      latin: "Female urethra",
      turkish: "Kadın Üretrası",
      def: "Kadın idrar kanalı",
    },
    {
      latin: "Prostate gland",
      turkish: "Prostat Bezi",
      def: "Erkek üreme bezi",
    },
    {
      latin: "Seminal vesicles",
      turkish: "Seminal Veziküller",
      def: "Meni keseleri",
    },
    {
      latin: "Bulbourethral glands",
      turkish: "Bulboüretral Bezler",
      def: "Cowper bezleri",
    },
    { latin: "Testes", turkish: "Testisler", def: "Erkek üreme bezleri" },
    {
      latin: "Seminiferous tubules",
      turkish: "Seminifer Tübüller",
      def: "Sperm üreten tübüller",
    },
    {
      latin: "Epididymis",
      turkish: "Epididimis",
      def: "Sperm olgunlaşma organı",
    },
    {
      latin: "Vas deferens",
      turkish: "Vas Deferens",
      def: "Sperm taşıma kanalı",
    },
    {
      latin: "Ejaculatory duct",
      turkish: "Ejakülatör Kanal",
      def: "Boşalma kanalı",
    },
    { latin: "Penis", turkish: "Penis", def: "Erkek cinsel organı" },
    {
      latin: "Corpus cavernosum",
      turkish: "Korpus Kavernozum",
      def: "Penis erektil dokusu",
    },
    {
      latin: "Corpus spongiosum",
      turkish: "Korpus Spongiozum",
      def: "Penis süngerimsi dokusu",
    },
    { latin: "Glans penis", turkish: "Glans Penis", def: "Penis başı" },
    { latin: "Prepuce", turkish: "Prepus", def: "Sünnet derisi" },
    { latin: "Scrotum", turkish: "Skrotum", def: "Testis torbası" },
    { latin: "Ovaries", turkish: "Overler", def: "Kadın üreme bezleri" },
    {
      latin: "Ovarian follicle",
      turkish: "Over Folikülü",
      def: "Yumurta kesesi",
    },
    { latin: "Corpus luteum", turkish: "Korpus Luteum", def: "Sarı cisim" },
    {
      latin: "Fallopian tubes",
      turkish: "Fallop Tüpleri",
      def: "Yumurta kanalları",
    },
    { latin: "Fimbriae", turkish: "Fimbriyalar", def: "Tüp saçakları" },
    { latin: "Uterus", turkish: "Uterus", def: "Rahim" },
    {
      latin: "Fundus of uterus",
      turkish: "Uterus Fundusu",
      def: "Rahim tabanı",
    },
    {
      latin: "Body of uterus",
      turkish: "Uterus Gövdesi",
      def: "Rahim gövdesi",
    },
    { latin: "Cervix", turkish: "Serviks", def: "Rahim boynu" },
    { latin: "Endometrium", turkish: "Endometriyum", def: "Rahim iç tabakası" },
    { latin: "Myometrium", turkish: "Miyometriyum", def: "Rahim kas tabakası" },
    {
      latin: "Perimetrium",
      turkish: "Perimetriyum",
      def: "Rahim dış tabakası",
    },
    { latin: "Vagina", turkish: "Vajina", def: "Kadın cinsel organı" },
    { latin: "Vulva", turkish: "Vulva", def: "Dış kadın genital organları" },
    { latin: "Labia majora", turkish: "Labia Majora", def: "Büyük dudaklar" },
    { latin: "Labia minora", turkish: "Labia Minora", def: "Küçük dudaklar" },
    { latin: "Clitoris", turkish: "Klitoris", def: "Kadın erektil organı" },
    {
      latin: "Bartholin glands",
      turkish: "Bartholin Bezleri",
      def: "Vajinal lubrikasyon bezleri",
    },
    {
      latin: "Mammary glands",
      turkish: "Meme Bezleri",
      def: "Süt üreten bezler",
    },
    { latin: "Nipple", turkish: "Meme Başı", def: "Meme ucu" },
    { latin: "Areola", turkish: "Areola", def: "Meme başı çevresi" },
    {
      latin: "Lactiferous ducts",
      turkish: "Süt Kanalları",
      def: "Süt taşıma kanalları",
    },
  ];
  data.forEach((d) =>
    anatomy.push({
      latinName: d.latin,
      turkishName: d.turkish,
      category: TermCategory.ANATOMY,
      definition: d.def,
      components: [],
      relatedTerms: [],
      etymology: "",
      usage: "",
      sideEffects: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      synonyms: [],
    })
  );
  return anatomy;
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Ek Terimler Firebase Yükleme Başlıyor...\n");

  console.log("📝 Terimler oluşturuluyor...");
  const dermatologyDrugs = generateDermatologyDrugs();
  const ophthalmologyDrugs = generateOphthalmologyDrugs();
  const oncologyDrugs = generateOncologyDrugs();
  const immunotherapyDrugs = generateImmunotherapyDrugs();
  const moreDiseases2 = generateMoreDiseases2();
  const urologyDiseases = generateUrologyDiseases();
  const morePlants = generateMorePlants();
  const moreAnatomy = generateMoreAnatomy();

  const allTerms = [
    ...dermatologyDrugs,
    ...ophthalmologyDrugs,
    ...oncologyDrugs,
    ...immunotherapyDrugs,
    ...moreDiseases2,
    ...urologyDiseases,
    ...morePlants,
    ...moreAnatomy,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Dermatoloji İlaçları: ${dermatologyDrugs.length}`);
  console.log(`   Oftalmoloji İlaçları: ${ophthalmologyDrugs.length}`);
  console.log(`   Onkoloji İlaçları: ${oncologyDrugs.length}`);
  console.log(`   İmmünoterapi İlaçları: ${immunotherapyDrugs.length}`);
  console.log(`   Ek Hastalıklar: ${moreDiseases2.length}`);
  console.log(`   Üroloji Hastalıkları: ${urologyDiseases.length}`);
  console.log(`   Ek Bitkiler: ${morePlants.length}`);
  console.log(`   Ek Anatomi: ${moreAnatomy.length}`);
  console.log(`   ─────────────────────`);
  console.log(`   TOPLAM: ${allTerms.length} terim\n`);

  // Mevcut terimleri al
  console.log("🔍 Mevcut terimler kontrol ediliyor...");
  const termsRef = collection(db, "terms");
  const existingSnapshot = await getDocs(termsRef);
  const existingTerms = new Set();

  existingSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    existingTerms.add(data.latinName?.toLowerCase());
    existingTerms.add(data.turkishName?.toLowerCase());
  });

  console.log(`   Mevcut terim sayısı: ${existingSnapshot.size}`);

  // Duplikasyonları filtrele
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

  // Batch yükleme
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

  console.log("\n" + "═".repeat(50));
  console.log("📊 YÜKLEME TAMAMLANDI");
  console.log("═".repeat(50));
  console.log(`   Önceki terim sayısı: ${existingSnapshot.size}`);
  console.log(`   Yeni eklenen: ${uploadedCount}`);
  console.log(
    `   Toplam terim sayısı: ${existingSnapshot.size + uploadedCount}`
  );
  console.log("═".repeat(50) + "\n");

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Hata:", error);
  process.exit(1);
});
