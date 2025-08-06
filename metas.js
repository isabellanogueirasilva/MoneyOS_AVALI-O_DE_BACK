let metas = [];

function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
}

function abrirFormulario() {
  document.getElementById("formularioMeta").style.display = "flex";
}

function fecharFormulario() {
  document.getElementById("formularioMeta").style.display = "none";
  document.querySelector("form").reset();
}

function salvarMeta(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeMeta").value;
  const valorObjetivo = +document.getElementById("valorObjetivo").value;
  const valorAtual = +document.getElementById("valorAtual").value;
  const dataLimite = document.getElementById("dataLimite").value;
  const categoria = document.getElementById("categoriaMeta").value;
  const itens = document.getElementById("itensMeta").value;
  const estrategia = document.getElementById("estrategiaMeta").value;

  metas.push({ nome, valorObjetivo, valorAtual, dataLimite, categoria, itens, estrategia });

  fecharFormulario();
  renderMetas();
}

function renderMetas() {
  const container = document.getElementById("listaMetas");
  container.innerHTML = "";

  let concluida = 0;
  let alertas = [];

  metas.forEach((meta, index) => {
    const porcentagem = Math.floor((meta.valorAtual / meta.valorObjetivo) * 100);
    const diasRestantes = Math.floor((new Date(meta.dataLimite) - new Date()) / (1000 * 60 * 60 * 24));

    let classe = "";
    if (porcentagem >= 100) {
      concluida++;
    } else if (diasRestantes < 5 && porcentagem < 80) {
      classe = "meta pendente";
      alertas.push(`⚠️ Meta '${meta.nome}' vence em ${diasRestantes} dias. Progresso atual: ${porcentagem}%`);
    } else if (diasRestantes < 0) {
      classe = "meta atrasada";
      alertas.push(`🚨 Meta '${meta.nome}' está vencida!`);
    } else {
      classe = "meta";
    }

    container.innerHTML += `
      <div class="${classe}">
        <strong>${meta.nome}</strong> — ${porcentagem}%
        <div class="barra"><span style="width:${porcentagem}%"></span></div>
        <div class="acoes">
          <button onclick="editarMeta(${index})">✏️</button>
          <button onclick="excluirMeta(${index})">🗑️</button>
        </div>
      </div>
    `;
  });

  document.getElementById("totalMetas").innerText = metas.length;
  document.getElementById("metasConcluidas").innerText = concluida;
  document.getElementById("alertas").innerHTML = alertas.join("<br>");
}

function excluirMeta(index) {
  if (confirm("Deseja realmente excluir esta meta?")) {
    metas.splice(index, 1);
    renderMetas();
  }
}

function editarMeta(index) {
  const meta = metas[index];
  abrirFormulario();
  document.getElementById("nomeMeta").value = meta.nome;
  document.getElementById("valorObjetivo").value = meta.valorObjetivo;
  document.getElementById("valorAtual").value = meta.valorAtual;
  document.getElementById("dataLimite").value = meta.dataLimite;
  document.getElementById("categoriaMeta").value = meta.categoria;
  document.getElementById("itensMeta").value = meta.itens;
  document.getElementById("estrategiaMeta").value = meta.estrategia;

  metas.splice(index, 1); 
}

document.getElementById("buscaMeta").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  document.querySelectorAll(".meta").forEach(el => {
    el.style.display = el.textContent.toLowerCase().includes(termo) ? "block" : "none";
  });
});

document.getElementById("filtroStatus").addEventListener("change", function () {
  const status = this.value;
  document.querySelectorAll(".meta").forEach(el => {
    const texto = el.textContent.toLowerCase();
    const isConcluida = texto.includes("100%");
    if (status === "todas") {
      el.style.display = "block";
    } else if (status === "concluida" && isConcluida) {
      el.style.display = "block";
    } else if (status === "andamento" && !isConcluida) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
});
