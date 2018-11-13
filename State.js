class State {
    static init() {
        this.name = ''
        this.category = ''
        this.images = []
        this.timeLeft = 100
    }

    setUser(name) {
        this.name = name
    }
}

State.init()
