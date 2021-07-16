# 更新自定义域名: updateCustomDomain

通过该接口，可以更新自定义域名，通过`s cli fc-api updateCustomDomain -h`可以获得帮助信息：

```
Usage

  s cli fc-api updateCustomDomain                                               
  API Document: https://help.aliyun.com/document_detail/191168.html             

Options

  --region string        The region of fc endpoint.                                                    
  --access string        Specify the key name.                                                         
  --props string         The json string of props.                                                     
  --domainName string    The domain name.                                                              
  --protocol string      The protocol types supported by the domain name. Valid values:                
                         HTTP/HTTP,HTTPS                                                               
  --certConfig string    The configurations of the HTTPS certificate.                                  
  --routeConfig string   The route table that maps paths to functions when the functions are invoked   
                         by using the custom domain name.
```
