function checkhelper (test, answer, ParamObj)
{
    [test, answer] = [Number(String(test).replace(/[\n\r]$/gm, '')), Number(String(answer).replace(/[\n\r]$/gm, ''))];
    return test == answer;

}

module.exports = {checkhelper};