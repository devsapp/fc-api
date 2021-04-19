
##创建函数上传代码包执行示例

```
文件夹
s cli s-fc createFunction -p '{"serviceName": "test", "functionName": "s-fc","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code"}}'

脚本文件
s cli s-fc createFunction -p '{"serviceName": "test", "functionName": "s-fc","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.js"}}'

代码包
s cli s-fc createFunction -p '{"serviceName": "test", "functionName": "s-fc","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.zip"}}'
```
