#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Anatomi Kategorisi İçin 50 Veri Ekleme Scripti
Anatomi kitabından gerçekçi ve doğru terimler
"""

import json

def load_data():
    with open('src/data/pharmacyData.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def save_data(data):
    with open('src/data/pharmacyData.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_next_id(data):
    ids = [int(item['id']) for item in data if item.get('id', '').isdigit()]
    return max(ids) + 1 if ids else 1

def get_existing_names(data, category):
    return {item['latinName'].lower() for item in data if item.get('category') == category}

# Anatomi kitabından 50 gerçekçi ve doğru terim
anatomy_terms = [
    {
        "latinName": "Cranium",
        "turkishName": "Kafatası",
        "definition": "Beyni koruyan kemik yapı. Kafatası kemiklerinden oluşur ve beyni dış etkilerden korur.",
        "components": ["Frontal kemik", "Parietal kemik", "Temporal kemik", "Oksipital kemik"],
        "usage": "Beyin koruması, kraniyal sinirlerin geçişi, yüz iskeleti desteği",
        "sideEffects": ["Kraniyal travma", "Kafatası kırıkları"],
        "interactions": ["Beyin", "Kraniyal sinirler", "Yüz iskeleti"],
        "synonyms": ["Skull", "Crâne", "Cráneo"]
    },
    {
        "latinName": "Vertebra",
        "turkishName": "Omur",
        "definition": "Omurganın temel yapı taşı. Omurga kanalını oluşturur ve omuriliği korur.",
        "components": ["Omur gövdesi", "Omur arkı", "Spinal kanal", "Faset eklemler"],
        "usage": "Omurga desteği, omurilik koruması, hareket sağlama",
        "sideEffects": ["Omur kırıkları", "Disk hernisi", "Spinal stenoz"],
        "interactions": ["Omurilik", "İntervertebral diskler", "Omurga kasları"],
        "synonyms": ["Vertebrae", "Vertèbre", "Vértebra"]
    },
    {
        "latinName": "Sternum",
        "turkishName": "Göğüs Kemiği",
        "definition": "Göğüs kafesinin ön orta kısmında bulunan düz kemik. Kaburgaları birleştirir.",
        "components": ["Manubrium", "Gövde", "Kılıç çıkıntısı"],
        "usage": "Göğüs kafesi desteği, kalp ve akciğer koruması",
        "sideEffects": ["Sternum kırıkları", "Kostokondrit"],
        "interactions": ["Kaburgalar", "Klavikula", "Diyafram"],
        "synonyms": ["Breastbone", "Sternum", "Esternón"]
    },
    {
        "latinName": "Clavicula",
        "turkishName": "Köprücük Kemiği",
        "definition": "Omuz kemeri ile göğüs kafesini birleştiren uzun kemik. Omuz hareketlerinde önemli rol oynar.",
        "components": ["Medial uç", "Lateral uç", "Gövde"],
        "usage": "Omuz desteği, kol hareketleri, üst ekstremite bağlantısı",
        "sideEffects": ["Klavikula kırıkları", "Akromiyoklaviküler eklem ayrılması"],
        "interactions": ["Skapula", "Sternum", "Omuz eklemi"],
        "synonyms": ["Clavicle", "Clavicule", "Clavícula"]
    },
    {
        "latinName": "Scapula",
        "turkishName": "Kürek Kemiği",
        "definition": "Omuz bölgesinde bulunan üçgen şeklinde düz kemik. Kol hareketlerinde önemli rol oynar.",
        "components": ["Glenoid çukur", "Akromion", "Korakoid çıkıntı", "Omur kenarı"],
        "usage": "Omuz eklemi desteği, kol hareketleri, kas bağlantıları",
        "sideEffects": ["Skapula kırıkları", "Omuz çıkığı", "Frozen shoulder"],
        "interactions": ["Humerus", "Klavikula", "Omuz kasları"],
        "synonyms": ["Shoulder blade", "Omoplate", "Omóplato"]
    },
    {
        "latinName": "Humerus",
        "turkishName": "Kol Kemiği",
        "definition": "Üst kolun tek uzun kemiği. Omuz ve dirsek eklemlerini birleştirir.",
        "components": ["Baş", "Boyun", "Gövde", "Medial ve lateral epikondiller"],
        "usage": "Kol desteği, omuz ve dirsek hareketleri",
        "sideEffects": ["Humerus kırıkları", "Dirsek çıkığı"],
        "interactions": ["Skapula", "Ulna", "Radius", "Kol kasları"],
        "synonyms": ["Upper arm bone", "Humérus", "Húmero"]
    },
    {
        "latinName": "Radius",
        "turkishName": "Döner Kemik",
        "definition": "Ön kolun iki kemiğinden biri. Başparmak tarafında bulunur ve ön kol rotasyonunda önemli rol oynar.",
        "components": ["Baş", "Boyun", "Gövde", "Distal uç"],
        "usage": "Ön kol desteği, el bileği hareketleri, ön kol rotasyonu",
        "sideEffects": ["Radius kırıkları", "Karpal tünel sendromu"],
        "interactions": ["Ulna", "Humerus", "Karpal kemikler"],
        "synonyms": ["Radius", "Radius", "Radio"]
    },
    {
        "latinName": "Ulna",
        "turkishName": "Dirsek Kemiği",
        "definition": "Ön kolun iki kemiğinden biri. Serçe parmak tarafında bulunur ve dirsek ekleminin ana bileşenidir.",
        "components": ["Olekranon", "Koronoid çıkıntı", "Gövde", "Distal uç"],
        "usage": "Ön kol desteği, dirsek eklemi, el bileği hareketleri",
        "sideEffects": ["Ulna kırıkları", "Dirsek çıkığı"],
        "interactions": ["Radius", "Humerus", "Karpal kemikler"],
        "synonyms": ["Ulna", "Cubitus", "Cúbito"]
    },
    {
        "latinName": "Femur",
        "turkishName": "Uyluk Kemiği",
        "definition": "Vücudun en uzun ve en güçlü kemiği. Kalça ve diz eklemlerini birleştirir.",
        "components": ["Baş", "Boyun", "Gövde", "Medial ve lateral kondiller"],
        "usage": "Alt ekstremite desteği, yürüme, koşma, kalça ve diz hareketleri",
        "sideEffects": ["Femur kırıkları", "Kalça kırığı", "Diz eklemi hasarı"],
        "interactions": ["Pelvis", "Tibia", "Fibula", "Uyluk kasları"],
        "synonyms": ["Thigh bone", "Fémur", "Fémur"]
    },
    {
        "latinName": "Tibia",
        "turkishName": "Kaval Kemiği",
        "definition": "Bacağın iki kemiğinden biri. Diz ve ayak bileği eklemlerini birleştirir ve vücut ağırlığının çoğunu taşır.",
        "components": ["Medial ve lateral kondiller", "Gövde", "Medial malleol"],
        "usage": "Alt ekstremite desteği, yürüme, vücut ağırlığı taşıma",
        "sideEffects": ["Tibia kırıkları", "Diz eklemi hasarı", "Ayak bileği kırıkları"],
        "interactions": ["Femur", "Fibula", "Talus", "Bacak kasları"],
        "synonyms": ["Shinbone", "Tibia", "Tibia"]
    },
    {
        "latinName": "Fibula",
        "turkishName": "Kamış Kemiği",
        "definition": "Bacağın iki kemiğinden biri. Tibia'nın yanında bulunur ve ayak bileği stabilitesine katkıda bulunur.",
        "components": ["Baş", "Gövde", "Lateral malleol"],
        "usage": "Ayak bileği desteği, kas bağlantıları, alt ekstremite stabilitesi",
        "sideEffects": ["Fibula kırıkları", "Ayak bileği instabilitesi"],
        "interactions": ["Tibia", "Talus", "Bacak kasları"],
        "synonyms": ["Calf bone", "Péroné", "Peroné"]
    },
    {
        "latinName": "Patella",
        "turkishName": "Diz Kapağı",
        "definition": "Diz ekleminin önünde bulunan üçgen şeklinde sesamoid kemik. Kuadriseps kasının tendonuna gömülüdür.",
        "components": ["Ön yüz", "Arka yüz", "Apeks", "Baz"],
        "usage": "Diz eklemi koruması, kuadriseps kası kaldıracı, diz hareketleri",
        "sideEffects": ["Patella kırıkları", "Patellofemoral ağrı sendromu", "Diz çıkığı"],
        "interactions": ["Femur", "Tibia", "Kuadriseps kası"],
        "synonyms": ["Kneecap", "Rotule", "Rótula"]
    },
    {
        "latinName": "Pelvis",
        "turkishName": "Pelvis",
        "definition": "Kalça kemiklerinden oluşan kemik yapı. Alt ekstremiteyi gövdeye bağlar ve iç organları korur.",
        "components": ["İlium", "İşkium", "Pubis", "Sakrum"],
        "usage": "Alt ekstremite bağlantısı, iç organ koruması, doğum kanalı",
        "sideEffects": ["Pelvis kırıkları", "Sakroiliak eklem disfonksiyonu"],
        "interactions": ["Femur", "Sakrum", "Omurga", "İç organlar"],
        "synonyms": ["Hip bone", "Bassin", "Pelvis"]
    },
    {
        "latinName": "Sternocleidomastoideus",
        "turkishName": "Göğüs-Köprücük-Meme Ucu Kası",
        "definition": "Boynun yan tarafında bulunan uzun kas. Başın rotasyonu ve fleksiyonunda rol oynar.",
        "components": ["Sternal baş", "Klaviküler baş", "Mastoid çıkıntı"],
        "usage": "Baş rotasyonu, baş fleksiyonu, boyun stabilitesi",
        "sideEffects": ["Kas spazmı", "Tortikollis", "Boyun ağrısı"],
        "interactions": ["Sternum", "Klavikula", "Mastoid kemik"],
        "synonyms": ["SCM muscle", "Muscle sterno-cléido-mastoïdien", "Músculo esternocleidomastoideo"]
    },
    {
        "latinName": "Trapezius",
        "turkishName": "Trapez Kası",
        "definition": "Sırtın üst kısmında bulunan büyük yassı kas. Omuz hareketleri ve postürde önemli rol oynar.",
        "components": ["Üst lifler", "Orta lifler", "Alt lifler"],
        "usage": "Omuz elevasyonu, skapula retraksiyonu, postür desteği",
        "sideEffects": ["Kas gerginliği", "Omuz ağrısı", "Boyun ağrısı"],
        "interactions": ["Skapula", "Klavikula", "Omurga"],
        "synonyms": ["Trapezius muscle", "Trapèze", "Trapecio"]
    },
    {
        "latinName": "Deltoideus",
        "turkishName": "Delta Kası",
        "definition": "Omuzun dış kısmında bulunan üçgen şeklinde kas. Kolun abdüksiyonunda ana kasdır.",
        "components": ["Ön lifler", "Orta lifler", "Arka lifler"],
        "usage": "Kol abdüksiyonu, omuz fleksiyonu ve ekstansiyonu",
        "sideEffects": ["Omuz ağrısı", "Rotator manşet yırtığı"],
        "interactions": ["Humerus", "Skapula", "Omuz eklemi"],
        "synonyms": ["Deltoid muscle", "Deltoïde", "Deltoides"]
    },
    {
        "latinName": "Pectoralis Major",
        "turkishName": "Büyük Göğüs Kası",
        "definition": "Göğüs bölgesinde bulunan büyük kas. Kolun adduksiyonu ve iç rotasyonunda rol oynar.",
        "components": ["Klaviküler baş", "Sternokostal baş", "Abdominal baş"],
        "usage": "Kol adduksiyonu, kol iç rotasyonu, göğüs hareketleri",
        "sideEffects": ["Göğüs ağrısı", "Omuz ağrısı"],
        "interactions": ["Humerus", "Sternum", "Klavikula"],
        "synonyms": ["Pectoralis major", "Grand pectoral", "Pectoral mayor"]
    },
    {
        "latinName": "Biceps Brachii",
        "turkishName": "İki Başlı Kol Kası",
        "definition": "Kolun ön tarafında bulunan iki başlı kas. Dirsek fleksiyonu ve ön kol supinasyonunda rol oynar.",
        "components": ["Uzun baş", "Kısa baş"],
        "usage": "Dirsek fleksiyonu, ön kol supinasyonu, omuz fleksiyonu",
        "sideEffects": ["Biceps tendiniti", "Biceps yırtığı", "Dirsek ağrısı"],
        "interactions": ["Humerus", "Radius", "Skapula"],
        "synonyms": ["Biceps", "Biceps brachial", "Bíceps braquial"]
    },
    {
        "latinName": "Triceps Brachii",
        "turkishName": "Üç Başlı Kol Kası",
        "definition": "Kolun arka tarafında bulunan üç başlı kas. Dirsek ekstansiyonunda ana kasdır.",
        "components": ["Uzun baş", "Lateral baş", "Medial baş"],
        "usage": "Dirsek ekstansiyonu, omuz ekstansiyonu",
        "sideEffects": ["Triceps tendiniti", "Dirsek ağrısı"],
        "interactions": ["Humerus", "Ulna", "Skapula"],
        "synonyms": ["Triceps", "Triceps brachial", "Tríceps braquial"]
    },
    {
        "latinName": "Quadriceps Femoris",
        "turkishName": "Dört Başlı Uyluk Kası",
        "definition": "Uyluğun ön kısmında bulunan dört başlı kas grubu. Diz ekstansiyonunda ana kasdır.",
        "components": ["Rectus femoris", "Vastus lateralis", "Vastus medialis", "Vastus intermedius"],
        "usage": "Diz ekstansiyonu, kalça fleksiyonu, yürüme ve koşma",
        "sideEffects": ["Kuadriseps tendiniti", "Diz ağrısı", "Kas yırtığı"],
        "interactions": ["Femur", "Patella", "Tibia"],
        "synonyms": ["Quadriceps", "Quadriceps fémoral", "Cuádriceps femoral"]
    },
    {
        "latinName": "Hamstrings",
        "turkishName": "Hamstring Kasları",
        "definition": "Uyluğun arka kısmında bulunan üç kas grubu. Diz fleksiyonu ve kalça ekstansiyonunda rol oynar.",
        "components": ["Biceps femoris", "Semitendinosus", "Semimembranosus"],
        "usage": "Diz fleksiyonu, kalça ekstansiyonu, yürüme",
        "sideEffects": ["Hamstring yırtığı", "Diz ağrısı", "Kalça ağrısı"],
        "interactions": ["Femur", "Tibia", "Fibula", "Pelvis"],
        "synonyms": ["Hamstring muscles", "Ischio-jambiers", "Isquiotibiales"]
    },
    {
        "latinName": "Gastrocnemius",
        "turkishName": "İkiz Başlı Baldır Kası",
        "definition": "Baldırın arka kısmında bulunan iki başlı kas. Ayak plantar fleksiyonunda ana kasdır.",
        "components": ["Medial baş", "Lateral baş"],
        "usage": "Ayak plantar fleksiyonu, diz fleksiyonu, yürüme ve koşma",
        "sideEffects": ["Aşil tendiniti", "Baldır ağrısı", "Kas yırtığı"],
        "interactions": ["Femur", "Kalkaneus", "Aşil tendonu"],
        "synonyms": ["Gastrocnemius", "Jumeau", "Gastrocnemio"]
    },
    {
        "latinName": "Soleus",
        "turkishName": "Soleus Kası",
        "definition": "Baldırın derin kısmında bulunan kas. Ayak plantar fleksiyonunda önemli rol oynar.",
        "components": ["Soleus kası"],
        "usage": "Ayak plantar fleksiyonu, postür desteği, yürüme",
        "sideEffects": ["Baldır ağrısı", "Kas spazmı"],
        "interactions": ["Tibia", "Fibula", "Kalkaneus", "Aşil tendonu"],
        "synonyms": ["Soleus", "Soléaire", "Sóleo"]
    },
    {
        "latinName": "Diaphragma",
        "turkishName": "Diyafram",
        "definition": "Göğüs ve karın boşluğunu ayıran kubbe şeklinde kas. Solunumun ana kasıdır.",
        "components": ["Merkezi tendon", "Kas lifleri"],
        "usage": "Solunum, karın içi basınç düzenlemesi, öksürme",
        "sideEffects": ["Hıçkırık", "Diyafram hernisi", "Solunum güçlüğü"],
        "interactions": ["Akciğerler", "Kalp", "Karın organları"],
        "synonyms": ["Diaphragm", "Diaphragme", "Diafragma"]
    },
    {
        "latinName": "Intercostales",
        "turkishName": "Kaburga Arası Kaslar",
        "definition": "Kaburgalar arasında bulunan kas grubu. Solunum sırasında göğüs kafesinin genişlemesini sağlar.",
        "components": ["Dış interkostal kaslar", "İç interkostal kaslar"],
        "usage": "Solunum, göğüs kafesi hareketleri",
        "sideEffects": ["Kaburga ağrısı", "Solunum güçlüğü"],
        "interactions": ["Kaburgalar", "Diyafram", "Akciğerler"],
        "synonyms": ["Intercostal muscles", "Intercostaux", "Intercostales"]
    },
    {
        "latinName": "Rectus Abdominis",
        "turkishName": "Düz Karın Kası",
        "definition": "Karın bölgesinin ön tarafında bulunan uzun kas. Gövde fleksiyonunda rol oynar.",
        "components": ["Üst bölüm", "Alt bölüm"],
        "usage": "Gövde fleksiyonu, karın içi basınç düzenlemesi, postür",
        "sideEffects": ["Karın ağrısı", "Kas yırtığı"],
        "interactions": ["Pelvis", "Göğüs kafesi", "Karın organları"],
        "synonyms": ["Abdominal muscle", "Grand droit", "Recto abdominal"]
    },
    {
        "latinName": "Obliquus Externus Abdominis",
        "turkishName": "Dış Eğik Karın Kası",
        "definition": "Karın bölgesinin yan tarafında bulunan kas. Gövde rotasyonu ve lateral fleksiyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Gövde rotasyonu, lateral fleksiyon, karın içi basınç",
        "sideEffects": ["Karın ağrısı", "Kas yırtığı"],
        "interactions": ["Pelvis", "Göğüs kafesi", "İç eğik karın kası"],
        "synonyms": ["External oblique", "Grand oblique", "Oblicuo externo"]
    },
    {
        "latinName": "Erector Spinae",
        "turkishName": "Dikleştirici Omurga Kasları",
        "definition": "Omurganın her iki yanında bulunan kas grubu. Omurga ekstansiyonu ve postürde önemli rol oynar.",
        "components": ["İliokostal", "Uzun kas", "Spinal"],
        "usage": "Omurga ekstansiyonu, postür desteği, gövde stabilitesi",
        "sideEffects": ["Sırt ağrısı", "Kas spazmı", "Postür bozukluğu"],
        "interactions": ["Omurga", "Pelvis", "Kaburgalar"],
        "synonyms": ["Erector spinae", "Érecteurs du rachis", "Erectores espinales"]
    },
    {
        "latinName": "Latissimus Dorsi",
        "turkishName": "Geniş Sırt Kası",
        "definition": "Sırtın alt kısmında bulunan geniş kas. Kolun adduksiyonu ve iç rotasyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Kol adduksiyonu, kol iç rotasyonu, omuz ekstansiyonu",
        "sideEffects": ["Sırt ağrısı", "Omuz ağrısı"],
        "interactions": ["Humerus", "Pelvis", "Omurga"],
        "synonyms": ["Latissimus dorsi", "Grand dorsal", "Dorsal ancho"]
    },
    {
        "latinName": "Gluteus Maximus",
        "turkishName": "Büyük Kalça Kası",
        "definition": "Kalça bölgesinde bulunan vücudun en büyük kası. Kalça ekstansiyonu ve dış rotasyonunda ana kasdır.",
        "components": ["Üst lifler", "Alt lifler"],
        "usage": "Kalça ekstansiyonu, kalça dış rotasyonu, yürüme ve koşma",
        "sideEffects": ["Kalça ağrısı", "Piriformis sendromu"],
        "interactions": ["Femur", "Pelvis", "Sakrum"],
        "synonyms": ["Gluteus maximus", "Grand fessier", "Glúteo mayor"]
    },
    {
        "latinName": "Gluteus Medius",
        "turkishName": "Orta Kalça Kası",
        "definition": "Kalça bölgesinde bulunan orta boy kas. Kalça abdüksiyonu ve iç rotasyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Kalça abdüksiyonu, kalça iç rotasyonu, pelvis stabilitesi",
        "sideEffects": ["Kalça ağrısı", "Trendelenburg yürüyüşü"],
        "interactions": ["Femur", "Pelvis", "İlium"],
        "synonyms": ["Gluteus medius", "Moyen fessier", "Glúteo medio"]
    },
    {
        "latinName": "Psoas Major",
        "turkishName": "Büyük Bel Kası",
        "definition": "Bel bölgesinde bulunan derin kas. Kalça fleksiyonu ve omurga stabilitesinde rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Kalça fleksiyonu, omurga fleksiyonu, postür",
        "sideEffects": ["Bel ağrısı", "Kalça ağrısı", "Psoas sendromu"],
        "interactions": ["Femur", "Omurga", "Pelvis"],
        "synonyms": ["Psoas major", "Grand psoas", "Psoas mayor"]
    },
    {
        "latinName": "Iliacus",
        "turkishName": "İliak Kas",
        "definition": "Pelvis içinde bulunan kas. Psoas major ile birlikte iliopsoas kasını oluşturur.",
        "components": ["Kas lifleri"],
        "usage": "Kalça fleksiyonu, omurga fleksiyonu",
        "sideEffects": ["Kalça ağrısı", "Bel ağrısı"],
        "interactions": ["Femur", "İlium", "Psoas major"],
        "synonyms": ["Iliacus", "Iliaque", "Ilíaco"]
    },
    {
        "latinName": "Sartorius",
        "turkishName": "Terzi Kası",
        "definition": "Vücudun en uzun kası. Uyluğun ön iç kısmında bulunur ve kalça fleksiyonu, abdüksiyonu ve dış rotasyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Kalça fleksiyonu, abdüksiyonu ve dış rotasyonu, diz fleksiyonu",
        "sideEffects": ["Uyluk ağrısı", "Diz ağrısı"],
        "interactions": ["Femur", "Tibia", "Pelvis"],
        "synonyms": ["Sartorius", "Couturier", "Sartorio"]
    },
    {
        "latinName": "Gracilis",
        "turkishName": "İnce Kas",
        "definition": "Uyluğun iç tarafında bulunan uzun ince kas. Kalça adduksiyonu ve diz fleksiyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Kalça adduksiyonu, diz fleksiyonu",
        "sideEffects": ["Uyluk ağrısı", "Kas yırtığı"],
        "interactions": ["Femur", "Tibia", "Pelvis"],
        "synonyms": ["Gracilis", "Droit interne", "Recto interno"]
    },
    {
        "latinName": "Adductor Longus",
        "turkishName": "Uzun Yaklaştırıcı Kas",
        "definition": "Uyluğun iç tarafında bulunan kas. Kalça adduksiyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Kalça adduksiyonu, pelvis stabilitesi",
        "sideEffects": ["Uyluk ağrısı", "Kas yırtığı"],
        "interactions": ["Femur", "Pelvis"],
        "synonyms": ["Adductor longus", "Long adducteur", "Aductor largo"]
    },
    {
        "latinName": "Tibialis Anterior",
        "turkishName": "Ön Kaval Kası",
        "definition": "Bacağın ön tarafında bulunan kas. Ayak dorsifleksiyonu ve inversiyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Ayak dorsifleksiyonu, inversiyon, yürüme",
        "sideEffects": ["Bacak ağrısı", "Şin splint"],
        "interactions": ["Tibia", "Talus", "Naviküler kemik"],
        "synonyms": ["Tibialis anterior", "Jambier antérieur", "Tibial anterior"]
    },
    {
        "latinName": "Peroneus Longus",
        "turkishName": "Uzun Peroneal Kas",
        "definition": "Bacağın dış tarafında bulunan kas. Ayak plantar fleksiyonu ve eversiyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Ayak plantar fleksiyonu, eversiyon, ayak bileği stabilitesi",
        "sideEffects": ["Bacak ağrısı", "Peroneal tendiniti"],
        "interactions": ["Fibula", "Kalkaneus", "Birinci metatarsal"],
        "synonyms": ["Peroneus longus", "Long fibulaire", "Peroneo largo"]
    },
    {
        "latinName": "Flexor Digitorum Longus",
        "turkishName": "Uzun Parmak Bükücü Kas",
        "definition": "Bacağın derin kısmında bulunan kas. Ayak parmaklarının fleksiyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Ayak parmak fleksiyonu, ayak stabilitesi",
        "sideEffects": ["Bacak ağrısı", "Parmak deformitesi"],
        "interactions": ["Tibia", "Ayak parmakları"],
        "synonyms": ["Flexor digitorum longus", "Fléchisseur des orteils", "Flexor largo de los dedos"]
    },
    {
        "latinName": "Extensor Digitorum Longus",
        "turkishName": "Uzun Parmak Açıcı Kas",
        "definition": "Bacağın ön tarafında bulunan kas. Ayak parmaklarının ekstansiyonunda rol oynar.",
        "components": ["Kas lifleri"],
        "usage": "Ayak parmak ekstansiyonu, ayak dorsifleksiyonu",
        "sideEffects": ["Bacak ağrısı", "Parmak deformitesi"],
        "interactions": ["Tibia", "Fibula", "Ayak parmakları"],
        "synonyms": ["Extensor digitorum longus", "Extenseur des orteils", "Extensor largo de los dedos"]
    },
    {
        "latinName": "Achilles Tendon",
        "turkishName": "Aşil Tendonu",
        "definition": "Vücudun en güçlü ve en kalın tendonu. Gastrocnemius ve soleus kaslarını kalkaneusa bağlar.",
        "components": ["Tendon lifleri"],
        "usage": "Ayak plantar fleksiyonu, yürüme ve koşma",
        "sideEffects": ["Aşil tendiniti", "Aşil tendon yırtığı", "Baldır ağrısı"],
        "interactions": ["Gastrocnemius", "Soleus", "Kalkaneus"],
        "synonyms": ["Achilles tendon", "Tendon d'Achille", "Tendón de Aquiles"]
    },
    {
        "latinName": "Medulla Oblongata",
        "turkishName": "Uzun İlik",
        "definition": "Beyin sapının en alt kısmı. Solunum, kalp atışı ve kan basıncı gibi hayati fonksiyonları kontrol eder.",
        "components": ["Nöronlar", "Beyaz madde", "Gri madde"],
        "usage": "Solunum kontrolü, kalp atışı kontrolü, kan basıncı düzenlemesi",
        "sideEffects": ["Solunum durması", "Kalp durması", "Koma"],
        "interactions": ["Pons", "Omurilik", "Kraniyal sinirler"],
        "synonyms": ["Medulla oblongata", "Bulbe rachidien", "Bulbo raquídeo"]
    },
    {
        "latinName": "Pons",
        "turkishName": "Köprü",
        "definition": "Beyin sapının orta kısmı. Uyku, solunum ve yutma gibi fonksiyonları kontrol eder.",
        "components": ["Nöronlar", "Beyaz madde", "Gri madde"],
        "usage": "Uyku kontrolü, solunum kontrolü, yutma kontrolü",
        "sideEffects": ["Uyku bozuklukları", "Solunum güçlüğü"],
        "interactions": ["Medulla oblongata", "Orta beyin", "Kraniyal sinirler"],
        "synonyms": ["Pons", "Pont", "Puente"]
    },
    {
        "latinName": "Cerebellum",
        "turkishName": "Beyincik",
        "definition": "Beynin arka alt kısmında bulunan yapı. Denge, koordinasyon ve motor öğrenmede önemli rol oynar.",
        "components": ["Serebellar hemisferler", "Vermis", "Serebellar pedinküller"],
        "usage": "Denge, koordinasyon, motor öğrenme, postür kontrolü",
        "sideEffects": ["Ataksi", "Denge bozukluğu", "Koordinasyon kaybı"],
        "interactions": ["Beyin sapı", "Beyin", "Omurilik"],
        "synonyms": ["Cerebellum", "Cervelet", "Cerebelo"]
    },
    {
        "latinName": "Thalamus",
        "turkishName": "Talamus",
        "definition": "Beynin merkezinde bulunan yapı. Duyusal bilgilerin beyin korteksine iletilmesinde ana rol oynar.",
        "components": ["Talamik nükleuslar", "Gri madde"],
        "usage": "Duyusal bilgi iletimi, bilinç, uyku-uyanıklık döngüsü",
        "sideEffects": ["Duyusal kayıp", "Bilinç bozukluğu"],
        "interactions": ["Beyin korteksi", "Hipotalamus", "Beyin sapı"],
        "synonyms": ["Thalamus", "Thalamus", "Tálamo"]
    },
    {
        "latinName": "Hypothalamus",
        "turkishName": "Hipotalamus",
        "definition": "Beynin alt kısmında bulunan küçük yapı. Hormon salınımı, vücut sıcaklığı ve açlık-tokluk gibi fonksiyonları kontrol eder.",
        "components": ["Hipotalamik nükleuslar", "Gri madde"],
        "usage": "Hormon kontrolü, vücut sıcaklığı düzenlemesi, açlık-tokluk kontrolü",
        "sideEffects": ["Hormon dengesizliği", "Vücut sıcaklığı bozukluğu"],
        "interactions": ["Hipofiz bezi", "Talamus", "Endokrin sistem"],
        "synonyms": ["Hypothalamus", "Hypothalamus", "Hipotálamo"]
    },
    {
        "latinName": "Hippocampus",
        "turkishName": "Hipokampüs",
        "definition": "Beynin temporal lobunda bulunan yapı. Hafıza oluşumu ve uzamsal navigasyonda önemli rol oynar.",
        "components": ["CA1-CA4 alanları", "Dentat girus", "Subikulum"],
        "usage": "Hafıza oluşumu, uzamsal navigasyon, öğrenme",
        "sideEffects": ["Hafıza kaybı", "Alzheimer hastalığı"],
        "interactions": ["Temporal lob", "Amigdala", "Prefrontal korteks"],
        "synonyms": ["Hippocampus", "Hippocampe", "Hipocampo"]
    },
    {
        "latinName": "Amygdala",
        "turkishName": "Amigdala",
        "definition": "Beynin temporal lobunda bulunan badem şeklinde yapı. Duygusal işleme, korku ve saldırganlıkta önemli rol oynar.",
        "components": ["Lateral nükleus", "Bazal nükleus", "Merkezi nükleus"],
        "usage": "Duygusal işleme, korku tepkisi, saldırganlık kontrolü",
        "sideEffects": ["Anksiyete bozukluğu", "Korku bozukluğu"],
        "interactions": ["Hipokampüs", "Prefrontal korteks", "Hipotalamus"],
        "synonyms": ["Amygdala", "Amygdale", "Amígdala"]
    },
    {
        "latinName": "Corpus Callosum",
        "turkishName": "Beyin Köprüsü",
        "definition": "Beyin hemisferlerini birleştiren geniş sinir lifi demeti. İki beyin yarıküresi arasında bilgi alışverişini sağlar.",
        "components": ["Sinir lifleri", "Beyaz madde"],
        "usage": "Beyin hemisferleri arası iletişim, bilişsel fonksiyonlar",
        "sideEffects": ["Bilişsel bozukluk", "Hemisferler arası iletişim kaybı"],
        "interactions": ["Beyin hemisferleri", "Beyin korteksi"],
        "synonyms": ["Corpus callosum", "Corps calleux", "Cuerpo calloso"]
    },
    {
        "latinName": "Spinal Cord",
        "turkishName": "Omurilik",
        "definition": "Omurga kanalı içinde bulunan sinir dokusu. Beyin ile vücut arasında sinir iletimini sağlar.",
        "components": ["Gri madde", "Beyaz madde", "Omurilik sinirleri"],
        "usage": "Sinir iletimi, refleks kontrolü, motor ve duyusal fonksiyonlar",
        "sideEffects": ["Felç", "Duyusal kayıp", "Motor kayıp"],
        "interactions": ["Beyin", "Periferik sinirler", "Omurga"],
        "synonyms": ["Spinal cord", "Moelle épinière", "Médula espinal"]
    },
    {
        "latinName": "Phrenic Nerve",
        "turkishName": "Frenik Sinir",
        "definition": "Boyundan başlayıp diyaframa kadar uzanan sinir. Diyaframın kasılmasını kontrol eder.",
        "components": ["Sinir lifleri"],
        "usage": "Diyafram kontrolü, solunum kontrolü",
        "sideEffects": ["Diyafram paralizisi", "Solunum güçlüğü"],
        "interactions": ["Diyafram", "Servikal sinirler"],
        "synonyms": ["Phrenic nerve", "Nerf phrénique", "Nervio frénico"]
    },
    {
        "latinName": "Vagus Nerve",
        "turkishName": "Vagus Siniri",
        "definition": "En uzun kraniyal sinir. Kalp, akciğer, mide ve bağırsak gibi birçok organın fonksiyonunu kontrol eder.",
        "components": ["Sinir lifleri"],
        "usage": "Kalp atışı kontrolü, sindirim kontrolü, solunum kontrolü",
        "sideEffects": ["Kalp ritim bozukluğu", "Sindirim bozukluğu"],
        "interactions": ["Kalp", "Akciğerler", "Mide", "Bağırsak"],
        "synonyms": ["Vagus nerve", "Nerf vague", "Nervio vago"]
    },
    {
        "latinName": "Optic Nerve",
        "turkishName": "Görme Siniri",
        "definition": "Gözden beyne görsel bilgi taşıyan kraniyal sinir. Görme fonksiyonunda kritik rol oynar.",
        "components": ["Sinir lifleri"],
        "usage": "Görsel bilgi iletimi, görme fonksiyonu",
        "sideEffects": ["Görme kaybı", "Görme alanı defekti"],
        "interactions": ["Retina", "Beyin", "Görme korteksi"],
        "synonyms": ["Optic nerve", "Nerf optique", "Nervio óptico"]
    },
    {
        "latinName": "Facial Nerve",
        "turkishName": "Yüz Siniri",
        "definition": "Yüz kaslarının hareketini ve tat alma duyusunu kontrol eden kraniyal sinir.",
        "components": ["Sinir lifleri"],
        "usage": "Yüz kasları kontrolü, tat alma, tükürük salgısı",
        "sideEffects": ["Yüz felci", "Tat kaybı"],
        "interactions": ["Yüz kasları", "Dil", "Tükürük bezleri"],
        "synonyms": ["Facial nerve", "Nerf facial", "Nervio facial"]
    },
    {
        "latinName": "Trigeminal Nerve",
        "turkishName": "Üçlü Sinir",
        "definition": "Yüzün duyusal ve çiğneme kaslarının motor kontrolünü sağlayan kraniyal sinir.",
        "components": ["Oftalmik dal", "Maksiller dal", "Mandibüler dal"],
        "usage": "Yüz duyusu, çiğneme kasları kontrolü",
        "sideEffects": ["Trigeminal nevralji", "Yüz ağrısı"],
        "interactions": ["Yüz", "Çiğneme kasları", "Beyin"],
        "synonyms": ["Trigeminal nerve", "Nerf trijumeau", "Nervio trigémino"]
    }
]

if __name__ == "__main__":
    data = load_data()
    next_id = get_next_id(data)
    existing = get_existing_names(data, 'anatomy')
    
    print(f"Mevcut anatomi verisi: {len([item for item in data if item.get('category') == 'anatomy'])}")
    print(f"Sonraki ID: {next_id}\n")
    
    new_items = []
    current_id = next_id
    
    for term in anatomy_terms:
        if term['latinName'].lower() not in existing:
            new_items.append({
                "id": str(current_id),
                "latinName": term["latinName"],
                "turkishName": term["turkishName"],
                "category": "anatomy",
                "definition": term["definition"],
                "components": term["components"] if isinstance(term["components"], list) else [term["components"]],
                "usage": term["usage"],
                "sideEffects": term["sideEffects"] if isinstance(term["sideEffects"], list) else [term["sideEffects"]],
                "interactions": term["interactions"] if isinstance(term["interactions"], list) else [term["interactions"]],
                "synonyms": term["synonyms"] if isinstance(term["synonyms"], list) else [term["synonyms"]],
                "isBookmarked": False
            })
            current_id += 1
            if len(new_items) >= 50:
                break
    
    if new_items:
        data.extend(new_items)
        save_data(data)
        print(f"✅ {len(new_items)} anatomi terimi eklendi!")
        print(f"Yeni toplam anatomi verisi: {len([item for item in data if item.get('category') == 'anatomy'])}")
        print(f"Toplam veri: {len(data)}")
    else:
        print("⚠️ Yeni veri eklenmedi (tüm veriler zaten mevcut olabilir)")

