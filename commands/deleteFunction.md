# 删除函数: deleteFunction

通过该接口，可以删除函数，通过`s cli fc-api deleteFunction -h`可以获得帮助信息：

```
Usage

  s cli fc-api deleteFunction                                                   
  API Document: https://help.aliyun.com/document_detail/191153.html             

Options

  --region string         The region of fc endpoint. 
  --access string         Specify the key name.      
  --props string          The json string of props.  
  --serviceName string    The name of the service.   
  --functionName string   The name of the function.
```

使用案例：

```
s cli fc-api deleteFunction --serviceName mytest --functionName mytest
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
Function mytest delete success
```