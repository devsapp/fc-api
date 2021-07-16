# 调用执行函数: invokeFunction

通过该接口，可以调用执行函数，通过`s cli fc-api invokeFunction -h`可以获得帮助信息：

```
Usage

  s cli fc-api invokeFunction                                                   
  API Document: https://help.aliyun.com/document_detail/191156.html             

Options

  --region string         The region of fc endpoint.                                                    
  --access string         Specify the key name.                                                         
  --props string          The json string of props.                                                     
  --serviceName string    The name of the service.                                                      
  --functionName string   The name of the function.                                                     
  --event string          The event of the function. The value of this parameter is a binary array.     
                          Function Compute passes the event to the function for processing.
```

使用案例：

```
s cli fc-api invokeFunction --serviceName serverless-china --functionName pre-warm
```