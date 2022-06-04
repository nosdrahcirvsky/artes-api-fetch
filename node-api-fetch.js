// Assim que a página estiver carregada, chama a função getAll para buscar os três campos da API
$(document).ready(getAll);

// Função para verificar os filtros que o usuário escolheu no select menu
function menu(option) {
    switch (option) {
        case "all":
            getAll();
            break;

        case "title":
            searchBy(option, 'Título');
            break;

        case "artist_title":
            searchBy(option, 'Autor');
            break;

        case "date_start":
            searchBy(option, 'Ano');
            break;
    }
}

// Define as configurações no cabeçalho
const requestOptions = {
    method: 'GET',
    mode: 'cors',
};

function getAll() {
    $("#content").html("<tr><th>Carregando, aguarde...</th></tr>");

    let myRequest = "http://localhost:4000/api/";

    fetch(myRequest, requestOptions).then(function (response) {
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function (json) {

                $("#content").html("<tr><th>Título</th><th>Autor</th><th onclick='sortYear()'>Ano de Exibição <a href='#'>(clique para ordenar)</a></th></tr>");
                $("#content").append("<tbody id='items'></tbody>");
                $("#content").append("<input type='hidden' id='yearOrder' value='asc'>");

                json.data.forEach(element => {
                    $("#content #items").append(
                        `
                        <tr>
                            <td>${element.title}</td>
                            <td>${element.artist_title}</td>
                            <td>${element.date_start}</td>
                        </tr>
                        `
                    );
                });

            });
        } else {
            console.log("Oops, we haven't got JSON!");
        }
    });
}

// Função que busca por campos específicos. 
// Requer dois parâmetros: field, o nome do campo em JSON e fieldDisplay, o nome do campo em formato legível.
function searchBy(field, fieldDisplay) {
    $("#content").html("<tr><th>Carregando, aguarde...</th></tr>");

    // Realiza a requisição usando o parâmetro field para especificar o campo que se deseja obter
    let request = `http://localhost:4000/api/filter/${field}`;

    fetch(request, requestOptions).then(function (response) {
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function (json) {

                // Aqui, o fieldDisplay é usado para nomear a coluna única
                $("#content").html(`<tr><th>${fieldDisplay}</th></tr>`);

                // Laço que percorre cada elemento do array em JSON retornado pela API
                json.data.forEach(element => {
                    // O parâmetro field é usado novamente para especificar o nome do campo escolhido no menu de select
                    $("#content").append(`<tr><td>${element[field]}</td></tr>`);
                });

            });
        } else {
            // Mensagem de erro padrão para quando o conteúdo retornado pela API não estiver em JSON
            console.log("Oops, we haven't got JSON!");
        }
    });
}

// Função para ordenar a tabela por ano -- de menor para maior, e vice-versa
function sortYear() {
    let tbody = $('#items');

    // Usando a função sort() do JQuery, é possível ordenar as linhas da tabela
    // comparando a primeira linha da última coluna com a segunda linha da mesma coluna.
    tbody.find('tr').sort(function (a, b) {
        if ($('#yearOrder').val() == 'asc') {
            // Selecionar a última coluna (onde estão os anos) com td:last
            return $('td:last', a).text().localeCompare($('td:last', b).text());
        }
        else {
            return $('td:last', b).text().localeCompare($('td:last', a).text());
        }

        // Fazer o append das linhas alteradas para o tbody na tabela
    }).appendTo(tbody);

    // Após reordenar as linhas, trocar a direção da ordem
    // para o caso do usuário clicar uma segunda vez
    let sort_order = $('#yearOrder').val();

    if (sort_order == "asc") {
        document.getElementById("yearOrder").value = "desc";
    }
    if (sort_order == "desc") {
        document.getElementById("yearOrder").value = "asc";
    }
}
