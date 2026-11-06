# Verificação — WDD 231, semana 01

Data: 6 de novembro de 2026.

## Lighthouse pelo PageSpeed Insights

Relatório: https://pagespeed.web.dev/analysis/https-gabrielvendittibarreira-github-io-wdd231/yxdcppv1xb

| Categoria | Celular | Computador |
| --- | --- | --- |
| Desempenho | 100 | 100 |
| Acessibilidade | 100 | 100 |
| Práticas recomendadas | 100 | 100 |
| SEO | 100 | 100 |

Resultados observados no relatório Lighthouse 13.6.0. São uma medição pontual e podem variar.

## Verificações funcionais

- Safari: página desktop com duas colunas; filtros Todos/CSE/WDD exibem 6/3/3 cursos e 12/6/6 créditos.
- Safari: página em iframe de 320 px, com layout de uma coluna e menu móvel abrindo e fechando; Escape fecha o menu.
- Teste isolado dos scripts: filtros, soma por `reduce`, estado concluído e atualização automática ao adicionar um curso ao array.
- Arquivos e links locais existentes; JavaScript válido com `node --check`.
- Todas as imagens abaixo de 125 kB; arquivos locais do projeto somam aproximadamente 65 kB, sem metadados Git.
- Combinações de texto e fundo verificadas com contraste mínimo de 4,5:1.
- Auditoria oficial: estrutura, pastas, CSS, referências de scripts e contraste aprovados. O erro inicial de `aria-label` em `div` foi corrigido com `role="group"`.
- Validador W3C sem erros após a correção. Barras de autofechamento de elementos void removidas para evitar avisos informativos.

## Confirmações e ações do aluno

Os cursos concluídos ainda precisam ser confirmados; não foram presumidos. As etapas de participação no Canvas, escolha de grupo e apresentação no Teams não foram realizadas pelo agente. O CodePen retornou HTTP 403 e o exercício equivalente foi salvo localmente, sem criar um fork na conta do aluno.
