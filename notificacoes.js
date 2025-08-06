document.getElementById('toggleTheme').onclick = () => {
  document.body.classList.toggle('dark');
};

let notifications = JSON.parse(localStorage.getItem('moneyos_notifications') || '[]');
const notificationList = document.getElementById('notificationList');
const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const filterStatus = document.getElementById('filterStatus');

function renderNotifications() {
  const search = searchInput.value.toLowerCase();
  const typeFilter = filterType.value;
  const statusFilter = filterStatus.value;

  notificationList.innerHTML = '';

  notifications.filter(n => {
    return (
      n.title.toLowerCase().includes(search) &&
      (typeFilter === 'all' || n.type === typeFilter) &&
      (statusFilter === 'all' || n.status === statusFilter)
    );
  }).forEach(n => {
    const card = document.createElement('div');
    card.className = `card ${n.status}`;
    card.innerHTML = `
      <h3>${n.title}</h3>
      <p>${n.message}</p>
      <small>${n.date}</small>
      <div class="card-actions">
        <button onclick="toggleRead('${n.id}')">${n.status === 'naoLida' ? 'Marcar lida' : 'Marcar não lida'}</button>
        <button onclick="deleteNotification('${n.id}')">Excluir</button>
      </div>`;
    notificationList.appendChild(card);
  });
}

function saveNotifications() {
  localStorage.setItem('moneyos_notifications', JSON.stringify(notifications));
}

window.toggleRead = id => {
  const n = notifications.find(n => n.id === id);
  if (n) {
    n.status = n.status === 'naoLida' ? 'lida' : 'naoLida';
    saveNotifications();
    renderNotifications();
  }
};

window.deleteNotification = id => {
  notifications = notifications.filter(n => n.id !== id);
  saveNotifications();
  renderNotifications();
};

document.getElementById('markAllRead').onclick = () => {
  notifications.forEach(n => n.status = 'lida');
  saveNotifications();
  renderNotifications();
};

document.getElementById('clearAll').onclick = () => {
  notifications = [];
  saveNotifications();
  renderNotifications();
};

searchInput.oninput = renderNotifications;
filterType.onchange = renderNotifications;
filterStatus.onchange = renderNotifications;

if (notifications.length === 0) {
  notifications = [
    { id: '1', title: 'Pagamento Recebido', message: 'Você recebeu R$ 500,00 de João.', type: 'financeiro', status: 'naoLida', date: new Date().toLocaleString('pt-BR') },
    { id: '2', title: 'Produto em Baixo Estoque', message: 'Produto "Café" está com estoque baixo.', type: 'produto', status: 'naoLida', date: new Date().toLocaleString('pt-BR') },
    { id: '3', title: 'Novo Cliente Cadastrado', message: 'Maria Souza foi adicionada como cliente.', type: 'cliente', status: 'lida', date: new Date().toLocaleString('pt-BR') }
  ];
  saveNotifications();
}

renderNotifications();
