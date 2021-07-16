# 更新触发器: updateTrigger

通过该接口，可以更新触发器，通过`s cli fc-api updateTrigger -h`可以获得帮助信息：

```
Usage

  s cli fc-api updateTrigger                                                    
  API Document: https://help.aliyun.com/document_detail/190055.html             

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
s cli fc-api updateTrigger --region cn-hangzhou --serviceName serverless-album --functionName pre-warm --triggerName mytrigger2  --triggerConfig '{"payload": "", "cronExpression": "@every 1m", "enable": true}' --triggerType timer
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.

 |
  triggerName: mytrigger2
  description: ''
  triggerId: 1e785a17-20c1-4e40-8be9-9cabd732128f
  sourceArn: null
  triggerType: timer
  invocationRole: null
  qualifier: null
  triggerConfig:
    payload: ''
    cronExpression: '@every 1m'
    enable: true
  createdTime: '2021-07-11T08:50:30Z'
  lastModifiedTime: '2021-07-11T08:50:30Z'
```