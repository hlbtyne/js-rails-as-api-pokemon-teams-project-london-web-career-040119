const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainers = document.getElementById('trainers')

function getData() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
}

function renderOneTrainer() {
    const trainerCard = document.createElement('div')
    trainerCard.className = 'card'
    trainerCard.innerHTML = `
    
    `
}