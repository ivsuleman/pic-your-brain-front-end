class Intro {
    static render() {
        rootEl.innerHTML = `
            <form id='username-form'>
                <input id='username-input' placeholder='enter your username' />
            </form>
            <select>
                <option>Pick a category...</option>
                <option>Vegetables</option>
                <option>Animals</option>
            </select>
        `
        const formEl = rootEl.querySelector('#username-form')
        formEl.addEventListener('submit', this.setUserListener)
    }

    static setUserListener(event) {
        event.preventDefault()
        const inputEl = rootEl.querySelector('#username-input')
        State.username = inputEl.value
        event.target.reset()
    }
}
