# 更新别名: updateAlias

通过该接口，可以更新别名，通过`s cli fc-api updateAlias -h`可以获得帮助信息：

```
Usage

  s cli fc-api updateAlias                                                      
  API Document: https://help.aliyun.com/document_detail/191164.html             

Options

  --region string                    The region of fc endpoint.                                                    
  --access string                    Specify the key name.                                                         
  --props string                     The json string of props.                                                     
  --serviceName string               The name of the service.                                                      
  --aliasName string                 The name of the alias.                                                        
  --versionId string                 The version to which the alias points.                                        
  --additionalVersionWeight string   [JSON String] The additional version to which the alias points and the weight 
                                     of the additional version.                                                    
  --description string               The description of the alias.
```

使用案例：

```
s cli fc-api updateAlias --aliasName release --description tttt --versionId '1' --additionalVersionWeight '{"2": 0.1}' --serviceName serverless-china
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
|
  aliasName: release
  versionId: '1'
  description: tttt
  additionalVersionWeight:
    '2': 0.3
  createdTime: '2021-06-11T02:22:50Z'
  lastModifiedTime: '2021-06-11T02:35:18Z'
```