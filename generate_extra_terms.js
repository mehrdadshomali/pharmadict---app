// Extra terim üretme scripti - 10,000 terime ulaşmak için
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
// EK İLAÇLAR - Bölüm 1
const generateDrugs1 = () => {
  const drugList = [
    // Analjezikler ve Antiinflamatuarlar
    ["Acetaminophen", "Asetaminofen", "Parasetamol, analjezik"],
    ["Aspirin", "Aspirin", "Asetilsalisilik asit"],
    ["Ibuprofen", "İbuprofen", "NSAID"],
    ["Naproxen", "Naproksen", "NSAID"],
    ["Diclofenac", "Diklofenak", "NSAID"],
    ["Indomethacin", "İndometasin", "NSAID"],
    ["Piroxicam", "Piroksikam", "NSAID"],
    ["Meloxicam", "Meloksikam", "COX-2 selektif NSAID"],
    ["Celecoxib", "Selekoksib", "COX-2 inhibitörü"],
    ["Etoricoxib", "Etorikoksib", "COX-2 inhibitörü"],
    ["Ketorolac", "Ketorolak", "NSAID, analjezik"],
    ["Ketoprofen", "Ketoprofen", "NSAID"],
    ["Flurbiprofen", "Flurbiprofen", "NSAID"],
    ["Fenoprofen", "Fenoprofen", "NSAID"],
    ["Oxaprozin", "Oksaprozin", "NSAID"],
    ["Sulindac", "Sulindak", "NSAID"],
    ["Tolmetin", "Tolmetin", "NSAID"],
    ["Etodolac", "Etodolak", "NSAID"],
    ["Nabumetone", "Nabumeton", "NSAID"],
    ["Mefenamic acid", "Mefenamik Asit", "NSAID"],
    ["Meclofenamate", "Meklofenamat", "NSAID"],
    // Opioidler
    ["Morphine", "Morfin", "Opioid analjezik"],
    ["Codeine", "Kodein", "Opioid analjezik"],
    ["Oxycodone", "Oksikodon", "Opioid analjezik"],
    ["Hydrocodone", "Hidrokodon", "Opioid analjezik"],
    ["Hydromorphone", "Hidromorfon", "Opioid analjezik"],
    ["Fentanyl", "Fentanil", "Sentetik opioid"],
    ["Sufentanil", "Sufentanil", "Sentetik opioid"],
    ["Alfentanil", "Alfentanil", "Sentetik opioid"],
    ["Remifentanil", "Remifentanil", "Ultra kısa etkili opioid"],
    ["Methadone", "Metadon", "Opioid, bağımlılık tedavisi"],
    ["Buprenorphine", "Buprenorfin", "Parsiyel opioid agonist"],
    ["Tramadol", "Tramadol", "Atipik opioid"],
    ["Tapentadol", "Tapentadol", "Atipik opioid"],
    ["Meperidine", "Meperidin", "Opioid analjezik"],
    ["Pentazocine", "Pentazosin", "Opioid agonist-antagonist"],
    ["Butorphanol", "Butorfanol", "Opioid agonist-antagonist"],
    ["Nalbuphine", "Nalbufin", "Opioid agonist-antagonist"],
    ["Naloxone", "Nalokson", "Opioid antagonist"],
    ["Naltrexone", "Naltrekson", "Opioid antagonist"],
    ["Nalmefene", "Nalmefen", "Opioid antagonist"],
    // Anestezikler
    ["Propofol", "Propofol", "IV anestezik"],
    ["Etomidate", "Etomidat", "IV anestezik"],
    ["Ketamine", "Ketamin", "Disosiyatif anestezik"],
    ["Thiopental", "Tiyopental", "Barbitürat anestezik"],
    ["Methohexital", "Metoheksital", "Barbitürat anestezik"],
    ["Midazolam", "Midazolam", "Benzodiazepin, sedasyon"],
    ["Dexmedetomidine", "Deksmedetomidin", "Alfa-2 agonist, sedasyon"],
    ["Sevoflurane", "Sevofluran", "İnhalasyon anestezik"],
    ["Desflurane", "Desfluran", "İnhalasyon anestezik"],
    ["Isoflurane", "İzofluran", "İnhalasyon anestezik"],
    ["Nitrous oxide", "Azot Protoksit", "Güldürücü gaz"],
    ["Halothane", "Halotan", "İnhalasyon anestezik"],
    ["Enflurane", "Enfluran", "İnhalasyon anestezik"],
    ["Lidocaine", "Lidokain", "Lokal anestezik"],
    ["Bupivacaine", "Bupivakain", "Lokal anestezik"],
    ["Ropivacaine", "Ropivakain", "Lokal anestezik"],
    ["Mepivacaine", "Mepivakain", "Lokal anestezik"],
    ["Prilocaine", "Prilokain", "Lokal anestezik"],
    ["Articaine", "Artikain", "Lokal anestezik"],
    ["Chloroprocaine", "Kloroprokain", "Lokal anestezik"],
    ["Tetracaine", "Tetrakain", "Lokal anestezik"],
    ["Benzocaine", "Benzokain", "Topikal anestezik"],
    ["Procaine", "Prokain", "Lokal anestezik"],
    // Kas gevşeticiler
    ["Succinylcholine", "Süksinilkolin", "Depolarize edici kas gevşetici"],
    ["Rocuronium", "Rokuronyum", "Non-depolarize kas gevşetici"],
    ["Vecuronium", "Vekuronyum", "Non-depolarize kas gevşetici"],
    ["Atracurium", "Atrakuryum", "Non-depolarize kas gevşetici"],
    ["Cisatracurium", "Sisatrakuryum", "Non-depolarize kas gevşetici"],
    ["Pancuronium", "Pankuronyum", "Non-depolarize kas gevşetici"],
    ["Mivacurium", "Mivakuryum", "Non-depolarize kas gevşetici"],
    ["Sugammadex", "Sugammadeks", "Kas gevşetici antagonisti"],
    ["Neostigmine", "Neostigmin", "Kolinesteraz inhibitörü"],
    ["Pyridostigmine", "Piridostigmin", "Kolinesteraz inhibitörü"],
    ["Edrophonium", "Edrofonyum", "Kolinesteraz inhibitörü"],
    ["Baclofen", "Baklofen", "GABA-B agonist, spastisite"],
    ["Tizanidine", "Tizanidin", "Alfa-2 agonist, spastisite"],
    ["Cyclobenzaprine", "Siklobenzaprin", "Kas gevşetici"],
    ["Methocarbamol", "Metokarbamol", "Kas gevşetici"],
    ["Carisoprodol", "Karisoprodol", "Kas gevşetici"],
    ["Orphenadrine", "Orfenadrin", "Kas gevşetici"],
    ["Chlorzoxazone", "Klorzoksazon", "Kas gevşetici"],
    ["Metaxalone", "Metaksalon", "Kas gevşetici"],
    ["Dantrolene", "Dantrolen", "Direkt kas gevşetici"],
    // Antihistaminikler
    ["Diphenhydramine", "Difenhidramin", "1. kuşak antihistaminik"],
    ["Chlorpheniramine", "Klorfeniramin", "1. kuşak antihistaminik"],
    ["Brompheniramine", "Bromfeniramin", "1. kuşak antihistaminik"],
    ["Dexchlorpheniramine", "Deksklorfeniramin", "1. kuşak antihistaminik"],
    ["Triprolidine", "Triprolidin", "1. kuşak antihistaminik"],
    ["Promethazine", "Prometazin", "1. kuşak antihistaminik"],
    ["Hydroxyzine", "Hidroksizin", "1. kuşak antihistaminik"],
    ["Cyproheptadine", "Siproheptadin", "1. kuşak antihistaminik"],
    ["Meclizine", "Meklizin", "Antihistaminik, vertigo"],
    ["Dimenhydrinate", "Dimenhidrinat", "Antihistaminik, antiemetik"],
    ["Cetirizine", "Setirizin", "2. kuşak antihistaminik"],
    ["Levocetirizine", "Levosetirizin", "2. kuşak antihistaminik"],
    ["Loratadine", "Loratadin", "2. kuşak antihistaminik"],
    ["Desloratadine", "Desloratadin", "2. kuşak antihistaminik"],
    ["Fexofenadine", "Feksofenadin", "2. kuşak antihistaminik"],
    ["Azelastine", "Azelastin", "Antihistaminik nazal sprey"],
    ["Olopatadine", "Olopatadin", "Antihistaminik göz damlası"],
    ["Ketotifen", "Ketotifen", "Antihistaminik, mast hücre stabilizatörü"],
    ["Bilastine", "Bilastin", "2. kuşak antihistaminik"],
    ["Rupatadine", "Rupatadinr", "2. kuşak antihistaminik"],
    ["Ebastine", "Ebastin", "2. kuşak antihistaminik"],
    // Antidepresanlar
    ["Fluoxetine", "Fluoksetin", "SSRI"],
    ["Sertraline", "Sertralin", "SSRI"],
    ["Paroxetine", "Paroksetin", "SSRI"],
    ["Citalopram", "Sitalopram", "SSRI"],
    ["Escitalopram", "Essitalopram", "SSRI"],
    ["Fluvoxamine", "Fluvoksamin", "SSRI"],
    ["Vilazodone", "Vilazodon", "SSRI/5-HT1A agonist"],
    ["Vortioxetine", "Vortioksetin", "Multimodal antidepresan"],
    ["Venlafaxine", "Venlafaksin", "SNRI"],
    ["Desvenlafaxine", "Desvenlafaksin", "SNRI"],
    ["Duloxetine", "Duloksetin", "SNRI"],
    ["Levomilnacipran", "Levomilnasipran", "SNRI"],
    ["Milnacipran", "Milnasipran", "SNRI"],
    ["Amitriptyline", "Amitriptilin", "TCA"],
    ["Nortriptyline", "Nortriptilin", "TCA"],
    ["Imipramine", "İmipramin", "TCA"],
    ["Desipramine", "Desipramin", "TCA"],
    ["Clomipramine", "Klomipramin", "TCA"],
    ["Doxepin", "Doksepin", "TCA"],
    ["Trimipramine", "Trimipramin", "TCA"],
    ["Protriptyline", "Protriptilin", "TCA"],
    ["Maprotiline", "Maprotilin", "Tetrasiklik"],
    ["Mirtazapine", "Mirtazapin", "NaSSA"],
    ["Bupropion", "Bupropion", "NDRI"],
    ["Trazodone", "Trazodon", "SARI"],
    ["Nefazodone", "Nefazodon", "SARI"],
    ["Phenelzine", "Fenelzin", "MAOI"],
    ["Tranylcypromine", "Tranilsipromin", "MAOI"],
    ["Isocarboxazid", "İzokarboksazid", "MAOI"],
    ["Selegiline", "Selejilin", "MAO-B inhibitörü"],
    ["Moclobemide", "Moklobemid", "RIMA"],
    // Antipsikotikler
    ["Haloperidol", "Haloperidol", "Tipik antipsikotik"],
    ["Chlorpromazine", "Klorpromazin", "Tipik antipsikotik"],
    ["Fluphenazine", "Flufenazin", "Tipik antipsikotik"],
    ["Perphenazine", "Perfenazin", "Tipik antipsikotik"],
    ["Trifluoperazine", "Trifluoperazin", "Tipik antipsikotik"],
    ["Thiothixene", "Tiyotiksene", "Tipik antipsikotik"],
    ["Thioridazine", "Tiyoridazin", "Tipik antipsikotik"],
    ["Loxapine", "Loksapin", "Tipik antipsikotik"],
    ["Molindone", "Molindon", "Tipik antipsikotik"],
    ["Pimozide", "Pimozid", "Tipik antipsikotik"],
    ["Droperidol", "Droperidol", "Tipik antipsikotik"],
    ["Risperidone", "Risperidon", "Atipik antipsikotik"],
    ["Paliperidone", "Paliperidon", "Atipik antipsikotik"],
    ["Olanzapine", "Olanzapin", "Atipik antipsikotik"],
    ["Quetiapine", "Ketiapin", "Atipik antipsikotik"],
    ["Ziprasidone", "Ziprasidon", "Atipik antipsikotik"],
    ["Aripiprazole", "Aripiprazol", "Atipik antipsikotik"],
    ["Brexpiprazole", "Breksipiprazol", "Atipik antipsikotik"],
    ["Asenapine", "Asenapin", "Atipik antipsikotik"],
    ["Iloperidone", "İloperidon", "Atipik antipsikotik"],
    ["Clozapine", "Klozapin", "Atipik antipsikotik"],
    // Anksiyolitikler ve Sedatifler
    ["Diazepam", "Diazepam", "Benzodiazepin"],
    ["Lorazepam", "Lorazepam", "Benzodiazepin"],
    ["Alprazolam", "Alprazolam", "Benzodiazepin"],
    ["Clonazepam", "Klonazepam", "Benzodiazepin"],
    ["Chlordiazepoxide", "Klordiazepoksit", "Benzodiazepin"],
    ["Oxazepam", "Oksazepam", "Benzodiazepin"],
    ["Temazepam", "Temazepam", "Benzodiazepin"],
    ["Triazolam", "Triazolam", "Benzodiazepin"],
    ["Flurazepam", "Flurazepam", "Benzodiazepin"],
    ["Estazolam", "Estazolam", "Benzodiazepin"],
    ["Quazepam", "Kuazepam", "Benzodiazepin"],
    ["Clorazepate", "Klorazepat", "Benzodiazepin"],
    ["Flumazenil", "Flumazenil", "Benzodiazepin antagonisti"],
    ["Buspirone", "Buspiron", "Anksiyolitik, 5-HT1A agonist"],
    ["Zolpidem", "Zolpidem", "Z-ilaç, hipnotik"],
    ["Zaleplon", "Zaleplon", "Z-ilaç, hipnotik"],
    ["Eszopiclone", "Eszopiklon", "Z-ilaç, hipnotik"],
    ["Ramelteon", "Ramelteon", "Melatonin agonisti"],
    ["Suvorexant", "Suvoreksant", "Oreksin antagonisti"],
    ["Lemborexant", "Lemboreksant", "Oreksin antagonisti"],
    ["Daridorexant", "Daridoreksant", "Oreksin antagonisti"],
    // Antiepileptikler
    ["Phenytoin", "Fenitoin", "Antiepileptik"],
    ["Fosphenytoin", "Fosfenitoin", "Fenitoin ön ilacı"],
    ["Carbamazepine", "Karbamazepin", "Antiepileptik"],
    ["Oxcarbazepine", "Okskarbazepin", "Antiepileptik"],
    ["Valproic acid", "Valproik Asit", "Antiepileptik"],
    ["Divalproex", "Divalproeks", "Valproat"],
    ["Lamotrigine", "Lamotrijin", "Antiepileptik"],
    ["Levetiracetam", "Levetirasetam", "Antiepileptik"],
    ["Topiramate", "Topiramat", "Antiepileptik"],
    ["Zonisamide", "Zonisamid", "Antiepileptik"],
    ["Gabapentin", "Gabapentin", "Antiepileptik, nöropatik ağrı"],
    ["Pregabalin", "Pregabalin", "Antiepileptik, nöropatik ağrı"],
    ["Phenobarbital", "Fenobarbital", "Barbitürat antiepileptik"],
    ["Primidone", "Primidon", "Antiepileptik"],
    ["Ethosuximide", "Etosüksimid", "Absans epilepsi"],
    ["Methsuximide", "Metsüksimid", "Absans epilepsi"],
    ["Clobazam", "Klobazam", "Benzodiazepin antiepileptik"],
    ["Tiagabine", "Tiagabin", "Antiepileptik"],
    // Antiparkinson ilaçları
    ["Levodopa", "Levodopa", "Dopamin öncüsü"],
    ["Carbidopa", "Karbidopa", "DDC inhibitörü"],
    ["Benserazide", "Benserazid", "DDC inhibitörü"],
    ["Entacapone", "Entakapon", "COMT inhibitörü"],
    ["Tolcapone", "Tolkapon", "COMT inhibitörü"],
    ["Pramipexole", "Pramipeksol", "Dopamin agonisti"],
    ["Ropinirole", "Ropinirol", "Dopamin agonisti"],
    ["Rotigotine", "Rotigotin", "Dopamin agonisti"],
    ["Apomorphine", "Apomorfin", "Dopamin agonisti"],
    ["Amantadine", "Amantadin", "Antiparkinson, antiviral"],
    ["Trihexyphenidyl", "Triheksifenidil", "Antikolinerjik"],
    ["Benztropine", "Benztropin", "Antikolinerjik"],
    ["Biperiden", "Biperiden", "Antikolinerjik"],
    ["Procyclidine", "Prosiklidin", "Antikolinerjik"],
    ["Rasagiline", "Rasajilin", "MAO-B inhibitörü"],
    // Antihipertansifler
    ["Lisinopril", "Lisinopril", "ACE inhibitörü"],
    ["Enalapril", "Enalapril", "ACE inhibitörü"],
    ["Captopril", "Kaptopril", "ACE inhibitörü"],
    ["Ramipril", "Ramipril", "ACE inhibitörü"],
    ["Benazepril", "Benazepril", "ACE inhibitörü"],
    ["Fosinopril", "Fosinopril", "ACE inhibitörü"],
    ["Quinapril", "Kinapril", "ACE inhibitörü"],
    ["Perindopril", "Perindopril", "ACE inhibitörü"],
    ["Trandolapril", "Trandolapril", "ACE inhibitörü"],
    ["Moexipril", "Moeksipril", "ACE inhibitörü"],
    ["Losartan", "Losartan", "ARB"],
    ["Valsartan", "Valsartan", "ARB"],
    ["Irbesartan", "İrbesartan", "ARB"],
    ["Candesartan", "Kandesartan", "ARB"],
    ["Olmesartan", "Olmesartan", "ARB"],
    ["Telmisartan", "Telmisartan", "ARB"],
    ["Eprosartan", "Eprosartan", "ARB"],
    ["Azilsartan", "Azilsartan", "ARB"],
    ["Amlodipine", "Amlodipin", "Kalsiyum kanal blokeri"],
    ["Nifedipine", "Nifedipin", "Kalsiyum kanal blokeri"],
    ["Felodipine", "Felodipin", "Kalsiyum kanal blokeri"],
    ["Nicardipine", "Nikardipin", "Kalsiyum kanal blokeri"],
    ["Isradipine", "İsradipin", "Kalsiyum kanal blokeri"],
    ["Nisoldipine", "Nisoldipin", "Kalsiyum kanal blokeri"],
    ["Clevidipine", "Klevidipine", "IV kalsiyum kanal blokeri"],
    ["Diltiazem", "Diltiazem", "Kalsiyum kanal blokeri"],
    ["Verapamil", "Verapamil", "Kalsiyum kanal blokeri"],
    ["Metoprolol", "Metoprolol", "Beta bloker"],
    ["Atenolol", "Atenolol", "Beta bloker"],
    ["Propranolol", "Propranolol", "Beta bloker"],
    ["Nadolol", "Nadolol", "Beta bloker"],
    ["Timolol", "Timolol", "Beta bloker"],
    ["Bisoprolol", "Bisoprolol", "Beta bloker"],
    ["Carvedilol", "Karvedilol", "Alfa/beta bloker"],
    ["Labetalol", "Labetalol", "Alfa/beta bloker"],
    ["Nebivolol", "Nebivolol", "Beta bloker"],
    ["Betaxolol", "Betaksolol", "Beta bloker"],
    ["Acebutolol", "Asebutolol", "Beta bloker"],
    ["Pindolol", "Pindolol", "Beta bloker"],
    ["Penbutolol", "Penbutolol", "Beta bloker"],
    ["Esmolol", "Esmolol", "Ultra kısa etkili beta bloker"],
    ["Prazosin", "Prazosin", "Alfa-1 bloker"],
    ["Terazosin", "Terazosin", "Alfa-1 bloker"],
    ["Doxazosin", "Doksazosin", "Alfa-1 bloker"],
    ["Tamsulosin", "Tamsulosin", "Alfa-1 bloker, BPH"],
    ["Alfuzosin", "Alfuzosin", "Alfa-1 bloker, BPH"],
    ["Silodosin", "Silodosin", "Alfa-1 bloker, BPH"],
    ["Clonidine", "Klonidin", "Alfa-2 agonist"],
    ["Guanfacine", "Guanfasin", "Alfa-2 agonist"],
    ["Methyldopa", "Metildopa", "Santral antihipertansif"],
    ["Reserpine", "Rezerpin", "Antihipertansif"],
    ["Hydrochlorothiazide", "Hidroklorotiyazid", "Tiyazid diüretik"],
    ["Chlorthalidone", "Klortalidon", "Tiyazid benzeri diüretik"],
    ["Indapamide", "İndapamid", "Tiyazid benzeri diüretik"],
    ["Metolazone", "Metolazon", "Tiyazid benzeri diüretik"],
    ["Furosemide", "Furosemid", "Loop diüretik"],
    ["Bumetanide", "Bumetanid", "Loop diüretik"],
    ["Torsemide", "Torsemid", "Loop diüretik"],
    ["Ethacrynic acid", "Etakrinik Asit", "Loop diüretik"],
    ["Spironolactone", "Spironolakton", "Potasyum tutucu diüretik"],
    ["Eplerenone", "Eplerenon", "Aldosteron antagonisti"],
    ["Amiloride", "Amilorid", "Potasyum tutucu diüretik"],
    ["Triamterene", "Triamteren", "Potasyum tutucu diüretik"],
    ["Acetazolamide", "Asetazolamid", "Karbonik anhidraz inhibitörü"],
    ["Mannitol", "Mannitol", "Osmotik diüretik"],
    // Antikoagülanlar ve Antitrombotikler
    ["Warfarin", "Varfarin", "Vitamin K antagonisti"],
    ["Heparin", "Heparin", "Antikoagülan"],
    ["Enoxaparin", "Enoksaparin", "DMAH"],
    ["Dalteparin", "Dalteparin", "DMAH"],
    ["Tinzaparin", "Tinzaparin", "DMAH"],
    ["Fondaparinux", "Fondaparinuks", "Faktör Xa inhibitörü"],
    ["Rivaroxaban", "Rivaroksaban", "Direkt Xa inhibitörü"],
    ["Apixaban", "Apiksaban", "Direkt Xa inhibitörü"],
    ["Edoxaban", "Edoksaban", "Direkt Xa inhibitörü"],
    ["Dabigatran", "Dabigatran", "Direkt trombin inhibitörü"],
    ["Argatroban", "Argatroban", "Direkt trombin inhibitörü"],
    ["Bivalirudin", "Bivalirudin", "Direkt trombin inhibitörü"],
    ["Clopidogrel", "Klopidogrel", "P2Y12 inhibitörü"],
    ["Prasugrel", "Prasugrel", "P2Y12 inhibitörü"],
    ["Ticagrelor", "Tikagrelor", "P2Y12 inhibitörü"],
    ["Cangrelor", "Kangrelor", "IV P2Y12 inhibitörü"],
    ["Ticlopidine", "Tiklopidin", "P2Y12 inhibitörü"],
    ["Dipyridamole", "Dipiridamol", "Antitrombotik"],
    ["Cilostazol", "Silostazol", "PDE3 inhibitörü"],
    ["Vorapaxar", "Vorapaksar", "PAR-1 antagonisti"],
    ["Abciximab", "Absiksimab", "GP IIb/IIIa inhibitörü"],
  ];
  return drugList.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};
