# 删除别名: deleteAlias

通过该接口，可以删除别名，通过`s cli fc-api deleteAlias -h`可以获得帮助信息：

```
Usage

  s cli fc-api deleteAlias                                                      
  API Document: https://help.aliyun.com/document_detail/191163.html             

Options

  --region string        The region of fc endpoint. 
  --access string        Specify the key name.      
  --props string         The json string of props.  
  --serviceName string   The name of the service.   
  --aliasName string     The name of the alias.
```

使用案例：

```
s cli fc-api deleteAlias --serviceName ai-album --aliasName release
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
Alias release delete success
```