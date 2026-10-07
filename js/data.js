/* =========================================================
   Site verisi — yeni iş eklemek için PROJECTS listesine
   bir obje ekleyin. Boş bırakılan alanlar sayfada gösterilmez.

   slug        : adres (#/work/slug) — Türkçe karakter/boşluk yok
   category    : "Commercial" | "Music Video" | "Narrative"
   cover       : kapak görseli (vumbnail.com/ID.jpg veya lokal)
   vimeo       : Vimeo video ID
   clip        : (ops.) 8-9 sn sessiz mp4 — ana sayfada (SITE.home) arka plan,
                 Work sayfasında fareyle üstüne gelince önizleme
   director    : (ops.) yönetmen
   production  : (ops.) yapım şirketi
   year        : (ops.) yıl
   credits     : (ops.) ["Production: X", "Agency: Y", ...]
   stills      : (ops.) ["assets/projects/slug/1.jpg", ...]
   ========================================================= */

const SITE = {
  name: "Anıl Yemelek",
  role: "Director of Photography",
  email: "anlyemelek@gmail.com",
  phone: "+90 545 677 67 37",
  instagram: "https://www.instagram.com/anilyemelek/",
  vimeo: "https://vimeo.com/anilyemelek",

  // Work sayfasındaki filtreler (sırasıyla)
  categories: ["Commercial", "Narrative", "Music Video"],

  // Ana sayfada arka planda dönen işler (slug)
  home: ["shelltts30", "hepsiburadaannelergunu", "hokus", "sekerbank"],

  // About sayfası — boş alanlar gösterilmez
  about: {
    bio: `Anıl Yemelek is a cinematographer working in commercials, music videos and narrative film.

His relationship with the camera began on set — learning the craft within the camera department, understanding movement, optics, light and the precision behind every frame. Over time, that technical foundation evolved into a more personal visual language, leading him to work as a Director of Photography.

He believes every frame should have a reason. Light, lenses and movement all shape how a story feels, so he works closely with directors to find the right look for each project and builds it with patience and care.

He’s happiest when the image feels natural, like it could never have looked any other way.`,
    closing: "Let’s make something worth watching.", // Contact sayfasına bağlanır
    cv: "",
    languages: [],
    awards: [] // { title: "", award: "", year: "" }
  }
};

