import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu} from './DOM.js'

import {fromStartviewToPokemonSearchDisplay, fromPokemonSearchDisplayToStartview} from './view.js'


//
searchPokemon.addEventListener('click', () => {
    fromStartviewToPokemonSearchDisplay()
} )

menu.addEventListener('click', () => {
    fromPokemonSearchDisplayToStartview()
} )
// ========================