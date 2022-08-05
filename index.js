import {
    addGroup,
    removeGroup,
    addStudent,
    removeStudent,
    acceptTask,
    showStatus,
    notifications
} from './bot.js';

import shedule from './shedule.js';

import TelegramBot from 'node-telegram-bot-api'
const token = '5421280288:AAFi5W4IyLEy2Ez5yaFcOqa_s-VHlfvLIjI';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    if (msg.text === 'Привет') {
        bot.sendMessage(msg.chat.id, 'Привет!')
    }
});

const startDate = new Date(2022, 7, 5, 16, 49);

console.log(notifications(shedule, startDate, 'minutes'));