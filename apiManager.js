// ============================================
// API MANAGER - Funciones para comunicarse con la PokeAPI
// ============================================
/**
 * Obtiene un Pokémon por nombre o ID
 * @param {string|number} pokemonName - Nombre o ID del Pokémon
 * @returns {Object|null} - Objeto Pokemon de la API o null si hay error
 */
async function getPokemonWithName(pokemonName) {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
        const pokemon = await response.json();
        return pokemon;
    } catch (err) {
        console.log("Error al obtener Pokemon:", err);
        throw new Error("No se encontró el Pokémon");
    }
}

async function getTypes() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/type?limit=50&offset=0");
        const types = await response.json();
        return types;
    } catch (err) {
        console.log("Error al obtener los types:", err);
        throw new Error("No se encontraron los types");
    }
}

/**
 * Busca un Pokémon y actualiza la UI
 * @param {string|number} pokemonIdentifier - Nombre o ID del Pokémon
 */
async function searchPokemon(pokemonIdentifier) {
    try {
        // Resetear estados
        isShowingFront = true;
        isShiny = false;

        // Obtener Pokemon de la API
        const pokemon = await getPokemonWithName(pokemonIdentifier);
        currentPokemon = pokemon;

        // Actualizar la UI
        buildDocument();
        setData(currentPokemon);

        // Actualizar el input con el nombre encontrado
        const input = document.getElementById("pokemonInput");
        if (input) {
            input.value = pokemon.name;
        }

    } catch (err) {
        // Mostrar error en la UI
        const input = document.getElementById("pokemonInput");
        if (input) {
            input.value = "No se encontró el pokemon";
        }
        console.error("Error en searchPokemon:", err);
    }
}

/**
 * Calcula la URL de la imagen de un Pokémon vecino
 * @param {string} imageUrl - URL de la imagen actual
 * @param {number} increment - Incremento para calcular el vecino (+1 siguiente, -1 anterior)
 * @returns {string|null} - URL de la imagen vecina o null si no es válida
 */
function getNextPokemonImage(imageUrl, increment = 1) {
    if (!imageUrl) return null;

    try {
        // Extraer el número (ID) del final de la URL
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1]; // "25.png"
        const nameParts = filename.split('.'); // ["25", "png"]
        const currentId = parseInt(nameParts[0]); // 25
        const extension = nameParts[1]; // "png"

        // Verificar que el ID sea válido
        if (isNaN(currentId)) return null;

        // Calcular nuevo ID
        const newId = currentId + increment;

        // Solo verificar que no sea menor que 1
        if (newId < 1) return null;

        // Reconstruir la URL
        urlParts[urlParts.length - 1] = `${newId}.${extension}`;

        return urlParts.join('/');
    } catch (err) {
        return null;
    }
}

/**
 * Genera un ID aleatorio de Pokémon de ambos rangos
 * @returns {number} - ID aleatorio de Pokémon
 */
function getRandomPokemonId() {
    // Rango 1: 1-1025 (1025 Pokemon)
    // Rango 2: 10001-10277 (277 Pokemon)
    // Total: 1302 Pokemon

    const totalPokemon = 1025 + 277; // 1302 total
    const randomNum = Math.floor(Math.random() * totalPokemon) + 1;

    if (randomNum <= 1025) {
        // Pokemon del rango 1-1025
        return randomNum;
    } else {
        // Pokemon del rango 10001-10277
        // randomNum está entre 1026 y 1302, lo convertimos a 10001-10277
        return randomNum - 1025 + 10000;
    }
}

/**
 * Obtiene la URL de la imagen actual según el estado (front/back, normal/shiny)
 * @returns {string} - URL de la imagen actual
 */
function getCurrentImageUrl() {
    if (!currentPokemon) return null;

    if (isShiny && isShowingFront) {
        return currentPokemon.sprites.front_shiny;
    } else if (isShiny && !isShowingFront) {
        return currentPokemon.sprites.back_shiny;
    } else if (isShowingFront) {
        return currentPokemon.sprites.front_default;
    } else {
        return currentPokemon.sprites.back_default;
    }
}

/**
 * Obtiene la URL de la imagen actual según el estado (front/back, normal/shiny)
 * @returns {string} - URL de la imagen actual
 */
function tryGetCurrentGif() {
    if (!currentPokemon) return null;

    try {
        if (isShiny && isShowingFront) {
            return currentPokemon.sprites.other.showdown.front_shiny;
        } else if (isShiny && !isShowingFront) {
            return currentPokemon.sprites.other.showdown.back_shiny;
        } else if (isShowingFront) {
            return currentPokemon.sprites.other.showdown.front_default;
        } else {
            return currentPokemon.sprites.other.showdown.back_default;
        }
    } catch (e) {
        return;
    }
}

/**
 * Obtiene las URLs de las imágenes vecinas
 */
function getPrePokemonImageUrl() {
    if (!currentPokemon || !currentPokemon.sprites) return null;
    const currentImageUrl = currentPokemon.sprites.front_default;
    return getNextPokemonImage(currentImageUrl, -1);
}

function getPostPokemonImageUrl() {
    if (!currentPokemon || !currentPokemon.sprites) return null;
    const currentImageUrl = currentPokemon.sprites.front_default;
    return getNextPokemonImage(currentImageUrl, 1);
}