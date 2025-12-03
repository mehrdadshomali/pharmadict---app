import { TermCategory } from '../models/TermCategory.js';

export function createDrugTerms() {
  return [
    {
      latinName: 'Metforminum',
      turkishName: 'Metformin',
      category: TermCategory.DRUG,
      definition: 'Biguanid grubu oral antidiabetik ilaç. Tip 2 diyabet tedavisinde birinci basamak ilaç.',
      components: ['1,1-dimetilbiguanid hidroklorür'],
      relatedTerms: ['Antidiabetik', 'Biguanid', 'Diyabet'],
      etymology: 'Methyl + formin (formik asit türevi)',
      usage: 'Tip 2 diyabet tedavisi, polikistik over sendromu',
      sideEffects: ['Gastrointestinal yan etkiler', 'Laktik asidoz', 'B12 eksikliği'],
      dosage: '500-2000 mg günlük',
      contraindications: ['Böbrek yetmezliği', 'Karaciğer yetmezliği', 'Laktik asidoz'],
      interactions: ['Kontrast maddeler', 'Alkol', 'Furosemid'],
      synonyms: ['Glucophage', 'Fortamet', 'Riomet']
    },
    {
      latinName: 'Atorvastatinum',
      turkishName: 'Atorvastatin',
      category: TermCategory.DRUG,
      definition: 'Statin grubu HMG-CoA redüktaz inhibitörü. Kolesterol düşürücü ilaç.',
      components: ['(3R,5R)-7-[2-(4-fluorofenil)-3-fenil-4-(fenilkarbamoil)-5-propan-2-ilpiron-1-il]-3,5-dihidroksiheptanoik asit'],
      relatedTerms: ['Statin', 'Kolesterol', 'Kardiyovasküler'],
      etymology: 'A- (olumsuzluk) + torva (korkunç) + statin',
      usage: 'Hiperkolesterolemi, kardiyovasküler risk azaltma',
      sideEffects: ['Kas ağrısı', 'Karaciğer enzim yüksekliği', 'Gastrointestinal yan etkiler'],
      dosage: '10-80 mg günlük',
      contraindications: ['Aktif karaciğer hastalığı', 'Gebelik', 'Emzirme'],
      interactions: ['Warfarin', 'Digoksin', 'Eritromisin'],
      synonyms: ['Lipitor', 'Torvast', 'Atorlip']
    },
    {
      latinName: 'Omeprazolum',
      turkishName: 'Omeprazol',
      category: TermCategory.DRUG,
      definition: 'Proton pompa inhibitörü. Mide asidi salgısını azaltan ilaç.',
      components: ['5-metoksi-2-[[(4-metoksi-3,5-dimetil-2-piridinil)metil]sülfinil]-1H-benzimidazol'],
      relatedTerms: ['PPI', 'Antiasit', 'Gastrointestinal'],
      etymology: 'Ome- (omeprazole) + prazole (benzimidazol türevi)',
      usage: 'Peptik ülser, gastroözofageal reflü hastalığı',
      sideEffects: ['Baş ağrısı', 'İshal', 'B12 eksikliği'],
      dosage: '20-40 mg günlük',
      contraindications: ['Omeprazol alerjisi', 'Şiddetli karaciğer yetmezliği'],
      interactions: ['Warfarin', 'Diazepam', 'Fenitoin'],
      synonyms: ['Losec', 'Prilosec', 'Omez']
    },
    {
      latinName: 'Lisinoprilum',
      turkishName: 'Lisinopril',
      category: TermCategory.DRUG,
      definition: 'ACE inhibitörü. Anjiyotensin dönüştürücü enzim inhibitörü.',
      components: ['N2-[(S)-1-karboksi-3-fenilpropil]-L-lizin-L-prolin'],
      relatedTerms: ['ACE inhibitörü', 'Antihipertansif', 'Kardiyovasküler'],
      etymology: 'Lysine + proline + -pril (ACE inhibitörü soneki)',
      usage: 'Hipertansiyon, kalp yetmezliği, diyabetik nefropati',
      sideEffects: ['Öksürük', 'Hiperkalemi', 'Baş dönmesi'],
      dosage: '5-40 mg günlük',
      contraindications: ['Gebelik', 'Bilateral renal arter stenozu', 'Anjiyoödem öyküsü'],
      interactions: ['Potasyum', 'NSAID\'ler', 'Lityum'],
      synonyms: ['Prinivil', 'Zestril', 'Acepril']
    },
    {
      latinName: 'Amlodipinum',
      turkishName: 'Amlodipin',
      category: TermCategory.DRUG,
      definition: 'Kalsiyum kanal blokeri. Dihidropiridin grubu antihipertansif ilaç.',
      components: ['3-etil-5-metil-2-(2-aminoetoksimetil)-4-(2-klorofenil)-1,4-dihidro-6-metil-3,5-piridindikarboksilat'],
      relatedTerms: ['Kalsiyum kanal blokeri', 'Antihipertansif', 'Antianginal'],
      etymology: 'Amlo- (amlodipine) + dipine (dihidropiridin türevi)',
      usage: 'Hipertansiyon, anjina pektoris, koroner arter hastalığı',
      sideEffects: ['Periferik ödem', 'Baş ağrısı', 'Yüz kızarması'],
      dosage: '5-10 mg günlük',
      contraindications: ['Şiddetli aort stenozu', 'Kardiyojenik şok', 'Hipovolemi'],
      interactions: ['Grapefruit suyu', 'Simvastatin', 'Diltiazem'],
      synonyms: ['Norvasc', 'Amlodipin', 'Amlopin']
    },
    {
      latinName: 'Sertralinum',
      turkishName: 'Sertralin',
      category: TermCategory.DRUG,
      definition: 'SSRI grubu antidepresan ilaç. Serotonin geri alım inhibitörü.',
      components: ['(1S,4S)-4-(3,4-diklorofenil)-N-metil-1,2,3,4-tetrahidronaftalen-1-amin'],
      relatedTerms: ['SSRI', 'Antidepresan', 'Psikiyatri'],
      etymology: 'Sertraline (ilaç adı) + -ine (amin soneki)',
      usage: 'Depresyon, anksiyete, obsesif kompulsif bozukluk',
      sideEffects: ['Mide bulantısı', 'Uykusuzluk', 'Cinsel işlev bozukluğu'],
      dosage: '50-200 mg günlük',
      contraindications: ['MAO inhibitörü kullanımı', 'Gebelik'],
      interactions: ['Warfarin', 'Digoksin', 'Triptanlar'],
      synonyms: ['Zoloft', 'Lustral', 'Sertralin']
    },
    {
      latinName: 'Fluoxetinum',
      turkishName: 'Fluoksetin',
      category: TermCategory.DRUG,
      definition: 'SSRI grubu antidepresan. Serotonin geri alım inhibitörü.',
      components: ['N-metil-3-fenil-3-[4-(triflorometil)fenoksi]propan-1-amin'],
      relatedTerms: ['SSRI', 'Antidepresan', 'Psikiyatri'],
      usage: 'Depresyon, anksiyete, bulimia nervoza',
      sideEffects: ['Uykusuzluk', 'Baş ağrısı', 'Cinsel işlev bozukluğu'],
      dosage: '20-80 mg günlük',
      synonyms: ['Prozac', 'Fluoksetin', 'Fluxetin']
    },
    {
      latinName: 'Ibuprofenum',
      turkishName: 'İbuprofen',
      category: TermCategory.DRUG,
      definition: 'NSAID grubu nonsteroidal antiinflamatuar ilaç. Ağrı kesici ve ateş düşürücü.',
      components: ['2-(4-izobutilfenil)propanoik asit'],
      relatedTerms: ['NSAID', 'Analjezik', 'Antipiretik'],
      usage: 'Ağrı, ateş, inflamasyon',
      sideEffects: ['Mide rahatsızlığı', 'Baş dönmesi', 'Mide ülseri riski'],
      dosage: '200-800 mg günlük',
      synonyms: ['Brufen', 'Advil', 'Nurofen']
    },
    {
      latinName: 'Paracetamolum',
      turkishName: 'Parasetamol',
      category: TermCategory.DRUG,
      definition: 'Analjezik ve antipiretik ilaç. Ağrı kesici ve ateş düşürücü.',
      components: ['N-(4-hidroksifenil)asetamid'],
      relatedTerms: ['Analjezik', 'Antipiretik', 'Ağrı kesici'],
      usage: 'Ağrı, ateş',
      sideEffects: ['Karaciğer hasarı (aşırı dozda)'],
      dosage: '500-1000 mg, günde 3-4 kez',
      synonyms: ['Tylenol', 'Calpol', 'Parol']
    },
    {
      latinName: 'Amoxicillinum',
      turkishName: 'Amoksisilin',
      category: TermCategory.DRUG,
      definition: 'Beta-laktam antibiyotik. Penisilin grubu geniş spektrumlu antibiyotik.',
      components: ['(2S,5R,6R)-6-[(R)-2-amino-2-(4-hidroksifenil)asetamido]-3,3-dimetil-7-okso-4-tia-1-azabisisiklo[3.2.0]heptan-2-karboksilik asit'],
      relatedTerms: ['Antibiyotik', 'Beta-laktam', 'Penisilin'],
      usage: 'Bakteriyel enfeksiyonlar',
      sideEffects: ['İshal', 'Mide bulantısı', 'Alerjik reaksiyon'],
      dosage: '250-500 mg, günde 3 kez',
      synonyms: ['Amoxil', 'Amoksisilin', 'Moxypen']
    }
  ];
}

