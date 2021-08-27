//List of different Pokémon and their specifications
let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    type: ['grass', 'poison']
  },
  {
    name: "Caterpie",
    height: 0.3,
    type: "bug"
  },
  {
    name:"Charizard",
    height: 1.7,
    type: ['fire', 'flying']
  },
  {
    name:"Butterfree",
    height: 1.1,
    type: ['bug', 'flying']
  }
]

//Loop of the different Pokémon
for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height >1.5){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - wow, that is big! " );
  } else if (pokemonList[i].height <1 {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - wow, that is tiny! " );
  } else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - average! " )
  }
}
