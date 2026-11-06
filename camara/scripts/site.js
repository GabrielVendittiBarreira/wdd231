const botaoMenu = document.querySelector("#botao-menu");
const navegacao = document.querySelector("#navegacao");
function alternarMenu(aberto) {
  navegacao.classList.toggle("aberta", aberto);
  botaoMenu.setAttribute("aria-expanded", String(aberto));
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  botaoMenu.textContent = aberto ? "×" : "☰";
}
botaoMenu.addEventListener("click", () => {
  alternarMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
});
document.addEventListener("keydown", (evento) => {
  if (
    evento.key === "Escape" &&
    botaoMenu.getAttribute("aria-expanded") === "true"
  ) {
    alternarMenu(false);
    botaoMenu.focus();
  }
});
window
  .matchMedia("(min-width: 760px)")
  .addEventListener("change", () => alternarMenu(false));
document.querySelector("#anoAtual").textContent = new Date().getFullYear();
document.querySelector("#ultimaModificacao").textContent =
  `Última modificação: ${document.lastModified}`;
