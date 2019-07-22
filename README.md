# MakerDao Bite Keeper

A simple MakerDao bite keeper to bite unsafe positions

## Requirements

- Depends on dai.js
- It needs an etherium node. You can use infura or even 
- Needs a private key to sign transactions. You can use MetaMask

## Usage

- `npm i`
- `npm start`
- POST /bite-keeper/start
- POST /bite-keeper/stop
- GET /bite-keeper/status

## TODO

- Find a way to avoid memory leak in when biting many
- Subscribe to the new block event instead of using a setInterval mock
- Use a log storage to persist important logs
- Add API KEY middleware to avoid unauthorized requests
- Validate input params
- Receive some parameters trough as environment variables