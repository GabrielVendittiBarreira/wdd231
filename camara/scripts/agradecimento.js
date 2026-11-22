const parametros = new URLSearchParams(window.location.search);
const campos = ["nome", "sobrenome", "email", "celular", "organizacao", "datahora"];
const completo = campos.every((campo) => parametros.get(campo)?.trim());
document.querySelector("#aviso-confirmacao").hidden = completo;
document.querySelector("#resumo-pedido").hidden = !completo;

if (completo) {
  for (const elemento of document.querySelectorAll("[data-campo]")) {
    const valor = parametros.get(elemento.dataset.campo);
    if (elemento.dataset.campo === "datahora") {
      const data = new Date(valor);
      elemento.textContent = Number.isNaN(data.getTime())
        ? "Data e hora inválidas"
        : new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "long",
            timeStyle: "short",
          }).format(data);
    } else {
      elemento.textContent = valor;
    }
  }
}
