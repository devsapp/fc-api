# 获取函数配置信息: getFunction

通过该接口，可以获取函数配置信息，通过`s cli fc-api getFunction -h`可以获得帮助信息：

```
Usage

  s cli fc-api getFunction                                                      
  API Document: https://help.aliyun.com/document_detail/189985.html             

Options

  --region string         The region of fc endpoint.           
  --access string         Specify the key name.                
  --props string          The json string of props.            
  --serviceName string    The name of the service.             
  --functionName string   The name of the function.            
  --qualifier string      The version or alias of the service.
```

使用案例：

```
s cli fc-api getFunction --serviceName serverless-china --functionName pre-warm 
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
|
  functionId: 6a71a9e4-ad34-448a-8569-f259dd242bb0
  functionName: pre-warm
  description: ''
  runtime: python3
  handler: index.handler
  timeout: 60
  initializer: ''
  initializationTimeout: 3
  codeSize: 431
  codeChecksum: '409774500677983689'
  memorySize: 128
  environmentVariables: {}
  createdTime: '2021-01-14T03:19:57Z'
  lastModifiedTime: '2021-01-15T07:51:49Z'
  instanceConcurrency: 1
  customContainerConfig: null
  caPort: null
  instanceType: e1
  layers: null
  instanceLifecycleConfig:
    preFreeze:
      handler: ''
      timeout: 3
    preStop:
      handler: ''
      timeout: 3
```