const options = { day: "2-digit", month: "long", year: "numeric" };
document.querySelector("#data-revisao").textContent =
  new Date().toLocaleDateString("pt-BR", options);
const volume = 20;
document.querySelector("#volume").innerHTML =
  `<strong>Volume</strong>: ${volume} litros`;
let quantidade = document.querySelector("#qtd").value;
document.querySelector("#quantidade").textContent =
  `Quantidade selecionada: ${quantidade}`;
document.querySelector("#qtd").addEventListener("input", (evento) => {
  quantidade = evento.target.value;
  document.querySelector("#quantidade").textContent =
    `Quantidade selecionada: ${quantidade}`;
});
document.querySelector("aside").innerHTML =
  "Bem-vindo ao <em>nosso</em> bairro!";
function obterCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
document.querySelector("#temp").value = obterCelsius(33);
const divs = document.querySelectorAll("div");
document.querySelector("#divs").textContent =
  `Quantidade de elementos div: ${divs.length}`;
const nomesdecidades = [
  "Curitiba",
  "São Paulo",
  "Campinas",
  "Recife",
  "Cuiabá",
];
let filtroC = nomesdecidades.filter((cidade) => cidade.charAt(0) === "C");
document.querySelector("#cidades").textContent =
  `Cidades com C: ${filtroC.join(", ")}`;
