const inquirer = require("inquirer");
const Task = require("../models/task");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "Selecciona una opcion",
    choices: [
      {
        value: "1",
        name: `${"1.".yellow} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".yellow} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".yellow} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".yellow} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".yellow} Completar tareas(s)`,
      },
      {
        value: "6",
        name: `${"6.".yellow} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"7.".yellow} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("============================".cyan);
  console.log("    Seleccione una opcion   ".white);
  console.log("============================\n".cyan);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "exit",
      message: `Presione ${"ENTER".cyan} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese una descripcion";
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

const listTasksDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.yellow;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${"0.".yellow} Cancelar`,
  });
  const questions = {
    type: "list",
    name: "id",
    message: "Borrar Tarea",
    choices,
  };
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = {
    type: "confirm",
    name: "ok",
    message,
  };

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.yellow;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completIn ? true : false,
    };
  });

  const question = {
    type: "checkbox",
    name: "ids",
    message: "Tareas Seleccionadas",
    choices,
  };
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirm,
  showCheckList,
};
