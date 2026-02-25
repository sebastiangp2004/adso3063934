import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

    // Data
    const pokemons = [
        { id: 1, name: 'Pikachu', type: 'Electric', power: 'Thunderbolt', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', legendary: false },
        { id: 2, name: 'Bulbasaur', type: 'Grass', power: 'Vine Whip', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', legendary: false },
        { id: 3, name: 'Charmander', type: 'Fire', power: 'Ember', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', legendary: false },
        { id: 4, name: 'Squirtle', type: 'Water', power: 'Water Gun', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', legendary: false },
        { id: 5, name: 'Mewtwo', type: 'Psychic', power: 'Psychic', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png', legendary: true },
        { id: 6, name: 'moltres', type: 'Fire', power: 'Fire Blast', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png', legendary: true },
        { id: 7, name: 'Zapdos', type: 'Electric', power: 'Thunder Shock', image:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png' , legendary:true },
        { id: 8, name: 'Articuno', type: 'Ice', power:'Ice Beam' , image:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png' , legendary:true },
    ]

    // Styles
    const Styles = {
        cards: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function arguments).</p>
            <div style={Styles.cards}>
                {/* We pass different props to each card */}
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                            key={pokemon.id}
                            image={pokemon.image}
                            name={pokemon.name}
                            type={pokemon.type}
                            power={pokemon.power}
                            legendary={pokemon.legendary}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Example3Props;