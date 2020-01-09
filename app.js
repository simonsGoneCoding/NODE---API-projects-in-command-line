// http://numbersapi.com/random/year?json

// ---- exercise 1 ----
// const colors = require("colors");
// const fetch = require("node-fetch");

// // process.argv returns all inserted arguments
// // console.log(process.argv);

// const year = process.argv[2] || Math.floor(Math.random() * 2021);
// // console.log("year entered", year);

// fetch(`http://numbersapi.com/${year}/year?json`)
//   .then(response => response.json()) //response.json returns another promise whitch needs to be solved
//   .then(data => console.log(data.text.bgBlue.black))
//   .catch(err => console.log("Opssss!".red.underline.bold, err));

// ---- exercise 2 ----

// `http://numbersapi.com/${number}/${type}?json`
// console.log(process.argv);

const colors = require("colors");
const fetch = require("node-fetch");

const arg = process.argv[2];
let type = "";

if (arg.indexOf("--year") === 0) {
  console.log("searching for year");
  type = "year";
} else if (arg.indexOf("--math") === 0) {
  console.log("searching for number");
  type = "math";
} else if (arg.indexOf("--trivia") === 0) {
  console.log("searching for pieces of information");
  type = "trivia";
}

// console.log(type);

const equalSing = arg.search("=");
// console.log(equalSing); //if no '=' than search method returns -1
if (equalSing === -1) console.log("no number entered");

const number = arg.slice(equalSing + 1) || 1;
// console.log(number);

// if (number === "" || isNaN(Number(number))) {
//   console.log("number missing");
//   process.exit();
// }
fetch(`http://numbersapi.com/${number}/${type}?json`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("something went really wrong! " + response.status);
    }
  })
  .then(response => console.log(response.text))
  .catch(err => console.log("Ops!", err));
