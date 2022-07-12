let getSquares = (n) =>
{
    if(n == 1)
        throw Error();
    return n ** 2
} 

try 
{
    module.exports = {getSquares};
}
catch
{
    throw Error('Testing function is named incorrectly');
}
