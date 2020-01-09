// http://numbersapi.com/random/year?json
const colors = require("colors");
const fetch = require("node-fetch");

// process.argv returns all inserted arguments
// console.log(process.argv);

const year = process.argv[2] || Math.floor(Math.random() * 2021);
// console.log("year entered", year);

fetch(`http://numbersapi.com/${year}/year?json`)
  .then(response => response.json()) //response.json returns another promise whitch needs to be solved
  .then(data => console.log(data.text.bgBlue.black))
  .catch(err => console.log("Opssss!".red.underline.bold, err));
