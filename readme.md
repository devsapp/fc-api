# 使用说明

FC-API组件是一款基于Serverless Devs的阿里云函数计算API操作工具，通过该工具，开发者可以直接通过命令行进行函数计算相关API的使用：

> - 查询某些列表，例如服务列表，函数列表，触发器列表，域名列表.....
> - 查询详情，查询服务详情，函数详情，版本详情......
> - 删除某些资源
> - 发布某些资源，例如版本，别名等......      

由于该组件是直接针对API进行操作，所以该组件相对来说所提供的是极其原子的能力，在对该组件使用的过程中，完全可以参考接口所对应的API文档。

## 应用场景

该组件的应用场景相对来说比较明确：
- 自动化流程：该组件是纯粹的命令行工具，无需依赖Yaml即可使用，所以在使用的过程中，可以通过参数的传递实现某些功能，而且这些功能相对来说都是原子性的，更容易做权限控制和自动化流程，例如更新函数代码、更新函数配置、更新服务、创建触发器、更新别名等操作都是可以通过单个指令直接实现；
- 函数管理：该组件是基于阿里云函数计算API的命令行工具，具备已经的函数管理能力，包括查看服务列表，查看函数列表以及查看触发器列表，同时也支持这些能力的更新、删除等操作；

## 使用技巧

该组件，可以直接在安装Serverless Devs开发者工具之后，通过`cli`方式进行唤醒，例如在命令行中执行`s cli fc-api -h`即可获得相关的帮助文档。

为了便于自动化，或者在使用过程中更加简单，轻松，该组件支持多密钥配置以及默认值配置。

以获取`cn-hangzhou`区服务列表为例，我们可以通过`s cli fc-api listServices --region cn-hangzhou -a <你的密钥别名>`进行获取，此时开发者可以通过指定不同账号的别名，获取不同账号下`cn-hangzhou`区的服务列表。

除了密钥部分，该组件提供了`set`方法，可以通过`s cli fc-api set`进行部分参数的默认值设定，例如：`s cli fc-api set access demo`即将默认密钥别名设置为`demo`，通过`s cli fc-api set region cn-beijing`即将默认地区别名设置为`cn-beijing`，此时当我们再查询`demo`账号下`cn-beijing`地区的函数列表时，可以是`s cli fc-api listServices`

除了`access`和`region`之外，系统还支持`serviceName`和`functionName`的设定。当然使用者也可以通过参数的形式进行默认值的设定，例如：`s cli fc-api set --region cn-beijing`等同于`s cli fc-api set region cn-beijing`，当然也可以通过参数传递方法设定多个默认参数，例如：`s cli fc-api set --region cn-beijing --serviceName defaultService --functionName defaultFunction`

> 如果账号中已经配置了`default`密钥信息，那么在使用的时候，如果没有设置默认密钥信息和指定密钥信息，系统将会使用`default`作为默认密钥进行相关操作。

目前，该工具已经支持包括创建函数、创建服务、创建触发器等在内的三十余个接口：

- [createAlias         ： 创建别名](./commands/createAlias.md)
- [createCustomDomain  ： 创建自定义域名](./commands/createCustomDomain.md)
- [createFunction      ： 创建函数](./commands/createFunction.md)
- [createService       ： 创建服务](./commands/createService.md)
- [createTrigger       ： 创建触发器](./commands/createTrigger.md)
- [deleteAlias         ： 删除别名](./commands/deleteAlias.md)
- [deleteCustomDomain  ： 删除自定义域名](./commands/deleteCustomDomain.md)
- [deleteFunction      ： 删除函数](./commands/deleteFunction.md)  
- [deleteFunctionAsyncConfig ： 删除函数异步配置](./commands/deleteFunctionAsyncConfig.md)
- [deleteService       ： 删除服务](./commands/deleteService.md)
- [deleteTrigger       ： 删除触发器](./commands/deleteTrigger.md)
- [deleteVersion       ： 删除版本](./commands/deleteVersion.md)
- [getAlias            ： 获取 alias 信息](./commands/getAlias.md)
- [getCustomDomain     ： 获取自定义域名信息](./commands/getCustomDomain.md)
- [getFunction         ： 获取函数配置信息](./commands/getFunction.md)
- [getFunctionAsyncConfig ： 获取函数异步调用配置信](./commands/getFunctionAsyncConfig.md)
- [getFunctionCode     ： 获取函数 Code 信息](./commands/getFunction.md)
- [getProvisionConfig  ： 获取预留配置信息](./commands/getProvisionConfig.md)
- [getService          ： 获取服务配置信息](./commands/getService.md) 
- [getTrigger          ： 获取触发器配置信息](./commands/getTrigger.md)
- [invokeFunction      ： 调用执行函数](./commands/invokeFunction.md)        
- [listAliases         ： 查询别名列表](./commands/listAliases.md)  
- [listCustomDomains   ： 查询自定义域名列表](./commands/listCustomDomains.md)
- [listFunctions       ： 查询函数列表](./commands/listFunctions.md)
- [listProvisionConfigs ： 查询预留配置列表](./commands/listProvisionConfigs.md)
- [listServices        ： 查询服务列表](./commands/listServices.md)
- [listTriggers        ： 查询触发器列表](./commands/listTriggers.md)
- [listVersions        ： 查询版本列表](./commands/listVersions.md)
- [publishVersion      ： 创建版本](./commands/publishVersion.md)
- [putProvisionConfig  ： 预留配置](./commands/putProvisionConfig.md)       
- [updateAlias         ： 更新别名](./commands/updateAlias.md)
- [updateCustomDomain  ： 更新自定义域名](./commands/updateCustomDomain.md)
- [updateFunction      ： 更新函数](./commands/updateFunction.md) 
- [updateService       ： 更新服务配置](./commands/updateService.md)
- [updateTrigger       ： 更新触发器](./commands/updateTrigger.md)
- [appendRoutes        ： 追加路径配置](./commands/appendRoutes.md)
