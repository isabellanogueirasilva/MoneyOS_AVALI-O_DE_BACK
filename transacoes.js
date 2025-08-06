const form = document.getElementById("form-transacao");
const tabela = document.getElementById("tabela-transacoes");
const entradas = document.getElementById("total-entradas");
const saidas = document.getElementById("total-saidas");
const saldo = document.getElementById("saldo-total");
const alerta = document.getElementById("alerta-gastos");

const filtroTipo = document.getElementById("filtro-tipo");
const filtroCategoria = document.getElementById("filtro-categoria");
const buscaNome = document.getElementById("busca-nome");

let transacoes = [];

function atualizarTabela() {
  tabela.innerHTML = "";
  let totalEntrada = 0;
  let totalSaida = 0;

  transacoes
    .filter((t) => {
      return (
        (!filtroTipo.value || t.tipo === filtroTipo.value) &&
        (!filtroCategoria.value || t.categoria === filtroCategoria.value) &&
        (!buscaNome.value || t.descricao.toLowerCase().includes(buscaNome.value.toLowerCase()))
      );
    })
    .forEach((t, index) => {
      const row = tabela.insertRow();
      row.innerHTML = `
        <td>${t.descricao}</td>
        <td>R$ ${parseFloat(t.valor).toFixed(2)}</td>
        <td>${t.tipo}</td>
        <td>${t.categoria}</td>
        <td>
          <button onclick="editarTransacao(${index})">✏</button>
          <button onclick="excluirTransacao(${index})">🗑</button>
        </td>
      `;
      if (t.tipo === "entrada") totalEntrada += parseFloat(t.valor);
      if (t.tipo === "saida") totalSaida += parseFloat(t.valor);
    });

  entradas.textContent = totalEntrada.toFixed(2);
  saidas.textContent = totalSaida.toFixed(2);
  saldo.textContent = (totalEntrada - totalSaida).toFixed(2);

  if (transacoes.filter(t => t.categoria === "alimentacao" && t.tipo === "saida")
                .reduce((acc, cur) => acc + parseFloat(cur.valor), 0) > 500) {
    alerta.textContent = "Gastos em ‘Alimentação’ já ultrapassam R$ 500 este mês.";
  } else {
    alerta.textContent = "";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value.trim();
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;
  const categoria = document.getElementById("categoria").value;

  if (!descricao || isNaN(valor) || !tipo || !categoria) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  transacoes.push({ descricao, valor, tipo, categoria });
  form.reset();
  atualizarTabela();
});

function editarTransacao(index) {
  const t = transacoes[index];
  document.getElementById("descricao").value = t.descricao;
  document.getElementById("valor").value = t.valor;
  document.getElementById("tipo").value = t.tipo;
  document.getElementById("categoria").value = t.categoria;
  transacoes.splice(index, 1);
  atualizarTabela();
}

function excluirTransacao(index) {
  if (confirm("Tem certeza que deseja excluir esta transação?")) {
    transacoes.splice(index, 1);
    atualizarTabela();
  }
}

[filtroTipo, filtroCategoria, buscaNome].forEach((el) =>
  el.addEventListener("input", atualizarTabela)
);


document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

atualizarTabela();
