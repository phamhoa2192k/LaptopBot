// function response(res) {
//     let parameters = res.queryResult.parameters


// }

class Response {
    constructor(res) {
        this.parameters = res.queryResult.parameters
        this.fulfillmentText = res.queryResult.fulfillmentText  
        
    }


    res = () => {
        return ""
    }

}