import { ComponentInputs } from './interface';
import BaseComponent from './base';
export declare function input(prompt?: string): Promise<any>;
export default class FunctionCompute extends BaseComponent {
    protected inputs: any;
    protected client: any;
    constructor(inputs: any);
    private getConfigFromFile;
    private writeToFile;
    /**
     * 设置阿里云函数计算的默认值
     * @param inputs
     * @returns
     */
    set(inputs: ComponentInputs): Promise<any>;
    /**
     * 获取所配置的阿里云函数计算默认值
     * @param inputs
     * @returns
     */
    get(inputs: {}): Promise<any>;
    private getClient;
    private fetchData;
    private index;
    /**
     * 查询服务列表
     */
    listServices(inputs?: ComponentInputs): Promise<any>;
    /**
     * 查询函数列表
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier --limit --nextToken --prefix --startKey
     */
    listFunctions(inputs?: ComponentInputs): Promise<any>;
    /**
     * 查询触发器列表
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listTriggers(inputs?: ComponentInputs): Promise<any>;
    /**
     * 查询别名列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listAliases(inputs?: ComponentInputs): Promise<any>;
    /**
     * 查询版本列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listVersions(inputs?: ComponentInputs): Promise<any>;
    /**
     * 查询自定义域名列表
     * @typeParam Required
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listCustomDomains(inputs?: ComponentInputs): Promise<any>;
    /**
     * 查询预留配置列表
     * @param inputs
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    listProvisionConfigs(inputs?: ComponentInputs): Promise<any>;
    /**
     * 查询异步配置列表
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken
     */
    listFunctionAsyncConfigs(inputs?: ComponentInputs): Promise<any>;
    /**
     * 获取服务配置信息
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier
     */
    getService(inputs?: ComponentInputs): Promise<any>;
    /**
     * 获取函数配置信息
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    getFunction(inputs?: ComponentInputs): Promise<any>;
    /**
     * 获取函数 Code 信息
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    getFunctionCode(inputs?: ComponentInputs): Promise<any>;
    /**
     * 获取触发器配置信息
     * @param inputs '{"serviceName": "","functionName": "", "triggerName": ""}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    getTrigger(inputs?: ComponentInputs): Promise<any>;
    /**
     * 获取别名信息
     * @param inputs '{"serviceName": "","aliasName": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    getAlias(inputs?: ComponentInputs): Promise<any>;
    /**
     * 获取自定义域名信息
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional
     */
    getCustomDomain(inputs?: ComponentInputs): Promise<any>;
    /**
     * 获取预留配置信息
     * @param inputs '{"serviceName": "","functionName": "","qualifier": 1}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    getProvisionConfig(inputs?: ComponentInputs): Promise<any>;
    /**
     * 获取函数异步调用配置信息
     * @param inputs '{"serviceName": "","functionName": "","qualifier": 1}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    getFunctionAsyncConfig(inputs?: ComponentInputs): Promise<any>;
    /**
     * 调用执行函数
     * @param inputs '{"serviceName": "","functionName": "","event": {"key":"value"}}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier --even
     */
    invokeFunction(inputs?: ComponentInputs): Promise<any>;
    /**
     * 删除服务
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional
     */
    deleteService(inputs?: ComponentInputs): Promise<string>;
    /**
     * 删除函数
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional
     */
    deleteFunction(inputs?: ComponentInputs): Promise<string>;
    /**
     * 删除触发器
     * @param inputs '{"serviceName": "fcls","functionName":"ggk", "triggerName":"test3"}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    deleteTrigger(inputs?: ComponentInputs): Promise<string>;
    /**
     * 删除自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional
     */
    deleteCustomDomain(inputs?: ComponentInputs): Promise<string>;
    /**
     * 删除版本
     * @param inputs '{"serviceName": "","versionId":""}'
     * @typeParam Required --serviceName --versionId
     * @typeParam Optional
     */
    deleteVersion(inputs?: ComponentInputs): Promise<string>;
    /**
     * 删除别名
     * @param inputs '{"serviceName": "","aliasName":""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    deleteAlias(inputs?: ComponentInputs): Promise<string>;
    /**
     * 删除函数异步配置
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    deleteFunctionAsyncConfig(inputs?: ComponentInputs): Promise<string>;
    /**
     * 创建服务
     * @param inputs '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    createService(inputs: ComponentInputs, defaultServiceName: string): Promise<any>;
    /**
     * 更新服务配置
     * @param inputs '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    updateService(inputs?: ComponentInputs): Promise<any>;
    /**
     * 创建函数
     * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.js"}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    createFunction(inputs?: ComponentInputs): Promise<any>;
    /**
     * 更新函数
     * @param inputs '{"serviceName": "","functionName": "","handler":"index.handler","runtime": "nodejs8","code":{"ossBucketName": "","ossObjectName":""}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort --code --handler --runtime
     */
    updateFunction(inputs?: ComponentInputs): Promise<any>;
    /**
     * 创建触发器
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": "{}"'
     * @typeParam Required --serviceName --functionName --triggerName --triggerType
     * @typeParam Optional --invocationRole --qualifier --sourceArn --triggerConfig
     */
    createTrigger(inputs?: ComponentInputs): Promise<any>;
    /**
     * 更新触发器
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": "{}"'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional --invocationRole --qualifier --triggerConfig
     */
    updateTrigger(inputs?: ComponentInputs): Promise<any>;
    /**
     * 创建版本
     * @param inputs '{"serviceName": "","description": ""}'
     * @typeParam Required --serviceName --description
     * @typeParam Optional
     */
    publishVersion(inputs?: ComponentInputs): Promise<any>;
    /**
     * 创建别名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --aliasName --versionId
     * @typeParam Optional --additionalVersionWeight --description
     */
    createAlias(inputs?: ComponentInputs): Promise<any>;
    /**
     * 创建别名通过最新版本
     * @param inputs '{"serviceName": "","aliasName": "","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional --additionalVersionWeight --description
     */
    createAliasWithNewVersion(inputs?: ComponentInputs): Promise<any>;
    /**
     * 更新别名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {},"description": ""}'
     * @typeParam Required --serviceName --aliasName --versionId
     * @typeParam Optional --additionalVersionWeight --description
     */
    updateAlias(inputs?: ComponentInputs): Promise<any>;
    /**
     * 更新别名通过最新版本
     * @param inputs '{"serviceName": "","aliasName": "", "additionalVersionWeight": {}, "description": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional --additionalVersionWeight --description
     */
    updateAliasWithNewVersion(inputs?: ComponentInputs): Promise<any>;
    /**
     * 创建自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    createCustomDomain(inputs?: ComponentInputs): Promise<any>;
    /**
     * 更新自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    updateCustomDomain(inputs?: ComponentInputs): Promise<any>;
    /**
     * 追加路径配置
     * @param inputs '{"domainName": "","appendRouteConfig": "[]"}'
     * @typeParam Required --domainName --routeConfig
     * @typeParam Optional
     */
    appendRoutes(inputs?: ComponentInputs): Promise<any>;
    /**
     * 预留配置
     * @param inputs '{"serviceName": "","functionName": "","qualifier": "1"}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --target --scheduledActions --targetTrackingPolicies
     */
    putProvisionConfig(inputs?: ComponentInputs): Promise<any>;
    /**
     * 函数异步配置
     * @param inputs '{"serviceName": "","functionName": "","qualifier": "1"}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --destinationConfig --maxAsyncEventAgeInSeconds --maxAsyncRetryAttempts
     */
    putFunctionAsyncConfig(inputs?: ComponentInputs): Promise<any>;
    /**
     * 创建函数，如不指定服务名称，会默认创建一个服务名称为 'Service'+functionName
     * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.js"}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    createFunctionDefaultService(inputs?: ComponentInputs): Promise<any>;
}
