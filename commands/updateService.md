# 更新服务配置: updateService

通过该接口，可以更新服务配置，通过`s cli fc-api updateService -h`可以获得帮助信息：

```
Usage

  s cli fc-api updateService                                                    
  API Document: https://help.aliyun.com/document_detail/188167.html             

Options

  --region string           The region of fc endpoint.                                                    
  --access string           Specify the key name.                                                         
  --props string            The json string of props.                                                     
  --serviceName string      The name of the service.                                                      
  --description string      The description of the service.                                               
  --internetAccess string   Specifies whether to allow functions to access the Internet. Valid values:    
                            true/false                                                                    
  --role string             The RAM role that is used to grant required permissions to Function Compute.  
                            The role is used in the following scenarios: 1）Sends logs generated by a      
                            function to your Logstore. 2）Generates a token for a function to access other 
                            cloud resources during function execution.                                    
  --logConfig string        [JSON String] The log configuration. This parameter specifies a Logstore to   
                            store function execution logs.                                                
  --nasConfig string        [JSON String] The Apsara File Storage NAS (NAS) file system configuration,    
                            which enables a function to access the specified NAS file system.             
  --vpcConfig string        [JSON String] The VPC configuration, which enables a function to access the   
                            specified VPC.                                                                
  --tracingConfig string    [JSON String] The configuration of Tracing Analysis. After Function Compute   
                            integrates with Tracing Analysis, you can record the stay time of a request   
                            in Function Compute, view the cold start time for a function, and record the  
                            execution time of a function. For more information.
```

使用案例：

```
s cli fc-api updateService --region cn-hangzhou --serviceName serverless-album --description '基于 人工智能的相册小程序'
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
|
  serviceName: serverless-album
  description: 基于人工智能的相册小程序
  role: acs:ram::1583208943291465:role/serverlesstooldefaultrole
  logConfig:
    project: serverless-album
    logstore: functions
    enableRequestMetrics: true
    enableInstanceMetrics: false
  serviceId: f5ad903b-7eb3-4d69-bbda-a53e7a11cbe9
  createdTime: '2021-05-05T08:08:43Z'
  lastModifiedTime: '2021-07-15T15:24:28Z'
  vpcConfig:
    vpcId: vpc-bp1tdtit5zns398r6wrw6
    vSwitchIds:
      - vsw-bp1ti6ysm8kpt7g3wvuh8
    securityGroupId: sg-bp13mkmwsaey3xkhuouc
    role: ''
  internetAccess: true
  nasConfig:
    userId: 10003
    groupId: 10003
    mountPoints:
      - serverAddr: 0e56349b3f-bgn22.cn-hangzhou.nas.aliyuncs.com:/serverless-album
        mountDir: /mnt/auto
  vendorConfig: null
  tracingConfig:
    type: null
    params: null
```