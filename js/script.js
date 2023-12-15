import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu, teamMenu, reservDisplay, reservMenu} from './DOM.js'

import {fromStartviewToPokemonSearchDisplay, fromPokemonSearchDisplayToStartview,
     fromStartViewToTeamView, fromTeamViewToStartView, fromStartViewToReservView,
    fromReservViewToStartView} from './view.js'


//Search button
searchPokemon.addEventListener('click', fromStartviewToPokemonSearchDisplay)
menu.addEventListener('click', fromPokemonSearchDisplayToStartview)

//My Team button
team.addEventListener('click', fromStartViewToTeamView)
teamMenu.addEventListener('click', fromTeamViewToStartView)

//Reserv List button
reserv.addEventListener('click', fromStartViewToReservView)
reservMenu.addEventListener('click', fromReservViewToStartView)
// ========================
// Fetching and Searching Pokemons

const searchBtn = document.querySelector('#searchPokemonBtn')
const searchInput = document.querySelector('#search-item')

 const lowerCaseName = (string) => {
     return string.toLowerCase()
}

searchBtn.addEventListener('click', getPokemon)
let allPokemons = [];

fetch('https://pokeapi.co/api/v2/pokemon?limit=1000') 
    .then(response => response.json())
    .then(data => {
        allPokemons = data.results;
    });
    function getPokemon(e) {
        e.preventDefault();
        const searchText = lowerCaseName(document.querySelector('#searchInput').value);
        const searchContainer = document.querySelector('.search-container');
        searchContainer.innerHTML = ''; 
    
        allPokemons.filter(pokemon => pokemon.name.includes(searchText)).forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(data => {
                    const types = data.types.map(typeInfo => typeInfo.type.name).join(', '); 
                    const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
    
                    searchContainer.innerHTML += `
                        <div class="search-item">
                            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
                            <div class="pokemon-info">
                                <h3 class="pokemon-name">Name: ${data.name}</h3>
                                <p class="pokemon-type">Type: ${types}</p>
                                <p class="pokemon-skills">Abilities: ${abilities}</p>
                            </div>
                            <div class="buttons-container">
                      <button class="add-to-team" id="addToTeam" data-pokemon="${data.name}">Add to Team</button>
                      <button class="add-to-reserv" id="addToReserv" data-pokemon="${data.name}">Add to Reserv</button>
                        </div>
                        </div>`;
                });
        });
    }
    

// Adding pokemons to My Team and Reserv
let myTeam = []
let myReserv = []

//Eftersom elementen skapas dynamiskt så måste jag utgå från body för att trigga dem
document.body.addEventListener('click', function(e) {
    if(e.target && e.target.id ==  'addToTeam'){
        addingToTeam(e)
    }
    if(e.target && e.target.id == 'addToReserv'){
        addingToreserv(e)
    }
})

//Add to Team
const addingToTeam = (e) => {
    const pokemonName = e.target.getAttribute('data-pokemon')
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            myTeam.push(data)
            renderTeam(); 
            console.log('Team: ', myTeam)
        });
};

//Add to Reserv
const addingToreserv = (e) => {
    const pokemonName = e.target.getAttribute('data-pokemon')
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
        myReserv.push(data)
        renderReserv(); 
        console.log('Reserv: ', myReserv)
    });
}


//Showing pokemons on the My Team Page 

const renderTeam = () => {
    const teamContainer = document.querySelector('#teamContainer')
    teamContainer.innerHTML = '' // Очистите контейнер перед добавлением новых элементов

    myTeam.forEach(pokemon => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')
        const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')

        const pokemonElement = document.createElement('div')
        pokemonElement.classList.add('search-item')
        pokemonElement.innerHTML = `
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class="pokemon-info">
                <h3 class="pokemon-name">Name: ${pokemon.name}</h3>
                <p class="pokemon-type">Type: ${types}</p>
                <p class="pokemon-skills">Abilities: ${abilities}</p>
            </div>
        `

        teamContainer.appendChild(pokemonElement)
    });
};


//Showing pokemons on the Reserv Page

const renderReserv = () => {
    const reservContainer = document.querySelector('#reservContainer')
    reservContainer.innerHTML = ''

    myReserv.forEach(pokemon => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')
        const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')

        const pokemonElement = document.createElement('div')
        pokemonElement.classList.add('search-item')
        pokemonElement.innerHTML = `
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class="pokemon-info">
                <h3 class="pokemon-name">Name: ${pokemon.name}</h3>
                <p class="pokemon-type">Type: ${types}</p>
                <p class="pokemon-skills">Abilities: ${abilities}</p>
            </div>
        `

        reservContainer.appendChild(pokemonElement)
    })
}