// EK İLAÇLAR - Bölüm 2
const generateDrugs2 = () => {
  const drugList = [
    ["Eptifibatide", "Eptifibatid", "GP IIb/IIIa inhibitörü"],
    ["Tirofiban", "Tirofiban", "GP IIb/IIIa inhibitörü"],
    ["Alteplase", "Alteplaz", "tPA, trombolitik"],
    ["Reteplase", "Reteplaz", "Trombolitik"],
    ["Tenecteplase", "Tenekteplaz", "Trombolitik"],
    ["Streptokinase", "Streptokinaz", "Trombolitik"],
    ["Urokinase", "Ürokinaz", "Trombolitik"],
    ["Protamine", "Protamin", "Heparin antidotu"],
    ["Idarucizumab", "İdarusizumab", "Dabigatran antidotu"],
    ["Andexanet alfa", "Andeksanet Alfa", "Xa inhibitörü antidotu"],
    ["Vitamin K", "K Vitamini", "Varfarin antidotu"],
    ["Tranexamic acid", "Traneksamik Asit", "Antifibrinolitik"],
    ["Aminocaproic acid", "Aminokaproik Asit", "Antifibrinolitik"],
    // Lipid düşürücüler
    ["Atorvastatin", "Atorvastatin", "Statin"],
    ["Rosuvastatin", "Rosuvastatin", "Statin"],
    ["Simvastatin", "Simvastatin", "Statin"],
    ["Pravastatin", "Pravastatin", "Statin"],
    ["Lovastatin", "Lovastatin", "Statin"],
    ["Fluvastatin", "Fluvastatin", "Statin"],
    ["Pitavastatin", "Pitavastatin", "Statin"],
    ["Ezetimibe", "Ezetimib", "Kolesterol emilim inhibitörü"],
    ["Bempedoic acid", "Bempedoik Asit", "ACL inhibitörü"],
    ["Evolocumab", "Evolokumab", "PCSK9 inhibitörü"],
    ["Alirocumab", "Alirokumab", "PCSK9 inhibitörü"],
    ["Inclisiran", "İnklisiran", "PCSK9 siRNA"],
    ["Fenofibrate", "Fenofibrat", "Fibrat"],
    ["Gemfibrozil", "Gemfibrozil", "Fibrat"],
    ["Niacin", "Niasin", "Lipid düşürücü"],
    ["Omega-3 fatty acids", "Omega-3 Yağ Asitleri", "Trigliserid düşürücü"],
    ["Icosapent ethyl", "İkosapent Etil", "EPA, trigliserid düşürücü"],
    ["Colesevelam", "Kolesevelam", "Safra asidi bağlayıcı"],
    ["Cholestyramine", "Kolestiramin", "Safra asidi bağlayıcı"],
    ["Colestipol", "Kolestipol", "Safra asidi bağlayıcı"],
    ["Lomitapide", "Lomitapid", "MTP inhibitörü"],
    ["Mipomersen", "Mipomersen", "ApoB antisense"],
    // Antibiyotikler - Ek
    ["Amoxicillin", "Amoksisilin", "Aminopenisilin"],
    ["Ampicillin", "Ampisilin", "Aminopenisilin"],
    ["Penicillin G", "Penisilin G", "Doğal penisilin"],
    ["Penicillin V", "Penisilin V", "Oral penisilin"],
    ["Piperacillin", "Piperasilin", "Antipsödomonal penisilin"],
    ["Ticarcillin", "Tikarsiilin", "Antipsödomonal penisilin"],
    ["Nafcillin", "Nafsilin", "Penisilinaz dirençli penisilin"],
    ["Oxacillin", "Oksasilin", "Penisilinaz dirençli penisilin"],
    ["Dicloxacillin", "Dikloksasilin", "Penisilinaz dirençli penisilin"],
    ["Clavulanic acid", "Klavulanik Asit", "Beta-laktamaz inhibitörü"],
    ["Sulbactam", "Sulbaktam", "Beta-laktamaz inhibitörü"],
    ["Tazobactam", "Tazobaktam", "Beta-laktamaz inhibitörü"],
    ["Avibactam", "Avibaktam", "Beta-laktamaz inhibitörü"],
    ["Cefazolin", "Sefazolin", "1. kuşak sefalosporin"],
    ["Cephalexin", "Sefaleksin", "1. kuşak sefalosporin"],
    ["Cefadroxil", "Sefadroksil", "1. kuşak sefalosporin"],
    ["Cefuroxime", "Sefuroksim", "2. kuşak sefalosporin"],
    ["Cefaclor", "Sefaklor", "2. kuşak sefalosporin"],
    ["Cefprozil", "Sefprozil", "2. kuşak sefalosporin"],
    ["Cefoxitin", "Sefoksitin", "Sefamisin"],
    ["Cefotetan", "Sefotetan", "Sefamisin"],
    ["Ceftriaxone", "Seftriakson", "3. kuşak sefalosporin"],
    ["Cefotaxime", "Sefotaksim", "3. kuşak sefalosporin"],
    ["Ceftazidime", "Seftazidim", "3. kuşak sefalosporin"],
    ["Cefdinir", "Sefdinir", "3. kuşak sefalosporin"],
    ["Cefixime", "Sefiksim", "3. kuşak sefalosporin"],
    ["Cefpodoxime", "Sefpodoksim", "3. kuşak sefalosporin"],
    ["Ceftibuten", "Seftibuten", "3. kuşak sefalosporin"],
    ["Cefepime", "Sefepim", "4. kuşak sefalosporin"],
    ["Ceftaroline", "Seftarolin", "5. kuşak sefalosporin"],
    ["Ceftobiprole", "Seftobiprol", "5. kuşak sefalosporin"],
    ["Ceftolozane", "Seftolozan", "Antipsödomonal sefalosporin"],
    ["Imipenem", "İmipenem", "Karbapenem"],
    ["Meropenem", "Meropenem", "Karbapenem"],
    ["Doripenem", "Doripenem", "Karbapenem"],
    ["Ertapenem", "Ertapenem", "Karbapenem"],
    ["Aztreonam", "Aztreonam", "Monobaktam"],
    ["Vancomycin", "Vankomisin", "Glikopeptid"],
    ["Teicoplanin", "Teikoplanin", "Glikopeptid"],
    ["Telavancin", "Telavansin", "Lipoglikopeptid"],
    ["Dalbavancin", "Dalbavansin", "Lipoglikopeptid"],
    ["Oritavancin", "Oritavansin", "Lipoglikopeptid"],
    ["Gentamicin", "Gentamisin", "Aminoglikozid"],
    ["Tobramycin", "Tobramisin", "Aminoglikozid"],
    ["Amikacin", "Amikasin", "Aminoglikozid"],
    ["Streptomycin", "Streptomisin", "Aminoglikozid"],
    ["Neomycin", "Neomisin", "Aminoglikozid"],
    ["Kanamycin", "Kanamisin", "Aminoglikozid"],
    ["Paromomycin", "Paromomisin", "Aminoglikozid"],
    ["Erythromycin", "Eritromisin", "Makrolid"],
    ["Azithromycin", "Azitromisin", "Makrolid"],
    ["Clarithromycin", "Klaritromisin", "Makrolid"],
    ["Fidaxomicin", "Fidaksomisin", "Makrosiklik"],
    ["Clindamycin", "Klindamisin", "Linkozamid"],
    ["Linezolid", "Linezolid", "Oksazolidinon"],
    ["Tedizolid", "Tedizolid", "Oksazolidinon"],
    ["Daptomycin", "Daptomisin", "Lipopeptid"],
    ["Quinupristin-dalfopristin", "Kinupristin-Dalfopristin", "Streptogramin"],
    ["Tetracycline", "Tetrasiklin", "Tetrasiklin"],
    ["Doxycycline", "Doksisiklin", "Tetrasiklin"],
    ["Minocycline", "Minosiklin", "Tetrasiklin"],
    ["Tigecycline", "Tigesiklin", "Glisisiklin"],
    ["Ciprofloxacin", "Siprofloksasin", "Florokinolon"],
    ["Levofloxacin", "Levofloksasin", "Florokinolon"],
    ["Moxifloxacin", "Moksifloksasin", "Florokinolon"],
    ["Gemifloxacin", "Gemifloksasin", "Florokinolon"],
    ["Ofloxacin", "Ofloksasin", "Florokinolon"],
    ["Norfloxacin", "Norfloksasin", "Florokinolon"],
    ["Trimethoprim", "Trimetoprim", "Folat antagonisti"],
    ["Sulfamethoxazole", "Sülfametoksazol", "Sülfonamid"],
    ["Sulfadiazine", "Sülfadiazin", "Sülfonamid"],
    ["Sulfasalazine", "Sülfasalazin", "Sülfonamid, IBD"],
    ["Nitrofurantoin", "Nitrofurantoin", "Üriner antiseptik"],
    ["Methenamine", "Metenamin", "Üriner antiseptik"],
    ["Fosfomycin", "Fosfomisin", "Üriner antibiyotik"],
    ["Metronidazole", "Metronidazol", "Nitroimidazol"],
    ["Tinidazole", "Tinidazol", "Nitroimidazol"],
    ["Secnidazole", "Seknidazol", "Nitroimidazol"],
    ["Colistin", "Kolistin", "Polimiksin"],
    ["Polymyxin B", "Polimiksin B", "Polimiksin"],
    // Antiviral ilaçlar - Ek
    ["Acyclovir", "Asiklovir", "HSV, VZV antiviral"],
    ["Valacyclovir", "Valasiklovir", "Asiklovir ön ilacı"],
    ["Famciclovir", "Famsiklovir", "HSV, VZV antiviral"],
    ["Penciclovir", "Pensiklovir", "Topikal HSV antiviral"],
    ["Ganciclovir", "Gansiklovir", "CMV antiviral"],
    ["Valganciclovir", "Valgansiklovir", "Gansiklovir ön ilacı"],
    ["Foscarnet", "Foskarnet", "CMV, HSV antiviral"],
    ["Cidofovir", "Sidofovir", "CMV antiviral"],
    ["Oseltamivir", "Oseltamivir", "Nöraminidaz inhibitörü"],
    ["Zanamivir", "Zanamivir", "Nöraminidaz inhibitörü"],
    ["Peramivir", "Peramivir", "Nöraminidaz inhibitörü"],
    ["Baloxavir", "Baloksavir", "Cap-bağımlı endonükleaz inhibitörü"],
    ["Amantadine", "Amantadin", "M2 inhibitörü"],
    ["Rimantadine", "Rimantadin", "M2 inhibitörü"],
    ["Ribavirin", "Ribavirin", "Geniş spektrum antiviral"],
    ["Interferon alfa", "İnterferon Alfa", "Antiviral, antitümör"],
    ["Peginterferon alfa", "Peginterferon Alfa", "Pegillenmiş interferon"],
    ["Lamivudine", "Lamivudin", "HBV, HIV NRTI"],
    ["Entecavir", "Entekavir", "HBV antiviral"],
    ["Tenofovir", "Tenofovir", "HBV, HIV NRTI"],
    ["Sofosbuvir", "Sofosbuvir", "HCV NS5B inhibitörü"],
    ["Ledipasvir", "Ledipasvir", "HCV NS5A inhibitörü"],
    ["Velpatasvir", "Velpatasvir", "HCV NS5A inhibitörü"],
    ["Glecaprevir", "Glecaprevir", "HCV NS3/4A inhibitörü"],
    ["Pibrentasvir", "Pibrentasvir", "HCV NS5A inhibitörü"],
    ["Daclatasvir", "Daklatasvir", "HCV NS5A inhibitörü"],
    ["Elbasvir", "Elbasvir", "HCV NS5A inhibitörü"],
    ["Grazoprevir", "Grazoprevir", "HCV NS3/4A inhibitörü"],
    // HIV antiretroviraller
    ["Zidovudine", "Zidovudin", "NRTI"],
    ["Didanosine", "Didanozin", "NRTI"],
    ["Stavudine", "Stavudin", "NRTI"],
    ["Abacavir", "Abakavir", "NRTI"],
    ["Emtricitabine", "Emtrisitabin", "NRTI"],
    ["Efavirenz", "Efavirenz", "NNRTI"],
    ["Nevirapine", "Nevirapin", "NNRTI"],
  ];
  return drugList.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};
