const SERVER = "https://phamhoalaptopbot.herokuapp.com/"
var query = document.getElementById("query")
var result = document.getElementById("result")
var form = document.getElementById("agentDemoForm").addEventListener("submit", sendMessenger)

function createTextNode(text, type) {
    let node = document.createElement("div")
    if (type == "server")
        node.className = "server-response"
    else node.className = "user-request"
    node.innerHTML = text
    return node
}

function createImageNode(img) {
    let node = document.createElement("img")
    node.src = img
    node.className = "server-response"
    node.alt = "Anh chua duoc load"
    return node
}

function sendMessenger(e) {
    e.preventDefault()
    let textQuerry = query.value;
    query.value = ""
    result.appendChild(createTextNode(textQuerry, "user"))
    fetch(`${SERVER}/query?q=${textQuerry}`)
        .then(res => res.json())
        .then(json => json.text)
        .then(array => {
            console.log(array)
            array.forEach(value => {
                if(value.text) result.appendChild(createTextNode(value.text.text[0],"server"))
                if(value.card) result.appendChild(createImageNode(value.card.imageUri))
            });
            return 0
        })
        .catch(console.log)

}

