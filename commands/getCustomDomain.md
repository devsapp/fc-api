# 获取自定义域名信息: getCustomDomain

通过该接口，可以获取自定义域名信息，通过`s cli fc-api getCustomDomain -h`可以获得帮助信息：

```
Usage

  s cli fc-api getCustomDomain                                                  
  API Document: https://help.aliyun.com/document_detail/191169.html             

Options

  --region string       The region of fc endpoint. 
  --access string       Specify the key name.      
  --props string        The json string of props.  
  --domainName string   The name of the domain.
```

使用案例：

```
s cli fc-api getCustomDomain --domainName www.aialbum.net --region cn-hangzhou
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
|
  domainName: www.aialbum.net
  accountId: '1583208943291465'
  protocol: HTTP,HTTPS
  certConfig:
    certName: aialbum
    privateKey: null
    certificate: |-
      -----BEGIN CERTIFICATE-----
      MIIFpTCCBI2gAwIBAgIQBT/ceIHcrOJobRfXQe3VnTANBgkqhkiG9w0BAQsFADBy
      MQswCQYDVQQGEwJDTjElMCMGA1UEChMcVHJ1c3RBc2lhIFRlY2hub2xvZ2llcywg
      -----END CERTIFICATE-----
      -----BEGIN CERTIFICATE-----
      MIIErjCCA5agAwIBAgIQBYAmfwbylVM0jhwYWl7uLjANBgkqhkiG9w0BAQsFADBh
      MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
      -----END CERTIFICATE-----
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