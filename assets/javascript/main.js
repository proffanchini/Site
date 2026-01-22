/* ================================
   PARTICLES.JS - Matemática + Rede
   ================================ */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// símbolos matemáticos flutuantes
const mathSymbols = ["π", "Σ", "∞", "√", "%", "θ", "Δ", "∫", "≈", "≡", "≠", "±", "α", "β", "γ", "λ", "Ω", "Π", "∂", "∑", "∏", "∇", "∝", "∴", "∵", "→", "↔", "⊂", "⊃", "∈", "∉", "∧", "∨", "⊗", "⊕"];

// partículas base (pontos)
const particlesArray = [];
const numberOfParticles = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 1.2;
    this.speedY = (Math.random() - 0.5) * 1.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// símbolos matemáticos animados
class SymbolParticle {
  constructor() {
    this.text = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 14;
    this.speedY = Math.random() * 0.6 + 0.2;
    this.opacity = Math.random() * 0.6 + 0.3;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -20) {
      this.y = canvas.height + 20;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.font = `${this.size}px serif`;
    ctx.fillText(this.text, this.x, this.y);
  }
}

// criar partículas
for (let i = 0; i < numberOfParticles; i++) {
  particlesArray.push(new Particle());
}

// criar símbolos
const symbolArray = [];
for (let i = 0; i < 15; i++) {
  symbolArray.push(new SymbolParticle());
}

// conectar partículas com linhas
function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// animação principal
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  symbolArray.forEach(s => {
    s.update();
    s.draw();
  });

  connectParticles();

  requestAnimationFrame(animate);
}

animate();

// ajustar ao redimensionar
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ================================
   FORMULÁRIO DE CONTATO - WhatsApp
   ================================ */

// Formatação de telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
  telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    
    e.target.value = value.trim();
  });
}

// ============================================
// CONFIGURAÇÃO: NÚMERO DO WHATSAPP
// ============================================
// WhatsApp Business: 5511953117226
// ============================================
const WHATSAPP_NUMBER = '5511953117226';

// Função para formatar mensagem
function formatarMensagemWhatsApp(formData) {
  const nome = formData.get('nome');
  const telefone = formData.get('telefone');
  const email = formData.get('email') || 'Não informado';
  const servico = formData.get('servico');
  const mensagem = formData.get('mensagem');

  const texto = `*Nova Solicitação de Contato*

*Nome:* ${nome}
*Telefone:* ${telefone}
*E-mail:* ${email}
*Serviço de Interesse:* ${servico}

*Mensagem:*
${mensagem}

---
_Enviado através do site_`;

  return encodeURIComponent(texto);
}

// Interceptar submit do formulário
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    
    // Validação básica
    if (!formData.get('nome') || !formData.get('telefone') || !formData.get('servico') || !formData.get('mensagem')) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Formatar mensagem
    const mensagemFormatada = formatarMensagemWhatsApp(formData);
    
    // Criar URL do WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemFormatada}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Feedback visual no botão
    const btn = document.getElementById('btnWhatsApp');
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '<svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.763.372-.248.297-.945.923-.945 2.256 0 1.333.972 2.617 1.108 2.797.136.18 1.916 2.915 4.644 4.086.649.288 1.156.46 1.55.587.622.203 1.188.174 1.632.105.478-.074 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> Redirecionando...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = textoOriginal;
      btn.disabled = false;
    }, 2000);
  });
}

/* ================================
   NAVBAR SCROLL BEHAVIOR
   ================================ */
const navbar = document.getElementById('mainNavbar');
if (navbar) {
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

/* ================================
   SMOOTH SCROLL
   ================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Fechar menu mobile se estiver aberto
      const navMenu = document.getElementById('navMenu');
      if (navMenu && navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  });
});

/* ================================
   FOOTER - Ano Atual
   ================================ */
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}