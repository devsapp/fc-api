# 创建版本: publishVersion

通过该接口，可以创建版本，通过`s cli fc-api publishVersion -h`可以获得帮助信息：

```
Usage

  s cli fc-api publishVersion                                                   
  API Document: https://help.aliyun.com/document_detail/191160.html             

Options

  --region string        The region of fc endpoint.              
  --access string        Specify the key name.                   
  --props string         The json string of props.               
  --serviceName string   The name of the service.                
  --description string   The description of the service version.      
```

使用案例：

```
s cli fc-api publishVersion --serviceName ai-album --description 'my test'
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
|
  versionId: '1'
  description: my test
  createdTime: '2021-07-15T02:17:53Z'
  lastModifiedTime: '2021-07-15T02:17:53Z'
```