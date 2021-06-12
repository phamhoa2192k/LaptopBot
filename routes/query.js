const PROJECTID = process.env.PROJECTID
const SESSIONID = process.env.SESSIONID
const LANGUAGECODE = process.env.LANGUAGECODE
const executeQueries = require("../modules/detect.js")
const query = require("express").Router()

query.get("/", (req, res) => {
    let text = req.query.q
    executeQueries(PROJECTID, SESSIONID, text, LANGUAGECODE)
        .then(res => res)
        .then(json => res.status(200).send(JSON.stringify({
            text: json.queryResult.fulfillmentMessages[0].text.text
        })))
})

module.exports = query
