var types = [];
var iconTypes = new Map();
var currentId = 1
const ICONSPERCARD = 5

async function getFourMoreTypes() {

    try {
        for (let i = 0; i < 4; i++) {

            types.push(await getType(currentId));
            console.log(currentId);
            currentId += 1
            if (currentId === 20) {
                currentId = 10001
            }
            if (currentId === 10002) {
                eliminarBoton()
                return
            }
        }

    } catch (err) {
        console.log("Error al obtener los types:", currentId, err);
        throw new Error("No se encontraron los types");
    }
}

async function getType(id) {
    const response = await fetch("https://pokeapi.co/api/v2/type/" + id);
    return await response.json()
}

function getFirstNotNullSprites(sprites) {
    const urls = [];

    for (const generacion in sprites) {
        for (const juego in sprites[generacion]) {
            const sprite = sprites[generacion][juego].name_icon;


            if (sprite === null || sprite === undefined) {
                continue
            }
            if (sprite.includes('…')) {
                continue
            }
            urls.push(sprite);


            if (urls.length === ICONSPERCARD) {
                return urls;
            }
        }
    }

    return urls;
}

function eliminarBoton() {
    document.getElementById('btnChargeMore').classList.add('oculta')
}

function populateDamageDiv(damageDiv) {
    let doubleDamageFrom = document.createElement('div')
    let doubleDamageTo = document.createElement('div')
    let halfDamageFrom = document.createElement('div')
    let halfDamageTo = document.createElement('div')
    let noDamageFrom = document.createElement('div')
    let noDamageTo = document.createElement('div')



}

async function populateCards() {
    await getFourMoreTypes()
    let divTypeCards = document.getElementById('types-cards')
    divTypeCards.innerHTML = ''

    for (let type of types) {

        let card = document.createElement('div')
        let title = document.createElement('h1')
        let icons = document.createElement('div')
        let damageDiv = document.createElement('div')

        populateDamageDiv(damageDiv)


        iconSources = getFirstNotNullSprites(type.sprites)
        iconTypes.set(type.id,iconSources)

        for (let i = 0; i < iconSources.length; i++) {
            let icon = document.createElement('img')
            icon.setAttribute('src', iconSources[i])
            icon.classList.add('iconImage')
            icons.appendChild(icon)
        }

        card.classList.add('type-card')
        icons.classList.add('icons')
        damageDiv.classList.add('damageDiv')

        title.textContent = type.name
        
        card.appendChild(title)
        card.appendChild(damageDiv)
        card.appendChild(icons)
        divTypeCards.appendChild(card)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    populateCards();
});


document.getElementById('btnChargeMore').addEventListener('click', function () {
    populateCards();
})