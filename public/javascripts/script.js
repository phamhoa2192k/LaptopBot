const SERVER = "http://localhost:3000"
var query = document.getElementById("query")
var result = document.getElementById("result")
var form = document.getElementById("agentDemoForm").addEventListener("submit", sendMessenger)

function createMessNode(text, type){
    let node = document.createElement("div")
    if(type =="server")
        node.className = "server-response"
    else node.className = "user-request"
    node.innerHTML = text
    return node
}

function sendMessenger(e){
    e.preventDefault()
    let textQuerry = query.value;
    query.value=""
    result.appendChild(createMessNode(textQuerry , "user"))
    fetch(`${SERVER}/query?q=${textQuerry}`)
    .then(res => res.json())
    .then(json => json.text)
    .then(text => result.appendChild(createMessNode(text, "server")))
    .catch(console.log)

}

function update(){
    fetch("/admin/update")
}