// EK İLAÇLAR - Bölüm 3
const generateDrugs3 = () => {
  const drugList = [
    ["Etravirine", "Etravirin", "NNRTI"],
    ["Rilpivirine", "Rilpivirin", "NNRTI"],
    ["Doravirine", "Doravirin", "NNRTI"],
    ["Atazanavir", "Atazanavir", "Proteaz inhibitörü"],
    ["Darunavir", "Darunavir", "Proteaz inhibitörü"],
    ["Lopinavir", "Lopinavir", "Proteaz inhibitörü"],
    ["Ritonavir", "Ritonavir", "Proteaz inhibitörü, booster"],
    ["Saquinavir", "Sakinavir", "Proteaz inhibitörü"],
    ["Indinavir", "İndinavir", "Proteaz inhibitörü"],
    ["Nelfinavir", "Nelfinavir", "Proteaz inhibitörü"],
    ["Fosamprenavir", "Fosamprenavir", "Proteaz inhibitörü"],
    ["Tipranavir", "Tipranavir", "Proteaz inhibitörü"],
    ["Cobicistat", "Kobisistat", "Farmakokinetik booster"],
    ["Raltegravir", "Raltegravir", "İntegraz inhibitörü"],
    ["Elvitegravir", "Elvitegravir", "İntegraz inhibitörü"],
    ["Dolutegravir", "Dolutegravir", "İntegraz inhibitörü"],
    ["Bictegravir", "Biktegravir", "İntegraz inhibitörü"],
    ["Cabotegravir", "Kabotegravir", "İntegraz inhibitörü"],
    ["Maraviroc", "Maravirok", "CCR5 antagonisti"],
    ["Enfuvirtide", "Enfuvirtid", "Füzyon inhibitörü"],
    ["Ibalizumab", "İbalizumab", "CD4 monoklonal"],
    ["Fostemsavir", "Fostemsavir", "Attachment inhibitörü"],
    ["Lenacapavir", "Lenakpavir", "Kapsid inhibitörü"],
    // Antifungal ilaçlar - Ek
    ["Fluconazole", "Flukonazol", "Triazol antifungal"],
    ["Itraconazole", "İtrakonazol", "Triazol antifungal"],
    ["Voriconazole", "Vorikonazol", "Triazol antifungal"],
    ["Posaconazole", "Posakonazol", "Triazol antifungal"],
    ["Isavuconazole", "İsavukonazol", "Triazol antifungal"],
    ["Ketoconazole", "Ketokonazol", "İmidazol antifungal"],
    ["Miconazole", "Mikonazol", "İmidazol antifungal"],
    ["Clotrimazole", "Klotrimazol", "İmidazol antifungal"],
    ["Econazole", "Ekonazol", "İmidazol antifungal"],
    ["Terbinafine", "Terbinafin", "Allilamin antifungal"],
    ["Naftifine", "Naftifin", "Allilamin antifungal"],
    ["Butenafine", "Butenafin", "Benzilamin antifungal"],
    ["Amphotericin B", "Amfoterisin B", "Polien antifungal"],
    ["Nystatin", "Nistatin", "Polien antifungal"],
    ["Caspofungin", "Kaspofungin", "Ekinokandin"],
    ["Micafungin", "Mikafungin", "Ekinokandin"],
    ["Anidulafungin", "Anidulafungin", "Ekinokandin"],
    ["Flucytosine", "Flusitozin", "Antimetabolit antifungal"],
    ["Griseofulvin", "Griseofulvin", "Antifungal"],
    ["Ciclopirox", "Siklopiroks", "Topikal antifungal"],
    ["Tolnaftate", "Tolnaftat", "Topikal antifungal"],
    ["Undecylenic acid", "Undesilenik Asit", "Topikal antifungal"],
    // Antiparaziter ilaçlar - Ek
    ["Chloroquine", "Klorokin", "Antimalaryal"],
    ["Hydroxychloroquine", "Hidroksiklorokin", "Antimalaryal, RA"],
    ["Primaquine", "Primakin", "Antimalaryal"],
    ["Mefloquine", "Meflokin", "Antimalaryal"],
    ["Atovaquone", "Atovakon", "Antimalaryal, PCP"],
    ["Proguanil", "Proguanil", "Antimalaryal"],
    ["Pyrimethamine", "Pirimetamin", "Antimalaryal, toksoplazmoz"],
    ["Sulfadoxine", "Sülfadoksin", "Antimalaryal kombinasyon"],
    ["Artemether", "Artemeter", "Artemisinin türevi"],
    ["Artesunate", "Artesunat", "Artemisinin türevi"],
    ["Dihydroartemisinin", "Dihidroartemisinin", "Artemisinin türevi"],
    ["Lumefantrine", "Lumefantrin", "Antimalaryal"],
    ["Quinine", "Kinin", "Antimalaryal"],
    ["Quinidine", "Kinidin", "Antimalaryal, antiaritmik"],
    ["Dapsone", "Dapson", "Lepra, PCP"],
    ["Pentamidine", "Pentamidin", "PCP, leishmaniasis"],
    ["Suramin", "Suramin", "Trypanosomiasis"],
    ["Melarsoprol", "Melarsoprol", "Trypanosomiasis"],
    ["Nifurtimox", "Nifurtimoks", "Chagas hastalığı"],
    ["Benznidazole", "Benznidazol", "Chagas hastalığı"],
    ["Sodium stibogluconate", "Sodyum Stiboglukonat", "Leishmaniasis"],
    ["Meglumine antimoniate", "Meglumin Antimoniat", "Leishmaniasis"],
    ["Miltefosine", "Miltefosin", "Leishmaniasis"],
    ["Paromomycin", "Paromomisin", "Leishmaniasis, amipli dizanteri"],
    ["Diloxanide", "Diloksanid", "Amipli dizanteri"],
    ["Iodoquinol", "İyodokinol", "Amipli dizanteri"],
    ["Nitazoxanide", "Nitazoksanid", "Geniş spektrum antiparaziter"],
    ["Albendazole", "Albendazol", "Antihelmintik"],
    ["Mebendazole", "Mebendazol", "Antihelmintik"],
    ["Thiabendazole", "Tiyabendazol", "Antihelmintik"],
    ["Pyrantel", "Pirantel", "Antihelmintik"],
    ["Levamisole", "Levamizol", "Antihelmintik"],
    ["Praziquantel", "Prazikantel", "Antihelmintik"],
    ["Niclosamide", "Niklosamid", "Antihelmintik"],
    ["Ivermectin", "İvermektin", "Antihelmintik, antiparaziter"],
    ["Diethylcarbamazine", "Dietilkarbamazin", "Filariasis"],
    // Antitüberküloz ilaçlar
    ["Isoniazid", "İzoniazid", "Antitüberküloz"],
    ["Rifampin", "Rifampin", "Antitüberküloz"],
    ["Rifabutin", "Rifabutin", "Antitüberküloz"],
    ["Rifapentine", "Rifapentin", "Antitüberküloz"],
    ["Pyrazinamide", "Pirazinamid", "Antitüberküloz"],
    ["Ethambutol", "Etambutol", "Antitüberküloz"],
    ["Streptomycin", "Streptomisin", "Antitüberküloz"],
    ["Capreomycin", "Kapreomisin", "Antitüberküloz"],
    ["Cycloserine", "Sikloserin", "Antitüberküloz"],
    ["Ethionamide", "Etiyonamid", "Antitüberküloz"],
    ["Para-aminosalicylic acid", "Para-Aminosalisilik Asit", "Antitüberküloz"],
    ["Bedaquiline", "Bedakilin", "Antitüberküloz"],
    ["Delamanid", "Delamanid", "Antitüberküloz"],
    ["Pretomanid", "Pretomanid", "Antitüberküloz"],
    ["Linezolid", "Linezolid", "Antitüberküloz"],
    ["Clofazimine", "Klofazimin", "Lepra, MDR-TB"],
    // Kemoterapötikler - Ek
    ["Cyclophosphamide", "Siklofosfamid", "Alkilleyici ajan"],
    ["Ifosfamide", "İfosfamid", "Alkilleyici ajan"],
    ["Melphalan", "Melfalan", "Alkilleyici ajan"],
    ["Chlorambucil", "Klorambusil", "Alkilleyici ajan"],
  ];
  return drugList.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};
