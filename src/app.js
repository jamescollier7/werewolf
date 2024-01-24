;(() => {
    'use strict';

    const init = async () => {
        const data = await getRoles()
        const dropdownHtml = await buildDropdownHtml(data)
        const app = document.getElementById(`app`)

        app.innerHTML += dropdownHtml

        bindClickEvents()
    }

    const buildDropdownHtml = async (data) => {
        const roleHtml = await data.roles.map(({name, title, altTitles, descriptionHtml}) => {
            return `<div id="${name}" class="dropdown-item"><img src="images/msdropdown/icons/roles/${name}.png"><h2>${title}</h2></div>`
        }).join(``)

        return `<div class="dropdown">
                    <button class="dropdown-button role" type="button">Choose Role</button>
                    <div class="dropdown-list hidden">${roleHtml}</div>
                </div>`
    }

    const getRoles = async () => {
        const response = await fetch(`https://jamescollier7.github.io/werewolf/src/data.json`)
        return await response.json()
    }

    const bindClickEvents = () => {
        document.addEventListener(`click`, (event) => {
            const target = event.target
            console.log(target)
            if (target.classList.contains(`dropdown-button`)) {
                const parent = target.parentElement
                const dropdownList = parent.querySelector(`.dropdown-list`)
                dropdownList.classList.toggle(`hidden`)
            }
        })
    }
    document.readyState !== `loading` ? init() : document.addEventListener(`readystatechange`, () => {
        document.readyState === `complete` && init()
    })
})()
