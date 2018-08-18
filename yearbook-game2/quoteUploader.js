const AWS = require("aws-sdk")
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" })
const data = require("../quotes.json")

let putParams = {
	TableName: "yearbook-game-test-db",
	Item: {
		quote: {
			text: "",
			from: "",
			to: "Stephen Geller"
		},
		userId: ""
	}
}

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

// let i = 0
// for (i = 0; i < data.quotes.length; i++) {
// 	let quote = data.quotes[i]
// 	let { from, text } = quote
// 	putParams.Item.quote.from = from
// 	putParams.Item.quote.text = text
// 	putParams.Item.userId = `from_${from.toLowerCase()}_to_${data.to.toLowerCase()}`
// 	writeToDB(putParams)
// }

async function uploadQuotes() {
	for (let quote of data.quotes) {
		let { from, text } = quote
		putParams.Item.quote.from = from
		putParams.Item.quote.text = text
		putParams.Item.userId = `from_${from.toLowerCase()}_to_${data.to.toLowerCase()}`
		await writeToDB(putParams)
	}
}

uploadQuotes()
