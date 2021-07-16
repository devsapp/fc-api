# 追加路径配置: appendRoutes

通过该接口，可以追加路径配置，通过`s cli fc-api appendRoutes -h`可以获得帮助信息：

```
Usage

  s cli fc-api appendRoutes                                                     
  API Document: https://help.aliyun.com/document_detail/191168.html             

Options

  --region string              The region of fc endpoint.                                                    
  --access string              Specify the key name.                                                         
  --props string               The json string of props.                                                     
  --domainName string          The domain name.                                                              
  --appendRouteConfig string   The route table that maps paths to functions when the functions are invoked   
                               by using the custom domain name.          
```

使用案例：

```
s cli fc-api appendRoutes --domainName anycodes.cn --appendRouteConfig '[{"path":"/test","serviceName":"serverless-album","functionName":"demo","methods":["GET","POST","PUT","DELETE","HEAD","PATCH"]}]'
```
