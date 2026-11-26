import { abrirMenu } from "./modulos.js";

const lista = document.querySelector("#lista-cafeterias");
const seletorBairro = document.querySelector("#filtro-bairro");
const botaoFavoritos = document.querySelector("#botao-favoritos");
const quantidade = document.querySelector("#quantidade");
const erroDados = document.querySelector("#erro-dados");
const modal = document.querySelector("#modal-cafeteria");
const modalTitulo = document.querySelector("#modal-titulo");
const modalConteudo = document.querySelector("#modal-conteudo");
const fecharModal = document.querySelector("#fechar-modal");

abrirMenu();

let cafeterias = [];
let somenteFavoritos = false;
const favoritos = new Set(JSON.parse(localStorage.getItem("rotaCafeFavoritos") || "[]"));

function salvarFavoritos() {
  localStorage.setItem("rotaCafeFavoritos", JSON.stringify([...favoritos]));
}

function atualizarControles() {
  const bairros = [...new Set(cafeterias.map((item) => item.bairro))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  seletorBairro.innerHTML =
    '<option value="todos">Todos os bairros</option>' +
    bairros.map((bairro) => `<option value="${bairro}">${bairro}</option>`).join("");
}

function renderizar() {
  const bairro = seletorBairro.value;
  const filtrados = cafeterias.filter((item) =>
    (bairro === "todos" || item.bairro === bairro) &&
    (!somenteFavoritos || favoritos.has(item.id))
  );

  quantidade.textContent = `${filtrados.length} cafeterias encontradas`;
  lista.innerHTML = filtrados.map((item) => `
    <article class="cartao-cafeteria">
      <img src="imagens/${item.imagem}" alt="Ilustração de ${item.nome}" width="600" height="400" loading="lazy">
      <div>
        <p class="bairro">${item.bairro} · ${item.metodo}</p>
        <h2>${item.nome}</h2>
        <p>${item.descricao}</p>
        <p><strong>Ambiente:</strong> ${item.ambiente} · <strong>${item.preco}</strong></p>
        <div class="acoes-cartao">
          <button type="button" data-detalhes="${item.id}">Ver detalhes</button>
          <button type="button" class="favorito" data-favorito="${item.id}" aria-pressed="${favoritos.has(item.id)}">
            ${favoritos.has(item.id) ? "♥ Favorito" : "♡ Favoritar"}
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function abrirDetalhes(id) {
  const item = cafeterias.find((cafeteria) => cafeteria.id === id);
  if (!item) return;
  modalTitulo.textContent = item.nome;
  modalConteudo.innerHTML = `
    <img src="imagens/${item.imagem}" alt="Ilustração de ${item.nome}" width="600" height="400">
    <p><strong>Endereço:</strong> ${item.endereco}</p>
    <p><strong>Método de preparo:</strong> ${item.metodo}</p>
    <p><strong>Ambiente:</strong> ${item.ambiente}</p>
    <p><strong>Faixa de preço:</strong> ${item.preco}</p>
  `;
  modal.showModal();
}

async function carregarDados() {
  try {
    const resposta = await fetch("data/cafeterias.json");
    if (!resposta.ok) throw new Error("Não foi possível acessar os dados.");
    cafeterias = await resposta.json();
    atualizarControles();
    renderizar();
  } catch (erro) {
    erroDados.hidden = false;
  }
}

seletorBairro.addEventListener("change", renderizar);
botaoFavoritos.addEventListener("click", () => {
  somenteFavoritos = !somenteFavoritos;
  botaoFavoritos.setAttribute("aria-pressed", String(somenteFavoritos));
  renderizar();
});
lista.addEventListener("click", (evento) => {
  const botaoDetalhes = evento.target.closest("[data-detalhes]");
  const botaoFavorito = evento.target.closest("[data-favorito]");
  if (botaoDetalhes) abrirDetalhes(Number(botaoDetalhes.dataset.detalhes));
  if (botaoFavorito) {
    const id = Number(botaoFavorito.dataset.favorito);
    favoritos.has(id) ? favoritos.delete(id) : favoritos.add(id);
    salvarFavoritos();
    renderizar();
  }
});
fecharModal.addEventListener("click", () => modal.close());
modal.addEventListener("click", (evento) => {
  if (evento.target === modal) modal.close();
});

carregarDados();
