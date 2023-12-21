import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu, teamMenu, reservDisplay, reservMenu, teamCounter, reservCounter, searchBtn} from './DOM.js'

import {myReserv} from './script.js'
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
                <h3 class="pokemon-name">${pokemon.name}</h3>
                <p class="pokemon-type">Type: ${types}</p>
                <p class="pokemon-skills">Abilities: ${abilities}</p>
            </div>
        `

        reservContainer.appendChild(pokemonElement)

        if (reservCounter) {
            reservCounter.textContent = `Your Reserv contains ${myReserv.length} pokemons`
        } if (myReserv.length <= 10){
            reservCounter.style.backgroundColor = '#80e180'

        } else if (myReserv.length <= 20) {
            reservCounter.style.backgroundColor = '#d3d33d'

        } else{
            reservCounter.style.backgroundColor = '#eb5b5b'
        }
    })
}

export {renderReserv}