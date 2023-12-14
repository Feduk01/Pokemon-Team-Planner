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
// ========================