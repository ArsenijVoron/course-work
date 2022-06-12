let fs = require('fs');
let f = require('./program').getsSquares;

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
        { 
            console.log(`test ${i} don't completed :(`);
        }
    }
    console.log(`You have completed ${completedtests}/${fs.readdirSync('./tests').length} tests`)
}

checker(f);
