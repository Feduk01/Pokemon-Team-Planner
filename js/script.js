import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu} from './DOM.js'

import {fromStartviewToPokemonSearchDisplay, fromPokemonSearchDisplayToStartview} from './view.js'

// Menu buttons
//
searchPokemon.addEventListener('click', () => {
    fromStartviewToPokemonSearchDisplay()
} )

menu.addEventListener('click', () => {
    fromPokemonSearchDisplayToStartview()
} )
// =================================

// Fetching and Searching Pokemons

const searchBtn = document.querySelector('#searchPokemonBtn')
const searchInput = document.querySelector('#search-item')

const lowerCaseName = (string) => {
    return string.toLowerCase()
}

searchBtn.addEventListener('click', getPokemon)

function getPokemon(e) {

    const name = document.querySelector('#searchInput').value
    const searchContainer = document.querySelector('.search-container')
    const pokemonName = lowerCaseName(name)
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ')
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')
        searchContainer.innerHTML = `
        <div class="search-item">
                    <img src="${data.sprites.other["official-artwork"].front_default}" 
                    alt="${data.name}">
                    <div class="pokemon-info">
                        <h3 class="pokemon-name">Name: ${data.name}</h3>
                        <p class="pokemon-type">Type: ${types}</p>
                        <p class=".pokemon-skills">Abilities: ${abilities}</p>

                    </div>
                    <div class="buttons-container">
                        <button class="add-to-team">Add to Team</button>
                        <button class="add-to-reserv">Add to Reserv</button>
                    </div>
                </div>
    `
    }).catch((err) => {
        console.log('Pokemon not found', err);
    })

    e.preventDefault()
}