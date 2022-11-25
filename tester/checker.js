/* запуск основного чекера:
    node .\checker.js 
    если проверка типа функция (тело функции - ученика, обложка - 
    учителя(создатедя задачи)), то надо написать function, при этом условии должны быть свойства (параметры): body - файл с телом функции,
    head - название файла с оболочкой функции(его разширение должно соответствовать сзыку, на котором написана оболочка),
    func_file - название файла (путь), который она создаст, будет записывать результат (тело + оболочка) и проверять, создателю задачи
    надо будет вставить метку <<+8+>>, эта метка ориентирует программу, куда надо вставить тело.
    ----------------------------------------------------------------------------------------------------------------------
    если тип проверки - программа (просто файл с кодом, который будет проверятся), то надо указать:
    program - название(путь к файлу), что будет тестироваться.
    ----------------------------------------------------------------------------------------------------------------------
    ко всем типам проверки так же потребуется написать: tests - папка с тестами, res - название файла с результатами (html)
    (файл, куда будет записываться результат тестов, в данном случае - html-таблица).
    time - таймлимит (в ms) для одного теста, answers - папка с ответами, check + (int || float || string) - соответственно для проверки того или иного типа данных
    из необязательных параметров: написать просто lower - текст будет проверяться в нижнем регистре,
    length - количество первых символов, которые будут входить в проверку.
    ----------------------------------------------------------------------------------------------------------------------
    примеры: node .\checker.js head head.js tests tests answers answers res answer2 time 1000 check int function f body body.txt func_file res
    в данном случае: обложка - head.js, папка с тестами - tests, с ответами - answers, файл с html-таблицей - answer2.html, лимит по времени - 1000мс,
    проверка типов int (целочисленных), тип проверки - функция, название проверяемой функции - f, тело функции - body.txt, резуоттат "сбора" тела и оболочки - res.js
    node .\checker.js tests tests answers answers res example time 10000 check string program test.js lower
    папка с тестами - tests, с ответами - answers, html-таблица - example.html, лимит по времени для одного теста - 10000мс,
    проверка строк, проверяющийся файл (программа), проверять без учета регистра (в нижнем)
*/
const fs = require('fs'),
      cp = require('child_process');
let time = 0;

function toParamObj(arr) //превращает process.argv в уодбный для использования обьект
{
    let obj = {};
    obj['func'] = false;
    if(arr.includes('function')) //чекер, при котором программа вписывает тело функции, написаное пользователем к обложке, написаной автором задачи
    {
        obj['func'] = true;
        if(!arr.includes('body')) // имя файла (с расширением, путь) где хранится тело функции
            throw Error('You should enter the name of the file with body of funciton');
        else
            obj['body'] = arr[arr.indexOf('body') + 1];
        if(arr.includes('head')) // файл (путь), где хранится шапка функции (оболочка)
            obj['head'] = arr[arr.indexOf('head') + 1];
        else
            throw Error('You should enter the name of the file with head of funciton');
        obj['extension'] = obj['head'].substring(obj['head'].indexOf('.') + 1); //разширение body-function-файла
        if(arr.includes('func_file'))// файл (путь), где хранится полная функция
        {
            obj['func_file'] = arr[arr.indexOf('func_file') + 1];
            if(!obj['func_file'].includes('.'))
            {
                obj['func_file'] = obj['func_file'] + '.' + obj['extension'];
            }
        }    
        else
            throw Error('file with the correct function being checked');
    }
    else
    {
        obj['func'] = false;
        if(!arr.includes('program')) //тестируемый файл
            throw Error('You should enter the name of the testing file');
        else
            obj['program'] = arr[arr.indexOf('program') + 1];
    }
    if(!arr.includes('tests'))//папка с тестами
        throw Error('You should enter the name of the dir with tests');
    else
        obj['tests'] = arr[arr.indexOf('tests') + 1];
    if(!arr.includes('res'))//название файла с результатами (html)
        throw Error('You should enter the name of the file with results');
    else
    {
        obj['res'] = arr[arr.indexOf('res') + 1];//проверка/добовление разширения для файла
        if(!obj['res'].includes('.')) 
            obj['res'] += '.html';
        else if(obj['res'].substring(obj['res'].indexOf('.') + 1) != 'html')
            obj['res'] = obj['res'].substring(0, obj['res'].indexOf('.') + 1) + 'html';
    }
    obj['lower'] = !arr.includes('lower') ? false : true; //нижний регистр
    if(!arr.includes('time'))//лимит по времени для одного теста 
        throw Error('You should enter the timelimit (in ms) per 1 test');
    else
        obj['time'] = Number(arr[arr.indexOf('time') + 1]);
        //обрезание текста (если надо)
    obj['length'] = arr.indexOf('length') == -1 ? false : Number(arr[arr.indexOf('length') + 1]);
    if(!arr.includes('answers'))//папка с ответами
        throw Error('You should enter the name of the dir with answers');
    else
        obj['answers'] = arr[arr.indexOf('answers') + 1];
    if(!arr.includes('check'))//тип чекера
        throw Error('You should enter type of checker');
    else
        obj['check'] = arr[arr.indexOf('check') + 1].toLowerCase();
    return obj;
}

