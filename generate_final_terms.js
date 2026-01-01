// Final terim yükleme scripti - 10,000 terime ulaşmak için
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

// Gastroenteroloji ve Hepatoloji ilaçları
const generateGIDrugs = () => [
  createTerm(
    "Sucralfate",
    "Sukralfat",
    TermCategory.DRUG,
    "Mide koruyucu, ülser tedavisi"
  ),
  createTerm(
    "Misoprostol",
    "Misoprostol",
    TermCategory.DRUG,
    "Prostaglandin analoğu, NSAID gastropatisi"
  ),
  createTerm(
    "Bismuth subsalicylate",
    "Bizmut Subsalisilat",
    TermCategory.DRUG,
    "Antidiyareik ve antiülser"
  ),
  createTerm(
    "Metoclopramide",
    "Metoklopramid",
    TermCategory.DRUG,
    "Prokinetik ve antiemetik"
  ),
  createTerm(
    "Domperidone",
    "Domperidon",
    TermCategory.DRUG,
    "Prokinetik, mide boşalma hızlandırıcı"
  ),
  createTerm(
    "Ondansetron",
    "Ondansetron",
    TermCategory.DRUG,
    "5-HT3 antagonisti antiemetik"
  ),
  createTerm(
    "Granisetron",
    "Granisetron",
    TermCategory.DRUG,
    "5-HT3 antagonisti antiemetik"
  ),
  createTerm(
    "Palonosetron",
    "Palonosetron",
    TermCategory.DRUG,
    "Uzun etkili 5-HT3 antagonisti"
  ),
  createTerm(
    "Aprepitant",
    "Aprepitant",
    TermCategory.DRUG,
    "NK1 antagonisti antiemetik"
  ),
  createTerm(
    "Fosaprepitant",
    "Fosaprepitant",
    TermCategory.DRUG,
    "IV NK1 antagonisti"
  ),
  createTerm("Netupitant", "Netupitant", TermCategory.DRUG, "NK1 antagonisti"),
  createTerm(
    "Rolapitant",
    "Rolapitant",
    TermCategory.DRUG,
    "Uzun etkili NK1 antagonisti"
  ),
  createTerm(
    "Prochlorperazine",
    "Proklorperazin",
    TermCategory.DRUG,
    "Fenotiazin antiemetik"
  ),
  createTerm(
    "Trimethobenzamide",
    "Trimetobenzamid",
    TermCategory.DRUG,
    "Antiemetik"
  ),
  createTerm(
    "Scopolamine",
    "Skopolamin",
    TermCategory.DRUG,
    "Antikolinerjik, hareket hastalığı"
  ),
  createTerm(
    "Meclizine",
    "Meklizin",
    TermCategory.DRUG,
    "Antihistaminik, vertigo"
  ),
  createTerm(
    "Dimenhydrinate",
    "Dimenhidrinat",
    TermCategory.DRUG,
    "Antihistaminik antiemetik"
  ),
  createTerm(
    "Dronabinol",
    "Dronabinol",
    TermCategory.DRUG,
    "Kannabinoid antiemetik"
  ),
  createTerm(
    "Nabilone",
    "Nabilon",
    TermCategory.DRUG,
    "Sentetik kannabinoid antiemetik"
  ),
  createTerm(
    "Loperamide",
    "Loperamid",
    TermCategory.DRUG,
    "Antidiyareik, opioid"
  ),
  createTerm(
    "Diphenoxylate",
    "Difenoksilat",
    TermCategory.DRUG,
    "Antidiyareik, opioid"
  ),
  createTerm(
    "Bismuth",
    "Bizmut",
    TermCategory.DRUG,
    "Antidiyareik ve antiülser"
  ),
  createTerm(
    "Kaolin-pectin",
    "Kaolin-Pektin",
    TermCategory.DRUG,
    "Adsorban antidiyareik"
  ),
  createTerm(
    "Rifaximin",
    "Rifaksimin",
    TermCategory.DRUG,
    "Bağırsak antibiyotiği, IBS-D"
  ),
  createTerm("Eluxadoline", "Eluksadolin", TermCategory.DRUG, "IBS-D tedavisi"),
  createTerm(
    "Alosetron",
    "Alosetron",
    TermCategory.DRUG,
    "5-HT3 antagonisti, IBS-D"
  ),
  createTerm(
    "Linaclotide",
    "Linaklotid",
    TermCategory.DRUG,
    "Guanilat siklaz agonisti, IBS-C"
  ),
  createTerm(
    "Plecanatide",
    "Plekanatid",
    TermCategory.DRUG,
    "Guanilat siklaz agonisti, IBS-C"
  ),
  createTerm(
    "Lubiprostone",
    "Lubiproston",
    TermCategory.DRUG,
    "Klorür kanal aktivatörü, kabızlık"
  ),
  createTerm(
    "Prucalopride",
    "Prukaloprid",
    TermCategory.DRUG,
    "5-HT4 agonisti, kronik kabızlık"
  ),
  createTerm(
    "Tegaserod",
    "Tegaserod",
    TermCategory.DRUG,
    "5-HT4 agonisti, IBS-C"
  ),
  createTerm(
    "Polyethylene glycol",
    "Polietilen Glikol",
    TermCategory.DRUG,
    "Osmotik laksatif"
  ),
  createTerm(
    "Lactulose",
    "Laktuloz",
    TermCategory.DRUG,
    "Osmotik laksatif, hepatik ensefalopati"
  ),
  createTerm("Sorbitol", "Sorbitol", TermCategory.DRUG, "Osmotik laksatif"),
  createTerm(
    "Magnesium hydroxide",
    "Magnezyum Hidroksit",
    TermCategory.DRUG,
    "Salin laksatif, antasit"
  ),
  createTerm(
    "Magnesium citrate",
    "Magnezyum Sitrat",
    TermCategory.DRUG,
    "Salin laksatif"
  ),
  createTerm(
    "Sodium phosphate",
    "Sodyum Fosfat",
    TermCategory.DRUG,
    "Salin laksatif, bağırsak temizliği"
  ),
  createTerm("Bisacodyl", "Bisakodil", TermCategory.DRUG, "Stimülan laksatif"),
  createTerm(
    "Senna",
    "Senna",
    TermCategory.DRUG,
    "Stimülan laksatif, bitkisel"
  ),
  createTerm("Docusate", "Dokuzat", TermCategory.DRUG, "Yumuşatıcı laksatif"),
  createTerm(
    "Mineral oil",
    "Mineral Yağ",
    TermCategory.DRUG,
    "Lubrikant laksatif"
  ),
  createTerm(
    "Methylnaltrexone",
    "Metilnaltrekson",
    TermCategory.DRUG,
    "Opioid kaynaklı kabızlık"
  ),
  createTerm(
    "Naloxegol",
    "Naloksegol",
    TermCategory.DRUG,
    "Opioid kaynaklı kabızlık"
  ),
  createTerm(
    "Naldemedine",
    "Naldemedine",
    TermCategory.DRUG,
    "Opioid kaynaklı kabızlık"
  ),
  createTerm("Alvimopan", "Alvimopan", TermCategory.DRUG, "Postoperatif ileus"),
  createTerm(
    "Ursodeoxycholic acid",
    "Ursodeoksikolik Asit",
    TermCategory.DRUG,
    "Safra asidi, PBC, safra taşı"
  ),
  createTerm(
    "Chenodeoxycholic acid",
    "Kenodeoksikolik Asit",
    TermCategory.DRUG,
    "Safra asidi, safra taşı eritme"
  ),
  createTerm(
    "Obeticholic acid",
    "Obetikolik Asit",
    TermCategory.DRUG,
    "FXR agonisti, PBC"
  ),
  createTerm(
    "Cholestyramine",
    "Kolestiramin",
    TermCategory.DRUG,
    "Safra asidi bağlayıcı"
  ),
  createTerm(
    "Colestipol",
    "Kolestipol",
    TermCategory.DRUG,
    "Safra asidi bağlayıcı"
  ),
  createTerm(
    "Colesevelam",
    "Kolesevelam",
    TermCategory.DRUG,
    "Safra asidi bağlayıcı"
  ),
  createTerm(
    "Mesalamine",
    "Mesalamin",
    TermCategory.DRUG,
    "5-ASA, ülseratif kolit"
  ),
  createTerm(
    "Sulfasalazine",
    "Sülfasalazin",
    TermCategory.DRUG,
    "5-ASA ön ilacı, IBD, RA"
  ),
  createTerm(
    "Olsalazine",
    "Olsalazin",
    TermCategory.DRUG,
    "5-ASA, ülseratif kolit"
  ),
  createTerm(
    "Balsalazide",
    "Balsalazid",
    TermCategory.DRUG,
    "5-ASA ön ilacı, ülseratif kolit"
  ),
  createTerm(
    "Budesonide",
    "Budesonid",
    TermCategory.DRUG,
    "Topikal kortikosteroid, IBD"
  ),
  createTerm(
    "Vedolizumab",
    "Vedolizumab",
    TermCategory.DRUG,
    "Anti-integrin, IBD"
  ),
  createTerm(
    "Natalizumab",
    "Natalizumab",
    TermCategory.DRUG,
    "Anti-integrin, Crohn, MS"
  ),
  createTerm(
    "Ustekinumab",
    "Ustekinumab",
    TermCategory.DRUG,
    "IL-12/23 inhibitörü, Crohn, psoriazis"
  ),
  createTerm(
    "Tofacitinib",
    "Tofasitinib",
    TermCategory.DRUG,
    "JAK inhibitörü, ülseratif kolit, RA"
  ),
  createTerm(
    "Upadacitinib",
    "Upadacitinib",
    TermCategory.DRUG,
    "JAK inhibitörü, ülseratif kolit, RA"
  ),
  createTerm(
    "Ozanimod",
    "Ozanimod",
    TermCategory.DRUG,
    "S1P modülatörü, ülseratif kolit, MS"
  ),
  createTerm(
    "Pancrelipase",
    "Pankrelipaz",
    TermCategory.DRUG,
    "Pankreas enzim replasmanı"
  ),
  createTerm("Creon", "Creon", TermCategory.DRUG, "Pankreas enzim preparatı"),
  createTerm("Zenpep", "Zenpep", TermCategory.DRUG, "Pankreas enzim preparatı"),
  createTerm(
    "Octreotide",
    "Oktreotid",
    TermCategory.DRUG,
    "Somatostatin analoğu, akromegali, NET"
  ),
  createTerm(
    "Lanreotide",
    "Lanreotid",
    TermCategory.DRUG,
    "Somatostatin analoğu, akromegali, NET"
  ),
  createTerm(
    "Pasireotide",
    "Pasireotid",
    TermCategory.DRUG,
    "Somatostatin analoğu, Cushing"
  ),
  createTerm(
    "Terlipressin",
    "Terlipressin",
    TermCategory.DRUG,
    "Vazopressin analoğu, hepatorenal sendrom"
  ),
  createTerm(
    "Albumin",
    "Albümin",
    TermCategory.DRUG,
    "Plazma genişletici, asit"
  ),
  createTerm(
    "Lactulose",
    "Laktuloz",
    TermCategory.DRUG,
    "Hepatik ensefalopati tedavisi"
  ),
  createTerm(
    "Rifaximin",
    "Rifaksimin",
    TermCategory.DRUG,
    "Hepatik ensefalopati profilaksisi"
  ),
  createTerm(
    "L-ornithine L-aspartate",
    "L-Ornitin L-Aspartat",
    TermCategory.DRUG,
    "Hepatik ensefalopati"
  ),
  createTerm(
    "Branched-chain amino acids",
    "Dallı Zincirli Amino Asitler",
    TermCategory.DRUG,
    "Hepatik ensefalopati"
  ),
  createTerm(
    "Sofosbuvir",
    "Sofosbuvir",
    TermCategory.DRUG,
    "HCV NS5B inhibitörü"
  ),
  createTerm(
    "Ledipasvir",
    "Ledipasvir",
    TermCategory.DRUG,
    "HCV NS5A inhibitörü"
  ),
  createTerm(
    "Velpatasvir",
    "Velpatasvir",
    TermCategory.DRUG,
    "HCV NS5A inhibitörü"
  ),
  createTerm(
    "Glecaprevir",
    "Glecaprevir",
    TermCategory.DRUG,
    "HCV NS3/4A proteaz inhibitörü"
  ),
  createTerm(
    "Pibrentasvir",
    "Pibrentasvir",
    TermCategory.DRUG,
    "HCV NS5A inhibitörü"
  ),
  createTerm(
    "Daclatasvir",
    "Daklatasvir",
    TermCategory.DRUG,
    "HCV NS5A inhibitörü"
  ),
  createTerm("Elbasvir", "Elbasvir", TermCategory.DRUG, "HCV NS5A inhibitörü"),
  createTerm(
    "Grazoprevir",
    "Grazoprevir",
    TermCategory.DRUG,
    "HCV NS3/4A proteaz inhibitörü"
  ),
  createTerm(
    "Ribavirin",
    "Ribavirin",
    TermCategory.DRUG,
    "Antiviral, HCV kombinasyonu"
  ),
  createTerm(
    "Entecavir",
    "Entekavir",
    TermCategory.DRUG,
    "HBV nükleozid analoğu"
  ),
  createTerm(
    "Tenofovir",
    "Tenofovir",
    TermCategory.DRUG,
    "HBV/HIV nükleotid analoğu"
  ),
  createTerm(
    "Lamivudine",
    "Lamivudin",
    TermCategory.DRUG,
    "HBV/HIV nükleozid analoğu"
  ),
  createTerm(
    "Adefovir",
    "Adefovir",
    TermCategory.DRUG,
    "HBV nükleotid analoğu"
  ),
  createTerm(
    "Telbivudine",
    "Telbivudin",
    TermCategory.DRUG,
    "HBV nükleozid analoğu"
  ),
  createTerm(
    "Peginterferon alfa",
    "Peginterferon Alfa",
    TermCategory.DRUG,
    "HBV/HCV immünomodülatör"
  ),
  createTerm(
    "Bulevirtide",
    "Bulevirtid",
    TermCategory.DRUG,
    "HDV giriş inhibitörü"
  ),
];

