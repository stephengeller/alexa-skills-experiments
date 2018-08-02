'use strict'

const Alexa = require('alexa-sdk')

const APP_ID = 'ask/dadd2241-57ee-49ef-8b6b-bccb70fc2d59'

const handlers = {
    LaunchRequest: function() {
        this.emitWithState('StartGame')
    },
    StartGame: function() {
        this.response
            .speak('Starting the Yearbook Game. Take a guess')
            .listen('Listening')
        this.emit(':responseReady')
    },
    PlayAgain: function() {
        this.response.speak('Let\'s go again! Take a guess').listen('Listening')
        this.emit(':responseReady')
    },
    AnalyseResponse: function() {
        const guess = this.event.request.intent.slots.guess.value
        if (guess.length <= 5) {
            // this.response.speak("Analysing Response").listen("Listening")
            this.emitWithState('WinGame')
        } else {
            this.emitWithState('LoseGame')
        }
    },
    WinGame: function() {
        this.response.speak('You won. Play again?').listen('Play again?')
        this.emit(':responseReady')
    },
    LoseGame: function() {
        this.response.speak('You lose. Play again?').listen('Play again?')
        this.emit(':responseReady')
    }
}

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback)
    alexa.dynamoDBTableName = 'yearbook-game-test-db'
    alexa.APP_ID = APP_ID
    alexa.registerHandlers(handlers)
    alexa.execute()
}
