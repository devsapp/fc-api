# 预留配置: putProvisionConfig

通过该接口，可以预留配置，通过`s cli fc-api putProvisionConfig -h`可以获得帮助信息：

```
Usage

  s cli fc-api putProvisionConfig                                               
  API Document: https://help.aliyun.com/document_detail/191172.html             

Options

  --region string                   The region of fc endpoint.                                                    
  --access string                   Specify the key name.                                                         
  --props string                    The json string of props.                                                     
  --serviceName string              The name of the service.                                                      
  --functionName string             The name of the function.                                                     
  --qualifier string                The version or alias of the service.                                          
  --target number                   The expected number of provisioned instances.                                 
  --scheduledActions string         [JSON String] The configuration of scheduled auto scaling. You can perform    
                                    scheduled auto scaling to flexibly configure provisioned instances. You can   
                                    configure the number of provisioned instances to be automatically adjusted to 
                                    a specified value at a specified time. This way, the number of provisioned    
                                    instances can meet the concurrency of your business.                          
  --targetTrackingPolicies string   [Json String] The configuration of metric tracking auto scaling. Provisioned  
                                    instances are scaled in or out every minute based on the concurrency          
                                    utilization of provisioned instances.
```