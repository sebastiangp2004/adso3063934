import BtnBack from "../components/BtnBack";
import { useState } from "react";

function Example6CondicionalListas() {
    // Hidden Pokémon list with powers
    const pokemonList = [
        { id: 1, name: 'Charmander', level: 5, type: 'Fire', power: 'Ember', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
        { id: 2, name: 'Squirtle', level: 5, type: 'Water', power: 'Water Gun', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
        { id: 3, name: 'Bulbasaur', level: 5, type: 'Grass', power: 'Vine Whip', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
        { id: 4, name: 'Pikachu', level: 5, type: 'Electric', power: 'Thunderbolt', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
        { id: 5, name: 'Psyduck', level: 4, type: 'Water', power: 'Water Pulse', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png' },
        { id: 6, name: 'Clefairy', level: 4, type: 'Fairy', power: 'Pound', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png' },
        { id: 7, name: 'Growlithe', level: 5, type: 'Fire', power: 'Flame Charge', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png' },
        { id: 8, name: 'Eevee', level: 5, type: 'Normal', power: 'Tackle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
        { id: 9, name: 'Bellsprout', level: 5, type: 'Grass', power: 'Vine Whip', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png' },
        { id: 10, name: 'Nidoran♀', level: 4, type: 'Poison', power: 'Poison Powder', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png' },
        { id: 11, name: 'Nidoran♂', level: 5, type: 'Poison', power: 'Poison Powder', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png' },
    ];

    // Color map by type
    const typeColors = {
        'Electric': '#FFD700',
        'Fire': '#FF6347',
        'Water': '#00BFFF',
        'Grass': '#7CFC00',
        'Normal': '#A9A9A9',
        'Poison': '#8B008B',
        'Fairy': '#FFB6C1'
    };

    const [addedPokemon, setAddedPokemon] = useState([]);
    const [selectedType, setSelectedType] = useState('All Types');
    const [level5Only, setLevel5Only] = useState(false);

    // Get unique types
    const types = ['All Types', ...new Set(pokemonList.map(p => p.type))];

    // Filter Pokémon for adding
    const filteredList = pokemonList.filter(pokemon => {
        const typeMatch = selectedType === 'All Types' || pokemon.type === selectedType;
        const levelMatch = !level5Only || pokemon.level === 5;
        return typeMatch && levelMatch;
    });

    // Filter displayed Pokémon based on type and level
    const displayedPokemon = addedPokemon.filter(pokemon => {
        const typeMatch = selectedType === 'All Types' || pokemon.type === selectedType;
        const levelMatch = !level5Only || pokemon.level === 5;
        return typeMatch && levelMatch;
    });

    // Add random Pokémon from complete list (independent of filters)
    const handleAddPokemon = () => {
        const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        setAddedPokemon([...addedPokemon, { ...randomPokemon, key: Date.now() }]);
    };

    // Remove Pokémon
    const handleRemovePokemon = (key) => {
        setAddedPokemon(addedPokemon.filter(p => p.key !== key));
    };

    // Styles

    const contentStyle = {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const filterBoxStyle = {
        background: 'rgb(205, 205, 205)',
        border: '5px solid #1a73e8',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        alignItems: 'center'
    };

    const filterLabelStyle = {
        fontWeight: 'bold',
        color: 'black'
    };

    const selectStyle = {
        padding: '10px 15px',
        borderRadius: '5px',
        border: '2px solid #1a73e8',
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold',
        cursor: 'pointer',
        minWidth: '150px'
    };

    const checkboxContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    const checkboxStyle = {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        accentColor: '#1a73e8'
    };

    const addButtonStyle = {
        padding: '10px 20px',
        background: '#3e62e4',
        color: 'white',
        border: 'none',
        borderRadius: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem',
        flex: 1,
        minWidth: '150px'
    };

    const countStyle = {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#1a73e8',
        marginTop: '1.5rem',
        marginBottom: '1rem'
    };

    const gridStyle = {
        border:'5px solid #0008ff',
        backgroundColor:'#c8c8c8',
        borderRadius:'15px',
        padding:'15px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '1rem'
    };

    const getCardStyle = (type) => ({
        background: '#1a1a2e',
        border: `4px solid ${typeColors[type] || '#888'}`,
        borderRadius: '15px',
        padding: '0',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
    });

    const imageContainerStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '150px'
    };

    const imageStyle = {
        width: '140px',
        height: '140px',
        objectFit: 'contain',
        margin: '0 auto'
    };

    const infoStyle = {
        fontSize: '0.9rem',
        padding: '15px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    };

    const removeButtonStyle = {
        padding: '10px 15px',
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '0',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '100%',
        fontSize: '0.9rem',
        transition: 'background 0.2s'
    };

    const pokemonNameStyle = {
        margin: '0',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'white'
    };

    const pokemonStatStyle = {
        margin: '0',
        fontSize: '0.85rem',
        color: '#b0b0b0'
    };

    const pokemonPowerStyle = {
        margin: '5px 0 0 0',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#fff'
    };

    return (
        <div className="container">
            <div>
                <BtnBack />
                <h2 >Example 6: Conditional Rendering</h2>
                <p>Show or hide UI elements based on state.</p>
            </div>

            <div style={contentStyle}>
                <div style={filterBoxStyle}>
                    <label style={filterLabelStyle}>Filters:</label>
                    
                    <select 
                        value={selectedType} 
                        onChange={(e) => setSelectedType(e.target.value)}
                        style={selectStyle}
                    >
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <div style={checkboxContainerStyle}>
                        <input 
                            type="checkbox" 
                            id="level5" 
                            checked={level5Only}
                            onChange={(e) => setLevel5Only(e.target.checked)}
                            style={checkboxStyle}
                        />
                        <label htmlFor="level5" style={{ fontWeight: 'bold', color: '#1a73e8', cursor: 'pointer' }}>
                            Show only level 5
                        </label>
                    </div>

                    <button onClick={handleAddPokemon} style={addButtonStyle}>
                        + Add random Pokémon
                    </button>
                </div>

                <div style={countStyle}>
                    Showing {displayedPokemon.length} of {addedPokemon.length} captured Pokémon
                </div>

                <div style={gridStyle}>
                    {filteredList.length === 0 && selectedType !== 'All Types' ? (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#f44336', fontSize: '1.1rem' }}>
                            ❌ No Pokémon of type "{selectedType}" available.
                        </p>
                    ) : displayedPokemon.length > 0 ? (
                        displayedPokemon.map(pokemon => (
                            <div key={pokemon.key} style={getCardStyle(pokemon.type)}>
                                <div style={imageContainerStyle}>
                                    <img src={pokemon.image} alt={pokemon.name} style={imageStyle} />
                                </div>
                                <div style={infoStyle}>
                                    <h4 style={pokemonNameStyle}>{pokemon.name}</h4>
                                    <p style={pokemonStatStyle}>Type: {pokemon.type}</p>
                                    <p style={pokemonStatStyle}>Level: {pokemon.level}</p>
                                    <p style={pokemonPowerStyle}>Power: {pokemon.power}</p>
                                </div>
                                <button onClick={() => handleRemovePokemon(pokemon.key)} style={removeButtonStyle}>
                                    Release
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#000000', fontSize: '1.1rem' }}>
                            No Pokémon selected. Add one to get started!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Example6CondicionalListas;