// Solunum sistemi ilaçları
const generateRespiratoryDrugs = () => [
  createTerm(
    "Albuterol",
    "Albuterol",
    TermCategory.DRUG,
    "Kısa etkili beta-2 agonist, astım"
  ),
  createTerm(
    "Levalbuterol",
    "Levalbuterol",
    TermCategory.DRUG,
    "R-izomer albuterol"
  ),
  createTerm(
    "Terbutaline",
    "Terbutalin",
    TermCategory.DRUG,
    "Beta-2 agonist, astım, tokolitik"
  ),
  createTerm(
    "Metaproterenol",
    "Metaproterenol",
    TermCategory.DRUG,
    "Beta-2 agonist"
  ),
  createTerm("Pirbuterol", "Pirbuterol", TermCategory.DRUG, "Beta-2 agonist"),
  createTerm(
    "Salmeterol",
    "Salmeterol",
    TermCategory.DRUG,
    "Uzun etkili beta-2 agonist"
  ),
  createTerm(
    "Formoterol",
    "Formoterol",
    TermCategory.DRUG,
    "Uzun etkili beta-2 agonist"
  ),
  createTerm(
    "Arformoterol",
    "Arformoterol",
    TermCategory.DRUG,
    "R-izomer formoterol"
  ),
  createTerm(
    "Indacaterol",
    "İndakaterol",
    TermCategory.DRUG,
    "Ultra uzun etkili beta-2 agonist"
  ),
  createTerm(
    "Olodaterol",
    "Olodaterol",
    TermCategory.DRUG,
    "Ultra uzun etkili beta-2 agonist"
  ),
  createTerm(
    "Vilanterol",
    "Vilanterol",
    TermCategory.DRUG,
    "Ultra uzun etkili beta-2 agonist"
  ),
  createTerm(
    "Ipratropium",
    "İpratropium",
    TermCategory.DRUG,
    "Kısa etkili antikolinerjik"
  ),
  createTerm(
    "Tiotropium",
    "Tiotropium",
    TermCategory.DRUG,
    "Uzun etkili antikolinerjik, KOAH"
  ),
  createTerm(
    "Aclidinium",
    "Aklidinium",
    TermCategory.DRUG,
    "Uzun etkili antikolinerjik"
  ),
  createTerm(
    "Umeclidinium",
    "Umeklidinium",
    TermCategory.DRUG,
    "Uzun etkili antikolinerjik"
  ),
  createTerm(
    "Glycopyrrolate",
    "Glikopirrolat",
    TermCategory.DRUG,
    "Uzun etkili antikolinerjik"
  ),
  createTerm(
    "Revefenacin",
    "Revefenacin",
    TermCategory.DRUG,
    "Uzun etkili antikolinerjik"
  ),
  createTerm(
    "Beclomethasone",
    "Beklometazon",
    TermCategory.DRUG,
    "İnhale kortikosteroid"
  ),
  createTerm(
    "Budesonide inhaled",
    "İnhale Budesonid",
    TermCategory.DRUG,
    "İnhale kortikosteroid"
  ),
  createTerm(
    "Fluticasone",
    "Flutikason",
    TermCategory.DRUG,
    "İnhale kortikosteroid"
  ),
  createTerm(
    "Mometasone inhaled",
    "İnhale Mometazon",
    TermCategory.DRUG,
    "İnhale kortikosteroid"
  ),
  createTerm(
    "Ciclesonide",
    "Siklesonid",
    TermCategory.DRUG,
    "İnhale kortikosteroid"
  ),
  createTerm(
    "Flunisolide",
    "Flunisolid",
    TermCategory.DRUG,
    "İnhale kortikosteroid"
  ),
  createTerm(
    "Triamcinolone inhaled",
    "İnhale Triamsinolon",
    TermCategory.DRUG,
    "İnhale kortikosteroid"
  ),
  createTerm(
    "Cromolyn sodium",
    "Kromolin Sodyum",
    TermCategory.DRUG,
    "Mast hücre stabilizatörü"
  ),
  createTerm(
    "Nedocromil",
    "Nedokromil",
    TermCategory.DRUG,
    "Mast hücre stabilizatörü"
  ),
  createTerm(
    "Montelukast",
    "Montelukast",
    TermCategory.DRUG,
    "Lökotrien reseptör antagonisti"
  ),
  createTerm(
    "Zafirlukast",
    "Zafirlukast",
    TermCategory.DRUG,
    "Lökotrien reseptör antagonisti"
  ),
  createTerm(
    "Zileuton",
    "Zileuton",
    TermCategory.DRUG,
    "5-lipoksijenaz inhibitörü"
  ),
  createTerm(
    "Theophylline",
    "Teofilin",
    TermCategory.DRUG,
    "Metilksantin bronkodilatör"
  ),
  createTerm("Aminophylline", "Aminofilin", TermCategory.DRUG, "Teofilin tuzu"),
  createTerm(
    "Roflumilast",
    "Roflumilast",
    TermCategory.DRUG,
    "PDE4 inhibitörü, KOAH"
  ),
  createTerm(
    "Omalizumab",
    "Omalizumab",
    TermCategory.DRUG,
    "Anti-IgE, alerjik astım"
  ),
  createTerm(
    "Mepolizumab",
    "Mepolizumab",
    TermCategory.DRUG,
    "Anti-IL-5, eozinofilik astım"
  ),
  createTerm(
    "Reslizumab",
    "Reslizumab",
    TermCategory.DRUG,
    "Anti-IL-5, eozinofilik astım"
  ),
  createTerm(
    "Benralizumab",
    "Benralizumab",
    TermCategory.DRUG,
    "Anti-IL-5R, eozinofilik astım"
  ),
  createTerm(
    "Dupilumab",
    "Dupilumab",
    TermCategory.DRUG,
    "Anti-IL-4/IL-13, astım, egzama"
  ),
  createTerm(
    "Tezepelumab",
    "Tezepelumab",
    TermCategory.DRUG,
    "Anti-TSLP, şiddetli astım"
  ),
  createTerm(
    "Dextromethorphan",
    "Dekstrometorfan",
    TermCategory.DRUG,
    "Antitüsif"
  ),
  createTerm("Codeine", "Kodein", TermCategory.DRUG, "Opioid antitüsif"),
  createTerm(
    "Hydrocodone",
    "Hidrokodon",
    TermCategory.DRUG,
    "Opioid antitüsif"
  ),
  createTerm(
    "Benzonatate",
    "Benzonatat",
    TermCategory.DRUG,
    "Periferik antitüsif"
  ),
  createTerm("Guaifenesin", "Guaifenesin", TermCategory.DRUG, "Ekspektoran"),
  createTerm(
    "Acetylcysteine",
    "Asetilsistein",
    TermCategory.DRUG,
    "Mukolitik, antioksidan"
  ),
  createTerm("Carbocisteine", "Karbosistein", TermCategory.DRUG, "Mukolitik"),
  createTerm("Erdosteine", "Erdostein", TermCategory.DRUG, "Mukolitik"),
  createTerm("Bromhexine", "Bromheksin", TermCategory.DRUG, "Mukolitik"),
  createTerm("Ambroxol", "Ambroksol", TermCategory.DRUG, "Mukolitik"),
  createTerm(
    "Dornase alfa",
    "Dornaz Alfa",
    TermCategory.DRUG,
    "Rekombinant DNaz, kistik fibrozis"
  ),
  createTerm(
    "Hypertonic saline",
    "Hipertonik Salin",
    TermCategory.DRUG,
    "Mukus temizleyici, kistik fibrozis"
  ),
  createTerm(
    "Mannitol inhaled",
    "İnhale Mannitol",
    TermCategory.DRUG,
    "Mukus temizleyici"
  ),
  createTerm(
    "Ivacaftor",
    "İvakaftor",
    TermCategory.DRUG,
    "CFTR potansiyatörü, kistik fibrozis"
  ),
  createTerm(
    "Lumacaftor",
    "Lumakaftor",
    TermCategory.DRUG,
    "CFTR korrektörü, kistik fibrozis"
  ),
  createTerm(
    "Tezacaftor",
    "Tezakaftor",
    TermCategory.DRUG,
    "CFTR korrektörü, kistik fibrozis"
  ),
  createTerm(
    "Elexacaftor",
    "Eleksakaftor",
    TermCategory.DRUG,
    "CFTR korrektörü, kistik fibrozis"
  ),
  createTerm(
    "Pirfenidone",
    "Pirfenidon",
    TermCategory.DRUG,
    "Antifibrotik, IPF"
  ),
  createTerm(
    "Nintedanib",
    "Nintedanib",
    TermCategory.DRUG,
    "Tirozin kinaz inhibitörü, IPF"
  ),
  createTerm(
    "Bosentan",
    "Bosentan",
    TermCategory.DRUG,
    "Endotelin reseptör antagonisti, PAH"
  ),
  createTerm(
    "Ambrisentan",
    "Ambrisentan",
    TermCategory.DRUG,
    "Endotelin reseptör antagonisti, PAH"
  ),
  createTerm(
    "Macitentan",
    "Masitentan",
    TermCategory.DRUG,
    "Endotelin reseptör antagonisti, PAH"
  ),
  createTerm(
    "Sildenafil",
    "Sildenafil",
    TermCategory.DRUG,
    "PDE5 inhibitörü, PAH, ED"
  ),
  createTerm(
    "Tadalafil",
    "Tadalafil",
    TermCategory.DRUG,
    "PDE5 inhibitörü, PAH, ED, BPH"
  ),
  createTerm(
    "Riociguat",
    "Riosiguat",
    TermCategory.DRUG,
    "sGC stimülatörü, PAH, CTEPH"
  ),
  createTerm(
    "Epoprostenol",
    "Epoprostenol",
    TermCategory.DRUG,
    "Prostasiklin, PAH"
  ),
  createTerm(
    "Treprostinil",
    "Treprostinil",
    TermCategory.DRUG,
    "Prostasiklin analoğu, PAH"
  ),
  createTerm(
    "Iloprost",
    "İloprost",
    TermCategory.DRUG,
    "Prostasiklin analoğu, PAH"
  ),
  createTerm(
    "Selexipag",
    "Seleksipag",
    TermCategory.DRUG,
    "Prostasiklin reseptör agonisti, PAH"
  ),
  createTerm(
    "Pseudoephedrine",
    "Psödoefedrin",
    TermCategory.DRUG,
    "Dekonjestan"
  ),
  createTerm(
    "Phenylephrine oral",
    "Oral Fenilefrin",
    TermCategory.DRUG,
    "Dekonjestan"
  ),
  createTerm(
    "Oxymetazoline nasal",
    "Nazal Oksimetazolin",
    TermCategory.DRUG,
    "Topikal dekonjestan"
  ),
  createTerm(
    "Xylometazoline",
    "Ksilometazolin",
    TermCategory.DRUG,
    "Topikal dekonjestan"
  ),
  createTerm(
    "Fluticasone nasal",
    "Nazal Flutikason",
    TermCategory.DRUG,
    "İntranazal kortikosteroid"
  ),
  createTerm(
    "Mometasone nasal",
    "Nazal Mometazon",
    TermCategory.DRUG,
    "İntranazal kortikosteroid"
  ),
  createTerm(
    "Budesonide nasal",
    "Nazal Budesonid",
    TermCategory.DRUG,
    "İntranazal kortikosteroid"
  ),
  createTerm(
    "Triamcinolone nasal",
    "Nazal Triamsinolon",
    TermCategory.DRUG,
    "İntranazal kortikosteroid"
  ),
  createTerm(
    "Beclomethasone nasal",
    "Nazal Beklometazon",
    TermCategory.DRUG,
    "İntranazal kortikosteroid"
  ),
  createTerm(
    "Ciclesonide nasal",
    "Nazal Siklesonid",
    TermCategory.DRUG,
    "İntranazal kortikosteroid"
  ),
  createTerm(
    "Azelastine nasal",
    "Nazal Azelastin",
    TermCategory.DRUG,
    "İntranazal antihistaminik"
  ),
  createTerm(
    "Olopatadine nasal",
    "Nazal Olopatadin",
    TermCategory.DRUG,
    "İntranazal antihistaminik"
  ),
  createTerm(
    "Ipratropium nasal",
    "Nazal İpratropium",
    TermCategory.DRUG,
    "İntranazal antikolinerjik"
  ),
  createTerm(
    "Cromolyn nasal",
    "Nazal Kromolin",
    TermCategory.DRUG,
    "İntranazal mast hücre stabilizatörü"
  ),
];

