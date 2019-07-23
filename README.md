# MakerDao Bite Keeper

A simple MakerDao bite keeper to bite unsafe positions

## Requirements

- Depends on dai.js
- It needs an etherium node. You can use infura
- Needs a private key to sign transactions. You can use MetaMask
- You can find environment variables names in src/config.js

## Usage

- `npm i`
- `npm start`
- POST /bite-keeper/start
- POST /bite-keeper/stop
- GET /bite-keeper/status

## Use with Docker

- `docker build -t dai-bite-keeper:1.0 .`
- `docker run -p 5000:5000 dai-bite-keeper:1.0`

## TODO

- Use Docker compose
- Find a way to avoid memory leak in when biting many
    - Creating a bite queue could be a solution
- Subscribe to the new block event instead of using a setInterval mock
- Use a log storage to persist important logs
- Add API KEY middleware to avoid unauthorized requests
- Validate input params
- Receive some parameters trough as environment variables
