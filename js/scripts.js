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
    type: ["bug', 'flying"]
  }
];

// returns pokemonlist
function getAll() {
    return pokemonList;
  }

function add(pokemon) {
      pokemonList.push(pokemon);
    }

return {
  getAll: getAll,
  add: add
};
})();

//forEach Loop of the different Pokémon, including hight conditional

pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height >1.5){
    document.write(pokemon.name + " (height: " + pokemon.height + ") - wow, that is big! " + "<br/>" );
  } else if (pokemon.height <1){
    document.write(pokemon.name + " (height: " + pokemon.height + ") - ahw, so tiny! " + "<br/>" );
  } else {
    document.write(pokemon.name + " (height: " + pokemon.height + ") - average " + "<br/>" );
  }
});
