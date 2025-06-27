let todosLosPokemones = [];

async function obtenerTodosLosPokemones() {
    if (todosLosPokemones.length > 0) return; // Ya cargados
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    todosLosPokemones = data.results.map(p => p.name);
}

async function mostrarSugerencias() {
    await obtenerTodosLosPokemones();
    const sugerencias = document.getElementById('sugerencias');
    sugerencias.innerHTML = todosLosPokemones.map(nombre =>
        `<li onclick="seleccionarSugerencia('${nombre}')">${nombre}</li>`
    ).join('');
    sugerencias.style.display = 'block';
}

function filtrarSugerencias() {
    const input = document.getElementById('pokemon-name').value.toLowerCase();
    const sugerencias = document.getElementById('sugerencias');
    const filtrados = todosLosPokemones.filter(nombre => nombre.includes(input));
    sugerencias.innerHTML = filtrados.map(nombre =>
        `<li onclick="seleccionarSugerencia('${nombre}')">${nombre}</li>`
    ).join('');
    sugerencias.style.display = filtrados.length ? 'block' : 'none';
}

function seleccionarSugerencia(nombre) {
    document.getElementById('pokemon-name').value = nombre;
    document.getElementById('sugerencias').style.display = 'none';
    buscarPokemon(); // Llama a buscarPokemon al seleccionar
}

async function buscarPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const root = document.getElementById('root'); // Asegúrate de que este ID exista en tu HTML

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error(`Pokemon no encontrado: ${response.status}`);
        }
        const data = await response.json();

        const pokemonImage = data.sprites.front_default;
        const pokemonNameText = data.name;
        const pokemonTypes = data.types.map(type => type.type.name).join(', ');

        root.innerHTML = `
            <h2>${pokemonNameText}</h2>
            <img src="${pokemonImage}" alt="${pokemonNameText}">
            <p>Tipos: ${pokemonTypes}</p>
        `;

    } catch (error) {
        root.innerHTML = `<p>${error.message}</p>`;
    }
}