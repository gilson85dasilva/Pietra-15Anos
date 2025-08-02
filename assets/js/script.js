  document.addEventListener('DOMContentLoaded', function() {
            const envelopePage = document.getElementById('envelopePage');
            const invitePage = document.getElementById('invitePage');
            const stamp = document.getElementById('stamp');
            const backBtn = document.getElementById('backBtn');
            
            // Gerar QR Code
            const qrText = "https://wa.me/5511999999999?text=Olá%20Pietra,%20confirmo%20minha%20presença%20no%20seu%20aniversário%20de%2015%20anos!";
            QRCode.toCanvas(document.getElementById('qrcode'), qrText, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#3a2e3a',
                    light: '#ffffff'
                }
            });
            
            // Gerar QR Code responsivo
            const qrSize = window.innerWidth < 768 ? 150 : 200;
            QRCode.toCanvas(document.getElementById('qrcode'), qrText, {
                width: qrSize,
                margin: 2,
                color: {
                    dark: '#3a2e3a',
                    light: '#ffffff'
                }
            });

            // Abrir convite ao clicar no selo
            stamp.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Efeito de abertura
                envelopePage.style.opacity = '0';
                setTimeout(() => {
                    envelopePage.style.display = 'none';
                    invitePage.style.display = 'block';
                    setTimeout(() => {
                        invitePage.style.opacity = '1';
                    }, 50);
                }, 500);
            });
            
            // Voltar para o envelope
            backBtn.addEventListener('click', function() {
                invitePage.style.opacity = '0';
                setTimeout(() => {
                    invitePage.style.display = 'none';
                    envelopePage.style.display = 'flex';
                    setTimeout(() => {
                        envelopePage.style.opacity = '1';
                    }, 50);
                }, 500);
            });
            
            // Efeito de carregamento
            setTimeout(() => {
                envelopePage.style.opacity = '1';
            }, 100);
        });