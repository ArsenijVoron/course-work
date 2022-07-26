function checkhelper (a, b, ParamObj)
{
    [a, b] = [String(a).replace(/[\n\r]$/gm, ''), String(b)];
    if(ParamObj['lower'] === true)
        [a, b] = [a.toLowerCase(), b.toLowerCase()];
    if(ParamObj['length'])
        [a, b] = [a.substring(0, ParamObj['length']), b.substring(0, ParamObj['length'])];
    return a == b;
}

module.exports = {checkhelper};