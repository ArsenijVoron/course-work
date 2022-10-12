// *****************************************
// Code for prompt-and-alert npm package
// *****************************************
const fs = require('fs'); // connecting module fs
const fd = (process.platform === 'win32') ? process.stdin.fd : fs.openSync('/dev/tty', 'rs'); //consfigurating for your OS
const basicEnd = (process.platform === 'win32') ? '\r\n' : '\n';
const StringDecoder = require('string_decoder').StringDecoder; // connecting class StringDecoder from module string_decoder
const decoder = new StringDecoder('utf8'); // creating object StringDecoder

function write(text = "", end = "") { // function for writing
    fs.writeSync(process.stdout.fd, text.toString() + end); // writing
}

function writeWord(text = "", end = " ") { // function for writing word
    write(text, end); // calling plain write with end 
}

function writeLine(text = "") { // function for writing line
    write(text, basicEnd); // calling plain write with end basicEnd
}

function alert(msg = "") { // function for writing messages
    writeLine(msg); // calling writeLine
}

function getChar() { // function for getting read character's code
    const buf = new Buffer.alloc(1, 0, 'utf8'); // creating object Buffer
    let bytesRead = 0;
    try { // try to read
        bytesRead = fs.readSync(fd, buf, 0, 1); // reading and saving length of read bytes
    }
    catch(error) { // if any error catched
        return -1; // return if char isn't read
    }
    finally { // in not catched
        if (bytesRead > 0) return decoder.write(buf).charCodeAt(0); // checking is the char read and return it's code in positive way
        else return -1; // return if char isn't read
    }
}

function read(end = ` ${basicEnd}`) { // function for reading to end
    let s = "", char, c;
    while ((c = getChar()) != -1 && end.indexOf(char = String.fromCharCode(c)) != -1); // moving reading start to first not end char
    if (c != -1) s = char; // first char
    while ((c = getChar()) != -1 && end.indexOf(char = String.fromCharCode(c)) == -1) { // reading chars while end char isn't found
        s += char; // adding chars in one string while they aren't run out
    }
    return s;
}

function readWord(end = ` ${basicEnd}`) { // function for reading word to end
    return read(end); // returning and calling plain read with end
}

function readLine(sep = "") { // function for reading line with possibility of separating with sep
    return sep != "" ? read(basicEnd).split(sep).filter(x => x != "") : read(basicEnd); // if sep != empty string return read(basicEnd) separated by sep and else return read(basicEnd)
}

function readAll() { // function for reading all stream
    return read(""); // returning and calling plain read without end
}

function prompt(msg = "") { // function for reading text
    write(msg); // writing message
    return readLine(); // reading line
}

module.exports = {write, writeWord, writeLine, alert, getChar, read, readWord, readLine, readAll, prompt};

// ******************************************
// v2.1.0
// (c) 2022-07-19 alkhizha, s0urcedev
// ******************************************