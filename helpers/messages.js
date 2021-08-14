require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("============================".cyan);
    console.log("    Seleccione una opcion   ".cyan);
    console.log("============================\n".cyan);

    console.log(`${"1.".yellow} Crear tarea`);
    console.log(`${"2.".yellow} Listar tareas`);
    console.log(`${"3.".yellow} Listar tareas completadas`);
    console.log(`${"4.".yellow} Listar tareas pendientes`);
    console.log(`${"5.".yellow} Completar tareas(s)`);
    console.log(`${"6.".yellow} Borrar tarea`);
    console.log(`${"0.".yellow} Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opcion: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Presione ${"ENTER".cyan} para continuar`, () => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