const ParamObj = toParamObj(process.argv),
      check = require(`./checkers/check${ParamObj['check']}.js`).checkhelper; //функция проверки (checkint, checkfloat...)

console.log(ParamObj);

if(ParamObj['func']) //если тип проверки "функция"
{
    fs.open(ParamObj['head'], 'r', (err) =>
    {
        if (err) throw err;
    });
    fs.open(ParamObj['body'], 'r', (err) =>
    {
        if (err) throw err;
    });
    fs.open(ParamObj['func_file'], 'w', (err) =>
    {
        if (err) throw err;
    });
    const body = String(fs.readFileSync(ParamObj['body'])); //"вытаскиваю тело функции"
    let func = String(fs.readFileSync(ParamObj['head']));//"вытаскиваю оболочку функции"
    func = func.replace('<<+8+>>', body); //вставка тела функции в оболочку
    fs.writeFileSync(ParamObj['func_file'], func); //запись результата в файл
    ParamObj['program'] = ParamObj['func_file'] // для тестировки полученного файла (с функцией)
}

let test, ans, completedtests = 0;

fs.open(`./results/${ParamObj['res']}`, 'w', (err) =>
{
    if (err) throw err;
}); //файл для записи данных про тестирование в html таблицу. HTML код таблицы - переменная htmlcode
let htmlcode = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<body>\n<style>\n.table{\nwidth: 40%;\nborder-collapse: collapse;\nfont-family: Arial;\nfont-weight: 700;\ntext-align: center;\n}\n.table td{\npadding: 5px;\nbackground: #efefef;\nborder: 1px solid #dddddd;\n}\n.h{\ncolor: #696969;\n}\n.c{\ncolor: #32CD32\n}\n.f{\ncolor: red;\n}\n</style>\n<table class = "table">\n<tr class = "h">\n<td>\ntest\n</td>\n<td>\nres\n</td>\n<td>\ntime (ms)\n</td>\n</tr>\n';
function checker() //главная функция тестировки
{
    switch(ParamObj['program'].substring(ParamObj['program'].indexOf('.') + 1)) //тестирование разных языков программирования
    {
        case 'cpp': //c++
        give = (i) =>
        {
            if (i == 1)
                cp.execSync(`g++ -g ${ParamObj['program']} -o ${ParamObj['program'].substring(0, ParamObj['program'].indexOf('.'))}.exe`);
            a = new Date().getTime();
            cp.execSync(`${ParamObj['program'].substring(0, ParamObj['program'].indexOf('.'))} < ./${ParamObj['tests']}/test${i}.txt > ./results/answers/answer${i}.txt`, {timeout: ParamObj['time']});
            time = new Date().getTime() - a;
        }
        break;
        case 'js': //javascript
        give = (i) => 
        {
            a = new Date().getTime();
            cp.execSync(`node ${ParamObj['program']} < ./${ParamObj['tests']}/test${i}.txt > ./results/answers/answer${i}.txt`, {timeout: ParamObj['time']});
            time = new Date().getTime() - a;
        }
        break;
        case 'py': //python
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
            if (check(test, ans, ParamObj)) //вызов чекера
            {
                completedtests ++;
                console.log(`test ${i} completed :) in ${time} ms`);
                htmlcode += `<tr>\n<td>\n${i}\n</td>\n<td class = "c">\ncompleted\n</td>\n<td>\n${time}\n</td>\n</tr>\n`;
            }
            else
            {
                console.log(`test ${i} failed :(`);
                htmlcode += `<tr>\n<td>\n${i}\n</td>\n<td class = "f">\nfailed\n</td>\n<td>\n${time}\n</td>\n</tr>\n`;
            }
        }
        catch
        {
            console.log(`test ${i} failed :( (error)`);
            htmlcode += `<tr>\n<td>\n${i}\n</td>\n<td class = "f">\nfailed\n</td>\n<td\n${time}\n</td>\n</tr>\n`;
        }
    }
    htmlcode += `<tr>\n<td colspan="3" class = "h">\ncompleted tests : ${completedtests}/${fs.readdirSync(`./${ParamObj['tests']}`).length}\n</td>\n</tr>\n</table>\n</head>\n</html>`;
    fs.writeFileSync(`./results/${ParamObj['res']}`, htmlcode); //запись в html файл кода таблицы
    console.log(`You have passed ${completedtests}/${fs.readdirSync(`./${ParamObj['tests']}`).length} tests`);
}
checker();

