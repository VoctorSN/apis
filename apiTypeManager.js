var types = [];
var offset = 0

async function getFourMoreTypes() {
    try {        
        const response = await fetch("https://pokeapi.co/api/v2/type?limit=4&offset=" + offset);
        const json = await response.json();
        types.push(...json.results)        
        offset += 4
        if(json.results.length < 4){
            eliminarBoton()
        }
    } catch (err) {
        console.log("Error al obtener los types:", err);
        throw new Error("No se encontraron los types");
    }
}

function eliminarBoton(){
    document.getElementById('btnChargeMore').classList.add('oculta')
}

async function populateCards() {
    await getFourMoreTypes()
    let divTypeCards = document.getElementById('types-cards')
    divTypeCards.innerHTML = ''

    for (let type of types) {
        
        let card = document.createElement('div')
        let title = document.createElement('h1')

        card.classList.add('type-card')
        title.textContent = capitalize(type.name)

        card.appendChild(title)
        divTypeCards.appendChild(card)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    populateCards();
});


document.getElementById('btnChargeMore').addEventListener('click', function () {
    populateCards();
})

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}