// Enfeksiyon hastalıkları ilaçları
const generateInfectiousDrugs = () => [
  createTerm(
    "Oseltamivir",
    "Oseltamivir",
    TermCategory.DRUG,
    "Nöraminidaz inhibitörü, influenza"
  ),
  createTerm(
    "Zanamivir",
    "Zanamivir",
    TermCategory.DRUG,
    "Nöraminidaz inhibitörü, influenza"
  ),
  createTerm(
    "Peramivir",
    "Peramivir",
    TermCategory.DRUG,
    "IV nöraminidaz inhibitörü"
  ),
  createTerm(
    "Baloxavir",
    "Baloksavir",
    TermCategory.DRUG,
    "Cap-dependent endonükleaz inhibitörü"
  ),
  createTerm(
    "Amantadine",
    "Amantadin",
    TermCategory.DRUG,
    "M2 inhibitörü, Parkinson"
  ),
  createTerm("Rimantadine", "Rimantadin", TermCategory.DRUG, "M2 inhibitörü"),
  createTerm("Acyclovir", "Asiklovir", TermCategory.DRUG, "Antiviral, herpes"),
  createTerm(
    "Valacyclovir",
    "Valasiklovir",
    TermCategory.DRUG,
    "Asiklovir ön ilacı"
  ),
  createTerm(
    "Famciclovir",
    "Famsiklovir",
    TermCategory.DRUG,
    "Antiviral, herpes"
  ),
  createTerm(
    "Penciclovir",
    "Pensiklovir",
    TermCategory.DRUG,
    "Topikal antiviral"
  ),
  createTerm("Ganciclovir", "Gansiklovir", TermCategory.DRUG, "Antiviral, CMV"),
  createTerm(
    "Valganciclovir",
    "Valgansiklovir",
    TermCategory.DRUG,
    "Oral gansiklovir ön ilacı"
  ),
  createTerm(
    "Foscarnet",
    "Foskarnet",
    TermCategory.DRUG,
    "Antiviral, CMV, dirençli herpes"
  ),
  createTerm("Cidofovir", "Sidofovir", TermCategory.DRUG, "Antiviral, CMV"),
  createTerm(
    "Brincidofovir",
    "Brinsidofovir",
    TermCategory.DRUG,
    "Oral sidofovir ön ilacı"
  ),
  createTerm(
    "Letermovir",
    "Letermovir",
    TermCategory.DRUG,
    "CMV terminaz inhibitörü"
  ),
  createTerm(
    "Maribavir",
    "Maribavir",
    TermCategory.DRUG,
    "CMV UL97 kinaz inhibitörü"
  ),
  createTerm(
    "Tecovirimat",
    "Tekovirimat",
    TermCategory.DRUG,
    "Çiçek hastalığı, maymun çiçeği"
  ),
  createTerm("Zidovudine", "Zidovudin", TermCategory.DRUG, "NRTI, HIV"),
  createTerm("Lamivudine", "Lamivudin", TermCategory.DRUG, "NRTI, HIV, HBV"),
  createTerm("Emtricitabine", "Emtrisitabin", TermCategory.DRUG, "NRTI, HIV"),
  createTerm("Abacavir", "Abakavir", TermCategory.DRUG, "NRTI, HIV"),
  createTerm(
    "Tenofovir disoproxil",
    "Tenofovir Dizoproksil",
    TermCategory.DRUG,
    "NtRTI, HIV, HBV"
  ),
  createTerm(
    "Tenofovir alafenamide",
    "Tenofovir Alafenamid",
    TermCategory.DRUG,
    "NtRTI, HIV, HBV"
  ),
  createTerm("Stavudine", "Stavudin", TermCategory.DRUG, "NRTI, HIV"),
  createTerm("Didanosine", "Didanozin", TermCategory.DRUG, "NRTI, HIV"),
  createTerm("Efavirenz", "Efavirenz", TermCategory.DRUG, "NNRTI, HIV"),
  createTerm("Nevirapine", "Nevirapin", TermCategory.DRUG, "NNRTI, HIV"),
  createTerm("Etravirine", "Etravirin", TermCategory.DRUG, "NNRTI, HIV"),
  createTerm("Rilpivirine", "Rilpivirin", TermCategory.DRUG, "NNRTI, HIV"),
  createTerm("Doravirine", "Doravirin", TermCategory.DRUG, "NNRTI, HIV"),
  createTerm("Delavirdine", "Delavirdin", TermCategory.DRUG, "NNRTI, HIV"),
  createTerm(
    "Atazanavir",
    "Atazanavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, HIV"
  ),
  createTerm(
    "Darunavir",
    "Darunavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, HIV"
  ),
  createTerm(
    "Lopinavir",
    "Lopinavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, HIV"
  ),
  createTerm(
    "Ritonavir",
    "Ritonavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, booster"
  ),
  createTerm(
    "Cobicistat",
    "Kobisistat",
    TermCategory.DRUG,
    "Farmakokinetik booster"
  ),
  createTerm(
    "Saquinavir",
    "Sakinavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, HIV"
  ),
  createTerm(
    "Indinavir",
    "İndinavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, HIV"
  ),
  createTerm(
    "Nelfinavir",
    "Nelfinavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, HIV"
  ),
  createTerm(
    "Fosamprenavir",
    "Fosamprenavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, HIV"
  ),
  createTerm(
    "Tipranavir",
    "Tipranavir",
    TermCategory.DRUG,
    "Proteaz inhibitörü, HIV"
  ),
  createTerm(
    "Raltegravir",
    "Raltegravir",
    TermCategory.DRUG,
    "İntegraz inhibitörü, HIV"
  ),
  createTerm(
    "Elvitegravir",
    "Elvitegravir",
    TermCategory.DRUG,
    "İntegraz inhibitörü, HIV"
  ),
  createTerm(
    "Dolutegravir",
    "Dolutegravir",
    TermCategory.DRUG,
    "İntegraz inhibitörü, HIV"
  ),
  createTerm(
    "Bictegravir",
    "Biktegravir",
    TermCategory.DRUG,
    "İntegraz inhibitörü, HIV"
  ),
  createTerm(
    "Cabotegravir",
    "Kabotegravir",
    TermCategory.DRUG,
    "Uzun etkili integraz inhibitörü"
  ),
  createTerm(
    "Maraviroc",
    "Maravirok",
    TermCategory.DRUG,
    "CCR5 antagonisti, HIV"
  ),
  createTerm(
    "Enfuvirtide",
    "Enfuvirtid",
    TermCategory.DRUG,
    "Füzyon inhibitörü, HIV"
  ),
  createTerm(
    "Ibalizumab",
    "İbalizumab",
    TermCategory.DRUG,
    "CD4 monoklonal antikor, HIV"
  ),
  createTerm(
    "Fostemsavir",
    "Fostemsavir",
    TermCategory.DRUG,
    "Attachment inhibitörü, HIV"
  ),
  createTerm(
    "Lenacapavir",
    "Lenakpavir",
    TermCategory.DRUG,
    "Kapsid inhibitörü, HIV"
  ),
  createTerm("Islatravir", "İslatravir", TermCategory.DRUG, "NRTtI, HIV"),
  createTerm("Chloroquine", "Klorokin", TermCategory.DRUG, "Antimalaryal"),
  createTerm(
    "Hydroxychloroquine",
    "Hidroksiklorokin",
    TermCategory.DRUG,
    "Antimalaryal, RA, SLE"
  ),
  createTerm(
    "Mefloquine",
    "Meflokin",
    TermCategory.DRUG,
    "Antimalaryal profilaksi"
  ),
  createTerm(
    "Primaquine",
    "Primakin",
    TermCategory.DRUG,
    "Antimalaryal, P. vivax"
  ),
  createTerm(
    "Tafenoquine",
    "Tafenokin",
    TermCategory.DRUG,
    "Antimalaryal, P. vivax"
  ),
  createTerm("Atovaquone", "Atovakon", TermCategory.DRUG, "Antimalaryal, PCP"),
  createTerm("Proguanil", "Proguanil", TermCategory.DRUG, "Antimalaryal"),
  createTerm(
    "Pyrimethamine",
    "Pirimetamin",
    TermCategory.DRUG,
    "Antimalaryal, toksoplazmoz"
  ),
  createTerm(
    "Sulfadoxine",
    "Sülfadoksin",
    TermCategory.DRUG,
    "Antimalaryal kombinasyon"
  ),
  createTerm(
    "Artemether",
    "Artemeter",
    TermCategory.DRUG,
    "Artemisinin türevi"
  ),
  createTerm(
    "Artesunate",
    "Artesunat",
    TermCategory.DRUG,
    "Artemisinin türevi"
  ),
  createTerm(
    "Dihydroartemisinin",
    "Dihidroartemisinin",
    TermCategory.DRUG,
    "Artemisinin türevi"
  ),
  createTerm(
    "Lumefantrine",
    "Lumefantrin",
    TermCategory.DRUG,
    "Antimalaryal kombinasyon"
  ),
  createTerm(
    "Piperaquine",
    "Piperakin",
    TermCategory.DRUG,
    "Antimalaryal kombinasyon"
  ),
  createTerm(
    "Quinine",
    "Kinin",
    TermCategory.DRUG,
    "Antimalaryal, bacak krampları"
  ),
  createTerm(
    "Quinidine",
    "Kinidin",
    TermCategory.DRUG,
    "Antimalaryal, antiaritmik"
  ),
  createTerm(
    "Doxycycline",
    "Doksisiklin",
    TermCategory.DRUG,
    "Antimalaryal profilaksi, antibiyotik"
  ),
  createTerm(
    "Metronidazole",
    "Metronidazol",
    TermCategory.DRUG,
    "Antiprotozoal, anaerop antibiyotik"
  ),
  createTerm("Tinidazole", "Tinidazol", TermCategory.DRUG, "Antiprotozoal"),
  createTerm("Secnidazole", "Seknidazol", TermCategory.DRUG, "Antiprotozoal"),
  createTerm(
    "Nitazoxanide",
    "Nitazoksanid",
    TermCategory.DRUG,
    "Antiprotozoal, antihelmintik"
  ),
  createTerm(
    "Paromomycin",
    "Paromomisin",
    TermCategory.DRUG,
    "Aminoglikozid, amebiyaz"
  ),
  createTerm("Iodoquinol", "İyodokinol", TermCategory.DRUG, "Amebisid"),
  createTerm("Diloxanide", "Diloksanid", TermCategory.DRUG, "Luminal amebisid"),
  createTerm(
    "Pentamidine",
    "Pentamidin",
    TermCategory.DRUG,
    "Antiprotozoal, PCP, leishmaniasis"
  ),
  createTerm("Suramin", "Suramin", TermCategory.DRUG, "Trypanosomiasis"),
  createTerm(
    "Melarsoprol",
    "Melarsoprol",
    TermCategory.DRUG,
    "Trypanosomiasis"
  ),
  createTerm(
    "Eflornithine",
    "Eflornithin",
    TermCategory.DRUG,
    "Trypanosomiasis, hirsutizm"
  ),
  createTerm(
    "Nifurtimox",
    "Nifurtimoks",
    TermCategory.DRUG,
    "Chagas hastalığı"
  ),
  createTerm(
    "Benznidazole",
    "Benznidazol",
    TermCategory.DRUG,
    "Chagas hastalığı"
  ),
  createTerm(
    "Sodium stibogluconate",
    "Sodyum Stiboglukonat",
    TermCategory.DRUG,
    "Leishmaniasis"
  ),
  createTerm(
    "Meglumine antimoniate",
    "Meglumin Antimoniat",
    TermCategory.DRUG,
    "Leishmaniasis"
  ),
  createTerm(
    "Amphotericin B liposomal",
    "Lipozomal Amfoterisin B",
    TermCategory.DRUG,
    "Leishmaniasis, fungal"
  ),
  createTerm("Miltefosine", "Miltefosin", TermCategory.DRUG, "Leishmaniasis"),
  createTerm(
    "Albendazole",
    "Albendazol",
    TermCategory.DRUG,
    "Antihelmintik, geniş spektrum"
  ),
  createTerm("Mebendazole", "Mebendazol", TermCategory.DRUG, "Antihelmintik"),
  createTerm(
    "Thiabendazole",
    "Tiabendazol",
    TermCategory.DRUG,
    "Antihelmintik"
  ),
  createTerm(
    "Ivermectin",
    "İvermektin",
    TermCategory.DRUG,
    "Antihelmintik, antiparaziter"
  ),
  createTerm(
    "Praziquantel",
    "Prazikuantel",
    TermCategory.DRUG,
    "Antihelmintik, şistozomiyaz"
  ),
  createTerm(
    "Niclosamide",
    "Niklosamid",
    TermCategory.DRUG,
    "Antihelmintik, tenya"
  ),
  createTerm("Pyrantel", "Pirantel", TermCategory.DRUG, "Antihelmintik"),
  createTerm(
    "Diethylcarbamazine",
    "Dietilkarbamazin",
    TermCategory.DRUG,
    "Antihelmintik, filariasis"
  ),
  createTerm(
    "Triclabendazole",
    "Triklabendazol",
    TermCategory.DRUG,
    "Antihelmintik, fascioliasis"
  ),
  createTerm(
    "Oxamniquine",
    "Oksamnikin",
    TermCategory.DRUG,
    "Antihelmintik, şistozomiyaz"
  ),
];

