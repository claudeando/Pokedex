import React, { useState, useEffect } from 'react';
import './App.css';


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


function Screen() {
  return (
    <section id="gameScreen">
      < header >
        <span>
          DOT MATRIX WITH STEREO SOUND
        </span>
      </header>

      <aside>
        <span></span>
        {/* <span>BATTERY</span> */}
      </aside>
      <main className="screen">
        <Pokedex />
      </main>
    </section>
  )
}

function Console() {
  return (
    <section id="gameConsole">
      {/* <header>
        <img src={Logo} />
      </header> */}
      <main className="console">
        <div className="actionBtn">
          <div></div>
          <button type="button" className="topBtn"></button>
          <div></div>
          <button type="button" className="leftBtn"></button>
          <div></div>
          <button type="button" className="rightBtn"></button>
          <div></div>
          <button type="button" className="bottomBtn"></button>
          <div></div>
        </div>
        <div className="abBtn">
          <button className="aBtn"></button>
          <button className="bBtn"></button>
        </div>
        <div className="otherBtn">
          <button type="button" className="selectBtn"></button>
          <button type="button" className="startBtn"></button>
        </div>
      </main >

      <aside className="speaker">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </aside>
    </section >
  )
}

function Footer() {
  return (
    <footer>
      Created by <a href="https://claudeando.com">Claude Ando</a>
    </footer>
  )
}

function App() {
  return (
    <>
      <section id="gameboy">
        <Screen />
        <Console />
      </section>

      <Footer />
    </>

  );
}

export default App;
