# 删除版本: deleteVersion

通过该接口，可以删除版本，通过`s cli fc-api deleteVersion -h`可以获得帮助信息：

```
Usage

  s cli fc-api deleteVersion                                                    
  API Document: https://help.aliyun.com/document_detail/191161.html             

Options

  --region string        The region of fc endpoint.  
  --access string        Specify the key name.       
  --props string         The json string of props.   
  --serviceName string   The name of the service.    
  --versionId string     The version of the service.
```

使用案例：

```
s cli fc-api deleteVersion --serviceName ai-album --versionId 1
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
Version 1 delete success
```