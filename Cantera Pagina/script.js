// Manejo del formulario de reservas
document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('¡Reserva registrada con éxito! Nos pondremos en contacto para confirmar tu espacio.');
  this.reset();
});

// Control del widget de Chatbot
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
}

function openChatbot(topic) {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.style.display = 'block';
  const chatBody = document.getElementById('chat-body');
  chatBody.innerHTML += `<p><strong>Sistema:</strong> Hola, has seleccionado: ${topic}. Escribe tus datos y te responderemos pronto.</p>`;
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');
  
  if (input.value.trim() !== '') {
    chatBody.innerHTML += `<p><strong>Tú:</strong> ${input.value}</p>`;
    input.value = '';
    
    setTimeout(() => {
      chatBody.innerHTML += `<p><strong>Bot:</strong> ¡Gracias por escribir! Un asesor te atenderá enseguida.</p>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  }
}