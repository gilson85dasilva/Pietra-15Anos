  document.addEventListener('DOMContentLoaded', function() {
            // Elementos DOM
            const heartButton = document.getElementById('heartButton');
            const envelope = document.getElementById('envelope');
            const envelopeContainer = document.getElementById('envelopeContainer');
            const envelopeSection = document.getElementById('envelopeSection');
            const invitationSection = document.getElementById('invitationSection');
            const backBtn = document.getElementById('backBtn');
            const confettiElement = document.getElementById('confetti');
            const qrCodeElement = document.getElementById('qrcode');
            
            // Estado da aplicação
            let isInvitationOpen = false;
            
            // Gerar QR Code
            function generateQRCode() {
                const qrText = "https://wa.me/55553599781660?text=Olá%20Pietra,%20confirmo%20minha%20presença%20no%20seu%20aniversário%20de%2015%20anos!";
                const qrSize = window.innerWidth < 768 ? 150 : 180;
                
                const canvas = document.createElement('canvas');
                qrCodeElement.appendChild(canvas);
                
                // Simulação de geração de QR Code
                canvas.width = qrSize;
                canvas.height = qrSize;
                const ctx = canvas.getContext('2d');
                
                // Fundo branco
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Desenho do QR Code (simulado)
                ctx.fillStyle = '#3a2e3a';
                
                // Padrão de QR Code
                const size = 8;
                const padding = 10;
                
                // Cantos
                ctx.fillRect(padding, padding, size*7, size*7);
                ctx.fillRect(canvas.width - padding - size*7, padding, size*7, size*7);
                ctx.fillRect(padding, canvas.height - padding - size*7, size*7, size*7);
                
                // Padrão interno
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        if (Math.random() > 0.3) {
                            ctx.fillRect(
                                padding + 20 + i*size*2, 
                                padding + 20 + j*size*2, 
                                size, 
                                size
                            );
                        }
                    }
                }
            }
            
            // Efeito de confete
            function createConfetti() {
                confettiElement.style.display = 'block';
                
                // Criar elementos de confete
                const colors = ['#f48fb1', '#e8c39e', '#d4af37', '#f8bbd0', '#ffffff'];
                for (let i = 0; i < 120; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti-piece';
                    confetti.style.cssText = `
                        position: fixed;
                        width: ${Math.random() * 10 + 6}px;
                        height: ${Math.random() * 10 + 6}px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        top: -20px;
                        left: ${Math.random() * 100}%;
                        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                        opacity: ${Math.random() * 0.5 + 0.5};
                        z-index: 1000;
                        animation: confetti-fall ${Math.random() * 3 + 2}s ease-in forwards;
                    `;
                    
                    document.body.appendChild(confetti);
                    
                    // Remover após animação
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.parentNode.removeChild(confetti);
                        }
                    }, 5000);
                }
                
                // Adicionar estilo de animação
                const style = document.createElement('style');
                style.innerHTML = `
                    @keyframes confetti-fall {
                        0% { 
                            transform: translateY(0) rotate(0deg) scale(1); 
                            opacity: 1;
                        }
                        80% {
                            opacity: 0.8;
                        }
                        100% { 
                            transform: translateY(100vh) rotate(${Math.random() * 720}deg) scale(0.5); 
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Abrir envelope
            function openEnvelope() {
                if (isInvitationOpen) return;
                isInvitationOpen = true;
                
                // Animação de abertura
                envelope.classList.add('open');
                
                setTimeout(() => {
                    envelopeSection.style.opacity = '0';
                    envelopeSection.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        invitationSection.classList.add('visible');
                        backBtn.style.display = 'flex';
                        
                        // Efeito de confete
                        createConfetti();
                        
                        // Scroll para a seção do convite
                        invitationSection.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }, 800);
            }
            
            // Fechar convite e voltar para o envelope
            function closeInvitation() {
                isInvitationOpen = false;
                invitationSection.classList.remove('visible');
                backBtn.style.display = 'none';
                
                setTimeout(() => {
                    envelopeSection.style.opacity = '1';
                    envelopeSection.style.transform = 'translateY(0)';
                    envelope.classList.remove('open');
                    
                    // Scroll para o envelope
                    envelopeSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
            
            // Event listeners
            heartButton.addEventListener('click', openEnvelope);
            envelope.addEventListener('click', openEnvelope);
            backBtn.addEventListener('click', closeInvitation);
            
            // Inicialização
            generateQRCode();
        });