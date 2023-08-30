const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
      <li class="pokemon ${pokemon.type}" data-pokemon='${JSON.stringify(
        pokemon
    )}'>
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
              <ol class="types">
                  ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join('')}
              </ol>

              <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
      </li>
  `;
}

pokemonList.addEventListener('click', (event) => {
    const listItem = event.target.closest('.pokemon');
    if (listItem) {
        const pokemonData = JSON.parse(listItem.getAttribute('data-pokemon'));
        displayPokemonModal(pokemonData);
    }
});
function displayPokemonModal(pokemon) {
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modalDetails');

    modalContent.innerHTML = `
  <div>
    <div class="titleCard ${pokemon.type}">
      <h2>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}  Number: #${pokemon.number
        }</h2>
    </div>

    <div class="container">
      <div class="container-box">
        <div class="typeCard ${pokemon.type}">  
          <p class="abilities">Type(s): ${pokemon.types.join(', ')}</p>
          <p class="type">Abilities: ${pokemon.abilities.join(', ')}</span>
        </div>   

        <div class="statsCard">
          <div class="stat ${pokemon.type}">
            <p>${pokemon.statsName[0]}</p>
            <p class="number">${pokemon.statsValue[0]}</p>
          </div>
          <div class="stat ${pokemon.type}"">
            <p>${pokemon.statsName[1]}</p>
            <p class="number">${pokemon.statsValue[1]}</p>
          </div>
          <div class="stat ${pokemon.type}"">
            <p>${pokemon.statsName[2]}</p>
            <p class="number">${pokemon.statsValue[2]}</p>
          </div>
          <div class="stat ${pokemon.type}"">
            <p>${pokemon.statsName[3]}</p>
            <p class="number">${pokemon.statsValue[3]}</p>
          </div>
          <div class="stat ${pokemon.type}"">
            <p>${pokemon.statsName[4]}</p>
            <p class="number">${pokemon.statsValue[4]}</p>
          </div>
        </div>
      </div>

      <div class="imageCard">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
    </div>
  </div>
  `;

    modal.style.display = 'block';

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});