if (localStorage.getItem("logado") !== "true") {
  window.location.href = "index.html";
}

const form = document.getElementById("lancheForm");
const lista = document.getElementById("listaLanches");

let lanches = JSON.parse(localStorage.getItem("lanches")) || [];

function salvarLocalStorage() {
  localStorage.setItem("lanches", JSON.stringify(lanches));
}

function renderizarLista() {
  lista.innerHTML = "";
  lanches.forEach((lanche, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${lanche.nome}</strong> - ${lanche.codigo}
      <button onclick="editarLanche(${index})">Editar</button>
      <button onclick="excluirLanche(${index})">Excluir</button>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeLanche").value;
  const codigo = document.getElementById("codigoLanche").value;

  if (form.dataset.editando) {
    const index = parseInt(form.dataset.editando);
    lanches[index] = { nome, codigo };
    delete form.dataset.editando;
    form.querySelector("button").textContent = "Salvar";
  } else {
    lanches.push({ nome, codigo });
  }

  salvarLocalStorage();
  renderizarLista();
  form.reset();
});

function editarLanche(index) {
  const lanche = lanches[index];
  document.getElementById("editNome").value = lanche.nome;
  document.getElementById("editCodigo").value = lanche.codigo;

  const dialog = document.getElementById("editDialog");
  dialog.dataset.index = index;
  dialog.showModal();
}

function fecharDialog() {
  document.getElementById("editDialog").close();
}

document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const index = document.getElementById("editDialog").dataset.index;
  const nome = document.getElementById("editNome").value;
  const codigo = document.getElementById("editCodigo").value;

  lanches[index] = { nome, codigo };
  salvarLocalStorage();
  renderizarLista();
  fecharDialog();
});

function excluirLanche(index) {
  if (confirm("Deseja realmente excluir este lanche?")) {
    lanches.splice(index, 1);
    salvarLocalStorage();
    renderizarLista();
  }
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

renderizarLista();