// EK İLAÇLAR - Bölüm 4
const generateDrugs4 = () => {
  const drugList = [
    ["Busulfan", "Busulfan", "Alkilleyici ajan"],
    ["Bendamustine", "Bendamustin", "Alkilleyici ajan"],
    ["Temozolomide", "Temozolomid", "Alkilleyici ajan"],
    ["Dacarbazine", "Dakarbazin", "Alkilleyici ajan"],
    ["Procarbazine", "Prokarbazin", "Alkilleyici ajan"],
    ["Carmustine", "Karmustin", "Nitrozüre"],
    ["Lomustine", "Lomustin", "Nitrozüre"],
    ["Streptozocin", "Streptozocin", "Nitrozüre"],
    ["Cisplatin", "Sisplatin", "Platin bileşiği"],
    ["Carboplatin", "Karboplatin", "Platin bileşiği"],
    ["Oxaliplatin", "Oksaliplatin", "Platin bileşiği"],
    ["Nedaplatin", "Nedaplatin", "Platin bileşiği"],
    ["Methotrexate", "Metotreksat", "Antimetabolit"],
    ["Pemetrexed", "Pemetrekset", "Antifolat"],
    ["Pralatrexate", "Pralatreksat", "Antifolat"],
    ["Fluorouracil", "Fluorourasil", "Antimetabolit"],
    ["Capecitabine", "Kapesitabin", "5-FU ön ilacı"],
    ["Tegafur", "Tegafur", "5-FU ön ilacı"],
    ["Floxuridine", "Floksuridin", "Antimetabolit"],
    ["Cytarabine", "Sitarabin", "Antimetabolit"],
    ["Gemcitabine", "Gemsitabin", "Antimetabolit"],
    ["Azacitidine", "Azasitidin", "Hipometile edici ajan"],
    ["Decitabine", "Desitabin", "Hipometile edici ajan"],
    ["Mercaptopurine", "Merkaptopürin", "Antimetabolit"],
    ["Thioguanine", "Tiyoguanin", "Antimetabolit"],
    ["Fludarabine", "Fludarabin", "Antimetabolit"],
    ["Cladribine", "Kladribin", "Antimetabolit"],
    ["Clofarabine", "Klofarabin", "Antimetabolit"],
    ["Nelarabine", "Nelarabin", "Antimetabolit"],
    ["Pentostatin", "Pentostatin", "Antimetabolit"],
    ["Hydroxyurea", "Hidroksiüre", "Antimetabolit"],
    ["Doxorubicin", "Doksorubisin", "Antrasiklin"],
    ["Daunorubicin", "Daunorubisin", "Antrasiklin"],
    ["Epirubicin", "Epirubisin", "Antrasiklin"],
    ["Idarubicin", "İdarubisin", "Antrasiklin"],
    ["Mitoxantrone", "Mitoksantron", "Antrasendion"],
    ["Bleomycin", "Bleomisin", "Antitümör antibiyotik"],
    ["Dactinomycin", "Daktinomisin", "Antitümör antibiyotik"],
    ["Mitomycin", "Mitomisin", "Antitümör antibiyotik"],
    ["Paclitaxel", "Paklitaksel", "Taksan"],
    ["Docetaxel", "Dosetaksel", "Taksan"],
    ["Cabazitaxel", "Kabazitaksel", "Taksan"],
    ["Nab-paclitaxel", "Nab-Paklitaksel", "Albumin-bağlı taksan"],
    ["Vincristine", "Vinkristin", "Vinka alkaloidi"],
    ["Vinblastine", "Vinblastin", "Vinka alkaloidi"],
    ["Vinorelbine", "Vinorelbin", "Vinka alkaloidi"],
    ["Vindesine", "Vindesin", "Vinka alkaloidi"],
    ["Etoposide", "Etoposid", "Topoizomeraz II inhibitörü"],
    ["Teniposide", "Teniposid", "Topoizomeraz II inhibitörü"],
    ["Irinotecan", "İrinotekan", "Topoizomeraz I inhibitörü"],
    ["Topotecan", "Topotekan", "Topoizomeraz I inhibitörü"],
  ];
  return drugList.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};
