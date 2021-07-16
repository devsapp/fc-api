# 删除触发器: deleteTrigger

通过该接口，可以删除触发器，通过`s cli fc-api deleteTrigger -h`可以获得帮助信息：

```
Usage

  s cli fc-api deleteTrigger                                                    
  API Document: https://help.aliyun.com/document_detail/191157.html             

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
s cli fc-api deleteTrigger --region cn-hangzhou --serviceName serverless-album --functionName pre-warm --triggerName mytrigger2
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
Trigger mytrigger2 delete success
```