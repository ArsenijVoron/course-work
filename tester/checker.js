let fs = require('fs');
let check = require('./checkhelper').checkhelper;
let time = 0;
function toParamObj(arr) 
{
    let obj = {};
    if(!arr.includes('program'))
        throw Error('You must enter the name of the testing file');
    else
        obj['program'] = arr[arr.indexOf('program') + 1];
    if(arr.includes('len'))
        obj['len'] = Number(arr[arr.indexOf('len') + 1]);
    if(!arr.includes('tests'))
        throw Error('You must enter the name of the dir with tests');
    else
        obj['tests'] = arr[arr.indexOf('tests') + 1];
    if(!arr.includes('res'))
        throw Error('You must enter the name of the file with results');
    else
    {
        obj['res'] = arr[arr.indexOf('res') + 1];
        if(!obj['res'].includes('.')) 
            obj['res'] += '.html';
        else if(obj['res'].substring(obj['res'].indexOf('.') + 1) != 'html')
            obj['res'] = obj['res'].substring(0, obj['res'].indexOf('.') + 1) + 'html';
    }
    obj['lower'] = !arr.includes('lower') ? false : true;
    if(!arr.includes('time'))
        throw Error('You must enter the timelimit (in ms) per 1 test');
    else
        obj['time'] = Number(arr[arr.indexOf('time') + 1]);
    obj['length'] = arr.indexOf('length') == -1 ? false : Number(arr[arr.indexOf('length') + 1]);
    if(!arr.includes('answers'))
        throw Error('You must enter the name of the dir with answers');
    else
        obj['answers'] = arr[arr.indexOf('answers') + 1];
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
fs.writeFileSync(`./results/${ParamObj['res']}`, '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<body>\n<style>\n.table{\nwidth: 40%;\nborder-collapse: collapse;\nfont-family: Arial;\nfont-weight: 700;\ntext-align: center;\n}\n.table td{\npadding: 5px;\nbackground: #efefef;\nborder: 1px solid #dddddd;\n}\n.h{\ncolor: #696969;\n}\n.c{\ncolor: #32CD32\n}\n.f{\ncolor: red;\n}\n</style>\n<table class = "table">\n<tr class = "h">\n<td>\ntest\n</td>\n<td>\nres\n</td>\n<td>\ntime (ms)\n</td>\n</tr>\n');

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
            cp.execSync(`${ParamObj['program'].substring(0, ParamObj['program'].indexOf('.'))} < ./${ParamObj['tests']}/test${i}.txt > ./results/answers/answer${i}.txt`, {timeout: ParamObj['time']});
            time = new Date().getTime() - a;
        }
        break;
        case 'js':
        give = (i) => 
        {
            a = new Date().getTime();
            cp.execSync(`node ${ParamObj['program']} < ./${ParamObj['tests']}/test${i}.txt > ./results/answers/answer${i}.txt`, {timeout: ParamObj['time']});
            time = new Date().getTime() - a;
        }
        break;
        case 'py':
        give = (i) => 
        {
            a = new Date().getTime();
            test = String(cp.execSync(`python ${ParamObj['program']} < ./${ParamObj['tests']}/test${i}.txt > ./results/answers/answer${i}.txt`, {timeout: ParamObj['time']}));
            time = new Date().getTime() - a;
        }
    }
    for (let i = 1; i <= fs.readdirSync(`./${ParamObj['tests']}`).length; i++)
    {
        try 
        {
            give(i);
            test = fs.readFileSync(`./results/answers/answer${i}.txt`, 'utf-8');
            ans = fs.readFileSync(`./${ParamObj['answers']}/answer${i}.txt`, 'utf-8');
            if (check(test, ans, ParamObj)) 
            {
                completedtests ++;
                console.log(`test ${i} completed :) in ${time} ms`);
                fs.appendFileSync(`./results/${ParamObj['res']}`, `<tr>\n<td>\n${i}\n</td>\n<td class = "c">\ncompleted\n</td>\n<td>\n${time}\n</td>\n</tr>\n`);
            }
            else
            {
                console.log(`test ${i} failed :(`);
                fs.appendFileSync(`./results/${ParamObj['res']}`, `<tr>\n<td>\n${i}\n</td>\n<td class = "f">\nfailed\n</td>\n<td>\n${time}\n</td>\n</tr>\n`);
            }
        }
        catch
        {
            console.log(`test ${i} failed :(`);
            fs.appendFileSync(`./results/${ParamObj['res']}`, `<tr>\n<td>\n${i}\n</td>\n<td class = "f">\nfailed\n</td>\n<td\n${time}\n</td>\n</tr>\n`);
        }
    }
    fs.appendFileSync(`./results/${ParamObj['res']}`, `<tr>\n<td colspan="3" class = "h">\ncompleted tests : ${completedtests}/${fs.readdirSync(`./${ParamObj['tests']}`).length}\n</td>\n</tr>\n</table>\n</head>\n</html>`);
    console.log(`You have passed ${completedtests}/${fs.readdirSync(`./${ParamObj['tests']}`).length} tests`);
}
checker();

