import {searchPokemon, team, reserv, startView, pokemonSearchDisplay, menu, teamMenu, reservDisplay, reservMenu, teamCounter, reservCounter, searchBtn} from './DOM.js'

import {fromStartviewToPokemonSearchDisplay, fromPokemonSearchDisplayToStartview,
     fromStartViewToTeamView, fromTeamViewToStartView, fromStartViewToReservView,
    fromReservViewToStartView} from './view.js'
import {getPokemon} from './getPokemon.js'

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

// Fetching and Searching Pokemons (searching pokemons function - getPokemon is inside its own file)

searchBtn.addEventListener('click', getPokemon)

export let allPokemons = []

fetch('https://pokeapi.co/api/v2/pokemon?limit=1000') 
    .then(response => response.json())
    .then(data => {
        allPokemons = data.results
    })
    

// Creating massives for My Team and Reserv
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
        if (myTeam.length < 3){
            
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then((response) => response.json())
                .then((data) => {
                    myTeam.push(data)
                    renderTeam()
                    console.log('Team: ', myTeam)
                })
                .catch(error => console.error('Error fetching data: ', error))
        } else {
            addingToreserv(e)
        }
        
    }


//Add to Reserv
const addingToreserv = (e) => {
    const pokemonName = e.target.getAttribute('data-pokemon')
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
        myReserv.push(data)
        renderReserv()
        console.log('Reserv: ', myReserv)
    })
    .catch(error => console.error('Error fetching data: ', error))
}

//Delete from My Team

document.body.addEventListener('click', function(e) {
    if (e.target && e.target.classList =='delete-button') {
        const pokemonName = e.target.getAttribute('data-pokemon-name')
        myTeam = myTeam.filter(pokemon => pokemon.name !== pokemonName)
        teamCounter.textContent = `Your Team contains ${myTeam.length} of 3 pokemons`
        renderTeam()
    }
});


//Gömmer knappar i myTeamDisplay view
document.body.addEventListener('click', function(e) {
    if(e.target && e.target.classList == 'changeNameBtn') {
        const buttonsContainer = e.target.closest('.buttons-container')
        const nameChangerInput = buttonsContainer.querySelector('.nameChanger')
        const changeNameBtn = buttonsContainer.querySelector('.changeNameBtn')
        const deleteButton = buttonsContainer.querySelector('.delete-button')
        nameChangerInput.style.display = 'block'
        changeNameBtn.style.display = 'none'
        deleteButton.style.display = 'none'
        
    }
})

// Ändrar namn på pokemons
document.body.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('nameChanger') ) {
        const nameChangerInput = e.target
        const newName = nameChangerInput.value.trim()

        if (newName) {
            const pokemonElement = nameChangerInput.closest('.search-item')
            const pokemonNameElement = pokemonElement.querySelector('.pokemon-name')

            if (pokemonNameElement) {
                const oldName = pokemonNameElement.textContent.replace('Name: ', '')

                // Найти и обновить покемона в массиве myTeam
                const pokemonIndex = myTeam.findIndex(pokemon => pokemon.name === oldName)
                if (pokemonIndex !== -1) {
                    myTeam[pokemonIndex].name = newName
                    renderTeam()
                }
            }
        }
    }
});

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