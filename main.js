// ============================================
// POST.JS - Lógica principal y event listeners
// ============================================

// Variables globales
let currentPokemon = null;
let isShowingFront = true;
let isShiny = false;

// ============================================
// EVENT LISTENERS
// ============================================

// Búsqueda normal por nombre
document.getElementById('searchBtn').addEventListener('click', function () {
    const pokemonName = document.getElementById('pokemonInput').value.trim().toLowerCase();
    if (pokemonName) {
        searchPokemon(pokemonName);
    } else {
        alert('Por favor, introduce el nombre de un Pokemon');
    }
});

// Búsqueda con Enter
document.getElementById('pokemonInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

// Búsqueda aleatoria
document.getElementById('randomSearchBtn').addEventListener('click', function () {
    const pokemonId = getRandomPokemonId();
    console.log('Buscando Pokemon aleatorio con ID:', pokemonId);
    searchPokemon(pokemonId);
});

// ============================================
// INICIALIZACIÓN
// ============================================

// Cargar Pokemon inicial al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar Pikachu por defecto
    searchPokemon(25);
});