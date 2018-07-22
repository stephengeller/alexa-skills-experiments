const QuotePicker = require("./src/QuotePicker");

const handlers = {
  LaunchIntent: function() {
    this.response
      .speak("Welcome to the yearbook game! Would you like to play?")
      .listen("Would you like to play?");
    this.response.emit(":responseReady");
  },
  StartGameIntent: function() {
    const potentialPlayers = [
      "stephen geller",
      "will dixon",
      "james gillespie",
      "max ravenscroft",
      "joel farrer",
      "peter o'brien"
    ];
    let player = randomFromArray(potentialPlayers);
    if (
      typeof this.attributes["quotePicker"].name !== "undefined" &&
      player === this.attributes["quotePicker"].name
    ) {
        player = randomFromArray(potentialPlayers);
    }
    this.attributes["quotePicker"] = new QuotePicker(player);
    const quote = this.attributes["quotePicker"].getQuote();
    this.attributes["mostRecentQuote"] = quote;
    this.response
      .speak(
        `Here's the first quote: ${quote}. Who was the quote written for? Say "repeat" to repeat the quote.`
      )
      .listen();
    this.response.emit(":responseReady");
  },
  RepeatAnswerIntent: function() {
    const quote = this.attributes["mostRecentQuote"];
    this.response.speak(`The quote was: ${quote}`).listen(``);
    this.response.emit(":responseReady");
  },
  CorrectAnswerIntent: function() {
    this.response
      .speak(
        `You're right! The person was ${
          this.attributes["quotePicker"].name
        }. Say "play again" to play again.`
      )
      .listen(``);
    this.response.emit(":responseReady");
  }
};
