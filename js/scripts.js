//List of different Pokémon and their specifications, wrapped in an IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

// Adds the Pokémon and checks if the Pokémon is an object
function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
  )  {
    pokemonList.push(pokemon);
  } else {
  console.log("pokemon is not correct")
  }
}

// returns all the Pokémon from the list
function getAll() {
    return pokemonList;
}

//
function addListItem(pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let pokemonListItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  // adds the button on the list
  pokemonListItem.appendChild(button);
  pokemonList.appendChild(pokemonListItem);
  button.addEventListener('click', function(event) {
    showDetails(pokemon);
  });
}

//loads pokemon list from the pokedex api
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
      console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

//loads details of all the pokemon from the pokedex api
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

// shows modal wit Pokemon name, height and an image of the Pokemon
function showDetails(pokemon) {
 pokemonRepository.loadDetails(item).then(function () {
    console.log(item);
  });
}

function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.add('is-visible');
  //clears all existing modal content
  modalContainer.innerHTML = '';
  
  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal();
});



return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal:showModal,
  };
})();



//forEach Loop of the different Pokémon
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
