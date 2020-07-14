const toggleButton = document.getElementById("toggle")
chrome.storage.sync.get({ "isSkipEnabled": true }, data => {
    if (data.isSkipEnabled) toggleButton.innerHTML = DISABLE
    else toggleButton.innerHTML = ENABLE
})

const activeTab = { currentWindow: true, active: true }

const ENABLE = "Enable"
const DISABLE = "Disable"

const onClick = () => {
    let checked = (toggleButton.innerHTML === DISABLE)
    if (checked) toggleButton.innerHTML = DISABLE
    else toggleButton.innerHTML = ENABLE
    checked = !checked
    chrome.tabs.query(activeTab, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, checked)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    toggleButton.addEventListener("click", onClick)
})