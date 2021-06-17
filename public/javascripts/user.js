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

function createCardNode(card) {
    let node = document.createElement("div")
    let img = document.createElement("img")
    img.src = card.imageUri
    node.className = "server-response"
    img.alt = "Ảnh chưa được load"
    node.appendChild(img)
    card.buttons.forEach((value, i) => {
        let b = document.createElement("button")
        b.onclick = () => {query.value = value.text}
        b.innerHTML = value.text
        node.appendChild(b)
    })
    return node
}

function sendMessenger(e) {
    e.preventDefault()
    let textQuerry = query.value;
    query.value = ""
    result.appendChild(createTextNode(textQuerry, "user"))
    fetch(`/query?q=${textQuerry}`)
        .then(res => res.json())
        .then(json => json.text)
        .then(array => {
            console.log(array)
            array.forEach(value => {
                if (value.text) result.appendChild(createTextNode(value.text.text[0], "server"))
                if (value.card) result.appendChild(createCardNode(value.card))
            });
            return 0
        })
        .catch(console.log)
        query.focus()
}

