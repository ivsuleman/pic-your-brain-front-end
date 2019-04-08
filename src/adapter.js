const createGame = async game => {
  const response = await fetch(
    "https://pic-ur-brain-api.herokuapp.com/api/v1/games",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(game)
    }
  );
  return response.json();
};
