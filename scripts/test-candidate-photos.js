const https = require('https');

const candidatePhotos = [
  // GPUs & Gaming PCs
  "photo-1587202372775-e229f172b9d7",
  "photo-1591488320449-011701bb6704",
  "photo-1587202372634-32705e3bf49c",
  "photo-1550745165-9bc0b252726f",
  "photo-1555680202-c86f0e12f086",
  "photo-1591799264318-7e6ef8ddb7ea",
  "photo-1544652478-6653e09f18a2",
  "photo-1618005182384-a83a8bd57fbe",
  "photo-1600132806370-bf17e65e942f",
  "photo-1592659762303-90081d34b277",
  "photo-1580927752452-89d86da3fa0a",
  "photo-1517430816045-df4b7de11d1d",
  "photo-1526374965328-7f61d4dc18c5",
  "photo-1563770660941-20978e870e26",
  "photo-1550751827-4bd374c3f58b",
  "photo-1518770660439-4636190af475",
  "photo-1624705002806-5d72df19c3ad",
  "photo-1616440347437-b1c73416efc2",
  "photo-1526738549149-8e07eca6c147",
  "photo-1547394765-185e1e68f34e",

  // Smartphones
  "photo-1695048133142-1a20484d2569",
  "photo-1592750475338-74b7b21085ab",
  "photo-1610945265064-0e34e5519bbf",
  "photo-1584006682522-dc17d6c0d9ac",
  "photo-1580910051074-3eb694886505",
  "photo-1598327105666-5b89351aff97",
  "photo-1565849904461-04a58ad377e0",
  "photo-1511707171634-5f897ff02aa9",
  "photo-1510557880182-3d4d3cba35a5",
  "photo-1546868871-7041f2a55e12",
  "photo-1574944985070-8f3ebc6b79d2",
  "photo-1567581935884-3349723552ca",
  "photo-1585060544812-6b45742d762f",
  "photo-1575695342320-d2d2d2f9b73f",
  "photo-1601784551446-20c9e07cdbdb",
  "photo-1512499617640-c74ae3a79d37",
  "photo-1589492477829-5e65395b66cc",
  "photo-1572569511254-d8f925fe2cbb",

  // Laptops
  "photo-1517336714731-489689fd1ca8",
  "photo-1611186871348-b1ce696e52c9",
  "photo-1541807084-5c52b6b3adef",
  "photo-1525547719571-a2d4ac8945e2",
  "photo-1603302576837-37561b2e2302",
  "photo-1588872657578-7efd1f1555ed",
  "photo-1496181133206-80ce9b88a853",
  "photo-1544716278-ca5e3f4abd8c",
  "photo-1593642632823-8f785ba67e45",
  "photo-1588702547919-26089e690ecc",
  "photo-1531297484001-80022131f5a1",
  "photo-1580522154071-c6ca47a859ad",
  "photo-1593642702821-c8da6771f0c6",
  "photo-1587614382346-4ec70e388b28",
  "photo-1527864550417-7fd91fc51a46",
  "photo-1542751371-adc38448a05e",
  "photo-1516321318423-f06f85e504b3",

  // Audio / Headphones
  "photo-1505740420928-5e560c06d30e",
  "photo-1600294037681-c80b4cb5b434",
  "photo-1590658268037-6bf12165a8df",
  "photo-1583394838336-acd977736f90",
  "photo-1598331668826-20cecc596b86",
  "photo-1546435770-a3e426bf472b",
  "photo-1545127398-14699f92334b",
  "photo-1572536147248-ac59a8abfa4b",
  "photo-1484704849700-f032a568e944",
  "photo-1508700115892-45ecd05ae2ad",
  "photo-1524678606370-a47ad25cb82a",
  "photo-1577174881658-0f30ed549adc",
  "photo-1511379938547-c1f69419868d",
  "photo-1590658006821-04f4008d5717",
  "photo-1563245372-f21724e3856d",

  // Gaming Consoles & Wearables
  "photo-1606813907291-d86efa9b94db",
  "photo-1607604276583-eef5d076aa5f",
  "photo-1621259182978-fbf93132d53d",
  "photo-1605901309584-818e25960a8f",
  "photo-1578303512597-81e6cc155b3e",
  "photo-1600080972464-8e5f35f63d08",
  "photo-1508685096489-7aacd43bd3b1",
  "photo-1579586337278-3befd40fd17a",
  "photo-1523275335684-37898b6baf30",
  "photo-1510017803434-a899398421b3",
  "photo-1509741102003-ca64bfe5f069",

  // Keyboards & Mice
  "photo-1587829741301-dc798b83add3",
  "photo-1615663245857-ac93bb7c39e7",
  "photo-1595225476474-87563907a212",
  "photo-1595044426077-d36d9236d54a",
  "photo-1511467687858-23d96c32e4ae",
  "photo-1618384887929-16ec33fab9ef",
  "photo-1558655146-d09347e92766",
  "photo-1626218174358-7769486c4b79",
  "photo-1561112079-2c3226d9c559",
  "photo-1560762484-813fc97650a0",

  // Monitors & TVs
  "photo-1527443224154-c4a3942d3acf",
  "photo-1586210579191-33b45e38fa2c",
  "photo-1547119957-637f8679db1e",
  "photo-1593642634367-d91a135587b5",
  "photo-1551645120-d70bfe84c826",
  "photo-1586953208448-b95a79798f07",
  "photo-1593784991095-a205069470b6",
  "photo-1593359677879-a4bb92f829d1",
  "photo-1509281373149-e957c6296406",
  "photo-1577979749830-f1d742b96791",
  "photo-1461151304267-38535e780c79",
  "photo-1558888401-3cc1de77652d",
  "photo-1517604931442-7e0c8ed2963c",
  "photo-1574375927938-d5a98e8ffe85",

  // Tablets
  "photo-1544244015-0df4b3ffc6b0",
  "photo-1561154464-82e9adf32764",
  "photo-1589739900243-4b52cd9b104e",
  "photo-1585790050230-5dd28404ccb9",
  "photo-1542751110-97427bbecf20",
  "photo-1519389950473-47ba0277781c",

  // Appliances & Tech
  "photo-1558317374-067fb5f30001",
  "photo-1527515637462-cff94eecc1ac",
  "photo-1522337360788-8b13dee7a37e",
  "photo-1522337660859-02fbefca4702",
  "photo-1563453392212-326f5e854473",
  "photo-1518640467707-6811f4a6ab73",
  "photo-1585659722983-3a675dabf23d",
  "photo-1534040385115-33dcb3acba5b",
  "photo-1514432324607-a09d9b4aefdd",
  "photo-1571175443880-49e1d25b2bc5",
  "photo-1584622650111-993a426fbf0a",
  "photo-1585771724684-38269d6639fd",

  // Storage, Routers & Gadgets
  "photo-1597872200969-2b65d56bd16b",
  "photo-1558494949-ef010cbdcc31",
  "photo-1544197150-b99a580bb7a8",
  "photo-1593508512255-86ab42a8e620",
  "photo-1527977966376-1c8408f9f108",
  "photo-1508614589041-895b88991e3e",
  "photo-1512790182412-b19e6d62bc39",
  "photo-1502920917128-1aa500764cbd",
  "photo-1516035069371-29a1b244cc32",
  "photo-1500648767791-00dcc994a43e",
  "photo-1507473885765-e6ed057f782c"
];

async function check(id) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
  return new Promise(res => {
    https.request(url, { method: 'HEAD', timeout: 5000 }, (r) => {
      res({ id, ok: r.statusCode === 200, status: r.statusCode });
    }).on('error', () => res({ id, ok: false })).end();
  });
}

async function test() {
  const results = await Promise.all(candidatePhotos.map(check));
  const valid = results.filter(r => r.ok).map(r => r.id);
  console.log(`Validated ${valid.length} / ${candidatePhotos.length} photos with HTTP 200 OK!`);
  fs.writeFileSync('scripts/valid_photos.json', JSON.stringify(valid, null, 2));
}

test();
