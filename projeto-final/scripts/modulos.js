export function abrirMenu() {
  const botaoMenu = document.querySelector("#botao-menu");
  const navegacao = document.querySelector("#navegacao");
  if (!botaoMenu || !navegacao) return;

  botaoMenu.addEventListener("click", () => {
    const aberta = botaoMenu.getAttribute("aria-expanded") === "true";
    botaoMenu.setAttribute("aria-expanded", String(!aberta));
    botaoMenu.setAttribute("aria-label", aberta ? "Abrir menu" : "Fechar menu");
    navegacao.classList.toggle("aberta", !aberta);
  });
}
