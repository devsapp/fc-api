# 获取 alias 信息: getAlias

通过该接口，可以获取 alias 信息，通过`s cli fc-api getAlias -h`可以获得帮助信息：

```
Usage

  s cli fc-api createTrigger                                                    
  API Document: https://help.aliyun.com/document_detail/190054.html             

Options

  --region string           The region of fc endpoint.                                                    
  --access string           Specify the key name.                                                         
  --props string            The json string of props.                                                     
  --serviceName string      The name of the service.                                                      
  --functionName string     The description of the function.                                              
  --invocationRole string   The role required when the trigger source such as OSS invokes the function.   
  --qualifier string        The version or alias of the service.                                          
  --sourceArn string        The Alibaba Cloud Resource Name (ARN) of the event source for the trigger.    
  --triggerConfig string    The configurations of the trigger. The configurations vary with trigger       
                            types.                                                                        
  --triggerName string      The name of the trigger.                                                      
  --triggerType string      The type of the trigger: oss/log/timer/http/tablestore/cdn_events/mns_topic.
```

使用案例：

```
s cli fc-api getAlias --aliasName release --description tttt --versionId '1' --additionalVersionWeight '{"2": 0.1}' --serviceName serverless-china
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