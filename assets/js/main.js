const pokemonList = document.getElementById('pokemonList')
const pokemonListDetail = document.getElementById('pokemonListDetail')
const loadMoreButton = document.getElementById('loadMoreButton')
const changeThemebutton = document.getElementById('changeThemebutton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li onclick="openModal(${pokemon.number})" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}
function convertPokemonDetailToLi(pokemon) {
    //convert pokemon number to string and format number 
    var number = pokemon.number
    var numberToString = number.toString();
    var NumberFormated = numberToString.padStart(3, '0')

    //convert pokemon height to meter
    var height = pokemon.height
    var finalHeight = height/10 

    // convert pokemon weight to kilogram
    var weight = pokemon.weight
    var finalWeight = weight/10
 
    //generate html content
    return `
        <div class="pokemonDetail ${pokemon.type}">
            <div class="number">#${NumberFormated}</div>
            <span class="name">${pokemon.name}</span>
            <div class="detail"> 
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                <div class="values">
                    <span class="height">Height: ${finalHeight}m</span>
                    <span class="weight">Weight: ${finalWeight}Kg</span>
                    <ol class="types">Type:
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

function openModal(numero){
    const description = document.getElementById('windowDescription')
    description.classList.add('open')

    description.addEventListener('click', (e) => {
        if(e.target.id == 'windowDescription'){
            description.classList.remove('open')
            pokemonListDetail.innerHTML = ''
        }
    })

    function getPokemonDetail(numero){
        pokeApi.getPokemon(numero).then((pokemons = [numero]) =>{
            const NewHtml = pokemons.map(convertPokemonDetailToLi).join('')
            pokemonListDetail.innerHTML += NewHtml
        }) 
    }
    getPokemonDetail(numero -1)
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

changeThemebutton.addEventListener('click', () => {
    document.body.classList.toggle('changeTheme');
})
