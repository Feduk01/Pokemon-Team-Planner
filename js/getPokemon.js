import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu, teamMenu, reservDisplay, reservMenu, teamCounter, reservCounter, searchBtn} from './DOM.js'

import {fromStartviewToPokemonSearchDisplay, fromPokemonSearchDisplayToStartview,
     fromStartViewToTeamView, fromTeamViewToStartView, fromStartViewToReservView,
    fromReservViewToStartView} from './view.js'
import {allPokemons} from './script.js'



 const lowerCaseName = (string) => {
     return string.toLowerCase()
}

function getPokemon() {
        
    const searchText = lowerCaseName(document.querySelector('#searchInput').value);
    const searchContainer = document.querySelector('.search-container')
    searchContainer.innerHTML = '' 

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
                            <h3 class="pokemon-name">${data.name}</h3>
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

export {getPokemon, searchBtn}