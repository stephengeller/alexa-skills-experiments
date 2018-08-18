const AWS = require("aws-sdk")
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" })
const data = require("./quotes.json")

const writeToDB = async params => {
	const { from, to } = params.Item.quote
	console.log(`Uploading quote from ${from} to ${to}`)

	await docClient.put(params, async (err, data) => {
		if (err) {
			console.log("Writing error")
			console.log(err)
		} else {
			await console.log("Upload successful\n")
		}
	})
}

async function uploadQuotes(quotes) {
	for (let person of quotes.data) {
		let putParams = {
			TableName: "yearbook-game-test-db",
			Item: {
				quote: {
					text: "",
					from: "",
					to: person.to
				},
				userId: ""
			}
		}
		for (let quote of person.quotes) {
			let { from, text } = quote
			console.log(from, person.to)
			putParams.Item.quote.from = from
			putParams.Item.quote.text = text
			putParams.Item.userId = `from_${from
				.toLowerCase()
				.replace(" ", "_")}_to_${person.to.toLowerCase().replace(" ", "_")}`
			await writeToDB(putParams)
		}
	}
}
uploadQuotes(data)
