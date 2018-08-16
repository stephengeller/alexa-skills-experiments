'use strict'

const Alexa = require('alexa-sdk')
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

const APP_ID = 'ask/dadd2241-57ee-49ef-8b6b-bccb70fc2d59'
const TABLE_NAME = 'yearbook-game-test-db'

const handlers = {
    LaunchRequest: function() {
        this.emitWithState('StartGame')
    },
    StartGame: function() {
        this.attributes.someAttr = 'value of some attribute ' + Date()
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
    },
    'AMAZON.StopIntent': function() {
        this.response.speak('Ok, let\'s play again soon.')
        this.emit(':responseReady')
    },

    // Cancel
    'AMAZON.CancelIntent': function() {
        this.response.speak('Ok, let\'s play again soon.')
        this.emit(':responsesReady')
    },
    SessionEndedRequest: function() {
        this.attributes.sessionEnded = true
        console.log('session ended!')
        this.emit(':saveState', true)
    },
    GetFromDynamoDb: function() {
        console.log('getting from db')
        const params = {
            TableName: TABLE_NAME
        }
        docClient.scan(params, function(err, data) {
            if (err)
            this.response.speak('Could not fetch from DynamoDB.')
            this.emit(':responsesReady')
            } else {
                const { Items } = data
                const itemString = Items.m
                this.response.speak('Could not fetch from DynamoDB.')
                this.emit(':responsesReady')
            }
        })
    }
}

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback)
    alexa.dynamoDBTableName = TABLE_NAME
    alexa.APP_ID = APP_ID
    alexa.registerHandlers(handlers)
    alexa.execute()
}