import BtnBack from "../components/BtnBack";
import { useState } from "react";

function Example5Eventos() {

    const [chosenPokemon, setChosenPokemon] = useState(null);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const [inputRange, setInputRange] = useState(0);

    // Event Click
    const handleChoice = (name) => {
        setChosenPokemon(name);
    }
    // Event Hover: MouseEnter || MouseOver
    const handleMouseEnter = (name) => {
        setHoveredPokemon(name)
    }

    // Event MouseLeave
    const handleMouseLeave = () => {
        setHoveredPokemon(null)
    }

    // Event Input
    const handleInput = (e) => {
        setInputRange(e.target.value)
    }

    const titleH3 = {
        borderBottom: '2px dotted',
        marginBottom: '1rem',
        paddingBottom: '0.4rem'
    }

    const buttonStyle = {
        background: '#72c7ee',
        color: '#143656',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }

    const eventContainer = {
        flex: 1,
        marginTop: '1.4rem',
        minWidth: '250px',
    }
    const btnsclick = {
        display: 'flex',
        flexWrap: 'wrap',          // allow buttons to wrap on smaller screens
        justifyContent: 'center', // center the group
        gap: '10px',
        marginTop: '8px',
        marginBottom: '15px'
    }

    const p_container = {
        display: 'flex',
        backgroundColor: 'rgba(30, 29, 29, 0.67)',
        marginTop: '1rem',
        borderRadius: '5px',
        padding: '10px',
        textAlign:'center',
        display:'block'
    }

    const hoverStyle = {
        background: '#72c7ee',
        color: '#143656',
        border: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '150px',        // keep buttons uniform size
        textAlign: 'center'
    }

    const rangeStyle = {
        accentColor: 'red',
        width: '100%',
    }


    return (
        <div className="container">
            <BtnBack />
            <h2>Example 5: Event Handling</h2>
            <p>Respond to user interactions (click, hover, input).</p>
            <div style={eventContainer}>
                <h3 style={titleH3} >Click Event</h3>
                <div style={btnsclick}>
                    <button onClick={(e) => handleChoice('Bullbasaur', e)} style={buttonStyle}>
                        <span style={{ zoom: 2.4 }}>🍃</span>Bullbasaur
                    </button>
                    <button onClick={(e) => handleChoice('Charmander', e)} style={buttonStyle}>
                        <span style={{ zoom: 2.4 }}>🔥</span>Charmander
                    </button>
                    <button onClick={(e) => handleChoice('Squirtle', e)} style={buttonStyle}>
                        <span style={{ zoom: 2.4 }}>💧</span> Squirtle
                    </button>
                </div>
                <div style={p_container}>
                    {chosenPokemon ? (
                        <p>You chose: {chosenPokemon}</p>
                    ) : (
                        <p>Please choose a Pokémon.</p>
                    )}
                </div>
            </div>
            <div style={eventContainer}>
                <h3 style={titleH3} >MouseEnter/MouseLeave Event:</h3>
                <div style={btnsclick}>
                    <button
                        onMouseEnter={() => handleMouseEnter('Kyogre ')}
                        onMouseLeave={handleMouseLeave}
                        style={hoverStyle}>
                        Hover Here!
                        <img style={{ zoom: '1.5' }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/382.png" alt="" />
                    </button>
                    <button
                        onMouseEnter={() => handleMouseEnter('Groudon')}
                        onMouseLeave={handleMouseLeave}
                        style={hoverStyle}>
                        Hover Here!
                        <img style={{ zoom: '1.5' }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png" alt="" />
                    </button>

                </div>
                <div style={p_container}>
                    {hoveredPokemon && (
                        <p>You are viewing: {hoveredPokemon}</p>
                    )
                    }
                </div>

            </div>
            <div style={eventContainer}>
                <h3 style={titleH3} >Input Event:</h3>
                <input style={rangeStyle}
                    onInput={handleInput}
                    type="range"
                    min="1"
                    max="100" 
                    
                />
                    <span style={{display:'block', textAlign:'center'}}>Power</span>
                <div style={p_container}>
                    {inputRange && (
                        <p > {inputRange}</p>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Example5Eventos;