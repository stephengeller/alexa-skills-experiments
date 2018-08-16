const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

const params = {
    TableName: 'yearbook-game-test-db'
}

docClient.scan(params, function(err, data) {
    if (err) {
        console.log('error')
    } else {
        const { Items } = data
        console.log(Items)
    }
})

console.log('end')
