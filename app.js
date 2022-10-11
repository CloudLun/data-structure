const nav = document.querySelector('.nav')
const toggle = document.querySelector('.nav-toggle')

toggle.addEventListener('click', () => {
    const visibility = nav.getAttribute("data-visible")
    if(visibility === 'false') {
        nav.setAttribute("data-visible", true)
        toggle.setAttribute("aria-expanded", true)
        console.log('aa')
    }else {
        nav.setAttribute("data-visible", false)
        toggle.setAttribute("aria-expanded", false)
        console.log('bb')
    }
})