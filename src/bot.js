const Discord = require('discord.js');
const auth = require('../auth.json');
const state = require('./state');
const setupLogger = require('./utils/logger');
const processor = require('./messageProcessor');
const logger = setupLogger(auth.dev);
state.getState().logger = logger;

// Initialize Discord Bot
const bot = new Discord.Client();
state.getState().bot = bot;
bot.login(auth.token);
bot.on('ready', function (_evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.tag);
});
bot.on('message', processor.processMessage.bind(processor));