// Hematoloji ilaçları
const generateHematologyDrugs = () => [
  createTerm(
    "Warfarin",
    "Varfarin",
    TermCategory.DRUG,
    "Vitamin K antagonisti antikoagülan"
  ),
  createTerm("Heparin", "Heparin", TermCategory.DRUG, "Antikoagülan, UFH"),
  createTerm(
    "Enoxaparin",
    "Enoksaparin",
    TermCategory.DRUG,
    "Düşük molekül ağırlıklı heparin"
  ),
  createTerm(
    "Dalteparin",
    "Dalteparin",
    TermCategory.DRUG,
    "Düşük molekül ağırlıklı heparin"
  ),
  createTerm(
    "Tinzaparin",
    "Tinzaparin",
    TermCategory.DRUG,
    "Düşük molekül ağırlıklı heparin"
  ),
  createTerm(
    "Fondaparinux",
    "Fondaparinuks",
    TermCategory.DRUG,
    "Faktör Xa inhibitörü"
  ),
  createTerm(
    "Rivaroxaban",
    "Rivaroksaban",
    TermCategory.DRUG,
    "Oral faktör Xa inhibitörü"
  ),
  createTerm(
    "Apixaban",
    "Apiksaban",
    TermCategory.DRUG,
    "Oral faktör Xa inhibitörü"
  ),
  createTerm(
    "Edoxaban",
    "Edoksaban",
    TermCategory.DRUG,
    "Oral faktör Xa inhibitörü"
  ),
  createTerm(
    "Betrixaban",
    "Betriksaban",
    TermCategory.DRUG,
    "Oral faktör Xa inhibitörü"
  ),
  createTerm(
    "Dabigatran",
    "Dabigatran",
    TermCategory.DRUG,
    "Oral direkt trombin inhibitörü"
  ),
  createTerm(
    "Argatroban",
    "Argatroban",
    TermCategory.DRUG,
    "Direkt trombin inhibitörü, HIT"
  ),
  createTerm(
    "Bivalirudin",
    "Bivalirudin",
    TermCategory.DRUG,
    "Direkt trombin inhibitörü"
  ),
  createTerm(
    "Desirudin",
    "Desirudin",
    TermCategory.DRUG,
    "Direkt trombin inhibitörü"
  ),
  createTerm(
    "Lepirudin",
    "Lepirudin",
    TermCategory.DRUG,
    "Direkt trombin inhibitörü"
  ),
  createTerm(
    "Idarucizumab",
    "İdarusizumab",
    TermCategory.DRUG,
    "Dabigatran antidotu"
  ),
  createTerm(
    "Andexanet alfa",
    "Andeksanet Alfa",
    TermCategory.DRUG,
    "Faktör Xa inhibitörü antidotu"
  ),
  createTerm("Protamine", "Protamin", TermCategory.DRUG, "Heparin antidotu"),
  createTerm("Vitamin K", "K Vitamini", TermCategory.DRUG, "Varfarin antidotu"),
  createTerm(
    "Aspirin",
    "Aspirin",
    TermCategory.DRUG,
    "Antiplatelet, COX inhibitörü"
  ),
  createTerm(
    "Clopidogrel",
    "Klopidogrel",
    TermCategory.DRUG,
    "P2Y12 inhibitörü antiplatelet"
  ),
  createTerm(
    "Prasugrel",
    "Prasugrel",
    TermCategory.DRUG,
    "P2Y12 inhibitörü antiplatelet"
  ),
  createTerm(
    "Ticagrelor",
    "Tikagrelor",
    TermCategory.DRUG,
    "P2Y12 inhibitörü antiplatelet"
  ),
  createTerm(
    "Cangrelor",
    "Kangrelor",
    TermCategory.DRUG,
    "IV P2Y12 inhibitörü"
  ),
  createTerm(
    "Ticlopidine",
    "Tiklopidin",
    TermCategory.DRUG,
    "P2Y12 inhibitörü antiplatelet"
  ),
  createTerm(
    "Dipyridamole",
    "Dipiridamol",
    TermCategory.DRUG,
    "Antiplatelet, vazodilatör"
  ),
  createTerm(
    "Cilostazol",
    "Silostazol",
    TermCategory.DRUG,
    "PDE3 inhibitörü, PAD"
  ),
  createTerm(
    "Vorapaxar",
    "Vorapaksar",
    TermCategory.DRUG,
    "PAR-1 antagonisti antiplatelet"
  ),
  createTerm(
    "Abciximab",
    "Absiksimab",
    TermCategory.DRUG,
    "GP IIb/IIIa inhibitörü"
  ),
  createTerm(
    "Eptifibatide",
    "Eptifibatid",
    TermCategory.DRUG,
    "GP IIb/IIIa inhibitörü"
  ),
  createTerm(
    "Tirofiban",
    "Tirofiban",
    TermCategory.DRUG,
    "GP IIb/IIIa inhibitörü"
  ),
  createTerm("Alteplase", "Alteplaz", TermCategory.DRUG, "tPA, trombolitik"),
  createTerm("Reteplase", "Reteplaz", TermCategory.DRUG, "Trombolitik"),
  createTerm("Tenecteplase", "Tenekteplaz", TermCategory.DRUG, "Trombolitik"),
  createTerm("Streptokinase", "Streptokinaz", TermCategory.DRUG, "Trombolitik"),
  createTerm("Urokinase", "Ürokinaz", TermCategory.DRUG, "Trombolitik"),
  createTerm(
    "Aminocaproic acid",
    "Aminokaproik Asit",
    TermCategory.DRUG,
    "Antifibrinolitik"
  ),
  createTerm(
    "Tranexamic acid",
    "Traneksamik Asit",
    TermCategory.DRUG,
    "Antifibrinolitik"
  ),
  createTerm(
    "Aprotinin",
    "Aprotinin",
    TermCategory.DRUG,
    "Serin proteaz inhibitörü"
  ),
  createTerm(
    "Desmopressin",
    "Desmopressin",
    TermCategory.DRUG,
    "Vazopressin analoğu, hemofili A"
  ),
  createTerm(
    "Factor VIII",
    "Faktör VIII",
    TermCategory.DRUG,
    "Hemofili A tedavisi"
  ),
  createTerm(
    "Factor IX",
    "Faktör IX",
    TermCategory.DRUG,
    "Hemofili B tedavisi"
  ),
  createTerm(
    "Emicizumab",
    "Emisizumab",
    TermCategory.DRUG,
    "Bispecific antikor, hemofili A"
  ),
  createTerm("Fitusiran", "Fitusiran", TermCategory.DRUG, "siRNA, hemofili"),
  createTerm(
    "Concizumab",
    "Konsizumab",
    TermCategory.DRUG,
    "Anti-TFPI, hemofili"
  ),
  createTerm(
    "Prothrombin complex concentrate",
    "Protrombin Kompleks Konsantresi",
    TermCategory.DRUG,
    "Faktör replasmanı"
  ),
  createTerm(
    "Recombinant factor VIIa",
    "Rekombinant Faktör VIIa",
    TermCategory.DRUG,
    "Hemostaz ajanı"
  ),
  createTerm(
    "Fibrinogen concentrate",
    "Fibrinojen Konsantresi",
    TermCategory.DRUG,
    "Fibrinojen replasmanı"
  ),
  createTerm(
    "Cryoprecipitate",
    "Kriyopresipitat",
    TermCategory.DRUG,
    "Fibrinojen, faktör VIII"
  ),
  createTerm(
    "Fresh frozen plasma",
    "Taze Donmuş Plazma",
    TermCategory.DRUG,
    "Pıhtılaşma faktörleri"
  ),
  createTerm(
    "Platelet transfusion",
    "Trombosit Transfüzyonu",
    TermCategory.DRUG,
    "Trombosit replasmanı"
  ),
  createTerm(
    "Red blood cell transfusion",
    "Eritrosit Transfüzyonu",
    TermCategory.DRUG,
    "Eritrosit replasmanı"
  ),
  createTerm(
    "Epoetin alfa",
    "Epoetin Alfa",
    TermCategory.DRUG,
    "Eritropoietin, anemi"
  ),
  createTerm(
    "Darbepoetin alfa",
    "Darbepoetin Alfa",
    TermCategory.DRUG,
    "Uzun etkili eritropoietin"
  ),
  createTerm(
    "Methoxy polyethylene glycol-epoetin beta",
    "Metoksi PEG-Epoetin Beta",
    TermCategory.DRUG,
    "Uzun etkili ESA"
  ),
  createTerm("Roxadustat", "Roksadustat", TermCategory.DRUG, "HIF-PHI, anemi"),
  createTerm("Daprodustat", "Daprodustat", TermCategory.DRUG, "HIF-PHI, anemi"),
  createTerm("Vadadustat", "Vadadustat", TermCategory.DRUG, "HIF-PHI, anemi"),
  createTerm("Iron sucrose", "Demir Sukroz", TermCategory.DRUG, "IV demir"),
  createTerm(
    "Ferric carboxymaltose",
    "Ferrik Karboksimaltoz",
    TermCategory.DRUG,
    "IV demir"
  ),
  createTerm("Ferumoxytol", "Ferumoksitol", TermCategory.DRUG, "IV demir"),
  createTerm("Iron dextran", "Demir Dekstran", TermCategory.DRUG, "IV demir"),
  createTerm(
    "Ferric gluconate",
    "Ferrik Glukonat",
    TermCategory.DRUG,
    "IV demir"
  ),
  createTerm(
    "Ferric derisomaltose",
    "Ferrik Derizomaltoz",
    TermCategory.DRUG,
    "IV demir"
  ),
  createTerm("Filgrastim", "Filgrastim", TermCategory.DRUG, "G-CSF, nötropeni"),
  createTerm(
    "Pegfilgrastim",
    "Pegfilgrastim",
    TermCategory.DRUG,
    "Uzun etkili G-CSF"
  ),
  createTerm(
    "Lipegfilgrastim",
    "Lipegfilgrastim",
    TermCategory.DRUG,
    "Uzun etkili G-CSF"
  ),
  createTerm(
    "Eflapegrastim",
    "Eflapegrastim",
    TermCategory.DRUG,
    "Uzun etkili G-CSF"
  ),
  createTerm("Sargramostim", "Sargramostim", TermCategory.DRUG, "GM-CSF"),
  createTerm(
    "Romiplostim",
    "Romiplostim",
    TermCategory.DRUG,
    "TPO agonisti, ITP"
  ),
  createTerm(
    "Eltrombopag",
    "Eltrombopag",
    TermCategory.DRUG,
    "TPO agonisti, ITP"
  ),
  createTerm("Avatrombopag", "Avatrombopag", TermCategory.DRUG, "TPO agonisti"),
  createTerm(
    "Lusutrombopag",
    "Lusutrombopag",
    TermCategory.DRUG,
    "TPO agonisti"
  ),
  createTerm(
    "Fostamatinib",
    "Fostamatinib",
    TermCategory.DRUG,
    "SYK inhibitörü, ITP"
  ),
  createTerm(
    "Rituximab",
    "Rituksimab",
    TermCategory.DRUG,
    "Anti-CD20, ITP, lenfoma"
  ),
  createTerm(
    "Intravenous immunoglobulin",
    "İntravenöz İmmünoglobulin",
    TermCategory.DRUG,
    "IVIG, ITP, immün yetmezlik"
  ),
  createTerm(
    "Anti-D immunoglobulin",
    "Anti-D İmmünoglobulin",
    TermCategory.DRUG,
    "Rh uyuşmazlığı, ITP"
  ),
  createTerm(
    "Hydroxyurea",
    "Hidroksiüre",
    TermCategory.DRUG,
    "Orak hücre, KML, PV"
  ),
  createTerm(
    "Voxelotor",
    "Vokselotor",
    TermCategory.DRUG,
    "HbS polimerizasyon inhibitörü"
  ),
  createTerm(
    "Crizanlizumab",
    "Krizanlizumab",
    TermCategory.DRUG,
    "Anti-P-selektin, orak hücre"
  ),
  createTerm(
    "L-glutamine",
    "L-Glutamin",
    TermCategory.DRUG,
    "Orak hücre hastalığı"
  ),
  createTerm(
    "Luspatercept",
    "Luspatersept",
    TermCategory.DRUG,
    "Eritroid olgunlaşma ajanı"
  ),
  createTerm(
    "Deferasirox",
    "Deferasioks",
    TermCategory.DRUG,
    "Oral demir şelatörü"
  ),
  createTerm(
    "Deferoxamine",
    "Deferoksamin",
    TermCategory.DRUG,
    "Demir şelatörü"
  ),
  createTerm(
    "Deferiprone",
    "Deferipron",
    TermCategory.DRUG,
    "Oral demir şelatörü"
  ),
  createTerm(
    "Eculizumab",
    "Ekulizumab",
    TermCategory.DRUG,
    "Anti-C5, PNH, aHUS"
  ),
  createTerm(
    "Ravulizumab",
    "Ravulizumab",
    TermCategory.DRUG,
    "Uzun etkili anti-C5"
  ),
  createTerm(
    "Pegcetacoplan",
    "Pegsetakoplan",
    TermCategory.DRUG,
    "C3 inhibitörü, PNH"
  ),
  createTerm(
    "Iptacopan",
    "İptakopan",
    TermCategory.DRUG,
    "Faktör B inhibitörü, PNH"
  ),
  createTerm(
    "Caplacizumab",
    "Kaplasizumab",
    TermCategory.DRUG,
    "Anti-vWF, TTP"
  ),
];

