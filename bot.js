export class Courses {
  constructor() {
    this.groups = [
      {
        id: -1001632625918,
        startDate: new Date(2022, 7, 11, 15, 57),
        students: [
          {
            id: 202881121,
            name: 'Icy',
            currentTask: 0,
          },
        ],
      },
    ];
  }

  addGroup(groupId, startDate) {
    this.groups.push({
      id: groupId,
      startDate: new Date(startDate).toLocaleDateString('ru-RU'),
      students: [],
    });
  }

  removeGroup(id) {
    this.groups = groups.filter((gr) => gr.id !== id);
  }

  addStudent(groupId, studentId, name) {
    this.groups.forEach((group) => {
      if (group.id === groupId) {
        group.students.push({
          id: studentId,
          name: name,
          currentTask: 0,
        });
      }
    });
  }

  removeStudent(id) {
    this.groups.forEach((group) => {
      group.students = group.students.filter((student) => {
        student.id !== id
      });
    });
  }

  acceptTask(groupId, studentId) {
    const group = this.groups.find((group) => {
      return group.id === groupId
    });
    const student = group.students.find((student) => {
      return student.id === studentId
    });
    if (student.currentTask < 8) {
      return student.currentTask++;
    } else {
      return 'Курс пройден';
    }
  }

  showStatus(groupId, bot) {
    const group = this.groups.find((group) => {
      return group.id === groupId
    });
    group.students.forEach((student) => {
      if (student.currentTask !== 8) {
        bot.sendMessage(groupId, `${student.name} - сделал заданий ${student.currentTask}`);
      } else {
        bot.sendMessage(groupId, `${student.name} - поздравляю, курс пройден`);
      }
    });
  }

  showGroup() {
    console.log(this.groups);
  }
}