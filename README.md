# artes-api-fetch

Projeto solicitado para a vaga de estágio da Marques Consult.

- Aplicante: David Richardson

## Uso

Abra o arquivo `index.html` em um navegador de sua preferência. A página retorna uma tabela com os campos **título**, **autor** e **ano de exibição**, conforme solicitado pelo documento para a vaga. Os resultados podem ser filtrados por **título**, **autor** e **ano**. Há também a opção de ordenar as linhas da tabela por ano, do menor para o maior e vice-versa.

Por padrão, este front está configurado para se conectar à [API pública do Instituto de Artes de Chicago](https://www.artic.edu/open-access/public-api). É possível usar este front em conjunto com a [API desenvolvida em Nodejs](https://github.com/nosdrahcirvsky/artes-api-nodejs), basta trocar os scripts em `index.html` de `remote-api-fetch.js` para `node-api-fetch.js`.

## Backend

A API em Nodejs para ser usada em conjunto com este frontend encontra-se [aqui](https://github.com/nosdrahcirvsky/artes-api-nodejs).
