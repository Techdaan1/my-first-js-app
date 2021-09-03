//List of different Pokémon and their specifications, wrapped in an IIFE
let pokemonRepository = (function() {
  let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    type: ["grass", "poison"]
  },
  {
    name: "Caterpie",
    height: 0.3,
    type: "bug"
  },
  {
    name:"Charizard",
    height: 1.7,
    type: ["fire", "flying"]
  },
  {
    name:"Butterfree",
    height: 1.1,
    type: ["bug", "flying"]
  }
];

// returns Pokémon list
function getAll() {
    return pokemonList;
  }

// Checks if the Pokémon is an object
function add(pokemon) {
  if (typeof pokemon === "object")
      pokemonList.push(pokemon);
}

return {
  getAll: getAll,
  add: add,
  addListItem: addListItem
};
})();

function addListItem(pokemon) {
  let pokemonUnList = document.querySelector('.pokemon-list');
  let pokemonListItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  pokemonListItem.appendChild(button);
  pokemonUnList.appendChild(pokemonListItem);
}

//forEach Loop of the different Pokémon, including hight conditional

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
