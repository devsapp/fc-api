import { ApiGetAndListParmas, ApiCreateServiceAndUpdateServiceParmas, ApiCreateFunctionAndUpdateFunction, ApiCreateTriggerAndUpdateTrigger, ApiPublishVersionAndCreateAlias, ApiCustomDomain, ProvisionConfig, FunctionAsyncInvokeConfig } from './interface';
import BaseComponent from './base';
export default class FunctionCompute extends BaseComponent {
    constructor(props: any);
    /**
     * 请求list相关api
     * @param {string} api 判断调用的api
     * @param {string} field 返回列表数据的固定字段
     * @param {string} nextToken
     * @param {number} limit
     * @param {string} serverName
     * @param {string} qualifier
     * @@return {Promise} 返回查询指定api的列表信息
     */
    private fetchData;
    /**
     * 查询服务列表
     * @param inputs
     */
    listServices(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 查询函数列表
     * @param inputs s cli fc listFunctions -p '{"serviceName": ""}'
     * @typeParam Required --functionName
     * @typeParam Optional --qualifier --limit --nextToken --prefix --startKey
     */
    listFunctions(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 查询触发器列表
     * @param inputs s cli fc listTriggers -p '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listTriggers(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 查询别名列表
     * @param inputs s cli fc listAliases -p '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listAliases(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 查询版本列表
     * @param inputs s cli fc listVersions -p '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listVersions(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 查询自定义域名列表
     * @param inputs s cli fc listCustomDomains
     * @typeParam Required
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listCustomDomains(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 查询预留配置列表
     * @param inputs s cli fc listProvisionConfigs
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listProvisionConfigs(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 查询异步配置列表
     * @param inputs s cli fc listCustomDomains -p '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken
     */
    listFunctionAsyncConfigs(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 获取服务配置信息
     * @param inputs s cli fc getService -p '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier
     */
    getService(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 获取函数配置信息
     * @param inputs s cli fc getFunction -p '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    getFunction(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 获取函数 Code 信息
     * @param inputs s cli fc getFunctionCode -p '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    getFunctionCode(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 获取触发器配置信息
     * @param inputs s cli fc getTrigger -p '{"serviceName": "test","functionName": "", "triggerName": ""}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    getTrigger(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 获取 alias 信息
     * @param inputs s cli fc getAlias -p '{"serviceName": "","aliasName": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    getAlias(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 获取自定义域名信息
     * @param inputs s cli fc getCustomDomain -p '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional
     */
    getCustomDomain(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 获取预留配置信息
     * @param inputs s cli fc getProvisionConfig -p '{"serviceName": "","functionName": "","qualifier": 1}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    getProvisionConfig(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 获取函数异步调用配置信息
     * @param inputs s cli fc getFunctionAsyncConfig -p '{"serviceName": "","functionName": "","qualifier": 1}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    getFunctionAsyncConfig(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 调用执行函数
     * @param inputs s cli fc invokeFunction -p '{"serviceName": "","functionName": "","event": {"key":"value"}}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier --even
     */
    invokeFunction(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 删除服务
     * @param inputs s cli fc deleteService -p '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional
     */
    deleteService(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 删除函数
     * @param inputs s cli fc deleteFunction -p '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional
     */
    deleteFunction(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 删除触发器
     * @param inputs s cli fc deleteTrigger -p '{"serviceName": "fcls","functionName":"ggk", "triggerName":"test3"}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    deleteTrigger(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 删除自定义域名
     * @param inputs s cli fc deleteCustomDomain -p '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional
     */
    deleteCustomDomain(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 删除版本
     * @param inputs s cli fc deleteVersion -p '{"serviceName": "","versionId":""}'
     * @typeParam Required --serviceName --versionId
     * @typeParam Optional
     */
    deleteVersion(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 删除别名
     * @param inputs s cli fc deleteAlias -p '{"serviceName": "","aliasName":""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    deleteAlias(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 删除函数异步配置
     * @param inputs s cli fc deleteFunctionAsyncConfig -p '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    deleteFunctionAsyncConfig(inputs?: ApiGetAndListParmas): Promise<any>;
    /**
     * 创建服务
     * @param inputs s cli fc createService -p '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    createService(inputs?: ApiCreateServiceAndUpdateServiceParmas): Promise<any>;
    /**
     * 更新服务配置
     * @param inputs  s cli fc updateService -p '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    updateService(inputs?: ApiCreateServiceAndUpdateServiceParmas): Promise<any>;
    /**
     * 创建函数
     * @param inputs  s cli fc createFunction -p '{"serviceName": "","functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"ossBucketName": "","ossObjectName":""}}'
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    createFunction(inputs?: ApiCreateFunctionAndUpdateFunction): Promise<any>;
    /**
     * 更新函数
     * @param inputs  s cli fc updateFunction -p '{"serviceName": "","functionName": "","handler":"index.handler","runtime": "nodejs8","code":{"ossBucketName": "","ossObjectName":""}}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort --code --handler --runtime
     */
    updateFunction(inputs?: ApiCreateFunctionAndUpdateFunction): Promise<any>;
    /**
     * 创建触发器
     * @param inputs  s cli fc createTrigger -p '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": {}'
     * @typeParam Required --serviceName --functionName --triggerName --triggerType
     * @typeParam Optional --invocationRole --qualifier --sourceArn --triggerConfig
     */
    createTrigger(inputs?: ApiCreateTriggerAndUpdateTrigger): Promise<any>;
    /**
     * 更新触发器
     * @param inputs  s cli fc updateTrigger -p '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": {}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional --invocationRole --qualifier --triggerConfig
     */
    updateTrigger(inputs?: ApiCreateTriggerAndUpdateTrigger): Promise<any>;
    /**
     * 创建版本
     * @param inputs  s cli fc publishVersion -p '{"serviceName": "","description": ""}'
     * @typeParam Required --serviceName --description
     * @typeParam Optional
     */
    publishVersion(inputs?: ApiPublishVersionAndCreateAlias): Promise<any>;
    /**
     * 创建别名
     * @param inputs  s cli fc createAlias -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --aliasName --versionId
     * @typeParam Optional --additionalVersionWeight --description
     */
    createAlias(inputs?: ApiPublishVersionAndCreateAlias): Promise<any>;
    /**
     * 更新别名
     * @param inputs  s cli fc updateAlias -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {},"description": ""}'
     * @typeParam Required --serviceName --aliasName --versionId
     * @typeParam Optional --additionalVersionWeight --description
     */
    updateAlias(inputs?: ApiPublishVersionAndCreateAlias): Promise<any>;
    /**
     * 创建自定义域名
     * @param inputs  s cli fc createCustomDomain -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    createCustomDomain(inputs?: ApiCustomDomain): Promise<any>;
    /**
     * 更新自定义域名
     * @param inputs  s cli fc updateCustomDomain -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    updateCustomDomain(inputs?: ApiCustomDomain): Promise<any>;
    /**
     * 预留配置
     * @param inputs  s cli fc putProvisionConfig -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --target --scheduledActions --targetTrackingPolicies
     */
    putProvisionConfig(inputs?: ProvisionConfig): Promise<any>;
    /**
     * 函数异步配置
     * @param inputs  s cli f c putFunctionAsyncConfig -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --destinationConfig --maxAsyncEventAgeInSeconds --maxAsyncRetryAttempts
     */
    putFunctionAsyncConfig(inputs?: FunctionAsyncInvokeConfig): Promise<any>;
}
