const colors = require("colors");
const handleData = require("./handleData");

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

module.exports = handleCommand;
