// ==UserScript==
// @name         DTF Anti-AdBlock Banner
// @namespace    https://github.com/AriesAlex/userscripts
// @version      1.1.0
// @description  Автоматически закрывает баннер 'Вы используете блокировщик рекламы' на DTF и убирает анимацию его появления.
// @author       AriesAlex
// @match        *://*.dtf.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dtf.ru
// @grant        GM_addStyle
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/AriesAlex/userscripts/main/dtf-anti-adblock-banner.user.js
// @downloadURL  https://raw.githubusercontent.com/AriesAlex/userscripts/main/dtf-anti-adblock-banner.user.js
// ==/UserScript==

(() => {
    'use strict'

    GM_addStyle(`
        .blocker-in-enter-active,
        .blocker-in-leave-active {
            transition: none !important;
        }
    `)

    const targetText = 'Вы используете блокировщик рекламы'
    let pollingInterval = null

    const findAndCloseModal = () => {
        const h1 = document.querySelector('.modal-overlay:not([style*="display: none"]) h1.blocker__title')

        if (h1 && h1.textContent.includes(targetText)) {
            const modalWindow = h1.closest('.modal-window')
            if (!modalWindow) return

            const buttonToClick = modalWindow.querySelector('button.modal-window__back') || modalWindow.querySelector('button.modal-window__close')

            if (buttonToClick) {
                buttonToClick.click()
                if (pollingInterval) {
                    clearInterval(pollingInterval)
                    pollingInterval = null
                }
                return true
            }
        }
        return false
    }

    const observer = new MutationObserver(findAndCloseModal)
    observer.observe(document.body, {
        childList: true,
        subtree: true
    })

    pollingInterval = setInterval(findAndCloseModal, 50)

    findAndCloseModal()
})()