// Ek hastalıklar - Hematoloji, Onkoloji, Pediatri
const generateMoreDiseases3 = () => [
  // Hematolojik hastalıklar
  createTerm(
    "Iron deficiency anemia",
    "Demir Eksikliği Anemisi",
    TermCategory.DISEASE,
    "En sık anemi nedeni"
  ),
  createTerm(
    "Vitamin B12 deficiency",
    "B12 Vitamini Eksikliği",
    TermCategory.DISEASE,
    "Megaloblastik anemi"
  ),
  createTerm(
    "Folate deficiency",
    "Folat Eksikliği",
    TermCategory.DISEASE,
    "Megaloblastik anemi"
  ),
  createTerm(
    "Pernicious anemia",
    "Pernisiyöz Anemi",
    TermCategory.DISEASE,
    "Otoimmün B12 eksikliği"
  ),
  createTerm(
    "Aplastic anemia",
    "Aplastik Anemi",
    TermCategory.DISEASE,
    "Kemik iliği yetmezliği"
  ),
  createTerm(
    "Hemolytic anemia",
    "Hemolitik Anemi",
    TermCategory.DISEASE,
    "Eritrosit yıkımı"
  ),
  createTerm(
    "Autoimmune hemolytic anemia",
    "Otoimmün Hemolitik Anemi",
    TermCategory.DISEASE,
    "Antikor aracılı hemoliz"
  ),
  createTerm(
    "Sickle cell disease",
    "Orak Hücre Hastalığı",
    TermCategory.DISEASE,
    "HbS hemoglobinopatisi"
  ),
  createTerm(
    "Thalassemia",
    "Talasemi",
    TermCategory.DISEASE,
    "Globin zincir sentez bozukluğu"
  ),
  createTerm(
    "Beta thalassemia major",
    "Beta Talasemi Major",
    TermCategory.DISEASE,
    "Cooley anemisi"
  ),
  createTerm(
    "Alpha thalassemia",
    "Alfa Talasemi",
    TermCategory.DISEASE,
    "Alfa globin eksikliği"
  ),
  createTerm(
    "Hereditary spherocytosis",
    "Herediter Sferositoz",
    TermCategory.DISEASE,
    "Eritrosit membran defekti"
  ),
  createTerm(
    "G6PD deficiency",
    "G6PD Eksikliği",
    TermCategory.DISEASE,
    "Favizm"
  ),
  createTerm(
    "Pyruvate kinase deficiency",
    "Piruvat Kinaz Eksikliği",
    TermCategory.DISEASE,
    "Eritrosit enzim defekti"
  ),
  createTerm(
    "Paroxysmal nocturnal hemoglobinuria",
    "Paroksismal Noktürnal Hemoglobinüri",
    TermCategory.DISEASE,
    "PNH, kompleman aracılı hemoliz"
  ),
  createTerm(
    "Myelodysplastic syndrome",
    "Miyelodisplastik Sendrom",
    TermCategory.DISEASE,
    "MDS, klonal kemik iliği hastalığı"
  ),
  createTerm(
    "Acute myeloid leukemia",
    "Akut Miyeloid Lösemi",
    TermCategory.DISEASE,
    "AML"
  ),
  createTerm(
    "Acute lymphoblastic leukemia",
    "Akut Lenfoblastik Lösemi",
    TermCategory.DISEASE,
    "ALL"
  ),
  createTerm(
    "Chronic myeloid leukemia",
    "Kronik Miyeloid Lösemi",
    TermCategory.DISEASE,
    "KML, Philadelphia kromozomu"
  ),
  createTerm(
    "Chronic lymphocytic leukemia",
    "Kronik Lenfositik Lösemi",
    TermCategory.DISEASE,
    "KLL"
  ),
  createTerm(
    "Hairy cell leukemia",
    "Tüylü Hücreli Lösemi",
    TermCategory.DISEASE,
    "HCL"
  ),
  createTerm(
    "Hodgkin lymphoma",
    "Hodgkin Lenfoma",
    TermCategory.DISEASE,
    "Reed-Sternberg hücreli lenfoma"
  ),
  createTerm(
    "Non-Hodgkin lymphoma",
    "Non-Hodgkin Lenfoma",
    TermCategory.DISEASE,
    "NHL"
  ),
  createTerm(
    "Diffuse large B-cell lymphoma",
    "Diffüz Büyük B Hücreli Lenfoma",
    TermCategory.DISEASE,
    "DLBCL"
  ),
  createTerm(
    "Follicular lymphoma",
    "Foliküler Lenfoma",
    TermCategory.DISEASE,
    "İndolent B hücreli lenfoma"
  ),
  createTerm(
    "Mantle cell lymphoma",
    "Mantle Hücreli Lenfoma",
    TermCategory.DISEASE,
    "MCL"
  ),
  createTerm(
    "Marginal zone lymphoma",
    "Marjinal Zon Lenfoma",
    TermCategory.DISEASE,
    "MZL"
  ),
  createTerm(
    "Burkitt lymphoma",
    "Burkitt Lenfoma",
    TermCategory.DISEASE,
    "Agresif B hücreli lenfoma"
  ),
  createTerm(
    "Peripheral T-cell lymphoma",
    "Periferik T Hücreli Lenfoma",
    TermCategory.DISEASE,
    "PTCL"
  ),
  createTerm(
    "Anaplastic large cell lymphoma",
    "Anaplastik Büyük Hücreli Lenfoma",
    TermCategory.DISEASE,
    "ALCL"
  ),
  createTerm(
    "Multiple myeloma",
    "Multipl Miyelom",
    TermCategory.DISEASE,
    "Plazma hücre malignitesi"
  ),
  createTerm(
    "Waldenstrom macroglobulinemia",
    "Waldenström Makroglobulinemisi",
    TermCategory.DISEASE,
    "IgM monoklonal gamopati"
  ),
  createTerm(
    "Monoclonal gammopathy of undetermined significance",
    "Önemi Belirsiz Monoklonal Gamopati",
    TermCategory.DISEASE,
    "MGUS"
  ),
  createTerm(
    "Amyloidosis",
    "Amiloidoz",
    TermCategory.DISEASE,
    "Protein birikimi hastalığı"
  ),
  createTerm(
    "Polycythemia vera",
    "Polisitemia Vera",
    TermCategory.DISEASE,
    "JAK2 mutasyonlu MPN"
  ),
  createTerm(
    "Essential thrombocythemia",
    "Esansiyel Trombositemi",
    TermCategory.DISEASE,
    "Trombosit artışı MPN"
  ),
  createTerm(
    "Primary myelofibrosis",
    "Primer Miyelofibrozis",
    TermCategory.DISEASE,
    "Kemik iliği fibrozisi"
  ),
  createTerm(
    "Chronic myelomonocytic leukemia",
    "Kronik Miyelomonositik Lösemi",
    TermCategory.DISEASE,
    "KMML"
  ),
  createTerm(
    "Mastocytosis",
    "Mastositoz",
    TermCategory.DISEASE,
    "Mast hücre proliferasyonu"
  ),
  createTerm(
    "Hemophilia A",
    "Hemofili A",
    TermCategory.DISEASE,
    "Faktör VIII eksikliği"
  ),
  createTerm(
    "Hemophilia B",
    "Hemofili B",
    TermCategory.DISEASE,
    "Faktör IX eksikliği"
  ),
  createTerm(
    "Von Willebrand disease",
    "Von Willebrand Hastalığı",
    TermCategory.DISEASE,
    "vWF eksikliği"
  ),
  createTerm(
    "Disseminated intravascular coagulation",
    "Yaygın Damar İçi Pıhtılaşma",
    TermCategory.DISEASE,
    "DIC"
  ),
  createTerm(
    "Thrombotic thrombocytopenic purpura",
    "Trombotik Trombositopenik Purpura",
    TermCategory.DISEASE,
    "TTP"
  ),
  createTerm(
    "Hemolytic uremic syndrome",
    "Hemolitik Üremik Sendrom",
    TermCategory.DISEASE,
    "HÜS"
  ),
  createTerm(
    "Immune thrombocytopenia",
    "İmmün Trombositopeni",
    TermCategory.DISEASE,
    "ITP"
  ),
  createTerm(
    "Heparin-induced thrombocytopenia",
    "Heparin Kaynaklı Trombositopeni",
    TermCategory.DISEASE,
    "HIT"
  ),
  createTerm(
    "Thrombophilia",
    "Trombofili",
    TermCategory.DISEASE,
    "Pıhtılaşma eğilimi"
  ),
  createTerm(
    "Factor V Leiden",
    "Faktör V Leiden",
    TermCategory.DISEASE,
    "Kalıtsal trombofili"
  ),
  createTerm(
    "Prothrombin gene mutation",
    "Protrombin Gen Mutasyonu",
    TermCategory.DISEASE,
    "G20210A mutasyonu"
  ),
  createTerm(
    "Protein C deficiency",
    "Protein C Eksikliği",
    TermCategory.DISEASE,
    "Kalıtsal trombofili"
  ),
  createTerm(
    "Protein S deficiency",
    "Protein S Eksikliği",
    TermCategory.DISEASE,
    "Kalıtsal trombofili"
  ),
  createTerm(
    "Antithrombin deficiency",
    "Antitrombin Eksikliği",
    TermCategory.DISEASE,
    "Kalıtsal trombofili"
  ),
  createTerm(
    "Antiphospholipid syndrome",
    "Antifosfolipid Sendromu",
    TermCategory.DISEASE,
    "APS, edinsel trombofili"
  ),
  createTerm(
    "Neutropenia",
    "Nötropeni",
    TermCategory.DISEASE,
    "Düşük nötrofil sayısı"
  ),
  createTerm(
    "Agranulocytosis",
    "Agranülositoz",
    TermCategory.DISEASE,
    "Şiddetli nötropeni"
  ),
  createTerm(
    "Leukocytosis",
    "Lökositoz",
    TermCategory.DISEASE,
    "Yüksek beyaz küre sayısı"
  ),
  createTerm(
    "Eosinophilia",
    "Eozinofili",
    TermCategory.DISEASE,
    "Yüksek eozinofil sayısı"
  ),
  createTerm(
    "Lymphocytosis",
    "Lenfositoz",
    TermCategory.DISEASE,
    "Yüksek lenfosit sayısı"
  ),
  createTerm(
    "Lymphopenia",
    "Lenfopeni",
    TermCategory.DISEASE,
    "Düşük lenfosit sayısı"
  ),
  createTerm(
    "Pancytopenia",
    "Pansitopeni",
    TermCategory.DISEASE,
    "Tüm kan hücrelerinde azalma"
  ),

  // Pediatrik hastalıklar
  createTerm(
    "Neonatal jaundice",
    "Yenidoğan Sarılığı",
    TermCategory.DISEASE,
    "Hiperbilirubinemi"
  ),
  createTerm(
    "Kernicterus",
    "Kernikterus",
    TermCategory.DISEASE,
    "Bilirubin ensefalopatisi"
  ),
  createTerm(
    "Respiratory distress syndrome",
    "Respiratuar Distres Sendromu",
    TermCategory.DISEASE,
    "Prematüre akciğer hastalığı"
  ),
  createTerm(
    "Bronchopulmonary dysplasia",
    "Bronkopulmoner Displazi",
    TermCategory.DISEASE,
    "Kronik akciğer hastalığı"
  ),
  createTerm(
    "Necrotizing enterocolitis",
    "Nekrotizan Enterokolit",
    TermCategory.DISEASE,
    "Prematüre bağırsak hastalığı"
  ),
  createTerm(
    "Retinopathy of prematurity",
    "Prematüre Retinopatisi",
    TermCategory.DISEASE,
    "ROP"
  ),
  createTerm(
    "Intraventricular hemorrhage",
    "İntraventriküler Kanama",
    TermCategory.DISEASE,
    "Prematüre beyin kanaması"
  ),
  createTerm(
    "Patent ductus arteriosus",
    "Patent Duktus Arteriyozus",
    TermCategory.DISEASE,
    "PDA"
  ),
  createTerm(
    "Ventricular septal defect",
    "Ventriküler Septal Defekt",
    TermCategory.DISEASE,
    "VSD"
  ),
  createTerm(
    "Atrial septal defect",
    "Atriyal Septal Defekt",
    TermCategory.DISEASE,
    "ASD"
  ),
  createTerm(
    "Tetralogy of Fallot",
    "Fallot Tetralojisi",
    TermCategory.DISEASE,
    "Siyanotik kalp hastalığı"
  ),
  createTerm(
    "Transposition of great arteries",
    "Büyük Arterlerin Transpozisyonu",
    TermCategory.DISEASE,
    "TGA"
  ),
  createTerm(
    "Coarctation of aorta",
    "Aort Koarktasyonu",
    TermCategory.DISEASE,
    "Aort daralması"
  ),
  createTerm(
    "Hypoplastic left heart syndrome",
    "Hipoplastik Sol Kalp Sendromu",
    TermCategory.DISEASE,
    "HLHS"
  ),
  createTerm(
    "Kawasaki disease",
    "Kawasaki Hastalığı",
    TermCategory.DISEASE,
    "Çocukluk vasküliti"
  ),
  createTerm(
    "Henoch-Schonlein purpura",
    "Henoch-Schönlein Purpurası",
    TermCategory.DISEASE,
    "IgA vasküliti"
  ),
  createTerm(
    "Juvenile idiopathic arthritis",
    "Juvenil İdiyopatik Artrit",
    TermCategory.DISEASE,
    "Çocukluk artriti"
  ),
  createTerm(
    "Febrile seizure",
    "Febril Konvülziyon",
    TermCategory.DISEASE,
    "Ateşli havale"
  ),
  createTerm(
    "Infantile spasms",
    "İnfantil Spazmlar",
    TermCategory.DISEASE,
    "West sendromu"
  ),
  createTerm(
    "Lennox-Gastaut syndrome",
    "Lennox-Gastaut Sendromu",
    TermCategory.DISEASE,
    "Şiddetli epilepsi"
  ),
  createTerm(
    "Dravet syndrome",
    "Dravet Sendromu",
    TermCategory.DISEASE,
    "SCN1A mutasyonu epilepsi"
  ),
  createTerm(
    "Cerebral palsy",
    "Serebral Palsi",
    TermCategory.DISEASE,
    "Beyin felci"
  ),
  createTerm(
    "Spinal muscular atrophy",
    "Spinal Müsküler Atrofi",
    TermCategory.DISEASE,
    "SMA"
  ),
  createTerm(
    "Duchenne muscular dystrophy",
    "Duchenne Müsküler Distrofi",
    TermCategory.DISEASE,
    "DMD"
  ),
  createTerm(
    "Becker muscular dystrophy",
    "Becker Müsküler Distrofi",
    TermCategory.DISEASE,
    "BMD"
  ),
  createTerm(
    "Down syndrome",
    "Down Sendromu",
    TermCategory.DISEASE,
    "Trizomi 21"
  ),
  createTerm(
    "Turner syndrome",
    "Turner Sendromu",
    TermCategory.DISEASE,
    "45,X kromozom"
  ),
  createTerm(
    "Klinefelter syndrome",
    "Klinefelter Sendromu",
    TermCategory.DISEASE,
    "47,XXY kromozom"
  ),
  createTerm(
    "Fragile X syndrome",
    "Frajil X Sendromu",
    TermCategory.DISEASE,
    "FMR1 mutasyonu"
  ),
  createTerm(
    "Prader-Willi syndrome",
    "Prader-Willi Sendromu",
    TermCategory.DISEASE,
    "Genetik obezite sendromu"
  ),
  createTerm(
    "Angelman syndrome",
    "Angelman Sendromu",
    TermCategory.DISEASE,
    "UBE3A mutasyonu"
  ),
  createTerm(
    "Williams syndrome",
    "Williams Sendromu",
    TermCategory.DISEASE,
    "7q11.23 delesyonu"
  ),
  createTerm(
    "DiGeorge syndrome",
    "DiGeorge Sendromu",
    TermCategory.DISEASE,
    "22q11.2 delesyonu"
  ),
  createTerm(
    "Noonan syndrome",
    "Noonan Sendromu",
    TermCategory.DISEASE,
    "RASopati"
  ),
  createTerm(
    "Marfan syndrome",
    "Marfan Sendromu",
    TermCategory.DISEASE,
    "FBN1 mutasyonu"
  ),
  createTerm(
    "Ehlers-Danlos syndrome",
    "Ehlers-Danlos Sendromu",
    TermCategory.DISEASE,
    "Bağ dokusu hastalığı"
  ),
  createTerm(
    "Osteogenesis imperfecta",
    "Osteogenezis İmperfekta",
    TermCategory.DISEASE,
    "Kırılgan kemik hastalığı"
  ),
  createTerm(
    "Achondroplasia",
    "Akondroplazi",
    TermCategory.DISEASE,
    "FGFR3 mutasyonu cücelik"
  ),
  createTerm("Phenylketonuria", "Fenilketonüri", TermCategory.DISEASE, "PKU"),
  createTerm(
    "Galactosemia",
    "Galaktozemi",
    TermCategory.DISEASE,
    "Galaktoz metabolizma bozukluğu"
  ),
  createTerm(
    "Maple syrup urine disease",
    "Akçaağaç Şurubu İdrar Hastalığı",
    TermCategory.DISEASE,
    "MSUD"
  ),
  createTerm(
    "Homocystinuria",
    "Homosistinüri",
    TermCategory.DISEASE,
    "Metiyonin metabolizma bozukluğu"
  ),
  createTerm(
    "Tyrosinemia",
    "Tirozinemi",
    TermCategory.DISEASE,
    "Tirozin metabolizma bozukluğu"
  ),
  createTerm(
    "Glycogen storage disease",
    "Glikojen Depo Hastalığı",
    TermCategory.DISEASE,
    "GSD"
  ),
  createTerm(
    "Pompe disease",
    "Pompe Hastalığı",
    TermCategory.DISEASE,
    "GSD tip II"
  ),
  createTerm(
    "Gaucher disease",
    "Gaucher Hastalığı",
    TermCategory.DISEASE,
    "Lizozomal depo hastalığı"
  ),
  createTerm(
    "Fabry disease",
    "Fabry Hastalığı",
    TermCategory.DISEASE,
    "Alfa-galaktosidaz eksikliği"
  ),
  createTerm(
    "Niemann-Pick disease",
    "Niemann-Pick Hastalığı",
    TermCategory.DISEASE,
    "Sfingomiyelin birikimi"
  ),
  createTerm(
    "Tay-Sachs disease",
    "Tay-Sachs Hastalığı",
    TermCategory.DISEASE,
    "Heksozaminidaz A eksikliği"
  ),
  createTerm(
    "Mucopolysaccharidosis",
    "Mukopolisakkaridoz",
    TermCategory.DISEASE,
    "MPS"
  ),
  createTerm(
    "Hunter syndrome",
    "Hunter Sendromu",
    TermCategory.DISEASE,
    "MPS II"
  ),
  createTerm(
    "Hurler syndrome",
    "Hurler Sendromu",
    TermCategory.DISEASE,
    "MPS I"
  ),
  createTerm(
    "Cystic fibrosis",
    "Kistik Fibrozis",
    TermCategory.DISEASE,
    "CFTR mutasyonu"
  ),
  createTerm(
    "Congenital hypothyroidism",
    "Konjenital Hipotiroidizm",
    TermCategory.DISEASE,
    "Doğuştan tiroid yetersizliği"
  ),
  createTerm(
    "Congenital adrenal hyperplasia",
    "Konjenital Adrenal Hiperplazi",
    TermCategory.DISEASE,
    "CAH"
  ),
  createTerm(
    "Pyloric stenosis",
    "Pilor Stenozu",
    TermCategory.DISEASE,
    "Mide çıkışı darlığı"
  ),
  createTerm(
    "Intussusception",
    "İnvajinasyon",
    TermCategory.DISEASE,
    "Bağırsak içine girme"
  ),
  createTerm(
    "Hirschsprung disease",
    "Hirschsprung Hastalığı",
    TermCategory.DISEASE,
    "Aganglionik megakolon"
  ),
  createTerm(
    "Biliary atresia",
    "Biliyer Atrezi",
    TermCategory.DISEASE,
    "Safra yolu yokluğu"
  ),
  createTerm(
    "Wilms tumor",
    "Wilms Tümörü",
    TermCategory.DISEASE,
    "Nefroblastom"
  ),
  createTerm(
    "Neuroblastoma",
    "Nöroblastom",
    TermCategory.DISEASE,
    "Çocukluk nöral tümörü"
  ),
  createTerm(
    "Retinoblastoma",
    "Retinoblastom",
    TermCategory.DISEASE,
    "Göz tümörü"
  ),
  createTerm(
    "Rhabdomyosarcoma",
    "Rabdomiyosarkom",
    TermCategory.DISEASE,
    "Çocukluk kas tümörü"
  ),
  createTerm(
    "Ewing sarcoma",
    "Ewing Sarkomu",
    TermCategory.DISEASE,
    "Kemik tümörü"
  ),
  createTerm(
    "Osteosarcoma",
    "Osteosarkom",
    TermCategory.DISEASE,
    "Kemik kanseri"
  ),
  createTerm(
    "Medulloblastoma",
    "Medulloblastom",
    TermCategory.DISEASE,
    "Çocukluk beyin tümörü"
  ),
  createTerm(
    "Pilocytic astrocytoma",
    "Pilositik Astrositom",
    TermCategory.DISEASE,
    "İyi huylu beyin tümörü"
  ),
  createTerm(
    "Craniopharyngioma",
    "Kraniyofarinjiom",
    TermCategory.DISEASE,
    "Hipofiz bölgesi tümörü"
  ),
  createTerm(
    "Germ cell tumor",
    "Germ Hücreli Tümör",
    TermCategory.DISEASE,
    "Gonadal tümör"
  ),
  createTerm(
    "Hepatoblastoma",
    "Hepatoblastom",
    TermCategory.DISEASE,
    "Çocukluk karaciğer tümörü"
  ),
];

