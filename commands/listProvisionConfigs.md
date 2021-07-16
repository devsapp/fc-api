# 查询预留配置列表: listProvisionConfigs

通过该接口，可以查询函数列表，通过`s cli fc-api listProvisionConfigs -h`可以获得帮助信息：

```
Usage

  s cli fc-api listProvisionConfigs                                             
  API Document: https://help.aliyun.com/document_detail/191174.html             

Options

  --region string        The region of fc endpoint.                                                    
  --access string        Specify the key name.                                                         
  --props string         The json string of props.                                                     
  --limit string         The maximum number of resources to be returned. Default value: 20. Maximum    
                         value: 100. The number of returned resources is smaller than or equal to the  
                         specified number.                                                             
  --nextToken string     The token used to obtain more results. If the number of resources exceeds the 
                         limit, the nextToken parameter is returned. Include this parameter in         
                         subsequent calls to obtain more results. You do not need to provide this      
                         parameter in the first call.                                                  
  --serviceName string   The name of the service.                                                      
  --qualifier string     The version or alias of the service.            
```

使用案例：

```
s cli fc-api listProvisionConfigs --serviceName ai-album
```
