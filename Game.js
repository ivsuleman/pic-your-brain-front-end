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
                    ${Array(16).fill().map((_, idx) => `<div id='grid-box-${idx + 1}' class="grid-box">${idx + 1} </div>`).join('')}
                </div>
                <div id="photo-list">
                    ${Array(32).fill().map((_, idx) => `<div id='list-box-${idx + 1}' class="list-box">${idx + 1}</div>`).join('')}
                </div>
            </div>
            <div id='timer'>TIMER WILL GO HERE You have ${State.timeLeft} seconds left!</div>
            `
        this.getImages(State.category)  // TODO: change 'cat' to State.category so variable passed into getImages 
    }

    static getImages(query) {
        const url = 'https://api.unsplash.com/search/photos'
        const clientId = KEY.key
        const perPage = 16
        let page = 1
        this.fetchImages(url, clientId, query, perPage, page)
            .then(data => {
                console.log(data)
                State.images16.push(...data.results)
                State.images32.push(...data.results)
                page += 1
                this.fetchImages(url, clientId, query, perPage, page).then(data => {
                    State.images32.push(...data.results)
                    page = 1
                    console.log(State.images32)
                })
            })

    }

    static fetchImages(url, clientId, query, perPage, page) {
        const fetchUrl = `${url}?client_id=${clientId}&query=${query}&per_page=${perPage}&page=${page}`
        return fetch(fetchUrl)
            .then(resp => resp.json())
    }

    static renderLevel1() {
        State.timeLeft = 3
        const firstBoxEl = document.querySelector('#grid-box-1')
        const firstImageUrl = State.images16[0].urls.regular
        firstBoxEl.style.background = `url(${firstImageUrl}) no-repeat center center`
        firstBoxEl.style.backgroundSize = 'cover'
        // TODO: once image has rendered to page start count down (3 seconds) then turn image white
        // firstBoxEl.style.background = 'white'
        // TODO: once time is 0 trigger renderPhotoList
        // this.renderPhotoList()
        // TODO: start timer and enable user to click on pictures to select the right one - when correct is selected the timer stops and level 2 is rendered & game stats added to State
    }


    static renderLevel2() {
        const firstBoxEl = document.querySelector('#grid-box-1')
        const secondBoxEl = document.querySelector('#grid-box-2')
        const thirdBoxEl = document.querySelector('#grid-box-5')
        const fourthBoxEl = document.querySelector('#grid-box-6')
        const level2GridBoxes = []
        level2GridBoxes.push(firstBoxEl, secondBoxEl, thirdBoxEl, fourthBoxEl)
        const firstImageUrl = State.images16[0].urls.regular
        const secondImageUrl = State.images16[1].urls.regular
        const thirdImageUrl = State.images16[2].urls.regular
        const fourthImageUrl = State.images16[3].urls.regular
        const level2GridUrls = []
        level2GridUrls.push(firstImageUrl, secondImageUrl, thirdImageUrl, fourthImageUrl)
        level2GridBoxes.forEach((gridBox, index) => {
            level2GridBoxes[index].style.background = `url(${level2GridUrls[index]}) no-repeat center center`
            level2GridBoxes[index].style.backgroundSize = 'cover'
        // TODO: once images have rendered to page start count down (10 seconds) then turn images white
            // level2GridBoxes.forEach((gridBox, index) => {level2GridBoxes[index].style.background = 'white'})
        // TODO: once time is 0 trigger renderPhotoList
        // this.renderPhotoList()
        // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State
        })
    }

        static renderLevel3() {
            const firstBoxEl = document.querySelector('#grid-box-1')
            const secondBoxEl = document.querySelector('#grid-box-2')
            const thirdBoxEl = document.querySelector('#grid-box-5')
            const fourthBoxEl = document.querySelector('#grid-box-6')
            const fifthBoxEl = document.querySelector('#grid-box-9')
            const sixthBoxEl = document.querySelector('#grid-box-10')
            const seventhBoxEl = document.querySelector('#grid-box-11')
            const eighthBoxEl = document.querySelector('#grid-box-3')
            const ninthBoxEl = document.querySelector('#grid-box-7')
            const level3GridBoxes = []
            level3GridBoxes.push(firstBoxEl, secondBoxEl, thirdBoxEl, fourthBoxEl, fifthBoxEl, sixthBoxEl, seventhBoxEl, eighthBoxEl, ninthBoxEl)
            const firstImageUrl = State.images16[0].urls.regular
            const secondImageUrl = State.images16[1].urls.regular
            const thirdImageUrl = State.images16[2].urls.regular
            const fourthImageUrl = State.images16[3].urls.regular
            const fifthImageUrl = State.images16[4].urls.regular
            const sixthImageUrl = State.images16[5].urls.regular
            const seventhImageUrl = State.images16[6].urls.regular
            const eighthImageUrl = State.images16[7].urls.regular
            const ninthImageUrl = State.images16[8].urls.regular
            const level3GridUrls = []
            level3GridUrls.push(firstImageUrl, secondImageUrl, thirdImageUrl, fourthImageUrl, fifthImageUrl, sixthImageUrl, seventhImageUrl, eighthImageUrl, ninthImageUrl)
            level3GridBoxes.forEach((gridBox, index) => {
                level3GridBoxes[index].style.background = `url(${level3GridUrls[index]}) no-repeat center center`
                level3GridBoxes[index].style.backgroundSize = 'cover'
                // TODO: once images have rendered to page start count down (10 seconds) then turn images white
                // level3GridBoxes.forEach((gridBox, index) => {level3GridBoxes[index].style.background = 'white'})
                // TODO: once time is 0 trigger renderPhotoList
                // this.renderPhotoList()
                // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State
            })
        }
    
        static renderLevel4() {
            const firstBoxEl = document.querySelector('#grid-box-1')
            const secondBoxEl = document.querySelector('#grid-box-2')
            const thirdBoxEl = document.querySelector('#grid-box-5')
            const fourthBoxEl = document.querySelector('#grid-box-6')
            const fifthBoxEl = document.querySelector('#grid-box-9')
            const sixthBoxEl = document.querySelector('#grid-box-10')
            const seventhBoxEl = document.querySelector('#grid-box-11')
            const eighthBoxEl = document.querySelector('#grid-box-3')
            const ninthBoxEl = document.querySelector('#grid-box-7')
            const tenthBoxEl = document.querySelector('#grid-box-13')
            const eleventhBoxEl = document.querySelector('#grid-box-14')
            const twelfthBoxEl = document.querySelector('#grid-box-15')
            const thirteenthBoxEl = document.querySelector('#grid-box-16')
            const fourteenthBoxEl = document.querySelector('#grid-box-4')
            const fifteenthBoxEl = document.querySelector('#grid-box-8')
            const sixteenthBoxEl = document.querySelector('#grid-box-12')
            const level4GridBoxes = []
            level4GridBoxes.push(firstBoxEl, secondBoxEl, thirdBoxEl, fourthBoxEl, fifthBoxEl, sixthBoxEl, seventhBoxEl, eighthBoxEl, ninthBoxEl, tenthBoxEl, eleventhBoxEl, twelfthBoxEl, thirteenthBoxEl, fourteenthBoxEl, fifteenthBoxEl, sixteenthBoxEl)
            const firstImageUrl = State.images16[0].urls.regular
            const secondImageUrl = State.images16[1].urls.regular
            const thirdImageUrl = State.images16[2].urls.regular
            const fourthImageUrl = State.images16[3].urls.regular
            const fifthImageUrl = State.images16[4].urls.regular
            const sixthImageUrl = State.images16[5].urls.regular
            const seventhImageUrl = State.images16[6].urls.regular
            const eighthImageUrl = State.images16[7].urls.regular
            const ninthImageUrl = State.images16[8].urls.regular
            const tenthImageUrl = State.images16[9].urls.regular
            const eleventhImageUrl = State.images16[10].urls.regular
            const twelfthImageUrl = State.images16[11].urls.regular
            const thirteenthImageUrl = State.images16[12].urls.regular
            const fourteenthImageUrl = State.images16[13].urls.regular
            const fifteenthImageUrl = State.images16[14].urls.regular
            const sixteenthImageUrl = State.images16[15].urls.regular
            const level4GridUrls = []
            level4GridUrls.push(firstImageUrl, secondImageUrl, thirdImageUrl, fourthImageUrl, fifthImageUrl, sixthImageUrl, seventhImageUrl, eighthImageUrl, ninthImageUrl, tenthImageUrl, eleventhImageUrl, twelfthImageUrl, thirteenthImageUrl, fourteenthImageUrl, fifteenthImageUrl, sixteenthImageUrl)
            level4GridBoxes.forEach((gridBox, index) => {
                level4GridBoxes[index].style.background = `url(${level4GridUrls[index]}) no-repeat center center`
                level4GridBoxes[index].style.backgroundSize = 'cover'
                // TODO: once images have rendered to page start count down (10 seconds) then turn images white
                // level4GridBoxes.forEach((gridBox, index) => {level4GridBoxes[index].style.background = 'white'})
                // TODO: once time is 0 trigger renderPhotoList
                // this.renderPhotoList()
                // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State
            })
        }

    static renderPhotoList() {
        const randomizedImagesUrls = this.shuffleImages(State.images32)
        const listBoxes = document.querySelectorAll('.list-box')
        listBoxes.forEach((listBox, index) => {
            // const listBoxImage = listBoxes[index].querySelector('img')
            // listBoxImage.src = randomizedImagesUrls[index]
            listBoxes[index].style.background = `url(${randomizedImagesUrls[index]}) no-repeat center center`;
            listBoxes[index].style.backgroundSize = 'cover'
        })

    }

    static shuffleImages(images) {
        return this.shuffle(images).map(image => image.urls.small)
    }

    static shuffle(array) {
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