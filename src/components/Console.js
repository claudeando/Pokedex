function Console() {
    return (
        <section id="gameConsole">
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

export default Console;