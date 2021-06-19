const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const API_KEY = '5d42caf383c013631a57cad448f1d6de';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=pt-br

function carregaFilmes() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `${TMDB_ENDPOINT}/movie/popular?api_key=${API_KEY}&language=pt-br`);
    xhr.onload = exibeFilmes;
    xhr.send();
}


function pesquisaFilmes() {
    let xhr = new XMLHttpRequest();

    let query = document.getElementById('inputPesquisa').value;

    xhr.open('GET', TMDB_ENDPOINT + '/search/movie?api_key=' + API_KEY + '&query=' + query);
    xhr.onload = exibeFilmes;
    xhr.send();
}


function exibeFilmes(evt) {
    let textoHTML = '';

    let filmes = JSON.parse(evt.target.responseText);


    for (let i = 0; i < filmes.results.length; i++) {
        let id = filmes.results[i].id;
        let titulo = filmes.results[i].title;
        let sinopse = filmes.results[i].overview;
        let imagem = IMG_PREFIX + filmes.results[i].poster_path;

        textoHTML += `<div class="card">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${sinopse}</p>
                <button id="${id}" onclick="getId(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Ver mais +
                </button>
            </div>
        </div>`
    }

    document.getElementById('cartazFilme').innerHTML = textoHTML;
}

function getId(id) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `${TMDB_ENDPOINT}/movie/${id}?api_key=${API_KEY}&language=pt-br`);
    xhr.onload = detalheFilme;
    xhr.send();
}

function detalheFilme(evt) {
    console.log(JSON.parse(evt.target.responseText));

    let filme = JSON.parse(evt.target.responseText);


    let titulo = filme.title;
    let sinopse = filme.overview;
    let imagem = IMG_PREFIX + filme.poster_path;
    let data = new Date(filme.release_date);
    let dataFormatada = `${data.getUTCDate().toString().padStart(2, '0')}/${(data.getUTCMonth()+1).toString().padStart(2, '0')}/${data.getUTCFullYear()}`;
    let nota = filme.vote_average;

    textoHTML = ` <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">${titulo}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <img src="${imagem}" class="card-img-top" alt="...">
    <div>
      <p><b>Sinopse: </b>${sinopse}</p>
      <p><b>Data de lançamento: </b>${dataFormatada}</p>
      <p><b>Nota: </b>${nota}</p>
    </div>
    </div>
  </div>`;

    document.getElementById('modalContent').innerHTML = textoHTML;
}