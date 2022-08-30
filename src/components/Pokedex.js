import React, { useState, useEffect } from 'react';

function Pokedex() {
    const [pokemon, setPokemon] = useState(null);
    const [query, setQuery] = useState('');
    const [foundPokemon, setFoundPokemon] = useState(null);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then((data) => {
                setPokemon(data.results);
                setFoundPokemon(data.results);
                setCurrentPokemon(data.results[0].name);
            })
    }, []);


    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = pokemon.filter((item) => {
                return item.name.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to ensure search is case-insensitive
            });
            setFoundPokemon(results);
        } else {
            setFoundPokemon(pokemon);
            // If the text field is empty, show all pokemon
        }

        setQuery(keyword);
    };


    const [currentPokemon, setCurrentPokemon] = useState(null);
    const [currentPokemonData, setCurrentPokemonData] = useState(null);
    const [currentPokemonSpeciesData, setCurrentPokemonSpeciesData] = useState(null);

    useEffect(() => {
        if (currentPokemon !== null && currentPokemon !== undefined) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`)
                .then(response => response.json())
                .then((data) => {
                    setCurrentPokemonData(data)
                    console.log(data);
                }
                )
        }
    }, [currentPokemon]);

    useEffect(() => {
        if (currentPokemonData !== null && currentPokemonData !== undefined) {
            fetch(`${currentPokemonData.species.url}`)
                .then(response => response.json())
                .then((data) => {
                    setCurrentPokemonSpeciesData(data)
                    console.log(data);
                }
                )
        }
    }, [currentPokemonData]);


    return (
        <section id="pokedex">
            <input
                placeholder=''
                type="search"
                value={query}
                onChange={filter} />
            <nav>
                {foundPokemon !== null && foundPokemon.map((item) =>
                    <button type="button" onClick={() => setCurrentPokemon(item.name)}>
                        {item.name}
                    </button>
                )}
            </nav>
            {currentPokemonData !== null &&
                <figure>
                    <img src={currentPokemonData.sprites.front_default} alt="pokemon" />
                    <figcaption>
                        <h3>
                            {currentPokemonData.name}
                        </h3>
                        {currentPokemonSpeciesData !== null &&
                            <p>
                                {currentPokemonSpeciesData.flavor_text_entries[0].flavor_text}
                            </p>}

                    </figcaption>

                    <section id="characteristics">
                        <ul>
                            <h4>Abilities:</h4>
                            {currentPokemonData.abilities.slice(0, 5).map((item) =>
                                <li>
                                    {item.ability.name}
                                </li>
                            )}
                        </ul>
                        <ul>
                            <h4>Movements:</h4>
                            {currentPokemonData.moves.slice(0, 3).map((item) =>
                                <li>
                                    {item.move.name}
                                </li>
                            )}
                        </ul>
                        <ul>
                            <h4>Stats:</h4>
                            {currentPokemonData.stats.slice(0, 2).map((item) =>
                                <li>
                                    {item.stat.name}
                                </li>
                            )}
                        </ul>
                    </section>

                </figure>
            }
        </section >
    )
}

export default Pokedex;