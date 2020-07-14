const callback = (listOfMutations, observer) => {
    const a = document.querySelector(".skip-credits>a")
    if(a) a.click()
}

// listens to DOM changes
const observer = new MutationObserver(callback)

// what changes to listen to
const config = { attributes: false, childList: true, subtree: true }

const startObserving = () => {
    const elements = document.getElementsByTagName("body")
    observer.observe(elements[0], config)
}

// fool proof way to start observing
const checkReadyAndObserve = () => {
    if (document.readyState !== "loading") startObserving()
    else document.addEventListener("DOMContentLoaded", startObserving)
}

// on start up check if enabled
chrome.storage.sync.get({ "isSkipEnabled": true }, data => {
    if (data.isSkipEnabled) checkReadyAndObserve()
})

// if user changes preference modify storage and take effect immediately
chrome.runtime.onMessage.addListener(message => {
    chrome.storage.sync.set({ isSkipEnabled: message }, () => {
        if (message) checkReadyAndObserve()
        else observer.disconnect()
    })
})

// const pe = "PlayerControlsNeo__layout"
