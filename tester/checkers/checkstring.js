function checkhelper (test, answer, ParamObj)
{
    [test, answer] = [String(test).replace(/[\n\r]$/gm, ''), String(answer).replace(/[\n\r]$/gm, '')];
    if(ParamObj['lower'])
        [test, answer] = [test.toLowerCase(), answer.toLowerCase()];
    if(ParamObj['length'])
        [test, answer] = [test.substring(0, ParamObj['length']), answer.substring(0, ParamObj['length'])];
    return test == answer;
}

module.exports = {checkhelper};