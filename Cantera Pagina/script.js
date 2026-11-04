// CONTROL SPA NAVEGACIÓN
function handleRouting() {
  const hash = window.location.hash || '#inicio';
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerBtn = document.getElementById('hamburger-btn');

  sections.forEach(sec => {
    if ('#' + sec.id === hash) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  navLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Cerrar menú móvil al cambiar de sección
  if (navMenu && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);

// CONTROL MENÚ HAMBURGUESA MÓVIL
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  renderCalendar();

  const timeButtons = document.querySelectorAll('.time-btn');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTime = btn.textContent;
    });
  });
});

// CALENDARIO DE RESERVAS
let selectedDay = null;
let selectedTime = null;

function renderCalendar() {
  const daysContainer = document.getElementById('calendar-days');
  if (!daysContainer) return;
  daysContainer.innerHTML = '';

  for (let day = 1; day <= 30; day++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'day-btn';
    btn.textContent = day;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedDay = day;
      document.getElementById('display-selected-date').textContent = `${day} de Noviembre, 2026`;
    });

    daysContainer.appendChild(btn);
  }
}

// SUBMIT Y CONFIRMACIÓN DE RESERVA
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedDay) {
      alert('Por favor selecciona una fecha en el calendario.');
      return;
    }
    
    if (!selectedTime) {
      alert('Por favor selecciona una franja horaria.');
      return;
    }

    const name = document.getElementById('user-name').value;
    const sport = document.getElementById('sport-select').value;

    alert(`¡Reserva confirmada con éxito!\n\nCliente: ${name}\nEspacio Físico: ${sport}\nFecha: ${selectedDay} de Noviembre, 2026\nFranja Horaria: ${selectedTime}`);
    
    this.reset();
    document.querySelectorAll('.day-btn, .time-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('display-selected-date').textContent = 'Ninguna';
    selectedDay = null;
    selectedTime = null;
  });
}

// CONTROL DEL CHATBOT
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
}

function openChatbot(topic) {
  toggleChat();
  const chatBody = document.getElementById('chat-body');
  chatBody.innerHTML += `<div class="bot-msg" style="margin-top:0.5rem;">Asunto: <strong>${topic}</strong>. Indícanos tu nombre y número para responderte.</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');
  
  if (input.value.trim() !== '') {
    chatBody.innerHTML += `<div style="text-align:right; margin-top:0.5rem;"><span style="background:var(--neon-green); color:#000; padding:0.5rem 0.8rem; border-radius:12px; display:inline-block; font-weight:700;">${input.value}</span></div>`;
    input.value = '';
    
    setTimeout(() => {
      chatBody.innerHTML += `<div class="bot-msg" style="margin-top:0.5rem;">Un representante del complejo te contactará enseguida.</div>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  }
}