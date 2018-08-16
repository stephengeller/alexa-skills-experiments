const AWS = require("aws-sdk")
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" })

const params = {
	TableName: "yearbook-game-test-db"
}

const obj = { foo: "bar" }

const putParams = {
	TableName: "yearbook-game-test-db",
	Item: {
		quote: {
			text: `some_quote_${Date.now()}`,
			from: "some_author",
			to: "some_person"
		},
		userId: String(Date.now())
	}
}

const writeToDB = params => {
	docClient.put(params, function(err, data) {
		if (err) {
			console.log("Writing error")
			console.log(err)
		} else {
			const { text, from, to } = putParams.Item.quote
			console.log(`successfully put quote from ${from} to ${to}:`)
			// console.log(putParams);
			console.log("\n========================\n")
			getAllFromDB({ TableName: params.TableName })
		}
	})
}

const getAllFromDB = params => {
	docClient.scan(params, function(err, data) {
		if (err) {
			console.log("Getting error")
			console.log(err)
		} else {
			const { Items } = data
			const quotes = Items.filter(item => {
				return Object.keys(item).includes("quote")
			})
			console.log(quotes)
		}
	})
}

writeToDB(putParams)

// console.log("getting from db");
// const params2 = {
//   TableName: "yearbook-game-test-db"
// };
//
// docClient.scan(params2, function(err, data) {
//   if (err) {
//     console.log("Could not fetch from DynamoDB.");
//   } else {
//     const { Items } = data;
//     console.log(
//       `Fetched from DynamoDB. Found quote: ${
//         Items[Items.length - 1].quote.text
//       }`
//     );
//   }
// });
// console.log("outside DynamoDB.");
