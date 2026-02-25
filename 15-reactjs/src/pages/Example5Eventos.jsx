import BtnBack from "../components/BtnBack";
import { useState } from "react";

function Example5Eventos() {

    const [chosenPokemon, setChosenPokemon] = useState(null);

    const handleChoice = (name) => {
        setChosenPokemon(name);
    }

    const buttonStyle = {
        color: 'red',
        padding: '10px 20px',
        margin: '5px',
        border: '2px solid red',
    }

    return(
        <div className="container">
            <BtnBack />
            <h2>Example 5: Event Handling</h2>
            <p>Respond to user interactions (click, hover, input).</p>
            <div>
                <h3>Click Event</h3>
                <button onClick={(e) => handleChoice('Bullbasaur', e)} style={buttonStyle}>
                    Bullbasaur
                </button>
                <button onClick={(e) => handleChoice('Charmander', e)} style={buttonStyle}>
                    Charmander
                </button>
                <button onClick={(e) => handleChoice('Squirtle', e)} style={buttonStyle}>
                    Squirtle
                </button>
                {chosenPokemon ? (
                    <p>You chose: {chosenPokemon}</p>
                ) : (
                    <p>Please choose a Pokémon.</p>
                )}
            </div>
        </div>
    )
}

export default Example5Eventos;