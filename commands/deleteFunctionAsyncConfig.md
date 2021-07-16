# 删除函数异步配置: deleteFunctionAsyncConfig

通过该接口，可以删除函数异步配置，通过`s cli fc-api deleteFunctionAsyncConfig -h`可以获得帮助信息：

```
Usage

  s cli fc-api deleteFunctionAsyncConfig                                        
  API Document: https://help.aliyun.com/document_detail/181755.html             

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
s cli fc-api deleteFunctionAsyncConfig --serviceName mytest --functionName mytest
```
