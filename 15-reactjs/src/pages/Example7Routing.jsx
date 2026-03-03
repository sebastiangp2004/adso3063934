import { Routes, Route, Link, useLocation } from 'react-router-dom'
import BtnBack from "../components/BtnBack";
import { useState, useEffect } from 'react';

// 📦 Array local de Pokémon
const pokemonData = [
    {
        name: "bulbasaur",
        types: ["grass", "poison"],
        height: 7,
        weight: 69,
        hp: 45,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    {
        name: "charmander",
        types: ["fire"],
        height: 6,
        weight: 85,
        hp: 39,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
    },
    {
        name: "squirtle",
        types: ["water"],
        height: 5,
        weight: 90,
        hp: 44,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    },
    {
        name: "pikachu",
        types: ["electric"],
        height: 4,
        weight: 60,
        hp: 35,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    },

];

function GeneralInfo() {
    return (
        <div><h2>General Info</h2></div>
    )
}

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulamos carga desde el array local
        setTimeout(() => {
            setPokemons(pokemonData.map(p => ({ name: p.name })));
            setLoading(false);
        }, 500); // Pequeño delay para simular carga
    }, []);

    if (loading) return <p>Cargando lista...</p>

    return (
        <div style={styles.listContainer}>
            <h2 style={styles.pokemonName}>Pokemon List</h2>
            <div style={styles.grid}>
                {pokemons.map((pokemon, index) => (
                    <Link
                        key={pokemon.name}
                        to={`/example7/Details?name=${pokemon.name}`}
                        style={styles.gridItem}
                    >
                        <img
                            src={pokemonData.find(p => p.name === pokemon.name)?.sprite}
                            alt={pokemon.name}
                            style={styles.gridImg}
                        />
                        <span style={styles.gridName}>
                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

function PokemonDetails() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get('name')?.toLowerCase();

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Buscamos en el array local en lugar de hacer fetch
        setTimeout(() => {
            const foundPokemon = pokemonData.find(p => p.name === name);
            setPokemon(foundPokemon || null);
            setLoading(false);
        }, 300);
    }, [name]);

    if (loading) return <p>Cargando {name}...</p>
    if (!pokemon) return <p>Pokémon no encontrado</p>

    return (
        <div style={styles.card}>
            <h2 style={styles.pokemonName}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <img
                src={pokemon.img}
                alt={pokemon.name}
                style={styles.pokemonImg}
            />
            <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Tipo</span>
                    <span>{pokemon.types.join(', ')}</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Altura</span>
                    <span>{pokemon.height / 10}m</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Peso</span>
                    <span>{pokemon.weight / 10}kg</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>HP</span>
                    <span>{pokemon.hp}</span>
                </div>
            </div>
        </div>
    )
}

const styles = {
    nav: {
        display: 'flex',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: '#1a1a2e',
        borderRadius: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap',
    },
    link: {
        textDecoration: 'none',
        color: '#e0e0e0',
        padding: '8px 14px',
        borderRadius: '8px',
        backgroundColor: '#16213e',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s ease',
        border: '1px solid #0f3460',
    },
    card: {
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '300px',
        border: '1px solid #0f3460',
    },
    pokemonName: {
        color: '#e0e0e0',
        margin: 0,
        fontSize: '24px',
        textTransform: 'capitalize',
    },
    pokemonImg: {
        width: '180px',
        height: '180px',
        objectFit: 'contain',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        width: '100%',
    },
    infoItem: {
        backgroundColor: '#16213e',
        borderRadius: '8px',
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#e0e0e0',
        fontSize: '14px',
    },
    label: {
        fontSize: '11px',
        color: '#8888aa',
        marginBottom: '4px',
        textTransform: 'uppercase',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
    },
    gridItem: {
        backgroundColor: '#16213e',
        border: '1px solid #0f3460',
        borderRadius: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#e0e0e0',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    gridImg: {
        width: '80px',
        height: '80px',
        objectFit: 'contain',
    },
    gridName: {
        fontSize: '13px',
        marginTop: '6px',
        textTransform: 'capitalize',
    }
}

function InternalNavegation() {
    return (
        <nav style={styles.nav}>
            <Link to="/example7" style={styles.link}>Home🏡</Link>
            <Link to="/example7/List" style={styles.link}>List🧾</Link>
            <Link to="/example7/Details?name=Pikachu" style={styles.link}>Pikachu⚡</Link>
            <Link to="/example7/Details?name=Charmander" style={styles.link}>Charmander🔥</Link>
        </nav>
    )
}

function Example7Routing() {
    return (
        <div className='container example7-container'>
            <BtnBack />
            <h2>Example 7: React Router</h2>
            <p>Navigation between different 'pages' without reloading</p>
            <InternalNavegation />

            <Routes>
                <Route path='/' element={<GeneralInfo />} />
                <Route path='/list' element={<PokemonList />} />
                <Route path='/details' element={<PokemonDetails />} />
            </Routes>
        </div>
    )
}

export default Example7Routing;