// EK HASTALIKLAR
const generateDiseases = () => {
  const diseaseList = [
    // Kardiyovasküler hastalıklar
    ["Coronary artery disease", "Koroner Arter Hastalığı", "KAH, ateroskleroz"],
    ["Myocardial infarction", "Miyokard Enfarktüsü", "Kalp krizi"],
    ["Unstable angina", "Kararsız Anjina", "AKS"],
    ["Stable angina", "Kararlı Anjina", "Efor anjinası"],
    ["Heart failure", "Kalp Yetmezliği", "KY"],
    ["Systolic heart failure", "Sistolik Kalp Yetmezliği", "HFrEF"],
    ["Diastolic heart failure", "Diyastolik Kalp Yetmezliği", "HFpEF"],
    ["Atrial fibrillation", "Atriyal Fibrilasyon", "AF"],
    ["Atrial flutter", "Atriyal Flutter", "AFL"],
    ["Ventricular tachycardia", "Ventriküler Taşikardi", "VT"],
    ["Ventricular fibrillation", "Ventriküler Fibrilasyon", "VF"],
    ["Supraventricular tachycardia", "Supraventriküler Taşikardi", "SVT"],
    ["Wolff-Parkinson-White syndrome", "Wolff-Parkinson-White Sendromu", "WPW"],
    ["Long QT syndrome", "Uzun QT Sendromu", "LQTS"],
    ["Brugada syndrome", "Brugada Sendromu", "Aritmojenik sendrom"],
    ["Sick sinus syndrome", "Hasta Sinüs Sendromu", "SSS"],
    ["Atrioventricular block", "Atriyoventriküler Blok", "AV blok"],
    ["Bundle branch block", "Dal Bloğu", "RBBB, LBBB"],
    ["Hypertrophic cardiomyopathy", "Hipertrofik Kardiyomiyopati", "HCM"],
    ["Dilated cardiomyopathy", "Dilate Kardiyomiyopati", "DCM"],
    ["Restrictive cardiomyopathy", "Restriktif Kardiyomiyopati", "RCM"],
    [
      "Arrhythmogenic right ventricular cardiomyopathy",
      "Aritmojenik Sağ Ventrikül Kardiyomiyopatisi",
      "ARVC",
    ],
    [
      "Takotsubo cardiomyopathy",
      "Takotsubo Kardiyomiyopatisi",
      "Stres kardiyomiyopatisi",
    ],
    ["Myocarditis", "Miyokardit", "Kalp kası iltihabı"],
    ["Pericarditis", "Perikardit", "Perikard iltihabı"],
    ["Cardiac tamponade", "Kardiyak Tamponad", "Perikard sıvı birikimi"],
    [
      "Constrictive pericarditis",
      "Konstriktif Perikardit",
      "Kronik perikardit",
    ],
    ["Infective endocarditis", "Enfektif Endokardit", "İE"],
    ["Rheumatic heart disease", "Romatizmal Kalp Hastalığı", "RKH"],
    ["Aortic stenosis", "Aort Stenozu", "AS"],
    ["Aortic regurgitation", "Aort Yetersizliği", "AY"],
    ["Mitral stenosis", "Mitral Stenoz", "MS"],
    ["Mitral regurgitation", "Mitral Yetersizlik", "MY"],
    ["Mitral valve prolapse", "Mitral Kapak Prolapsusu", "MVP"],
    ["Tricuspid regurgitation", "Triküspit Yetersizlik", "TY"],
    ["Pulmonary stenosis", "Pulmoner Stenoz", "PS"],
    ["Pulmonary hypertension", "Pulmoner Hipertansiyon", "PH"],
    [
      "Pulmonary arterial hypertension",
      "Pulmoner Arteriyel Hipertansiyon",
      "PAH",
    ],
    ["Pulmonary embolism", "Pulmoner Emboli", "PE"],
    ["Deep vein thrombosis", "Derin Ven Trombozu", "DVT"],
    ["Peripheral artery disease", "Periferik Arter Hastalığı", "PAH"],
    ["Aortic aneurysm", "Aort Anevrizması", "AAA, TAA"],
    ["Aortic dissection", "Aort Diseksiyonu", "Tip A, Tip B"],
    ["Carotid artery stenosis", "Karotis Arter Stenozu", "KAS"],
    ["Raynaud phenomenon", "Raynaud Fenomeni", "Vazospastik hastalık"],
    ["Varicose veins", "Varis", "Venöz yetmezlik"],
    ["Chronic venous insufficiency", "Kronik Venöz Yetmezlik", "KVY"],
    ["Lymphedema", "Lenfödem", "Lenfatik ödem"],
    ["Essential hypertension", "Esansiyel Hipertansiyon", "Primer HT"],
    ["Secondary hypertension", "Sekonder Hipertansiyon", "İkincil HT"],
  ];
  return diseaseList.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};
