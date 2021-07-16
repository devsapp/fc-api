# 删除自定义域名: deleteCustomDomain

通过该接口，可以删除自定义域名，通过`s cli fc-api deleteCustomDomain -h`可以获得帮助信息：

```
Usage

  s cli fc-api deleteCustomDomain                                               
  API Document: https://help.aliyun.com/document_detail/191167.html             

Options

  --region string       The region of fc endpoint. 
  --access string       Specify the key name.      
  --props string        The json string of props.  
  --domainName string   The name of the domain.
```

使用案例：

```
s cli fc-api deleteCustomDomain --domainName anycodes.cn
```
