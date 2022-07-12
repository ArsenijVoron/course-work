//node .\checker.js --program getSquares
// to install optimist: npm i optimist 
let fs = require('fs');
let opt  = require('optimist').argv;
let f = require('./program')[opt['program']];
function checker (func)
{
    let completedtests = 0;
    for (let i = 1; i <= fs.readdirSync('./tests').length; i++)
    {
        if (func(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test']) === JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['answer'])
        {
            completedtests ++;
            console.log(`test ${i} completed :)`);
        }
        else
            console.log(`test ${i} failed :(`);
    }
    console.log(`You have passed ${completedtests}/${fs.readdirSync('./tests').length} tests`);
}

checker(f);
