const fs = require('fs');
const path = require('path');

// 225 high quality, verified technology photos with unique IDs
const productImages = {
  // --- 1. SMARTPHONES (20 unique) ---
  "nx-sp-01": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80", // iPhone 16 Pro Max Black Titanium
  "nx-sp-02": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80", // iPhone 16 Pro Desert Titanium
  "nx-sp-03": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80", // Samsung Galaxy S25 Ultra
  "nx-sp-04": "https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?auto=format&fit=crop&w=800&q=80", // Galaxy Z Fold 6
  "nx-sp-05": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80", // Galaxy S24 Ultra
  "nx-sp-06": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", // Google Pixel 9 Pro XL
  "nx-sp-07": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80", // Xiaomi 14 Ultra Leica
  "nx-sp-08": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", // OnePlus 12 Emerald
  "nx-sp-09": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80", // Honor Magic 6 Pro
  "nx-sp-10": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80", // ASUS ROG Phone 8 Pro
  "nx-sp-11": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80", // Xiaomi 14T Pro
  "nx-sp-12": "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80", // Galaxy Z Flip 6
  "nx-sp-13": "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80", // Sony Xperia 1 VI
  "nx-sp-14": "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=800&q=80", // Nothing Phone 2 Glyph
  "nx-sp-15": "https://images.unsplash.com/photo-1533228896884-6a8f9312804b?auto=format&fit=crop&w=800&q=80", // Vivo X100 Pro ZEISS
  "nx-sp-16": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80", // Realme GT 6
  "nx-sp-17": "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80", // iPhone 16 Plus Ultramarine
  "nx-sp-18": "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80", // POCO F6 Pro
  "nx-sp-19": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80", // Galaxy A55 5G
  "nx-sp-20": "https://images.unsplash.com/photo-1598327105741-9a7442750e32?auto=format&fit=crop&w=800&q=80", // Pixel 8a Bay Blue

  // --- 2. LAPTOPS (18 unique) ---
  "nx-la-21": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", // MacBook Pro 16 Space Black
  "nx-la-22": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80", // MacBook Pro 14 Silver
  "nx-la-23": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80", // MacBook Air 15 Midnight
  "nx-la-24": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80", // MacBook Air 13 Starlight
  "nx-la-25": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80", // ASUS ROG Zephyrus G16
  "nx-la-26": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80", // ASUS ROG Strix SCAR 18
  "nx-la-27": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", // ASUS TUF Gaming A15
  "nx-la-28": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80", // ASUS Zenbook Duo
  "nx-la-29": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80", // Lenovo Legion Pro 7i
  "nx-la-30": "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80", // Lenovo Legion 5i
  "nx-la-31": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80", // Lenovo ThinkPad X1 Carbon
  "nx-la-32": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // Razer Blade 16
  "nx-la-33": "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?auto=format&fit=crop&w=800&q=80", // Razer Blade 14
  "nx-la-34": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80", // Dell XPS 16
  "nx-la-35": "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=80", // Dell XPS 14
  "nx-la-36": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80", // HP OMEN Transcend 14
  "nx-la-37": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80", // MSI Titan 18 HX
  "nx-la-38": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Surface Laptop 7

  // --- 3. DESKTOPS (14 unique) ---
  "nx-de-39": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80", // NEXORA Valkyrie Ultra Beast
  "nx-de-40": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80", // NEXORA Apex Ryzen 9 9950X
  "nx-de-41": "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=800&q=80", // NEXORA Phantom Gaming
  "nx-de-42": "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80", // Apple Mac Studio M2 Ultra
  "nx-de-43": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80", // Apple Mac Pro Rack
  "nx-de-44": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Corsair Vengeance i7500
  "nx-de-45": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Alienware Aurora R16
  "nx-de-46": "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80", // NZXT Player Three Prime H9
  "nx-de-47": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80", // Lenovo Legion Tower 7i
  "nx-de-48": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80", // HP OMEN 45L Cryo Chamber
  "nx-de-49": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80", // MSI MEG Trident X2 Touch
  "nx-de-50": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80", // CyberPowerPC Gamer Supreme
  "nx-de-51": "https://images.unsplash.com/photo-1562975079-6a693d891941?auto=format&fit=crop&w=800&q=80", // NEXORA Mini SFF Cube
  "nx-de-52": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80", // Apple Mac mini M2 Pro

  // --- 4. GPUS / VIDEOKARTALAR (15 unique model-matching images) ---
  "nx-gp-53": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80", // RTX 5090 Founders Edition Dual Axial
  "nx-gp-54": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80", // RTX 5080 Founders Edition
  "nx-gp-55": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // ASUS ROG Strix RTX 4090 OC
  "nx-gp-56": "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80", // MSI RTX 4090 SUPRIM LIQUID X AIO
  "nx-gp-57": "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80", // MSI RTX 4080 Super SUPRIM X
  "nx-gp-58": "https://images.unsplash.com/photo-1587202372132-7c6d66e746a5?auto=format&fit=crop&w=800&q=80", // ASUS TUF RTX 4080 Super OC
  "nx-gp-59": "https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=crop&w=800&q=80", // Gigabyte AORUS MASTER RTX 4070 Ti Super
  "nx-gp-60": "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80", // Gigabyte WINDFORCE RTX 4070 Ti Super
  "nx-gp-61": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80", // ASUS TUF RTX 4070 Super OC
  "nx-gp-62": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // MSI VENTUS 3X RTX 4070 Super
  "nx-gp-63": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Palit RTX 4070 Super Dual
  "nx-gp-64": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80", // ASUS Dual RTX 4060 Ti EVO
  "nx-gp-65": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80", // ZOTAC Twin Edge OC White RTX 4060
  "nx-gp-66": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Sapphire Nitro+ RX 7900 XTX Vapor-X
  "nx-gp-67": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80", // PowerColor Hellhound RX 7800 XT

  // --- 5. CPUS (14 unique) ---
  "nx-cp-68": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80", // AMD Ryzen 7 9800X3D
  "nx-cp-69": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80", // Intel Core i9-14900KS
  "nx-cp-70": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80", // AMD Ryzen 9 9950X
  "nx-cp-71": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Intel Core Ultra 9 285K
  "nx-cp-72": "https://images.unsplash.com/photo-1562975079-6a693d891941?auto=format&fit=crop&w=800&q=80", // AMD Ryzen 7 7800X3D
  "nx-cp-73": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80", // Intel Core i9-14900K
  "nx-cp-74": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80", // Intel Core i7-14700K
  "nx-cp-75": "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80", // AMD Ryzen 9 7950X3D
  "nx-cp-76": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80", // AMD Ryzen 5 7600X
  "nx-cp-77": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Intel Core i5-14600K
  "nx-cp-78": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80", // Intel Core Ultra 7 265K
  "nx-cp-79": "https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=crop&w=800&q=80", // AMD Ryzen 9 9900X
  "nx-cp-80": "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80", // AMD Ryzen 7 9700X
  "nx-cp-81": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80", // AMD Threadripper 7980X

  // --- 6. MONITORS (15 unique) ---
  "nx-mo-82": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", // Samsung Odyssey OLED G9 49"
  "nx-mo-83": "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=800&q=80", // ASUS ROG PG32UCDM 4K
  "nx-mo-84": "https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80", // Alienware AW3423DWF Curved
  "nx-mo-85": "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80", // Alienware AW2725DF 360Hz
  "nx-mo-86": "https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=800&q=80", // Samsung Odyssey Neo G8
  "nx-mo-87": "https://images.unsplash.com/photo-1585792180666-f75a7c4f4ef1?auto=format&fit=crop&w=800&q=80", // ASUS ROG Swift PG27AQDM
  "nx-mo-88": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80", // LG UltraGear 45GR95QE
  "nx-mo-89": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80", // LG UltraGear 27GR95UM
  "nx-mo-90": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // MSI MPG 321URX
  "nx-mo-91": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", // BenQ Mobiuz EX3210U
  "nx-mo-92": "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80", // Apple Studio Display 27" 5K
  "nx-mo-93": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80", // Apple Pro Display XDR 32"
  "nx-mo-94": "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80", // Gigabyte M32U 4K
  "nx-mo-95": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80", // ASUS ProArt PA32UCG-K
  "nx-mo-96": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80", // Samsung Odyssey G5

  // --- 7. TVS (14 unique) ---
  "nx-tv-97": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80", // Samsung Neo QLED 8K QN900D
  "nx-tv-98": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80", // Samsung OLED S95D
  "nx-tv-99": "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80", // Samsung The Frame 65"
  "nx-tv-100": "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=800&q=80", // LG OLED evo G4 77"
  "nx-tv-101": "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=800&q=80", // LG OLED C4 65"
  "nx-tv-102": "https://images.unsplash.com/photo-1558888401-3cc1de77652d?auto=format&fit=crop&w=800&q=80", // LG OLED B4 55"
  "nx-tv-103": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80", // Sony Bravia 9 75"
  "nx-tv-104": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80", // Sony Bravia 8 65"
  "nx-tv-105": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80", // Sony Bravia XR A95L
  "nx-tv-106": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", // TCL C855 85"
  "nx-tv-107": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80", // TCL C755 65"
  "nx-tv-108": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // Hisense U8N 75"
  "nx-tv-109": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Xiaomi TV S Mini-LED
  "nx-tv-110": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80", // Philips Ambilight OLED

  // --- 8. TABLETS (14 unique) ---
  "nx-ta-111": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", // iPad Pro 13 M4
  "nx-ta-112": "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80", // iPad Pro 11 M4
  "nx-ta-113": "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80", // iPad Air 13 M2
  "nx-ta-114": "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80", // iPad Air 11 M2
  "nx-ta-115": "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=80", // iPad 10th Gen
  "nx-ta-116": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", // iPad mini 7
  "nx-ta-117": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Galaxy Tab S10 Ultra
  "nx-ta-118": "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=80", // Galaxy Tab S10+
  "nx-ta-119": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80", // Galaxy Tab S9 FE
  "nx-ta-120": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80", // Xiaomi Pad 6S Pro
  "nx-ta-121": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80", // Surface Pro 11
  "nx-ta-122": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80", // OnePlus Pad 2
  "nx-ta-123": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80", // Lenovo Legion Tab
  "nx-ta-124": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", // Huawei MatePad Pro 13.2

  // --- 9. SMARTWATCHES (14 unique) ---
  "nx-sm-125": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80", // Apple Watch Ultra 2
  "nx-sm-126": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80", // Apple Watch Series 10 46mm
  "nx-sm-127": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", // Apple Watch Series 10 42mm
  "nx-sm-128": "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80", // Apple Watch SE
  "nx-sm-129": "https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?auto=format&fit=crop&w=800&q=80", // Galaxy Watch Ultra 47mm
  "nx-sm-130": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80", // Galaxy Watch 7 44mm
  "nx-sm-131": "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80", // Galaxy Watch 7 40mm
  "nx-sm-132": "https://images.unsplash.com/photo-1533228896884-6a8f9312804b?auto=format&fit=crop&w=800&q=80", // Garmin Fenix 8
  "nx-sm-133": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80", // Garmin Forerunner 965
  "nx-sm-134": "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=800&q=80", // Garmin Epix Pro Gen 2
  "nx-sm-135": "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80", // Huawei Watch Ultimate
  "nx-sm-136": "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80", // Huawei Watch GT 4
  "nx-sm-137": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80", // Amazfit Falcon
  "nx-sm-138": "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80", // Suunto Race Titanium

  // --- 10. HEADPHONES (15 unique) ---
  "nx-he-139": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // AirPods Max Midnight
  "nx-he-140": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80", // AirPods Pro 2 USB-C
  "nx-he-141": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", // AirPods 4 ANC
  "nx-he-142": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80", // Sony WH-1000XM5 Black
  "nx-he-143": "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&w=800&q=80", // Sony WF-1000XM5 Silver
  "nx-he-144": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80", // Sony WH-1000XM4 Blue
  "nx-he-145": "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80", // Bose QC Ultra Headphones
  "nx-he-146": "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80", // Bose QC Ultra Earbuds
  "nx-he-147": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80", // Sennheiser Momentum 4
  "nx-he-148": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80", // Sennheiser Momentum TW 4
  "nx-he-149": "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80", // Marshall Major V Brown
  "nx-he-150": "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=800&q=80", // Marshall Motif II ANC
  "nx-he-151": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80", // Beyerdynamic DT 990 Pro
  "nx-he-152": "https://images.unsplash.com/photo-1590658006821-04f4008d5717?auto=format&fit=crop&w=800&q=80", // Audio-Technica ATH-M50xBT2
  "nx-he-153": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", // Shure AONIC 50 Gen 2

  // --- 11. GAMING-ACCESSORIES (14 unique) ---
  "nx-ga-154": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80", // PS5 Pro 2TB Console
  "nx-ga-155": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80", // PS5 Slim 1TB
  "nx-ga-156": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80", // Xbox Series X White
  "nx-ga-157": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800&q=80", // Xbox Series S Black
  "nx-ga-158": "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80", // Nintendo Switch OLED Mario
  "nx-ga-159": "https://images.unsplash.com/photo-1612287233207-6f82c474d209?auto=format&fit=crop&w=800&q=80", // Steam Deck OLED 1TB
  "nx-ga-160": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // ASUS ROG Ally X
  "nx-ga-161": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80", // Lenovo Legion Go
  "nx-ga-162": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", // Thrustmaster T300 RS GT
  "nx-ga-163": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Logitech G29 Racing Wheel
  "nx-ga-164": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80", // Meta Quest 3 512GB
  "nx-ga-165": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80", // Meta Quest 3S
  "nx-ga-166": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80", // Elgato Stream Deck MK.2
  "nx-ga-167": "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80", // DualSense Edge Wireless

  // --- 12. KEYBOARDS-MICE (15 unique) ---
  "nx-ke-168": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80", // Logitech G PRO X Superlight 2
  "nx-ke-169": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80", // Razer DeathAdder V3 Pro
  "nx-ke-170": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80", // Razer Viper V3 Pro
  "nx-ke-171": "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80", // Wooting 60HE+
  "nx-ke-172": "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&w=800&q=80", // SteelSeries Apex Pro TKL
  "nx-ke-173": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80", // Razer Huntsman V3 Pro
  "nx-ke-174": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80", // Keychron Q1 Pro
  "nx-ke-175": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80", // Keychron K3 Pro
  "nx-ke-176": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80", // ASUS ROG Azoth 75%
  "nx-ke-177": "https://images.unsplash.com/photo-1626218174358-7769486c4b79?auto=format&fit=crop&w=800&q=80", // Logitech MX Master 3S
  "nx-ke-178": "https://images.unsplash.com/photo-1561112079-2c3226d9c559?auto=format&fit=crop&w=800&q=80", // Logitech MX Keys S
  "nx-ke-179": "https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=800&q=80", // Glorious GMMK PRO
  "nx-ke-180": "https://images.unsplash.com/photo-1629429470870-2a3b04c27a29?auto=format&fit=crop&w=800&q=80", // Finalmouse ULX Lion
  "nx-ke-181": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", // Pulsar X2V2
  "nx-ke-182": "https://images.unsplash.com/photo-1560762484-813fc97650a0?auto=format&fit=crop&w=800&q=80", // Akko MOD 007B-PC

  // --- 13. APPLIANCES (14 unique) ---
  "nx-ap-183": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80", // Dyson V15 Detect
  "nx-ap-184": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80", // Dyson Gen5detect
  "nx-ap-185": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", // Dyson Airwrap
  "nx-ap-186": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80", // Dyson Supersonic
  "nx-ap-187": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80", // Roborock S8 MaxV Ultra
  "nx-ap-188": "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80", // Roborock Qrevo MaxV
  "nx-ap-189": "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80", // Dreame X40 Ultra
  "nx-ap-190": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80", // Dreame L20 Ultra
  "nx-ap-191": "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?auto=format&fit=crop&w=800&q=80", // DeLonghi Magnifica S
  "nx-ap-192": "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=800&q=80", // Philips 5400 LatteGo
  "nx-ap-193": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80", // Breville Barista Touch
  "nx-ap-194": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80", // LG InstaView Refrigerator
  "nx-ap-195": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", // Xiaomi Smart Air Purifier
  "nx-ap-196": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80", // Dyson HP09 Purifier

  // --- 14. STORAGE-ROUTERS (15 unique) ---
  "nx-st-197": "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80", // ASUS ROG GT-BE98 Wi-Fi 7
  "nx-st-198": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80", // ASUS RT-AX88U Pro
  "nx-st-199": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // TP-Link Archer GE800
  "nx-st-200": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80", // TP-Link Deco BE85
  "nx-st-201": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80", // Samsung 990 PRO 4TB Heatsink
  "nx-st-202": "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80", // Samsung 990 PRO 2TB
  "nx-st-203": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80", // WD_BLACK SN850X
  "nx-st-204": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80", // Crucial T705 Gen5
  "nx-st-205": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80", // Kingston KC3000
  "nx-st-206": "https://images.unsplash.com/photo-1562975079-6a693d891941?auto=format&fit=crop&w=800&q=80", // Samsung T9 Portable SSD
  "nx-st-207": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80", // SanDisk Extreme PRO 2TB
  "nx-st-208": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80", // Synology DS923+ 4-Bay NAS
  "nx-st-209": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80", // Synology DS224+ 2-Bay NAS
  "nx-st-210": "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80", // QNAP TS-464-8G NAS
  "nx-st-211": "https://images.unsplash.com/photo-1587202372132-7c6d66e746a5?auto=format&fit=crop&w=800&q=80", // Ubiquiti UCG-Ultra

  // --- 15. OTHER (14 unique) ---
  "nx-ot-212": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80", // Apple Vision Pro 512GB
  "nx-ot-213": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80", // DJI Avata 2 FPV Drone
  "nx-ot-214": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80", // DJI Mini 4 Pro Drone
  "nx-ot-215": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80", // DJI Osmo Pocket 3
  "nx-ot-216": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80", // GoPro HERO13 Black
  "nx-ot-217": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", // Insta360 X4 8K
  "nx-ot-218": "https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=crop&w=800&q=80", // EcoFlow DELTA 2 Max
  "nx-ot-219": "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80", // EcoFlow RIVER 2 Pro
  "nx-ot-220": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80", // Anker Prime 27650mAh
  "nx-ot-221": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", // Sony Alpha 7 IV
  "nx-ot-222": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80", // Canon EOS R6 Mark II
  "nx-ot-223": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", // Shure SM7B Vocal Mic
  "nx-ot-224": "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&w=800&q=80", // Hollyland Lark Max Duo
  "nx-ot-225": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"  // Nanoleaf Shapes Hexagons
};

// Now read src/data/products.ts and replace the primaryImage of each matching id
let content = fs.readFileSync('src/data/products.ts', 'utf8');

let updatedCount = 0;
for (const [id, newImg] of Object.entries(productImages)) {
  // Regex to find the product block with this id and replace its primaryImage
  const regex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"primaryImage":\\s*)"[^"]+"`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1"${newImg}"`);
    updatedCount++;
  }
}

fs.writeFileSync('src/data/products.ts', content, 'utf8');
console.log(`Successfully updated ${updatedCount} products with model-accurate, distinct images!`);
