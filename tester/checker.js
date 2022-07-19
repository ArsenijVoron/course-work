let fs = require('fs');
let ParamObj = toParamObj(process.argv);
let cp = require('child_process');
let test, ans, completedtests = 0;
function checker()
{
    switch(ParamObj['program'].substring(ParamObj['program'].indexOf('.') + 1))
    {
        case 'cpp':
        give = (i) =>
        {
            if (i == 1)
                cp.execSync(`g++ -g ${ParamObj['program']} -o ${ParamObj['program'].substring(0, ParamObj['program'].indexOf('.'))}.exe`);
            test = cp.execSync(ParamObj['program'].substring(0, ParamObj['program'].indexOf('.')), {input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])});
        }
        break;
        case 'js':
        give = (i) => 
        {
            test = cp.execSync(`node ${ParamObj['program']}`, {input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])});
        }
        break;
        case 'py':
        give = (i) => 
        {
            test = cp.execSync(`python ${ParamObj['program']}`, {input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])});
        }
    }
    for (i = 1; i <= fs.readdirSync(`./${ParamObj['dir']}`).length; i++)
    {
        try
        {
            give(i);
            ans = JSON.parse(fs.readFileSync((`./${ParamObj['dir']}/test${i}.json`), 'utf8'))['answer'];
            if (String(test).replace(/[\n\r]$/gm, '') == String(ans))
            {
                completedtests ++;
                console.log(`test ${i} completed :)`);
            }
            else
                console.log(`test ${i} failed :(`);
        }
        catch
        {
            console.log(`test ${i} failed :(`);
        }
    }
    console.log(`You have passed ${completedtests}/${fs.readdirSync('./tests').length} tests`);
}


function toParamObj(arr) 
{
    let obj = {};
    if(arr.indexOf('program') == -1)
        throw Error('You must enter the name of the testing file');
    else
        obj['program'] = arr[arr.indexOf('program') + 1];
    if(arr.indexOf('len') != -1)
        obj['len'] = Number(arr[arr.indexOf('len') + 1]);
    if(arr.indexOf('dir') == -1)
        throw Error('You must enter the name of the dir with tests');
    else
        obj['dir'] = arr[arr.indexOf('dir') + 1];
    return obj;
}

checker();
