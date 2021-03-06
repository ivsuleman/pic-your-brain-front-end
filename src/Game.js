class Game {

    static render() {
        rootEl.innerHTML = `
            <div class="pg-image" id='catg-img'></div>

            <div class="pg-content">
               
                <div id="pg-instructions">
                    <p>1. Remember the image (on the left) before the countdown ends.</p>
                    <p>2. Find and click on the correct image from the thumbnail images (on the right) as fast as you can.</p>
                    <p>3. Wrong clicks and slowness will imapct your final points.</p>
                    <p>4. The aim is to have the lowest points, indicating accuracy and speed. Good Luck!</p>
                </div>
                <div class="pg-buttons">
                    <button class="pg-buttons-inst nav-button" id="start-button">START THE GAME</button>
                    <button class="pg-buttons-inst nav-button" id="cat-menu-btn">CHOOSE A DIFFERENT CATEGORY</button>
                </div>
            </div>
        `
        this.renderCategoryImg()

        document.addEventListener('click', event => {
            if (event.target.id === 'start-button') {
                this.beginGame(event)
            }
            if (event.target.id === 'cat-menu-btn') {
                Intro.render()
            }
        })
    }

    static renderCategoryImg() {
        const catgImgEl = document.querySelector('#catg-img')
        catgImgEl.id = State.categoryId
        catgImgEl.classList.add('large')
    }

    static beginGame(event) {
        event.preventDefault()
        rootEl.innerHTML = `
            <div id="game-container">
                <div id="photo-grid">
                    ${Array(16).fill().map((_, idx) => `<div id='grid-box-${idx}' data-id='' class="grid-box"></div>`).join('')}
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

        const footer = document.querySelector('.bottom')
        // footer.style.display = 'none'
        footer.innerText = ''
        footer.innerHTML = '<button class="nav-button" id="exit-btn">Exit Game</button>' 

        const exitGameButton = document.querySelector('#exit-btn')
        exitGameButton.addEventListener('click', event => {
            this.exitGame()
        })

        this.getImages(State.category)
            .then(() => this.gridDataFunction())
            .then(() => this.listDataFunction())
            .then(() => this.renderLevel1())
    }

    static countDownTimer(number, imgIndexes) {
        let countDown = number
        console.log(number)
        document.getElementById('seconds').innerText = `${countDown} Seconds`
        const IntervalHandle = setInterval(() => {
            countDown = --countDown;
            if (countDown >= 0) {
                document.getElementById('seconds').innerText = `${countDown} Seconds`
                console.log(countDown)
            } else {
                clearInterval(IntervalHandle)
                console.log('clearing')
                this.clearLevel(imgIndexes)
                this.renderPhotoList()
            }
        }, 1000)
        // setTimeout(() => clearInterval(handle), number * 1000)
    }

    static gridDataFunction() {
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
        this.clearPhotoList()
        array.forEach(item => {
            const gridBoxObj = { ...State.gridData[item]
            }
            State.selectedData.push(State.gridData[item].imgId)
            const boxEl = document.querySelector(`#grid-box-${item}`)
            boxEl.style.background = `url(${gridBoxObj.imgUrl}) no-repeat center center`
            boxEl.style.backgroundSize = 'cover'
            boxEl.dataset.id = gridBoxObj.imgId
        })
    }

    static renderLevel1() {
        const imgIndexes = [0]
        State.currentLevelIndexesArray = [...imgIndexes]
        this.renderLevel(imgIndexes)
        this.countDownTimer(3, imgIndexes)
    }

    static renderLevel2() {
        const imgIndexes = [0, 1, 4, 5]
        State.currentLevelIndexesArray = [...imgIndexes]
        this.renderLevel(imgIndexes)
        this.countDownTimer(10, imgIndexes)
    }

    static renderLevel3() {
        const imgIndexes = [0, 1, 2, 4, 5, 6, 8, 9, 10]
        State.currentLevelIndexesArray = [...imgIndexes]
        this.renderLevel(imgIndexes)
        this.countDownTimer(15, imgIndexes)
    }

    static renderLevel4() {
        const imgIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        State.currentLevelIndexesArray = [...imgIndexes]
        this.renderLevel(imgIndexes)
        this.countDownTimer(20, imgIndexes)
    }

    static clearLevel() {
        State.currentLevelIndexesArray.forEach(item => {
            document.querySelectorAll('.grid-box')[item].style.background = 'white'
        })
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
        const timer = document.querySelector('#seconds')
        timer.innerText = ''
        State.startTime = Date.now()
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        const shuffled = this.shuffle(State.listData)
        array.forEach(item => {
            const listBoxItem = {...shuffled[item]}
            // const listBoxItem = { ...State.listData[item]}
            const listEl = document.querySelector(`#list-box-${item}`)
            listEl.style.background = `url(${listBoxItem.imgUrl}) no-repeat center center`
            listEl.style.backgroundSize = 'cover'
            listEl.setAttribute('data-id', State.listData[item].imgId)
        })
    }

    static clearPhotoList() {
        const listBoxes = document.querySelectorAll('.list-box')
        listBoxes.forEach((listBox, index) => {
            listBoxes[index].style.background = 'white'
        })
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
        if (State.selectedData.find(id => id === event.target.dataset.id)) {
            console.log('WOOOOO')
            // delete the id from State.selectedData
            State.selectedData.splice(State.selectedData.indexOf(event.target.dataset.id), 1)
            // TODO: change background of clicked item in list to green

            // show image on the grid
            const foundImageEl = document.querySelector(`[data-id='${event.target.dataset.id}']`)
            const foundStateImage = State.images16.find(image => image.id === event.target.dataset.id)
            foundImageEl.style.background = `url(${foundStateImage.urls.regular}) no-repeat center center`
            foundImageEl.style.backgroundSize = 'cover'
            foundImageEl.classList.add('animated', 'tada')
            setTimeout(() => foundImageEl.classList.remove('animated', 'tada'), 1000)

            if (State.selectedData.length === 0) {
                State.finishTime = Date.now()

                // setTimeout(() => {
                //     this.timeCalculator()
                //     this.clearLevel()
                //     this.clearPhotoList()
                // }, 2000)

                if (State.currentLevel === 1) {
                    this.timeCalculator()
                    State.currentLevel += 1
                    this.renderLevel2()
                } else if (State.currentLevel === 2) {
                    this.timeCalculator()
                    State.currentLevel += 1
                    this.renderLevel3()
                } else if (State.currentLevel === 3) {
                    this.timeCalculator()
                    State.currentLevel += 1
                    this.renderLevel4()
                } else {

                    console.log('GAME OVER')
                    this.createGameObject()

                    // TODO: link to summary page
                    Summary.render()

                }
            }
        } else {
            console.log("nope wrong")
            // change background of clicked item in list to red
            const foundImageEl = document.querySelector(`[data-id='${event.target.dataset.id}']`)
            foundImageEl.classList.add('wrong', 'animated', 'wobble')
            setTimeout(() => foundImageEl.classList.remove('animated', 'wobble'), 1000)

            // add a penalty point to State.penalties
            State.overallPenalties += 1

            if (State.currentLevel === 1) {
                State.penalties1 += 1

            } else if (State.currentLevel === 2) {
                State.penalties2 += 1

            } else if (State.currentLevel === 3) {
                State.penalties3 += 1

            } else if (State.currentLevel === 4) {
                State.penalties4 += 1
            }
        }

    }

    static timeCalculator() {
        const time = (State.finishTime - State.startTime) / 1000
        State.times.push(time)
        if (State.currentLevel === 1) {
            State.level1Time = time
            State.overallTime += time
        } else if (State.currentLevel === 2) {
            State.level2Time = time
            State.overallTime += time
        } else if (State.currentLevel === 3) {
            State.level3Time = time
            State.overallTime += time
        } else if (State.currentLevel === 4) {
            State.level4Time = time
            State.overallTime += time
        } else {
            console.log('no time')
        }
    }

    static createGameObject() {
        this.calculatePoints()
        const game = {
            user_id: State.userId,
            points: State.points,
            time: State.overallTime,
            points: State.points,
            level: State.currentLevel,
            penalties: State.overallPenalties,
            penalties1: State.penalties1,
            penalties2: State.penalties2,
            penalties3: State.penalties3,
            penalties4: State.penalties4,
            time1: State.level1Time,
            time2: State.level2Time,
            time3: State.level3Time,
            time4: State.level4Time,
        }
        console.log(game)
        createGame(game)
    }

    static calculatePoints() {
        const points = State.overallTime * State.overallPenalties
        State.points = points
    }

    static exitGame() {
        console.log('EXIT!')
        this.createGameObject()
        Summary.render()
    }

}