#!/usr/bin/bash

set -e

cd src
zip ../yearbook_lambda_zipped *
cd -

aws lambda update-function-code --region us-east-1 --function-name "yearbook-game" --zip-file fileb://yearbook_lambda_zipped.zip
