import BtnBack from "../components/BtnBack";

// Component charmander

function Charmander() {
    return (
        <div style={{ border: "4px solid orange", padding: "1.4rem", borderRadius: "0.3rem", backgroundColor: "rgba(232, 146, 42, 0.6)", width: "360px", }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" alt="Charmander" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}}/>
            <h2>🔥 Charmander</h2>
            <p>Type: Fire</p>
            <p>Ability: Blaze</p>
        </div>
    )
}

function Squirtle() {
    return (
        <div style={{ border: "4px solid blue", padding: "1.4rem", borderRadius: "0.3rem", backgroundColor: "rgba(80, 192, 248, 0.6)", width: "360px" }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" alt="Squirtle" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}}/>
            <h2>💧 Squirtle</h2>
            <p>Type: Water</p>
            <p>Ability: Torrent</p>
        </div>
    )
}

function Bulbasaur() {
    return (
        <div style={{ border: "4px solid green", padding: "1.4rem", borderRadius: "0.3rem", backgroundColor: "rgba(113, 244, 126, 0.6)", width: "360px" }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="Bulbasaur" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}}/>
            <h2>🌱 Bulbasaur</h2>
            <p>Type: Grass</p>
            <p>Ability: Overgrow</p>
        </div>
    )
}

function Example1Components() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 1: Components</h2>
            <p>Create Independent a reusable UI Pieces</p>
            <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", marginTop:"1.4rem", gap:"1rem"}}>
                <Charmander />
                <Squirtle />
                <Bulbasaur />
            </div>
        </div>
    )
}

export default Example1Components;