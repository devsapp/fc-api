# 查询触发器列表: listTriggers 

通过该接口，可以查询触发器列表，通过`s cli fc-api listTriggers -h`可以获得帮助信息：

```
Usage

  s cli fc-api listTriggers                                                     
  API Document: https://help.aliyun.com/document_detail/191158.htm              

Options

  --region string         The region of fc endpoint.                                                    
  --access string         Specify the key name.                                                         
  --props string          The json string of props.                                                     
  --limit string          The maximum number of resources to be returned. Default value: 20. Maximum    
                          value: 100. The number of returned resources is smaller than or equal to the  
                          specified number.                                                             
  --nextToken string      The token used to obtain more results. If the number of resources exceeds the 
                          limit, the nextToken parameter is returned. Include this parameter in         
                          subsequent calls to obtain more results. You do not need to provide this      
                          parameter in the first call.                                                  
  --prefix string         The prefix that the names of returned resources must contain.                 
  --startKey string       The start position of the result list. Results are in alphabetical order and  
                          the results that follow startKey (inclusive) are listed.                      
  --serviceName string    The name of the service.                                                      
  --functionName string   The name of the function.  
```

使用案例：

```
s cli fc-api listTriggers --functionName admin --serviceName ai-album
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
|
  - triggerName: defaultTrigger
    description: ''
    triggerId: 71653c95-a068-4f47-9a97-afb625bd6f20
    sourceArn: null
    triggerType: http
    invocationRole: null
    qualifier: null
    triggerConfig:
      methods:
        - GET
        - POST
      authType: anonymous
    createdTime: '2021-01-01T15:32:44Z'
    lastModifiedTime: '2021-01-01T15:48:56Z'
```