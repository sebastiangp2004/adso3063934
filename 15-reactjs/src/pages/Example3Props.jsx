import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

    // Data
    const pokemons = [
        {id: 1, name: 'Pikachu', type: 'Electric', power:'Thunderbolt', legendary: false},
        {id: 2, name: 'Bulbasaur', type: 'Grass/Poison', power:'Vine Whip', legendary: false},
        {id: 3, name: 'Charmander', type: 'Fire', power:'Ember', legendary: false},
        {id: 4, name: 'Squirtle', type: 'Water', power:'Water Gun', legendary: false},
        {id: 5, name: 'Mewtwo', type: 'Psychic', power:'Psychic', legendary: true},
        {id: 6, name: 'moltres', type: 'Fire/Flying', power:'Fire Blast', legendary: true},
        {id: 7, name: 'Zapdos', type: 'Electric/Flying', power:'Thunder Shock', legendary: true},
        {id: 8, name: 'Articuno', type: 'Ice/Flying', power:'Ice Beam', legendary: true},
    ]


    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function arguments).</p>            
        </div>
    )
}

export default Example3Props;