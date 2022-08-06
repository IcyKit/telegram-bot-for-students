import TelegramBot from 'node-telegram-bot-api'
import { bot, token } from './index.js';

let groups = [
  {
    id: -1001632625918,
    startDate: new Date(2022, 7, 6, 16, 59),
    students: [
      {
        id: 202881121,
        name: 'Icy',
        currentTask: 0,
      },
    ],
  },
];

// groupId - это id чата в телеграм, например 677444
// startDate – это дата начала, пока это строка, например 28.04.2022
export function addGroup(groupId, startDate) {
  // startDate - пока просто строка
  groups.push({
    id: groupId,
    startDate: new Date(startDate).toLocaleDateString('ru-RU'),
    students: [],
  });
}

export function removeGroup(id) {
  groups = groups.filter((gr) => gr.id !== id);
}

// groupId - это id чата в телеграм, например 677444
// studentId - это id студента, например 54
// name – это имя пользователя, например Саша
export function addStudent(groupId, studentId, name) {
  groups.forEach((group) => {
    if (group.id === groupId) {
      group.students.push({
        id: studentId,
        name: name,
        currentTask: 0,
      });
    }
  });
}

export function removeStudent(id) {
  groups.forEach((group) => {
    group.students = group.students.filter((student) => student.id !== id);
  });
}

export function acceptTask(groupId, studentId) {
  let group = groups.find((group) => group.id === groupId);
  let student = group.students.find((student) => student.id === studentId);
  if (student.currentTask < 8) {
    return student.currentTask++;
  } else {
    return 'Курс пройден';
  }
}

export function showStatus(groupId) {
  let group = groups.find((group) => group.id === groupId);
  group.students.forEach((student) => {
    if (student.currentTask !== 8) {
      bot.sendMessage(groupId, `${student.name} - сделал заданий ${student.currentTask}`);
    } else {
      bot.sendMessage(groupId, `${student.name} - поздравляю, курс пройден`);
    }
  });
}

export function notifications(messages, group, stepType) {
  if (stepType === 'minutes') {
    messages.forEach(message => {
      message.goalDate = new Date(group.startDate.getFullYear(), group.startDate.getMonth(), group.startDate.getDate(), group.startDate.getHours(), group.startDate.getMinutes() + message.step).toLocaleString('ru-RU');
    });
  } else if (stepType === 'hours') {
    messages.forEach(message => {
      message.goalDate = new Date(group.startDate.getFullYear(), group.startDate.getMonth(), group.startDate.getDate(), group.startDate.getHours() + message.step, group.startDate.getMinutes()).toLocaleString('ru-RU');
    });
  } else if (stepType === 'days') {
    messages.forEach(message => {
      message.goalDate = new Date(group.startDate.getFullYear(), group.startDate.getMonth(), group.startDate.getDate() + message.step, group.startDate.getHours(), group.startDate.getMinutes()).toLocaleString('ru-RU');
    });
  }

  messages.forEach(message => {
    const intervalID = setInterval(() => {
      let dateNow = new Date().toLocaleString('ru-RU');
      if (dateNow === message.goalDate) {
        bot.sendMessage(group.id, `${message.title} - ${message.link}`);
        clearInterval(intervalID);
      }
    }, 1000)
  });
}

export function getGroups() {
  return groups;
}

export function showGroup() {
  console.log(groups[0]['students']);
}