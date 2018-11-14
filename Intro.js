class Intro {
    static render() {
        rootEl.innerHTML = `

            
            <div id ="logo">
                <h1>logo</h1>
            </div>

            <div id="form">
                <form id='username-form'>
                    <input id='name-input' placeholder='Type Your Name And Choose A Category Below'/>
                </form>
            </div>
            
            <div id="category-container"> 
                <div id="category-grid">
                    <div id=landscape class="category-box"><p id="landscape">Landscape</p></div>
                    <div id="animals" class="category-box"><p id="animals">Animals</p></div>
                    <div id="food" class="category-box"><p id="food">Food</p></div>
                    <div id="roads" class="category-box"><p id="roads">Roads</p></div>
                    <div id="trees" class="category-box"><p id="trees">Trees</p></div>
                    <div id="coral" class="category-box"><p id="coral">Coral</p></div>
                    <div id="texture" class="category-box"><p id="texture">Texture</p></div>
                    <div id="street-art" class="category-box"><p id="street art">Street Art</p></div>
                    <div id="classic-cars" class="category-box"><p id="classic cars">Classic Cars</p></div>
                </div>
            </div>
        `
        const categoryEl = rootEl.querySelector('#category-grid')
        categoryEl.addEventListener('click', this.setUserListener)
    }

    static setUserListener(event) {
        event.preventDefault()

        const url = 'http://localhost:3000/api/v1/users';
        let inputEl = rootEl.querySelector('#name-input')
        const body = { username: inputEl.value };
        const formEl = rootEl.querySelector('#username-form')

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then(user => {
                State.userName = user.username;
                State.userId = user.id;
                State.category = event.target.id;
                // console.log(`${State.userName} ${State.userId}`)
                formEl.reset();
                Game.render()
            });
    }
}