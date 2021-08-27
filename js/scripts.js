//List of different Pokémon and their specifications
let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    type: ['grass', 'poison']
  },
  {
    name: "Charmander",
    height: 0.6,
    type: "fire"
  },
  {
    name:"Squirtle",
    height: 0.5,
    type: "water"
  }
]

//Loop of the different Pokémon
for (let i=0; i < pokemonList.length; i++)
{
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") " );
}
