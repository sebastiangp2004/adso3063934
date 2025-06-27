const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const modal = document.querySelector("#pokemonModal");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector(".close-modal");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const errorMessage = document.querySelector("#errorMessage");
let allPokemon = [];
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Cargar los primeros 151 Pokémon
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            allPokemon.push(data);
            mostrarPokemon(data);
        })
        .catch(error => console.error("Error fetching Pokémon:", error));
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height/10}m</p>
                <p class="stat">${poke.weight/10}kg</p>
            </div>
        </div>
    `;
    
    div.addEventListener("click", () => {
        mostrarModal(poke);
    });
    
    listaPokemon.append(div);
}

function mostrarModal(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const stats = poke.stats.map(stat => {
        return {
            name: stat.stat.name.replace('-', ' '),
            value: stat.base_stat
        };
    });

    const statsHTML = stats.map(stat => `
        <div class="modal-stat">
            <span class="stat-name">${stat.name}:</span>
            <span class="stat-value">${stat.value}</span>
        </div>
    `).join('');

    modalBody.innerHTML = `
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="modal-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}" style="width:100%">
        </div>
        <div class="modal-stats">
            ${statsHTML}
            <div class="modal-stat">
                <span class="stat-name">height:</span>
                <span class="stat-value">${poke.height/10}m</span>
            </div>
            <div class="modal-stat">
                <span class="stat-name">weight:</span>
                <span class="stat-value">${poke.weight/10}kg</span>
            </div>
        </div>
    `;

    modal.style.display = "block";
}

// Función de búsqueda mejorada
function buscarPokemon() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Ocultar mensaje de error
    if (errorMessage) {
        errorMessage.style.display = "none";
    }
    
    if (!searchTerm) {
        // Si está vacío, mostrar todos
        listaPokemon.innerHTML = "";
        allPokemon.forEach(poke => mostrarPokemon(poke));
        return;
    }

    const resultados = allPokemon.filter(poke => {
        const nombreCoincide = poke.name.toLowerCase().includes(searchTerm);
        const idCoincide = poke.id.toString() === searchTerm;
        const idFormateadoCoincide = poke.id.toString().padStart(3, '0') === searchTerm;
        
        return nombreCoincide || idCoincide || idFormateadoCoincide;
    });

    listaPokemon.innerHTML = "";
    
    if (resultados.length > 0) {
        resultados.forEach(poke => mostrarPokemon(poke));
    } else {
        // Mostrar mensaje de error solo si existe el elemento
        if (errorMessage) {
            errorMessage.textContent = `No se encontró ningún Pokémon con "${searchInput.value}"`;
            errorMessage.style.display = "block";
        } else {
            console.log("No se encontraron resultados para:", searchInput.value);
        }
    }
}

// Event listeners con verificación de existencia
if (closeModal) {
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

if (searchButton) {
    searchButton.addEventListener("click", buscarPokemon);
}

if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            buscarPokemon();
        }
    });
}

// Filtrado por tipo con verificación
if (botonesHeader.length > 0) {
    botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
        const botonId = event.currentTarget.id;
        listaPokemon.innerHTML = "";
        
        if (errorMessage) {
            errorMessage.style.display = "none";
        }

        if (botonId === "ver-todos") {
            allPokemon.forEach(poke => mostrarPokemon(poke));
        } else {
            const resultados = allPokemon.filter(poke => 
                poke.types.some(type => type.type.name.includes(botonId))
            );
            
            if (resultados.length > 0) {
                resultados.forEach(poke => mostrarPokemon(poke));
            } else {
                if (errorMessage) {
                    errorMessage.textContent = `No hay Pokémon de tipo ${botonId}`;
                    errorMessage.style.display = "block";
                }
            }
        }
    }));
}

// mostrar lista de sugerencias con verificación
if (searchInput) {
    const suggestionsList = document.querySelector("#suggestions");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            mostrarSugerencias([]);
            return;
        }
        const sugerencias = allPokemon
            .filter(poke => poke.name.toLowerCase().includes(searchTerm))
            .map(poke => poke.name)
            .slice(0, 10); // máximo 10 sugerencias
        mostrarSugerencias(sugerencias);
    });

    // Manejar clic en sugerencia
    if (suggestionsList) {
        suggestionsList.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                searchInput.value = e.target.textContent;
                mostrarSugerencias([]);
                buscarPokemon();
            }
        });
    }

    // Ocultar sugerencias al perder foco
    searchInput.addEventListener("blur", () => {
        setTimeout(() => mostrarSugerencias([]), 100);
    });

    function mostrarSugerencias(sugerencias) {
        if (!suggestionsList) return;
        suggestionsList.innerHTML = "";
        if (sugerencias.length === 0) {
            suggestionsList.style.display = "none";
            return;
        }
        sugerencias.forEach(nombre => {
            const li = document.createElement("li");
            li.textContent = nombre;
            li.style.padding = "8px";
            li.style.cursor = "pointer";
            suggestionsList.appendChild(li);
        });
        suggestionsList.style.display = "block";
    }
}