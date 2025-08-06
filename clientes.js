document.getElementById('toggleTheme').onclick = () => {
  document.body.classList.toggle('dark');
};

let clients = JSON.parse(localStorage.getItem('moneyos_clients') || '[]');

const tableBody = document.querySelector('#clientsTable tbody');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

function saveClients() {
  localStorage.setItem('moneyos_clients', JSON.stringify(clients));
}

function renderTable() {
  const filterText = searchInput.value.toLowerCase();
  const statusVal = statusFilter.value;
  tableBody.innerHTML = '';
  clients.filter(c => {
    const matchesText = c.name.toLowerCase().includes(filterText);
    const matchesStatus = (statusVal === 'all' || c.status === statusVal);
    return matchesText && matchesStatus;
  }).forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td>${c.company}</td>
      <td>${c.status}</td>
      <td>
        <button onclick="editClient('${c.id}')">✏️</button>
        <button onclick="deleteClient('${c.id}')">🗑️</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}


const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const form = document.getElementById('clientForm');

openModal.onclick = () => modal.classList.remove('hidden');
closeModal.onclick = () => modal.classList.add('hidden');

// CRUD
function generateId() {
  return Date.now().toString(36);
}

form.onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!data.id) data.id = generateId();
  const existing = clients.find(c => c.id === data.id);
  if (existing) {
    Object.assign(existing, data);
  } else {
    clients.push(data);
  }
  saveClients();
  renderTable();
  form.reset();
  modal.classList.add('hidden');
};

window.editClient = id => {
  const client = clients.find(c => c.id === id);
  if (client) {
    for (const [key, val] of Object.entries(client)) {
      form.elements[key].value = val;
    }
    modal.classList.remove('hidden');
  }
};

window.deleteClient = id => {
  clients = clients.filter(c => c.id !== id);
  saveClients();
  renderTable();
};


searchInput.oninput = renderTable;
statusFilter.onchange = renderTable;


renderTable();