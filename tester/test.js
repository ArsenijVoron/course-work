//to install prompt-and-alert : npm install prompt-and-alert@2.1.0;
let prompt = require('prompt-and-alert').prompt;
let square = a => a**2;
console.log(square(Number(prompt())));
