import { interesses } from "../data/interesses.mjs";

const contenedor = document.querySelector("#cartoes-interesse");
const mensagemVisita = document.querySelector("#mensagem-visita");

function mostrarMensagemDeVisita() {
  const chave = "camaraUltimaVisita";
  const agora = Date.now();
  const ultimaVisita = Number(localStorage.getItem(chave));

  if (!ultimaVisita) {
    mensagemVisita.textContent =
      "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
  } else {
    const diferenca = agora - ultimaVisita;
    const dias = Math.floor(diferenca / 86400000);

    if (diferenca < 86400000) {
      mensagemVisita.textContent = "Já voltou? Que legal!";
    } else if (dias === 1) {
      mensagemVisita.textContent = "Seu último acesso foi há 1 dia.";
    } else {
      mensagemVisita.textContent = `Seu último acesso foi há ${dias} dias.`;
    }
  }

  localStorage.setItem(chave, String(agora));
}

interesses.forEach((item, indice) => {
  const cartao = document.createElement("article");
  cartao.className = "cartao-interesse";
  cartao.style.gridArea = `interesse-${indice + 1}`;

  const figura = document.createElement("figure");
  const imagem = document.createElement("img");
  imagem.src = `imagens/interesses/${item.imagem}`;
  imagem.alt = item.nome;
  imagem.width = 300;
  imagem.height = 200;
  imagem.loading = "lazy";
  figura.append(imagem);

  const titulo = document.createElement("h2");
  titulo.textContent = item.nome;

  const endereco = document.createElement("address");
  endereco.textContent = item.endereco;

  const descricao = document.createElement("p");
  descricao.textContent = item.descricao;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "saiba mais";
  botao.setAttribute("aria-label", `Saiba mais sobre ${item.nome}`);

  cartao.append(titulo, figura, endereco, descricao, botao);
  contenedor.append(cartao);
});

mostrarMensagemDeVisita();
