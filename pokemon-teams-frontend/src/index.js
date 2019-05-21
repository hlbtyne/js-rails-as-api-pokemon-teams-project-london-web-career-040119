const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const trainers = document.getElementById('trainers');

function getData() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
}

function addNewPokemon(e) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers:
        {'Content-Type': 'application/json'},
        body:
        JSON.stringify({trainer_id: e.target.dataset.id})
      })
    .then (resp => resp.json())
} 

function releasePokemon(e) {
    fetch(`${POKEMONS_URL}/${e.target.dataset.id}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
}

function renderOneTrainer(trainer) {
    const trainerCard = document.createElement('div');
    trainerCard.className = 'card';
    trainerCard.dataset.id = trainer.id;

    const trainerName = document.createElement('p');
    trainerName.innerText = `${trainer.name}`;

    const addPokemonButton = document.createElement('button');
    addPokemonButton.dataset.id = trainer.id;
    addPokemonButton.innerText = 'Add Pokemon';
    addPokemonButton.addEventListener('click', addNewPokemon);

    const pokemonsList = document.createElement('ul');

    for (pokemon of trainer.pokemons) {
        const liElement = document.createElement('li');
        const pokemonName = document.createTextNode(`${pokemon.nickname} (${pokemon.species})`);
        const releaseButton = document.createElement('button');
        releaseButton.className = 'release';
        releaseButton.dataset.id = pokemon.id;
        releaseButton.innerText = "Release";
        releaseButton.addEventListener('click', releasePokemon);

        liElement.append(pokemonName, releaseButton);
        pokemonsList.append(liElement);
    }
    
    trainerCard.append(trainerName, addPokemonButton, pokemonsList);
    trainers.append(trainerCard);
}


function renderMultipleTrainers(trainers) {
    trainers.forEach(trainer => renderOneTrainer(trainer));
}

function init() {
    getData().then (trainers => renderMultipleTrainers(trainers));
}

init();

