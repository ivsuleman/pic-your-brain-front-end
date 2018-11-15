class State {
    static init() {
        this.userId = ''
        this.userName = ''
        this.category = ''
        this.images16 = []
        this.images32 = []
        this.points = 0
        this.gridData = []
        this.listData = []
        this.selectedData = []
        this.currentLevel = 1
        this.penalties = 0
        this.currentLevelIndexesArray = []
        this.level1Time = 0
        this.level2Time = 0
        this.level3Time = 0
        this.level4Time = 0
        this.overallTime = 0
        this.startTime = 0
        this.finishTime = 0
        this.timings = []
        this.times = []
    }

    setUser(name) {
        this.userName = name
    }
}

State.init()
