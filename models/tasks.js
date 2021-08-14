const Task = require("./task");
require("colors");
class Tasks {
  _listTasks = {};

  get listArr() {
    let listArr = [];
    Object.keys(this._listTasks).forEach((key) =>
      listArr.push(this._listTasks[key])
    );
    return listArr;
  }

  constructor() {
    this._listTasks = {};
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => (this._listTasks[task.id] = task));
  }

  createTask(description) {
    const task = new Task(description);
    this._listTasks[task.id] = task;
  }

  deleteTask(id = "") {
    if (this._listTasks[id]) {
      delete this._listTasks[id];
    }
  }

  completListTasks() {
    this.listArr.forEach((task, i) => {
      const index = `${i + 1}`.yellow;
      if (task.completIn) {
        console.log(`${index}. ${task.description} :: ` + "Completada".green);
      } else {
        console.log(`${index}. ${task.description} :: ` + " Pendiente".red);
      }
    });
  }

  taskIsComplet(complet = true) {
    this.listArr.forEach((task, i) => {
      const index = `${i + 1}`.yellow;
      if (complet) {
        if (task.completIn) {
          console.log(`${index}. ${task.description} :: ` + "Completada".green);
        }
      } else {
        if (!task.completIn) {
          console.log(`${index}. ${task.description} :: ` + " Pendiente".red);
        }
      }
    });
  }

  toggleTasks(ids = []) {
    ids.forEach((id) => {
      const task = this._listTasks[id];
      if (!task.completIn) {
        task.completIn = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._listTasks[task.id].completIn = null;
      }
    });
  }
}

module.exports = Tasks;
