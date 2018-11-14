class State {
    static init() {
        this.userId = ''
        this.userName = ''
        this.category = ''
        this.images16 = []
        this.images32 = []
        this.timeLeft = 100
        this.points = 0
        this.gridData = []
        this.listData = []
    }

    setUser(name) {
        this.userName = name
    }
}

State.init()
