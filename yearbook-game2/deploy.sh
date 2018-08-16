#!/usr/bin/bash

set -e


echo "Zipping up..."
cd src
zip -r ../yearbook_lambda_zipped * &>/dev/null
cd - &>/dev/null

echo "Uploading to AWS Lambda..."
aws lambda update-function-code --publish --region us-east-1 --function-name "yearbook-game" --zip-file fileb://yearbook_lambda_zipped.zip &>/dev/null
echo "Done."
