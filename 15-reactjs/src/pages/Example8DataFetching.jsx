import BtnBack from "../components/BtnBack";
import { useState, useEffect } from 'react';

function Example8DataFetching() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [itemsPerPage] = useState(30);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Detectar cambios de tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchPokemons();
    }, [currentPage]);

    const fetchPokemons = async () => {
        setLoading(true);
        setError(null);
        try {
            const offset = (currentPage - 1) * itemsPerPage;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`);
            
            if (!response.ok) {
                throw new Error('Error al cargar los Pokémon');
            }
            
            const data = await response.json();
            setPokemons(data.results);
            
            const totalPokemons = data.count;
            setTotalPages(Math.ceil(totalPokemons / itemsPerPage));
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPokemonDetails = async (pokemonName) => {
        setLoadingDetails(true);
        setSelectedPokemon(pokemonName);
        setPokemonDetails(null);
        
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            
            if (!response.ok) {
                throw new Error('Error al cargar los detalles del Pokémon');
            }
            
            const data = await response.json();
            
            const speciesResponse = await fetch(data.species.url);
            const speciesData = await speciesResponse.json();
            
            const flavorText = speciesData.flavor_text_entries.find(
                entry => entry.language.name === 'es' || entry.language.name === 'en'
            );
            
            setPokemonDetails({
                ...data,
                description: flavorText ? flavorText.flavor_text : 'Descripción no disponible'
            });
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingDetails(false);
        }
    };

    const handlePokemonClick = (pokemon) => {
        fetchPokemonDetails(pokemon.name);
        // En móvil, hacer scroll suave hacia los detalles
        if (isMobile) {
            setTimeout(() => {
                document.querySelector('.pokemon-details-mobile')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    };

    const handleCloseDetails = () => {
        setSelectedPokemon(null);
        setPokemonDetails(null);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            handleCloseDetails();
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            handleCloseDetails();
        }
    };

    const formatPokemonNumber = (id) => {
        return `#${id.toString().padStart(3, '0')}`;
    };

    const getTypeColor = (type) => {
        const colors = {
            normal: '#A8A878',
            fire: '#F08030',
            water: '#6890F0',
            electric: '#F8D030',
            grass: '#78C850',
            ice: '#98D8D8',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC'
        };
        return colors[type] || '#777777';
    };

    // Componente de lista de Pokémon (reutilizable)
    const PokemonListComponent = () => (
        <div style={isMobile ? styles.pokemonListMobile : styles.pokemonList}>
            <div style={styles.listHeader}>
                <h3 style={styles.listTitle}>Pokémon</h3>
                <div style={styles.pageInfo}>
                    Pág. {currentPage} de {totalPages}
                </div>
            </div>

            {loading && (
                <div style={styles.loadingContainer}>
                    <div style={styles.loadingSpinner}></div>
                    <p>Cargando...</p>
                </div>
            )}

            {error && (
                <div style={styles.errorContainer}>
                    <p style={styles.errorText}>Error: {error}</p>
                    <button onClick={fetchPokemons} style={styles.retryButton}>
                        Reintentar
                    </button>
                </div>
            )}

            {!loading && !error && (
                <>
                    <div style={isMobile ? styles.gridContainerMobile : styles.gridContainer}>
                        {pokemons.map((pokemon, index) => {
                            const pokemonId = (currentPage - 1) * itemsPerPage + index + 1;
                            return (
                                <button
                                    key={pokemon.name}
                                    onClick={() => handlePokemonClick(pokemon)}
                                    style={{
                                        ...(isMobile ? styles.pokemonCardMobile : styles.pokemonCard),
                                        ...(selectedPokemon === pokemon.name ? styles.selectedCard : {})
                                    }}
                                >
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                                        alt={pokemon.name}
                                        style={styles.pokemonSprite}
                                    />
                                    <div style={styles.pokemonInfo}>
                                        <span style={styles.pokemonNumber}>
                                            {formatPokemonNumber(pokemonId)}
                                        </span>
                                        <span style={styles.pokemonName}>
                                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div style={styles.pagination}>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            style={{
                                ...styles.pageButton,
                                ...(currentPage === 1 ? styles.disabledButton : {})
                            }}
                        >
                            ←
                        </button>
                        <span style={styles.pageIndicator}>
                            {currentPage}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            style={{
                                ...styles.pageButton,
                                ...(currentPage === totalPages ? styles.disabledButton : {})
                            }}
                        >
                            →
                        </button>
                    </div>
                </>
            )}
        </div>
    );

    // Componente de detalles del Pokémon (reutilizable)
    const PokemonDetailsComponent = () => (
        <div 
            className={isMobile ? "pokemon-details-mobile" : ""}
            style={isMobile ? styles.pokemonDetailsMobile : styles.pokemonDetails}
        >
            {loadingDetails && (
                <div style={styles.detailsLoading}>
                    <div style={styles.loadingSpinner}></div>
                    <p>Cargando detalles...</p>
                </div>
            )}

            {!loadingDetails && pokemonDetails && (
                <div style={styles.detailsContent}>
                    <div style={styles.detailsHeader}>
                        <h3 style={styles.detailsTitle}>
                            {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}
                        </h3>
                        <button onClick={handleCloseDetails} style={styles.closeButton}>
                            ×
                        </button>
                    </div>

                    <div style={styles.detailsMainInfo}>
                        <div style={styles.detailsImageContainer}>
                            <img
                                src={pokemonDetails.sprites.other['official-artwork'].front_default || 
                                     pokemonDetails.sprites.front_default}
                                alt={pokemonDetails.name}
                                style={styles.detailsImage}
                            />
                        </div>

                        <div style={styles.detailsQuickInfo}>
                            <div style={styles.detailsNumber}>
                                {formatPokemonNumber(pokemonDetails.id)}
                            </div>

                            <div style={styles.typesContainer}>
                                {pokemonDetails.types.map((typeInfo, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            ...styles.typeBadge,
                                            backgroundColor: getTypeColor(typeInfo.type.name)
                                        }}
                                    >
                                        {typeInfo.type.name}
                                    </span>
                                ))}
                            </div>

                            <div style={styles.physicalInfo}>
                                <div style={styles.physicalItem}>
                                    <span style={styles.physicalLabel}>Altura</span>
                                    <span style={styles.physicalValue}>{pokemonDetails.height / 10}m</span>
                                </div>
                                <div style={styles.physicalItem}>
                                    <span style={styles.physicalLabel}>Peso</span>
                                    <span style={styles.physicalValue}>{pokemonDetails.weight / 10}kg</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.descriptionBox}>
                        <p style={styles.description}>
                            {pokemonDetails.description.replace(/[\n\f]/g, ' ')}
                        </p>
                    </div>

                    <div style={styles.statsCompact}>
                        <h4 style={styles.statsTitle}>Estadísticas</h4>
                        <div style={styles.statsGrid}>
                            {pokemonDetails.stats.slice(0, 3).map((stat, index) => (
                                <div key={index} style={styles.statItem}>
                                    <span style={styles.statName}>
                                        {stat.stat.name === 'hp' ? 'HP' :
                                         stat.stat.name === 'attack' ? 'Ata' :
                                         stat.stat.name === 'defense' ? 'Def' :
                                         stat.stat.name === 'special-attack' ? 'At.E' :
                                         stat.stat.name === 'special-defense' ? 'Def.E' :
                                         stat.stat.name === 'speed' ? 'Vel' : stat.stat.name}
                                    </span>
                                    <span style={styles.statValue}>{stat.base_stat}</span>
                                </div>
                            ))}
                            {pokemonDetails.stats.slice(3, 6).map((stat, index) => (
                                <div key={index + 3} style={styles.statItem}>
                                    <span style={styles.statName}>
                                        {stat.stat.name === 'hp' ? 'HP' :
                                         stat.stat.name === 'attack' ? 'Ata' :
                                         stat.stat.name === 'defense' ? 'Def' :
                                         stat.stat.name === 'special-attack' ? 'At.E' :
                                         stat.stat.name === 'special-defense' ? 'Def.E' :
                                         stat.stat.name === 'speed' ? 'Vel' : stat.stat.name}
                                    </span>
                                    <span style={styles.statValue}>{stat.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.abilitiesCompact}>
                        <h4 style={styles.abilitiesTitle}>Habilidades</h4>
                        <div style={styles.abilitiesList}>
                            {pokemonDetails.abilities.slice(0, 2).map((abilityInfo, index) => (
                                <span key={index} style={styles.abilityTag}>
                                    {abilityInfo.ability.name.split('-')[0]}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {!loadingDetails && !pokemonDetails && (
                <div style={styles.noSelection}>
                    <p>Selecciona un Pokémon</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="container" style={styles.container}>
            <BtnBack />
            <h2 style={styles.title}>Example 8: Pokédex con PokeAPI</h2>
            <p style={styles.subtitle}>Explora los Pokémon, haz click para ver más detalles</p>

            {isMobile ? (
                // Vista móvil: Lista arriba, detalles abajo
                <div style={styles.pokedexContainerMobile}>
                    <PokemonListComponent />
                    <PokemonDetailsComponent />
                </div>
            ) : (
                // Vista desktop: Lista y detalles lado a lado
                <div style={styles.pokedexContainer}>
                    <PokemonListComponent />
                    <PokemonDetailsComponent />
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        color: '#e0e0e0',
        fontSize: '28px',
        marginBottom: '10px',
    },
    subtitle: {
        color: '#8888aa',
        marginBottom: '20px',
    },
    // Estilos desktop
    pokedexContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        padding: '15px',
        minHeight: '500px',
    },
    // Estilos móvil
    pokedexContainerMobile: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        padding: '15px',
    },
    pokemonList: {
        backgroundColor: '#16213e',
        borderRadius: '8px',
        padding: '12px',
        overflowY: 'auto',
        maxHeight: '500px',
    },
    pokemonListMobile: {
        backgroundColor: '#16213e',
        borderRadius: '8px',
        padding: '12px',
        overflowY: 'auto',
        maxHeight: '350px', // Altura reducida en móvil para dejar espacio a detalles
    },
    pokemonDetails: {
        backgroundColor: '#16213e',
        borderRadius: '8px',
        padding: '12px',
        maxHeight: '500px',
        overflowY: 'auto',
    },
    pokemonDetailsMobile: {
        backgroundColor: '#16213e',
        borderRadius: '8px',
        padding: '12px',
        maxHeight: '450px',
        overflowY: 'auto',
        marginTop: '10px',
    },
    listHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        paddingBottom: '8px',
        borderBottom: '1px solid #0f3460',
    },
    listTitle: {
        color: '#e0e0e0',
        margin: 0,
        fontSize: '16px',
        fontWeight: '500',
    },
    pageInfo: {
        color: '#8888aa',
        fontSize: '12px',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '6px',
        marginBottom: '12px',
    },
    gridContainerMobile: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Más columnas en móvil para aprovechar espacio
        gap: '4px',
        marginBottom: '10px',
    },
    pokemonCard: {
        backgroundColor: '#1a1a2e',
        border: '1px solid #0f3460',
        borderRadius: '6px',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        border: 'none',
    },
    pokemonCardMobile: {
        backgroundColor: '#1a1a2e',
        border: '1px solid #0f3460',
        borderRadius: '4px',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column', // Vertical en móvil para cards más compactas
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        border: 'none',
    },
    selectedCard: {
        border: '2px solid #4CAF50',
        backgroundColor: '#1f1f3a',
    },
    pokemonSprite: {
        width: '40px',
        height: '40px',
        objectFit: 'contain',
    },
    pokemonInfo: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    pokemonNumber: {
        fontSize: '9px',
        color: '#8888aa',
    },
    pokemonName: {
        fontSize: '11px',
        color: '#e0e0e0',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '80px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        marginTop: '10px',
    },
    pageButton: {
        backgroundColor: '#0f3460',
        color: '#e0e0e0',
        border: 'none',
        padding: '4px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'background-color 0.2s',
    },
    disabledButton: {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
    pageIndicator: {
        color: '#e0e0e0',
        fontSize: '12px',
        minWidth: '30px',
        textAlign: 'center',
    },
    detailsLoading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        color: '#e0e0e0',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: '#e0e0e0',
    },
    loadingSpinner: {
        width: '30px',
        height: '30px',
        border: '2px solid #0f3460',
        borderTop: '2px solid #4CAF50',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '8px',
    },
    errorContainer: {
        textAlign: 'center',
        padding: '15px',
    },
    errorText: {
        color: '#f44336',
        fontSize: '12px',
        marginBottom: '8px',
    },
    retryButton: {
        backgroundColor: '#0f3460',
        color: '#e0e0e0',
        border: 'none',
        padding: '4px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '11px',
    },
    detailsContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    detailsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsTitle: {
        color: '#e0e0e0',
        margin: 0,
        fontSize: '18px',
        textTransform: 'capitalize',
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#8888aa',
        fontSize: '22px',
        cursor: 'pointer',
        padding: '0',
        lineHeight: '1',
    },
    detailsMainInfo: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        backgroundColor: '#1a1a2e',
        borderRadius: '6px',
        padding: '8px',
    },
    detailsImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsImage: {
        width: '100px',
        height: '100px',
        objectFit: 'contain',
    },
    detailsQuickInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        justifyContent: 'center',
    },
    detailsNumber: {
        color: '#8888aa',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    typesContainer: {
        display: 'flex',
        gap: '4px',
    },
    typeBadge: {
        padding: '2px 8px',
        borderRadius: '12px',
        color: 'white',
        fontSize: '10px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    physicalInfo: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4px',
        marginTop: '4px',
    },
    physicalItem: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#16213e',
        borderRadius: '4px',
        padding: '4px',
    },
    physicalLabel: {
        color: '#8888aa',
        fontSize: '8px',
    },
    physicalValue: {
        color: '#e0e0e0',
        fontSize: '10px',
        fontWeight: 'bold',
    },
    descriptionBox: {
        backgroundColor: '#1a1a2e',
        borderRadius: '6px',
        padding: '8px',
    },
    description: {
        color: '#e0e0e0',
        margin: 0,
        fontSize: '11px',
        lineHeight: '1.4',
        maxHeight: '60px',
        overflowY: 'auto',
    },
    statsCompact: {
        backgroundColor: '#1a1a2e',
        borderRadius: '6px',
        padding: '8px',
    },
    statsTitle: {
        color: '#e0e0e0',
        margin: '0 0 6px 0',
        fontSize: '12px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4px',
    },
    statItem: {
        backgroundColor: '#16213e',
        borderRadius: '4px',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    statName: {
        color: '#8888aa',
        fontSize: '8px',
    },
    statValue: {
        color: '#e0e0e0',
        fontSize: '11px',
        fontWeight: 'bold',
    },
    abilitiesCompact: {
        backgroundColor: '#1a1a2e',
        borderRadius: '6px',
        padding: '8px',
    },
    abilitiesTitle: {
        color: '#e0e0e0',
        margin: '0 0 6px 0',
        fontSize: '12px',
    },
    abilitiesList: {
        display: 'flex',
        gap: '4px',
    },
    abilityTag: {
        backgroundColor: '#0f3460',
        color: '#e0e0e0',
        padding: '3px 8px',
        borderRadius: '10px',
        fontSize: '10px',
        textTransform: 'capitalize',
    },
    noSelection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        color: '#8888aa',
        textAlign: 'center',
        fontSize: '12px',
    },
};

// Añadir la animación al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
        .container {
            padding: 10px !important;
        }
    }
`;
document.head.appendChild(styleSheet);

export default Example8DataFetching;