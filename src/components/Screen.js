import Pokedex from './Pokedex.js'

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

export default Screen;