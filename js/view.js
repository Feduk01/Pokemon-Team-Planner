import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu} from './DOM.js'

// Start View => Seacrh View
const fromStartviewToPokemonSearchDisplay = () => {
    startView.style.display = 'none'
    pokemonSearchDisplay.style.display = 'block'
}

// Search View => Start View
const fromPokemonSearchDisplayToStartview = () =>{
    startView.style.display = 'block'
    pokemonSearchDisplay.style.display = 'none'
}
// =================================================



export {fromStartviewToPokemonSearchDisplay, fromPokemonSearchDisplayToStartview}