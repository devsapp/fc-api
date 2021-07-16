# 更新函数: updateFunction

通过该接口，可以更新函数，通过`s cli fc-api updateFunction -h`可以获得帮助信息：

```
Usage

  s cli fc-api updateFunction                                                   
  API Document: https://help.aliyun.com/document_detail/189986.html             

Options

  --region string                  The region of fc endpoint.                                                    
  --access string                  Specify the key name.                                                         
  --props string                   The json string of props.                                                     
  --serviceName string             The name of the service.                                                      
  --functionName string            The description of the function.                                              
  --code string                    [JSON String] The code of the function. The code must be packaged into a ZIP  
                                   file.                                                                         
  --customContainerConfig string   [JSON String] The configuration of the custom container runtime. After you    
                                   configure the custom container runtime, you can use custom container images   
                                   to execute functions.                                                         
  --description string             The description of the function.                                              
  --handler string                 The handler of the function. The format is determined by the programming      
                                   language.                                                                     
  --initializationTimeout number   The timeout period for Function Compute to run the initializer function.      
                                   Unit: seconds. Default value: 3. Valid values: 1 to 300. When this period     
                                   expires, the execution of the initializer function is terminated.             
  --initializer string             The handler of the initializer function. The format is determined by the      
                                   programming language.                                                         
  --memorySize number              The memory size of the function. Unit: MB. The memory size must be a multiple 
                                   of 64 MB. Instance types have different memory specifications.                
  --runtime string                 The runtime environment of the function. Valid values: nodejs4.4, nodejs6,    
                                   nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2,       
                                   dotnetcore2.1, custom, and custom-container.                                  
  --timeout number                 The timeout period for the execution of the function. Unit: seconds. Default  
                                   value: 60. Valid values: 1 to 600. When this period expires, the execution of 
                                   the function is terminated.                                                   
  --caPort number                  The port on which the HTTP server listens for the custom runtime or custom    
                                   container runtime.
```

使用案例：

```
s cli fc-api updateFunction --serviceName mytest --functionName mytest --code '{"zipFile": "./"}' --timeout 61                     
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
|
  functionId: 06bbd91d-928a-48ec-b625-0cb935380a7b
  functionName: mytest
  description: ''
  runtime: python3
  handler: index.handler
  timeout: 61
  initializer: null
  initializationTimeout: 3
  codeSize: 3260
  codeChecksum: '11661945507999744963'
  memorySize: 128
  environmentVariables: {}
  createdTime: '2021-07-15T15:11:38Z'
  lastModifiedTime: '2021-07-15T15:13:08Z'
  instanceConcurrency: 1
  customContainerConfig: null
  caPort: null
  instanceType: e1
  layers: null
  instanceLifecycleConfig: null 
```

> 使用该接口需要指定代码，需要的`code`参数的格式为：
>```
>{
>   'ossBucketName': '存放函数代码ZIP包的OSS Bucket名称',
>   'ossObjectName': '存放函数代码ZIP包的OSS Object名称',
>   'zipFile': '函数代码ZIP包的Base 64编码'
>}
>````
> 在这个结构中，`oss*`和`zipFile`不可以同时出现。但选择`zipFile`时，系统会根据您填写参数做以下处理：
> 1. 是否`.zip`结尾，如果是则直接上传；
> 2. 是否`.jar`结尾，如果是则直接上传；
> 3. 如果是本地路径，则帮助用户打包上传；   
