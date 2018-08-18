#!/usr/bin/bash

set -e

cd src

echo "Checking linting errors..."
eslint index.js

echo "Zipping up..."
zip -r ../yearbook_lambda_zipped * &>/dev/null
cd - &>/dev/null

echo "Uploading to AWS Lambda..."
aws lambda update-function-code --publish --region us-east-1 --function-name "yearbook-game" --zip-file fileb://yearbook_lambda_zipped.zip &>/dev/null
rm -rf yearbook_lambda_zipped.zip
echo "Done."
