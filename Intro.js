class Intro {
    static render() {
        rootEl.innerHTML = `
            <form id='name-form'>
                <input id='name-input' placeholder='Enter your name' />
            </form>
            <select>
                <option>Pick a category...</option>
                <option>Vegetables</option>
                <option>Animals</option>
            </select>
        `
        const formEl = rootEl.querySelector('#name-form')
        formEl.addEventListener('submit', this.setUserListener)
    }

    static setUserListener(event) {
        event.preventDefault()
        const inputEl = rootEl.querySelector('#name-input')
        State.username = inputEl.value
        event.target.reset()
    }
}
