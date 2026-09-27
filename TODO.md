# Kalan İşler

Yeniden tasarım (`redesign` dalı) sonrası yapılacaklar. Geri dönüş noktası: `v0-baslangic` etiketi.
Can "başlayalım" diyene kadar bu maddeler üzerinde çalışılmaz.

## Tasarım

- [ ] 1. Logodaki sağ üst nokta ve köşe (kare) işaretini kaldır

## İçerik (Can'dan gelecek → js/data.js)

- [ ] 2. Narrative sayfası ve işleri (içerik hazırlanıyor)
- [ ] 3. About sayfası: biyografi, diller, ödüller, CV linki (içerik hazırlanıyor)
- [ ] 4. Video altına still görseller: her iş için görseller gelecek → `assets/projects/<slug>/` klasörüne konup `stills` alanına eklenecek
- [ ] 5. Proje bilgileri: her iş için yönetmen, yapım şirketi, yıl, credits. Boş alan görünmez; yönetmen/yapım girilince ana sayfa sekmelerinde de görünür
- [ ] 6. İş isimlerini "MARKA - Başlık" biçimine getir (örn. "hepsiburada/anneler günü" → "HEPSIBURADA - Anneler Günü")

## Ana sayfa klipleri

- [x] 4 klip Can'ın seçtiği saniyelerle yeniden kesildi (Şekerbank 6.8 sn, Hokus 8.4 sn, Madrigal 6 sn, Hepsiburada 8.4 sn)
- [ ] Onay sonrası yedekleri sil: `madrigalsenyadahic_v1.*`, `hepsiburadaannelergunu_v1.*`

## Test ve yayın

- [ ] Gerçek iPhone / Android cihazda test (video otomatik oynatma, mobil menü)
- [x] `redesign` dalına commit + push (469c7d4)
- [ ] Onayla `main` dalına birleştir ve canlıya al