// EK HASTALIKLAR - Bölüm 2
const generateDiseases2 = () => {
  const diseaseList = [
    // Solunum sistemi hastalıkları
    ["Asthma", "Astım", "Kronik hava yolu hastalığı"],
    [
      "Chronic obstructive pulmonary disease",
      "KOAH",
      "Kronik obstrüktif akciğer hastalığı",
    ],
    ["Emphysema", "Amfizem", "Alveol harabiyeti"],
    ["Chronic bronchitis", "Kronik Bronşit", "Kronik öksürük, balgam"],
    ["Bronchiectasis", "Bronşektazi", "Bronş genişlemesi"],
    ["Cystic fibrosis", "Kistik Fibrozis", "CFTR mutasyonu"],
    ["Interstitial lung disease", "İnterstisyel Akciğer Hastalığı", "ILD"],
    ["Idiopathic pulmonary fibrosis", "İdiyopatik Pulmoner Fibrozis", "IPF"],
    ["Sarcoidosis", "Sarkoidoz", "Granülomatöz hastalık"],
    [
      "Hypersensitivity pneumonitis",
      "Hipersensitivite Pnömonisi",
      "Ekstrinsik alerjik alveolit",
    ],
    ["Pneumoconiosis", "Pnömokonyoz", "Toz akciğer hastalığı"],
    ["Silicosis", "Silikoz", "Silika maruziyeti"],
    ["Asbestosis", "Asbestoz", "Asbest maruziyeti"],
    [
      "Coal workers pneumoconiosis",
      "Kömür İşçisi Pnömokonyozu",
      "Siyah akciğer",
    ],
    [
      "Acute respiratory distress syndrome",
      "Akut Solunum Sıkıntısı Sendromu",
      "ARDS",
    ],
    ["Pneumonia", "Pnömoni", "Akciğer enfeksiyonu"],
    ["Community-acquired pneumonia", "Toplum Kökenli Pnömoni", "TKP"],
    ["Hospital-acquired pneumonia", "Hastane Kökenli Pnömoni", "HKP"],
    ["Ventilator-associated pneumonia", "Ventilatör İlişkili Pnömoni", "VİP"],
    ["Aspiration pneumonia", "Aspirasyon Pnömonisi", "Aspirasyon"],
    ["Pneumocystis pneumonia", "Pnömosistis Pnömonisi", "PCP"],
    ["Tuberculosis", "Tüberküloz", "TB, verem"],
    ["Lung abscess", "Akciğer Apsesi", "Pulmoner apse"],
    ["Empyema", "Ampiyem", "Plevral enfeksiyon"],
    ["Pleural effusion", "Plevral Efüzyon", "Plevra sıvısı"],
    ["Pneumothorax", "Pnömotoraks", "Akciğer çökmesi"],
    ["Hemothorax", "Hemotoraks", "Plevral kanama"],
    ["Lung cancer", "Akciğer Kanseri", "Bronkojenik karsinom"],
    ["Small cell lung cancer", "Küçük Hücreli Akciğer Kanseri", "KHAK"],
    [
      "Non-small cell lung cancer",
      "Küçük Hücreli Dışı Akciğer Kanseri",
      "KHDAK",
    ],
    ["Mesothelioma", "Mezotelyoma", "Plevral kanser"],
    ["Obstructive sleep apnea", "Obstrüktif Uyku Apnesi", "OSA"],
    ["Central sleep apnea", "Santral Uyku Apnesi", "CSA"],
    [
      "Obesity hypoventilation syndrome",
      "Obezite Hipoventilasyon Sendromu",
      "OHS",
    ],
    ["Acute bronchitis", "Akut Bronşit", "Bronş iltihabı"],
    ["Laryngitis", "Larenjit", "Gırtlak iltihabı"],
    ["Pharyngitis", "Farenjit", "Boğaz iltihabı"],
    ["Sinusitis", "Sinüzit", "Sinüs iltihabı"],
    ["Rhinitis", "Rinit", "Burun iltihabı"],
    ["Allergic rhinitis", "Alerjik Rinit", "Saman nezlesi"],
    // Gastrointestinal hastalıklar
    [
      "Gastroesophageal reflux disease",
      "Gastroözofageal Reflü Hastalığı",
      "GÖRH",
    ],
    ["Barrett esophagus", "Barrett Özofagusu", "Özofagus metaplazisi"],
    ["Esophageal cancer", "Özofagus Kanseri", "Yemek borusu kanseri"],
    ["Achalasia", "Akalazya", "Özofagus motilite bozukluğu"],
    ["Esophageal varices", "Özofagus Varisleri", "Portal HT komplikasyonu"],
    ["Peptic ulcer disease", "Peptik Ülser Hastalığı", "Mide/duodenum ülseri"],
    ["Gastric ulcer", "Mide Ülseri", "Gastrik ülser"],
    ["Duodenal ulcer", "Duodenum Ülseri", "Duodenal ülser"],
    ["Gastritis", "Gastrit", "Mide iltihabı"],
    ["Gastroparesis", "Gastroparezi", "Mide boşalma gecikmesi"],
  ];
  return diseaseList.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};
