# 删除服务: deleteService

通过该接口，可以删除服务，通过`s cli fc-api deleteService -h`可以获得帮助信息：

```
Usage

  s cli fc-api deleteService                                                    
  API Document: https://help.aliyun.com/document_detail/189227.html             

Options

  --region string        The region of fc endpoint. 
  --access string        Specify the key name.      
  --props string         The json string of props.  
  --serviceName string   The name of the service.
```

使用案例：

```
s cli fc-api deleteService --serviceName mytest
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
Service mytest delete success
```