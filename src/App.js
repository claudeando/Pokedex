import React, { useState, useEffect } from 'react';
import './App.css';

import Screen from './components/Screen.js';
import Console from './components/Console.js';
import Footer from './components/Footer.js';

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