export function createPlantTerms() {
  return [
    {
      latinName: 'Aloe vera',
      turkishName: 'Aloe Vera',
      category: TermCategory.PLANT,
      definition: 'Yapraklarından jel çıkarılan, cilt bakımı ve yara iyileştirmede kullanılan sukulent bitki.',
      components: ['Aloin', 'Acemannan', 'Antrakinonlar'],
      relatedTerms: ['Sukulent', 'Tıbbi bitki', 'Cilt bakımı'],
      usage: 'Yanık tedavisi, cilt bakımı, sindirim sağlığı'
    },
    {
      latinName: 'Ginkgo biloba',
      turkishName: 'Ginkgo',
      category: TermCategory.PLANT,
      definition: 'Bellek ve bilişsel fonksiyonları destekleyen, en eski ağaç türlerinden biri.',
      components: ['Ginkgolides', 'Bilobalide', 'Flavonoidler'],
      relatedTerms: ['Bellek', 'Bilişsel fonksiyon', 'Antioksidan'],
      usage: 'Bellek desteği, dolaşım iyileştirme'
    },
    {
      latinName: 'Panax ginseng',
      turkishName: 'Ginseng',
      category: TermCategory.PLANT,
      definition: 'Enerji ve dayanıklılığı artıran adaptojen bitki.',
      components: ['Ginsenosides', 'Polisakkaritler', 'Peptidler'],
      relatedTerms: ['Adaptojen', 'Enerji', 'Dayanıklılık'],
      usage: 'Enerji desteği, stres yönetimi, bağışıklık'
    },
    {
      latinName: 'Echinacea purpurea',
      turkishName: 'Ekinezya',
      category: TermCategory.PLANT,
      definition: 'Bağışıklık sistemini güçlendiren, soğuk algınlığı tedavisinde kullanılan bitki.',
      components: ['Echinacoside', 'Cichoric acid', 'Alkamides'],
      relatedTerms: ['Bağışıklık', 'Soğuk algınlığı', 'İmmünomodülatör'],
      usage: 'Bağışıklık desteği, soğuk algınlığı önleme'
    },
    {
      latinName: 'Hypericum perforatum',
      turkishName: 'Sarı Kantaron',
      category: TermCategory.PLANT,
      definition: 'Hafif-orta depresyon tedavisinde kullanılan, sarı çiçekli bitki.',
      components: ['Hypericin', 'Hyperforin', 'Flavonoidler'],
      relatedTerms: ['Antidepresan', 'Ruh hali', 'Doğal tedavi'],
      usage: 'Hafif depresyon, anksiyete, yara iyileştirme'
    }
  ];
}

