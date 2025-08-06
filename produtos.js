document.getElementById('toggleTheme').onclick = () => {
  document.body.classList.toggle('dark');
};

let products = JSON.parse(localStorage.getItem('moneyos_products') || '[]');
let categories = JSON.parse(localStorage.getItem('moneyos_categories') || '["Geral"]');

const productList = document.querySelector('#productList tbody');
const productForm = document.getElementById('productForm');
const modal = document.getElementById('modal');
const categorySelect = productForm.elements['category'];
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const categoryFilter = document.getElementById('categoryFilter');
const toggleViewBtn = document.getElementById('toggleView');
const addCategoryBtn = document.getElementById('addCategory');

const totalProductsEl = document.getElementById('totalProducts');
const outOfStockEl = document.getElementById('outOfStock');
const totalValueEl = document.getElementById('totalValue');

function loadCategories() {
  categorySelect.innerHTML = '';
  categoryFilter.innerHTML = '<option value="all">Todas Categorias</option>';
  categories.forEach(cat => {
    categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}
loadCategories();

let viewMode = 'table';

function updateStats() {
  const total = products.length;
  const outOfStock = products.filter(p => p.status === 'esgotado' || p.quantity <= 0).length;
  const totalValue = products.reduce((acc, p) => acc + (parseFloat(p.price) * parseInt(p.quantity)), 0);
  
  totalProductsEl.textContent = total;
  outOfStockEl.textContent = outOfStock;
  totalValueEl.textContent = totalValue.toFixed(2);
}

function renderProducts() {
  const filterText = searchInput.value.toLowerCase();
  const filterStatus = statusFilter.value;
  const filterCategory = categoryFilter.value;

  if (viewMode === 'table') {
    document.querySelector('#productList').className = 'table-view';
    document.querySelector('#productList').innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Nome</th><th>Categoria</th><th>Unidade</th><th>Preço Unitário</th><th>Quantidade</th><th>Status</th><th>Atualização</th><th>Ações</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>`;
    const tbody = document.querySelector('#productList tbody');

    products.filter(p => {
      return (
        p.name.toLowerCase().includes(filterText) &&
        (filterStatus === 'all' || p.status === filterStatus) &&
        (filterCategory === 'all' || p.category === filterCategory)
      );
    }).forEach(p => {
      const alertEstoque = p.quantity < 5 ? '⚠️' : '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.unit}</td>
        <td>R$ ${parseFloat(p.price).toFixed(2)}</td>
        <td>${p.quantity} ${alertEstoque}</td>
        <td>${p.status}</td>
        <td>${p.updatedAt}</td>
        <td>
          <button onclick="editProduct('${p.id}')">✏️</button>
          <button onclick="deleteProduct('${p.id}')">🗑️</button>
        </td>`;
      tbody.appendChild(tr);
    });
  } else {
    document.querySelector('#productList').className = 'card-view';
    document.querySelector('#productList').innerHTML = '';
    products.forEach(p => {
      const div = document.createElement('div');
      div.className = 'card';
      const alertEstoque = p.quantity < 5 ? '<p style="color:red;">⚠️ Estoque Baixo</p>' : '';
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>Unidade: ${p.unit}</p>
        <p>Preço: R$ ${parseFloat(p.price).toFixed(2)}</p>
        <p>Qtd: ${p.quantity}</p>
        <p>Status: ${p.status}</p>
        <p><small>${p.updatedAt}</small></p>
        ${alertEstoque}
        <button onclick="editProduct('${p.id}')">Editar</button>
        <button onclick="deleteProduct('${p.id}')">Excluir</button>`;
      document.querySelector('#productList').appendChild(div);
    });
  }

  updateStats();
}
renderProducts();

toggleViewBtn.onclick = () => {
  viewMode = viewMode === 'table' ? 'cards' : 'table';
  renderProducts();
};

document.getElementById('openModal').onclick = () => {
  modal.classList.remove('hidden');
};
document.getElementById('closeModal').onclick = () => {
  modal.classList.add('hidden');
  productForm.reset();
};

productForm.onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(productForm));
  if (!data.id) data.id = Date.now().toString(36);
  data.updatedAt = new Date().toLocaleString('pt-BR');

  const existing = products.find(p => p.id === data.id);
  if (existing) Object.assign(existing, data);
  else products.push(data);

  localStorage.setItem('moneyos_products', JSON.stringify(products));
  modal.classList.add('hidden');
  productForm.reset();
  renderProducts();
};

window.editProduct = id => {
  const p = products.find(p => p.id === id);
  for (const key in p) {
    if (productForm.elements[key]) productForm.elements[key].value = p[key];
  }
  modal.classList.remove('hidden');
};

window.deleteProduct = id => {
  products = products.filter(p => p.id !== id);
  localStorage.setItem('moneyos_products', JSON.stringify(products));
  renderProducts();
};

const categoryModal = document.getElementById('categoryModal');
addCategoryBtn.onclick = () => categoryModal.classList.remove('hidden');
document.getElementById('closeCategoryModal').onclick = () => categoryModal.classList.add('hidden');
document.getElementById('saveCategory').onclick = () => {
  const newCat = document.getElementById('newCategory').value;
  if (newCat && !categories.includes(newCat)) {
    categories.push(newCat);
    localStorage.setItem('moneyos_categories', JSON.stringify(categories));
    loadCategories();
  }
  categoryModal.classList.add('hidden');
};

searchInput.oninput = renderProducts;
statusFilter.onchange = renderProducts;
categoryFilter.onchange = renderProducts;
