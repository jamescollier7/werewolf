;(() => {
    'use strict';

    const app
    const data

    const init = async () => {
        app = document.getElementById(`app`)
        data = await getData()
        const rolesHtml = await buildDropdownHtml(data.roles)
        const housesHtml = await buildDropdownHtml(data.houses)

        document.querySelector(`.dropdown-list.roles`).innerHTML += rolesHtml
        document.querySelector(`.dropdown-list.houses`).innerHTML += housesHtml

        bindClickEvents()
    }

    const buildDropdownHtml = async (data) => {
        return await data.map(({name, title, altTitles, descriptionHtml}) => {
            return `<div id="${name}" class="dropdown-item"><img src="images/msdropdown/icons/roles/${name}.png"><h2>${title}</h2></div>`
        }).join(``)
    }

    const getData = async () => {
        const response = await fetch(`https://jamescollier7.github.io/werewolf/src/data.json`)
        return await response.json()
    }

    const bindClickEvents = () => {
        // open/close dropdown
        const dropdownButtons = document.querySelectorAll(`.dropdown button.button`)
        dropdownButtons.addEventListener(`click`, (event) => {
            // which dropdown?
            console.log(event.currentTarget)
        })

        // select item
        const dropdownList = document.querySelectorAll(`.dropdown .dropdown-list`)
        dropdownList.addEventListener(`click`, (event) => {
            // which item
            localStorage.setItem("myCat", "Tom")
        })

        // do reset
        const resetButton = document.querySelector(`button.reset`)
        dropdownButtons.addEventListener(`click`, (event) => {
            localStorage.clear()
            location.reload()
        })
    }
    document.readyState !== `loading` ? init() : document.addEventListener(`readystatechange`, () => {
        document.readyState === `complete` && init()
    })
})()
