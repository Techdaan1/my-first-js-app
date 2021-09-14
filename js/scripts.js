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
  pokemonListItem.classList.add('group-list-item');

  //creates button
  let button = document.createElement('button');
  //puts names on closeButtonElement
  button.innerText = pokemon.name;
  //creates new class
  button.classList.add('button-class', 'btn', 'btn-primary');

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
    item.imageUrlFront = details.sprites.front_default;
    item.imageUrlBack = details.sprites.back_default;
    item.height = details.height;
    item.weight = details.weight;
    item.types = details.types;
    item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
}

// shows information with Pokemon name, height and an image of the Pokemon
function showDetails(item) {
 pokemonRepository.loadDetails(item).then(function () {
    showModal(item);
  });
}

let modalContainer = document.querySelector('#modal-container');

function showModal(item) {
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $("<h1>" + item.name + "</h1>");
  let imageElementFront = $('<img class="modal-img" style="width:50%">');
  imageElementFront.attr("src", item.imageUrlFront);
  let imageElementBack = $('<img class="modal-img" style="width:50%">');
  imageElementBack.attr("src", item.imageUrlBack);
  let heightElement = $("<p>" + "Height : " + item.height + "</p>");
  let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
  let typesElement = $("<p>" + "Types : " + item.types.join(", ") + "</p>");
  let abilitiesElement = $(
    "<p>" + "Abilities : " + item.abilities.join(", ") + "</p>");

  modalTitle.append(nameElement);
  modalBody.append(imageElementFront);
  modalBody.append(imageElementBack);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
  modalBody.append(abilitiesElement);
}

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
