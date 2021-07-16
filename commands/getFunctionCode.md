# 获取函数 Code 信息: getFunctionCode

通过该接口，可以获取函数 Code 信息，通过`s cli fc-api getFunctionCode -h`可以获得帮助信息：

```
Usage

  s cli fc-api getFunctionCode                                                  
  API Document: https://help.aliyun.com/document_detail/191154.html             

Options

  --region string         The region of fc endpoint.           
  --access string         Specify the key name.                
  --props string          The json string of props.            
  --serviceName string    The name of the service.             
  --functionName string   The name of the function.            
  --qualifier string      The version or alias of the service.
```

使用案例：

```
s cli fc-api getFunctionCode --serviceName serverless-china --functionName pre-warm
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
|
  url: >-
    https://fc-hk-mongkok-func-code.oss-cn-hongkong.aliyuncs.com/code%2Fd80f5c05-918d-4343-bc8a-24c68ab9cfbc-6a71a9e4-ad34-448a-8569-f259dd242bb0-0ffdfc42-6b2f-4ff4-a694-94839fbe69d1?Expires=1626362976&OSSAccessKeyId=LTAIyhwH9qs2m1HH&Signature=ZGm7ZXTnrd8NoF%2BKYON2UW8KwA0%3D
  checksum: '409774500677983689'
```