// Ek bileşenler
const generateMoreComponents = () => [
  createTerm(
    "Adenosine triphosphate",
    "Adenozin Trifosfat",
    TermCategory.COMPONENT,
    "ATP, hücresel enerji birimi"
  ),
  createTerm(
    "Adenosine diphosphate",
    "Adenozin Difosfat",
    TermCategory.COMPONENT,
    "ADP, enerji metabolizması"
  ),
  createTerm(
    "Adenosine monophosphate",
    "Adenozin Monofosfat",
    TermCategory.COMPONENT,
    "AMP, enerji metabolizması"
  ),
  createTerm(
    "Cyclic AMP",
    "Siklik AMP",
    TermCategory.COMPONENT,
    "cAMP, ikincil haberci"
  ),
  createTerm(
    "Cyclic GMP",
    "Siklik GMP",
    TermCategory.COMPONENT,
    "cGMP, ikincil haberci"
  ),
  createTerm(
    "Nicotinamide adenine dinucleotide",
    "Nikotinamid Adenin Dinükleotid",
    TermCategory.COMPONENT,
    "NAD+, elektron taşıyıcı"
  ),
  createTerm("NADH", "NADH", TermCategory.COMPONENT, "İndirgenmiş NAD"),
  createTerm(
    "NADP",
    "NADP",
    TermCategory.COMPONENT,
    "Nikotinamid adenin dinükleotid fosfat"
  ),
  createTerm("NADPH", "NADPH", TermCategory.COMPONENT, "İndirgenmiş NADP"),
  createTerm(
    "Flavin adenine dinucleotide",
    "Flavin Adenin Dinükleotid",
    TermCategory.COMPONENT,
    "FAD, elektron taşıyıcı"
  ),
  createTerm("FADH2", "FADH2", TermCategory.COMPONENT, "İndirgenmiş FAD"),
  createTerm(
    "Coenzyme A",
    "Koenzim A",
    TermCategory.COMPONENT,
    "CoA, açil grup taşıyıcı"
  ),
  createTerm(
    "Acetyl-CoA",
    "Asetil-CoA",
    TermCategory.COMPONENT,
    "Asetil koenzim A"
  ),
  createTerm(
    "Malonyl-CoA",
    "Malonil-CoA",
    TermCategory.COMPONENT,
    "Yağ asidi sentezi ara ürünü"
  ),
  createTerm(
    "Succinyl-CoA",
    "Süksinil-CoA",
    TermCategory.COMPONENT,
    "Sitrik asit döngüsü ara ürünü"
  ),
  createTerm(
    "Pyruvate",
    "Piruvat",
    TermCategory.COMPONENT,
    "Glikoliz son ürünü"
  ),
  createTerm(
    "Lactate",
    "Laktat",
    TermCategory.COMPONENT,
    "Anaerobik metabolizma ürünü"
  ),
  createTerm(
    "Oxaloacetate",
    "Oksaloasetat",
    TermCategory.COMPONENT,
    "Sitrik asit döngüsü ara ürünü"
  ),
  createTerm(
    "Citrate",
    "Sitrat",
    TermCategory.COMPONENT,
    "Sitrik asit döngüsü ara ürünü"
  ),
  createTerm(
    "Alpha-ketoglutarate",
    "Alfa-Ketoglutarat",
    TermCategory.COMPONENT,
    "Sitrik asit döngüsü ara ürünü"
  ),
  createTerm(
    "Succinate",
    "Süksinat",
    TermCategory.COMPONENT,
    "Sitrik asit döngüsü ara ürünü"
  ),
  createTerm(
    "Fumarate",
    "Fumarat",
    TermCategory.COMPONENT,
    "Sitrik asit döngüsü ara ürünü"
  ),
  createTerm(
    "Malate",
    "Malat",
    TermCategory.COMPONENT,
    "Sitrik asit döngüsü ara ürünü"
  ),
  createTerm(
    "Glucose-6-phosphate",
    "Glukoz-6-Fosfat",
    TermCategory.COMPONENT,
    "Glikoliz ara ürünü"
  ),
  createTerm(
    "Fructose-6-phosphate",
    "Fruktoz-6-Fosfat",
    TermCategory.COMPONENT,
    "Glikoliz ara ürünü"
  ),
  createTerm(
    "Fructose-1,6-bisphosphate",
    "Fruktoz-1,6-Bisfosfat",
    TermCategory.COMPONENT,
    "Glikoliz ara ürünü"
  ),
  createTerm(
    "Glyceraldehyde-3-phosphate",
    "Gliseraldehit-3-Fosfat",
    TermCategory.COMPONENT,
    "Glikoliz ara ürünü"
  ),
  createTerm(
    "Phosphoenolpyruvate",
    "Fosfoenolpiruvat",
    TermCategory.COMPONENT,
    "Glikoliz ara ürünü"
  ),
  createTerm(
    "Ribose-5-phosphate",
    "Riboz-5-Fosfat",
    TermCategory.COMPONENT,
    "Pentoz fosfat yolu ürünü"
  ),
  createTerm(
    "Glycogen",
    "Glikojen",
    TermCategory.COMPONENT,
    "Depo karbonhidrat"
  ),
  createTerm(
    "Starch",
    "Nişasta",
    TermCategory.COMPONENT,
    "Bitkisel depo karbonhidrat"
  ),
  createTerm(
    "Cellulose",
    "Selüloz",
    TermCategory.COMPONENT,
    "Yapısal polisakkarit"
  ),
  createTerm(
    "Chitin",
    "Kitin",
    TermCategory.COMPONENT,
    "Böcek ve mantar yapısal polisakkariti"
  ),
  createTerm(
    "Hyaluronic acid",
    "Hyaluronik Asit",
    TermCategory.COMPONENT,
    "Eklem sıvısı bileşeni"
  ),
  createTerm(
    "Chondroitin sulfate",
    "Kondroitin Sülfat",
    TermCategory.COMPONENT,
    "Kıkırdak bileşeni"
  ),
  createTerm(
    "Heparan sulfate",
    "Heparan Sülfat",
    TermCategory.COMPONENT,
    "Hücre yüzeyi proteoglikanı"
  ),
  createTerm(
    "Dermatan sulfate",
    "Dermatan Sülfat",
    TermCategory.COMPONENT,
    "Bağ dokusu proteoglikanı"
  ),
  createTerm(
    "Keratan sulfate",
    "Keratan Sülfat",
    TermCategory.COMPONENT,
    "Kornea ve kıkırdak bileşeni"
  ),
  createTerm(
    "Sialic acid",
    "Sialik Asit",
    TermCategory.COMPONENT,
    "Glikoprotein bileşeni"
  ),
  createTerm(
    "N-acetylglucosamine",
    "N-Asetilglukozamin",
    TermCategory.COMPONENT,
    "Glikozaminoglikan bileşeni"
  ),
  createTerm(
    "N-acetylgalactosamine",
    "N-Asetilgalaktozamin",
    TermCategory.COMPONENT,
    "Glikozaminoglikan bileşeni"
  ),
  createTerm(
    "Glucuronic acid",
    "Glukuronik Asit",
    TermCategory.COMPONENT,
    "Detoksifikasyon ve GAG bileşeni"
  ),
  createTerm(
    "Iduronic acid",
    "İduronik Asit",
    TermCategory.COMPONENT,
    "GAG bileşeni"
  ),
  createTerm(
    "Palmitate",
    "Palmitat",
    TermCategory.COMPONENT,
    "Doymuş yağ asidi"
  ),
  createTerm("Stearate", "Stearat", TermCategory.COMPONENT, "Doymuş yağ asidi"),
  createTerm(
    "Oleate",
    "Oleat",
    TermCategory.COMPONENT,
    "Tekli doymamış yağ asidi"
  ),
  createTerm(
    "Linoleate",
    "Linoleat",
    TermCategory.COMPONENT,
    "Esansiyel yağ asidi"
  ),
  createTerm(
    "Linolenate",
    "Linolenat",
    TermCategory.COMPONENT,
    "Esansiyel yağ asidi"
  ),
  createTerm(
    "Arachidonate",
    "Araşidonat",
    TermCategory.COMPONENT,
    "Eikosanoid öncüsü"
  ),
  createTerm(
    "Prostaglandin E2",
    "Prostaglandin E2",
    TermCategory.COMPONENT,
    "PGE2, inflamasyon mediatörü"
  ),
  createTerm(
    "Prostaglandin I2",
    "Prostaglandin I2",
    TermCategory.COMPONENT,
    "Prostasiklin, vazodilatör"
  ),
  createTerm(
    "Thromboxane A2",
    "Tromboksan A2",
    TermCategory.COMPONENT,
    "TXA2, trombosit aktivatörü"
  ),
  createTerm(
    "Leukotriene B4",
    "Lökotrien B4",
    TermCategory.COMPONENT,
    "LTB4, kemotaktik ajan"
  ),
  createTerm(
    "Leukotriene C4",
    "Lökotrien C4",
    TermCategory.COMPONENT,
    "LTC4, bronkokonstriktör"
  ),
  createTerm(
    "Leukotriene D4",
    "Lökotrien D4",
    TermCategory.COMPONENT,
    "LTD4, bronkokonstriktör"
  ),
  createTerm(
    "Leukotriene E4",
    "Lökotrien E4",
    TermCategory.COMPONENT,
    "LTE4, bronkokonstriktör"
  ),
  createTerm(
    "Lipoxin A4",
    "Lipoksin A4",
    TermCategory.COMPONENT,
    "Anti-inflamatuar lipid"
  ),
  createTerm(
    "Resolvin D1",
    "Resolvin D1",
    TermCategory.COMPONENT,
    "Pro-resolving lipid mediatör"
  ),
  createTerm(
    "Protectin D1",
    "Protektin D1",
    TermCategory.COMPONENT,
    "Nöroprotektif lipid"
  ),
  createTerm(
    "Maresin 1",
    "Maresin 1",
    TermCategory.COMPONENT,
    "Pro-resolving lipid mediatör"
  ),
  createTerm(
    "Cholesterol",
    "Kolesterol",
    TermCategory.COMPONENT,
    "Sterol, membran bileşeni"
  ),
  createTerm(
    "Bile acids",
    "Safra Asitleri",
    TermCategory.COMPONENT,
    "Kolesterol metabolitleri"
  ),
  createTerm(
    "Cholic acid",
    "Kolik Asit",
    TermCategory.COMPONENT,
    "Primer safra asidi"
  ),
  createTerm(
    "Chenodeoxycholic acid",
    "Kenodeoksikolik Asit",
    TermCategory.COMPONENT,
    "Primer safra asidi"
  ),
  createTerm(
    "Deoxycholic acid",
    "Deoksikolik Asit",
    TermCategory.COMPONENT,
    "Sekonder safra asidi"
  ),
  createTerm(
    "Lithocholic acid",
    "Litokolik Asit",
    TermCategory.COMPONENT,
    "Sekonder safra asidi"
  ),
  createTerm(
    "Cortisol",
    "Kortizol",
    TermCategory.COMPONENT,
    "Glukokortikoid hormon"
  ),
  createTerm(
    "Aldosterone",
    "Aldosteron",
    TermCategory.COMPONENT,
    "Mineralokortikoid hormon"
  ),
  createTerm(
    "Testosterone",
    "Testosteron",
    TermCategory.COMPONENT,
    "Androjen hormon"
  ),
  createTerm(
    "Estradiol",
    "Estradiol",
    TermCategory.COMPONENT,
    "Östrojen hormon"
  ),
  createTerm(
    "Progesterone",
    "Progesteron",
    TermCategory.COMPONENT,
    "Progestin hormon"
  ),
  createTerm("DHEA", "DHEA", TermCategory.COMPONENT, "Dehidroepiandrosteron"),
  createTerm(
    "Pregnenolone",
    "Pregnenolon",
    TermCategory.COMPONENT,
    "Steroid hormon öncüsü"
  ),
  createTerm(
    "Vitamin D3",
    "D3 Vitamini",
    TermCategory.COMPONENT,
    "Kolekalsiferol"
  ),
  createTerm(
    "25-hydroxyvitamin D",
    "25-Hidroksi D Vitamini",
    TermCategory.COMPONENT,
    "Kalsidiol"
  ),
  createTerm(
    "1,25-dihydroxyvitamin D",
    "1,25-Dihidroksi D Vitamini",
    TermCategory.COMPONENT,
    "Kalsitriol"
  ),
  createTerm(
    "Retinal",
    "Retinal",
    TermCategory.COMPONENT,
    "A vitamini aldehit formu"
  ),
  createTerm(
    "Retinoic acid",
    "Retinoik Asit",
    TermCategory.COMPONENT,
    "A vitamini asit formu"
  ),
  createTerm("Tocopherol", "Tokoferol", TermCategory.COMPONENT, "E vitamini"),
  createTerm(
    "Phylloquinone",
    "Fillokinon",
    TermCategory.COMPONENT,
    "K1 vitamini"
  ),
  createTerm("Menaquinone", "Menakinon", TermCategory.COMPONENT, "K2 vitamini"),
  createTerm(
    "Thiamine pyrophosphate",
    "Tiamin Pirofosfat",
    TermCategory.COMPONENT,
    "TPP, B1 koenzimi"
  ),
  createTerm(
    "Flavin mononucleotide",
    "Flavin Mononükleotid",
    TermCategory.COMPONENT,
    "FMN, B2 koenzimi"
  ),
  createTerm(
    "Pyridoxal phosphate",
    "Piridoksal Fosfat",
    TermCategory.COMPONENT,
    "PLP, B6 koenzimi"
  ),
  createTerm(
    "Tetrahydrofolate",
    "Tetrahidrofolat",
    TermCategory.COMPONENT,
    "THF, folat koenzimi"
  ),
  createTerm(
    "Methylcobalamin",
    "Metilkobalamin",
    TermCategory.COMPONENT,
    "B12 koenzimi"
  ),
  createTerm(
    "Adenosylcobalamin",
    "Adenozilkobalamin",
    TermCategory.COMPONENT,
    "B12 koenzimi"
  ),
  createTerm(
    "Biotin",
    "Biyotin",
    TermCategory.COMPONENT,
    "B7 vitamini, karboksilaz koenzimi"
  ),
  createTerm(
    "Lipoic acid",
    "Lipoik Asit",
    TermCategory.COMPONENT,
    "Antioksidan koenzim"
  ),
  createTerm("Ubiquinone", "Ubikinon", TermCategory.COMPONENT, "Koenzim Q10"),
  createTerm(
    "Cytochrome c",
    "Sitokrom c",
    TermCategory.COMPONENT,
    "Elektron taşıyıcı protein"
  ),
  createTerm(
    "Ferritin",
    "Ferritin",
    TermCategory.COMPONENT,
    "Demir depolama proteini"
  ),
  createTerm(
    "Transferrin",
    "Transferrin",
    TermCategory.COMPONENT,
    "Demir taşıma proteini"
  ),
  createTerm(
    "Hemoglobin",
    "Hemoglobin",
    TermCategory.COMPONENT,
    "Oksijen taşıma proteini"
  ),
  createTerm(
    "Myoglobin",
    "Miyoglobin",
    TermCategory.COMPONENT,
    "Kas oksijen depolama proteini"
  ),
  createTerm("Albumin", "Albümin", TermCategory.COMPONENT, "Plazma proteini"),
  createTerm(
    "Globulin",
    "Globülin",
    TermCategory.COMPONENT,
    "Plazma proteini grubu"
  ),
  createTerm(
    "Fibrinogen",
    "Fibrinojen",
    TermCategory.COMPONENT,
    "Pıhtılaşma proteini"
  ),
  createTerm(
    "Fibrin",
    "Fibrin",
    TermCategory.COMPONENT,
    "Pıhtı yapısal proteini"
  ),
  createTerm(
    "Thrombin",
    "Trombin",
    TermCategory.COMPONENT,
    "Pıhtılaşma enzimi"
  ),
  createTerm("Prothrombin", "Protrombin", TermCategory.COMPONENT, "Faktör II"),
  createTerm(
    "Plasmin",
    "Plazmin",
    TermCategory.COMPONENT,
    "Fibrinolitik enzim"
  ),
  createTerm(
    "Plasminogen",
    "Plazminojen",
    TermCategory.COMPONENT,
    "Plazmin öncüsü"
  ),
  createTerm("Collagen", "Kolajen", TermCategory.COMPONENT, "Yapısal protein"),
  createTerm(
    "Elastin",
    "Elastin",
    TermCategory.COMPONENT,
    "Elastik doku proteini"
  ),
  createTerm(
    "Keratin",
    "Keratin",
    TermCategory.COMPONENT,
    "Saç ve tırnak proteini"
  ),
  createTerm(
    "Actin",
    "Aktin",
    TermCategory.COMPONENT,
    "Kas kontraktil proteini"
  ),
  createTerm(
    "Myosin",
    "Miyozin",
    TermCategory.COMPONENT,
    "Kas kontraktil proteini"
  ),
  createTerm(
    "Tubulin",
    "Tübülin",
    TermCategory.COMPONENT,
    "Mikrotübül proteini"
  ),
  createTerm(
    "Spectrin",
    "Spektrin",
    TermCategory.COMPONENT,
    "Eritrosit iskelet proteini"
  ),
  createTerm(
    "Dystrophin",
    "Distrofin",
    TermCategory.COMPONENT,
    "Kas yapısal proteini"
  ),
  createTerm(
    "Laminin",
    "Laminin",
    TermCategory.COMPONENT,
    "Bazal membran proteini"
  ),
  createTerm(
    "Fibronectin",
    "Fibronektin",
    TermCategory.COMPONENT,
    "Hücre dışı matriks proteini"
  ),
  createTerm(
    "Integrin",
    "İntegrin",
    TermCategory.COMPONENT,
    "Hücre adezyon proteini"
  ),
  createTerm(
    "Cadherin",
    "Kaderin",
    TermCategory.COMPONENT,
    "Hücre-hücre adezyon proteini"
  ),
  createTerm(
    "Selectin",
    "Selektin",
    TermCategory.COMPONENT,
    "Lökosit adezyon proteini"
  ),
];

// Ana fonksiyon
async function main() {
  console.log("🚀 Final Terimler Firebase Yükleme Başlıyor...\n");

  console.log("📝 Terimler oluşturuluyor...");
  const giDrugs = generateGIDrugs();
  const respiratoryDrugs = generateRespiratoryDrugs();
  const infectiousDrugs = generateInfectiousDrugs();
  const hematologyDrugs = generateHematologyDrugs();
  const moreDiseases3 = generateMoreDiseases3();
  const moreComponents = generateMoreComponents();

  const allTerms = [
    ...giDrugs,
    ...respiratoryDrugs,
    ...infectiousDrugs,
    ...hematologyDrugs,
    ...moreDiseases3,
    ...moreComponents,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   GI İlaçları: ${giDrugs.length}`);
  console.log(`   Solunum İlaçları: ${respiratoryDrugs.length}`);
  console.log(`   Enfeksiyon İlaçları: ${infectiousDrugs.length}`);
  console.log(`   Hematoloji İlaçları: ${hematologyDrugs.length}`);
  console.log(`   Ek Hastalıklar: ${moreDiseases3.length}`);
  console.log(`   Ek Bileşenler: ${moreComponents.length}`);
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
