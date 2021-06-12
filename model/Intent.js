module.exports = class Intent {
        constructor() {
                this.displayName = ""
                this.trainingPhrases = []
                this.events = []
                this.parameters = []
                this.messages = []
                this.endInteraction = false
                this.webhookState = "WEBHOOK_STATE_ENABLED"
        }

}

