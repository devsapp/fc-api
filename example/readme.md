# 阿里云 Function Compute Api 执行组件


## 前言

通过本组件，您可以无配置的执行 Function Compute 的相关api

## 使用

### 最简使用方法

#### 查看文档

```
s cli fc-api -d  // 查看api 内容及调用方法
```
#### 查询服务
```
s cli fc-api listServices -a default -r cn-hangzhou // 查询Function Compute服务列表， 指定默认秘钥， 指定查询 region
```
#### 创建函数
进入 example 目录操作,[详细查看]（example/readme.md）
```
s cli s-fc createFunction -p '{"serviceName": "hanxietest", "functionName": "s-fc","handler":"index.handler","runtime": "nodejs10","code":{"filePath": "index.js"}}'
```

[更多文档查看](https://devsapp.github.io/s-fc/doc/index.html)

