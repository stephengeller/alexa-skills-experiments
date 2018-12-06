#!/usr/bin/env bash

set -e

FUNCTION_NAME="yearbook-game"
NAME_OF_ZIPPED_FILE="yearbook_lambda_zipped"

cd src

function lint_files() {
    echo "Checking linting errors..."
    eslint index.js
}

function zip_files() {
    echo "Zipping up..."
    zip -r ../${NAME_OF_ZIPPED_FILE} * &>/dev/null
    cd - &>/dev/null
}

function upload_to_aws() {
    echo "Uploading to AWS Lambda..."
    aws lambda update-function-code --publish --region us-east-1 --function-name ${FUNCTION_NAME} --zip-file fileb://${NAME_OF_ZIPPED_FILE}.zip &>/dev/null
    rm -rf ${NAME_OF_ZIPPED_FILE}.zip
    echo "Done."
}

lint_files
zip_files
upload_to_aws
