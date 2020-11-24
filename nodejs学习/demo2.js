const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
readline.question("你叫啥", name => {
    console.log("你好" + name)
    readline.close()
})