# 阿里云函数计算（FC）Api 执行组件

## 前言

通过该组件，使用者可以快速的基于阿里云函数计算（FC）的API进行函数的相关管理。

> 关于该组件的一些应用场景。该组件实际上是API层面的一些原子化操作，在使用过程中更适合：
> - 查询某些列表，例如服务列表，函数列表，触发器列表，域名列表.....
> - 查询详情，查询服务详情，函数详情，版本详情......
> - 删除某些资源
> - 发布某些资源，例如版本，别名等......      
> 
> 该组件更适合在一些原子操作，或者自动化测试的模块中发挥作用。如果纯粹的手动通过该组件创建函数等，虽然是可以的，但是确实是不合适，如果涉及到项目的管理，强烈推荐[阿里云函数计算(FC)组件](https://github.com/devsapp/fc)


## 目录

- [入门](#入门)
- [使用案例](#使用案例)
    - [查询账号下的服务](#查询账号下的服务)
    - [查询服务下的函数](#查询服务下的函数)
    - [发布版本](#发布版本)
    - [创建别名](#创建别名)
    - [更新别名](#更新别名)
- [支持的接口](#支持的接口)
- [关于指定密钥和地域的说明](#关于指定密钥和地域的说明) 
- [可能出现的问题](#可能出现的问题)

## 入门

> 在使用之前，需要进行阿里云密钥的配置。
> 配置密钥的方法，可以[参考密钥配置文档](http://www.serverless-devs.com/docs/command#config%E6%8C%87%E4%BB%A4) ，获取阿里云密钥的具体流程，可以参考[阿里云密钥文档](http://www.serverless-devs.com/docs/provider-config/alibabacloud)
> 也可以使用：`s config add --AccessKeyID 替换为你的阿里云AccessKeyID --AccessKeySecret 替换为你的阿里云AccessKeySecret --AccountID 替换为你的阿里云AccountID --aliasName default`

可以直接使用`s cli fc-api -h`查看目前已经支持的接口信息，以及简单的帮助信息。

当要使用某个具体方法时，同样可以通过`-h`的参数，查看帮助详情，例如:

```
$ s cli fc-api createAlias -h

Usage

  s cli fc-api createAlias 

Options

  -a, --access string                Specify the key name.                                                         
  -p, --props string                 The json string of props.                                                     
  --serviceName string               The name of the service.                                                      
  --aliasName string                 The name of the alias.                                                        
  --versionId string                 The version to which the alias points.                                        
  --additionalVersionWeight string   The additional version to which the alias points and the weight of the        
                                     additional version.                                                           
  --description string               The description of the alias.                                                 

```

## 使用案例

### 查询账号下的服务

执行命令：`s cli fc-api listServices --region cn-hangzhou`
得到结果：
```
|
  - serviceName: serverless-album
    description: 基于函数计算的人工智能相册系统
    role: acs:ram:::role/
    serviceId: f5ad903b-7eb3-4d69-bbda-
    createdTime: '2021-05-05T08:08:43Z'
    lastModifiedTime: '2021-05-27T03:11:31Z'
    vpcConfig:
      vpcId: vpc-bp1tdtit5zns398r6wrw6
      vSwitchIds:
        - vsw-bp1ti6ysm8kpt7g3wvuh8
      securityGroupId: sg-bp13mkmwsaey3xkhuouc
      role: ''
    internetAccess: true
    vendorConfig: null
    tracingConfig:
      type: null
      params: null
```

### 查询服务下的函数

执行命令：`s cli fc-api listFunctions --serviceName serverless-album --region cn-hangzhou`
得到结果：
```
|
  - functionId: 86cfe445-c19f-47b4-bd34
    functionName: api-server
    description: ''
    runtime: python3
    handler: index.app
    timeout: 60
    initializer: ''
    initializationTimeout: 3
    codeSize: 12408
    codeChecksum: ''
    memorySize: 192
    createdTime: '2021-05-05T08:08:44Z'
    lastModifiedTime: '2021-05-27T03:11:31Z'
    instanceConcurrency: 1
    customContainerConfig: null
    caPort: null
    instanceType: e1
    layers: null
    instanceLifecycleConfig:
      preFreeze:
        handler: ''
        timeout: 3
      preStop:
        handler: ''
        timeout: 3
```

### 发布版本

执行命令：`s cli fc-api publishVersion --serviceName serverless-china`
得到结果：
```
|
  versionId: '2'
  description: ''
  createdTime: '2021-06-11T02:28:39Z'
  lastModifiedTime: '2021-06-11T02:28:39Z'
```

### 创建别名

执行命令：`s cli fc-api createAlias --serviceName serverless-china --versionId '2' --aliasName test  --description ''`
得到结果：
```
|
  aliasName: test
  versionId: '2'
  description: ''
  additionalVersionWeight: {}
  createdTime: '2021-06-11T02:30:19Z'
  lastModifiedTime: '2021-06-11T02:30:19Z'
```

### 更新别名

执行命令：`s cli fc-api updateAlias --aliasName release --description tttt --versionId '1' --additionalVersionWeight '{"2": 0.1}' --serviceName serverless-china`
得到结果：
```
|
  aliasName: release
  versionId: '1'
  description: tttt
  additionalVersionWeight:
    '2': 0.3
  createdTime: '2021-06-11T02:22:50Z'
  lastModifiedTime: '2021-06-11T02:35:18Z'
```

## 支持的接口
- createAlias         ： 创建别名
- createCustomDomain  ： 创建自定义域名
- createFunction      ： 创建函数
- createFunctionDefaultService：创建函数，如不指定服务名称，会默认创建一个服务名称为'Service'+functionName
- createService       ： 创建服务
- createTrigger       ： 创建触发器
- deleteAlias         ： 删除别名
- deleteCustomDomain  ： 删除自定义域名
- deleteFunction      ： 删除函数  
- deleteFunctionAsyncConfig ： 删除函数异步配置
- deleteService       ： 删除服务
- deleteTrigger       ： 删除触发器
- deleteVersion       ： 删除版本
- getAlias            ： 获取 alias 信息
- getCustomDomain     ： 获取自定义域名信息
- getFunction         ： 获取函数配置信息
- getFunctionAsyncConfig ： 获取函数异步调用配置信
- getFunctionCode     ： 获取函数 Code 信息
- getProvisionConfig  ： 获取预留配置信息
- getService          ： 获取服务配置信息 
- getTrigger          ： 获取触发器配置信息
- invokeFunction      ： 调用执行函数        
- listAliases         ： 查询别名列表  
- listCustomDomains   ： 查询自定义域名列表
- listFunctionAsyncCofig ： 查询异步配置列表
- listFunctions       ： 查询函数列表
- listProvisionConfigs ： 查询预留配置列表
- listServices        ： 查询服务列表
- listTriggers        ： 查询触发器列表
- listVersions        ： 查询版本列表
- publishVersion      ： 创建版本
- putFunctionAsyncCofig ： 函数异步配置
- putProvisionConfig  ： 预留配置            
- updateAlias         ： 更新别名 
- updateCustomDomain  ： 更新自定义域名
- updateFunction      ： 更新函数 
- updateService       ： 更新服务配置
- updateTrigger       ： 更新触发器

## 关于指定密钥和地域的说明

在使用`fc-api`时，涉及到默认密钥和默认地域的配置，可以通过：
1. 执行命令时增加`--region`、`--access`来指定，例如`s cli fc-api listServices --region cn-hongkong`
2. 通过`s cli fc-api set`进行设置，可以参考`s cli fc-api set -h`:
```
Usage

  s cli fc-api set [type] [value] 

Examples

  region   The region of fc endpoint. 
  access   Specify the key name.
```

-----

## 可能出现的问题

- `message: Bad data in request body`: 请通过Help帮助方法查看每个字段类型，确定字段类型和取值是否正确；
