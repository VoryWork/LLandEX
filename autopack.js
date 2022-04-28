const fs = require("fs");
let arg = process.argv.slice(2);
let js = fs.readFileSync(arg[0]);
js= `//UpgradeEX* {"name":"${arg[2]}","platform":"github","repo":"${arg[1].split("/")[0]}\\\/${arg[1].split("/")[1]}","currentRelease":"${arg[3]}"} */\n` +js;
fs.writeFileSync(arg[0],js);