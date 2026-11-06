const botaoDeNav = document.querySelector("#botao-nav");
const barraNavegacao = document.querySelector("#barra-navegacao");
function fecharMenu() {
  barraNavegacao.classList.remove("exibir");
  botaoDeNav.setAttribute("aria-expanded", "false");
  botaoDeNav.setAttribute("aria-label", "Abrir menu");
  botaoDeNav.textContent = "☰";
}
botaoDeNav.addEventListener("click", () => {
  const aberto = barraNavegacao.classList.toggle("exibir");
  botaoDeNav.setAttribute("aria-expanded", String(aberto));
  botaoDeNav.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  botaoDeNav.textContent = aberto ? "×" : "☰";
});
document.addEventListener("keydown", (evento) => {
  if (
    evento.key === "Escape" &&
    botaoDeNav.getAttribute("aria-expanded") === "true"
  ) {
    fecharMenu();
    botaoDeNav.focus();
  }
});
window.matchMedia("(min-width: 700px)").addEventListener("change", fecharMenu);
