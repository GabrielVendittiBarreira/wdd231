const containerMembros = document.querySelector("#membros");
const quantidade = document.querySelector("#quantidade");
const erro = document.querySelector("#erro");
const botaoGrade = document.querySelector("#botao-grade");
const botaoLista = document.querySelector("#botao-lista");
const niveis = { 1: "Membro", 2: "Prata", 3: "Ouro" };

function definirVisualizacao(tipo) {
  const emGrade = tipo === "grade";
  containerMembros.classList.toggle("grade", emGrade);
  containerMembros.classList.toggle("lista", !emGrade);
  botaoGrade.setAttribute("aria-pressed", String(emGrade));
  botaoLista.setAttribute("aria-pressed", String(!emGrade));
}

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

function exibirMembros(membros) {
  containerMembros.replaceChildren();
  membros.forEach((membro) => {
    const cartao = criarElemento("article", "membro");
    const imagem = document.createElement("img");
    imagem.src = `imagens/${membro.imagem}`;
    imagem.alt = `Marca ilustrativa de ${membro.nome}`;
    imagem.width = 240;
    imagem.height = 128;
    imagem.loading = "lazy";
    const corpo = criarElemento("div", "corpo-membro");
    const categoria = criarElemento("p", "setor", membro.setor);
    const titulo = criarElemento("h3", "nome-membro", membro.nome);
    const descricao = criarElemento("p", "descricao-membro", membro.descricao);
    const endereco = criarElemento("p", "endereco", membro.endereco);
    const telefone = criarElemento("p", "telefone", membro.telefone);
    const link = criarElemento("a", "site-membro", "Site demonstrativo ↗");
    link.href = membro.site;
    link.setAttribute("aria-label", `Site demonstrativo de ${membro.nome}`);
    const nivel = criarElemento(
      "span",
      `nivel nivel-${membro.nivelAssociacao}`,
      `Associação ${niveis[membro.nivelAssociacao]}`,
    );
    corpo.append(categoria, titulo, descricao, endereco, telefone, link, nivel);
    cartao.append(imagem, corpo);
    containerMembros.append(cartao);
  });
  quantidade.textContent = `${membros.length} empresas no diretório · São Paulo, SP`;
}

async function carregarMembros() {
  containerMembros.setAttribute("aria-busy", "true");
  erro.hidden = true;
  quantidade.textContent = "Carregando membros…";
  try {
    const resposta = await fetch("dados/membros.json");
    if (!resposta.ok) throw new Error(`Falha HTTP ${resposta.status}`);
    const membros = await resposta.json();
    if (!Array.isArray(membros) || membros.length === 0)
      throw new Error("Diretório vazio");
    exibirMembros(membros);
  } catch (falha) {
    containerMembros.replaceChildren();
    quantidade.textContent = "Diretório indisponível no momento.";
    erro.hidden = false;
  } finally {
    containerMembros.setAttribute("aria-busy", "false");
  }
}

botaoGrade.addEventListener("click", () => definirVisualizacao("grade"));
botaoLista.addEventListener("click", () => definirVisualizacao("lista"));
document
  .querySelector("#tentar-novamente")
  .addEventListener("click", carregarMembros);
carregarMembros();
