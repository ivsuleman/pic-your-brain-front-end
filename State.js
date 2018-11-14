class State {
    static init() {
        this.userId = ''
        this.userName = ''
        this.category = ''
        this.images = []
        this.timeLeft = 100
    }

    setUser(name) {
        this.userName = name
    }
}

State.init()
