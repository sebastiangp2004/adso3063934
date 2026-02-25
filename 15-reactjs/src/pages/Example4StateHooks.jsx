import { useState, useEffect } from "react";
import BtnBack from "../components/BtnBack";

function Example4StateHooks() {

    // List the Pokémons
    const pokemons = [
        { id: 1, name: 'Pikachu', type: 'Electric', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', legendary: false },
        { id: 2, name: 'Bulbasaur', type: 'Grass', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', legendary: false },
        { id: 3, name: 'Charmander', type: 'Fire', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', legendary: false },
        { id: 4, name: 'Squirtle', type: 'Water', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', legendary: false },
        { id: 5, name: 'Mewtwo', type: 'Psychic', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png', legendary: true },
        { id: 6, name: 'moltres', type: 'Fire', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png', legendary: true },
        { id: 7, name: 'Zapdos', type: 'Electric', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png', legendary: false },
        { id: 8, name: 'Articuno', type: 'Ice', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png', legendary: false },
        { id: 9, name: 'Gengar', type: 'Ghost', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png', legendary: false },
        { id: 10, name: 'Venusaur', type: 'Grass', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', legendary: false },
        { id: 11, name: 'Charizard', type: 'Fire', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', legendary: false },
        { id: 12, name: 'Blastoise', type: 'Water', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png', legendary: false },
        { id: 13, name: 'Dragonite', type: 'Dragon', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png', legendary: false },
        { id: 14, name: 'Onix', type: 'Rock', Image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png', legendary: false },
        { id: 15, name: 'Machamp', type: 'Fighting', Image:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png', legendary: false },
    ];

    // 1. ESTADOS
    const [wildPokemon, setWildPokemon] = useState(null); // Pokémon que aparece
    const [myPokedex, setMyPokedex] = useState([]); // Pokémon capturados
    const [isCapturing, setIsCapturing] = useState(false); // Estado del botón

    // 2. BUSCAR POKEMON
    const disponibles = pokemons.filter(p => !myPokedex.some(c => c.id === p.id));

    const findPokemon = () => {
        if (disponibles.length > 0) {
            const randomIndex = Math.floor(Math.random() * disponibles.length);
            setWildPokemon(disponibles[randomIndex]);
        }
    };

    // 3. CAPTURA DE POKEMON
    useEffect(() => {
        if (isCapturing) {
            const timer = setTimeout(() => {
                setMyPokedex(prev => [...prev, wildPokemon]);
                setIsCapturing(false);
                setWildPokemon(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCapturing, wildPokemon]);

    // Styles
    const style = {
        card: {
            background: '#2b2b2b6d',
            padding: '1rem',
            borderRadius: '10px',
            border: '2px solid #fff',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            margin: '1rem 0',
            color: 'white'
        },

        img: { display: 'flex', margin: '1rem auto', width: '150px' },
        btn: {
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '20px',
            cursor: 'pointer',
            marginTop: '1rem',
            opacity: isCapturing ? 0.5 : 1,
            fontWeight: 'bold'
        },

        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '10px',
            marginTop: '1rem',
            color: 'white'
        }
    };

    // Styles Types
    const typeColors = {
        electric: '#F8D030',
        grass: '#78C850',
        fire: '#F08030',
        water: '#6890F0',
        psychic: '#F85888',
        ice: '#98D8D8',
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 4: Pokedex Challenge</h2>
            <p>Atrapa a los 40 Pokémon disponibles.</p>

            <div style={{ textAlign: 'center' }}>
                {!wildPokemon ? (
                    /* SI NO HAY POKEMON SALVAJE, EVALUAMOS SI MOSTRAR EL BOTÓN O EL MENSAJE FINAL */
                    disponibles.length > 0 ? (
                        <button onClick={findPokemon} style={style.btn}>
                            Find Pokémon!
                        </button>
                    ) : (
                        <div style={style.msgFinal}>
                            <h3>🎉 Complete Collection! 🎉</h3>
                            <p>You've caught all the Pokémon. You're a master!</p>
                        </div>
                    )
                ) : (
                    /* SI HAY UN POKEMON SALVAJE */
                    <div style={style.card}>
                        <h4>¡Un {wildPokemon.name} savage has appeared!</h4>
                        <img
                            src={wildPokemon.Image}
                            alt={wildPokemon.name} style={style.img}
                        />
                        <button disabled={isCapturing} onClick={() => setIsCapturing(true)} style={style.btn}>
                            {isCapturing ? 'Capturing...' : 'Throw Poké Ball'}
                        </button>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h4>My Pokemons ({myPokedex.length} / {pokemons.length})</h4>
                <div style={style.grid}>
                    {myPokedex.map((p, index) => (
                        <div key={index} style={{ textAlign: 'center', fontSize: '0.8rem', background: '#2b2b2b6d', borderRadius: '5px', border: '2px solid #fff', padding: '1rem', transition: 'all 0.5s ease' }} 
                            onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.filter = 'brightness(0.8)';
                            e.currentTarget.style.borderColor = '#FFD700';
                             }}
                     
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.filter = 'brightness(1)';
                                e.currentTarget.style.borderColor = '#fff';
                            }}>
                                
                            <img src={p.Image} alt={p.name} style={{ width: '70px' }} />
                            <p><strong>{p.name}</strong></p>
                            <p style={{ color: typeColors[p.type?.toLowerCase()] || '#ccc' }}><strong>{p.type}</strong></p>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Example4StateHooks