// EK ANATOMİ
const generateAnatomy = () => {
  const anatomyList = [
    // Kalp anatomisi
    ["Right atrium", "Sağ Atriyum", "Sağ kulakçık"],
    ["Left atrium", "Sol Atriyum", "Sol kulakçık"],
    ["Right ventricle", "Sağ Ventrikül", "Sağ karıncık"],
    ["Left ventricle", "Sol Ventrikül", "Sol karıncık"],
    ["Tricuspid valve", "Triküspit Kapak", "Sağ AV kapak"],
    ["Mitral valve", "Mitral Kapak", "Sol AV kapak"],
    ["Aortic valve", "Aort Kapağı", "Aort çıkış kapağı"],
    ["Pulmonary valve", "Pulmoner Kapak", "Pulmoner çıkış kapağı"],
    [
      "Interventricular septum",
      "İnterventriküler Septum",
      "Karıncıklar arası duvar",
    ],
    ["Interatrial septum", "İnteratriyal Septum", "Kulakçıklar arası duvar"],
    ["Sinoatrial node", "Sinoatriyal Düğüm", "SA düğüm, kalp pili"],
    ["Atrioventricular node", "Atriyoventriküler Düğüm", "AV düğüm"],
    ["Bundle of His", "His Demeti", "İleti sistemi"],
    ["Purkinje fibers", "Purkinje Lifleri", "İleti sistemi"],
    ["Coronary arteries", "Koroner Arterler", "Kalp damarları"],
    ["Left anterior descending artery", "Sol Ön İnen Arter", "LAD"],
    ["Left circumflex artery", "Sol Sirkumfleks Arter", "LCx"],
    ["Right coronary artery", "Sağ Koroner Arter", "RCA"],
    ["Pericardium", "Perikard", "Kalp zarı"],
    ["Epicardium", "Epikard", "Dış kalp tabakası"],
    ["Myocardium", "Miyokard", "Kalp kası"],
    ["Endocardium", "Endokard", "İç kalp tabakası"],
    // Akciğer anatomisi
    ["Right lung", "Sağ Akciğer", "3 loblu"],
    ["Left lung", "Sol Akciğer", "2 loblu"],
    ["Upper lobe", "Üst Lob", "Superior lob"],
    ["Middle lobe", "Orta Lob", "Sadece sağda"],
    ["Lower lobe", "Alt Lob", "İnferior lob"],
    ["Bronchus", "Bronş", "Ana hava yolu"],
    ["Bronchiole", "Bronşiol", "Küçük hava yolu"],
    ["Alveolus", "Alveol", "Hava kesesi"],
    ["Pleura", "Plevra", "Akciğer zarı"],
    ["Visceral pleura", "Visseral Plevra", "İç plevra"],
    ["Parietal pleura", "Parietal Plevra", "Dış plevra"],
    ["Pleural cavity", "Plevral Boşluk", "Plevra arası boşluk"],
    ["Diaphragm", "Diyafram", "Solunum kası"],
    ["Trachea", "Trakea", "Nefes borusu"],
    ["Carina", "Karina", "Trakea bifurkasyonu"],
    ["Larynx", "Larinks", "Gırtlak"],
    ["Epiglottis", "Epiglot", "Gırtlak kapağı"],
    ["Vocal cords", "Ses Telleri", "Vokal kordlar"],
    ["Pharynx", "Farinks", "Yutak"],
    ["Nasopharynx", "Nazofarinks", "Burun yutağı"],
    ["Oropharynx", "Orofarinks", "Ağız yutağı"],
    ["Laryngopharynx", "Laringofarinks", "Gırtlak yutağı"],
    // Sindirim sistemi anatomisi
    ["Esophagus", "Özofagus", "Yemek borusu"],
    ["Stomach", "Mide", "Gaster"],
    ["Fundus", "Fundus", "Mide tabanı"],
    ["Body of stomach", "Mide Gövdesi", "Korpus"],
    ["Antrum", "Antrum", "Mide çıkışı"],
    ["Pylorus", "Pilor", "Mide kapısı"],
  ];
  return anatomyList.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};
