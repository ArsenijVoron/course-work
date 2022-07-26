let fs = require('fs');
let check = require('./checkhelper').checkhelper;
let time = 0;
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
            obj['res'] += '.html';
        else if(obj['res'].substring(obj['res'].indexOf('.') + 1) != 'csv')
            obj['res'] =  obj['res'].substring(0, obj['res'].indexOf('.') + 1) + 'csv';
    }
    obj['lower'] = arr.indexOf('lower') == -1 ? false : true;
    if(arr.indexOf('time') == -1)
        throw Error('You must enter the timelimit (in ms) per 1 test');
    else
        obj['time'] = Number(arr[arr.indexOf('time') + 1]);
    obj['length'] = arr.indexOf('length') == -1 ? false : Number(arr[arr.indexOf('length') + 1]);
    return obj;
}

let ParamObj = toParamObj(process.argv);
console.log(ParamObj);
let cp = require('child_process');
let test, ans, completedtests = 0;

fs.open(`./results/${ParamObj['res']}`, 'w', (err) =>
{
    if (err) throw err;
});
fs.writeFileSync(`./results/${ParamObj['res']}`, '<!DOCTYPE html><html><head><meta charset="utf-8"><body><style> font{font-family: Arial;} .table {width: 40%; border-collapse: collapse; } .table th {padding: 5px; background: #efefef; border: 1px solid #dddddd;}</style><table class = "table"><tr><th><font color = #696969>test</font></th><th><font color = #696969>res</font></th><th><font color = #696969>time (ms)</font></th>');

function checker()
{
    switch(ParamObj['program'].substring(ParamObj['program'].indexOf('.') + 1))
    {
        case 'cpp':
        give = (i) =>
        {
            if (i == 1)
                cp.execSync(`g++ -g ${ParamObj['program']} -o ${ParamObj['program'].substring(0, ParamObj['program'].indexOf('.'))}.exe`);
            a = new Date().getTime();
            test = String(cp.execSync(ParamObj['program'].substring(0, ParamObj['program'].indexOf('.')), {timeout: ParamObj['time'], input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])}));
            time = new Date().getTime() - a;
        }
        break;
        case 'js':
        give = (i) => 
        {
            a = new Date().getTime();
            test = String(cp.execSync(`node ${ParamObj['program']}`, {timeout: ParamObj['time'], input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])}));
            time = new Date().getTime() - a;
        }
        break;
        case 'py':
        give = (i) => 
        {
            a = new Date().getTime();
            test = String(cp.execSync(`python ${ParamObj['program']}`, {timeout: ParamObj['time'], input: String(JSON.parse(fs.readFileSync((`./tests/test${i}.json`), 'utf8'))['test'])}));
            time = new Date().getTime() - a;
        }
    }
    for (let i = 1; i <= fs.readdirSync(`./${ParamObj['dir']}`).length; i++)
    {
        try
        {
            give(i);
            ans = String(JSON.parse(fs.readFileSync((`./${ParamObj['dir']}/test${i}.json`), 'utf8'))['answer']);
            if (check(test, ans, ParamObj))
            {
                completedtests ++;
                console.log(`test ${i} completed :) in ${time} ms`);
                fs.appendFileSync(`./results/${ParamObj['res']}`, `<tr><th><font color = 'black'>${i}</font></th><th><font color = #32CD32>completed</font></th><th><font color = 'black'>${time}</font></th></tr>`);
            }
            else
            {
                console.log(`test ${i} failed :(`);
                fs.appendFileSync(`./results/${ParamObj['res']}`, `<tr><th><font color = 'black'>${i}</font></th><th><font color = 'red'>failed</font></th><th><font color = 'black'>${time}</font></th></tr>`);
            }
        }
        catch
        {
            console.log(`test ${i} failed :(`);
            fs.appendFileSync(`./results/${ParamObj['res']}`, `<tr><th><font color = 'black'>${i}</font></th><th><font color = 'red'>failed</font></th><th><font color = 'black'>${time}</font></th></tr>`);
        }
    }
    fs.appendFileSync(`./results/${ParamObj['res']}`, `<tr><th colspan="3"><font color = #696969>completed tests : </font><font color = 'black'>${completedtests}/${fs.readdirSync(`./${ParamObj['dir']}`).length}</font></th></tr></table></head></html>`);
    console.log(`You have passed ${completedtests}/${fs.readdirSync(`./${ParamObj['dir']}`).length} tests`);
}

checker();

