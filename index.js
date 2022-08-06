import {
    addGroup,
    removeGroup,
    addStudent,
    removeStudent,
    acceptTask,
    showStatus,
    notifications,
    getGroups,
    showGroup
} from './bot.js';

import shedule from './shedule.js';

import TelegramBot from 'node-telegram-bot-api'
export const token = '5421280288:AAFi5W4IyLEy2Ez5yaFcOqa_s-VHlfvLIjI';
export const bot = new TelegramBot(token, {polling: true});

const groups = getGroups();

groups.forEach(group => {
    notifications(shedule, group, 'minutes');
});

bot.on('message', (msg) => {
    if (msg.text === 'Привет') {
        bot.sendMessage(msg.chat.id, 'Привет!' + ' ' + msg.from.id);
    }
});

bot.onText(/\/add_next/, async (msg) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let actualDate = new Date();
    let actualDay = new Date().getDay();
    let goalDate;
    switch (days[actualDay]) {
        case 'Monday':
            addGroup(msg.chat.id, actualDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${actualDate}`);
            break;
        case 'Tuesday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 6).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Wednesday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 5).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Thursday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 4).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Friday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 3).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Saturday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 2).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Sunday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 1).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
    }
});

bot.onText(/\/add_afternext/, async (msg) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let actualDate = new Date();
    let actualDay = new Date().getDay();
    let goalDate;
    switch (days[actualDay]) {
        case 'Monday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 7).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Tuesday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 13).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Wednesday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 12).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Thursday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 11).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Friday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 10).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Saturday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 9).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
        case 'Sunday':
            goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + 8).toLocaleDateString('ru-RU');
            addGroup(msg.chat.id, goalDate);
            bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
            break;
    }
});

bot.onText(/\/show_group/, async (msg) => {
    showGroup();
});

bot.onText(/\/remove/, async (msg) => {
    removeGroup(msg.chat.id);
    bot.sendMessage(msg.chat.id, 'Группа удалена');
});

bot.on('message', async (msg) => {
    if (msg.new_chat_members) {
        let addedStudentId = msg.new_chat_members[0].id;
        let addedStudentName = msg.new_chat_members[0].first_name;
        addStudent(msg.chat.id, addedStudentId, addedStudentName);
        bot.sendMessage(msg.chat.id, `Ученик ${addedStudentName} добавлен(-а) в группу`);
    }

    if (msg.left_chat_member) {
        let removedStudentId = msg.left_chat_member.id;
        let removedStudentName = msg.left_chat_member.first_name;
        removeStudent(removedStudentId);
        bot.sendMessage(msg.chat.id, `Ученик ${removedStudentName} удален(-а) из группы`);
    }

    if (msg.text === 'принимаю' || msg.text === 'принято' || msg.text === 'Принимаю' || msg.text === 'Принято') {
        const studentId = msg.reply_to_message.from.id;
        acceptTask(msg.chat.id, studentId);
        bot.sendMessage(msg.chat.id, showStatus(msg.chat.id))
    }
});