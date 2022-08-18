export function notifications(messages, group, stepType, bot) {
  const startDate = {
    year: group.startDate.getFullYear(),
    month: group.startDate.getMonth(),
    date: group.startDate.getDate(),
    hours: group.startDate.getHours(),
    minutes: group.startDate.getMinutes(),
  }
  
  if (stepType === 'minutes') {
    messages.forEach(message => {
      message.goalDate = new Date(startDate.year, startDate.month, startDate.date, startDate.hours, startDate.minutes + message.step).toLocaleString('ru-RU');
    });
  } else if (stepType === 'hours') {
    messages.forEach(message => {
      message.goalDate = new Date(startDate.year, startDate.month, startDate.date, startDate.hours + message.step, startDate.minutes).toLocaleString('ru-RU');
    });
  } else if (stepType === 'days') {
    messages.forEach(message => {
      message.goalDate = new Date(startDate.year, startDate.month, startDate.date + message.step, startDate.hours, startDate.minutes).toLocaleString('ru-RU');
    });
  }

  messages.forEach(message => {
    const intervalID = setInterval(() => {
      const dateNow = new Date().toLocaleString('ru-RU');
      if (dateNow === message.goalDate) {
        bot.sendMessage(group.id, `${message.title} - ${message.link}`);
        clearInterval(intervalID);
      }
    }, 1000)
  });
}