"use strict";

const Alexa = require("alexa-sdk");
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const APP_ID = "ask/dadd2241-57ee-49ef-8b6b-bccb70fc2d59";
const TABLE_NAME = "yearbook-game-test-db";

const handlers = {
	LaunchRequest: function() {
		this.attributes.sessionEnded = false;
		this.emitWithState("StartGame")
	},
	StartGame: function() {
		const intro = "Starting the Yearbook Game. Who wrote this quote?";
		getRandomQuoteFromDB(quote => {
			this.attributes.quote = quote.quote;
			const quoteText = quote.quote.text;
			this.response
				.speak(intro + " " + quoteText)
				.listen("Either say the first name, or I don't know");
			this.emit(":responseReady")
		})
	},
	PlayAgain: function() {
		this.response.speak("Let's go again! Take a guess").listen("Listening");
		this.emit(":responseReady")
	},
	AnalyseResponse: function() {
		const { slots } = this.event.request.intent;
		const guessNameOfAuthor = Object.keys(slots).includes("guess")
			? slots.guess.value.toLowerCase()
			: slots.first_name.value.toLowerCase();
		const realNameOfAuthor = this.attributes.quote.from.toLowerCase();
		const firstName = realNameOfAuthor.split(" ")[0];
		if (
			guessNameOfAuthor == firstName ||
			guessNameOfAuthor.includes(firstName)
		) {
			// this.response.speak("Analysing Response").listen("Listening")
			this.emitWithState("WinGame")
		} else {
			this.emitWithState("LoseGame")
		}
	},
	WinGame: function() {
		const correctAnswer = this.attributes.quote.from;
		this.response
			.speak("You won! It was: " + correctAnswer + ". Play again?")
			.listen("Play again?");
		this.emit(":responseReady")
	},
	LoseGame: function() {
		const correctAnswer = this.attributes.quote.from;
		this.response
			.speak("You lost! It was: " + correctAnswer + ". Play again?")
			.listen("Play again?");
		this.emit(":responseReady")
	},
	"AMAZON.StopIntent": function() {
		this.response.speak("Ok, let's play again soon.");
		this.emit(":responseReady")
	},
    "AMAZON.HelpIntent": function() {
        this.response.speak("Try saying Start the Yearbook Game.").listen()
        this.emit(":responseReady")
    },

	// Cancel
	"AMAZON.CancelIntent": function() {
		this.response.speak("Ok, let's play again soon.");
		this.emit(":responseReady")
	},
	"AMAZON.FallbackIntent": function() {
		this.response.speak("Falling back, something went wrong.");
		this.emit(":responseReady")
	},
	SessionEndedRequest: function() {
		this.attributes.sessionEnded = true;
		// console.log("session ended!")
		this.emit(":saveState", true)
	}
};

const getRandomQuoteFromDB = async callback => {
	const params = { TableName: TABLE_NAME };

	await docClient.scan(params, (err, data) => {
		if (err) {
			return null
		} else {
			const { Items } = data;
			const quotes = Items.filter(item => {
				return Object.keys(item).includes("quote")
			});
			const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
			console.log("Sending quote: " + randomQuote.userId);
			callback(randomQuote)
		}
	})
};

exports.handler = function(event, context, callback) {
	const alexa = Alexa.handler(event, context, callback);
	alexa.dynamoDBTableName = TABLE_NAME;
	alexa.APP_ID = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute()
};
