class Summary {
    static render() {

        const points = Math.round(State.points);
        const accuracy = Math.round((30 / (State.overallPenalties + 30)) * 100)
        const speed = Math.round(State.overallTime);

        const footer = document.querySelector('.bottom')
        footer.innerText = 'Made by Irfan and Amalie'

        rootEl.innerHTML = `
            <div id="player-stats">
                <div id="Points">
                    <h3>${points} Points Scored</h3>
                </div>
                <div id="Accuracy">
                    <h3>${accuracy}% Accuracy</h3>
                </div>
                <div id="Speed">
                    <h3>${speed} seconds Speed</h3>
                </div>
            </div>

            `
        this.renderLeaderboard();
    }

    static renderLeaderboard() {
        const url = 'http://localhost:3000/api/v1/users';
        let leaderboardLocal;


        fetch(url)
            .then((response) => response.json())
            .then(leaderboard => {
                [...leaderboardLocal] = leaderboard
                console.log(leaderboardLocal);
                const tableEl = document.querySelector('#table');

                leaderboardLocal.forEach(element => {
                    let tableRowHTML = `
                    <tr>
                        <td>element.username</td>
                        <td>element.games.points</td>
                        <td>Math.round((30 / (element.games.penalties + 30)) * 100)</td>
                        <td>element.games.time</td>
                    </tr>
                    `
                    tableRoweEl = document.createElement(tableRowHTML);
                    tableEl.appendChild(tableRoweEl);

                });



            })
    }
}