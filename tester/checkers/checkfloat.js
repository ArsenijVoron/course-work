function checkhelper (test, answer, ParamObj)
{
    [test, answer] = [Number(String(test).replace(/[\n\r]$/gm, '')), Number(String(answer).replace(/[\n\r]$/gm, ''))];
    /*переменная loss (ошибка), сделана для проверки числа, у которого большое количество знаков после запятой. 
    эта переменная играет роль что бы проверять числа с некоторой погрешностью
    */
    let loss = Number('0.' + '0'.repeat((String(test).substring(String(test).indexOf('.') + 1).length - 1)) + '1')
    if(answer > test - loss && answer < test + loss)
        return true;
    return false;
}

module.exports = {checkhelper};