const botaoMenu = document.querySelector("#botao-menu");
const navegacao = document.querySelector("#navegacao");

if (botaoMenu && navegacao) {
  botaoMenu.addEventListener("click", () => {
    const aberta = botaoMenu.getAttribute("aria-expanded") === "true";
    botaoMenu.setAttribute("aria-expanded", String(!aberta));
    botaoMenu.setAttribute("aria-label", aberta ? "Abrir menu" : "Fechar menu");
    navegacao.classList.toggle("aberta", !aberta);
  });
}

async function carregarDestaques() {
  const caixa = document.querySelector("#destaques");
  if (!caixa) return;

  try {
    const resposta = await fetch("data/cafeterias.json");
    if (!resposta.ok) throw new Error("Falha ao buscar dados.");
    const dados = await resposta.json();
    const embaralhados = [...dados].sort(() => Math.random() - 0.5);

    caixa.innerHTML = embaralhados.slice(0, 3).map((item) => `
      <article class="cartao-destaque">
        <img src="imagens/${item.imagem}" alt="Ilustração de ${item.nome}" width="600" height="400" loading="lazy">
        <div>
          <p>${item.bairro} · ${item.metodo}</p>
          <h3>${item.nome}</h3>
          <p>${item.descricao}</p>
          <a href="cafeterias.html">Ver cafeterias</a>
        </div>
      </article>
    `).join("");
  } catch (erro) {
    caixa.innerHTML = "<p>Não foi possível carregar os destaques no momento.</p>";
  }
}

carregarDestaques();
