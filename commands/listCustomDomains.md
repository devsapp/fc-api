# 查询自定义域名列表: listCustomDomains

通过该接口，可以查询自定义域名列表，通过`s cli fc-api listCustomDomains -h`可以获得帮助信息：

```
Usage

  s cli fc-api listCustomDomains                                                
  API Document: https://help.aliyun.com/document_detail/191170.html             

Options

  --region string      The region of fc endpoint.                                                    
  --access string      Specify the key name.                                                         
  --props string       The json string of props.                                                     
  --limit string       The maximum number of resources to be returned. Default value: 20. Maximum    
                       value: 100. The number of returned resources is smaller than or equal to the  
                       specified number.                                                             
  --nextToken string   The token used to obtain more results. If the number of resources exceeds the 
                       limit, the nextToken parameter is returned. Include this parameter in         
                       subsequent calls to obtain more results. You do not need to provide this      
                       parameter in the first call.                                                  
  --prefix string      The prefix that the names of returned resources must contain.                 
  --startKey string    The start position of the result list. Results are in alphabetical order and  
                       the results that follow startKey (inclusive) are listed.       
```

使用案例：

```
s cli fc-api listCustomDomains --region cn-hangzhou
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
|
  - domainName: >-
      http-trigger-function.fc-deploy-service.1583208943291465.cn-hangzhou.fc.devsapp.net
    accountId: '1583208943291465'
    protocol: HTTP
    certConfig:
      certName: null
      privateKey: null
      certificate: null
    apiVersion: '2016-08-15'
    routeConfig:
      routes:
        - path: /*
          serviceName: fc-deploy-service
          functionName: http-trigger-function
          qualifier: null
          methods:
            - GET
    createdTime: '2021-07-11T10:30:43Z'
    lastModifiedTime: '2021-07-13T07:44:31Z'
  - domainName: www.aialbum.net
    accountId: '1583208943291465'
    protocol: HTTP,HTTPS
    certConfig:
      certName: aialbum
      privateKey: null
    apiVersion: '2016-08-15'
    routeConfig:
      routes:
        - path: /test
          serviceName: serverless-album
          functionName: demo
          qualifier: null
          methods:
            - GET
            - POST
            - PUT
            - DELETE
            - HEAD
            - PATCH
        - path: /*
          serviceName: serverless-album
          functionName: api-server
          qualifier: LATEST
          methods: null
    createdTime: '2021-05-05T12:39:47Z'
    lastModifiedTime: '2021-07-11T09:21:45Z'

```