export function createVitaminTerms() {
  return [
    {
      latinName: 'Ascorbic Acid',
      turkishName: 'C Vitamini',
      category: TermCategory.VITAMIN,
      definition: 'Antioksidan özellikleri olan, bağışıklık sistemi için önemli suda çözünür vitamin.',
      components: ['L-askorbik asit'],
      relatedTerms: ['Antioksidan', 'Bağışıklık', 'Kollajen'],
      usage: 'Bağışıklık desteği, kollajen sentezi, demir emilimi'
    },
    {
      latinName: 'Cholecalciferol',
      turkishName: 'D3 Vitamini',
      category: TermCategory.VITAMIN,
      definition: 'Kalsiyum emilimi ve kemik sağlığı için gerekli yağda çözünür vitamin.',
      components: ['7-dehidrokolesterol türevi'],
      relatedTerms: ['Kalsiyum', 'Kemik sağlığı', 'Bağışıklık'],
      usage: 'Kemik sağlığı, kalsiyum metabolizması, bağışıklık'
    },
    {
      latinName: 'Thiamine',
      turkishName: 'B1 Vitamini',
      category: TermCategory.VITAMIN,
      definition: 'Enerji metabolizması için gerekli B kompleks vitamini.',
      components: ['Tiamin hidroklorür'],
      relatedTerms: ['Enerji', 'Metabolizma', 'Sinir sistemi'],
      usage: 'Enerji üretimi, sinir sistemi sağlığı'
    }
  ];
}

