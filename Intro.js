class Intro {
    static render() {
        rootEl.innerHTML = `
            
            <div id ="logo">
                <h1>logo</h1>
            </div>

            <div id="form">
                <form id='name-form'>
                    <input id='name-input' placeholder='Enter your name'/>
                </form>
            </div>
            
            <div id="category-container"> 
                <div id="category-grid">
                    <div id=landscape class="category-box">Landscape</div>
                    <div id="animals" class="category-box">Animals</div>
                    <div id="food" class="category-box">Food</div>
                    <div id="roads" class="category-box">Roads</div>
                    <div id="trees" class="category-box">Trees</div>
                    <div id="coral" class="category-box">Coral</div>
                    <div id="texture" class="category-box">Texture</div>
                    <div id="street-art" class="category-box">Street Art</div>
                    <div id="classic-cars" class="category-box">Classic Cars</div>
                </div>
            </div>
            
        `
        const formEl = rootEl.querySelector('#name-form')
        formEl.addEventListener('submit', this.setUserListener)
    }

    static setUserListener(event) {
        event.preventDefault()
        const url = 'http://localhost:3000/api/v1/users';
        let inputEl = rootEl.querySelector('#name-input')
        const body = { username: inputEl.value }

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then(user => {
                State.userName = user.username;
                State.userId = user.id;
                // console.log(`${State.userName} ${State.userId}`)
                event.target.reset()
            });
    }
}





