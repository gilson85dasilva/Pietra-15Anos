// Elementos DOM
const heartButton = document.getElementById('heartButton');
const envelope = document.getElementById('envelope');
const envelopeContainer = document.getElementById('envelopeContainer');
const invitationContainer = document.getElementById('invitationContainer');
const mapLink = document.getElementById('mapLink');
const whatsappLink = document.getElementById('whatsappLink');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// Configurar dimensões do canvas
function setupCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

// Efeito de confete personalizado
function createConfetti() {
    const particles = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: -20,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 3 + 2,
            color: ['#FF4081', '#E91E63', '#FFD700', '#D4AF37', '#FFFFFF'][Math.floor(Math.random() * 5)],
            shape: Math.random() > 0.5 ? 'circle' : 'rect',
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        particles.forEach((p, index) => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            
            p.y += p.speed;
            p.rotation += p.rotationSpeed;
            
            if (p.shape === 'circle') {
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            } else {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
            }
            
            ctx.fill();
            
            // Remover partículas que saíram da tela
            if (p.y > confettiCanvas.height + 20) {
                particles.splice(index, 1);
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Animação de abertura do envelope
function openEnvelope() {
    // Animação do envelope com anime.js
    anime.timeline({
        easing: 'easeInOutQuad',
        duration: 1000
    })
    .add({
        targets: '.flap',
        rotateX: 180,
    })
    .add({
        targets: envelopeContainer,
        scale: 0.8,
        opacity: 0,
        duration: 800,
        easing: 'easeInOutQuad',
        complete: function() {
            envelopeContainer.style.display = 'none';
            invitationContainer.style.display = 'flex';
            invitationContainer.classList.add('fade-in');
            
            // Efeito de confete
            createConfetti();
            
            // Efeito de partículas com canvas-confetti
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
        }
    }, '-=300');
    
    // Animação do coração
    anime({
        targets: '#heartButton',
        scale: 0,
        opacity: 0,
        duration: 500,
        easing: 'easeInQuad'
    });
}

// Event Listeners
heartButton.addEventListener('click', openEnvelope);
envelope.addEventListener('click', openEnvelope);

// Configuração inicial
document.addEventListener('DOMContentLoaded', () => {
    setupCanvas();
    
    // Configuração do mapa
    const location = "Espaço Somas, R. Ciró Pereira da Silva, 127 - Palomos";
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    
    // Configuração do WhatsApp
    const phoneNumber = "5535999998888";
    const message = "Olá! Gostaria de confirmar minha presença na sua festa de 15 anos. :)";
    whatsappLink.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Animação de entrada do envelope
    anime({
        targets: envelopeContainer,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutElastic(1, .8)',
    });
});

// Redimensionar canvas quando a janela for redimensionada
window.addEventListener('resize', setupCanvas);