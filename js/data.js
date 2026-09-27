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
  categories: ["Commercial", "Music Video", "Narrative"],

  // Ana sayfada arka planda dönen işler (slug)
  home: ["hokus", "sekerbank", "hepsiburadaannelergunu", "madrigalsenyadahic"],

  // About sayfası — boş alanlar gösterilmez
  about: {
    bio: "",
    cv: "",
    languages: [],
    awards: [] // { title: "", award: "", year: "" }
  }
};

const PROJECTS = [
  {
    slug: "sekerbank",
    title: "Şekerbank",
    category: "Commercial",
    cover: "https://vumbnail.com/1166054398.jpg",
    vimeo: "1166054398",
    clip: "assets/clips/sekerbank.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepsiburadaannelergunu",
    title: "hepsiburada/anneler günü",
    category: "Commercial",
    cover: "https://vumbnail.com/1186897700.jpg",
    vimeo: "1186897700",
    clip: "assets/clips/hepsiburadaannelergunu.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hokus",
    title: "Hokus 4 yaşında",
    category: "Commercial",
    cover: "https://vumbnail.com/1152170812.jpg",
    vimeo: "1152170812",
    clip: "assets/clips/hokus.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "allianzdijitaldoktorum",
    title: "Allianz/Dijital Doktorum",
    category: "Commercial",
    cover: "https://vumbnail.com/1176085026.jpg",
    vimeo: "1176085026",
    clip: "assets/clips/allianzdijitaldoktorum.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepsiburadamutfak",
    title: "hepsiburada/barışmak daha pahalı-mutfak",
    category: "Commercial",
    cover: "https://vumbnail.com/1163889054.jpg",
    vimeo: "1163889054",
    clip: "assets/clips/hepsiburadamutfak.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "madrigalsenyadahic",
    title: "Madrigal-Sen ya da hiç",
    category: "Music Video",
    cover: "https://vumbnail.com/1033808394.jpg",
    vimeo: "1033808394",
    clip: "assets/clips/madrigalsenyadahic.mp4",
    description: "",
    director: "",
    production: "",
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
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "cmf1",
    title: "CMF Phone 1",
    category: "Commercial",
    cover: "assets/projects/cmf1/cmf1.avif",
    vimeo: "1089788027",
    clip: "assets/clips/cmf1.mp4",
    description: "CMF Phone 1 by Nothing",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "madrigalsenyoksun",
    title: "Madrigal feat Göksel - Ne zamandır sendeyim",
    category: "Music Video",
    cover: "assets/projects/madrigalgoksel/madrigalgoksel.avif",
    vimeo: "1033811464",
    clip: "assets/clips/madrigalsenyoksun.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "allianzyakini",
    title: "Allianz/Allianz yakını",
    category: "Commercial",
    cover: "https://vumbnail.com/1177205321.jpg",
    vimeo: "1177205321",
    clip: "assets/clips/allianzyakini.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "allianztss",
    title: "Allianz/TSS Limit hesabı",
    category: "Commercial",
    cover: "https://vumbnail.com/1176086667.jpg",
    vimeo: "1176086667",
    clip: "assets/clips/allianztss.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepsiburadakahvalti",
    title: "hepsiburada/barışmak daha pahalı-kahvaltı",
    category: "Commercial",
    cover: "https://vumbnail.com/1163890096.jpg",
    vimeo: "1163890096",
    clip: "assets/clips/hepsiburadakahvalti.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepiyisigorta",
    title: "hepiyisigorta",
    category: "Commercial",
    cover: "https://vumbnail.com/1163899763.jpg",
    vimeo: "1163899763",
    clip: "assets/clips/hepiyisigorta.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "turktelekom",
    title: "türk telekom",
    category: "Commercial",
    cover: "https://vumbnail.com/1195859642.jpg",
    vimeo: "1195859642",
    clip: "assets/clips/turktelekom.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "hepiyisigorta2",
    title: "hepiyi sigorta",
    category: "Commercial",
    cover: "https://vumbnail.com/1163897744.jpg",
    vimeo: "1163897744",
    clip: "assets/clips/hepiyisigorta2.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "44iff",
    title: "44. İstanbul Film Festivali",
    category: "Commercial",
    cover: "assets/projects/44iff/44iff.avif",
    vimeo: "1087643931",
    clip: "assets/clips/44iff.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "istanbulfilmfestivali",
    title: "44.İSTANBUL FİLM FESTİVALİ",
    category: "Commercial",
    cover: "https://vumbnail.com/1087642319.jpg",
    vimeo: "1087642319",
    clip: "assets/clips/istanbulfilmfestivali.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "wwfmarketeyewearcampaign",
    title: "wwfmarket-eye wear campaign",
    category: "Commercial",
    cover: "https://vumbnail.com/1033598760.jpg",
    vimeo: "1033598760",
    clip: "assets/clips/wwfmarketeyewearcampaign.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  },
  {
    slug: "allianzkasko5g",
    title: "Allianz / Kasko - 5G Çağında KEŞGE",
    category: "Commercial",
    cover: "https://vumbnail.com/1180447510.jpg",
    vimeo: "1180447510",
    clip: "assets/clips/allianzkasko5g.mp4",
    description: "",
    director: "",
    production: "",
    year: "",
    credits: [],
    stills: []
  }
];
