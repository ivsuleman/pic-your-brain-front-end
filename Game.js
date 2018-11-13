class Game {
    static render() {
        rootEl.innerHTML = `
            <h1>LOGO WILL GO HERE</h1>
            <button id="start-button">Start Game!</button>
        `
        const startEl = rootEl.querySelector('#start-button')
        startEl.addEventListener('click', (event) => this.beginGameListener(event))
    }

    static beginGameListener(event) {
        event.preventDefault()
        rootEl.innerHTML = `
            <h1>LOGO WILL GO HERE</h1>
            <div id="game-container">
                <div id="photo-grid">
                    ${Array(16).fill().map((_, idx) => `<div id='grid-box-${idx + 1}' class="grid-box"> <img src="" id='image-grid-box-${idx + 1}' class="image-grid-box"> ${idx + 1} </div>`).join('')}
                </div>
                <div id="photo-list">
                    ${Array(32).fill().map((_, idx) => `<div id='list-box-${idx + 1}' class="list-box">${idx + 1}</div>`).join('')}
                </div>
            </div>
            <div id='timer'>TIMER WILL GO HERE You have ${State.timeLeft} seconds left!</div>
            `
        this.getImages('cat')  // TODO: change 'cat' to State.category so variable passed into getImages 
    }

    static getImages(query) {
        const url = 'https://api.unsplash.com/search/photos'
        const clientId = KEY.key
        const perPage = 16
        let page = 1
        this.fetchImages(url, clientId, query, perPage, page)
            .then (data => {
                console.log(data)
                State.images16.push(...data.results)
                State.images32.push(...data.results)
                page += 1
                this.fetchImages(url, clientId, query, perPage, page).then (data => {
                    State.images32.push(...data.results)
                    page = 1
                    console.log(State.images32)
                })
            })

    }

    static fetchImages (url, clientId, query, perPage, page) {
        const fetchUrl = `${url}?client_id=${clientId}&query=${query}&per_page=${perPage}&page=${page}`
        return fetch(fetchUrl)
            .then(resp => resp.json())
    }

    static renderLevel1PhotoGrid() {
        State.timeLeft = 3
        let firstBoxEl = document.querySelector('#grid-box-1')
        const firstImageUrl = State.images16[0].urls.regular
        firstBoxEl.style.background = firstImageUrl
        // TODO: once image has rendered to page start timer to count down from 3 seconds
        firstBoxEl.style.background = 'white'
        // TODO: once time is 0 add event listender to trigger renderLevel1PhotoList
    }
    
    static renderLevel1PhotoList() {
        randomizedImagesUrls = this.shuffleImages(State.images32).map(image => image.urls.small)
        console.log(randomizedImagesUrls)
        
    } 

    static shuffleImages(array) {
        let currentIndex = array.length
	    let temporaryValue, randomIndex

    	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	    }
        return array
    }

}