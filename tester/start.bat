rem node checker.js program testingProgram_name.file_extension tests dirWithTests_name answers dirWithAnswers_name res html-file_name lower(if lower is found on the command line, then responses will be checked in lowercase) time timelimit per 1 test in ms length test length value and result
rem node .\checker.js program test.py tests tests res answer1 answers answers time 1000 lower length 20
rem node .\checker.js program test.js tests tests answers answers res answer1 test time 1000 lower
rem node .\checker.js program test.cpp tests tests answers answers res answer1 time 1000
node .\checker.js program test.js tests tests res answer1 answers answers time 1000 
pause