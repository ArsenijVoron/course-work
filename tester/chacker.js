let fs = require('fs');
let f = require('./program').getsSquares;

let checker = (func) =>
{
    for(let i = 1; i <= fs.readdirSync('./tests').length; i++)
        console.log(func(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test']) === JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['answer'] ? `test ${i} completed :)` : `test ${i} don't completed :(`);
}

checker(f);




