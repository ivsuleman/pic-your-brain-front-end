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
                    console.log(element)
                    const tableRoweEl = document.createElement('tr');
                    console.log(tableRoweEl);
                    const pen = element.games[0].penalties
                    const penalties = Math.round(30 / (pen + 30) * 100);
                    tableRoweEl.innerHTML = `
                        <td>${element.username}</td>
                        <td>${element.games[0].points}</td>
                        <td>${penalties}</td>
                        <td>${element.games[0].time}</td>
                    `
                    console.log(tableRoweEl);
                    tableEl.appendChild(tableRoweEl);

                });



            })
    }
}