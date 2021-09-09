//List of different Pokémon and their specifications, wrapped in an IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

function addListItem(pokemon){
  //selects pokemon list
  let pokemonList = document.querySelector('.pokemon-list');

  //creates list item
  let pokemonListItem = document.createElement('li');

  //creates button
  let button = document.createElement('button');
  //puts names on closeButtonElement
  button.innerText = pokemon.name;
  //creates new class
  button.classList.add('button-class');

  //adds
  pokemonListItem.appendChild(button);
  pokemonList.appendChild(pokemonListItem);
  //adds click event to the button class
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
    //adds details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

// shows information with Pokemon name, height and an image of the Pokemon
function showDetails(pokemon) {
 loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}

let modalContainer = document.querySelector('#modal-container');

function showModal(pokemon) {
  let modalContainer = document.querySelector('#modal-container');

  // Heb ik dit nog nodig? modalContainer.classList.add('.is-visible');

  //clears all existing modal content
  modalContainer.innerHTML = '';

  //Creates model
  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Adds the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'X';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name;

  let contentElement = document.createElement('p');
  contentElement.innerText = pokemon.height;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  //shows modal
  modalContainer.classList.add('is-visible');
}

//hides modal
function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

//hides model when Escape is pressed
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

//hides model when modal container is clicked
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if(target === modalContainer) {
    hideModal();
  }
});

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal:showModal,
  hideModal:hideModal,
  };
})();



//forEach Loop of the different Pokémon
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
