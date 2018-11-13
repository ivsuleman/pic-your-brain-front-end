class State {
    static init() {
        this.username = ''
        this.category = ''
        this.timeLeft = 100
    }

    setUser(username) {
        this.username = username
    }
}

State.init()
