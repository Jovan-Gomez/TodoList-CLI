require("colors");
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirm,
  showCheckList,
} = require("./helpers/inquirer");
const { saveData, readData } = require("./helpers/handleData");
const Tasks = require("./models/tasks");

console.clear();

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readData();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const description = await readInput("Descripcion:");
        tasks.createTask(description);
        break;
      case "2":
        console.log(tasks.completListTasks());
        break;
      case "3":
        console.log(tasks.taskIsComplet(true));
        break;
      case "4":
        console.log(tasks.taskIsComplet(false));
        break;
      case "5":
        const ids = await showCheckList(tasks.listArr);
        tasks.toggleTasks(ids);
        break;
      case "6":
        const id = await listTasksDelete(tasks.listArr);
        if (id !== "0") {
          const ok = await confirm("Esta seguro de borrar esta tarea?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("Tarea eliminada correctamente");
          }
        }
        break;
      default:
        break;
    }

    saveData(tasks.listArr);
    await pause();
  } while (opt !== "0");
};

main();
