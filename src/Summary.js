class Summary {
    static render() {
        rootEl.innerHTML = `
            <div id ="logo">
                <h1>logo</h1>
            </div>

            <div id="title">
                <h2>${State.userName}'s Game Summary</h2>
            </div>

            <div id="stats">
                
            </div>
            `
    }
}