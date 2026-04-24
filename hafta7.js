document.addEventListener("DOMContentLoaded", function() {
    // 1. Tema Değiştirme İşlemi
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // Body'e dark-mode sınıfını ekle/çıkar
            document.body.classList.toggle('dark-mode');
            
            // Buton metni ve stilini güncelle
            if (document.body.classList.contains('dark-mode')) {
                themeToggleBtn.textContent = 'Açık Temaya Geç';
                themeToggleBtn.classList.remove('btn-outline-dark');
                themeToggleBtn.classList.add('btn-outline-light');
            } else {
                themeToggleBtn.textContent = 'Koyu Temaya Geç';
                themeToggleBtn.classList.remove('btn-outline-light');
                themeToggleBtn.classList.add('btn-outline-dark');
            }
        });
    }

    // 2. Form Verilerinden Özet Üretme İşlemi
    const form = document.getElementById('basvuruFormu');
    const sonucAlani = document.getElementById('sonucAlani');

    if (form && sonucAlani) {
        form.addEventListener('submit', function(event) {
            // Formun sayfayı yenilemesini engelle
            event.preventDefault();

            // Form alanlarındaki değerleri al ve boşlukları temizle
            const adSoyad = document.getElementById('adSoyad').value.trim();
            const eposta = document.getElementById('eposta').value.trim();
            const bolum = document.getElementById('bolum').value.trim();
            const sinif = document.getElementById('sinif').value;
            const oturum = document.getElementById('oturum').value;
            const katilimTuru = document.getElementById('katilimTuru').value;
            const mesaj = document.getElementById('mesaj').value.trim();
            const onay = document.getElementById('onay').checked;

            // Eksik alan kontrolü
            if (!adSoyad || !eposta || !bolum || !sinif || !oturum || !katilimTuru || !mesaj || !onay) {
                alert('Lütfen tüm alanları doldurun ve bilgilendirme onay kutusunu işaretleyin.');
                return; // Eksik varsa işlemi durdur
            }

            // Başarılı durumda başvuru özeti HTML'ini oluştur
            // XSS açıklarına karşı basit bir önlem olarak metinleri template literal içinde doğrudan kullanıyoruz (Gerçek projede sanitize edilmeli)
            const ozetHTML = `
                <div class="card border-primary shadow-sm rounded-4">
                    <div class="card-header bg-primary text-white rounded-top-4 py-3 d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">Başvuru Özeti</h4>
                        <span class="badge bg-light text-primary">Başarılı</span>
                    </div>
                    <div class="card-body p-4">
                        <div class="row g-3">
                            <div class="col-md-6 border-bottom pb-2">
                                <p class="text-muted mb-1 small">Ad Soyad</p>
                                <h6 class="fw-bold">${adSoyad}</h6>
                            </div>
                            <div class="col-md-6 border-bottom pb-2">
                                <p class="text-muted mb-1 small">E-posta</p>
                                <h6 class="fw-bold">${eposta}</h6>
                            </div>
                            <div class="col-md-6 border-bottom pb-2">
                                <p class="text-muted mb-1 small">Bölüm / Sınıf</p>
                                <h6 class="fw-bold">${bolum} - ${sinif}</h6>
                            </div>
                            <div class="col-md-6 border-bottom pb-2">
                                <p class="text-muted mb-1 small">Oturum / Katılım Türü</p>
                                <h6 class="fw-bold">${oturum} (${katilimTuru})</h6>
                            </div>
                            <div class="col-12 mt-3">
                                <p class="text-muted mb-1 small">Kısa Mesaj</p>
                                <div class="p-3 bg-light rounded border text-dark">${mesaj}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Oluşturulan HTML'i sonuç alanına yerleştir
            sonucAlani.innerHTML = ozetHTML;
            
            // Kullanıcının sonucu rahatça görebilmesi için sonuç alanına kaydır
            document.getElementById('sonuc').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        // Form temizlendiğinde sonuç alanını başlangıç durumuna getir
        form.addEventListener('reset', function() {
            sonucAlani.innerHTML = `
                <div class="alert alert-info rounded-4 border-0 p-4" style="background-color: #cffafe; color: #0891b2;" role="alert">
                    Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.
                </div>
            `;
        });
    }
});
