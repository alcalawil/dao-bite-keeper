# MakerDao Bite Keeper

A simple MakerDao bite keeper to bite unsafe positions

### Requirements

- Depends on dai.js
- It needs an etherium node. You can use infura
- Needs a private key to sign transactions. You can use MetaMask
- You can find environment variables names in src/config.js

### Usage

- `npm i`
- `npm start`
- POST /bite-keeper/start
- POST /bite-keeper/stop
- GET /bite-keeper/status

### Use with Docker

- `docker build -t bite-keeper:1.0 .`
- `docker run --env-file ./.env -p 5000:5000 bite-keeper:1.0`

### TODO

- Find a way to avoid memory leak when biting many cdps
    - Creating a bite queue could be a solution
- Use a log storage to persist important logs
- Add API KEY middleware to avoid unauthorized requests
- Validate input params
- Receive some params as environment variables
