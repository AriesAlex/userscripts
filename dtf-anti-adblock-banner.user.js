// ==UserScript==
// @name         DTF Anti-AdBlock Banner
// @namespace    https://github.com/AriesAlex/userscripts
// @version      1.0.0
// @description  Автоматически закрывает баннер 'Вы используете блокировщик рекламы' на DTF
// @author       AriesAlex
// @match        *://*.dtf.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dtf.ru
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/AriesAlex/userscripts/main/dtf-anti-adblock-banner.user.js
// @downloadURL  https://raw.githubusercontent.com/AriesAlex/userscripts/main/dtf-anti-adblock-banner.user.js
// ==/UserScript==

(() => {
    'use strict'

    const targetText = 'Вы используете блокировщик рекламы'

    const findAndCloseModal = () => {
        const h1Elements = document.querySelectorAll('h1.blocker__title')

        for (const h1 of h1Elements) {
            if (h1.textContent.includes(targetText)) {
                const modalWindow = h1.closest('.modal-window')
                if (!modalWindow) continue

                const buttonToClick = modalWindow.querySelector('button.modal-window__back') || modalWindow.querySelector('button.modal-window__close')

                if (buttonToClick) {
                    buttonToClick.click()
                    return
                }
            }
        }
    }

    const observer = new MutationObserver(findAndCloseModal)

    observer.observe(document.body, {
        childList: true,
        subtree: true
    })

    findAndCloseModal()
})()
