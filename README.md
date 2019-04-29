# BA Bot

A discord but to run BA Duels between two players over discord

## Installation

1. Copy the `auth.json.copy` file to `auth.json`
2. `npm install` at root.
3. `npm start` if in development, `pm2 start src/bot.js` if in prod.

## Dev

`npm test` to run tests.

To add a new command, it needs to be added to `commands.js`, to a file in the `commands` folder, and to the appropriate duelstates allowed array.