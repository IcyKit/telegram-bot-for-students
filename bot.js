import shedule from "./shedule.js";

let groups = [
  {
    id: 677444,
    startDate: '28.04.22',
    students: [
      {
        id: 54,
        name: 'Саша',
        currentTask: 0,
      },
      {
        id: 18,
        name: 'Никита',
        currentTask: 7,
      },
      {
        id: 23,
        name: 'Иван',
        currentTask: 3,
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
    startDate: new Date(startDate).toLocaleDateString(),
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
      console.log(`${student.name} - сделал заданий ${student.currentTask}`);
    } else {
      console.log(`${student.name} - поздравляю, курс пройден`);
    }
  });
}

export function notifications(messages, startDate, stepType) {
  if (stepType === 'minutes') {
    messages.forEach(message => {
      message.goalDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes() + message.step).toLocaleString('ru-RU');
    });
  } else if (stepType === 'hours') {
    messages.forEach(message => {
      message.goalDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + message.step, startDate.getMinutes()).toLocaleString('ru-RU');
    });
  } else if (stepType === 'days') {
    messages.forEach(message => {
      message.goalDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + message.step, startDate.getHours(), startDate.getMinutes()).toLocaleString('ru-RU');
    });
  }

  messages.forEach(message => {
    const intervalID = setInterval(() => {
      let dateNow = new Date().toLocaleString('ru-RU');
      if (dateNow === message.goalDate) {
        console.log(`${message.title} - ${message.link}`);
        clearInterval(intervalID);
      }
    }, 1000)
  });
}