// EK ANATOMİ - Bölüm 2
const generateAnatomy2 = () => {
  const anatomyList = [
    ["Duodenum", "Duodenum", "Onikiparmak bağırsağı"],
    ["Jejunum", "Jejunum", "Boş bağırsak"],
    ["Ileum", "İleum", "Kıvrım bağırsak"],
    ["Cecum", "Çekum", "Kör bağırsak"],
    ["Ascending colon", "Çıkan Kolon", "Sağ kolon"],
    ["Transverse colon", "Transvers Kolon", "Yatay kolon"],
    ["Descending colon", "İnen Kolon", "Sol kolon"],
    ["Sigmoid colon", "Sigmoid Kolon", "S şekilli kolon"],
    ["Rectum", "Rektum", "Düz bağırsak"],
    ["Anal canal", "Anal Kanal", "Anüs kanalı"],
    ["Liver", "Karaciğer", "Hepatik organ"],
    ["Right lobe of liver", "Karaciğer Sağ Lobu", "Büyük lob"],
    ["Left lobe of liver", "Karaciğer Sol Lobu", "Küçük lob"],
    ["Caudate lobe", "Kaudat Lob", "Kuyruklu lob"],
    ["Quadrate lobe", "Kuadrat Lob", "Kare lob"],
    ["Hepatic artery", "Hepatik Arter", "Karaciğer arteri"],
    ["Portal vein", "Portal Ven", "Kapı toplardamarı"],
    ["Hepatic vein", "Hepatik Ven", "Karaciğer veni"],
    ["Bile duct", "Safra Kanalı", "Biliyer kanal"],
    ["Common bile duct", "Ana Safra Kanalı", "Koledok"],
    ["Gallbladder", "Safra Kesesi", "Kolesist"],
    ["Cystic duct", "Sistik Kanal", "Safra kesesi kanalı"],
    ["Pancreas", "Pankreas", "Mide altı bezi"],
    ["Pancreatic head", "Pankreas Başı", "Kaput"],
    ["Pancreatic body", "Pankreas Gövdesi", "Korpus"],
    ["Pancreatic tail", "Pankreas Kuyruğu", "Kauda"],
    ["Pancreatic duct", "Pankreas Kanalı", "Wirsung kanalı"],
    ["Spleen", "Dalak", "Lien"],
    ["Peritoneum", "Periton", "Karın zarı"],
    ["Greater omentum", "Büyük Omentum", "Büyük karın önlüğü"],
    ["Lesser omentum", "Küçük Omentum", "Küçük karın önlüğü"],
    ["Mesentery", "Mezenter", "Bağırsak askısı"],
    // Üriner sistem anatomisi
    ["Kidney", "Böbrek", "Ren"],
    ["Renal cortex", "Böbrek Korteksi", "Dış tabaka"],
    ["Renal medulla", "Böbrek Medullası", "İç tabaka"],
    ["Renal pelvis", "Böbrek Pelvisi", "Böbrek havuzu"],
    ["Nephron", "Nefron", "Böbrek fonksiyonel birimi"],
    ["Glomerulus", "Glomerül", "Böbrek süzme birimi"],
    ["Bowman capsule", "Bowman Kapsülü", "Glomerül kapsülü"],
    ["Proximal tubule", "Proksimal Tübül", "Yakın tübül"],
    ["Loop of Henle", "Henle Kulpu", "U şekilli tübül"],
    ["Distal tubule", "Distal Tübül", "Uzak tübül"],
    ["Collecting duct", "Toplayıcı Kanal", "Toplama kanalı"],
    ["Ureter", "Üreter", "İdrar borusu"],
    ["Urinary bladder", "Mesane", "İdrar kesesi"],
    ["Urethra", "Üretra", "İdrar kanalı"],
    ["Renal artery", "Renal Arter", "Böbrek arteri"],
    ["Renal vein", "Renal Ven", "Böbrek veni"],
    ["Adrenal gland", "Adrenal Bez", "Böbrek üstü bezi"],
  ];
  return anatomyList.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Extra Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(50));

  console.log("📝 Terimler oluşturuluyor...");

  const drugs1 = generateDrugs1();
  const drugs2 = generateDrugs2();
  const drugs3 = generateDrugs3();
  const drugs4 = generateDrugs4();
  const diseases1 = generateDiseases();
  const diseases2 = generateDiseases2();
  const anatomy1 = generateAnatomy();
  const anatomy2 = generateAnatomy2();

  const allTerms = [
    ...drugs1,
    ...drugs2,
    ...drugs3,
    ...drugs4,
    ...diseases1,
    ...diseases2,
    ...anatomy1,
    ...anatomy2,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   İlaçlar Bölüm 1: ${drugs1.length}`);
  console.log(`   İlaçlar Bölüm 2: ${drugs2.length}`);
  console.log(`   İlaçlar Bölüm 3: ${drugs3.length}`);
  console.log(`   İlaçlar Bölüm 4: ${drugs4.length}`);
  console.log(`   Hastalıklar Bölüm 1: ${diseases1.length}`);
  console.log(`   Hastalıklar Bölüm 2: ${diseases2.length}`);
  console.log(`   Anatomi Bölüm 1: ${anatomy1.length}`);
  console.log(`   Anatomi Bölüm 2: ${anatomy2.length}`);
  console.log(`   ─────────────────────`);
  console.log(`   TOPLAM: ${allTerms.length} terim\n`);

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
