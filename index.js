import { Courses } from './botOOP.js';
import { notifications } from './notifications.js';
import shedule from './shedule.js';
import TelegramBot from 'node-telegram-bot-api'

const token = 'Your token';
const bot = new TelegramBot(token, { polling: true });
const groupsObj = new Courses;

groupsObj.groups.forEach(group => {
  notifications(shedule, group, 'minutes', bot);
});

bot.on('message', (msg) => {
  if (msg.text === 'Привет') {
    bot.sendMessage(msg.chat.id, 'Привет!' + ' ' + msg.from.id);
  }
});

bot.onText(/\/add_next/, async (msg) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const actualDate = new Date();
  const actualDay = new Date().getDay();

  const addGroupAndNotify = (day) => {
    const goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + day);
    groupsObj.addGroup(msg.chat.id, goalDate);
    bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate.toLocaleDateString('ru-RU')}`);
  }

  switch (days[actualDay]) {
    case 'Monday':
      addGroupAndNotify(0)
      break;
    case 'Tuesday':
      addGroupAndNotify(6)
      break;
    case 'Wednesday':
      addGroupAndNotify(5)
      break;
    case 'Thursday':
      addGroupAndNotify(4)
      break;
    case 'Friday':
      addGroupAndNotify(3)
      break;
    case 'Saturday':
      addGroupAndNotify(2)
      break;
    case 'Sunday':
      addGroupAndNotify(1)
      break;
  }
});

bot.onText(/\/add_afternext/, async (msg) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const actualDate = new Date();
  const actualDay = new Date().getDay();

  const addGroupAndNotify = (day) => {
    const goalDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() + day).toLocaleDateString('ru-RU');
    groupsObj.addGroup(msg.chat.id, goalDate);
    bot.sendMessage(msg.chat.id, `Группа зарегистрирована на ${goalDate}`);
  }

  switch (days[actualDay]) {
    case 'Monday':
      addGroupAndNotify(7)
      break;
    case 'Tuesday':
      addGroupAndNotify(13)
      break;
    case 'Wednesday':
      addGroupAndNotify(12)
      break;
    case 'Thursday':
      addGroupAndNotify(11)
      break;
    case 'Friday':
      addGroupAndNotify(10)
      break;
    case 'Saturday':
      addGroupAndNotify(9)
      break;
    case 'Sunday':
      addGroupAndNotify(8)
      break;
  }
});

bot.onText(/\/show_group/, async (msg) => {
  groupsObj.showGroup();
});

bot.onText(/\/remove/, async (msg) => {
  groupsObj.removeGroup(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Группа удалена');
});

bot.on('message', async (msg) => {
  if (msg.new_chat_members) {
    const addedStudentId = msg.new_chat_members[0].id;
    const addedStudentName = msg.new_chat_members[0].first_name;
    groupsObj.addStudent(msg.chat.id, addedStudentId, addedStudentName);
    bot.sendMessage(msg.chat.id, `Ученик ${addedStudentName} добавлен(-а) в группу`);
  }

  if (msg.left_chat_member) {
    const removedStudentId = msg.left_chat_member.id;
    const removedStudentName = msg.left_chat_member.first_name;
    groupsObj.removeStudent(removedStudentId);
    bot.sendMessage(msg.chat.id, `Ученик ${removedStudentName} удален(-а) из группы`);
  }

  const acceptCommands = ['принимаю', 'Принимаю', 'принято', 'Принято'];
  if (acceptCommands.includes(msg.text)) {
    const studentId = msg.reply_to_message.from.id;
    groupsObj.acceptTask(msg.chat.id, studentId);
    bot.sendMessage(msg.chat.id, groupsObj.showStatus(msg.chat.id, bot))
  }
});