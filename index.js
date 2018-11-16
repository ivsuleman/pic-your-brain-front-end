const rootEl = document.querySelector('#root')

const logoHome = document.querySelector('#logo')
logoHome.addEventListener('click', event => {
    location.reload()
    // Intro.render()
    // const footer = document.querySelector('.bottom')
    // const timer = document.querySelector('#seconds')
    // footer.innerText = 'Made by Irfan and Amalie'
    // timer.innerText = ''
})

Intro.render()
