
let currentPokemon = null;
let isShowingFront = true;
let isShiny = false;

function getPokemonWithName(pokemonName) {

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then((res) => res.json()
        ).then((pokemon) => {
            currentPokemon = pokemon;
            isShowingFront = true;
            isShiny = false;
            buildDocument()
            setData(pokemon)
        }
        ).catch((err) => {
            console.log(err);
            let input = document.getElementById("pokemonInput")
            input.value = "No se encontro el pokemon"

        })
}

// Funciones para crear elementos individuales
function createCardDiv() {
    let cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    return cardDiv
}

function createDataDiv() {
    let dataDiv = document.createElement('div')
    dataDiv.className = 'data'
    dataDiv.id = 'data'
    return dataDiv
}

function createLabelNameDiv() {
    let labelName = document.createElement('div')
    labelName.className = 'label_name'
    labelName.id = 'main_label_name'
    return labelName
}

function createPokemonImage() {
    let pokemonImage = document.createElement('img')
    pokemonImage.className = 'main_pokemon_image'
    pokemonImage.id = 'pokemon_image'
    pokemonImage.src = 'default_img.png'
    return pokemonImage
}

function createButtonsDiv() {
    let buttonsDiv = document.createElement('div')
    buttonsDiv.className = 'buttons_div'
    buttonsDiv.id = 'main_buttons_div'
    return buttonsDiv
}

function createInfoListsDiv() {
    let infoDiv = document.createElement('div')
    infoDiv.className = 'info_lists'
    return infoDiv
}

function createStatsDiv() {
    let statsDiv = document.createElement('div')
    statsDiv.className = 'stats'
    return statsDiv
}

function createStatsUl() {
    let statsUl = document.createElement('ul')
    statsUl.id = 'main_stats_list'
    statsUl.className = 'stats_list'
    return statsUl
}

function createAbilitiesDiv() {
    let abilitiesDiv = document.createElement('div')
    abilitiesDiv.className = 'abilities'
    return abilitiesDiv
}

function createAbilitiesUl() {
    let abilitiesUl = document.createElement('ul')
    abilitiesUl.id = 'main_abilities_list'
    abilitiesUl.className = 'abilities_list'
    return abilitiesUl
}

function createAudioControlsDiv() {
    let audioControlsDiv = document.createElement('div')
    audioControlsDiv.id = 'main_audio_controls'
    audioControlsDiv.className = 'audio_controls'
    return audioControlsDiv
}

function buildDocument() {
    // Obtener el contenedor principal
    let pokemonCardsDiv = document.getElementById('pokemon_cards')
    
    // Limpiar contenido previo
    pokemonCardsDiv.innerHTML = ''
    
    // Crear elementos usando las funciones
    let cardDiv = createCardDiv()
    let dataDiv = createDataDiv()
    let labelNameDiv = createLabelNameDiv()
    let pokemonImage = createPokemonImage()
    let buttonsDiv = createButtonsDiv()
    let infoListsDiv = createInfoListsDiv()
    let statsDiv = createStatsDiv()
    let statsUl = createStatsUl()
    let abilitiesDiv = createAbilitiesDiv()
    let abilitiesUl = createAbilitiesUl()
    let audioControlsDiv = createAudioControlsDiv()
    
    // Ensamblar la estructura según el HTML objetivo:
    // <div class="card">
    //   <div id="data">
    //     <div id="label_name"></div>
    //     <img id="pokemon_image" />
    //     <div id="buttons_div"></div>
    //     <div class="info_lists">
    //       <div class="stats">
    //         <ul id="stats_list"></ul>
    //       </div>
    //       <div class="abilities">
    //         <ul id="abilities_list"></ul>
    //       </div>
    //     </div>
    //     <div id="audio_controls"></div>
    //   </div>
    // </div>
    
    // Ensamblar stats
    statsDiv.appendChild(statsUl)
    
    // Ensamblar abilities
    abilitiesDiv.appendChild(abilitiesUl)
    
    // Ensamblar info_lists
    infoListsDiv.appendChild(statsDiv)
    infoListsDiv.appendChild(abilitiesDiv)
    
    // Ensamblar data div
    dataDiv.appendChild(labelNameDiv)
    dataDiv.appendChild(pokemonImage)
    dataDiv.appendChild(buttonsDiv)
    dataDiv.appendChild(infoListsDiv)
    dataDiv.appendChild(audioControlsDiv)
    
    // Ensamblar card
    cardDiv.appendChild(dataDiv)
    
    // Agregar al contenedor principal
    pokemonCardsDiv.appendChild(cardDiv)
}

function setStats(stats) {
    let legendStats = document.createElement('legend')
    let statsList = document.getElementById('main_stats_list')
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
    let abilitiesList = document.getElementById('main_abilities_list')
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
    let nameDiv = document.getElementById('main_audio_controls')
    let fatherDiv = document.createElement('div')
    let audioElement = document.createElement('audio')
    nameDiv.innerHTML = ''
    fatherDiv.className ="audio_controls"
    audioElement.controls = true
    audioElement.src = audio
    audioElement.type = "audio/wav"
    audioElement.id = "audioPlayer"
    fatherDiv.appendChild(audioElement)
    nameDiv.append(fatherDiv)
        
}

function setName(name) {
    let nameDiv = document.getElementById('main_label_name')
    nameDiv.innerHTML = ''
    let labelName = document.createElement('h2')
    labelName.textContent = capitalize(name)
    labelName.setAttribute('id', "name_label")
    nameDiv.appendChild(labelName)

}

function addTurnButton() {
    let buttonDiv = document.getElementById('main_buttons_div')
    let turnButton = document.createElement('button')
    turnButton.setAttribute('id', "turn_button")
    turnButton.textContent = "🔄"
    buttonDiv.appendChild(turnButton)

    addActionsToTurnButton()
}

function addShinyButton() {
    let buttonDiv = document.getElementById('main_buttons_div')
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
    let buttonDiv = document.getElementById('main_buttons_div')
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

function getRandomPokemonId() {
    const randomNum = Math.floor(Math.random() * 1302) + 1;
    return randomNum <= 1025 ? randomNum : randomNum - 1025 + 10000
}

document.getElementById('randomSearchBtn').addEventListener('click', function () {
    const pokemonId = getRandomPokemonId();
    if (pokemonId) {
        getPokemonWithName(pokemonId);
    }
});

document.getElementById('searchBtn').addEventListener('click', function () {
    const pokemonName = document.getElementById('pokemonInput').value.trim().toLowerCase();
    if (pokemonName) {
        getPokemonWithName(pokemonName);
    }
});

document.getElementById('pokemonInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});