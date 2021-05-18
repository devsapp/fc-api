import {reportComponent, getCredential, commandParse, help} from '@serverless-devs/core'
import fc from '@alicloud/fc2'
import yaml from 'js-yaml'
import {
    ComponentInputs
} from './interface'
import BaseComponent from './base'

let result: any
let resultData: string[] = []
let _limit: Number | null
let _nextToken, _prefix, _startKey: string | null

export default class FunctionCompute extends BaseComponent {
    protected client

    constructor(protected inputs) {
        super()
    }

    private async getClient() {
        if (!this.client) {
            const {region, access = 'default'} = this.inputs
            const {AccountID, AccessKeyID, AccessKeySecret} = (await getCredential(access)) as any
            reportComponent('fc-api', {uid: AccountID, command: 's cli'})
            this.client = new fc(AccountID, {
                accessKeyID: AccessKeyID,
                accessKeySecret: AccessKeySecret,
                securityToken: '',
                region: region || 'cn-hangzhou',
                timeout: 6000000,
            })
        }
    }

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
    private async fetchData(api: string, field: string, nextToken: string, limit: number, serviceName?: string, functionName?: string, qualifier?: number) {
        let optional: any = {
            limit: _limit,
            nextToken: _nextToken,
            prefix: _prefix,
            startKey: _startKey,
        }
        await this.getClient()
        const switchApi = {
            listServices: async () => {
                result = await this.client[api]({...optional})
            },
            listFunctions: async () => {
                result = await this.client[api](serviceName, {...optional}, {}, qualifier)
            },
            listTriggers: async () => {
                result = await this.client[api](serviceName, functionName, {...optional})
            },
            listAliases: async () => {
                result = await this.client[api](serviceName, {...optional})
            },
            listVersions: async () => {
                result = await this.client[api](serviceName, {...optional})
            },
            listCustomDomains: async () => {
                result = await this.client[api]({...optional})
            },
            listProvisionConfigs: async () => {
                result = await this.client[api]({limit: _limit, nextToken: _nextToken, serviceName, qualifier})
            },
            listFunctionAsyncConfigs: async () => {
                result = await this.client[api](serviceName, functionName, {limit: _limit, nextToken: _nextToken})
            },
        }
        await switchApi[api].call(this)
        try {
            do {
                resultData = resultData.concat(result.data[field])
                if (typeof nextToken === 'undefined' && typeof limit === 'undefined') {
                    _nextToken = result.data.nextToken ? result.data.nextToken : null
                } else {
                    _nextToken = null
                }
            } while (_nextToken)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
        return yaml.dump(resultData)
    }

    /**
     * 查询服务列表
     * @param inputs
     */
    public async listServices(inputs: ComponentInputs = {}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listServices`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {limit, nextToken, prefix, startKey} = inputs.props
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData('listServices', 'services', nextToken, limit)
    }

    /**
     * 查询函数列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier --limit --nextToken --prefix --startKey
     */
    public async listFunctions(inputs: ComponentInputs = {}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listFunctions`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'limit',
                            description: 'The maximum number of resources to be returned. Default value: 20. Maximum value: 100. The number of returned resources is smaller than or equal to the specified number.',
                            type: String,
                        },
                        {
                            name: 'nextToken',
                            description: 'The token used to obtain more results. If the number of resources exceeds the limit, the nextToken parameter is returned. Include this parameter in subsequent calls to obtain more results. You do not need to provide this parameter in the first call.',
                            type: String,
                        },
                        {
                            name: 'prefix',
                            description: 'The prefix that the names of returned resources must contain.',
                            type: String,
                        },
                        {
                            name: 'startKey',
                            description: 'The start position of the result list. Results are in alphabetical order and the results that follow startKey (inclusive) are listed.',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
                        {
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {limit, nextToken, prefix, startKey, serviceName, qualifier} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName})) return
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData('listFunctions', 'functions', nextToken, limit, serviceName, null, qualifier)
    }

    /**
     * 查询触发器列表
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listTriggers(inputs: ComponentInputs = {}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listTriggers`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'limit',
                            description: 'The maximum number of resources to be returned. Default value: 20. Maximum value: 100. The number of returned resources is smaller than or equal to the specified number.',
                            type: String,
                        },
                        {
                            name: 'nextToken',
                            description: 'The token used to obtain more results. If the number of resources exceeds the limit, the nextToken parameter is returned. Include this parameter in subsequent calls to obtain more results. You do not need to provide this parameter in the first call.',
                            type: String,
                        },
                        {
                            name: 'prefix',
                            description: 'The prefix that the names of returned resources must contain.',
                            type: String,
                        },
                        {
                            name: 'startKey',
                            description: 'The start position of the result list. Results are in alphabetical order and the results that follow startKey (inclusive) are listed.',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
                        {
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {limit, nextToken, prefix, startKey, serviceName, functionName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData('listTriggers', 'triggers', nextToken, limit, serviceName, functionName)
    }

    /**
     * 查询别名列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listAliases(inputs: ComponentInputs = {}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listAliases`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'limit',
                            description: 'The maximum number of resources to be returned. Default value: 20. Maximum value: 100. The number of returned resources is smaller than or equal to the specified number.',
                            type: String,
                        },
                        {
                            name: 'nextToken',
                            description: 'The token used to obtain more results. If the number of resources exceeds the limit, the nextToken parameter is returned. Include this parameter in subsequent calls to obtain more results. You do not need to provide this parameter in the first call.',
                            type: String,
                        },
                        {
                            name: 'prefix',
                            description: 'The prefix that the names of returned resources must contain.',
                            type: String,
                        },
                        {
                            name: 'startKey',
                            description: 'The start position of the result list. Results are in alphabetical order and the results that follow startKey (inclusive) are listed.',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {limit, nextToken, prefix, startKey, serviceName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName})) return
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData('listAliases', 'aliases', nextToken, limit, serviceName)
    }

    /**
     * 查询版本列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listVersions(inputs: ComponentInputs = {}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listVersions`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'limit',
                            description: 'The maximum number of resources to be returned. Default value: 20. Maximum value: 100. The number of returned resources is smaller than or equal to the specified number.',
                            type: String,
                        },
                        {
                            name: 'nextToken',
                            description: 'The token used to obtain more results. If the number of resources exceeds the limit, the nextToken parameter is returned. Include this parameter in subsequent calls to obtain more results. You do not need to provide this parameter in the first call.',
                            type: String,
                        },
                        {
                            name: 'prefix',
                            description: 'The prefix that the names of returned resources must contain.',
                            type: String,
                        },
                        {
                            name: 'startKey',
                            description: 'The start position of the result list. Results are in alphabetical order and the results that follow startKey (inclusive) are listed.',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {limit, nextToken, prefix, startKey, serviceName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName})) return
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData('listVersions', 'versions', nextToken, limit, serviceName)
    }

    /**
     * 查询自定义域名列表
     * @param inputs
     * @typeParam Required
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listCustomDomains(inputs: ComponentInputs = {}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listCustomDomains`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'limit',
                            description: 'The maximum number of resources to be returned. Default value: 20. Maximum value: 100. The number of returned resources is smaller than or equal to the specified number.',
                            type: String,
                        },
                        {
                            name: 'nextToken',
                            description: 'The token used to obtain more results. If the number of resources exceeds the limit, the nextToken parameter is returned. Include this parameter in subsequent calls to obtain more results. You do not need to provide this parameter in the first call.',
                            type: String,
                        },
                        {
                            name: 'prefix',
                            description: 'The prefix that the names of returned resources must contain.',
                            type: String,
                        },
                        {
                            name: 'startKey',
                            description: 'The start position of the result list. Results are in alphabetical order and the results that follow startKey (inclusive) are listed.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {limit, nextToken, prefix, startKey} = Object.assign(inputs.props,  comParse.data || {})
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData('listCustomDomains', 'customDomains', nextToken, limit)
    }

    /**
     * 查询预留配置列表
     * @param inputs
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listProvisionConfigs(inputs: ComponentInputs = {}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listCustomDomains`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'limit',
                            description: 'The maximum number of resources to be returned. Default value: 20. Maximum value: 100. The number of returned resources is smaller than or equal to the specified number.',
                            type: String,
                        },
                        {
                            name: 'nextToken',
                            description: 'The token used to obtain more results. If the number of resources exceeds the limit, the nextToken parameter is returned. Include this parameter in subsequent calls to obtain more results. You do not need to provide this parameter in the first call.',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
                        {
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {limit, nextToken, serviceName, qualifier} = Object.assign(inputs.props,  comParse.data || {})
        _nextToken = nextToken
        _limit = limit || 100
        return this.fetchData('listProvisionConfigs', 'provisionConfigs', nextToken, limit, serviceName, null, qualifier)
    }

    /**
     * 查询异步配置列表
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken
     */
    public async listFunctionAsyncConfigs(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listFunctionAsyncConfigs`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'limit',
                            description: 'The maximum number of resources to be returned. Default value: 20. Maximum value: 100. The number of returned resources is smaller than or equal to the specified number.',
                            type: String,
                        },
                        {
                            name: 'nextToken',
                            description: 'The token used to obtain more results. If the number of resources exceeds the limit, the nextToken parameter is returned. Include this parameter in subsequent calls to obtain more results. You do not need to provide this parameter in the first call.',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
                        {
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {limit, nextToken, serviceName, functionName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        _nextToken = nextToken
        _limit = limit || 100
        return this.fetchData('listFunctionAsyncConfigs', 'configs', nextToken, limit, serviceName, functionName)
    }

    /**
     * 获取服务配置信息
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier
     */
    public async getService(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getService`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
                        {
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {serviceName, qualifier} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName})) return
        try {
            await this.getClient()
            result = await this.client.getService(serviceName, {}, qualifier)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取函数配置信息
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    public async getFunction(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getFunction`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
                        {
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, qualifier} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient()
            result = await this.client.getFunction(serviceName, functionName, {}, qualifier)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取函数 Code 信息
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    public async getFunctionCode(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getFunctionCode`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
                        {
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, qualifier} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient()
            result = await this.client.getFunctionCode(serviceName, functionName, {}, qualifier)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取触发器配置信息
     * @param inputs '{"serviceName": "test","functionName": "", "triggerName": ""}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    public async getTrigger(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getTrigger`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
                        {
                            name: 'triggerName',
                            description: 'The name of the trigger.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, triggerName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName, triggerName})) return
        try {
            await this.getClient()
            result = await this.client.getTrigger(serviceName, functionName, triggerName)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取 alias 信息
     * @param inputs '{"serviceName": "","aliasName": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    public async getAlias(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getAlias`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
                        {
                            name: 'aliasName',
                            description: 'The name of the alias.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {serviceName, aliasName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, aliasName})) return
        try {
            await this.getClient()
            result = await this.client.getAlias(serviceName, aliasName)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取自定义域名信息
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional
     */
    public async getCustomDomain(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getCustomDomain`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'domainName',
                            description: 'The name of the domain.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {domainName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({domainName})) return
        try {
            await this.getClient()
            result = await this.client.getCustomDomain(domainName)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取预留配置信息
     * @param inputs '{"serviceName": "","functionName": "","qualifier": 1}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    public async getProvisionConfig(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getProvisionConfig`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
						{
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, qualifier} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName, qualifier})) return
        try {
            await this.getClient()
            result = await this.client.getProvisionConfig(serviceName, functionName, qualifier)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取函数异步调用配置信息
     * @param inputs '{"serviceName": "","functionName": "","qualifier": 1}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    public async getFunctionAsyncConfig(inputs: ComponentInputs = {}) {

    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getFunctionAsyncConfig`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
						{
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, qualifier} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName, qualifier})) return
        try {
            await this.getClient()
            result = await this.client.getFunctionAsyncConfig(serviceName, functionName, qualifier)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 调用执行函数
     * @param inputs '{"serviceName": "","functionName": "","event": {"key":"value"}}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier --even
     */
    public async invokeFunction(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api invokeFunction`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
						{
                            name: 'event',
                            description: 'The event of the function. The value of this parameter is a binary array. Function Compute passes the event to the function for processing.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, event} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient()
            result = await this.client.invokeFunction(serviceName, functionName, JSON.stringify(event))
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 删除服务
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional
     */
    public async deleteService(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteService`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName})) return
        try {
            await this.getClient()
            result = await this.client.deleteService(serviceName)
            if (typeof result.data !== 'undefined' && result.data !== null) return this.deleteSuccessInfo('Service', serviceName)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 删除函数
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional
     */
    public async deleteFunction(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteFunction`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient()
            result = await this.client.deleteFunction(serviceName, functionName)
            if (typeof result.data !== 'undefined' && result.data !== null) return this.deleteSuccessInfo('Function', functionName)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 删除触发器
     * @param inputs '{"serviceName": "fcls","functionName":"ggk", "triggerName":"test3"}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    public async deleteTrigger(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteTrigger`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
						{
                            name: 'triggerName',
                            description: 'The name of the trigger.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, triggerName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName, triggerName})) return
        try {
            await this.getClient()
            result = await this.client.deleteTrigger(serviceName, functionName, triggerName)
            if (typeof result.data !== 'undefined' && result.data !== null) return this.deleteSuccessInfo('Trigger', triggerName)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 删除自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional
     */
    public async deleteCustomDomain(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteCustomDomain`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'domainName',
                            description: 'The name of the domain.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {domainName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({domainName})) return
        try {
            await this.getClient()
            result = await this.client.deleteCustomDomain(domainName)
            if (typeof result.data !== 'undefined' && result.data !== null) return this.deleteSuccessInfo('CustomDomain', domainName)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 删除版本
     * @param inputs '{"serviceName": "","versionId":""}'
     * @typeParam Required --serviceName --versionId
     * @typeParam Optional
     */
    public async deleteVersion(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteVersion`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'versionId',
                            description: 'The version of the service.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, versionId} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, versionId})) return
        try {
            await this.getClient()
            result = await this.client.deleteVersion(serviceName, versionId)
            if (typeof result.data !== 'undefined' && result.data !== null) return this.deleteSuccessInfo('Version', versionId)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 删除别名
     * @param inputs '{"serviceName": "","aliasName":""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    public async deleteAlias(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteAlias`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'aliasName',
                            description: 'The name of the alias.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, aliasName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, aliasName})) return
        try {
            await this.getClient()
            result = await this.client.deleteAlias(serviceName, aliasName)
            if (typeof result.data !== 'undefined' && result.data !== null) return this.deleteSuccessInfo('Alias', aliasName)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 删除函数异步配置
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    public async deleteFunctionAsyncConfig(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteFunctionAsyncConfig`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
						{
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, qualifier} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient()
            result = await this.client.deleteFunctionAsyncConfig(serviceName, functionName, qualifier)
            if (typeof result.data !== 'undefined' && result.data !== null) return this.deleteSuccessInfo('Function', 'AsyncConfig')
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建服务
     * @param inputs '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    public async createService(inputs: ComponentInputs = {}, defaultServiceName: string) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createService`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'description',
                            description: 'The description of the service.',
                            type: String,
                        },
						{
                            name: 'internetAccess',
                            description: 'Specifies whether to allow functions to access the Internet. Valid values: true/false',
                            type: String,
                        },
						{
                            name: 'role',
                            description: 'The RAM role that is used to grant required permissions to Function Compute. The role is used in the following scenarios: 1）Sends logs generated by a function to your Logstore. 2）Generates a token for a function to access other cloud resources during function execution.',
                            type: String,
                        },
						{
                            name: 'logConfig',
                            description: 'The log configuration. This parameter specifies a Logstore to store function execution logs.',
                            type: String,
                        },
						{
                            name: 'nasConfig',
                            description: 'The Apsara File Storage NAS (NAS) file system configuration, which enables a function to access the specified NAS file system.',
                            type: String,
                        },
						{
                            name: 'vpcConfig',
                            description: 'The VPC configuration, which enables a function to access the specified VPC.',
                            type: String,
                        },
						{
                            name: 'tracingConfig',
                            description: 'The configuration of Tracing Analysis. After Function Compute integrates with Tracing Analysis, you can record the stay time of a request in Function Compute, view the cold start time for a function, and record the execution time of a function. For more information.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig} = Object.assign(inputs.props,  comParse.data || {})
        let sName: string = defaultServiceName ? defaultServiceName : serviceName
        if (this.checkField({sName})) return
        try {
            await this.getClient()
            result = await this.client.createService(sName, {
                description,
                internetAccess,
                role,
                logConfig,
                nasConfig,
                vpcConfig,
                tracingConfig,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 更新服务配置
     * @param inputs '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    public async updateService(inputs: ComponentInputs = {}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateService`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'description',
                            description: 'The description of the service.',
                            type: String,
                        },
						{
                            name: 'internetAccess',
                            description: 'Specifies whether to allow functions to access the Internet. Valid values: true/false',
                            type: String,
                        },
						{
                            name: 'role',
                            description: 'The RAM role that is used to grant required permissions to Function Compute. The role is used in the following scenarios: 1）Sends logs generated by a function to your Logstore. 2）Generates a token for a function to access other cloud resources during function execution.',
                            type: String,
                        },
						{
                            name: 'logConfig',
                            description: 'The log configuration. This parameter specifies a Logstore to store function execution logs.',
                            type: String,
                        },
						{
                            name: 'nasConfig',
                            description: 'The Apsara File Storage NAS (NAS) file system configuration, which enables a function to access the specified NAS file system.',
                            type: String,
                        },
						{
                            name: 'vpcConfig',
                            description: 'The VPC configuration, which enables a function to access the specified VPC.',
                            type: String,
                        },
						{
                            name: 'tracingConfig',
                            description: 'The configuration of Tracing Analysis. After Function Compute integrates with Tracing Analysis, you can record the stay time of a request in Function Compute, view the cold start time for a function, and record the execution time of a function. For more information.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
    	const {serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName})) return
        try {
            await this.getClient()
            result = await this.client.updateService(serviceName, {
                description,
                internetAccess,
                role,
                logConfig,
                nasConfig,
                vpcConfig,
                tracingConfig,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建函数
     * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.js"}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    public async createFunction(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createFunction`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The description of the function.',
                            type: String,
                        },
						{
                            name: 'code',
                            description: 'The code of the function. The code must be packaged into a ZIP file.',
                            type: String,
                        },
						{
                            name: 'customContainerConfig',
                            description: 'The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
                            type: String,
                        },
						{
                            name: 'description',
                            description: 'The description of the function.',
                            type: String,
                        },
						{
                            name: 'handler',
                            description: 'The handler of the function. The format is determined by the programming language.',
                            type: String,
                        },
						{
                            name: 'initializationTimeout',
                            description: 'The timeout period for Function Compute to run the initializer function. Unit: seconds. Default value: 3. Valid values: 1 to 300. When this period expires, the execution of the initializer function is terminated.',
                            type: String,
                        },
						{
                            name: 'initializer',
                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                            type: String,
                        },
						{
                            name: 'memorySize',
                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                            type: String,
                        },
						{
                            name: 'runtime',
                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                            type: String,
                        },
						{
                            name: 'timeout',
                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                            type: String,
                        },
						{
                            name: 'caPort',
                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort} = Object.assign(inputs.props,  comParse.data || {})
        let functionCode: any = {}
        if (this.checkField({serviceName, functionName, code, handler, runtime})) return
        if (code.ossBucketName && code.ossObjectName) {
            functionCode.ossBucketName = code.ossBucketName
            functionCode.ossObjectName = code.ossObjectName
            delete functionCode.zipFile
        }
        if (code.zipFile) {
            let codeFize: any
            if (code.zipFile.includes('.zip') || code.zipFile.includes('.jar')) {
                codeFize = await this.getZipFile(code.zipFile)
            } else {
                codeFize = await this.startZip(code.zipFile)
            }
            if (!codeFize) return
            functionCode.zipFile = codeFize
            delete functionCode.ossBucketName
            delete functionCode.ossObjectName
        }
        try {
            await this.getClient()
            result = await this.client.createFunction(serviceName, {
                functionName,
                code: functionCode,
                customContainerConfig,
                description,
                handler,
                initializationTimeout,
                initializer,
                memorySize,
                runtime,
                timeout,
                caPort,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 更新函数
     * @param inputs '{"serviceName": "","functionName": "","handler":"index.handler","runtime": "nodejs8","code":{"ossBucketName": "","ossObjectName":""}}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort --code --handler --runtime
     */
    public async updateFunction(inputs: ComponentInputs = {}) {
           	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateFunction`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The description of the function.',
                            type: String,
                        },
						{
                            name: 'code',
                            description: 'The code of the function. The code must be packaged into a ZIP file.',
                            type: String,
                        },
						{
                            name: 'customContainerConfig',
                            description: 'The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
                            type: String,
                        },
						{
                            name: 'description',
                            description: 'The description of the function.',
                            type: String,
                        },
						{
                            name: 'handler',
                            description: 'The handler of the function. The format is determined by the programming language.',
                            type: String,
                        },
						{
                            name: 'initializationTimeout',
                            description: 'The timeout period for Function Compute to run the initializer function. Unit: seconds. Default value: 3. Valid values: 1 to 300. When this period expires, the execution of the initializer function is terminated.',
                            type: String,
                        },
						{
                            name: 'initializer',
                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                            type: String,
                        },
						{
                            name: 'memorySize',
                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                            type: String,
                        },
						{
                            name: 'runtime',
                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                            type: String,
                        },
						{
                            name: 'timeout',
                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                            type: String,
                        },
						{
                            name: 'caPort',
                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
    	const {serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient()
            result = await this.client.updateFunction(serviceName, functionName, {
                code,
                customContainerConfig,
                description,
                handler,
                initializationTimeout,
                initializer,
                memorySize,
                runtime,
                timeout,
                caPort,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建触发器
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": {}'
     * @typeParam Required --serviceName --functionName --triggerName --triggerType
     * @typeParam Optional --invocationRole --qualifier --sourceArn --triggerConfig
     */
    public async createTrigger(inputs: ComponentInputs = {}) {
    	          	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createTrigger`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The description of the function.',
                            type: String,
                        },
						{
                            name: 'invocationRole',
                            description: 'The role required when the trigger source such as OSS invokes the function. ',
                            type: String,
                        },
						{
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        },
						{
                            name: 'sourceArn',
                            description: 'The Alibaba Cloud Resource Name (ARN) of the event source for the trigger.',
                            type: String,
                        },
						{
                            name: 'triggerConfig',
                            description: 'The configurations of the trigger. The configurations vary with trigger types.',
                            type: String,
                        },
						{
                            name: 'triggerName',
                            description: 'The name of the trigger.',
                            type: String,
                        },
						{
                            name: 'triggerType',
                            description: 'The type of the trigger: oss/log/timer/http/tablestore/cdn_events/mns_topic.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, invocationRole, qualifier, sourceArn, triggerConfig, triggerName, triggerType} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName, triggerName, triggerType, invocationRole})) return
        try {
            await this.getClient()
            result = await this.client.createTrigger(serviceName, functionName, {
                invocationRole,
                qualifier,
                sourceArn,
                triggerConfig,
                triggerName,
                triggerType,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 更新触发器
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": {}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional --invocationRole --qualifier --triggerConfig
     */
    public async updateTrigger(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateTrigger`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The description of the function.',
                            type: String,
                        },
						{
                            name: 'invocationRole',
                            description: 'The role required when the trigger source such as OSS invokes the function. ',
                            type: String,
                        },
						{
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        },
						{
                            name: 'sourceArn',
                            description: 'The Alibaba Cloud Resource Name (ARN) of the event source for the trigger.',
                            type: String,
                        },
						{
                            name: 'triggerConfig',
                            description: 'The configurations of the trigger. The configurations vary with trigger types.',
                            type: String,
                        },
						{
                            name: 'triggerName',
                            description: 'The name of the trigger.',
                            type: String,
                        },
						{
                            name: 'triggerType',
                            description: 'The type of the trigger: oss/log/timer/http/tablestore/cdn_events/mns_topic.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, invocationRole, qualifier, triggerConfig, triggerName} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName, triggerName})) return
        try {
            await this.getClient()
            result = await this.client.updateTrigger(serviceName, functionName, triggerName, {
                invocationRole,
                qualifier,
                triggerConfig,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建版本
     * @param inputs '{"serviceName": "","description": ""}'
     * @typeParam Required --serviceName --description
     * @typeParam Optional
     */
    public async publishVersion(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api publishVersion`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'description',
                            description: 'The description of the service version.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {serviceName, description} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName})) return
        try {
            await this.getClient()
            result = await this.client.publishVersion(serviceName, description)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建别名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --aliasName --versionId
     * @typeParam Optional --additionalVersionWeight --description
     */
    public async createAlias(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createAlias`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'aliasName',
                            description: 'The name of the alias.',
                            type: String,
                        },
						{
                            name: 'versionId',
                            description: 'The version to which the alias points.',
                            type: String,
                        },
						{
                            name: 'additionalVersionWeight',
                            description: 'The additional version to which the alias points and the weight of the additional version.',
                            type: String,
                        },
						{
                            name: 'description',
                            description: 'The description of the alias.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {serviceName, aliasName, versionId, additionalVersionWeight, description} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, aliasName, versionId})) return
        try {
            await this.getClient()
            result = await this.client.createAlias(serviceName, aliasName, versionId, {
                additionalVersionWeight: additionalVersionWeight || {},
                description,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 更新别名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {},"description": ""}'
     * @typeParam Required --serviceName --aliasName --versionId
     * @typeParam Optional --additionalVersionWeight --description
     */
    public async updateAlias(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateAlias`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'aliasName',
                            description: 'The name of the alias.',
                            type: String,
                        },
						{
                            name: 'versionId',
                            description: 'The version to which the alias points.',
                            type: String,
                        },
						{
                            name: 'additionalVersionWeight',
                            description: 'The additional version to which the alias points and the weight of the additional version.',
                            type: String,
                        },
						{
                            name: 'description',
                            description: 'The description of the alias.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {serviceName, aliasName, versionId, additionalVersionWeight, description} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, aliasName, versionId})) return
        try {
            await this.getClient()
            result = await this.client.updateAlias(serviceName, aliasName, versionId, {
                additionalVersionWeight,
                description,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建自定义域名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    public async createCustomDomain(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createCustomDomain`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'domainName',
                            description: 'The domain name.',
                            type: String,
                        },
						{
                            name: 'protocol',
                            description: 'The protocol types supported by the domain name. Valid values: HTTP/HTTP,HTTPS',
                            type: String,
                        },
						{
                            name: 'certConfig',
                            description: 'The configurations of the HTTPS certificate.',
                            type: String,
                        },
						{
                            name: 'routeConfig',
                            description: 'The route table that maps paths to functions when the functions are invoked by using the custom domain name.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {domainName, protocol, certConfig, routeConfig} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({domainName})) return
        try {
            await this.getClient()
            result = await this.client.createCustomDomain(domainName, {
                protocol,
                certConfig,
                routeConfig,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 更新自定义域名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    public async updateCustomDomain(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateCustomDomain`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'domainName',
                            description: 'The domain name.',
                            type: String,
                        },
						{
                            name: 'protocol',
                            description: 'The protocol types supported by the domain name. Valid values: HTTP/HTTP,HTTPS',
                            type: String,
                        },
						{
                            name: 'certConfig',
                            description: 'The configurations of the HTTPS certificate.',
                            type: String,
                        },
						{
                            name: 'routeConfig',
                            description: 'The route table that maps paths to functions when the functions are invoked by using the custom domain name.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {domainName, protocol, certConfig, routeConfig} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({domainName})) return
        try {
            await this.getClient()
            result = await this.client.updateCustomDomain(domainName, {
                protocol,
                certConfig,
                routeConfig,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 预留配置
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --target --scheduledActions --targetTrackingPolicies
     */
    public async putProvisionConfig(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api putProvisionConfig`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
						{
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        },
						{
                            name: 'target',
                            description: 'The expected number of provisioned instances.',
                            type: String,
                        },
                        {
                            name: 'scheduledActions',
                            description: 'The configuration of scheduled auto scaling. You can perform scheduled auto scaling to flexibly configure provisioned instances. You can configure the number of provisioned instances to be automatically adjusted to a specified value at a specified time. This way, the number of provisioned instances can meet the concurrency of your business.',
                            type: String,
                        },
						{
                            name: 'targetTrackingPolicies',
                            description: 'The configuration of metric tracking auto scaling. Provisioned instances are scaled in or out every minute based on the concurrency utilization of provisioned instances.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, qualifier, target, scheduledActions, targetTrackingPolicies} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient()
            result = await this.client.putProvisionConfig(serviceName, functionName, qualifier, {
                target,
                scheduledActions,
                targetTrackingPolicies,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 函数异步配置
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --destinationConfig --maxAsyncEventAgeInSeconds --maxAsyncRetryAttempts
     */
    public async putFunctionAsyncConfig(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api putFunctionAsyncConfig`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The name of the function.',
                            type: String,
                        },
						{
                            name: 'qualifier',
                            description: 'The version or alias of the service.',
                            type: String,
                        },
						{
                            name: 'destinationConfig',
                            description: 'The configuration structure of the destination for asynchronous invocation.',
                            type: String,
                        },
                        {
                            name: 'maxAsyncEventAgeInSeconds',
                            description: 'The validity period of requests. Valid values: 1 to 2592000. Unit: seconds.',
                            type: String,
                        },
						{
                            name: 'maxAsyncRetryAttempts',
                            description: 'The maximum number of retries after an asynchronous invocation fails. Default value: 3. Valid values: 0 to 8.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, qualifier, destinationConfig, maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient()
            result = await this.client.putFunctionAsyncConfig(serviceName, functionName, qualifier, {
                destinationConfig,
                maxAsyncEventAgeInSeconds,
                maxAsyncRetryAttempts,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建函数，如不指定服务名称，会默认创建一个服务名称为 'Service'+functionName
     * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.js"}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */

    public async createFunctionDefaultService(inputs: ComponentInputs = {}) {
    	const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createFunction`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'access',
                            description: 'Specify the key name.',
                            alias: 'a',
                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',
                            alias: 'p',
                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
						{
                            name: 'functionName',
                            description: 'The description of the function.',
                            type: String,
                        },
						{
                            name: 'code',
                            description: 'The code of the function. The code must be packaged into a ZIP file.',
                            type: String,
                        },
						{
                            name: 'customContainerConfig',
                            description: 'The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
                            type: String,
                        },
						{
                            name: 'description',
                            description: 'The description of the function.',
                            type: String,
                        },
						{
                            name: 'handler',
                            description: 'The handler of the function. The format is determined by the programming language.',
                            type: String,
                        },
						{
                            name: 'initializationTimeout',
                            description: 'The timeout period for Function Compute to run the initializer function. Unit: seconds. Default value: 3. Valid values: 1 to 300. When this period expires, the execution of the initializer function is terminated.',
                            type: String,
                        },
						{
                            name: 'initializer',
                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                            type: String,
                        },
						{
                            name: 'memorySize',
                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                            type: String,
                        },
						{
                            name: 'runtime',
                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                            type: String,
                        },
						{
                            name: 'timeout',
                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                            type: String,
                        },
						{
                            name: 'caPort',
                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        const {serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort} = Object.assign(inputs.props,  comParse.data || {})
        if (this.checkField({functionName, code, handler, runtime})) return
        let defaultServiceName: string = serviceName
        if (!serviceName || serviceName.length === 0) {
            defaultServiceName = `Service${functionName}`
            await this.createService(inputs, defaultServiceName)
        }
        let functionCode: any = {}
        if (code.ossBucketName && code.ossObjectName) {
            functionCode.ossBucketName = code.ossBucketName
            functionCode.ossObjectName = code.ossObjectName
            delete functionCode.zipFile
        }
        let codeFize: any
        if (code.zipFile) {
            if (code.zipFile.includes('.zip') || code.zipFile.includes('.jar')) {
                codeFize = await this.getZipFile(code.zipFile)
            } else {
                codeFize = await this.startZip(code.zipFile)
            }
            if (!codeFize) return
            functionCode.zipFile = codeFize
            delete functionCode.ossBucketName
            delete functionCode.ossObjectName
        }

        try {
            await this.getClient()
            result = await this.client.createFunction(defaultServiceName, {
                functionName,
                code: functionCode,
                customContainerConfig,
                description,
                handler,
                initializationTimeout,
                initializer,
                memorySize,
                runtime,
                timeout,
                caPort,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }
}
