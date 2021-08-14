const { v4: uuidv4 } = require("uuid");

class Task {
  id = "";
  description = "";
  completIn = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
    this.completIn = null;
  }
}

module.exports = Task;
