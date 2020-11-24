- process核心模块
  - process.exit()进程会被强制终止。这意味着任何请求都会被非正常的终止。不大友好。    
    `process.exit(1)` 
  - 向该命令发送SIGTERM信号，并使用进程的信号处理程序进行处理；
    ```js
    const express = require("express")
    const app=express()
    app.get('/',(req,res)=>{
        res.send("你好")
    })
    const server =app.listen(9999,()=>{console.log("服务器已就绪")})
    process.on("SIGTERM",()=>{
        server.close(()=>{
            console.log("进程终止")
        })
    })
    ```
  - process.env.NODE_ENV//'development'  
  获取环境变量


- console模块
  - `console.log('我的%s已经%d岁','猫',2)`
  - %s 字符串
  - %d 数字
  - %i 格式化变量为其整数部分
  - %o 格式化变量为对象
  - `console.time()`与`console.timeEnd()`
    ```js
    const dosomething = () => { console.log("ceshi") }
    const measure = () => {
    console.time("shijian1")
    dosomething()
    console.timeEnd("shijian1")
    }
    measure()
    ```

- readline模块：
  ```js
  const readline=require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
  })
  readline.question("你叫啥",name=>{
    console.log("你好"+name)
    readline.close()
  })
  ```

- module.exports与exports与require
  - module.exports
  ```js
  const car={
      brand:"FORD"
  }
  module.exports=car

  //另一个文件中：
  const car=require("./car")
  ```
  - exports
  ```js
  exports.car={
      brand:"FORD"
  }
  //另一个文件中：
  const items=require("./items")
  items.car
  ```
  - modules.exports公开了它指向的对象，exports公开了它指向对象的属性。


- Nodejs事件循环
  - 重要性：阐明了nodejs如何做到异步且具有非阻塞的I/O；


- process.nextTick()&setTimeout&setlmmediate
    - process.nextTick():传一个函数，在这个事件结束后，在下个事件开始前执行这个函数。  
    - setTimeout(()=>{},0)在下一个事件开始前执行比process.nextTick()慢。
    - setlmmediate()：速度与功能都与setTimeout(()=>{},0)差不多

- node异步回调：错误优先回调(第一个参数都是错误对象)
    ```js
    fs.readFile('a.json',(err,data)=>{
        if(err!=null){
            console.log(err)
            return
        }
        console.log(data)
    })
    ```

- fs模块
  - fs.open('参数1'，'参数2',回调函数(err,fd)=>{})  
  其中：参数2：r+,w+,a,a+
  - fs.stat()