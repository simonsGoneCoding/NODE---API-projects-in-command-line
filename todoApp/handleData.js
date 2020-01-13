const colors = require("colors");
const fs = require("fs");

const handleData = (type, title) => {
  // type number : 1 - add, 2 - remove, 3 - list
  // title (string || null)
  const data = fs.readFileSync("data.json", "utf8");
  // let data = fs.readFileSync("data.json", "utf8");
  // data = data.toString();
  let tasks = JSON.parse(data);
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
      // rebuild array to aviod errors with id
      tasks = tasks.map((task, index) => ({
        id: index + 1,
        title: task.title
      }));
      const id = tasks.length + 1;
      tasks.push({ id, title });
      // console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      // console.log(dataJOSN);
      fs.writeFileSync("data.json", dataJSON);
      console.log(`Adding task: ${title}`.black.bgGreen);
      break;

    case 2:
      // console.log("removing...");
      const index = tasks.findIndex(task => task.title === title);
      tasks.splice(index, 1);
      // console.log(tasks);
      // rebuidl array to avoid errors with id...
      tasks = tasks.map((task, index) => ({
        id: index + 1,
        title: task.title
      }));
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

module.exports = handleData;
