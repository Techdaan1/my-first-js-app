//List of different Pokémon and their specifications, wrapped in an IIFE
let pokemonRepository = (function() {
  let repository = [
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
  },
];

// Checks if the Pokémon is an object
function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon
  )  {
    repository.push(pokemon);
  } else {
  console.log("pokemon is not correct")
  }
}

// returns Pokémon list
function getAll() {
    return repository;
}

function addListItem(pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let pokemonListItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  pokemonListItem.appendChild(button);
  pokemonList.appendChild(pokemonListItem);
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height: 0.3, types:["electric"] });

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//forEach Loop of the different Pokémon, including hight conditional
