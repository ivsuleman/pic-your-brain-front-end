class State {
    static init() {
        this.username = ''
        this.user_id = ''
        this.category = ''
        this.images16 = []
        this.images32 = []
        this.timeLeft = 100
        this.points = 0
    }

    setUser(username) {
        this.username = username
    }
}

State.init()
