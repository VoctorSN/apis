// ============================================
// DOCUMENT MANAGER - Funciones para manipular el DOM
// ============================================

/**
 * Construye toda la estructura de cartas de Pokemon
 */
function buildDocument() {
    // Limpiar contenedor principal
    let pokemonCardsDiv = document.getElementById('pokemon_cards')
    pokemonCardsDiv.innerHTML = ''

    // Construir las tres cartas
    buildPreCard()
    buildMainCard()
    buildPostCard()
}

/**
 * Funciones para crear elementos DOM individuales
 */
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
    pokemonImage.className = 'pokemon_image'
    pokemonImage.id = 'main_pokemon_image'
    pokemonImage.src = 'img/default_img.png'
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

function createImageContainer() {
    let imageContainer = document.createElement('div')
    let pokemonImage = createPokemonImage()
    let buttonsDiv = createButtonsDiv()
    imageContainer.id = 'image_container'
    imageContainer.appendChild(pokemonImage)
    imageContainer.appendChild(buttonsDiv)
    return imageContainer
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

/**
 * Construye la carta del Pokemon anterior
 */
function buildPreCard() {
    let pokemonCardsDiv = document.getElementById('pokemon_cards')

    let cardDiv = createCardDiv()
    cardDiv.className += ' dimmed'
    let dataDiv = createDataDiv()
    let pokemonImage = createPokemonImage()
    pokemonImage.id = 'pre_pokemon_image'

    // Agregar evento click para navegar al pokémon anterior
    cardDiv.addEventListener('click', async () => {
        const prevPokemonId = currentPokemon.id - 1;
        if (pokemonImage.src != 'default_image.png') {
            await searchPokemon(prevPokemonId);
        }
    });

    cardDiv.style.cursor = 'pointer';

    try {
        // Intentar cargar la imagen anterior
        const currentImageUrl = currentPokemon.sprites.front_default;
        const prevImageUrl = getNextPokemonImage(currentImageUrl, -1);

        if (prevImageUrl) {
            pokemonImage.src = prevImageUrl;
            pokemonImage.onerror = function () {
                this.src = 'img/default_img.png';
            };
        } else {
            pokemonImage.src = 'img/default_img.png';
        }
    } catch (e) {
        pokemonImage.src = 'img/default_img.png';
    }

    dataDiv.appendChild(pokemonImage)
    cardDiv.appendChild(dataDiv)
    pokemonCardsDiv.appendChild(cardDiv)
}

/**
 * Construye la carta del Pokemon siguiente
 */
function buildPostCard() {
    let pokemonCardsDiv = document.getElementById('pokemon_cards')

    let cardDiv = createCardDiv()
    cardDiv.className += ' dimmed'
    let dataDiv = createDataDiv()
    let pokemonImage = createPokemonImage()
    pokemonImage.id = 'post_pokemon_image'

    try {
        const currentImageUrl = currentPokemon.sprites.front_default;
        const nextImageUrl = getNextPokemonImage(currentImageUrl, 1);

        if (nextImageUrl) {
            pokemonImage.src = nextImageUrl;
            pokemonImage.onerror = function () {
                this.src = 'img/default_img.png';
            };

            cardDiv.addEventListener('click', async () => {
                const nextPokemonId = currentPokemon.id + 1;
                await searchPokemon(nextPokemonId);
            });

            cardDiv.style.cursor = 'pointer';
        } else {
            pokemonImage.src = 'img/default_img.png';
        }
    } catch (e) {
        pokemonImage.src = 'img/default_img.png';
    }

    dataDiv.appendChild(pokemonImage)
    cardDiv.appendChild(dataDiv)
    pokemonCardsDiv.appendChild(cardDiv)
}

/**
 * Construye la carta principal del Pokemon actual
 */
function buildMainCard() {
    let pokemonCardsDiv = document.getElementById('pokemon_cards')

    let cardDiv = createCardDiv()
    let dataDiv = createDataDiv()
    let labelNameDiv = createLabelNameDiv()
    let imageContainer = createImageContainer()
    let infoListsDiv = createInfoListsDiv()
    let statsDiv = createStatsDiv()
    let statsUl = createStatsUl()
    let abilitiesDiv = createAbilitiesDiv()
    let abilitiesUl = createAbilitiesUl()
    let audioControlsDiv = createAudioControlsDiv()

    // Ensamblar stats
    statsDiv.appendChild(statsUl)

    // Ensamblar abilities
    abilitiesDiv.appendChild(abilitiesUl)

    // Ensamblar info_lists
    infoListsDiv.appendChild(statsDiv)
    infoListsDiv.appendChild(abilitiesDiv)

    // Ensamblar data div
    dataDiv.appendChild(labelNameDiv)
    dataDiv.appendChild(imageContainer)
    dataDiv.appendChild(infoListsDiv)
    dataDiv.appendChild(audioControlsDiv)

    // Ensamblar card
    cardDiv.appendChild(dataDiv)

    // Agregar al contenedor principal
    pokemonCardsDiv.appendChild(cardDiv)
}

/**
 * Actualiza la información del Pokemon en la UI
 */
function setData(pokemon) {
    setName(pokemon.name)
    addButtons()
    chargeImage()
    setStats(pokemon.stats)
    setAbilities(pokemon.abilities)
    setAudio(pokemon.cries.latest)
}

/**
 * Funciones para actualizar elementos específicos
 */
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

function setImage(imageUrl) {
    let pokemonImage = document.getElementById('main_pokemon_image')
    if (imageUrl === null) {
        pokemonImage.setAttribute('src', 'img/default_img.png')
        return;
    }
    pokemonImage.setAttribute('src', imageUrl)
}

function setAudio(audio) {
    
    let nameDiv = document.getElementById('main_audio_controls')
    let fatherDiv = document.createElement('div')
    let audioElement = document.createElement('audio')
    nameDiv.innerHTML = ''
    fatherDiv.className = "audio_controls"
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
    let labelName = document.createElement('h1')
    labelName.textContent = capitalize(name)
    labelName.setAttribute('id', "name_label")
    nameDiv.appendChild(labelName)
}

/**
 * Funciones para manejar botones
 */
function addButtons() {
    let buttonDiv = document.getElementById('main_buttons_div')
    buttonDiv.innerHTML = ''
    addTurnButton()
    addShinyButton()
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

/**
 * Funciones de acción para los botones
 */
function turnImage() {
    if (currentPokemon) {
        isShowingFront = !isShowingFront
        chargeImage()
    }
}

function turnShiny() {
    if (currentPokemon) {
        isShiny = !isShiny
        chargeImage()
    }
}

function chargeImage() {
    let imageUrl = tryGetCurrentGif()
    if (imageUrl === null) {
        imageUrl = getCurrentImageUrl();
    }
    setImage(imageUrl);
}

/**
 * Funciones utilitarias
 */
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
