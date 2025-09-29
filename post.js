
let currentPokemon = null;
let isShowingFront = true;
let isShiny = false;

function getPokemon(pokemonName) {
        
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then((res) => res.json()
        ).then((pokemon) => {
            currentPokemon = pokemon;
            isShowingFront = true;
            isShiny = false;
            setData(pokemon)
        }
        ).catch((err) => {
            console.log(err);
            let input = document.getElementById("pokemonInput")
            input.value = "No se encontro el pokemon"

        })
}

function setStats(stats) {
    let legendStats = document.createElement('legend')
    let statsList = document.getElementById('stats_list')
    statsList.innerHTML = ''
    legendStats.textContent = "Estadisticas"
    statsList.appendChild(legendStats)
    stats.forEach(stat => {
        let li = document.createElement('li')
        li.textContent = stat.stat.name + ": " + stat.base_stat
        statsList.appendChild(li)
    });
}


function setAbilities(abilities) {
    let abilitiesList = document.getElementById('abilities_list')
    abilitiesList.innerHTML = ''
    let legendAbilities = document.createElement('legend')
    legendAbilities.textContent = "Habilidades"
    abilitiesList.appendChild(legendAbilities)
    abilities.forEach(ability => {
        let li = document.createElement('li')
        li.textContent = ability.ability.name
        abilitiesList.appendChild(li)
    });
}

function setImage(image) {
    let pokemonImage = document.getElementById('pokemon_image')
    pokemonImage.setAttribute('src', image)
}

function setAudio(audio) {
    let nameDiv = document.getElementById('audio_controls')
    nameDiv.innerHTML = ''
    let fatherDiv = document.createElement('div')
    fatherDiv.className ="audio_controls"
    let audioElement = document.createElement('audio')
    audioElement.controls = true
    audioElement.src = audio
    audioElement.type = "audio/wav"
    audioElement.id = "audioPlayer"
    fatherDiv.appendChild(audioElement)
    nameDiv.append(fatherDiv)
        
}

function setName(name) {
    let nameDiv = document.getElementById('label_name')
    nameDiv.innerHTML = ''
    let labelName = document.createElement('h2')
    labelName.textContent = capitalize(name)
    labelName.setAttribute('id', "name_label")
    nameDiv.appendChild(labelName)

}

function addTurnButton() {
    let buttonDiv = document.getElementById('buttons_div')
    let turnButton = document.createElement('button')
    turnButton.setAttribute('id', "turn_button")
    turnButton.textContent = "🔄"
    buttonDiv.appendChild(turnButton)

    addActionsToTurnButton()
}

function addShinyButton() {
    let buttonDiv = document.getElementById('buttons_div')
    let shinyButton = document.createElement('button')
    shinyButton.setAttribute('id', "shiny_button")
    shinyButton.textContent = "⭐"
    buttonDiv.appendChild(shinyButton)

    addActionsToShinyButton()
}

function addActionsToTurnButton() {
    document.getElementById('turn_button').addEventListener('click', turnImage);
}

function addActionsToShinyButton() {
    document.getElementById('shiny_button').addEventListener('click', turnShiny);
}

function turnImage() {
    if (currentPokemon) {
        isShowingFront = !isShowingFront
        chargeImage()
    }
}

function chargeImage() {
    if (isShiny && isShowingFront) {
        setImage(currentPokemon.sprites.front_shiny)
    } else if (isShiny && !isShowingFront) {
        setImage(currentPokemon.sprites.back_shiny)
    } else if (isShowingFront) {
        setImage(currentPokemon.sprites.front_default)
    } else {
        setImage(currentPokemon.sprites.back_default)
    }
}

function turnShiny() {
    if (currentPokemon) {
        isShiny = !isShiny
        chargeImage()
    }
}

function addButtons() {
    let buttonDiv = document.getElementById('buttons_div')
    buttonDiv.innerHTML = ''
    addTurnButton()
    addShinyButton()
}

function setData(pokemon) {
    setName(pokemon.name)
    addButtons()
    setImage(pokemon.sprites.front_default)
    setStats(pokemon.stats)
    setAbilities(pokemon.abilities)
    setAudio(pokemon.cries.latest)

}
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}


document.getElementById('searchBtn').addEventListener('click', function () {
    const pokemonName = document.getElementById('pokemonInput').value.trim().toLowerCase();
    if (pokemonName) {
        getPokemon(pokemonName);
    }
});

document.getElementById('pokemonInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});