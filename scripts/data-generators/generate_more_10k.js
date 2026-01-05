// 10,000 hedefi için ek terimler - Yeni kategoriler ve terimler
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

// Yeni ilaç grupları
const generateDrugGroups = () => {
  const drugs = [
    // Antibiyotikler - Sefalosporinler
    ["Cefazolin", "Sefazolin", "1. kuşak sefalosporin antibiyotik"],
    ["Cefuroxime", "Sefuroksim", "2. kuşak sefalosporin antibiyotik"],
    ["Ceftriaxone", "Seftriakson", "3. kuşak sefalosporin antibiyotik"],
    ["Ceftazidime", "Seftazidim", "3. kuşak sefalosporin, pseudomonas etkili"],
    ["Cefepime", "Sefepim", "4. kuşak sefalosporin antibiyotik"],
    ["Cefixime", "Sefiksim", "Oral 3. kuşak sefalosporin"],
    ["Cephalexin", "Sefaleksin", "Oral 1. kuşak sefalosporin"],
    ["Cefaclor", "Sefaklor", "Oral 2. kuşak sefalosporin"],
    ["Cefpodoxime", "Sefpodoksim", "Oral 3. kuşak sefalosporin"],
    ["Ceftaroline", "Seftarolin", "5. kuşak sefalosporin, MRSA etkili"],
    // Karbapenemler
    ["Imipenem", "İmipenem", "Karbapenem antibiyotik"],
    ["Meropenem", "Meropenem", "Karbapenem antibiyotik"],
    ["Ertapenem", "Ertapenem", "Karbapenem antibiyotik"],
    ["Doripenem", "Doripenem", "Karbapenem antibiyotik"],
    // Aminoglikozidler
    ["Gentamicin", "Gentamisin", "Aminoglikozid antibiyotik"],
    ["Amikacin", "Amikasin", "Aminoglikozid antibiyotik"],
    ["Tobramycin", "Tobramisin", "Aminoglikozid antibiyotik"],
    ["Streptomycin", "Streptomisin", "Aminoglikozid antibiyotik"],
    ["Neomycin", "Neomisin", "Topikal aminoglikozid"],
    // Makrolidler
    ["Azithromycin", "Azitromisin", "Makrolid antibiyotik"],
    ["Clarithromycin", "Klaritromisin", "Makrolid antibiyotik"],
    ["Erythromycin", "Eritromisin", "Makrolid antibiyotik"],
    ["Roxithromycin", "Roksitromisin", "Makrolid antibiyotik"],
    // Florokinolonlar
    ["Ciprofloxacin", "Siprofloksasin", "Florokinolon antibiyotik"],
    ["Levofloxacin", "Levofloksasin", "Florokinolon antibiyotik"],
    ["Moxifloxacin", "Moksifloksasin", "Florokinolon antibiyotik"],
    ["Ofloxacin", "Ofloksasin", "Florokinolon antibiyotik"],
    ["Norfloxacin", "Norfloksasin", "Florokinolon antibiyotik"],
    // Tetrasiklinler
    ["Doxycycline", "Doksisiklin", "Tetrasiklin antibiyotik"],
    ["Minocycline", "Minosiklin", "Tetrasiklin antibiyotik"],
    ["Tigecycline", "Tigesiklin", "Glisisiklin antibiyotik"],
    // Glikopeptidler
    ["Vancomycin", "Vankomisin", "Glikopeptid antibiyotik"],
    ["Teicoplanin", "Teikoplanin", "Glikopeptid antibiyotik"],
    ["Dalbavancin", "Dalbavansin", "Lipoglikopeptid antibiyotik"],
    // Linkozamidler
    ["Clindamycin", "Klindamisin", "Linkozamid antibiyotik"],
    ["Lincomycin", "Linkomisin", "Linkozamid antibiyotik"],
    // Oksazolidinonlar
    ["Linezolid", "Linezolid", "Oksazolidinon antibiyotik"],
    ["Tedizolid", "Tedizolid", "Oksazolidinon antibiyotik"],
    // Polimiksinler
    ["Colistin", "Kolistin", "Polimiksin antibiyotik"],
    ["Polymyxin B", "Polimiksin B", "Polimiksin antibiyotik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Antiviral ilaçlar
const generateAntivirals = () => {
  const drugs = [
    ["Acyclovir", "Asiklovir", "Herpes virüs tedavisi"],
    ["Valacyclovir", "Valasiklovir", "Herpes virüs tedavisi"],
    ["Famciclovir", "Famsiklovir", "Herpes virüs tedavisi"],
    ["Ganciclovir", "Gansiklovir", "CMV tedavisi"],
    ["Valganciclovir", "Valgansiklovir", "Oral CMV tedavisi"],
    ["Foscarnet", "Foskarnet", "CMV ve herpes tedavisi"],
    ["Oseltamivir", "Oseltamivir", "İnfluenza tedavisi"],
    ["Zanamivir", "Zanamivir", "İnfluenza tedavisi"],
    ["Peramivir", "Peramivir", "İnfluenza tedavisi"],
    ["Baloxavir", "Baloksavir", "İnfluenza tedavisi"],
    ["Ribavirin", "Ribavirin", "Hepatit C tedavisi"],
    ["Sofosbuvir", "Sofosbuvir", "Hepatit C tedavisi"],
    ["Ledipasvir", "Ledipasvir", "Hepatit C tedavisi"],
    ["Daclatasvir", "Daklatasvir", "Hepatit C tedavisi"],
    ["Velpatasvir", "Velpatasvir", "Hepatit C tedavisi"],
    ["Glecaprevir", "Glekaprevir", "Hepatit C tedavisi"],
    ["Pibrentasvir", "Pibrentasvir", "Hepatit C tedavisi"],
    ["Entecavir", "Entekavir", "Hepatit B tedavisi"],
    ["Tenofovir", "Tenofovir", "Hepatit B ve HIV tedavisi"],
    ["Lamivudine", "Lamivudin", "Hepatit B ve HIV tedavisi"],
    ["Adefovir", "Adefovir", "Hepatit B tedavisi"],
    ["Remdesivir", "Remdesivir", "COVID-19 tedavisi"],
    ["Molnupiravir", "Molnupiravir", "COVID-19 tedavisi"],
    ["Nirmatrelvir", "Nirmatrelvir", "COVID-19 tedavisi"],
    ["Ritonavir", "Ritonavir", "HIV proteaz inhibitörü"],
    ["Lopinavir", "Lopinavir", "HIV proteaz inhibitörü"],
    ["Atazanavir", "Atazanavir", "HIV proteaz inhibitörü"],
    ["Darunavir", "Darunavir", "HIV proteaz inhibitörü"],
    ["Efavirenz", "Efavirenz", "HIV NNRTI"],
    ["Nevirapine", "Nevirapin", "HIV NNRTI"],
    ["Rilpivirine", "Rilpivirin", "HIV NNRTI"],
    ["Dolutegravir", "Dolutegravir", "HIV integraz inhibitörü"],
    ["Raltegravir", "Raltegravir", "HIV integraz inhibitörü"],
    ["Elvitegravir", "Elvitegravir", "HIV integraz inhibitörü"],
    ["Bictegravir", "Biktegravir", "HIV integraz inhibitörü"],
    ["Emtricitabine", "Emtrisitabin", "HIV NRTI"],
    ["Abacavir", "Abakavir", "HIV NRTI"],
    ["Zidovudine", "Zidovudin", "HIV NRTI, AZT"],
    ["Didanosine", "Didanozin", "HIV NRTI"],
    ["Stavudine", "Stavudin", "HIV NRTI"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Antifungal ilaçlar
const generateAntifungals = () => {
  const drugs = [
    ["Fluconazole", "Flukonazol", "Azol antifungal"],
    ["Itraconazole", "İtrakonazol", "Azol antifungal"],
    ["Voriconazole", "Vorikonazol", "Azol antifungal"],
    ["Posaconazole", "Posakonazol", "Azol antifungal"],
    ["Isavuconazole", "İsavukonazol", "Azol antifungal"],
    ["Ketoconazole", "Ketokonazol", "Azol antifungal"],
    ["Miconazole", "Mikonazol", "Topikal azol antifungal"],
    ["Clotrimazole", "Klotrimazol", "Topikal azol antifungal"],
    ["Econazole", "Ekonazol", "Topikal azol antifungal"],
    ["Amphotericin B", "Amfoterisin B", "Polien antifungal"],
    ["Nystatin", "Nistatin", "Polien antifungal"],
    ["Caspofungin", "Kaspofungin", "Ekinokandin antifungal"],
    ["Micafungin", "Mikafungin", "Ekinokandin antifungal"],
    ["Anidulafungin", "Anidulafungin", "Ekinokandin antifungal"],
    ["Terbinafine", "Terbinafin", "Allilamin antifungal"],
    ["Griseofulvin", "Griseofulvin", "Dermatofit tedavisi"],
    ["Flucytosine", "Flusitozin", "Antifungal, kriptokokoz"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Antiparaziter ilaçlar
const generateAntiparasitics = () => {
  const drugs = [
    ["Metronidazole", "Metronidazol", "Antiprotozoal ve anaerobik"],
    ["Tinidazole", "Tinidazol", "Antiprotozoal"],
    ["Ornidazole", "Ornidazol", "Antiprotozoal"],
    ["Secnidazole", "Seknidazol", "Antiprotozoal"],
    ["Albendazole", "Albendazol", "Antihelmintik"],
    ["Mebendazole", "Mebendazol", "Antihelmintik"],
    ["Ivermectin", "İvermektin", "Antihelmintik ve antiparaziter"],
    ["Praziquantel", "Prazikuantel", "Antihelmintik, şistozom"],
    ["Niclosamide", "Niklosamid", "Tenya tedavisi"],
    ["Pyrantel", "Pirantel", "Antihelmintik"],
    ["Levamisole", "Levamizol", "Antihelmintik"],
    ["Diethylcarbamazine", "Dietilkarbamazin", "Filaryaz tedavisi"],
    ["Chloroquine", "Klorokin", "Antimalaryal"],
    ["Hydroxychloroquine", "Hidroksiklorokin", "Antimalaryal ve otoimmün"],
    ["Mefloquine", "Meflokin", "Antimalaryal"],
    ["Primaquine", "Primakin", "Antimalaryal"],
    ["Atovaquone", "Atovakon", "Antimalaryal ve PCP"],
    ["Proguanil", "Proguanil", "Antimalaryal"],
    ["Artemether", "Artemeter", "Antimalaryal"],
    ["Lumefantrine", "Lumefantrin", "Antimalaryal"],
    ["Artesunate", "Artesunat", "Antimalaryal"],
    ["Quinine", "Kinin", "Antimalaryal"],
    ["Pentamidine", "Pentamidin", "Antiprotozoal"],
    ["Suramin", "Suramin", "Tripanosomiyaz tedavisi"],
    ["Nifurtimox", "Nifurtimoks", "Chagas hastalığı tedavisi"],
    ["Benznidazole", "Benznidazol", "Chagas hastalığı tedavisi"],
    ["Miltefosine", "Miltefosin", "Leishmaniasis tedavisi"],
    ["Sodium stibogluconate", "Sodyum stiboglukonat", "Leishmaniasis tedavisi"],
    ["Paromomycin", "Paromomisin", "Amebiyaz ve leishmaniasis"],
    ["Nitazoxanide", "Nitazoksanid", "Geniş spektrumlu antiparaziter"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Kardiyovasküler ilaçlar
const generateCardiovascularDrugs = () => {
  const drugs = [
    // Beta blokerler
    ["Metoprolol", "Metoprolol", "Kardiyoselektif beta bloker"],
    ["Bisoprolol", "Bisoprolol", "Kardiyoselektif beta bloker"],
    ["Atenolol", "Atenolol", "Kardiyoselektif beta bloker"],
    ["Nebivolol", "Nebivolol", "Kardiyoselektif beta bloker"],
    ["Carvedilol", "Karvedilol", "Alfa-beta bloker"],
    ["Labetalol", "Labetalol", "Alfa-beta bloker"],
    ["Propranolol", "Propranolol", "Non-selektif beta bloker"],
    ["Nadolol", "Nadolol", "Non-selektif beta bloker"],
    ["Timolol", "Timolol", "Non-selektif beta bloker"],
    ["Esmolol", "Esmolol", "Kısa etkili IV beta bloker"],
    // ACE inhibitörleri
    ["Lisinopril", "Lisinopril", "ACE inhibitörü"],
    ["Enalapril", "Enalapril", "ACE inhibitörü"],
    ["Ramipril", "Ramipril", "ACE inhibitörü"],
    ["Perindopril", "Perindopril", "ACE inhibitörü"],
    ["Captopril", "Kaptopril", "ACE inhibitörü"],
    ["Quinapril", "Kuinapril", "ACE inhibitörü"],
    ["Fosinopril", "Fosinopril", "ACE inhibitörü"],
    ["Benazepril", "Benazepril", "ACE inhibitörü"],
    ["Trandolapril", "Trandolapril", "ACE inhibitörü"],
    // ARB'ler
    ["Losartan", "Losartan", "Anjiyotensin reseptör blokeri"],
    ["Valsartan", "Valsartan", "Anjiyotensin reseptör blokeri"],
    ["Irbesartan", "İrbesartan", "Anjiyotensin reseptör blokeri"],
    ["Candesartan", "Kandesartan", "Anjiyotensin reseptör blokeri"],
    ["Telmisartan", "Telmisartan", "Anjiyotensin reseptör blokeri"],
    ["Olmesartan", "Olmesartan", "Anjiyotensin reseptör blokeri"],
    ["Azilsartan", "Azilsartan", "Anjiyotensin reseptör blokeri"],
    ["Eprosartan", "Eprosartan", "Anjiyotensin reseptör blokeri"],
    // Kalsiyum kanal blokerleri
    ["Amlodipine", "Amlodipin", "Dihidropiridin CCB"],
    ["Nifedipine", "Nifedipin", "Dihidropiridin CCB"],
    ["Felodipine", "Felodipin", "Dihidropiridin CCB"],
    ["Lercanidipine", "Lerkanidipin", "Dihidropiridin CCB"],
    ["Nicardipine", "Nikardipin", "Dihidropiridin CCB"],
    ["Diltiazem", "Diltiazem", "Non-dihidropiridin CCB"],
    ["Verapamil", "Verapamil", "Non-dihidropiridin CCB"],
    // Diüretikler
    ["Furosemide", "Furosemid", "Loop diüretik"],
    ["Bumetanide", "Bumetanid", "Loop diüretik"],
    ["Torsemide", "Torsemid", "Loop diüretik"],
    ["Hydrochlorothiazide", "Hidroklorotiyazid", "Tiyazid diüretik"],
    ["Chlorthalidone", "Klortalidon", "Tiyazid benzeri diüretik"],
    ["Indapamide", "İndapamid", "Tiyazid benzeri diüretik"],
    ["Spironolactone", "Spironolakton", "Potasyum tutucu diüretik"],
    ["Eplerenone", "Eplerenon", "Aldosteron antagonisti"],
    ["Amiloride", "Amilorid", "Potasyum tutucu diüretik"],
    ["Triamterene", "Triamteren", "Potasyum tutucu diüretik"],
    ["Acetazolamide", "Asetazolamid", "Karbonik anhidraz inhibitörü"],
    ["Mannitol", "Mannitol", "Osmotik diüretik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Antiaritmik ve diğer kardiyak ilaçlar
const generateCardiacDrugs2 = () => {
  const drugs = [
    // Antiaritmikler
    ["Amiodarone", "Amiodaron", "Sınıf III antiaritmik"],
    ["Dronedarone", "Dronedaron", "Sınıf III antiaritmik"],
    ["Sotalol", "Sotalol", "Sınıf III antiaritmik"],
    ["Flecainide", "Flekainid", "Sınıf IC antiaritmik"],
    ["Propafenone", "Propafenon", "Sınıf IC antiaritmik"],
    ["Lidocaine", "Lidokain", "Sınıf IB antiaritmik"],
    ["Mexiletine", "Meksiletine", "Sınıf IB antiaritmik"],
    ["Quinidine", "Kinidin", "Sınıf IA antiaritmik"],
    ["Procainamide", "Prokainamid", "Sınıf IA antiaritmik"],
    ["Disopyramide", "Dizopiramid", "Sınıf IA antiaritmik"],
    ["Adenosine", "Adenozin", "SVT tedavisi"],
    ["Digoxin", "Digoksin", "Kardiyak glikozid"],
    ["Digitoxin", "Dijitoksin", "Kardiyak glikozid"],
    // Nitratlar
    ["Nitroglycerin", "Nitrogliserin", "Nitrat, anjina tedavisi"],
    ["Isosorbide dinitrate", "İzosorbid dinitrat", "Nitrat"],
    ["Isosorbide mononitrate", "İzosorbid mononitrat", "Nitrat"],
    // Antikoagülanlar
    ["Warfarin", "Varfarin", "Vitamin K antagonisti"],
    ["Heparin", "Heparin", "Antikoagülan"],
    ["Enoxaparin", "Enoksaparin", "Düşük molekül ağırlıklı heparin"],
    ["Dalteparin", "Dalteparin", "Düşük molekül ağırlıklı heparin"],
    ["Fondaparinux", "Fondaparinuks", "Faktör Xa inhibitörü"],
    ["Rivaroxaban", "Rivaroksaban", "Direkt Xa inhibitörü"],
    ["Apixaban", "Apiksaban", "Direkt Xa inhibitörü"],
    ["Edoxaban", "Edoksaban", "Direkt Xa inhibitörü"],
    ["Dabigatran", "Dabigatran", "Direkt trombin inhibitörü"],
    ["Argatroban", "Argatroban", "Direkt trombin inhibitörü"],
    ["Bivalirudin", "Bivalirudin", "Direkt trombin inhibitörü"],
    // Antiplatelet
    ["Aspirin", "Aspirin", "COX inhibitörü, antiplatelet"],
    ["Clopidogrel", "Klopidogrel", "P2Y12 inhibitörü"],
    ["Prasugrel", "Prasugrel", "P2Y12 inhibitörü"],
    ["Ticagrelor", "Tikagrelor", "P2Y12 inhibitörü"],
    ["Cangrelor", "Kangrelor", "IV P2Y12 inhibitörü"],
    ["Dipyridamole", "Dipiridamol", "Antiplatelet"],
    ["Cilostazol", "Silostazol", "PDE3 inhibitörü"],
    ["Eptifibatide", "Eptifibatid", "GP IIb/IIIa inhibitörü"],
    ["Tirofiban", "Tirofiban", "GP IIb/IIIa inhibitörü"],
    ["Abciximab", "Absiksimab", "GP IIb/IIIa inhibitörü"],
    // Lipid düşürücüler
    ["Atorvastatin", "Atorvastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Rosuvastatin", "Rosuvastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Simvastatin", "Simvastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Pravastatin", "Pravastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Fluvastatin", "Fluvastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Pitavastatin", "Pitavastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Lovastatin", "Lovastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Ezetimibe", "Ezetimib", "Kolesterol emilim inhibitörü"],
    ["Fenofibrate", "Fenofibrat", "Fibrat"],
    ["Gemfibrozil", "Gemfibrozil", "Fibrat"],
    ["Bezafibrate", "Bezafibrat", "Fibrat"],
    ["Niacin", "Niasin", "Vitamin B3, lipid düşürücü"],
    ["Evolocumab", "Evolokumab", "PCSK9 inhibitörü"],
    ["Alirocumab", "Alirokumab", "PCSK9 inhibitörü"],
    ["Inclisiran", "İnklisiran", "siRNA PCSK9 inhibitörü"],
    ["Icosapent ethyl", "İkosapent etil", "Omega-3, trigliserid düşürücü"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Nörolojik ilaçlar
const generateNeurologicalDrugs = () => {
  const drugs = [
    // Antiepileptikler
    ["Phenytoin", "Fenitoin", "Antiepileptik"],
    ["Carbamazepine", "Karbamazepin", "Antiepileptik"],
    ["Oxcarbazepine", "Okskarbazepin", "Antiepileptik"],
    ["Valproic acid", "Valproik asit", "Antiepileptik"],
    ["Lamotrigine", "Lamotrijin", "Antiepileptik"],
    ["Levetiracetam", "Levetirasetam", "Antiepileptik"],
    ["Topiramate", "Topiramat", "Antiepileptik"],
    ["Gabapentin", "Gabapentin", "Antiepileptik, nöropatik ağrı"],
    ["Pregabalin", "Pregabalin", "Antiepileptik, nöropatik ağrı"],
    ["Lacosamide", "Lakozamid", "Antiepileptik"],
    ["Brivaracetam", "Brivarasetam", "Antiepileptik"],
    ["Perampanel", "Perampanel", "Antiepileptik"],
    ["Zonisamide", "Zonisamid", "Antiepileptik"],
    ["Eslicarbazepine", "Eslikarbazepin", "Antiepileptik"],
    ["Clobazam", "Klobazam", "Benzodiazepin antiepileptik"],
    ["Clonazepam", "Klonazepam", "Benzodiazepin antiepileptik"],
    ["Phenobarbital", "Fenobarbital", "Barbitürat antiepileptik"],
    ["Primidone", "Primidon", "Antiepileptik"],
    ["Ethosuximide", "Etosüksimid", "Absans epilepsi"],
    ["Vigabatrin", "Vigabatrin", "Antiepileptik"],
    // Parkinson ilaçları
    ["Levodopa", "Levodopa", "Dopamin öncüsü"],
    ["Carbidopa", "Karbidopa", "Dopa dekarboksilaz inhibitörü"],
    ["Benserazide", "Benserazid", "Dopa dekarboksilaz inhibitörü"],
    ["Pramipexole", "Pramipeksol", "Dopamin agonisti"],
    ["Ropinirole", "Ropinirol", "Dopamin agonisti"],
    ["Rotigotine", "Rotigotin", "Dopamin agonisti"],
    ["Apomorphine", "Apomorfin", "Dopamin agonisti"],
    ["Bromocriptine", "Bromokriptin", "Dopamin agonisti"],
    ["Cabergoline", "Kabergolin", "Dopamin agonisti"],
    ["Selegiline", "Selejilin", "MAO-B inhibitörü"],
    ["Rasagiline", "Rasajilin", "MAO-B inhibitörü"],
    ["Safinamide", "Safinamid", "MAO-B inhibitörü"],
    ["Entacapone", "Entakapon", "COMT inhibitörü"],
    ["Tolcapone", "Tolkapon", "COMT inhibitörü"],
    ["Opicapone", "Opikapon", "COMT inhibitörü"],
    ["Amantadine", "Amantadin", "Antiparkinson, antiviral"],
    ["Trihexyphenidyl", "Triheksifenidil", "Antikolinerjik"],
    ["Benztropine", "Benztropin", "Antikolinerjik"],
    // Alzheimer ilaçları
    ["Donepezil", "Donepezil", "Kolinesteraz inhibitörü"],
    ["Rivastigmine", "Rivastigmin", "Kolinesteraz inhibitörü"],
    ["Galantamine", "Galantamin", "Kolinesteraz inhibitörü"],
    ["Memantine", "Memantin", "NMDA antagonisti"],
    // MS ilaçları
    ["Interferon beta-1a", "İnterferon beta-1a", "MS tedavisi"],
    ["Interferon beta-1b", "İnterferon beta-1b", "MS tedavisi"],
    ["Glatiramer acetate", "Glatiramer asetat", "MS tedavisi"],
    ["Fingolimod", "Fingolimod", "S1P reseptör modülatörü"],
    ["Siponimod", "Siponimod", "S1P reseptör modülatörü"],
    ["Ozanimod", "Ozanimod", "S1P reseptör modülatörü"],
    ["Dimethyl fumarate", "Dimetil fumarat", "MS tedavisi"],
    ["Teriflunomide", "Teriflunomid", "MS tedavisi"],
    ["Natalizumab", "Natalizumab", "MS monoklonal antikor"],
    ["Ocrelizumab", "Okrelizumab", "MS monoklonal antikor"],
    ["Alemtuzumab", "Alemtuzumab", "MS monoklonal antikor"],
    ["Cladribine", "Kladribin", "MS tedavisi"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Psikiyatrik ilaçlar
const generatePsychiatricDrugs = () => {
  const drugs = [
    // Antidepresanlar - SSRI
    ["Fluoxetine", "Fluoksetin", "SSRI antidepresan"],
    ["Sertraline", "Sertralin", "SSRI antidepresan"],
    ["Paroxetine", "Paroksetin", "SSRI antidepresan"],
    ["Citalopram", "Sitalopram", "SSRI antidepresan"],
    ["Escitalopram", "Essitalopram", "SSRI antidepresan"],
    ["Fluvoxamine", "Fluvoksamin", "SSRI antidepresan"],
    // SNRI
    ["Venlafaxine", "Venlafaksin", "SNRI antidepresan"],
    ["Duloxetine", "Duloksetin", "SNRI antidepresan"],
    ["Desvenlafaxine", "Desvenlafaksin", "SNRI antidepresan"],
    ["Milnacipran", "Milnasipran", "SNRI antidepresan"],
    ["Levomilnacipran", "Levomilnasipran", "SNRI antidepresan"],
    // Trisiklik
    ["Amitriptyline", "Amitriptilin", "Trisiklik antidepresan"],
    ["Nortriptyline", "Nortriptilin", "Trisiklik antidepresan"],
    ["Imipramine", "İmipramin", "Trisiklik antidepresan"],
    ["Desipramine", "Desipramin", "Trisiklik antidepresan"],
    ["Clomipramine", "Klomipramin", "Trisiklik antidepresan"],
    ["Doxepin", "Doksepin", "Trisiklik antidepresan"],
    ["Trimipramine", "Trimipramin", "Trisiklik antidepresan"],
    // Diğer antidepresanlar
    ["Bupropion", "Bupropion", "NDRI antidepresan"],
    ["Mirtazapine", "Mirtazapin", "NaSSA antidepresan"],
    ["Trazodone", "Trazodon", "SARI antidepresan"],
    ["Nefazodone", "Nefazodon", "SARI antidepresan"],
    ["Vortioxetine", "Vortioksetin", "Multimodal antidepresan"],
    ["Vilazodone", "Vilazodon", "SSRI ve 5-HT1A agonist"],
    ["Agomelatine", "Agomelatin", "Melatonin agonisti"],
    // MAO inhibitörleri
    ["Phenelzine", "Fenelzin", "MAO inhibitörü"],
    ["Tranylcypromine", "Tranilsipromin", "MAO inhibitörü"],
    ["Moclobemide", "Moklobemid", "Reversible MAO-A inhibitörü"],
    // Antipsikotikler - Tipik
    ["Haloperidol", "Haloperidol", "Tipik antipsikotik"],
    ["Chlorpromazine", "Klorpromazin", "Tipik antipsikotik"],
    ["Fluphenazine", "Flufenazin", "Tipik antipsikotik"],
    ["Perphenazine", "Perfenazin", "Tipik antipsikotik"],
    ["Thioridazine", "Tiyoridazin", "Tipik antipsikotik"],
    ["Thiothixene", "Tiyotiksene", "Tipik antipsikotik"],
    ["Trifluoperazine", "Trifluoperazin", "Tipik antipsikotik"],
    ["Pimozide", "Pimozid", "Tipik antipsikotik"],
    ["Zuclopenthixol", "Zuklopentiksol", "Tipik antipsikotik"],
    // Atipik antipsikotikler
    ["Risperidone", "Risperidon", "Atipik antipsikotik"],
    ["Olanzapine", "Olanzapin", "Atipik antipsikotik"],
    ["Quetiapine", "Ketiapin", "Atipik antipsikotik"],
    ["Aripiprazole", "Aripiprazol", "Atipik antipsikotik"],
    ["Ziprasidone", "Ziprasidon", "Atipik antipsikotik"],
    ["Paliperidone", "Paliperidon", "Atipik antipsikotik"],
    ["Clozapine", "Klozapin", "Atipik antipsikotik"],
    ["Asenapine", "Asenapin", "Atipik antipsikotik"],
    ["Iloperidone", "İloperidon", "Atipik antipsikotik"],
    ["Lurasidone", "Lurasidon", "Atipik antipsikotik"],
    ["Brexpiprazole", "Breksipiprazol", "Atipik antipsikotik"],
    ["Cariprazine", "Kariprazin", "Atipik antipsikotik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Anksiyolitik ve sedatif ilaçlar
const generateAnxiolyticDrugs = () => {
  const drugs = [
    // Benzodiazepinler
    ["Diazepam", "Diazepam", "Benzodiazepin anksiyolitik"],
    ["Lorazepam", "Lorazepam", "Benzodiazepin anksiyolitik"],
    ["Alprazolam", "Alprazolam", "Benzodiazepin anksiyolitik"],
    ["Midazolam", "Midazolam", "Kısa etkili benzodiazepin"],
    ["Triazolam", "Triazolam", "Kısa etkili benzodiazepin"],
    ["Temazepam", "Temazepam", "Benzodiazepin hipnotik"],
    ["Flurazepam", "Flurazepam", "Benzodiazepin hipnotik"],
    ["Estazolam", "Estazolam", "Benzodiazepin hipnotik"],
    ["Oxazepam", "Oksazepam", "Benzodiazepin anksiyolitik"],
    ["Chlordiazepoxide", "Klordiazepoksit", "Benzodiazepin anksiyolitik"],
    ["Bromazepam", "Bromazepam", "Benzodiazepin anksiyolitik"],
    ["Nitrazepam", "Nitrazepam", "Benzodiazepin hipnotik"],
    // Z-ilaçları
    ["Zolpidem", "Zolpidem", "Non-benzodiazepin hipnotik"],
    ["Zopiclone", "Zopiklon", "Non-benzodiazepin hipnotik"],
    ["Eszopiclone", "Eszopiklon", "Non-benzodiazepin hipnotik"],
    ["Zaleplon", "Zaleplon", "Non-benzodiazepin hipnotik"],
    // Diğer
    ["Buspirone", "Buspiron", "5-HT1A agonist anksiyolitik"],
    ["Hydroxyzine", "Hidroksizin", "Antihistaminik anksiyolitik"],
    ["Melatonin", "Melatonin", "Uyku düzenleyici hormon"],
    ["Ramelteon", "Ramelteon", "Melatonin reseptör agonisti"],
    ["Suvorexant", "Suvoreksant", "Oreksin antagonisti"],
    ["Lemborexant", "Lemboreksant", "Oreksin antagonisti"],
    // Duygudurum dengeleyiciler
    ["Lithium", "Lityum", "Duygudurum dengeleyici"],
    ["Divalproex", "Divalproeks", "Duygudurum dengeleyici"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Ağrı kesiciler ve anestezikler
const generateAnalgesics = () => {
  const drugs = [
    // NSAİİ
    ["Ibuprofen", "İbuprofen", "NSAİİ, ağrı kesici"],
    ["Naproxen", "Naproksen", "NSAİİ, ağrı kesici"],
    ["Diclofenac", "Diklofenak", "NSAİİ, ağrı kesici"],
    ["Indomethacin", "İndometasin", "NSAİİ, ağrı kesici"],
    ["Piroxicam", "Piroksikam", "NSAİİ, ağrı kesici"],
    ["Meloxicam", "Meloksikam", "COX-2 selektif NSAİİ"],
    ["Celecoxib", "Selekoksib", "COX-2 selektif NSAİİ"],
    ["Etoricoxib", "Etorikoksib", "COX-2 selektif NSAİİ"],
    ["Ketorolac", "Ketorolak", "NSAİİ, güçlü analjezik"],
    ["Ketoprofen", "Ketoprofen", "NSAİİ, ağrı kesici"],
    ["Flurbiprofen", "Flurbiprofen", "NSAİİ, ağrı kesici"],
    ["Sulindac", "Sulindak", "NSAİİ, ağrı kesici"],
    ["Etodolac", "Etodolak", "NSAİİ, ağrı kesici"],
    ["Nabumetone", "Nabumeton", "NSAİİ, ağrı kesici"],
    ["Mefenamic acid", "Mefenamik asit", "NSAİİ, ağrı kesici"],
    // Opioidler
    ["Morphine", "Morfin", "Güçlü opioid analjezik"],
    ["Codeine", "Kodein", "Zayıf opioid analjezik"],
    ["Oxycodone", "Oksikodon", "Güçlü opioid analjezik"],
    ["Hydrocodone", "Hidrokodon", "Opioid analjezik"],
    ["Hydromorphone", "Hidromorfon", "Güçlü opioid analjezik"],
    ["Fentanyl", "Fentanil", "Sentetik opioid analjezik"],
    ["Methadone", "Metadon", "Opioid analjezik"],
    ["Buprenorphine", "Buprenorfin", "Parsiyel opioid agonist"],
    ["Tramadol", "Tramadol", "Atipik opioid analjezik"],
    ["Tapentadol", "Tapentadol", "Atipik opioid analjezik"],
    ["Meperidine", "Meperidin", "Opioid analjezik"],
    ["Sufentanil", "Sufentanil", "Güçlü sentetik opioid"],
    ["Alfentanil", "Alfentanil", "Kısa etkili opioid"],
    ["Remifentanil", "Remifentanil", "Ultra kısa etkili opioid"],
    ["Naloxone", "Nalokson", "Opioid antagonisti"],
    ["Naltrexone", "Naltrekson", "Opioid antagonisti"],
    ["Nalmefene", "Nalmefen", "Opioid antagonisti"],
    // Anestezikler
    ["Propofol", "Propofol", "IV genel anestezik"],
    ["Ketamine", "Ketamin", "Disosiyatif anestezik"],
    ["Etomidate", "Etomidat", "IV genel anestezik"],
    ["Thiopental", "Tiyopental", "Barbitürat anestezik"],
    ["Methohexital", "Metoheksital", "Barbitürat anestezik"],
    ["Sevoflurane", "Sevofluran", "İnhalasyon anestezik"],
    ["Desflurane", "Desfluran", "İnhalasyon anestezik"],
    ["Isoflurane", "İzofluran", "İnhalasyon anestezik"],
    ["Nitrous oxide", "Azot protoksit", "İnhalasyon anestezik"],
    ["Halothane", "Halotan", "İnhalasyon anestezik"],
    // Lokal anestezikler
    ["Bupivacaine", "Bupivakain", "Uzun etkili lokal anestezik"],
    ["Ropivacaine", "Ropivakain", "Lokal anestezik"],
    ["Mepivacaine", "Mepivakain", "Lokal anestezik"],
    ["Prilocaine", "Prilokain", "Lokal anestezik"],
    ["Articaine", "Artikain", "Lokal anestezik"],
    ["Tetracaine", "Tetrakain", "Topikal anestezik"],
    ["Benzocaine", "Benzokain", "Topikal anestezik"],
    // Kas gevşeticiler
    ["Succinylcholine", "Süksinilkolin", "Depolarize edici kas gevşetici"],
    ["Rocuronium", "Rokuronyum", "Non-depolarize kas gevşetici"],
    ["Vecuronium", "Vekuronyum", "Non-depolarize kas gevşetici"],
    ["Atracurium", "Atrakuryum", "Non-depolarize kas gevşetici"],
    ["Cisatracurium", "Sisatrakuryum", "Non-depolarize kas gevşetici"],
    ["Pancuronium", "Pankuronyum", "Non-depolarize kas gevşetici"],
    ["Sugammadex", "Sugammadeks", "Kas gevşetici antagonisti"],
    ["Neostigmine", "Neostigmin", "Kolinesteraz inhibitörü"],
    ["Pyridostigmine", "Piridostigmin", "Kolinesteraz inhibitörü"],
    // Santral kas gevşeticiler
    ["Baclofen", "Baklofen", "GABA-B agonist kas gevşetici"],
    ["Tizanidine", "Tizanidin", "Alfa-2 agonist kas gevşetici"],
    ["Cyclobenzaprine", "Siklobenzaprin", "Santral kas gevşetici"],
    ["Methocarbamol", "Metokarbamol", "Santral kas gevşetici"],
    ["Carisoprodol", "Karisoprodol", "Santral kas gevşetici"],
    ["Orphenadrine", "Orfenadrin", "Santral kas gevşetici"],
    ["Dantrolene", "Dantrolen", "Periferik kas gevşetici"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Endokrin ilaçlar
const generateEndocrineDrugs = () => {
  const drugs = [
    // Diyabet ilaçları
    ["Metformin", "Metformin", "Biguanid, tip 2 diyabet"],
    ["Glimepiride", "Glimepirid", "Sülfonilüre"],
    ["Glipizide", "Glipizid", "Sülfonilüre"],
    ["Glyburide", "Glibürid", "Sülfonilüre"],
    ["Gliclazide", "Gliklazid", "Sülfonilüre"],
    ["Repaglinide", "Repaglinid", "Meglitinid"],
    ["Nateglinide", "Nateglinid", "Meglitinid"],
    ["Pioglitazone", "Pioglitazon", "Tiyazolidindion"],
    ["Rosiglitazone", "Rosiglitazon", "Tiyazolidindion"],
    ["Acarbose", "Akarboz", "Alfa-glukozidaz inhibitörü"],
    ["Miglitol", "Miglitol", "Alfa-glukozidaz inhibitörü"],
    ["Sitagliptin", "Sitagliptin", "DPP-4 inhibitörü"],
    ["Saxagliptin", "Saksagliptin", "DPP-4 inhibitörü"],
    ["Linagliptin", "Linagliptin", "DPP-4 inhibitörü"],
    ["Alogliptin", "Alogliptin", "DPP-4 inhibitörü"],
    ["Vildagliptin", "Vildagliptin", "DPP-4 inhibitörü"],
    ["Empagliflozin", "Empagliflozin", "SGLT2 inhibitörü"],
    ["Dapagliflozin", "Dapagliflozin", "SGLT2 inhibitörü"],
    ["Canagliflozin", "Kanagliflozin", "SGLT2 inhibitörü"],
    ["Ertugliflozin", "Ertugliflozin", "SGLT2 inhibitörü"],
    ["Liraglutide", "Liraglutid", "GLP-1 agonisti"],
    ["Semaglutide", "Semaglutid", "GLP-1 agonisti"],
    ["Dulaglutide", "Dulaglutid", "GLP-1 agonisti"],
    ["Exenatide", "Eksenatid", "GLP-1 agonisti"],
    ["Lixisenatide", "Liksisenatid", "GLP-1 agonisti"],
    ["Tirzepatide", "Tirzepatid", "GIP/GLP-1 agonisti"],
    // İnsülinler
    ["Insulin lispro", "İnsülin lispro", "Hızlı etkili insülin"],
    ["Insulin aspart", "İnsülin aspart", "Hızlı etkili insülin"],
    ["Insulin glulisine", "İnsülin glulisin", "Hızlı etkili insülin"],
    ["Regular insulin", "Regüler insülin", "Kısa etkili insülin"],
    ["NPH insulin", "NPH insülin", "Orta etkili insülin"],
    ["Insulin glargine", "İnsülin glarjin", "Uzun etkili insülin"],
    ["Insulin detemir", "İnsülin detemir", "Uzun etkili insülin"],
    ["Insulin degludec", "İnsülin degludek", "Ultra uzun etkili insülin"],
    // Tiroid ilaçları
    ["Levothyroxine", "Levotiroksin", "Tiroid hormonu"],
    ["Liothyronine", "Liyotironin", "T3 tiroid hormonu"],
    ["Methimazole", "Metimazol", "Antitiroid ilaç"],
    ["Propylthiouracil", "Propiltiyourasil", "Antitiroid ilaç"],
    ["Potassium iodide", "Potasyum iyodür", "Tiroid koruyucu"],
    // Kortikosteroidler
    ["Prednisone", "Prednizon", "Oral kortikosteroid"],
    ["Prednisolone", "Prednizolon", "Oral kortikosteroid"],
    ["Methylprednisolone", "Metilprednizolon", "Kortikosteroid"],
    ["Dexamethasone", "Deksametazon", "Güçlü kortikosteroid"],
    ["Betamethasone", "Betametazon", "Güçlü kortikosteroid"],
    ["Hydrocortisone", "Hidrokortizon", "Kortikosteroid"],
    ["Triamcinolone", "Triamsinolon", "Kortikosteroid"],
    ["Budesonide", "Budesonid", "İnhale kortikosteroid"],
    ["Fluticasone", "Flutikazon", "İnhale kortikosteroid"],
    ["Beclomethasone", "Beklometazon", "İnhale kortikosteroid"],
    ["Mometasone", "Mometazon", "Topikal kortikosteroid"],
    ["Clobetasol", "Klobetazol", "Güçlü topikal kortikosteroid"],
    ["Fludrocortisone", "Fludrokortizon", "Mineralokortikoid"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Solunum sistemi ilaçları
const generateRespiratoryDrugs = () => {
  const drugs = [
    // Bronkodilatörler
    ["Salbutamol", "Salbutamol", "Kısa etkili beta-2 agonist"],
    ["Albuterol", "Albuterol", "Kısa etkili beta-2 agonist"],
    ["Terbutaline", "Terbutalin", "Beta-2 agonist"],
    ["Levalbuterol", "Levalbuterol", "Beta-2 agonist"],
    ["Formoterol", "Formoterol", "Uzun etkili beta-2 agonist"],
    ["Salmeterol", "Salmeterol", "Uzun etkili beta-2 agonist"],
    ["Indacaterol", "İndakaterol", "Ultra uzun etkili beta-2 agonist"],
    ["Vilanterol", "Vilanterol", "Uzun etkili beta-2 agonist"],
    ["Olodaterol", "Olodaterol", "Uzun etkili beta-2 agonist"],
    ["Ipratropium", "İpratropium", "Kısa etkili antikolinerjik"],
    ["Tiotropium", "Tiyotropium", "Uzun etkili antikolinerjik"],
    ["Glycopyrronium", "Glikopironyum", "Uzun etkili antikolinerjik"],
    ["Umeclidinium", "Umeklidinyum", "Uzun etkili antikolinerjik"],
    ["Aclidinium", "Aklidinyum", "Uzun etkili antikolinerjik"],
    ["Theophylline", "Teofilin", "Metilksantin bronkodilatör"],
    ["Aminophylline", "Aminofilin", "Metilksantin bronkodilatör"],
    // Antiastmatikler
    ["Montelukast", "Montelukast", "Lökotrien reseptör antagonisti"],
    ["Zafirlukast", "Zafirlukast", "Lökotrien reseptör antagonisti"],
    ["Zileuton", "Zileuton", "5-lipoksigenaz inhibitörü"],
    ["Cromolyn", "Kromolin", "Mast hücre stabilizatörü"],
    ["Nedocromil", "Nedokromil", "Mast hücre stabilizatörü"],
    ["Omalizumab", "Omalizumab", "Anti-IgE monoklonal antikor"],
    ["Mepolizumab", "Mepolizumab", "Anti-IL-5 monoklonal antikor"],
    ["Benralizumab", "Benralizumab", "Anti-IL-5R monoklonal antikor"],
    ["Dupilumab", "Dupilumab", "Anti-IL-4/IL-13 monoklonal antikor"],
    ["Tezepelumab", "Tezepelumab", "Anti-TSLP monoklonal antikor"],
    // Öksürük ve balgam söktürücüler
    ["Dextromethorphan", "Dekstrometorfan", "Öksürük kesici"],
    ["Codeine", "Kodein", "Öksürük kesici, opioid"],
    ["Guaifenesin", "Guaifenesin", "Ekspektoran"],
    ["Acetylcysteine", "Asetilsistein", "Mukolitik"],
    ["Carbocisteine", "Karbosistein", "Mukolitik"],
    ["Bromhexine", "Bromheksin", "Mukolitik"],
    ["Ambroxol", "Ambroksol", "Mukolitik"],
    ["Erdosteine", "Erdostein", "Mukolitik"],
    // Dekonjestanlar
    ["Pseudoephedrine", "Psödoefedrin", "Sistemik dekonjestan"],
    ["Phenylephrine", "Fenilefrin", "Dekonjestan"],
    ["Oxymetazoline", "Oksimetazolin", "Topikal dekonjestan"],
    ["Xylometazoline", "Ksilometazolin", "Topikal dekonjestan"],
    ["Naphazoline", "Nafazolin", "Topikal dekonjestan"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Gastrointestinal ilaçlar
const generateGIDrugs = () => {
  const drugs = [
    // Proton pompa inhibitörleri
    ["Omeprazole", "Omeprazol", "Proton pompa inhibitörü"],
    ["Esomeprazole", "Esomeprazol", "Proton pompa inhibitörü"],
    ["Lansoprazole", "Lansoprazol", "Proton pompa inhibitörü"],
    ["Pantoprazole", "Pantoprazol", "Proton pompa inhibitörü"],
    ["Rabeprazole", "Rabeprazol", "Proton pompa inhibitörü"],
    ["Dexlansoprazole", "Dekslansoprazol", "Proton pompa inhibitörü"],
    // H2 reseptör antagonistleri
    ["Ranitidine", "Ranitidin", "H2 reseptör antagonisti"],
    ["Famotidine", "Famotidin", "H2 reseptör antagonisti"],
    ["Cimetidine", "Simetidin", "H2 reseptör antagonisti"],
    ["Nizatidine", "Nizatidin", "H2 reseptör antagonisti"],
    // Antiasitler
    ["Aluminum hydroxide", "Alüminyum hidroksit", "Antiasit"],
    ["Magnesium hydroxide", "Magnezyum hidroksit", "Antiasit"],
    ["Calcium carbonate", "Kalsiyum karbonat", "Antiasit"],
    ["Sodium bicarbonate", "Sodyum bikarbonat", "Antiasit"],
    ["Sucralfate", "Sukralfat", "Mukoza koruyucu"],
    ["Bismuth subsalicylate", "Bizmut subsalisilat", "Mukoza koruyucu"],
    // Antiemetikler
    ["Ondansetron", "Ondansetron", "5-HT3 antagonisti antiemetik"],
    ["Granisetron", "Granisetron", "5-HT3 antagonisti antiemetik"],
    ["Palonosetron", "Palonosetron", "5-HT3 antagonisti antiemetik"],
    ["Dolasetron", "Dolasetron", "5-HT3 antagonisti antiemetik"],
    ["Metoclopramide", "Metoklopramid", "Prokinetik antiemetik"],
    ["Domperidone", "Domperidon", "Prokinetik antiemetik"],
    ["Prochlorperazine", "Proklorperazin", "Fenotiazin antiemetik"],
    ["Promethazine", "Prometazin", "Antihistaminik antiemetik"],
    ["Dimenhydrinate", "Dimenhidrinat", "Antihistaminik antiemetik"],
    ["Meclizine", "Meklizin", "Antihistaminik antiemetik"],
    ["Scopolamine", "Skopolamin", "Antikolinerjik antiemetik"],
    ["Aprepitant", "Aprepitant", "NK1 antagonisti antiemetik"],
    ["Fosaprepitant", "Fosaprepitant", "NK1 antagonisti antiemetik"],
    ["Netupitant", "Netupitant", "NK1 antagonisti antiemetik"],
    ["Dronabinol", "Dronabinol", "Kannabinoid antiemetik"],
    ["Nabilone", "Nabilon", "Kannabinoid antiemetik"],
    // Laksatifler
    ["Polyethylene glycol", "Polietilen glikol", "Osmotik laksatif"],
    ["Lactulose", "Laktuloz", "Osmotik laksatif"],
    ["Magnesium citrate", "Magnezyum sitrat", "Osmotik laksatif"],
    ["Bisacodyl", "Bisakodil", "Stimülan laksatif"],
    ["Senna", "Senna", "Stimülan laksatif"],
    ["Docusate", "Dokuzat", "Yumuşatıcı laksatif"],
    ["Psyllium", "Psyllium", "Lif laksatif"],
    ["Methylcellulose", "Metilselüloz", "Lif laksatif"],
    ["Lubiprostone", "Lubiproston", "Klorür kanal aktivatörü"],
    ["Linaclotide", "Linakotid", "Guanilat siklaz agonisti"],
    ["Plecanatide", "Plekanatid", "Guanilat siklaz agonisti"],
    ["Prucalopride", "Prukaloprid", "5-HT4 agonist prokinetik"],
    // Antidiyareikler
    ["Loperamide", "Loperamid", "Opioid antidiyareik"],
    ["Diphenoxylate", "Difenoksilat", "Opioid antidiyareik"],
    ["Bismuth subsalicylate", "Bizmut subsalisilat", "Antidiyareik"],
    ["Rifaximin", "Rifaksimin", "Bağırsak antibiyotiği"],
    // İBH ilaçları
    ["Mesalamine", "Mesalamin", "5-ASA, ülseratif kolit"],
    ["Sulfasalazine", "Sülfasalazin", "5-ASA, İBH"],
    ["Balsalazide", "Balsalazid", "5-ASA, ülseratif kolit"],
    ["Olsalazine", "Olsalazin", "5-ASA, ülseratif kolit"],
    ["Infliximab", "İnfliksimab", "Anti-TNF, İBH"],
    ["Adalimumab", "Adalimumab", "Anti-TNF, İBH"],
    ["Certolizumab", "Sertolizumab", "Anti-TNF, İBH"],
    ["Golimumab", "Golimumab", "Anti-TNF, İBH"],
    ["Vedolizumab", "Vedolizumab", "Anti-integrin, İBH"],
    ["Ustekinumab", "Ustekinumab", "Anti-IL-12/23, İBH"],
    ["Tofacitinib", "Tofasitinib", "JAK inhibitörü, İBH"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Onkoloji ilaçları
const generateOncologyDrugs = () => {
  const drugs = [
    // Alkilleyici ajanlar
    ["Cyclophosphamide", "Siklofosfamid", "Alkilleyici ajan"],
    ["Ifosfamide", "İfosfamid", "Alkilleyici ajan"],
    ["Melphalan", "Melfalan", "Alkilleyici ajan"],
    ["Chlorambucil", "Klorambusil", "Alkilleyici ajan"],
    ["Busulfan", "Busulfan", "Alkilleyici ajan"],
    ["Bendamustine", "Bendamustin", "Alkilleyici ajan"],
    ["Temozolomide", "Temozolomid", "Alkilleyici ajan"],
    ["Dacarbazine", "Dakarbazin", "Alkilleyici ajan"],
    ["Procarbazine", "Prokarbazin", "Alkilleyici ajan"],
    ["Carmustine", "Karmustin", "Nitrozüre"],
    ["Lomustine", "Lomustin", "Nitrozüre"],
    // Antimetabolitler
    ["Methotrexate", "Metotreksat", "Folat antagonisti"],
    ["Pemetrexed", "Pemetrekset", "Folat antagonisti"],
    ["Fluorouracil", "Fluorourasil", "Pirimidin analoğu"],
    ["Capecitabine", "Kapesitabin", "Oral 5-FU ön ilacı"],
    ["Gemcitabine", "Gemsitabin", "Pirimidin analoğu"],
    ["Cytarabine", "Sitarabin", "Pirimidin analoğu"],
    ["Azacitidine", "Azasitidin", "Pirimidin analoğu"],
    ["Decitabine", "Desitabin", "Pirimidin analoğu"],
    ["Mercaptopurine", "Merkaptopürin", "Pürin analoğu"],
    ["Thioguanine", "Tiyoguanin", "Pürin analoğu"],
    ["Fludarabine", "Fludarabin", "Pürin analoğu"],
    ["Cladribine", "Kladribin", "Pürin analoğu"],
    ["Clofarabine", "Klofarabin", "Pürin analoğu"],
    ["Nelarabine", "Nelarabin", "Pürin analoğu"],
    // Antrasiklin antibiyotikler
    ["Doxorubicin", "Doksorubisin", "Antrasiklin"],
    ["Daunorubicin", "Daunorubisin", "Antrasiklin"],
    ["Epirubicin", "Epirubisin", "Antrasiklin"],
    ["Idarubicin", "İdarubisin", "Antrasiklin"],
    ["Mitoxantrone", "Mitoksantron", "Antrasendion"],
    ["Bleomycin", "Bleomisin", "Antitümör antibiyotik"],
    ["Mitomycin", "Mitomisin", "Antitümör antibiyotik"],
    ["Actinomycin D", "Aktinomisin D", "Antitümör antibiyotik"],
    // Mikrotübül inhibitörleri
    ["Paclitaxel", "Paklitaksel", "Taksan"],
    ["Docetaxel", "Dosetaksel", "Taksan"],
    ["Cabazitaxel", "Kabazitaksel", "Taksan"],
    ["Vincristine", "Vinkristin", "Vinka alkaloid"],
    ["Vinblastine", "Vinblastin", "Vinka alkaloid"],
    ["Vinorelbine", "Vinorelbin", "Vinka alkaloid"],
    ["Eribulin", "Eribulin", "Mikrotübül inhibitörü"],
    // Topoizomeraz inhibitörleri
    ["Etoposide", "Etoposid", "Topoizomeraz II inhibitörü"],
    ["Teniposide", "Teniposid", "Topoizomeraz II inhibitörü"],
    ["Irinotecan", "İrinotekan", "Topoizomeraz I inhibitörü"],
    ["Topotecan", "Topotekan", "Topoizomeraz I inhibitörü"],
    // Platin bileşikleri
    ["Cisplatin", "Sisplatin", "Platin bileşiği"],
    ["Carboplatin", "Karboplatin", "Platin bileşiği"],
    ["Oxaliplatin", "Oksaliplatin", "Platin bileşiği"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Hedefe yönelik tedaviler
const generateTargetedTherapies = () => {
  const drugs = [
    // Tirozin kinaz inhibitörleri
    ["Imatinib", "İmatinib", "BCR-ABL inhibitörü"],
    ["Dasatinib", "Dasatinib", "BCR-ABL inhibitörü"],
    ["Nilotinib", "Nilotinib", "BCR-ABL inhibitörü"],
    ["Bosutinib", "Bosutinib", "BCR-ABL inhibitörü"],
    ["Ponatinib", "Ponatinib", "BCR-ABL inhibitörü"],
    ["Gefitinib", "Gefitinib", "EGFR inhibitörü"],
    ["Erlotinib", "Erlotinib", "EGFR inhibitörü"],
    ["Afatinib", "Afatinib", "EGFR inhibitörü"],
    ["Osimertinib", "Osimertinib", "EGFR inhibitörü"],
    ["Lapatinib", "Lapatinib", "HER2 inhibitörü"],
    ["Neratinib", "Neratinib", "HER2 inhibitörü"],
    ["Tucatinib", "Tukatinib", "HER2 inhibitörü"],
    ["Sorafenib", "Sorafenib", "Multi-kinaz inhibitörü"],
    ["Sunitinib", "Sunitinib", "Multi-kinaz inhibitörü"],
    ["Pazopanib", "Pazopanib", "Multi-kinaz inhibitörü"],
    ["Axitinib", "Aksitinib", "VEGFR inhibitörü"],
    ["Cabozantinib", "Kabozantinib", "Multi-kinaz inhibitörü"],
    ["Lenvatinib", "Lenvatinib", "Multi-kinaz inhibitörü"],
    ["Regorafenib", "Regorafenib", "Multi-kinaz inhibitörü"],
    ["Vandetanib", "Vandetanib", "Multi-kinaz inhibitörü"],
    ["Crizotinib", "Krizotinib", "ALK inhibitörü"],
    ["Ceritinib", "Seritinib", "ALK inhibitörü"],
    ["Alectinib", "Alektinib", "ALK inhibitörü"],
    ["Brigatinib", "Brigatinib", "ALK inhibitörü"],
    ["Lorlatinib", "Lorlatinib", "ALK inhibitörü"],
    ["Vemurafenib", "Vemurafenib", "BRAF inhibitörü"],
    ["Dabrafenib", "Dabrafenib", "BRAF inhibitörü"],
    ["Encorafenib", "Enkorafenib", "BRAF inhibitörü"],
    ["Trametinib", "Trametinib", "MEK inhibitörü"],
    ["Cobimetinib", "Kobimetinib", "MEK inhibitörü"],
    ["Binimetinib", "Binimetinib", "MEK inhibitörü"],
    ["Ibrutinib", "İbrutinib", "BTK inhibitörü"],
    ["Acalabrutinib", "Akalabrutinib", "BTK inhibitörü"],
    ["Zanubrutinib", "Zanubrutinib", "BTK inhibitörü"],
    ["Idelalisib", "İdelalisib", "PI3K inhibitörü"],
    ["Copanlisib", "Kopanlisib", "PI3K inhibitörü"],
    ["Duvelisib", "Duvelisib", "PI3K inhibitörü"],
    ["Alpelisib", "Alpelisib", "PI3K inhibitörü"],
    ["Everolimus", "Everolimus", "mTOR inhibitörü"],
    ["Temsirolimus", "Temsirolimus", "mTOR inhibitörü"],
    ["Palbociclib", "Palbosiklib", "CDK4/6 inhibitörü"],
    ["Ribociclib", "Ribosiklib", "CDK4/6 inhibitörü"],
    ["Abemaciclib", "Abemasiklib", "CDK4/6 inhibitörü"],
    ["Ruxolitinib", "Ruksolitinib", "JAK inhibitörü"],
    ["Fedratinib", "Fedratinib", "JAK inhibitörü"],
    ["Baricitinib", "Barisitinib", "JAK inhibitörü"],
    ["Upadacitinib", "Upadacitinib", "JAK inhibitörü"],
    // PARP inhibitörleri
    ["Olaparib", "Olaparib", "PARP inhibitörü"],
    ["Rucaparib", "Rukaparib", "PARP inhibitörü"],
    ["Niraparib", "Niraparib", "PARP inhibitörü"],
    ["Talazoparib", "Talazoparib", "PARP inhibitörü"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Monoklonal antikorlar
const generateMonoclonalAntibodies = () => {
  const drugs = [
    ["Rituximab", "Rituksimab", "Anti-CD20 monoklonal antikor"],
    ["Obinutuzumab", "Obinutuzumab", "Anti-CD20 monoklonal antikor"],
    ["Ofatumumab", "Ofatumumab", "Anti-CD20 monoklonal antikor"],
    ["Trastuzumab", "Trastuzumab", "Anti-HER2 monoklonal antikor"],
    ["Pertuzumab", "Pertuzumab", "Anti-HER2 monoklonal antikor"],
    ["Cetuximab", "Setuksimab", "Anti-EGFR monoklonal antikor"],
    ["Panitumumab", "Panitumumab", "Anti-EGFR monoklonal antikor"],
    ["Bevacizumab", "Bevasizumab", "Anti-VEGF monoklonal antikor"],
    ["Ramucirumab", "Ramusirumab", "Anti-VEGFR2 monoklonal antikor"],
    ["Ipilimumab", "İpilimumab", "Anti-CTLA-4 monoklonal antikor"],
    ["Nivolumab", "Nivolumab", "Anti-PD-1 monoklonal antikor"],
    ["Pembrolizumab", "Pembrolizumab", "Anti-PD-1 monoklonal antikor"],
    ["Cemiplimab", "Semiplimab", "Anti-PD-1 monoklonal antikor"],
    ["Atezolizumab", "Atezolizumab", "Anti-PD-L1 monoklonal antikor"],
    ["Durvalumab", "Durvalumab", "Anti-PD-L1 monoklonal antikor"],
    ["Avelumab", "Avelumab", "Anti-PD-L1 monoklonal antikor"],
    ["Daratumumab", "Daratumumab", "Anti-CD38 monoklonal antikor"],
    ["Isatuximab", "İsatuksimab", "Anti-CD38 monoklonal antikor"],
    ["Elotuzumab", "Elotuzumab", "Anti-SLAMF7 monoklonal antikor"],
    ["Brentuximab vedotin", "Brentuksimab vedotin", "Anti-CD30 ADC"],
    ["Trastuzumab emtansine", "Trastuzumab emtansin", "Anti-HER2 ADC"],
    ["Trastuzumab deruxtecan", "Trastuzumab derukstekan", "Anti-HER2 ADC"],
    ["Enfortumab vedotin", "Enfortumab vedotin", "Anti-Nectin-4 ADC"],
    ["Sacituzumab govitecan", "Sasituzumab govitekan", "Anti-Trop-2 ADC"],
    ["Polatuzumab vedotin", "Polatuzumab vedotin", "Anti-CD79b ADC"],
    ["Gemtuzumab ozogamicin", "Gemtuzumab ozogamisin", "Anti-CD33 ADC"],
    ["Inotuzumab ozogamicin", "İnotuzumab ozogamisin", "Anti-CD22 ADC"],
    ["Blinatumomab", "Blinatumomab", "BiTE, CD19/CD3"],
    ["Dinutuximab", "Dinutuksimab", "Anti-GD2 monoklonal antikor"],
    ["Mogamulizumab", "Mogamulizumab", "Anti-CCR4 monoklonal antikor"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Yeni hastalıklar
const generateDiseases = () => {
  const diseases = [
    // Otoimmün hastalıklar
    [
      "Systemic lupus erythematosus",
      "Sistemik Lupus Eritematozus",
      "SLE, otoimmün hastalık",
    ],
    ["Rheumatoid arthritis", "Romatoid Artrit", "RA, eklem iltihabı"],
    ["Psoriatic arthritis", "Psoriatik Artrit", "Sedef artriti"],
    ["Ankylosing spondylitis", "Ankilozan Spondilit", "AS, omurga iltihabı"],
    ["Sjogren syndrome", "Sjögren Sendromu", "Kuru göz ve ağız"],
    ["Scleroderma", "Skleroderma", "Sistemik skleroz"],
    ["Dermatomyositis", "Dermatomiyozit", "Kas ve deri iltihabı"],
    ["Polymyositis", "Polimiyozit", "Kas iltihabı"],
    ["Mixed connective tissue disease", "Mikst Bağ Dokusu Hastalığı", "MCTD"],
    ["Vasculitis", "Vaskülit", "Damar iltihabı"],
    ["Giant cell arteritis", "Dev Hücreli Arterit", "Temporal arterit"],
    ["Takayasu arteritis", "Takayasu Arteriti", "Büyük damar vasküliti"],
    [
      "Polyarteritis nodosa",
      "Poliarteritis Nodoza",
      "Orta boy damar vasküliti",
    ],
    [
      "Granulomatosis with polyangiitis",
      "Polianjitli Granülomatoz",
      "Wegener granülomatozu",
    ],
    [
      "Eosinophilic granulomatosis with polyangiitis",
      "Eozinofilik Granülomatoz",
      "Churg-Strauss sendromu",
    ],
    [
      "Microscopic polyangiitis",
      "Mikroskopik Polianjit",
      "Küçük damar vasküliti",
    ],
    ["Behcet disease", "Behçet Hastalığı", "Ülserli vaskülit"],
    [
      "Antiphospholipid syndrome",
      "Antifosfolipid Sendromu",
      "APS, pıhtılaşma bozukluğu",
    ],
    ["Goodpasture syndrome", "Goodpasture Sendromu", "Anti-GBM hastalığı"],
    [
      "Autoimmune hepatitis",
      "Otoimmün Hepatit",
      "Karaciğer otoimmün hastalığı",
    ],
    ["Primary biliary cholangitis", "Primer Biliyer Kolanjit", "PBC"],
    ["Primary sclerosing cholangitis", "Primer Sklerozan Kolanjit", "PSC"],
    ["Celiac disease", "Çölyak Hastalığı", "Gluten intoleransı"],
    ["Inflammatory bowel disease", "İnflamatuvar Bağırsak Hastalığı", "İBH"],
    ["Crohn disease", "Crohn Hastalığı", "Bölgesel enterit"],
    ["Ulcerative colitis", "Ülseratif Kolit", "Kalın bağırsak iltihabı"],
    ["Hashimoto thyroiditis", "Hashimoto Tiroiditi", "Otoimmün tiroidit"],
    ["Graves disease", "Graves Hastalığı", "Hipertiroidizm"],
    [
      "Type 1 diabetes mellitus",
      "Tip 1 Diyabetes Mellitus",
      "İnsüline bağımlı diyabet",
    ],
    ["Addison disease", "Addison Hastalığı", "Adrenal yetmezlik"],
    ["Myasthenia gravis", "Miyastenia Gravis", "Nöromüsküler hastalık"],
    ["Multiple sclerosis", "Multipl Skleroz", "MS, demiyelinizan hastalık"],
    ["Guillain-Barre syndrome", "Guillain-Barré Sendromu", "Akut polinöropati"],
    [
      "Chronic inflammatory demyelinating polyneuropathy",
      "Kronik İnflamatuvar Demiyelinizan Polinöropati",
      "CIDP",
    ],
    ["Pemphigus vulgaris", "Pemfigus Vulgaris", "Deri otoimmün hastalığı"],
    ["Bullous pemphigoid", "Büllöz Pemfigoid", "Deri otoimmün hastalığı"],
    ["Vitiligo", "Vitiligo", "Pigment kaybı"],
    ["Alopecia areata", "Alopesi Areata", "Saç dökülmesi"],
    ["Psoriasis", "Psoriazis", "Sedef hastalığı"],
    ["Atopic dermatitis", "Atopik Dermatit", "Egzama"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Enfeksiyon hastalıkları
const generateInfectiousDiseases = () => {
  const diseases = [
    // Bakteriyel enfeksiyonlar
    ["Tuberculosis", "Tüberküloz", "Mycobacterium tuberculosis enfeksiyonu"],
    ["Pneumonia", "Pnömoni", "Akciğer enfeksiyonu"],
    ["Meningitis", "Menenjit", "Beyin zarı iltihabı"],
    ["Sepsis", "Sepsis", "Kan zehirlenmesi"],
    ["Endocarditis", "Endokardit", "Kalp kapağı enfeksiyonu"],
    ["Osteomyelitis", "Osteomiyelit", "Kemik enfeksiyonu"],
    ["Cellulitis", "Selülit", "Deri altı enfeksiyonu"],
    ["Necrotizing fasciitis", "Nekrotizan Fasiit", "Et yiyen bakteri"],
    [
      "Urinary tract infection",
      "Üriner Sistem Enfeksiyonu",
      "İdrar yolu enfeksiyonu",
    ],
    ["Pyelonephritis", "Piyelonefrit", "Böbrek enfeksiyonu"],
    ["Cholecystitis", "Kolesistit", "Safra kesesi iltihabı"],
    ["Cholangitis", "Kolanjit", "Safra yolu iltihabı"],
    ["Appendicitis", "Apandisit", "Apendiks iltihabı"],
    ["Diverticulitis", "Divertikülit", "Bağırsak divertikül iltihabı"],
    ["Peritonitis", "Peritonit", "Karın zarı iltihabı"],
    ["Abscess", "Apse", "İrin birikimi"],
    ["Empyema", "Ampiyem", "Plevral boşlukta irin"],
    ["Tetanus", "Tetanoz", "Clostridium tetani enfeksiyonu"],
    ["Botulism", "Botulizm", "Clostridium botulinum zehirlenmesi"],
    ["Diphtheria", "Difteri", "Corynebacterium diphtheriae enfeksiyonu"],
    ["Pertussis", "Boğmaca", "Bordetella pertussis enfeksiyonu"],
    ["Scarlet fever", "Kızıl", "Streptokokal enfeksiyon"],
    ["Rheumatic fever", "Romatizmal Ateş", "Streptokok sonrası komplikasyon"],
    ["Lyme disease", "Lyme Hastalığı", "Borrelia burgdorferi enfeksiyonu"],
    ["Syphilis", "Sifiliz", "Treponema pallidum enfeksiyonu"],
    ["Gonorrhea", "Gonore", "Neisseria gonorrhoeae enfeksiyonu"],
    ["Chlamydia", "Klamidya", "Chlamydia trachomatis enfeksiyonu"],
    ["Typhoid fever", "Tifo", "Salmonella typhi enfeksiyonu"],
    ["Cholera", "Kolera", "Vibrio cholerae enfeksiyonu"],
    ["Shigellosis", "Şigelloz", "Shigella enfeksiyonu"],
    ["Campylobacteriosis", "Kampillobakterioz", "Campylobacter enfeksiyonu"],
    ["Listeriosis", "Listerioz", "Listeria monocytogenes enfeksiyonu"],
    ["Brucellosis", "Bruselloz", "Brucella enfeksiyonu"],
    ["Tularemia", "Tularemi", "Francisella tularensis enfeksiyonu"],
    ["Anthrax", "Şarbon", "Bacillus anthracis enfeksiyonu"],
    ["Plague", "Veba", "Yersinia pestis enfeksiyonu"],
    ["Legionellosis", "Lejyonelloz", "Legionella pneumophila enfeksiyonu"],
    ["Q fever", "Q Ateşi", "Coxiella burnetii enfeksiyonu"],
    [
      "Rocky Mountain spotted fever",
      "Rocky Mountain Benekli Ateşi",
      "Rickettsia rickettsii enfeksiyonu",
    ],
    ["Ehrlichiosis", "Erlikiyoz", "Ehrlichia enfeksiyonu"],
    // Viral enfeksiyonlar
    ["Influenza", "İnfluenza", "Grip"],
    ["COVID-19", "COVID-19", "SARS-CoV-2 enfeksiyonu"],
    ["Measles", "Kızamık", "Morbilli virüs enfeksiyonu"],
    ["Mumps", "Kabakulak", "Paramyxovirus enfeksiyonu"],
    ["Rubella", "Kızamıkçık", "Rubella virüs enfeksiyonu"],
    ["Varicella", "Suçiçeği", "Varicella-zoster virüs enfeksiyonu"],
    ["Herpes zoster", "Zona", "VZV reaktivasyonu"],
    ["Herpes simplex", "Herpes Simpleks", "HSV enfeksiyonu"],
    ["Infectious mononucleosis", "Enfeksiyöz Mononükleoz", "EBV enfeksiyonu"],
    [
      "Cytomegalovirus infection",
      "Sitomegalovirüs Enfeksiyonu",
      "CMV enfeksiyonu",
    ],
    ["Hepatitis A", "Hepatit A", "HAV enfeksiyonu"],
    ["Hepatitis B", "Hepatit B", "HBV enfeksiyonu"],
    ["Hepatitis C", "Hepatit C", "HCV enfeksiyonu"],
    ["Hepatitis D", "Hepatit D", "HDV enfeksiyonu"],
    ["Hepatitis E", "Hepatit E", "HEV enfeksiyonu"],
    ["HIV/AIDS", "HIV/AIDS", "İnsan immün yetmezlik virüsü"],
    ["Dengue fever", "Dang Humması", "Dengue virüs enfeksiyonu"],
    ["Zika virus disease", "Zika Virüs Hastalığı", "Zika virüs enfeksiyonu"],
    ["Chikungunya", "Çikungunya", "Chikungunya virüs enfeksiyonu"],
    ["Yellow fever", "Sarı Humma", "Yellow fever virüs enfeksiyonu"],
    ["West Nile fever", "Batı Nil Ateşi", "West Nile virüs enfeksiyonu"],
    ["Rabies", "Kuduz", "Rabies virüs enfeksiyonu"],
    ["Poliomyelitis", "Poliomiyelit", "Poliovirüs enfeksiyonu"],
    [
      "Hand foot and mouth disease",
      "El Ayak Ağız Hastalığı",
      "Coxsackievirus enfeksiyonu",
    ],
    [
      "Rotavirus gastroenteritis",
      "Rotavirüs Gastroenteriti",
      "Rotavirüs enfeksiyonu",
    ],
    [
      "Norovirus gastroenteritis",
      "Norovirüs Gastroenteriti",
      "Norovirüs enfeksiyonu",
    ],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Mantar ve parazit hastalıkları
const generateFungalParasiticDiseases = () => {
  const diseases = [
    // Mantar enfeksiyonları
    ["Candidiasis", "Kandidiyaz", "Candida enfeksiyonu"],
    ["Aspergillosis", "Aspergilloz", "Aspergillus enfeksiyonu"],
    ["Cryptococcosis", "Kriptokokoz", "Cryptococcus enfeksiyonu"],
    ["Histoplasmosis", "Histoplazmoz", "Histoplasma enfeksiyonu"],
    ["Blastomycosis", "Blastomikoz", "Blastomyces enfeksiyonu"],
    ["Coccidioidomycosis", "Koksidioidomikoz", "Coccidioides enfeksiyonu"],
    ["Pneumocystis pneumonia", "Pnömosistis Pnömonisi", "PCP, PJP"],
    ["Mucormycosis", "Mukormikoz", "Zygomycetes enfeksiyonu"],
    ["Sporotrichosis", "Sporotrikoz", "Sporothrix enfeksiyonu"],
    ["Dermatophytosis", "Dermatofitoz", "Tinea enfeksiyonu"],
    ["Tinea capitis", "Tinea Kapitis", "Saçlı deri mantarı"],
    ["Tinea corporis", "Tinea Korporis", "Vücut mantarı"],
    ["Tinea pedis", "Tinea Pedis", "Ayak mantarı"],
    ["Tinea cruris", "Tinea Kruris", "Kasık mantarı"],
    ["Tinea unguium", "Tinea Ungium", "Tırnak mantarı"],
    ["Pityriasis versicolor", "Pitiriazis Versikolor", "Kepekli mantar"],
    // Parazit enfeksiyonları
    ["Malaria", "Sıtma", "Plasmodium enfeksiyonu"],
    ["Toxoplasmosis", "Toksoplazmoz", "Toxoplasma gondii enfeksiyonu"],
    ["Giardiasis", "Giyardiyaz", "Giardia lamblia enfeksiyonu"],
    ["Amebiasis", "Amebiyaz", "Entamoeba histolytica enfeksiyonu"],
    ["Cryptosporidiosis", "Kriptosporidioz", "Cryptosporidium enfeksiyonu"],
    ["Leishmaniasis", "Leishmaniasis", "Leishmania enfeksiyonu"],
    ["Trypanosomiasis", "Tripanozomiyaz", "Trypanosoma enfeksiyonu"],
    ["Chagas disease", "Chagas Hastalığı", "T. cruzi enfeksiyonu"],
    [
      "African sleeping sickness",
      "Afrika Uyku Hastalığı",
      "T. brucei enfeksiyonu",
    ],
    ["Babesiosis", "Babesioz", "Babesia enfeksiyonu"],
    ["Ascariasis", "Askariyaz", "Ascaris lumbricoides enfeksiyonu"],
    ["Enterobiasis", "Enterobiyaz", "Enterobius vermicularis enfeksiyonu"],
    [
      "Hookworm infection",
      "Kancalı Kurt Enfeksiyonu",
      "Ancylostoma/Necator enfeksiyonu",
    ],
    ["Trichuriasis", "Triküriaz", "Trichuris trichiura enfeksiyonu"],
    [
      "Strongyloidiasis",
      "Strongiloidiyaz",
      "Strongyloides stercoralis enfeksiyonu",
    ],
    ["Filariasis", "Filaryaz", "Filaria enfeksiyonu"],
    ["Onchocerciasis", "Onkoserkiyaz", "Nehir körlüğü"],
    ["Loiasis", "Loiyaz", "Loa loa enfeksiyonu"],
    ["Schistosomiasis", "Şistozomiyaz", "Schistosoma enfeksiyonu"],
    ["Taeniasis", "Tenyaz", "Tenya enfeksiyonu"],
    ["Cysticercosis", "Sistiserkoz", "T. solium larva enfeksiyonu"],
    ["Echinococcosis", "Ekinokokoz", "Kist hidatik"],
    ["Trichinellosis", "Trikinelloz", "Trichinella spiralis enfeksiyonu"],
    ["Toxocariasis", "Toksokaryaz", "Toxocara enfeksiyonu"],
    ["Pediculosis", "Pedikuloz", "Bit enfestasyonu"],
    ["Scabies", "Uyuz", "Sarcoptes scabiei enfestasyonu"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Kardiyovasküler hastalıklar
const generateCardiovascularDiseases = () => {
  const diseases = [
    [
      "Coronary artery disease",
      "Koroner Arter Hastalığı",
      "KAH, iskemik kalp hastalığı",
    ],
    ["Acute coronary syndrome", "Akut Koroner Sendrom", "AKS"],
    ["Myocardial infarction", "Miyokard Enfarktüsü", "Kalp krizi"],
    ["Unstable angina", "Kararsız Anjina", "Stabil olmayan anjina"],
    ["Stable angina", "Kararlı Anjina", "Efor anjinası"],
    ["Prinzmetal angina", "Prinzmetal Anjina", "Vazospastik anjina"],
    ["Heart failure", "Kalp Yetmezliği", "Konjestif kalp yetmezliği"],
    ["Cardiomyopathy", "Kardiyomiyopati", "Kalp kası hastalığı"],
    ["Dilated cardiomyopathy", "Dilate Kardiyomiyopati", "DCM"],
    ["Hypertrophic cardiomyopathy", "Hipertrofik Kardiyomiyopati", "HCM"],
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
    ["Pericarditis", "Perikardit", "Kalp zarı iltihabı"],
    ["Cardiac tamponade", "Kardiyak Tamponad", "Perikard sıvı birikimi"],
    [
      "Constrictive pericarditis",
      "Konstriktif Perikardit",
      "Sıkıştırıcı perikardit",
    ],
    ["Atrial fibrillation", "Atriyal Fibrilasyon", "AF, düzensiz kalp atımı"],
    ["Atrial flutter", "Atriyal Flutter", "Düzenli hızlı atım"],
    ["Supraventricular tachycardia", "Supraventriküler Taşikardi", "SVT"],
    ["Ventricular tachycardia", "Ventriküler Taşikardi", "VT"],
    ["Ventricular fibrillation", "Ventriküler Fibrilasyon", "VF"],
    ["Sick sinus syndrome", "Hasta Sinüs Sendromu", "SSS"],
    ["Atrioventricular block", "Atriyoventriküler Blok", "AV blok"],
    ["Bundle branch block", "Dal Bloğu", "Sağ/sol dal bloğu"],
    ["Long QT syndrome", "Uzun QT Sendromu", "LQTS"],
    ["Brugada syndrome", "Brugada Sendromu", "Ani kardiyak ölüm riski"],
    ["Wolff-Parkinson-White syndrome", "Wolff-Parkinson-White Sendromu", "WPW"],
    ["Aortic stenosis", "Aort Stenozu", "Aort kapak darlığı"],
    ["Aortic regurgitation", "Aort Regürjitasyonu", "Aort yetmezliği"],
    ["Mitral stenosis", "Mitral Stenoz", "Mitral kapak darlığı"],
    ["Mitral regurgitation", "Mitral Regürjitasyon", "Mitral yetmezlik"],
    ["Mitral valve prolapse", "Mitral Kapak Prolapsusu", "MVP"],
    [
      "Tricuspid regurgitation",
      "Triküspit Regürjitasyonu",
      "Triküspit yetmezliği",
    ],
    ["Pulmonary stenosis", "Pulmoner Stenoz", "Pulmoner kapak darlığı"],
    [
      "Infective endocarditis",
      "Enfektif Endokardit",
      "Kalp kapağı enfeksiyonu",
    ],
    ["Hypertension", "Hipertansiyon", "Yüksek tansiyon"],
    ["Hypertensive crisis", "Hipertansif Kriz", "Acil hipertansiyon"],
    [
      "Pulmonary hypertension",
      "Pulmoner Hipertansiyon",
      "Akciğer yüksek tansiyonu",
    ],
    ["Aortic aneurysm", "Aort Anevrizması", "Aort genişlemesi"],
    ["Aortic dissection", "Aort Diseksiyonu", "Aort yırtılması"],
    ["Peripheral artery disease", "Periferik Arter Hastalığı", "PAH"],
    ["Deep vein thrombosis", "Derin Ven Trombozu", "DVT"],
    ["Pulmonary embolism", "Pulmoner Emboli", "PE, akciğer pıhtısı"],
    ["Varicose veins", "Varis", "Genişlemiş toplardamar"],
    ["Chronic venous insufficiency", "Kronik Venöz Yetmezlik", "KVY"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Nörolojik hastalıklar
const generateNeurologicalDiseases = () => {
  const diseases = [
    ["Stroke", "İnme", "Serebrovasküler olay"],
    ["Ischemic stroke", "İskemik İnme", "Beyin damar tıkanıklığı"],
    ["Hemorrhagic stroke", "Hemorajik İnme", "Beyin kanaması"],
    ["Transient ischemic attack", "Geçici İskemik Atak", "TİA, mini inme"],
    ["Subarachnoid hemorrhage", "Subaraknoid Kanama", "SAK"],
    ["Intracerebral hemorrhage", "İntraserebral Kanama", "Beyin içi kanama"],
    ["Subdural hematoma", "Subdural Hematom", "Beyin zarı altı kanama"],
    ["Epidural hematoma", "Epidural Hematom", "Beyin zarı üstü kanama"],
    ["Cerebral aneurysm", "Serebral Anevrizma", "Beyin damar baloncuğu"],
    ["Arteriovenous malformation", "Arteriyovenöz Malformasyon", "AVM"],
    ["Alzheimer disease", "Alzheimer Hastalığı", "Demans"],
    ["Vascular dementia", "Vasküler Demans", "Damarsal bunama"],
    ["Lewy body dementia", "Lewy Cisimcikli Demans", "DLB"],
    ["Frontotemporal dementia", "Frontotemporal Demans", "FTD"],
    ["Parkinson disease", "Parkinson Hastalığı", "Hareket bozukluğu"],
    ["Huntington disease", "Huntington Hastalığı", "Kore"],
    [
      "Amyotrophic lateral sclerosis",
      "Amiyotrofik Lateral Skleroz",
      "ALS, Lou Gehrig hastalığı",
    ],
    ["Spinal muscular atrophy", "Spinal Müsküler Atrofi", "SMA"],
    ["Epilepsy", "Epilepsi", "Sara hastalığı"],
    ["Status epilepticus", "Status Epileptikus", "Sürekli nöbet"],
    ["Migraine", "Migren", "Baş ağrısı"],
    ["Tension headache", "Gerilim Tipi Baş Ağrısı", "GTBA"],
    ["Cluster headache", "Küme Baş Ağrısı", "Trigeminal otonom sefalji"],
    ["Trigeminal neuralgia", "Trigeminal Nevralji", "Yüz ağrısı"],
    ["Bell palsy", "Bell Paralizisi", "Yüz felci"],
    ["Peripheral neuropathy", "Periferik Nöropati", "Sinir hasarı"],
    ["Diabetic neuropathy", "Diyabetik Nöropati", "Şeker sinir hasarı"],
    ["Carpal tunnel syndrome", "Karpal Tünel Sendromu", "KTS"],
    ["Sciatica", "Siyatik", "Siyatik sinir ağrısı"],
    ["Herniated disc", "Disk Hernisi", "Fıtık"],
    ["Spinal stenosis", "Spinal Stenoz", "Omurga kanalı daralması"],
    ["Cervical spondylosis", "Servikal Spondiloz", "Boyun kireçlenmesi"],
    ["Meningioma", "Menenjiyom", "Beyin zarı tümörü"],
    ["Glioblastoma", "Glioblastom", "Beyin tümörü"],
    ["Astrocytoma", "Astrositom", "Beyin tümörü"],
    ["Acoustic neuroma", "Akustik Nörom", "Vestibüler schwannom"],
    ["Pituitary adenoma", "Hipofiz Adenomu", "Hipofiz tümörü"],
    ["Hydrocephalus", "Hidrosefali", "Beyin sıvısı birikimi"],
    ["Normal pressure hydrocephalus", "Normal Basınçlı Hidrosefali", "NPH"],
    [
      "Pseudotumor cerebri",
      "Psödotümör Serebri",
      "İdiyopatik intrakraniyal hipertansiyon",
    ],
    ["Narcolepsy", "Narkolepsi", "Uyku hastalığı"],
    ["Restless legs syndrome", "Huzursuz Bacak Sendromu", "RLS"],
    ["Essential tremor", "Esansiyel Tremor", "Titreme"],
    ["Dystonia", "Distoni", "Kas kasılma bozukluğu"],
    ["Tourette syndrome", "Tourette Sendromu", "Tik bozukluğu"],
    ["Cerebral palsy", "Serebral Palsi", "Beyin felci"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Solunum hastalıkları
const generateRespiratoryDiseases = () => {
  const diseases = [
    ["Asthma", "Astım", "Bronşiyal astım"],
    [
      "Chronic obstructive pulmonary disease",
      "Kronik Obstrüktif Akciğer Hastalığı",
      "KOAH",
    ],
    ["Emphysema", "Amfizem", "Akciğer genişlemesi"],
    ["Chronic bronchitis", "Kronik Bronşit", "Kronik hava yolu iltihabı"],
    ["Bronchiectasis", "Bronşektazi", "Bronş genişlemesi"],
    ["Cystic fibrosis", "Kistik Fibrozis", "CF, genetik hastalık"],
    ["Interstitial lung disease", "İnterstisyel Akciğer Hastalığı", "İAH"],
    ["Idiopathic pulmonary fibrosis", "İdiyopatik Pulmoner Fibrozis", "IPF"],
    ["Sarcoidosis", "Sarkoidoz", "Granülomatöz hastalık"],
    [
      "Hypersensitivity pneumonitis",
      "Hipersensitivite Pnömonisi",
      "Ekstrinsik alerjik alveolit",
    ],
    ["Pneumoconiosis", "Pnömokonyoz", "Toz akciğer hastalığı"],
    ["Silicosis", "Silikoz", "Silika tozu hastalığı"],
    ["Asbestosis", "Asbestoz", "Asbest hastalığı"],
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
    ["Respiratory failure", "Solunum Yetmezliği", "Akut/kronik"],
    ["Pleural effusion", "Plevral Efüzyon", "Akciğer zarı sıvısı"],
    ["Pneumothorax", "Pnömotoraks", "Akciğer çökmesi"],
    ["Hemothorax", "Hemotoraks", "Göğüs boşluğunda kan"],
    ["Pulmonary edema", "Pulmoner Ödem", "Akciğer ödemi"],
    ["Lung cancer", "Akciğer Kanseri", "Bronkojenik karsinom"],
    ["Small cell lung cancer", "Küçük Hücreli Akciğer Kanseri", "KHAK"],
    [
      "Non-small cell lung cancer",
      "Küçük Hücreli Dışı Akciğer Kanseri",
      "KHDAK",
    ],
    ["Mesothelioma", "Mezotelyoma", "Plevra kanseri"],
    ["Pulmonary nodule", "Pulmoner Nodül", "Akciğer nodülü"],
    ["Obstructive sleep apnea", "Obstrüktif Uyku Apnesi", "OSA"],
    ["Central sleep apnea", "Santral Uyku Apnesi", "CSA"],
    ["Acute bronchitis", "Akut Bronşit", "Bronş iltihabı"],
    ["Laryngitis", "Larenjit", "Gırtlak iltihabı"],
    ["Pharyngitis", "Farenjit", "Boğaz iltihabı"],
    ["Tonsillitis", "Tonsillit", "Bademcik iltihabı"],
    ["Sinusitis", "Sinüzit", "Sinüs iltihabı"],
    ["Rhinitis", "Rinit", "Burun iltihabı"],
    ["Allergic rhinitis", "Alerjik Rinit", "Saman nezlesi"],
    ["Epiglottitis", "Epiglottit", "Gırtlak kapağı iltihabı"],
    ["Croup", "Krup", "Laringotrakeobronşit"],
    ["Whooping cough", "Boğmaca", "Pertussis"],
    ["Aspiration pneumonia", "Aspirasyon Pnömonisi", "Yutma pnömonisi"],
    ["Lung abscess", "Akciğer Apsesi", "Akciğer içi irin"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Endokrin hastalıklar
const generateEndocrineDiseases = () => {
  const diseases = [
    [
      "Type 2 diabetes mellitus",
      "Tip 2 Diyabetes Mellitus",
      "İnsüline bağımlı olmayan diyabet",
    ],
    ["Gestational diabetes", "Gestasyonel Diyabet", "Gebelik diyabeti"],
    ["Diabetic ketoacidosis", "Diyabetik Ketoasidoz", "DKA"],
    [
      "Hyperosmolar hyperglycemic state",
      "Hiperosmolar Hiperglisemik Durum",
      "HHS",
    ],
    ["Hypoglycemia", "Hipoglisemi", "Düşük kan şekeri"],
    ["Metabolic syndrome", "Metabolik Sendrom", "İnsülin direnci sendromu"],
    ["Obesity", "Obezite", "Şişmanlık"],
    ["Hyperthyroidism", "Hipertiroidizm", "Tiroid fazla çalışması"],
    ["Hypothyroidism", "Hipotiroidizm", "Tiroid az çalışması"],
    ["Thyroid nodule", "Tiroid Nodülü", "Tiroid kitlesi"],
    ["Thyroid cancer", "Tiroid Kanseri", "Tiroid malignitesi"],
    ["Thyroiditis", "Tiroidit", "Tiroid iltihabı"],
    ["Goiter", "Guatr", "Tiroid büyümesi"],
    ["Hyperparathyroidism", "Hiperparatiroidizm", "Paratiroid fazla çalışması"],
    ["Hypoparathyroidism", "Hipoparatiroidizm", "Paratiroid az çalışması"],
    ["Cushing syndrome", "Cushing Sendromu", "Kortizol fazlalığı"],
    ["Addison disease", "Addison Hastalığı", "Adrenal yetmezlik"],
    ["Pheochromocytoma", "Feokromositoma", "Adrenal medulla tümörü"],
    ["Primary aldosteronism", "Primer Aldosteronizm", "Conn sendromu"],
    [
      "Adrenal insufficiency",
      "Adrenal Yetmezlik",
      "Böbrek üstü bezi yetmezliği",
    ],
    ["Acromegaly", "Akromegali", "Büyüme hormonu fazlalığı"],
    ["Gigantism", "Gigantizm", "Dev büyüme"],
    ["Growth hormone deficiency", "Büyüme Hormonu Eksikliği", "GH eksikliği"],
    ["Hyperprolactinemia", "Hiperprolaktinemi", "Prolaktin yüksekliği"],
    ["Prolactinoma", "Prolaktinoma", "Prolaktin salgılayan tümör"],
    ["Diabetes insipidus", "Diabetes İnsipidus", "Su diyabeti"],
    ["Syndrome of inappropriate ADH", "Uygunsuz ADH Sendromu", "SIADH"],
    ["Polycystic ovary syndrome", "Polikistik Over Sendromu", "PKOS"],
    ["Premature ovarian failure", "Erken Over Yetmezliği", "POF"],
    ["Menopause", "Menopoz", "Klimakterium"],
    ["Hypogonadism", "Hipogonadizm", "Gonad yetmezliği"],
    ["Klinefelter syndrome", "Klinefelter Sendromu", "47,XXY"],
    ["Turner syndrome", "Turner Sendromu", "45,X"],
    ["Congenital adrenal hyperplasia", "Konjenital Adrenal Hiperplazi", "KAH"],
    ["Multiple endocrine neoplasia", "Multipl Endokrin Neoplazi", "MEN"],
    ["Osteoporosis", "Osteoporoz", "Kemik erimesi"],
    ["Osteomalacia", "Osteomalazi", "Kemik yumuşaması"],
    ["Rickets", "Raşitizm", "D vitamini eksikliği"],
    ["Paget disease of bone", "Kemik Paget Hastalığı", "Osteitis deformans"],
    ["Hypercalcemia", "Hiperkalsemi", "Yüksek kalsiyum"],
    ["Hypocalcemia", "Hipokalsemi", "Düşük kalsiyum"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Anatomi terimleri
const generateAnatomyTerms = () => {
  const terms = [
    // Kemikler
    ["Frontal bone", "Frontal Kemik", "Alın kemiği"],
    ["Parietal bone", "Parietal Kemik", "Yan kafa kemiği"],
    ["Temporal bone", "Temporal Kemik", "Şakak kemiği"],
    ["Occipital bone", "Oksipital Kemik", "Arka kafa kemiği"],
    ["Sphenoid bone", "Sfenoid Kemik", "Kama kemik"],
    ["Ethmoid bone", "Etmoid Kemik", "Kalbur kemik"],
    ["Maxilla", "Maksilla", "Üst çene kemiği"],
    ["Mandible", "Mandibula", "Alt çene kemiği"],
    ["Zygomatic bone", "Zigomatik Kemik", "Elmacık kemiği"],
    ["Nasal bone", "Nazal Kemik", "Burun kemiği"],
    ["Lacrimal bone", "Lakrimal Kemik", "Gözyaşı kemiği"],
    ["Palatine bone", "Palatin Kemik", "Damak kemiği"],
    ["Vomer", "Vomer", "Saban kemiği"],
    ["Inferior nasal concha", "Alt Burun Konkası", "Alt konka"],
    ["Hyoid bone", "Hiyoid Kemik", "Dil kemiği"],
    ["Cervical vertebrae", "Servikal Vertebra", "Boyun omuru"],
    ["Thoracic vertebrae", "Torasik Vertebra", "Göğüs omuru"],
    ["Lumbar vertebrae", "Lomber Vertebra", "Bel omuru"],
    ["Sacrum", "Sakrum", "Kuyruk sokumu kemiği"],
    ["Coccyx", "Koksiks", "Kuyruk kemiği"],
    ["Clavicle", "Klavikula", "Köprücük kemiği"],
    ["Scapula", "Skapula", "Kürek kemiği"],
    ["Humerus", "Humerus", "Üst kol kemiği"],
    ["Radius", "Radius", "Döner kemik"],
    ["Ulna", "Ulna", "Dirsek kemiği"],
    ["Carpal bones", "Karpal Kemikler", "El bileği kemikleri"],
    ["Metacarpal bones", "Metakarpal Kemikler", "El tarağı kemikleri"],
    ["Phalanges of hand", "El Falanksları", "Parmak kemikleri"],
    ["Sternum", "Sternum", "Göğüs kemiği"],
    ["Ribs", "Kostalar", "Kaburga kemikleri"],
    ["Ilium", "İlium", "Kalça kemiği"],
    ["Ischium", "İskium", "Oturak kemiği"],
    ["Pubis", "Pubis", "Çatı kemiği"],
    ["Femur", "Femur", "Uyluk kemiği"],
    ["Patella", "Patella", "Diz kapağı"],
    ["Tibia", "Tibia", "Kaval kemiği"],
    ["Fibula", "Fibula", "Baldır kemiği"],
    ["Tarsal bones", "Tarsal Kemikler", "Ayak bileği kemikleri"],
    ["Metatarsal bones", "Metatarsal Kemikler", "Ayak tarağı kemikleri"],
    ["Phalanges of foot", "Ayak Falanksları", "Ayak parmak kemikleri"],
    ["Calcaneus", "Kalkaneus", "Topuk kemiği"],
    ["Talus", "Talus", "Aşık kemiği"],
    // Kaslar
    ["Trapezius", "Trapezius", "Kapüşon kası"],
    ["Latissimus dorsi", "Latissimus Dorsi", "Geniş sırt kası"],
    ["Rhomboid major", "Romboid Major", "Büyük eşkenar dörtgen kas"],
    ["Rhomboid minor", "Romboid Minor", "Küçük eşkenar dörtgen kas"],
    ["Levator scapulae", "Levator Skapula", "Kürek kaldırıcı kas"],
    ["Deltoid", "Deltoid", "Omuz kası"],
    ["Supraspinatus", "Supraspinatus", "Üst spinöz kas"],
    ["Infraspinatus", "İnfraspinatus", "Alt spinöz kas"],
    ["Teres major", "Teres Major", "Büyük yuvarlak kas"],
    ["Teres minor", "Teres Minor", "Küçük yuvarlak kas"],
    ["Subscapularis", "Subskapularis", "Kürek altı kası"],
    ["Biceps brachii", "Biseps Brakii", "İki başlı kol kası"],
    ["Triceps brachii", "Triseps Brakii", "Üç başlı kol kası"],
    ["Brachialis", "Brakiyalis", "Kol kası"],
    ["Brachioradialis", "Brakiyoradiyalis", "Kol-döner kas"],
    ["Pronator teres", "Pronator Teres", "Yuvarlak içe döndürücü"],
    ["Supinator", "Supinator", "Dışa döndürücü kas"],
    ["Flexor carpi radialis", "Fleksör Karpi Radiyalis", "Döner el bükücü"],
    ["Flexor carpi ulnaris", "Fleksör Karpi Ulnaris", "Dirsek el bükücü"],
    ["Extensor carpi radialis", "Ekstansör Karpi Radiyalis", "Döner el açıcı"],
    ["Extensor carpi ulnaris", "Ekstansör Karpi Ulnaris", "Dirsek el açıcı"],
    ["Pectoralis major", "Pektoralis Major", "Büyük göğüs kası"],
    ["Pectoralis minor", "Pektoralis Minor", "Küçük göğüs kası"],
    ["Serratus anterior", "Serratus Anterior", "Ön dişli kas"],
    ["External oblique", "Eksternal Oblik", "Dış eğik karın kası"],
    ["Internal oblique", "İnternal Oblik", "İç eğik karın kası"],
    ["Transversus abdominis", "Transversus Abdominis", "Enine karın kası"],
    ["Rectus abdominis", "Rektus Abdominis", "Düz karın kası"],
    ["Quadratus lumborum", "Kuadratus Lumborum", "Kare bel kası"],
    ["Psoas major", "Psoas Major", "Büyük bel kası"],
    ["Iliacus", "İliyakus", "Kalça kası"],
    ["Gluteus maximus", "Gluteus Maksimus", "Büyük kalça kası"],
    ["Gluteus medius", "Gluteus Medius", "Orta kalça kası"],
    ["Gluteus minimus", "Gluteus Minimus", "Küçük kalça kası"],
    ["Tensor fasciae latae", "Tensör Fasya Lata", "Geniş fasya gerici"],
    ["Piriformis", "Piriformis", "Armut şekilli kas"],
    ["Quadriceps femoris", "Kuadriseps Femoris", "Dört başlı uyluk kası"],
    ["Rectus femoris", "Rektus Femoris", "Düz uyluk kası"],
    ["Vastus lateralis", "Vastus Lateralis", "Dış geniş kas"],
    ["Vastus medialis", "Vastus Mediyalis", "İç geniş kas"],
    ["Vastus intermedius", "Vastus İntermedius", "Orta geniş kas"],
    ["Hamstrings", "Hamstringler", "Arka uyluk kasları"],
    ["Biceps femoris", "Biseps Femoris", "İki başlı uyluk kası"],
    ["Semitendinosus", "Semitendinozus", "Yarı tendonlu kas"],
    ["Semimembranosus", "Semimembranozus", "Yarı zarlı kas"],
    ["Sartorius", "Sartoriyus", "Terzi kası"],
    ["Gracilis", "Grasilis", "İnce kas"],
    ["Adductor magnus", "Addüktör Magnus", "Büyük yaklaştırıcı"],
    ["Adductor longus", "Addüktör Longus", "Uzun yaklaştırıcı"],
    ["Adductor brevis", "Addüktör Brevis", "Kısa yaklaştırıcı"],
    ["Pectineus", "Pektineus", "Tarak kası"],
    ["Gastrocnemius", "Gastroknemius", "Baldır kası"],
    ["Soleus", "Soleus", "Pisi balığı kası"],
    ["Tibialis anterior", "Tibiyalis Anterior", "Ön kaval kası"],
    ["Tibialis posterior", "Tibiyalis Posterior", "Arka kaval kası"],
    ["Peroneus longus", "Peroneus Longus", "Uzun baldır kası"],
    ["Peroneus brevis", "Peroneus Brevis", "Kısa baldır kası"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Sinir sistemi anatomisi
const generateNeuroanatomy = () => {
  const terms = [
    ["Cerebrum", "Serebrum", "Beyin"],
    ["Cerebral cortex", "Serebral Korteks", "Beyin kabuğu"],
    ["Frontal lobe", "Frontal Lob", "Ön beyin lobu"],
    ["Parietal lobe", "Parietal Lob", "Yan beyin lobu"],
    ["Temporal lobe", "Temporal Lob", "Şakak lobu"],
    ["Occipital lobe", "Oksipital Lob", "Arka beyin lobu"],
    ["Insula", "İnsula", "Ada lobu"],
    ["Limbic system", "Limbik Sistem", "Duygu sistemi"],
    ["Hippocampus", "Hipokampus", "Denizatı"],
    ["Amygdala", "Amigdala", "Badem cismi"],
    ["Cingulate gyrus", "Singulat Girus", "Kuşak kıvrımı"],
    ["Basal ganglia", "Bazal Gangliyonlar", "Taban çekirdekleri"],
    ["Caudate nucleus", "Kaudat Nükleus", "Kuyruklu çekirdek"],
    ["Putamen", "Putamen", "Kabuk çekirdek"],
    ["Globus pallidus", "Globus Pallidus", "Soluk küre"],
    ["Substantia nigra", "Substansiya Nigra", "Kara madde"],
    ["Thalamus", "Talamus", "Ara beyin"],
    ["Hypothalamus", "Hipotalamus", "Alt talamus"],
    ["Epithalamus", "Epitalamus", "Üst talamus"],
    ["Pineal gland", "Pineal Bez", "Kozalaksı bez"],
    ["Pituitary gland", "Hipofiz Bezi", "Beyin sapı bezi"],
    ["Cerebellum", "Serebellum", "Beyincik"],
    ["Cerebellar vermis", "Serebellar Vermis", "Beyincik solucanı"],
    ["Cerebellar hemisphere", "Serebellar Hemisfer", "Beyincik yarıküresi"],
    ["Brainstem", "Beyin Sapı", "Beyin gövdesi"],
    ["Midbrain", "Mezensefalon", "Orta beyin"],
    ["Pons", "Pons", "Köprü"],
    ["Medulla oblongata", "Medulla Oblongata", "Soğan ilik"],
    ["Reticular formation", "Retiküler Formasyon", "Ağsı oluşum"],
    ["Corpus callosum", "Korpus Kallozum", "Nasırlı cisim"],
    ["Internal capsule", "İnternal Kapsül", "İç kapsül"],
    ["Corona radiata", "Korona Radiyata", "Işınsal taç"],
    ["Lateral ventricle", "Lateral Ventrikül", "Yan karıncık"],
    ["Third ventricle", "Üçüncü Ventrikül", "3. karıncık"],
    ["Fourth ventricle", "Dördüncü Ventrikül", "4. karıncık"],
    ["Cerebral aqueduct", "Serebral Akuadukt", "Beyin su kemeri"],
    ["Choroid plexus", "Koroid Pleksus", "Damar ağı"],
    ["Meninges", "Meninksler", "Beyin zarları"],
    ["Dura mater", "Dura Mater", "Sert zar"],
    ["Arachnoid mater", "Araknoid Mater", "Örümceksi zar"],
    ["Pia mater", "Pia Mater", "Yumuşak zar"],
    ["Spinal cord", "Omurilik", "Spinal kord"],
    ["Cervical spinal cord", "Servikal Omurilik", "Boyun omuriliği"],
    ["Thoracic spinal cord", "Torasik Omurilik", "Göğüs omuriliği"],
    ["Lumbar spinal cord", "Lomber Omurilik", "Bel omuriliği"],
    ["Sacral spinal cord", "Sakral Omurilik", "Kuyruk omuriliği"],
    ["Cauda equina", "Kauda Ekuina", "At kuyruğu"],
    ["Conus medullaris", "Konus Medullaris", "İlik konisi"],
    ["Gray matter", "Gri Madde", "Gri cevher"],
    ["White matter", "Beyaz Madde", "Beyaz cevher"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Kranial sinirler ve periferik sinirler
const generateNerves = () => {
  const terms = [
    ["Olfactory nerve", "Olfaktör Sinir", "I. kranial sinir, koku"],
    ["Optic nerve", "Optik Sinir", "II. kranial sinir, görme"],
    [
      "Oculomotor nerve",
      "Okülomotor Sinir",
      "III. kranial sinir, göz hareketi",
    ],
    ["Trochlear nerve", "Troklear Sinir", "IV. kranial sinir, göz hareketi"],
    ["Trigeminal nerve", "Trigeminal Sinir", "V. kranial sinir, yüz duyusu"],
    ["Abducens nerve", "Abdusens Sinir", "VI. kranial sinir, göz hareketi"],
    ["Facial nerve", "Fasiyal Sinir", "VII. kranial sinir, yüz hareketi"],
    [
      "Vestibulocochlear nerve",
      "Vestibülokoklear Sinir",
      "VIII. kranial sinir, işitme-denge",
    ],
    [
      "Glossopharyngeal nerve",
      "Glossofaringeal Sinir",
      "IX. kranial sinir, tat-yutma",
    ],
    ["Vagus nerve", "Vagus Siniri", "X. kranial sinir, parasempatik"],
    ["Accessory nerve", "Aksesuar Sinir", "XI. kranial sinir, omuz-boyun"],
    [
      "Hypoglossal nerve",
      "Hipoglossal Sinir",
      "XII. kranial sinir, dil hareketi",
    ],
    ["Brachial plexus", "Brakiyal Pleksus", "Kol sinir ağı"],
    ["Musculocutaneous nerve", "Muskülokutanöz Sinir", "Kas-deri siniri"],
    ["Median nerve", "Median Sinir", "Orta sinir"],
    ["Ulnar nerve", "Ulnar Sinir", "Dirsek siniri"],
    ["Radial nerve", "Radyal Sinir", "Döner sinir"],
    ["Axillary nerve", "Aksiller Sinir", "Koltuk altı siniri"],
    ["Long thoracic nerve", "Uzun Torasik Sinir", "Uzun göğüs siniri"],
    ["Thoracodorsal nerve", "Torakodorsal Sinir", "Göğüs-sırt siniri"],
    ["Phrenic nerve", "Frenik Sinir", "Diyafram siniri"],
    ["Intercostal nerves", "İnterkostal Sinirler", "Kaburga arası sinirler"],
    ["Lumbar plexus", "Lomber Pleksus", "Bel sinir ağı"],
    ["Femoral nerve", "Femoral Sinir", "Uyluk siniri"],
    ["Obturator nerve", "Obturator Sinir", "Tıkayıcı sinir"],
    [
      "Lateral femoral cutaneous nerve",
      "Lateral Femoral Kutanöz Sinir",
      "Dış uyluk deri siniri",
    ],
    ["Genitofemoral nerve", "Genitofemoral Sinir", "Genital-uyluk siniri"],
    ["Iliohypogastric nerve", "İliyohipogastrik Sinir", "Kalça-karın siniri"],
    ["Ilioinguinal nerve", "İliyoinguinal Sinir", "Kalça-kasık siniri"],
    ["Sacral plexus", "Sakral Pleksus", "Kuyruk sinir ağı"],
    ["Sciatic nerve", "Siyatik Sinir", "Kalça siniri"],
    ["Tibial nerve", "Tibial Sinir", "Kaval siniri"],
    ["Common peroneal nerve", "Ortak Peroneal Sinir", "Ortak baldır siniri"],
    ["Deep peroneal nerve", "Derin Peroneal Sinir", "Derin baldır siniri"],
    [
      "Superficial peroneal nerve",
      "Yüzeyel Peroneal Sinir",
      "Yüzeyel baldır siniri",
    ],
    ["Sural nerve", "Sural Sinir", "Baldır siniri"],
    ["Pudendal nerve", "Pudendal Sinir", "Perine siniri"],
    ["Superior gluteal nerve", "Süperior Gluteal Sinir", "Üst kalça siniri"],
    ["Inferior gluteal nerve", "İnferior Gluteal Sinir", "Alt kalça siniri"],
    [
      "Posterior femoral cutaneous nerve",
      "Posterior Femoral Kutanöz Sinir",
      "Arka uyluk deri siniri",
    ],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Bitkiler
const generatePlants = () => {
  const plants = [
    ["Echinacea purpurea", "Ekinezya", "Bağışıklık güçlendirici bitki"],
    ["Hypericum perforatum", "Sarı Kantaron", "Depresyon ve yara iyileştirici"],
    ["Valeriana officinalis", "Kediotu", "Sakinleştirici bitki"],
    ["Passiflora incarnata", "Çarkıfelek", "Anksiyete giderici"],
    ["Melissa officinalis", "Melisa", "Sakinleştirici, sindirim düzenleyici"],
    ["Lavandula angustifolia", "Lavanta", "Rahatlatıcı, antiseptik"],
    ["Mentha piperita", "Nane", "Sindirim düzenleyici, ferahlatıcı"],
    ["Matricaria chamomilla", "Papatya", "Sakinleştirici, antiinflamatuvar"],
    ["Zingiber officinale", "Zencefil", "Bulantı giderici, antiinflamatuvar"],
    ["Curcuma longa", "Zerdeçal", "Antiinflamatuvar, antioksidan"],
    ["Allium sativum", "Sarımsak", "Antimikrobiyal, kardiyovasküler koruyucu"],
    ["Panax ginseng", "Ginseng", "Enerji artırıcı, adaptojenik"],
    ["Ginkgo biloba", "Ginkgo", "Hafıza güçlendirici, dolaşım düzenleyici"],
    ["Silybum marianum", "Deve Dikeni", "Karaciğer koruyucu"],
    ["Cynara scolymus", "Enginar", "Karaciğer ve safra düzenleyici"],
    ["Taraxacum officinale", "Karahindiba", "Diüretik, karaciğer destekleyici"],
    ["Urtica dioica", "Isırgan Otu", "Antiinflamatuvar, diüretik"],
    ["Plantago major", "Sinirotu", "Yara iyileştirici, öksürük kesici"],
    ["Thymus vulgaris", "Kekik", "Antiseptik, ekspektoran"],
    ["Rosmarinus officinalis", "Biberiye", "Antioksidan, hafıza güçlendirici"],
    ["Salvia officinalis", "Adaçayı", "Antiseptik, antiinflamatuvar"],
    ["Ocimum basilicum", "Fesleğen", "Antioksidan, sindirim düzenleyici"],
    ["Origanum vulgare", "Kekik", "Antimikrobiyal, antioksidan"],
    ["Foeniculum vulgare", "Rezene", "Sindirim düzenleyici, gaz giderici"],
    ["Carum carvi", "Kimyon", "Sindirim düzenleyici, gaz giderici"],
    ["Pimpinella anisum", "Anason", "Ekspektoran, sindirim düzenleyici"],
    ["Glycyrrhiza glabra", "Meyan Kökü", "Antiinflamatuvar, ekspektoran"],
    ["Althaea officinalis", "Hatmi", "Yumuşatıcı, öksürük kesici"],
    ["Tussilago farfara", "Öksürük Otu", "Ekspektoran, öksürük kesici"],
    ["Sambucus nigra", "Mürver", "Bağışıklık güçlendirici, antiinflamatuvar"],
    ["Crataegus monogyna", "Alıç", "Kalp güçlendirici, tansiyon düzenleyici"],
    ["Vaccinium myrtillus", "Yaban Mersini", "Antioksidan, göz sağlığı"],
    ["Vitis vinifera", "Üzüm", "Antioksidan, kardiyovasküler koruyucu"],
    ["Camellia sinensis", "Çay", "Antioksidan, uyarıcı"],
    ["Coffea arabica", "Kahve", "Uyarıcı, antioksidan"],
    ["Theobroma cacao", "Kakao", "Antioksidan, ruh hali düzenleyici"],
    ["Aloe vera", "Aloe Vera", "Yara iyileştirici, nemlendirici"],
    [
      "Calendula officinalis",
      "Aynısefa",
      "Yara iyileştirici, antiinflamatuvar",
    ],
    ["Arnica montana", "Arnika", "Çürük ve şişlik giderici"],
    ["Hamamelis virginiana", "Cadı Fındığı", "Astrenjan, antiinflamatuvar"],
    [
      "Centella asiatica",
      "Gotu Kola",
      "Yara iyileştirici, hafıza güçlendirici",
    ],
    ["Bacopa monnieri", "Brahmi", "Hafıza güçlendirici, anksiyete giderici"],
    ["Withania somnifera", "Ashwagandha", "Adaptojenik, stres giderici"],
    ["Rhodiola rosea", "Altın Kök", "Adaptojenik, enerji artırıcı"],
    [
      "Eleutherococcus senticosus",
      "Sibirya Ginsengi",
      "Adaptojenik, bağışıklık güçlendirici",
    ],
    ["Schisandra chinensis", "Şizandra", "Adaptojenik, karaciğer koruyucu"],
    [
      "Tribulus terrestris",
      "Demir Dikeni",
      "Libido artırıcı, kas güçlendirici",
    ],
    ["Serenoa repens", "Testere Palmiyesi", "Prostat sağlığı"],
    ["Pygeum africanum", "Afrika Eriği", "Prostat sağlığı"],
    ["Vitex agnus-castus", "Hayıt", "Hormonal denge, PMS tedavisi"],
    ["Cimicifuga racemosa", "Karayılan Otu", "Menopoz semptomları"],
    [
      "Trifolium pratense",
      "Kırmızı Yonca",
      "Menopoz semptomları, fitoöstrojen",
    ],
    ["Humulus lupulus", "Şerbetçi Otu", "Sakinleştirici, uyku düzenleyici"],
    ["Piper methysticum", "Kava", "Anksiyete giderici, sakinleştirici"],
    ["Boswellia serrata", "Akgünlük", "Antiinflamatuvar, eklem sağlığı"],
    [
      "Harpagophytum procumbens",
      "Şeytan Pençesi",
      "Antiinflamatuvar, eklem sağlığı",
    ],
    ["Salix alba", "Beyaz Söğüt", "Ağrı kesici, antiinflamatuvar"],
    ["Tanacetum parthenium", "Gümüş Düğme", "Migren önleyici"],
    ["Petasites hybridus", "Kabalak", "Migren önleyici, alerji giderici"],
    ["Butterbur", "Kabalak", "Migren ve alerji tedavisi"],
  ];
  return plants.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.PLANT, def)
  );
};

// Vitaminler ve mineraller
const generateVitaminsMinerals = () => {
  const terms = [
    // Vitaminler
    ["Vitamin A", "A Vitamini", "Retinol, görme ve bağışıklık"],
    ["Beta-carotene", "Beta Karoten", "A vitamini öncüsü, antioksidan"],
    ["Vitamin B1", "B1 Vitamini", "Tiamin, enerji metabolizması"],
    ["Vitamin B2", "B2 Vitamini", "Riboflavin, enerji metabolizması"],
    ["Vitamin B3", "B3 Vitamini", "Niasin, enerji ve kolesterol"],
    ["Vitamin B5", "B5 Vitamini", "Pantotenik asit, hormon sentezi"],
    ["Vitamin B6", "B6 Vitamini", "Piridoksin, protein metabolizması"],
    ["Vitamin B7", "B7 Vitamini", "Biotin, saç ve tırnak sağlığı"],
    ["Vitamin B9", "B9 Vitamini", "Folik asit, hücre bölünmesi"],
    ["Vitamin B12", "B12 Vitamini", "Kobalamin, sinir ve kan sağlığı"],
    ["Vitamin C", "C Vitamini", "Askorbik asit, antioksidan"],
    ["Vitamin D2", "D2 Vitamini", "Ergokalsiferol, kemik sağlığı"],
    ["Vitamin D3", "D3 Vitamini", "Kolekalsiferol, kemik sağlığı"],
    ["Vitamin E", "E Vitamini", "Tokoferol, antioksidan"],
    ["Vitamin K1", "K1 Vitamini", "Fillokinon, pıhtılaşma"],
    ["Vitamin K2", "K2 Vitamini", "Menakinon, kemik sağlığı"],
    ["Choline", "Kolin", "Beyin ve karaciğer sağlığı"],
    ["Inositol", "İnositol", "Hücre sinyalizasyonu"],
    // Mineraller
    ["Calcium", "Kalsiyum", "Kemik ve diş sağlığı"],
    ["Phosphorus", "Fosfor", "Kemik ve enerji metabolizması"],
    ["Magnesium", "Magnezyum", "Kas ve sinir fonksiyonu"],
    ["Sodium", "Sodyum", "Sıvı dengesi, sinir iletimi"],
    ["Potassium", "Potasyum", "Kalp ve kas fonksiyonu"],
    ["Chloride", "Klorür", "Sıvı dengesi, sindirim"],
    ["Sulfur", "Kükürt", "Protein yapısı, detoksifikasyon"],
    ["Iron", "Demir", "Oksijen taşınması, enerji"],
    ["Zinc", "Çinko", "Bağışıklık, yara iyileşmesi"],
    ["Copper", "Bakır", "Demir metabolizması, antioksidan"],
    ["Manganese", "Manganez", "Kemik ve metabolizma"],
    ["Selenium", "Selenyum", "Antioksidan, tiroid fonksiyonu"],
    ["Iodine", "İyot", "Tiroid hormonu sentezi"],
    ["Chromium", "Krom", "Kan şekeri düzenleme"],
    ["Molybdenum", "Molibden", "Enzim kofaktörü"],
    ["Fluoride", "Florür", "Diş sağlığı"],
    ["Boron", "Bor", "Kemik sağlığı, hormon metabolizması"],
    ["Silicon", "Silikon", "Bağ dokusu, kemik sağlığı"],
    ["Vanadium", "Vanadyum", "Kan şekeri düzenleme"],
    ["Nickel", "Nikel", "Enzim aktivasyonu"],
    ["Cobalt", "Kobalt", "B12 vitamini bileşeni"],
    ["Lithium", "Lityum", "Ruh hali düzenleme"],
    // Amino asitler
    ["L-Arginine", "L-Arjinin", "Nitrik oksit öncüsü, dolaşım"],
    ["L-Glutamine", "L-Glutamin", "Bağırsak ve bağışıklık sağlığı"],
    ["L-Carnitine", "L-Karnitin", "Yağ metabolizması, enerji"],
    ["L-Tyrosine", "L-Tirozin", "Nörotransmitter öncüsü"],
    ["L-Tryptophan", "L-Triptofan", "Serotonin öncüsü, uyku"],
    ["L-Theanine", "L-Teanin", "Sakinleştirici, odaklanma"],
    ["L-Lysine", "L-Lizin", "Kolajen sentezi, bağışıklık"],
    ["L-Methionine", "L-Metiyonin", "Detoksifikasyon, antioksidan"],
    ["L-Cysteine", "L-Sistein", "Antioksidan, detoksifikasyon"],
    ["N-Acetyl Cysteine", "N-Asetil Sistein", "NAC, antioksidan"],
    ["Taurine", "Taurin", "Kalp ve göz sağlığı"],
    ["Glycine", "Glisin", "Uyku, kolajen sentezi"],
    ["GABA", "GABA", "Sakinleştirici nörotransmitter"],
    ["5-HTP", "5-HTP", "Serotonin öncüsü"],
    // Diğer besin takviyeleri
    ["Coenzyme Q10", "Koenzim Q10", "Enerji üretimi, antioksidan"],
    ["Alpha-lipoic acid", "Alfa Lipoik Asit", "Antioksidan, kan şekeri"],
    ["Omega-3 fatty acids", "Omega-3 Yağ Asitleri", "Kalp ve beyin sağlığı"],
    ["EPA", "EPA", "Eikosapentaenoik asit, antiinflamatuvar"],
    ["DHA", "DHA", "Dokosaheksaenoik asit, beyin sağlığı"],
    ["Glucosamine", "Glukozamin", "Eklem sağlığı"],
    ["Chondroitin", "Kondroitin", "Eklem sağlığı"],
    ["MSM", "MSM", "Metilsülfonilmetan, eklem sağlığı"],
    ["Collagen", "Kolajen", "Deri, eklem ve kemik sağlığı"],
    ["Hyaluronic acid", "Hiyalüronik Asit", "Eklem ve deri sağlığı"],
    ["Probiotics", "Probiyotikler", "Bağırsak sağlığı"],
    ["Prebiotics", "Prebiyotikler", "Probiyotik besini"],
    ["Digestive enzymes", "Sindirim Enzimleri", "Sindirim desteği"],
    ["Melatonin", "Melatonin", "Uyku düzenleyici hormon"],
    ["DHEA", "DHEA", "Hormon öncüsü"],
    ["Resveratrol", "Resveratrol", "Antioksidan, anti-aging"],
    ["Quercetin", "Kuersetin", "Antioksidan, antiinflamatuvar"],
    ["Curcumin", "Kurkumin", "Zerdeçal özü, antiinflamatuvar"],
    ["Berberine", "Berberin", "Kan şekeri düzenleyici"],
    ["Astaxanthin", "Astaksantin", "Güçlü antioksidan"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.VITAMIN, def)
  );
};

// Böcekler
const generateInsects = () => {
  const insects = [
    ["Apis mellifera", "Bal Arısı", "Polinatör, bal üretici"],
    ["Bombus terrestris", "Toprak Yaban Arısı", "Polinatör"],
    ["Vespa crabro", "Eşek Arısı", "Yırtıcı böcek"],
    ["Vespula germanica", "Alman Yaban Arısı", "Zararlı böcek"],
    ["Formica rufa", "Kırmızı Orman Karıncası", "Orman ekosistemi"],
    ["Camponotus herculeanus", "Dev Marangoz Karıncası", "Ahşap zararlısı"],
    ["Solenopsis invicta", "Ateş Karıncası", "İstilacı tür, zehirli"],
    ["Musca domestica", "Ev Sineği", "Hastalık taşıyıcı"],
    ["Drosophila melanogaster", "Meyve Sineği", "Genetik araştırma modeli"],
    ["Glossina morsitans", "Çeçe Sineği", "Uyku hastalığı vektörü"],
    ["Aedes aegypti", "Sarı Humma Sivrisineği", "Dang, Zika vektörü"],
    ["Aedes albopictus", "Asya Kaplan Sivrisineği", "Hastalık vektörü"],
    ["Anopheles gambiae", "Sıtma Sivrisineği", "Sıtma vektörü"],
    ["Culex pipiens", "Ev Sivrisineği", "Batı Nil virüsü vektörü"],
    ["Phlebotomus papatasi", "Tatarcık", "Leishmaniasis vektörü"],
    ["Cimex lectularius", "Tahtakurusu", "Kan emici parazit"],
    ["Pediculus humanus capitis", "Baş Biti", "Ektoparazit"],
    ["Pediculus humanus corporis", "Vücut Biti", "Tifüs vektörü"],
    ["Phthirus pubis", "Kasık Biti", "Ektoparazit"],
    ["Pulex irritans", "İnsan Piresi", "Kan emici parazit"],
    ["Ctenocephalides felis", "Kedi Piresi", "Evcil hayvan paraziti"],
    ["Ctenocephalides canis", "Köpek Piresi", "Evcil hayvan paraziti"],
    ["Xenopsylla cheopis", "Sıçan Piresi", "Veba vektörü"],
    ["Blattella germanica", "Alman Hamamböceği", "Ev zararlısı"],
    ["Periplaneta americana", "Amerikan Hamamböceği", "Ev zararlısı"],
    ["Blatta orientalis", "Doğu Hamamböceği", "Ev zararlısı"],
    ["Dermatophagoides pteronyssinus", "Ev Tozu Akarı", "Alerjen"],
    ["Sarcoptes scabiei", "Uyuz Akarı", "Deri paraziti"],
    ["Ixodes scapularis", "Geyik Kenesi", "Lyme hastalığı vektörü"],
    ["Ixodes ricinus", "Koyun Kenesi", "Hastalık vektörü"],
    ["Dermacentor variabilis", "Amerikan Köpek Kenesi", "Hastalık vektörü"],
    ["Amblyomma americanum", "Yalnız Yıldız Kenesi", "Hastalık vektörü"],
    ["Rhipicephalus sanguineus", "Kahverengi Köpek Kenesi", "Hastalık vektörü"],
    ["Triatoma infestans", "Öpücük Böceği", "Chagas hastalığı vektörü"],
    ["Rhodnius prolixus", "Öpücük Böceği", "Chagas hastalığı vektörü"],
    ["Simulium damnosum", "Karasinekler", "Nehir körlüğü vektörü"],
    ["Chrysops silacea", "Geyik Sineği", "Loiasis vektörü"],
    ["Stomoxys calcitrans", "Ahır Sineği", "Kan emici, hastalık taşıyıcı"],
    ["Tabanus bovinus", "At Sineği", "Kan emici"],
    ["Lucilia sericata", "Yeşil Şişe Sineği", "Yara tedavisi, adli tıp"],
    ["Calliphora vicina", "Mavi Şişe Sineği", "Adli entomoloji"],
    ["Sarcophaga carnaria", "Et Sineği", "Çürükçül"],
    ["Cochliomyia hominivorax", "Yeni Dünya Vidalı Kurdu", "Miyaz etkeni"],
    ["Oestrus ovis", "Koyun Burun Kurdu", "Parazit"],
    ["Hypoderma bovis", "Sığır Sinek Kurdu", "Parazit"],
    ["Gasterophilus intestinalis", "At Mide Kurdu", "Parazit"],
    ["Tunga penetrans", "Kum Piresi", "Deri paraziti"],
    ["Lepisma saccharina", "Gümüş Balık", "Ev zararlısı"],
    ["Tenebrio molitor", "Un Kurdu", "Depo zararlısı"],
    ["Tribolium castaneum", "Kırmızı Un Böceği", "Depo zararlısı"],
  ];
  return insects.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.INSECT, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("🚀 10,000 Hedefi İçin Ek Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(60));

  console.log("📝 Terimler oluşturuluyor...");

  // İlaçlar
  const drugGroups = generateDrugGroups();
  const antivirals = generateAntivirals();
  const antifungals = generateAntifungals();
  const antiparasitics = generateAntiparasitics();
  const cardiovascularDrugs = generateCardiovascularDrugs();
  const cardiacDrugs2 = generateCardiacDrugs2();
  const neurologicalDrugs = generateNeurologicalDrugs();
  const psychiatricDrugs = generatePsychiatricDrugs();
  const anxiolyticDrugs = generateAnxiolyticDrugs();
  const analgesics = generateAnalgesics();
  const endocrineDrugs = generateEndocrineDrugs();
  const respiratoryDrugs = generateRespiratoryDrugs();
  const giDrugs = generateGIDrugs();
  const oncologyDrugs = generateOncologyDrugs();
  const targetedTherapies = generateTargetedTherapies();
  const monoclonalAntibodies = generateMonoclonalAntibodies();

  // Hastalıklar
  const diseases = generateDiseases();
  const infectiousDiseases = generateInfectiousDiseases();
  const fungalParasiticDiseases = generateFungalParasiticDiseases();
  const cardiovascularDiseases = generateCardiovascularDiseases();
  const neurologicalDiseases = generateNeurologicalDiseases();
  const respiratoryDiseases = generateRespiratoryDiseases();
  const endocrineDiseases = generateEndocrineDiseases();

  // Anatomi
  const anatomyTerms = generateAnatomyTerms();
  const neuroanatomy = generateNeuroanatomy();
  const nerves = generateNerves();

  // Bitkiler, Vitaminler, Böcekler
  const plants = generatePlants();
  const vitaminsMinerals = generateVitaminsMinerals();
  const insects = generateInsects();

  const allTerms = [
    ...drugGroups,
    ...antivirals,
    ...antifungals,
    ...antiparasitics,
    ...cardiovascularDrugs,
    ...cardiacDrugs2,
    ...neurologicalDrugs,
    ...psychiatricDrugs,
    ...anxiolyticDrugs,
    ...analgesics,
    ...endocrineDrugs,
    ...respiratoryDrugs,
    ...giDrugs,
    ...oncologyDrugs,
    ...targetedTherapies,
    ...monoclonalAntibodies,
    ...diseases,
    ...infectiousDiseases,
    ...fungalParasiticDiseases,
    ...cardiovascularDiseases,
    ...neurologicalDiseases,
    ...respiratoryDiseases,
    ...endocrineDiseases,
    ...anatomyTerms,
    ...neuroanatomy,
    ...nerves,
    ...plants,
    ...vitaminsMinerals,
    ...insects,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   İlaçlar (Antibiyotikler): ${drugGroups.length}`);
  console.log(`   Antiviraller: ${antivirals.length}`);
  console.log(`   Antifungaller: ${antifungals.length}`);
  console.log(`   Antiparazitikler: ${antiparasitics.length}`);
  console.log(`   Kardiyovasküler İlaçlar: ${cardiovascularDrugs.length}`);
  console.log(`   Kardiyak İlaçlar 2: ${cardiacDrugs2.length}`);
  console.log(`   Nörolojik İlaçlar: ${neurologicalDrugs.length}`);
  console.log(`   Psikiyatrik İlaçlar: ${psychiatricDrugs.length}`);
  console.log(`   Anksiyolitikler: ${anxiolyticDrugs.length}`);
  console.log(`   Analjezikler: ${analgesics.length}`);
  console.log(`   Endokrin İlaçlar: ${endocrineDrugs.length}`);
  console.log(`   Solunum İlaçları: ${respiratoryDrugs.length}`);
  console.log(`   GI İlaçları: ${giDrugs.length}`);
  console.log(`   Onkoloji İlaçları: ${oncologyDrugs.length}`);
  console.log(`   Hedefe Yönelik Tedaviler: ${targetedTherapies.length}`);
  console.log(`   Monoklonal Antikorlar: ${monoclonalAntibodies.length}`);
  console.log(`   Otoimmün Hastalıklar: ${diseases.length}`);
  console.log(`   Enfeksiyon Hastalıkları: ${infectiousDiseases.length}`);
  console.log(
    `   Mantar/Parazit Hastalıkları: ${fungalParasiticDiseases.length}`
  );
  console.log(
    `   Kardiyovasküler Hastalıklar: ${cardiovascularDiseases.length}`
  );
  console.log(`   Nörolojik Hastalıklar: ${neurologicalDiseases.length}`);
  console.log(`   Solunum Hastalıkları: ${respiratoryDiseases.length}`);
  console.log(`   Endokrin Hastalıklar: ${endocrineDiseases.length}`);
  console.log(`   Anatomi Terimleri: ${anatomyTerms.length}`);
  console.log(`   Nöroanatomi: ${neuroanatomy.length}`);
  console.log(`   Sinirler: ${nerves.length}`);
  console.log(`   Bitkiler: ${plants.length}`);
  console.log(`   Vitaminler/Mineraller: ${vitaminsMinerals.length}`);
  console.log(`   Böcekler: ${insects.length}`);
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
