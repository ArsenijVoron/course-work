let fs = require('fs');

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
    if(arr.indexOf('res') == -1)
        throw Error('You must enter the name of the file with results');
    else
    {
        obj['res'] = arr[arr.indexOf('res') + 1];
        if(!obj['res'].includes('.') ) 
            obj['res'] += '.csv';
        else if(obj['res'].substring(obj['res'].indexOf('.') + 1) != 'csv')
            obj['res'] =  obj['res'].substring(0, obj['res'].indexOf('.') + 1) + 'csv';
    }
    if(arr.indexOf('lower') != -1)
        obj['lower'] = true;
    else
        obj['lower'] = false;
    return obj;
}

let ParamObj = toParamObj(process.argv);
console.log(ParamObj);
let cp = require('child_process');
let test, ans, completedtests = 0, res = '';

fs.open(`./results/${ParamObj['res']}`, 'w', (err) =>
{
    if (err) throw err;
});

function checker()
{
    switch(ParamObj['program'].substring(ParamObj['program'].indexOf('.') + 1))
    {
        case 'cpp':
        give = (i) =>
        {
            if (i == 1)
                cp.execSync(`g++ -g ${ParamObj['program']} -o ${ParamObj['program'].substring(0, ParamObj['program'].indexOf('.'))}.exe`);
            test = String(cp.execSync(ParamObj['program'].substring(0, ParamObj['program'].indexOf('.')), {input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])}));
        }
        break;
        case 'js':
        give = (i) => 
        {
            test = String(cp.execSync(`node ${ParamObj['program']}`, {input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])}));
        }
        break;
        case 'py':
        give = (i) => 
        {
            test = String(cp.execSync(`python ${ParamObj['program']}`, {input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])}));
        }
    }
    res = `test,res,completed tests\n`;
    for (i = 1; i <= fs.readdirSync(`./${ParamObj['dir']}`).length; i++)
    {
        try
        {
            give(i);
            ans = String(JSON.parse(fs.readFileSync((`./${ParamObj['dir']}/test${i}.json`), 'utf8'))['answer']);
            if(ParamObj['lower'])
            {
                test = test.toLowerCase();
                ans = ans.toLowerCase();
            }
            if (test.replace(/[\n\r]$/gm, '') == ans)
            {
                completedtests ++;
                console.log(`test ${i} completed :)`);
                res += `${i},completed\n`;
            }
            else
            {
                console.log(`test ${i} failed :(`);
                res += `${i},failed\n`;
            }
        }
        catch
        {
            console.log(`test ${i} failed :(`);
            res += `${i},failed\n`;
        }
    }
    console.log(`You have passed ${completedtests}/${fs.readdirSync(`./${ParamObj['dir']}`).length} tests`);
    res = res.substring(0, res.indexOf('\n', 25)) + `,${completedtests} out of ${fs.readdirSync(`./${ParamObj['dir']}`).length}` + res.substring(res.indexOf('\n', 25))
    fs.writeFile(`./results/${ParamObj['res']}`, res, (err) => {
        if(err) throw err;
    });
}

checker();

