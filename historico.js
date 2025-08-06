document.getElementById('toggleTheme').onclick = () => {
  document.body.classList.toggle('dark');
};


const dataStore = {
  acessos: [],
  atividades: [],
  anexos: [],
  relatorios: []
};


Object.keys(dataStore).forEach(key => {
  const stored = JSON.parse(localStorage.getItem(`moneyos_${key}`));
  if (stored) dataStore[key] = stored;
});

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
    renderTable(tab.dataset.tab);
  };
});

function renderTable(type) {
  const tbody = document.querySelector(`#${type} tbody`);
  tbody.innerHTML = '';
  dataStore[type].forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}


renderTable('acessos');


let currentType = '';
function openModal(type) {
  currentType = type;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modalTitle').textContent = `Adicionar em ${type}`;
  const form = document.getElementById('modalForm');
  form.innerHTML = '';

  if (type === 'acessos') {
    form.innerHTML = `
      <input placeholder="ID Usuário" name="idUsuario">
      <input placeholder="IP" name="ip">
      <input placeholder="Navegador" name="navegador">
      <input type="datetime-local" name="data">
    `;
  } else if (type === 'atividades') {
    form.innerHTML = `
      <input placeholder="ID Usuário" name="idUsuario">
      <select name="tipo">
        <option value="Renda Manual">Renda Manual</option>
        <option value="Renda Mensal">Renda Mensal</option>
      </select>
      <input type="datetime-local" name="data">
    `;
  } else if (type === 'anexos') {
    form.innerHTML = `
      <input placeholder="ID Usuário" name="idUsuario">
      <input placeholder="Transação" name="transacao">
      <input placeholder="Nome do Arquivo" name="arquivo">
      <input placeholder="URL do Arquivo" name="url">
    `;
  } else if (type === 'relatorios') {
    form.innerHTML = `
      <input placeholder="ID Usuário" name="idUsuario">
      <input placeholder="Tipo" name="tipo">
      <input placeholder="Filtro Aplicado" name="filtro">
      <input type="datetime-local" name="geradoEm">
    `;
  }
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function saveData() {
  const form = document.getElementById('modalForm');
  const values = {};
  [...form.elements].forEach(el => {
    if (el.name) values[el.name] = el.value;
  });

  dataStore[currentType].push(values);
  localStorage.setItem(`moneyos_${currentType}`, JSON.stringify(dataStore[currentType]));

  renderTable(currentType);
  closeModal();
}


function exportData(type, format) {
  const rows = dataStore[type];
  if (!rows.length) return alert('Nenhum dado para exportar.');

  if (format === 'csv') {
    const header = Object.keys(rows[0]).join(',');
    const body = rows.map(r => Object.values(r).join(',')).join('\n');
    const blob = new Blob([header + '\n' + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}.csv`;
    a.click();
  } else if (format === 'pdf') {
    alert('Exportação para PDF será implementada futuramente.');
  }
}
