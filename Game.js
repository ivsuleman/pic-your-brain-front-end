class Game {
    static render() {
        rootEl.innerHTML = `
            <div id='grid'>I'm a grid!</div>
            <div>I'm a list!</div>
            <div>I keep the time. You have ${state.timeLeft} seconds left!</div>
        `
    }
}