export function createMineralTerms() {
  return [
    {
      latinName: 'Calcium',
      turkishName: 'Kalsiyum',
      category: TermCategory.MINERAL,
      definition: 'Kemik ve diş sağlığı için gerekli temel mineral.',
      components: ['Ca2+'],
      relatedTerms: ['Kemik', 'Diş', 'Kas fonksiyonu'],
      usage: 'Kemik sağlığı, kas kasılması, sinir iletimi'
    },
    {
      latinName: 'Iron',
      turkishName: 'Demir',
      category: TermCategory.MINERAL,
      definition: 'Kırmızı kan hücrelerinde oksijen taşıyan esansiyel mineral.',
      components: ['Fe2+', 'Fe3+'],
      relatedTerms: ['Hemoglobin', 'Anemi', 'Oksijen taşınımı'],
      usage: 'Hemoglobin üretimi, oksijen taşınımı'
    },
    {
      latinName: 'Zinc',
      turkishName: 'Çinko',
      category: TermCategory.MINERAL,
      definition: 'Bağışıklık sistemi ve yara iyileşmesi için önemli eser element.',
      components: ['Zn2+'],
      relatedTerms: ['Bağışıklık', 'Yara iyileşmesi', 'Enzim fonksiyonu'],
      usage: 'Bağışıklık desteği, yara iyileşmesi, büyüme'
    }
  ];
}

export function createInsectTerms() {
  return [
    {
      latinName: 'Apis mellifera',
      turkishName: 'Bal Arısı',
      category: TermCategory.INSECT,
      definition: 'Bal üreten, tozlaşmada önemli rol oynayan sosyal böcek.',
      components: [],
      relatedTerms: ['Bal', 'Tozlaşma', 'Arıcılık']
    },
    {
      latinName: 'Bombyx mori',
      turkishName: 'İpek Böceği',
      category: TermCategory.INSECT,
      definition: 'İpek üretimi için yetiştirilen, dut yaprağıyla beslenen böcek.',
      components: [],
      relatedTerms: ['İpek', 'Dut', 'Tekstil']
    }
  ];
}

export function createComponentTerms() {
  return [
    {
      latinName: 'Lactose',
      turkishName: 'Laktoz',
      category: TermCategory.COMPONENT,
      definition: 'Süt şekeri. İlaçlarda dolgu maddesi olarak kullanılan disakkarit.',
      components: ['Glukoz', 'Galaktoz'],
      relatedTerms: ['Dolgu maddesi', 'Disakkarit', 'Süt şekeri']
    },
    {
      latinName: 'Magnesium stearate',
      turkishName: 'Magnezyum Stearat',
      category: TermCategory.COMPONENT,
      definition: 'İlaç tabletlerinde kaydırıcı madde olarak kullanılan bileşik.',
      components: ['Magnezyum', 'Stearik asit'],
      relatedTerms: ['Kaydırıcı madde', 'Tablet', 'İlaç formülasyonu']
    }
  ];
}

export function createDiseaseTerms() {
  return [
    {
      latinName: 'Diabetes Mellitus',
      turkishName: 'Diyabet',
      category: TermCategory.DISEASE,
      definition: 'Kan şekeri seviyelerinin yüksek olduğu kronik metabolik hastalık.',
      components: [],
      relatedTerms: ['Hiperglisemi', 'İnsülin', 'Metabolizma']
    },
    {
      latinName: 'Hypertension',
      turkishName: 'Hipertansiyon',
      category: TermCategory.DISEASE,
      definition: 'Yüksek kan basıncı. Kardiyovasküler risk faktörü.',
      components: [],
      relatedTerms: ['Kan basıncı', 'Kardiyovasküler', 'Antihipertansif']
    }
  ];
}

export function createAnatomyTerms() {
  return [
    {
      latinName: 'Cor',
      turkishName: 'Kalp',
      category: TermCategory.ANATOMY,
      definition: 'Kanı vücuda pompalayan kas organı.',
      components: [],
      relatedTerms: ['Kardiyovasküler', 'Atriyum', 'Ventrikül']
    },
    {
      latinName: 'Pulmo',
      turkishName: 'Akciğer',
      category: TermCategory.ANATOMY,
      definition: 'Solunum organı. Oksijen ve karbondioksit değişimi yapar.',
      components: [],
      relatedTerms: ['Solunum', 'Bronş', 'Alveol']
    },
    {
      latinName: 'Hepar',
      turkishName: 'Karaciğer',
      category: TermCategory.ANATOMY,
      definition: 'Metabolizma ve detoksifikasyon organı.',
      components: [],
      relatedTerms: ['Metabolizma', 'Detoksifikasyon', 'Safra']
    }
  ];
}