const PROJECTS = [
  {
    slug: "shelltts30",
    title: "SHELL - TTS 30 Yaşında",
    category: "Commercial",
    cover: "https://vumbnail.com/1233627297.jpg",
    vimeo: "1233627297",
    clip: "assets/clips/shelltts30.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Blab x Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "sekerbank",
    title: "ŞEKERBANK",
    category: "Commercial",
    cover: "https://vumbnail.com/1166054398.jpg",
    vimeo: "1166054398",
    clip: "assets/clips/sekerbank.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepsiburadaannelergunu",
    title: "HEPSİBURADA - Anneler Günü",
    category: "Commercial",
    cover: "https://vumbnail.com/1186897700.jpg",
    vimeo: "1186897700",
    clip: "assets/clips/hepsiburadaannelergunu.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hokus",
    title: "HOKUS - 4 Yaşında",
    category: "Commercial",
    cover: "https://vumbnail.com/1152170812.jpg",
    vimeo: "1152170812",
    clip: "assets/clips/hokus.mp4",
    description: "",
    director: "Kadir Özer",
    production: "Hokus Film",
    producer: "Eyüp Kırbaş, Ferit Katipoğlu, Levent Kostepen",
    agency: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "allianzdijitaldoktorum",
    title: "ALLIANZ - Dijital Doktorum",
    category: "Commercial",
    cover: "https://vumbnail.com/1176085026.jpg",
    vimeo: "1176085026",
    clip: "assets/clips/allianzdijitaldoktorum.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepsiburadamutfak",
    title: "HEPSİBURADA - Barışmak Daha Pahalı (Mutfak)",
    category: "Commercial",
    cover: "https://vumbnail.com/1163889054.jpg",
    vimeo: "1163889054",
    clip: "assets/clips/hepsiburadamutfak.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "madrigalsenyadahic",
    title: "MADRIGAL - Sen ya da Hiç",
    category: "Music Video",
    cover: "https://vumbnail.com/1033808394.jpg",
    vimeo: "1033808394",
    clip: "assets/clips/madrigalsenyadahic.mp4",
    description: "",
    director: "",
    production: "",
    producer: "",
    agency: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "wwf",
    title: "WWF - Eye Wear Campaign",
    category: "Commercial",
    cover: "assets/projects/wwf/wwf.avif",
    vimeo: "1035195736",
    clip: "assets/clips/wwf.mp4",
    description: "",
    director: "Serra Duran Paralı",
    production: "",
    producer: "",
    agency: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "cmf1",
    title: "CMF - Phone 1",
    category: "Commercial",
    cover: "assets/projects/cmf1/cmf1.avif",
    vimeo: "1089788027",
    clip: "assets/clips/cmf1.mp4",
    description: "CMF Phone 1 by Nothing",
    director: "İnanç Kalaycı",
    production: "",
    producer: "",
    agency: "Seven Digital Marketing",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "madrigalsenyoksun",
    title: "MADRIGAL feat. GÖKSEL - Ne Zamandır Sendeyim",
    category: "Music Video",
    cover: "assets/projects/madrigalgoksel/madrigalgoksel.avif",
    vimeo: "1033811464",
    clip: "assets/clips/madrigalsenyoksun.mp4",
    description: "",
    director: "",
    production: "",
    producer: "",
    agency: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "allianzyakini",
    title: "ALLIANZ - Allianz Yakını",
    category: "Commercial",
    cover: "https://vumbnail.com/1177205321.jpg",
    vimeo: "1177205321",
    clip: "assets/clips/allianzyakini.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "allianztss",
    title: "ALLIANZ - TSS Limit Hesabı",
    category: "Commercial",
    cover: "https://vumbnail.com/1176086667.jpg",
    vimeo: "1176086667",
    clip: "assets/clips/allianztss.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepsiburadakahvalti",
    title: "HEPSİBURADA - Barışmak Daha Pahalı (Kahvaltı)",
    category: "Commercial",
    cover: "https://vumbnail.com/1163890096.jpg",
    vimeo: "1163890096",
    clip: "assets/clips/hepsiburadakahvalti.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepiyisigorta",
    title: "HEPİYİ SİGORTA",
    category: "Commercial",
    cover: "https://vumbnail.com/1163899763.jpg",
    vimeo: "1163899763",
    clip: "assets/clips/hepiyisigorta.mp4",
    description: "",
    director: "Ferit Katipoğlu",
    production: "Hokus Film",
    producer: "",
    agency: "Mullenlowe",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "turktelekom",
    title: "TÜRK TELEKOM",
    category: "Commercial",
    cover: "https://vumbnail.com/1195859642.jpg",
    vimeo: "1195859642",
    clip: "assets/clips/turktelekom.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepiyisigorta2",
    title: "HEPİYİ SİGORTA",
    category: "Commercial",
    cover: "https://vumbnail.com/1163897744.jpg",
    vimeo: "1163897744",
    clip: "assets/clips/hepiyisigorta2.mp4",
    description: "",
    director: "Ferit Katipoğlu",
    production: "Hokus Film",
    producer: "",
    agency: "Mullenlowe",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "44iff",
    title: "İSTANBUL FİLM FESTİVALİ",
    category: "Commercial",
    cover: "assets/projects/44iff/44iff.avif",
    vimeo: "1087643931",
    clip: "assets/clips/44iff.mp4",
    description: "",
    director: "Ferit Katipoğlu",
    production: "Hokus Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "istanbulfilmfestivali",
    title: "İSTANBUL FİLM FESTİVALİ",
    category: "Commercial",
    cover: "https://vumbnail.com/1087642319.jpg",
    vimeo: "1087642319",
    clip: "assets/clips/istanbulfilmfestivali.mp4",
    description: "",
    director: "Ferit Katipoğlu",
    production: "Hokus Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "wwfmarketeyewearcampaign",
    title: "WWF MARKET - Eye Wear Campaign",
    category: "Commercial",
    cover: "https://vumbnail.com/1033598760.jpg",
    vimeo: "1033598760",
    clip: "assets/clips/wwfmarketeyewearcampaign.mp4",
    description: "",
    director: "Serra Duran Paralı",
    production: "",
    producer: "",
    agency: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "allianzkasko5g",
    title: "ALLIANZ - Kasko: 5G Çağında KEŞGE",
    category: "Commercial",
    cover: "https://vumbnail.com/1180447510.jpg",
    vimeo: "1180447510",
    clip: "assets/clips/allianzkasko5g.mp4",
    description: "",
    director: "Yunus Emre Boylu",
    production: "Klik Film",
    producer: "",
    agency: "Concept Istanbul",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "periferi",
    title: "Periferi: Gündelik Devinimler Zinciri",
    category: "Narrative",
    cover: "assets/projects/periferi/poster.jpg",
    coverFit: "contain", // dikey afiş: kartta kırpılmadan tam görünür
    vimeo: "",
    description: "",
    director: "Furkan Arslantaş",
    production: "",
    producer: "",
    agency: "",
    year: "",
    credits: [
      { role: "Cast", name: "Erdem Kaynarca, Deniz Bakacak, Murat Kapı, Onur Gürçay, Asena Girişken, Meriç Özkaya, Levent Can" },
      { role: "Producers", name: "Furkan Arslantaş, Fatih Dağlı, Doğa Güneykaya, Oğuz Hidayetoğlu, Erdem Kaynarca, Can Ulkay" },
      { role: "Cinematographer", name: "Anıl Yemelek" },
      { role: "Composer", name: "Agustin Gulias" },
      { role: "Editor", name: "Cemre Açıkgöz" },
      { role: "Colorist", name: "Oğuz Birgölge" }
    ],
    // Kaydırmalı galeri (video yerine); her görselin telefon sürümü aynı adla "-m.jpg"
    gallery: [
      "assets/projects/periferi/still-13.jpg",
      "assets/projects/periferi/still-03.jpg",
      "assets/projects/periferi/still-04.jpg",
      "assets/projects/periferi/still-07.jpg",
      "assets/projects/periferi/still-09.jpg",
      "assets/projects/periferi/still-01.jpg",
      "assets/projects/periferi/still-05.jpg",
      "assets/projects/periferi/still-06.jpg",
      "assets/projects/periferi/still-08.jpg",
      "assets/projects/periferi/still-10.jpg",
      "assets/projects/periferi/still-11.jpg",
      "assets/projects/periferi/still-12.jpg",
      "assets/projects/periferi/still-14.jpg",
      "assets/projects/periferi/still-15.jpg",
      "assets/projects/periferi/still-18.jpg",
      "assets/projects/periferi/still-19.jpg",
      "assets/projects/periferi/still-20.jpg"
    ],
    stills: []
  },
  {
    slug: "dunyaseninbildigingibidegil",
    title: "Dünya Senin Bildiğin Gibi Değil",
    category: "Narrative",
    cover: "assets/projects/dunyaseninbildigingibidegil/poster.jpg",
    coverFit: "contain", // dikey afiş: kartta kırpılmadan tam görünür
    vimeo: "",
    description: "",
    director: "Samet Karaman",
    production: "ODO Yapım",
    producer: "",
    agency: "",
    year: "",
    credits: [
      { role: "Writer", name: "Bilgesu Kasapoğlu Akçardak" },
      { role: "Cast", name: "Demet Akbağ, Bihter Dinçel, Fatih Al, Onur Gürçay, Erdem Kaynarca, İbrahim Şahin, Alp Özbayram" },
      { role: "Producers", name: "Ege Akbıyık, Cenk Arda Ekşioğlu, Erdem Kaynarca, Doğa Güneykaya, Merih Ermakastar, Berat Gülayan, Fatih Dağlı" },
      { role: "Cinematographer", name: "Anıl Yemelek" },
      { role: "Composer", name: "Cenk Erdoğan" },
      { role: "Editor", name: "Cemre Açıkgöz" },
      { role: "Colorist", name: "Sırrı Ali Şölen" },
      { role: "Art Director", name: "Yeliz Yavuz" },
      { role: "Costume Designer", name: "Damla Zavur" },
      { role: "Makeup & Hair", name: "Emin Aksu" }
    ],
    // Kaydırmalı galeri (16:9'a kırpılmış kareler); telefon sürümü "-m.jpg"
    gallery: [
      "assets/projects/dunyaseninbildigingibidegil/still-01.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-07.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-05.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-10.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-19.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-02.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-03.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-04.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-06.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-08.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-09.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-11.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-12.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-13.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-14.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-15.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-16.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-17.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-18.jpg",
      "assets/projects/dunyaseninbildigingibidegil/still-20.jpg"
    ],
    stills: []
  }
];
