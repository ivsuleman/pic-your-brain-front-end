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
            <div class="container-countdown">
                <ul>
                    <li><span id="seconds"></span>Seconds</li>
                </ul>
            </div>
            <div id="game-container">
                <div id="photo-grid">
                    ${Array(16).fill().map((_, idx) => `<div id='grid-box-${idx}' class="grid-box"></div>`).join('')}
                </div>
                <div id="photo-list">
                    ${Array(32).fill().map((_, idx) => `<div id='list-box-${idx}' class="list-box"></div>`).join('')}
                </div>
            </div>   
            `
        const photoListEl = document.querySelector('#photo-list')
        photoListEl.addEventListener('click', event => {
            this.matchImage(event)
        })

        this.getImages(State.category)
            .then(() => this.gridDataFunction())
            .then(() => this.listDataFunction())
            .then(() => this.renderLevel1())
    }

     static countDownTimer(number, imgIndexes) {
        let countDown = number
        document.getElementById('seconds').innerText = countDown
        // switch 
        const IntervalHandle = setInterval(() => {
            countDown = --countDown;
            if (countDown >= 0) {
                document.getElementById('seconds').innerText = countDown
            } else {
                clearInterval(IntervalHandle)
                this.clearLevel(imgIndexes)
                this.renderPhotoList()
            }
        }, 1000)
        // setTimeout(() => clearInterval(handle), number * 1000)
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
            })
            .then(() => {
                return this.fetchImages(url, clientId, query, perPage, page)
                    .then(data => {
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
            const gridBoxObj = { ...State.gridData[item] }
            State.selectedData.push(State.gridData[item].imgId)
            const boxEl = document.querySelector(`#grid-box-${item}`)
            boxEl.style.background = `url(${gridBoxObj.imgUrl}) no-repeat center center`
            boxEl.style.backgroundSize = 'cover'
        })
    }

    static renderLevel1() {
        const imgIndexes = [0]
        State.currentLevelIndexesArray = [...imgIndexes]
        this.renderLevel(imgIndexes)
        this.countDownTimer(5, imgIndexes)

        // TODO: once image has rendered to page start count down (3 seconds) then turn image white
        // firstBoxEl.style.background = 'white'
        // TODO: once time is 0 trigger renderPhotoList
        // this.renderPhotoList()
        // TODO: start timer and enable user to click on pictures to select the right one - when correct is selected the timer stops and level 2 is rendered & game stats added to State
    }


    static renderLevel2() {
        const imgIndexes = [0, 1, 4, 5]
        State.currentLevelIndexesArray = [...imgIndexes]
        this.renderLevel(imgIndexes)
        // TODO: once images have rendered to page start count down (10 seconds) then turn images white
        // this.clearLevel(imgIndexes)
        // TODO: once time is 0 trigger renderPhotoList
        // this.renderPhotoList()
        // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State

    }

    static renderLevel3() {
        const imgIndexes = [0, 1, 2, 4, 5, 6, 8, 9, 10]
        State.currentLevelIndexesArray = [...imgIndexes]
        this.renderLevel(imgIndexes)
        // TODO: once images have rendered to page start count down (10 seconds) then turn images white
        // this.clearLevel(imgIndexes)
        // TODO: once time is 0 trigger renderPhotoList
        // this.renderPhotoList()
        // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State
    }

    static renderLevel4() {
        const imgIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        State.currentLevelIndexesArray = [...imgIndexes]
        this.renderLevel(imgIndexes)
        // TODO: once images have rendered to page start count down (10 seconds) then turn images white
        // this.clearLevel(imgIndexes)
        // TODO: once time is 0 trigger renderPhotoList
        // this.renderPhotoList()
        // TODO: start timer and enable user to click on pictures to select the correct four - when they are selected  timer stops and level 3 is rendered & game stats added to State
    }

    static clearLevel() {
        State.currentLevelIndexesArray.forEach(item => { document.querySelectorAll('.grid-box')[item].style.background = 'white' })
    }

    static listDataFunction() {
        const listData = []
        document.querySelectorAll('.list-box').forEach((listBox, index) => {
            const listBoxObj = {}
            listBoxObj.listBox = listBox
            listBoxObj.imgUrl = State.images32[index].urls.regular
            listBoxObj.imgId = State.images32[index].id
            listData.push(listBoxObj)
        })
        State.listData = [...listData]
        
    }

    static renderPhotoList() {
        State.startTime = Date.now()
        const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        array.forEach(item => {
            const listBoxItem = {...State.listData[item]}
            const listEl = document.querySelector(`#list-box-${item}`)
            listEl.style.background = `url(${listBoxItem.imgUrl}) no-repeat center center`
            listEl.style.backgroundSize = 'cover'
            listEl.setAttribute('data-id', State.listData[item].imgId)
        })
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
        listBoxes.forEach((listBox, index) => { listBoxes[index].style.background = 'white' })
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

    static matchImage(event) {
        if (State.selectedData.find(id => id === event.target.dataset.id)){
            console.log('WOOOOO')
            // delete the id from State.selectedData
            State.selectedData.splice(State.selectedData.indexOf(event.target.dataset.id), 1)
            // change background of clicked item in list to green
            // show image on the grid
            // check value of counter (counter = State.selectedData.length) ---- if 0, render next level, if >0 continue level
            if (State.selectedData.length === 0){
                State.currentLevel += 1
                State.finishTime = Date.now()
                this.timeCalculator()
                this.clearLevel()
                this.clearPhotoList()
                this.renderLevel2()  // need to change this to be dynamic not hard coding the specific level -- use State.currentLevel
            }
        } else {
            console.log("no")
            // change background of clicked item in list to red
            // add a penalty point to State.penalties
            State.penalties += 1
        }
        
    }

    static timeCalculator() {
        const time = (State.finishTime - State.startTime) / 1000 
        State.times.push(time)
        State.level1Time = time
    }

}

