const createGame = async game => {
    const response = await fetch('http://localhost:3000/api/v1/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
    return response.json()
}