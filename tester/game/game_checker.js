
const cp = require("child_process"), 
      fs = require("fs");
    
let return_check = 0;
fs.writeFileSync("return_main.txt", String(return_check));

while (return_check < 50)
{
      cp.execSync("python func.py < return_main.txt > return_check.txt");
      cp.execSync("python main.py < return_check.txt > return_main.txt");
      return_check = Number(fs.readFileSync("return_check.txt"))
      return_main = Number(fs.readFileSync("return_check.txt"))
      console.log(`тестируемая программа вернула ${return_check}, а я ей ответил ${return_main}`)
}