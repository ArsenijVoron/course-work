# prompt-and-alert

# Українська

## Встановлення

Введи у термінал (після встановлення `NodeJS`): 

```console
npm install prompt-and-alert
```

Постав у початок файлу:

```js
let write = require('prompt-and-alert').write;
let writeWord = require('prompt-and-alert').writeWord;
let writeLine = require('prompt-and-alert').writeLine;
let alert = require('prompt-and-alert').alert;
let getChar = require('prompt-and-alert').getChar;
let read = require('prompt-and-alert').read;
let readWord = require('prompt-and-alert').readWord;
let readLine = require('prompt-and-alert').readLine;
let readAll = require('prompt-and-alert').readAll;
let prompt = require('prompt-and-alert').prompt;
```

## Функції

* **`write(text, end)`** — вивід тексту у консоль

    `text` — текст, який буде виведений у консоль

    `end` — кінець виводу

* **`writeWord(text, end)`** — вивід слова у консоль

    `text` — текст, який буде виведений у консоль

    `end` — кінець слова

* **`writeLine(text, end)`** — вивід рядка у консоль

    `text` — текст, який буде виведений у консоль

    `end` — кінець рядка

* **`alert(msg)`** — вивід повідомлення у консоль
    
    `msg` — повідомлення, яке буде виводитися у консоль

* **`getChar()`** — отримання char-коду останнього непрочитаного символа

* **`read(end)`** — читання з консолі до кінця

    `end` — кінець

* **`readWord(end)`** — читання останнього непрочитаного слова

    `end` — кінець слова

* **`readLine(sep)`** — читання останнього непрочитаного рядка

    `sep` — розділювач, який розділяє слова в рядку, по ньому відбувається поділ рядка на масив слів. При розділювачі `""` ділення на масив слів не відбувається.

* **`readAll()`** — читання усьогу потоку з консолі

* **`prompt(msg)`** — читання з консолі після вивіду у консоль повідомлення

    `msg` — повідомлення, яке буде виводитися у консоль

# English

## Installation

Type to terminal (after installing `NodeJS`):

```console
npm install prompt-and-alert
```

Put on a start of a file:

```js
let write = require('prompt-and-alert').write;
let writeWord = require('prompt-and-alert').writeWord;
let writeLine = require('prompt-and-alert').writeLine;
let alert = require('prompt-and-alert').alert;
let getChar = require('prompt-and-alert').getChar;
let read = require('prompt-and-alert').read;
let readWord = require('prompt-and-alert').readWord;
let readLine = require('prompt-and-alert').readLine;
let readAll = require('prompt-and-alert').readAll;
let prompt = require('prompt-and-alert').prompt;
```

## Functions

* **`write(text, end)`** — text output to the console

    `text` — the text that will be output to the console

    `end` — the end of the output

* **`writeWord(text, end)`** — output the word to the console

    `text` — the text that will be output to the console

    `end` — the end of a word

* **`writeLine(text, end)`** — output a line to the console

    `text` — the text that will be output to the console

    `end` — the end of the line

* **`alert(msg)`** — output a message to the console
    
    `msg` — the message that will be output to the console

* **`getChar()`** — getting the char code of the last unread character

* **`read(end)`** — reading from the console to the end

    `end` — the end

* **`readWord(end)`** - reading the last unread word

    `end` — the end of a word

* **`readLine(sep)`** - reading the last unread line

    `sep` — the delimiter that separates words in a line, it is used to divide the line into an array. With the separator `""`, division into an array of words does not occur.

* **`readAll()`** — reading the entire stream from the console

* **`prompt(msg)`** - reading from the console after outputting a message to the console

    `msg` — the message that will be output to the console

***

***v2.1.0***

***`(c)`*** **2022-07-19** *alkhizha*, *s0urcedev*

***
