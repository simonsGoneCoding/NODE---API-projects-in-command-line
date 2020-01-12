// console.log(process.argv.slice(2, 3));
const parseArgs = require("minimist");
const colors = require("colors");
const fs = require("fs");

const command = parseArgs(process.argv.slice(2, 3));
delete command._;
// console.log(command);

const handleCommand = ({ add, remove, list }) => {
  // console.log(add, remove, list);
  if (add) {
    if (typeof add !== "string") {
      return console.log("string must be provided ".red.bold);
    } else if (add.length < 7) {
      console.log("minimum 6 characters".red);
    }
    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log(
        "enter exact name of the task you want to remove (at least 6 characters)"
          .red
      );
    }
    handleData(2, remove);
  } else if (list || list === "") {
    // console.log("printing out...");
    handleData(3, null);
  } else {
    console.log(
      "Command not recognized, use --add='task name', --remove='task name' or option --list"
    );
  }
};

const handleData = (type, title) => {
  // type number : 1 - add, 2 - remove, 3 - list
  // title (string || null)
  const data = fs.readFileSync("data.json", "utf8");
  // let data = fs.readFileSync("data.json", "utf8");
  // data = data.toString();
  const tasks = JSON.parse(data);
  // console.log(tasks);
  let doesExist = "";

  if (type === 1 || type === 2) {
    doesExist = tasks.find(task => task.title === title) ? true : false;
    if (type === 1 && doesExist) {
      return console.log("Can't do it... task already on the list");
    } else if (type === 2 && !doesExist) {
      return console.log("Can't remove... task not found");
    }
  }

  let dataJSON = "";
  switch (type) {
    case 1:
      console.log("adding...");
      const id = tasks.length + 1;
      tasks.push({ id, title });
      // console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      // console.log(dataJOSN);
      fs.writeFileSync("data.json", dataJSON);
      console.log(`Adding task: ${title}`.black.bgGreen);
      break;

    case 2:
      console.log("removing...");
      const index = tasks.findIndex(task => task.title === title);
      tasks.splice(index, 1);
      console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      fs.writeFile("data.json", dataJSON, "utf8", err => {
        if (err) throw err;
        console.log(`Task ${title} has just been removed... `.black.bgGreen);
      });
      break;

    case 3:
      console.log("printing list... ");
      if (tasks.length) {
        tasks.forEach((task, index) => {
          if (index % 2) return console.log(task.title.green);
          return console.log(task.title.yellow);
        });
      }
      break;
  }
};

handleCommand(command);
