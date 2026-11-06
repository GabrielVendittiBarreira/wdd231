const listaCursos = document.querySelector('#lista-cursos');
const resumoCreditos = document.querySelector('#resumo-creditos');
const botoesFiltro = document.querySelectorAll('[data-filtro]');
function exibirCursos(filtro = 'todos') {
  const selecionados = cursos.filter(curso => filtro === 'todos' || curso.assunto === filtro);
  listaCursos.replaceChildren();
  selecionados.forEach(curso => {
    const cartao = document.createElement('article');
    cartao.className = curso.concluido ? 'curso concluido' : 'curso';
    const titulo = document.createElement('h3');
    titulo.textContent = `${curso.assunto} ${curso.numero}`;
    const nome = document.createElement('p');
    nome.textContent = curso.titulo;
    const creditos = document.createElement('p');
    creditos.textContent = `${curso.creditos} créditos · ${curso.tecnologia.join(', ')}`;
    const estado = document.createElement('span');
    estado.className = 'estado';
    estado.textContent = curso.concluido ? '✓ Concluído' : 'A concluir';
    cartao.append(titulo, nome, creditos, estado);
    listaCursos.append(cartao);
  });
  const totalCreditos = selecionados.reduce((total, curso) => total + curso.creditos, 0);
  resumoCreditos.textContent = `${selecionados.length} cursos exibidos · Total de créditos: ${totalCreditos}`;
  botoesFiltro.forEach(botao => botao.setAttribute('aria-pressed', String(botao.dataset.filtro === filtro)));
}
botoesFiltro.forEach(botao => botao.addEventListener('click', () => exibirCursos(botao.dataset.filtro)));
exibirCursos();
