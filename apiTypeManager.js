var types = [];
var iconTypes = new Map();
var currentId = 1
const ICONSPERCARD = 5
const btnChargeMore = document.getElementById('btnChargeMore')
var currentType = undefined


async function getFourMoreTypes() {

    try {
        for (let i = 0; i < 4; i++) {

            types.push(await getType(currentId));
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

function appendFourIcons() {
    let icons = []
    iconSources = getFirstNotNullSprites(currentType.sprites)
    iconTypes.set(currentType.id, iconSources)
    for (let i = 0; i < iconSources.length; i++) {
        let icon = document.createElement('img');
        icon.setAttribute('src', iconSources[i]);
        icon.classList.add('iconImage');
        icons.push(icon);
    }
    return icons
}

function getDamageMultipliers() {
    let damageMultipliers = []
    for (let typeMultiplier in currentType.damage_relations) {

        let multiplierDiv = document.createElement('div')
        let multiplierTitle = document.createElement('h3')
        let pContainer = document.createElement('div')


        for (let damageMultiplier of currentType.damage_relations[typeMultiplier]) {
            let multiplierP = document.createElement('p')

            multiplierP.innerText = damageMultiplier.name
            multiplierP.classList.add('type-badge', `type-${damageMultiplier.name}`);

            pContainer.appendChild(multiplierP)
        }

        pContainer.classList.add('badgesDiv')
        multiplierDiv.classList.add('centered')
        multiplierDiv.appendChild(multiplierTitle)
        multiplierDiv.appendChild(pContainer)
        multiplierTitle.textContent = typeMultiplier.replaceAll('_',' ')

        damageMultipliers.push(multiplierDiv)
    }

    return damageMultipliers
}


async function populateFourMoreCards() {
    await getFourMoreTypes()
    let divTypeCards = document.getElementById('types-cards')

    for (let type of types.slice(-4)) {

        currentType = type

        let card = document.createElement('div')
        let title = document.createElement('h1')
        let icons = document.createElement('div')
        let damageDiv = document.createElement('div')
        let spacer = document.createElement('div')

        damageDiv.classList.add('info_lists')

        for (let damageMultiplier of getDamageMultipliers()) {
            damageDiv.appendChild(damageMultiplier)
        }
        
        for (let icon of appendFourIcons()) {
            icons.appendChild(icon)
        }


        card.classList.add('type-card')
        icons.classList.add('icons')
        damageDiv.classList.add('damageDiv')
        spacer.classList.add('spacer')

        title.textContent = currentType.name

        card.appendChild(title)
        card.appendChild(damageDiv)
        card.appendChild(spacer)
        card.appendChild(icons)
        divTypeCards.appendChild(card)
    }

}

document.addEventListener('DOMContentLoaded', function () {
    populateFourMoreCards();
});


btnChargeMore.addEventListener('click', async function () {
    btnChargeMore.innerText = 'Cargando...'
    await populateFourMoreCards();
    btnChargeMore.innerText = 'Cargar más'
})
