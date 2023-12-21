import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu, teamMenu, reservDisplay, reservMenu, teamCounter, reservCounter, searchBtn} from './DOM.js'


import {myTeam} from './script.js'


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
                <h3 class="pokemon-name">${pokemon.name}</h3>
                <p class="pokemon-type">Type: ${types}</p>
                <p class="pokemon-skills">Abilities: ${abilities}</p>
            </div>
            <div class="buttons-container">
                      <button class="changeNameBtn">Change name</button>
                      <button  class="delete-button" data-pokemon-name="${pokemon.name}">Delete</button>
                      <input type="text" class="nameChanger">
                      </div>
        `

        teamContainer.appendChild(pokemonElement)

        if (teamCounter) {
            teamCounter.textContent = `Your Team contains ${myTeam.length} of 3 pokemons`
        } if (myTeam.length === 1){
            teamCounter.style.backgroundColor = '#80e180'

        } else if (myTeam.length === 2) {
            teamCounter.style.backgroundColor = '#d3d33d'

        } else{
            teamCounter.style.backgroundColor = '#eb5b5b'
        }
    });
};

export {renderTeam}