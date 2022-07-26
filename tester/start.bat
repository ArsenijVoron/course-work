rem node checker.js program testingProgram_name.file_extension dir dirWithTests_name res csv-file_name lower(if lower is found on the command line, then responses will be checked in lowercase) time timelimit per 1 test in ms length test length value and result
rem node .\checker.js program test.py dir tests res test time 1000 lower length 20
rem node .\checker.js program test.js dir tests res test time 1000 lower
rem node .\checker.js program test.cpp dir tests res test time 1000
node .\checker.js program test.cpp dir tests res test time 1000 lower
pause