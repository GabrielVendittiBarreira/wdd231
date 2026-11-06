# Verificação — S02: Diretório da Câmara

Data: 6 de novembro de 2026.

Página publicada: https://gabrielvendittibarreira.github.io/wdd231/camara/diretorio.html

## Implementação

- Sete empresas fictícias, com campos de nome, endereço, telefone, site, imagem distinta e nível de associação (1, 2 ou 3), além de setor e descrição.
- `camara/dados/membros.json` carregado com `fetch` e `async/await`.
- Grade responsiva e lista de uma coluna; o modo lista oculta imagens e descrições complementares.
- Cabeçalho, navegação, rodapé, favicon, metadados Open Graph e datas dinâmicas.
- Páginas futuras com a mesma estrutura compartilhada; o conteúdo das semanas seguintes ainda será desenvolvido.
- São Paulo, SP adotada provisoriamente e informada ao aluno, pois a cidade de residência não foi fornecida. Dados empresariais explicitamente fictícios e URLs demonstrativos no domínio reservado `example.com`.

## Testes

- Safari desktop: sete membros exibidos e alternância entre grade e lista, com imagens ausentes no modo lista.
- Safari em iframe de 320 px: cabeçalho, menu, leitura e alternância sem transbordamento horizontal observado. Escape fecha o menu.
- Teste isolado do JavaScript: carregamento de sete registros, alternância, tratamento de falha de rede e recuperação pelo botão Tentar novamente.
- `node --check` sem erros nos dois scripts; JSON válido e links/arquivos locais conferidos.
- HTML validado pelo serviço W3C sem mensagens de erro ou avisos.
- Auditoria oficial S02 aprova HTML, pastas, nomes de arquivos, metadados, favicon, scripts, JSON e contraste. A validação CSS externa não respondeu (`Load failed`); as tentativas diretas retornaram HTTP 429/500. Esse serviço não foi declarado como aprovado.
- Todas as imagens abaixo de 125 kB. O relatório Lighthouse desktop informa 87 KiB de transferência total, abaixo do limite de 500 kB.

## Lighthouse — PageSpeed Insights

Relatório: https://pagespeed.web.dev/analysis/https-gabrielvendittibarreira-github-io-wdd231-camara-diretorio-html/se07cpn1p8

| Categoria | Celular | Computador |
| --- | --- | --- |
| Desempenho | 84 | 76 |
| Acessibilidade | 100 | 100 |
| Práticas recomendadas | 100 | 100 |
| SEO | 100 | 100 |

As três categorias exigidas pela atividade atingiram a meta de 95+. Pontuações são medições pontuais e podem variar.

## Entrega e colaboração

O código foi enviado ao GitHub. O aluno ainda precisa enviar o endereço no Canvas e compartilhá-lo no canal do seu grupo. Nenhuma mensagem foi enviada ao grupo pelo agente.
