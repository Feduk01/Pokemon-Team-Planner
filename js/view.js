import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu, teamDisplay, reservDisplay, reservMenu, teamMenu} from './DOM.js'

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
// Start VieW => Team VieW
const fromStartViewToTeamView = () => {
    startView.style.display = 'none'
    teamDisplay.style.display = 'block'
    
}

// Team VieW => Start VieW
const fromTeamViewToStartView = () => {
    startView.style.display = 'block'
    teamDisplay.style.display = 'none'
}

// ======================================================
// Start View => Reserv View
const fromStartViewToReservView = () => {
    startView.style.display = 'none'
    reservDisplay.style.display = 'block'
}
// Reserv View=> Start View 
const fromReservViewToStartView = () => {
    startView.style.display = 'block'
    reservDisplay.style.display = 'none'
}

export {fromStartviewToPokemonSearchDisplay, fromPokemonSearchDisplayToStartview, 
    fromStartViewToTeamView, fromTeamViewToStartView, fromStartViewToReservView,
    fromReservViewToStartView}