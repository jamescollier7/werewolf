;(() => {
    'use strict';

    let app
    let data

    const init = async () => {
        app = document.getElementById(`app`)
        data = await getData()
        const rolesHtml = await buildDropdownHtml(data.roles)
        const housesHtml = await buildDropdownHtml(data.houses)

        document.querySelector(`.dropdown-list.roles`).innerHTML += rolesHtml
        document.querySelector(`.dropdown-list.houses`).innerHTML += housesHtml

        bindClickEvents()
        loadSaved()
    }

    const loadSaved = async () => {
        const roleName = localStorage.getItem(`role`)
        const houseName = localStorage.getItem(`house`)

        if (roleName) {
            showSelected(roleName, `role`)
        }
        if (houseName) {
            showSelected(houseName, `house`)
        }
    }

    const buildDropdownHtml = async (data) => {
        return await data.map(({name, title, altTitles, descriptionHtml}) => {
            return `<div id="${name}" class="dropdown-item" data-name="${name}"><img src="images/msdropdown/icons/roles/${name}.png" data-name="${name}"><h2 data-name="${name}">${title}</h2></div>`
        }).join(``)
    }

    const getData = async () => {
        const response = await fetch(`https://jamescollier7.github.io/werewolf/src/data.json`)
        return await response.json()
    }

    const showSelected = (name, type) => {
        const selectedContainer = document.getElementById(`selected-${type}`)
const role = data.roles.find((role) => role.name === name)
        selectedContainer.innerHTML = `<h2>${role.title}</h2>
                                         <h3>${role.altTitles}</h3>
                                         <img src="images/full/${name}.png">
                                         ${role.descriptionHtml}`
        selectedContainer.classList.remove(`hidden`)
    }

    const handleDropdownItemClick = (event) => {
        const name = event.target.dataset.name
        const type = event.currentTarget.parentElement.dataset.type

        // save selection
        localStorage.setItem(type, name)

        // show selection
        showSelected(name, type)

        // hide dropdown
        event.currentTarget.classList.toggle(`hidden`)
    }

    const bindClickEvents = () => {
        // open/close dropdown
        const dropdownButtons = document.querySelectorAll(`.dropdown button.button`)
        dropdownButtons.forEach((dropdownButton) => {
            dropdownButton.addEventListener(`click`, (event) => {
                event.currentTarget.parentElement.querySelector(`.dropdown-list`).classList.toggle(`hidden`)
            })    
        })

        // select item
        const dropdownLists = document.querySelectorAll(`.dropdown .dropdown-list`)
        dropdownLists.forEach((dropdownList) => {
            dropdownList.addEventListener(`click`, handleDropdownItemClick)
        })

        // do reset
        const resetButton = document.querySelector(`button.reset`)
        resetButton.addEventListener(`click`, (event) => {
            localStorage.clear()
            location.reload()
        })
    }
    document.readyState !== `loading` ? init() : document.addEventListener(`readystatechange`, () => {
        document.readyState === `complete` && init()
    })
})()
