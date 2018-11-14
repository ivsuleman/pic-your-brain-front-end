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
                    ${Array(16).fill().map((_, idx) => `<div id='grid-box-${idx}' class="grid-box"></div>`).join('')}
                </div>
                <div id="photo-list">
                    ${Array(32).fill().map((_, idx) => `<div id='list-box-${idx}' class="list-box"></div>`).join('')}
                </div>
            </div>
            <div id='timer'>TIMER WILL GO HERE You have ${State.timeLeft} seconds left!</div>
            `
        this.getImages(State.category)
            .then(() => this.gridDataFunction())
            // .then(() => this.listDataFunction())
            .then(() => this.renderLevel1())
    }

    static gridDataFunction () {
        const gridData = []
        document.querySelectorAll('.grid-box').forEach((gridBox, index) => {
            const gridBoxObj = {}
            gridBoxObj.gridBox = gridBox
            gridBoxObj.imgUrl = State.images16[index].urls.regular 
            gridBoxObj.imgId = State.images16[index].id
            gridData.push(gridBoxObj)
        })
        State.gridData = [...gridData]
    }

    static getImages(query) {
        const url = 'https://api.unsplash.com/search/photos'
        const clientId = KEY.key
        const perPage = 16
        let page = 1
        return this.fetchImages(url, clientId, query, perPage, page)
            .then(data => {
                State.images16.push(...data.results)
                State.images32.push(...data.results)
                page += 1
                this.fetchImages(url, clientId, query, perPage, page).then(data => {
                    State.images32.push(...data.results)
                    page = 1
                })
            })
    }

    static fetchImages(url, clientId, query, perPage, page) {
        const fetchUrl = `${url}?client_id=${clientId}&query=${query}&per_page=${perPage}&page=${page}`
        return fetch(fetchUrl)
            .then(resp => resp.json())
    }

    static renderLevel(array) {
        array.forEach(item => {
            const gridBoxObj = {...State.gridData[item]}
            const boxEl = document.querySelector(`#grid-box-${item}`)
            boxEl.style.background = `url(${gridBoxObj.imgUrl}) no-repeat center center`
            boxEl.style.backgroundSize = 'cover'
        })
    }

    static renderLevel1() {
        const imgIndexes = [0];
        this.renderLevel(imgIndexes)

        setTimeout(() => {
            this.clearLevel(imgIndexes)
            this.listDataFunction()
            this.renderPhotoList()
        }, 3000)
        // TODO: once image has rendered to page start count down (3 seconds) then turn image white
        // firstBoxEl.style.background = 'white'
        // TODO: once time is 0 trigger renderPhotoList
        // this.renderPhotoList()
        // TODO: start timer and enable user to click on pictures to select the right one - when correct is selected the timer stops and level 2 is rendered & game stats added to State
    }


    static renderLevel2() {
        const imgIndexes = [0, 1, 4, 5]
        this.renderLevel(imgIndexes)
        // TODO: once images have rendered to page start count down (10 seconds) then turn images white
        // this.clearLevel(imgIndexes)
        // TODO: once time is 0 trigger renderPhotoList
        // this.renderPhotoList()
        // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State

    }

    static renderLevel3() {
        const imgIndexes = [0, 1, 2, 4, 5, 6, 8, 9, 10]
        this.renderLevel(imgIndexes)
                // TODO: once images have rendered to page start count down (10 seconds) then turn images white
                // this.clearLevel(imgIndexes)
                // TODO: once time is 0 trigger renderPhotoList
                // this.renderPhotoList()
                // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State
        }
    
    static renderLevel4() {
        const imgIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        this.renderLevel(imgIndexes)
                // TODO: once images have rendered to page start count down (10 seconds) then turn images white
                // this.clearLevel(imgIndexes)
                // TODO: once time is 0 trigger renderPhotoList
                // this.renderPhotoList()
                // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State
        }

    static clearLevel(array) {
        array.forEach(item => {document.querySelectorAll('.grid-box')[item].style.background = 'white'})
    }

    static listDataFunction() {
        const listData = []
        document.querySelectorAll('.list-box').forEach((listBox, index) => {
            const listBoxObj = {}
            console.log(listBox)
            listBoxObj.listBox = listBox
            listBoxObj.imgUrl = State.images32[index].urls.regular
            listBoxObj.imgId = State.images32[index].id
            listData.push(listBoxObj)
        })
        State.listData = [...listData]
    }

    static renderPhotoList() {
        console.log(State.listData)
        const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        array.forEach(item => {
            console.log(item)
            const listBoxItem = {...State.listData[item]}
            const listEl = document.querySelector(`#list-box-${item}`)
            listEl.style.background = `url(${listBoxItem.imgUrl}) no-repeat center center`
            listEl.style.backgroundSize = 'cover'
        })
     //  setTimeout(() => {this.clearPhotoList()}, 5000)
     //  this.renderLevel2()
    }

    // static renderPhotoList() {
    //     const randomizedImagesUrls = this.shuffleImages(State.images32)
    //     const listBoxes = document.querySelectorAll('.list-box')
    //     listBoxes.forEach((listBox, index) => {
    //         // const listBoxImage = listBoxes[index].querySelector('img')
    //         // listBoxImage.src = randomizedImagesUrls[index]
    //         listBoxes[index].style.background = `url(${randomizedImagesUrls[index]}) no-repeat center center`;
    //         listBoxes[index].style.backgroundSize = 'cover'
    //     })
    //     // this.listDataFunction()
    //     // setTimeout(() => {this.clearPhotoList()}, 5000)
    //     // this.renderLevel2()
    // }

    static clearPhotoList() {
        const listBoxes = document.querySelectorAll('.list-box')
        listBoxes.forEach((listBox, index) => {listBoxes[index].style.background = 'white'})
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