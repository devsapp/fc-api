# 获取触发器配置信息: getTrigger

通过该接口，可以获取触发器配置信息，通过`s cli fc-api getTrigger -h`可以获得帮助信息：

```
Usage

  s cli fc-api getTrigger                                                       
  API Document: https://help.aliyun.com/document_detail/190056.html             

Options

  --region string         The region of fc endpoint. 
  --access string         Specify the key name.      
  --props string          The json string of props.  
  --serviceName string    The name of the service.   
  --functionName string   The name of the function.  
  --triggerName string    The name of the trigger.
```

使用案例：

```
s cli fc-api getTrigger --region cn-hangzhou --serviceName serverless-album --functionName pre-warm --triggerName mytrigger2 
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
|
  triggerName: mytrigger2
  description: ''
  triggerId: 7f38bb37-6464-4a05-abbc-03ceb16a138f
  sourceArn: null
  triggerType: timer
  invocationRole: null
  qualifier: null
  triggerConfig:
    payload: ''
    cronExpression: '@every 1m'
    enable: true
  createdTime: '2021-07-15T15:22:26Z'
  lastModifiedTime: '2021-07-15T15:22:26Z'
```