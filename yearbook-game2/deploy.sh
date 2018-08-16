#!/usr/bin/bash

set -e

cd src
zip -r ../yearbook_lambda_zipped *
cd -

aws lambda update-function-code --publish --region us-east-1 --function-name "yearbook-game" --zip-file fileb://yearbook_lambda_zipped.zip
