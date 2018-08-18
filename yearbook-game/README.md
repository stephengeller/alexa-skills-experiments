Alexa Skills Experiments
========================

# Installation
```bash
git clone git@github.com:stephengeller/alexa-skills-experiments.git
cd alexa-skills-experiments
```

# Current Skills

##### - `yearbook-game`: Skill using a lambda that queries DynamoDB for yearbook quotes, and asks the player who the quote was written by or for.
  

# How To Use

#### `yearbook-game`
- Update the `FUNCTION_NAME` variable in `deploy.sh` to point to a lambda on your AWS account. You may need to create a lambda for it first, in order for the code within it to be updated.
- Create a `quotes.json` file in the yearbook-game directory, using the following data structure:
```json
{
	"data": [
		{
			"to": "FirstName LastName",
			"quotes": [
				{
					"from": "FirstName LastName",
					"text":
						"Some quote."
				}
			]
		}
	]
}
```
- Run `$ node quoteUploader.js` to upload the quotes to AWS DynamoDB.
- Run `$ ./deploy.sh` to deploy the code to your AWS Lambda.
- Implement the Alexa skill to point to the handlers laid out in `index.js` (you will need to investigate how Alexa works with lambdas in order to set this up correctly)
- Point the Alexa skill to use the ARN of the Lambda containing the deployed lambda code.
