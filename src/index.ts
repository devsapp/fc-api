import {reportComponent, getCredential, commandParse, help} from '@serverless-devs/core'
import fc from '@alicloud/fc2'
import readline from 'readline'
import { getFcEndpoint } from './endpoint'
const fs = require('fs');
const yaml = require('js-yaml');
import {
    ComponentInputs
} from './interface'
import BaseComponent from './base'
// @ts-ignore
const {spawnSync} = require('child_process');
const defaultConfigFileObject = process.env.HOME + '/.s/.fc.api.default.yaml'
let result: any
let resultData: string[] = []
let _limit: Number | null
let _nextToken, _prefix, _startKey: string | null

export function input(prompt: string = ""): Promise<any> {
    return new Promise((resolve: (value: string) => void): void => {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.setPrompt(prompt);
        rl.prompt();
        rl.on("line", (line: string): void => {
            rl.close();
            resolve(line);
        });
    });
}


export default class FunctionCompute extends BaseComponent {
    protected client

    constructor(protected inputs) {
        super()
    }

    private async getConfigFromFile() {
        let yamlData
        try {
            yamlData = await yaml.load(fs.readFileSync(defaultConfigFileObject, 'utf8'))
        } catch (e) {
            yamlData = {"region": "cn-hangzhou", "access": "default"}
        }
        return yamlData
    }

    private async writeToFile(key: string, value: string) {
        const config = await this.getConfigFromFile()
        config[key] = value
        await fs.writeFileSync(defaultConfigFileObject, yaml.dump(config));
        return true
    }

    /**
     * 设置阿里云函数计算的默认值
     * @param inputs
     * @returns
     */
    async set(inputs: ComponentInputs) {
        reportComponent('fc-api', {
            command: 'set',
            uid: '',
        });
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api set [type] [value]`
            },
                {
                    header: 'Examples',
                    content: [
                        {
                            desc: 'region',
                            example: 'The region of fc endpoint.'
                        },
                        {
                            desc: 'access',
                            example: 'Specify the key name.'
                        },
                        {
                            desc: 'serviceName',
                            example: 'Specify the serviceName.'
                        },
                        {
                            desc: 'functionName',
                            example: 'Specify the functionName.'
                        }
                    ],
                },]);
            return;
        }
        if (comParse.data && comParse.data['_'].length > 0) {
            if (comParse.data['_'][0] == "region") {
                await this.writeToFile("region", comParse.data['_'][1])
            }
            if (comParse.data['_'][0] == "access") {
                await this.writeToFile("access", comParse.data['_'][1])
            }
            if (comParse.data['_'][0] == "functionName") {
                await this.writeToFile("functionName", comParse.data['_'][1])
            }
            if (comParse.data['_'][0] == "serviceName") {
                await this.writeToFile("serviceName", comParse.data['_'][1])
            }
        }

        // @ts-ignore
        if (comParse.data.region) {
            // @ts-ignore
            await this.writeToFile("region", comParse.data.region)
        }
        // @ts-ignore
        if (comParse.data.access) {
            // @ts-ignore
            await this.writeToFile("access", comParse.data.access)
        }
        // @ts-ignore
        if (comParse.data.functionName) {
            // @ts-ignore
            await this.writeToFile("functionName", comParse.data.functionName)
        }
        // @ts-ignore
        if (comParse.data.serviceName) {
            // @ts-ignore
            await this.writeToFile("serviceName", comParse.data.serviceName)
        }

        return await this.getConfigFromFile();
    }

    /**
     * 获取所配置的阿里云函数计算默认值
     * @param inputs
     * @returns
     */
    async get(inputs: {}) {
        reportComponent('fc-api', {
            command: 'get',
            uid: '',
        });
        return await this.getConfigFromFile()
    }

    private async getClient(region, access) {
        if (!this.client) {
            const defaultData = await this.get({})
            const customEndpoint = await getFcEndpoint();
            // TODO: 自定义
            if (!access) {
                access = defaultData.access
                console.log(`  🔑 Using default access: ${access}, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.`)
            }
            if (!(region || customEndpoint?.region)) {
                region = defaultData.region
                console.log(`  🌍 Using default region: ${region}, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.`)
            }
            const {AccountID, AccessKeyID, AccessKeySecret, SecurityToken} = (await getCredential(access)) as any
            const uid = customEndpoint?.accountId || AccountID;
            reportComponent('fc-api', {uid, command: 's cli'})
            this.client = new fc(uid, {
                accessKeyID: AccessKeyID,
                accessKeySecret: AccessKeySecret,
                securityToken: SecurityToken,
                region: customEndpoint?.region || region || 'cn-hangzhou',
                timeout: 6000000,
                endpoint: customEndpoint?.fcEndpoint,
            })
        }
    }

    private async fetchData(access: string, region: string, api: string, field: string, nextToken: string, limit: number, serviceName?: string, functionName?: string, qualifier?: number) {
        resultData = []
        let start = true
        while (start || _nextToken) {
            start = false
            let optional: any = {
                limit: _limit,
                nextToken: _nextToken,
                prefix: _prefix,
                startKey: _startKey,
            }
            await this.getClient(region, access)
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
            resultData = resultData.concat(result.data[field])
            if (typeof nextToken === 'undefined' && typeof limit === 'undefined') {
                _nextToken = result.data.nextToken ? result.data.nextToken : null
            } else {
                _nextToken = null
            }
        }
        return yaml.dump(resultData)
    }

    private async index(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const newInputs = inputs
        let addContent = ""
        if (newInputs.project['access']) {
            addContent = ` -a ${newInputs.project['access']}`
        }
        console.log(` _____     __       ____  ____   ____ 
|     |   /  ]     /    ||    \\ |    |
|   __|  /  /     |  o  ||  o  ) |  | 
|  |_   /  /      |     ||   _/  |  | 
|   _] /   \\_     |  _  ||  |    |  | 
|  |   \\     |    |  |  ||  |    |  | 
|__|    \\____|    |__|__||__|   |____|
                                      `)
        console.log("🎼 If you need help, you could input 'help'. ")
        console.log("🎼 You can use FC API to operate directly.")
        console.log("🎼 For example: [listServices]")
        console.log("🎼 Quit: control + c/z")
        while (true) {
            const commandData = await input('> ')
            if (commandData) {
                spawnSync(`s cli fc-api ${commandData === "help" ? "-h" : commandData}${addContent}`, [], {
                    cwd: './',
                    stdio: 'inherit',
                    shell: true
                });
            } else {
                console.log("")
            }
        }

    }

    /**
     * 查询服务列表
     */
    public async listServices(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listServices\n API Document: https://help.aliyun.com/document_detail/175559.htm`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {limit, nextToken, prefix, startKey, region} = Object.assign(inputs.props, comParse.data || {})
        let access = inputs.credentials.Alias
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData(access, region, 'listServices', 'services', nextToken, limit)
    }

    /**
     * 查询函数列表
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier --limit --nextToken --prefix --startKey
     */
    public async listFunctions(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listFunctions\n API Document: https://help.aliyun.com/document_detail/191155.htm`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        console.log(inputs)
        let {limit, nextToken, prefix, startKey, serviceName, qualifier, region} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName})) return
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData(access, region, 'listFunctions', 'functions', nextToken, limit, serviceName, null, qualifier)
    }

    /**
     * 查询触发器列表
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listTriggers(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listTriggers\n API Document: https://help.aliyun.com/document_detail/191158.htm`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {limit, nextToken, prefix, startKey, serviceName, functionName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        if (this.checkField({serviceName, functionName})) return
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        let access = inputs.credentials.Alias
        return this.fetchData(access, region, 'listTriggers', 'triggers', nextToken, limit, serviceName, functionName)
    }

    /**
     * 查询别名列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listAliases(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listAliases\nAPI Document: https://help.aliyun.com/document_detail/191166.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {limit, nextToken, prefix, startKey, serviceName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName})) return
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData(access, region, 'listAliases', 'aliases', nextToken, limit, serviceName)
    }

    /**
     * 查询版本列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listVersions(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listVersions\nAPI Document: https://help.aliyun.com/document_detail/191162.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {limit, nextToken, prefix, startKey, serviceName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName})) return
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData(access, region, 'listVersions', 'versions', nextToken, limit, serviceName)
    }

    /**
     * 查询自定义域名列表
     * @typeParam Required
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listCustomDomains(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listCustomDomains\nAPI Document: https://help.aliyun.com/document_detail/191170.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        const {limit, nextToken, prefix, startKey, region,} = Object.assign(inputs.props, comParse.data || {})
        let access = inputs.credentials.Alias
        _nextToken = nextToken
        _limit = limit || 100
        _prefix = prefix
        _startKey = startKey
        return this.fetchData(access, region, 'listCustomDomains', 'customDomains', nextToken, limit)
    }

    /**
     * 查询预留配置列表
     * @param inputs
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    public async listProvisionConfigs(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listProvisionConfigs\nAPI Document: https://help.aliyun.com/document_detail/191174.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {limit, nextToken, serviceName, qualifier, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        _nextToken = nextToken
        _limit = limit || 100
        return this.fetchData(access, region, 'listProvisionConfigs', 'provisionConfigs', nextToken, limit, serviceName, null, qualifier)
    }

    /**
     * 查询异步配置列表
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken
     */
    public async listFunctionAsyncConfigs(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api listFunctionAsyncConfigs\nAPI Document: https://help.aliyun.com/document_detail/181754.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {limit, nextToken, serviceName, functionName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        _nextToken = nextToken
        _limit = limit || 100
        return this.fetchData(access, region, 'listFunctionAsyncConfigs', 'configs', nextToken, limit, serviceName, functionName)
    }

    /**
     * 获取服务配置信息
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier
     */
    public async getService(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getService\nAPI Document: https://help.aliyun.com/document_detail/189225.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, qualifier, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName})) return
        try {
            await this.getClient(region, access)
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
    public async getFunction(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getFunction\nAPI Document: https://help.aliyun.com/document_detail/189985.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, qualifier, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient(region, access)
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
    public async getFunctionCode(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getFunctionCode\nAPI Document: https://help.aliyun.com/document_detail/191154.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, qualifier, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.getFunctionCode(serviceName, functionName, {}, qualifier)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取触发器配置信息
     * @param inputs '{"serviceName": "","functionName": "", "triggerName": ""}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    public async getTrigger(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getTrigger\nAPI Document: https://help.aliyun.com/document_detail/190056.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, triggerName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName, triggerName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.getTrigger(serviceName, functionName, triggerName)
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 获取别名信息
     * @param inputs '{"serviceName": "","aliasName": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    public async getAlias(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getAlias\nAPI Document: https://help.aliyun.com/document_detail/191165.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, aliasName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, aliasName})) return
        try {
            await this.getClient(region, access)
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
    public async getCustomDomain(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getCustomDomain\nAPI Document: https://help.aliyun.com/document_detail/191169.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        const {domainName, region,} = Object.assign(inputs.props, comParse.data || {})
        let access = inputs.credentials.Alias
        if (this.checkField({domainName})) return
        try {
            await this.getClient(region, access)
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
    public async getProvisionConfig(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getProvisionConfig\nAPI Document: https://help.aliyun.com/document_detail/191173.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, qualifier, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName, qualifier})) return
        try {
            await this.getClient(region, access)
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
    public async getFunctionAsyncConfig(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {

        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api getFunctionAsyncConfig\nAPI Document: https://help.aliyun.com/document_detail/181753.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, qualifier, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName, qualifier})) return
        try {
            await this.getClient(region, access)
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
    public async invokeFunction(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api invokeFunction\nAPI Document: https://help.aliyun.com/document_detail/191156.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, event, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient(region, access)
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
    public async deleteService(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteService\nAPI Document: https://help.aliyun.com/document_detail/189227.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName})) return
        try {
            await this.getClient(region, access)
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
    public async deleteFunction(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteFunction\nAPI Document: https://help.aliyun.com/document_detail/191153.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient(region, access)
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
    public async deleteTrigger(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteTrigger\nAPI Document: https://help.aliyun.com/document_detail/191157.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, triggerName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName, triggerName})) return
        try {
            await this.getClient(region, access)
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
    public async deleteCustomDomain(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteCustomDomain\nAPI Document: https://help.aliyun.com/document_detail/191167.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        const {domainName, region,} = Object.assign(inputs.props, comParse.data || {})
        let access = inputs.credentials.Alias
        if (this.checkField({domainName})) return
        try {
            await this.getClient(region, access)
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
    public async deleteVersion(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteVersion\nAPI Document: https://help.aliyun.com/document_detail/191161.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, versionId, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, versionId})) return
        try {
            await this.getClient(region, access)
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
    public async deleteAlias(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteAlias\nAPI Document: https://help.aliyun.com/document_detail/191163.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, aliasName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, aliasName})) return
        try {
            await this.getClient(region, access)
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
    public async deleteFunctionAsyncConfig(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api deleteFunctionAsyncConfig\nAPI Document: https://help.aliyun.com/document_detail/181755.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, qualifier, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient(region, access)
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
    public async createService(inputs: ComponentInputs = {
        argsObj: undefined,
        credentials: undefined
    }, defaultServiceName: string) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createService\nAPI Document: https://help.aliyun.com/document_detail/175256.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            description: '[JSON String] The log configuration. This parameter specifies a Logstore to store function execution logs.',
                            type: String,
                        },
                        {
                            name: 'nasConfig',
                            description: '[JSON String] The Apsara File Storage NAS (NAS) file system configuration, which enables a function to access the specified NAS file system.',
                            type: String,
                        },
                        {
                            name: 'vpcConfig',
                            description: '[JSON String] The VPC configuration, which enables a function to access the specified VPC.',
                            type: String,
                        },
                        {
                            name: 'tracingConfig',
                            description: '[JSON String] The configuration of Tracing Analysis. After Function Compute integrates with Tracing Analysis, you can record the stay time of a request in Function Compute, view the cold start time for a function, and record the execution time of a function. For more information.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        let {serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        let sName: string = defaultServiceName ? defaultServiceName : serviceName
        if (this.checkField({sName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.createService(sName, {
                description: String(description),
                internetAccess: internetAccess === "false" ? false : true,
                role,
                logConfig: logConfig ? (typeof logConfig == 'string' ? JSON.parse(logConfig) : logConfig) : undefined,
                nasConfig: nasConfig ? (typeof nasConfig == 'string' ? JSON.parse(nasConfig) : nasConfig) : undefined,
                vpcConfig: vpcConfig ? (typeof vpcConfig == 'string' ? JSON.parse(vpcConfig) : vpcConfig) : undefined,
                tracingConfig: tracingConfig ? (typeof tracingConfig == 'string' ? JSON.parse(tracingConfig) : tracingConfig) : undefined,
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
    public async updateService(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateService\nAPI Document: https://help.aliyun.com/document_detail/188167.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            description: '[JSON String] The log configuration. This parameter specifies a Logstore to store function execution logs.',
                            type: String,
                        },
                        {
                            name: 'nasConfig',
                            description: '[JSON String] The Apsara File Storage NAS (NAS) file system configuration, which enables a function to access the specified NAS file system.',
                            type: String,
                        },
                        {
                            name: 'vpcConfig',
                            description: '[JSON String] The VPC configuration, which enables a function to access the specified VPC.',
                            type: String,
                        },
                        {
                            name: 'tracingConfig',
                            description: '[JSON String] The configuration of Tracing Analysis. After Function Compute integrates with Tracing Analysis, you can record the stay time of a request in Function Compute, view the cold start time for a function, and record the execution time of a function. For more information.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        let {serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.updateService(serviceName, {
                description: String(description),
                role,
                internetAccess: internetAccess === "false" ? false : true,
                logConfig: logConfig ? (typeof logConfig == 'string' ? JSON.parse(logConfig) : logConfig) : undefined,
                nasConfig: nasConfig ? (typeof nasConfig == 'string' ? JSON.parse(nasConfig) : nasConfig) : undefined,
                vpcConfig: vpcConfig ? (typeof vpcConfig == 'string' ? JSON.parse(vpcConfig) : vpcConfig) : undefined,
                tracingConfig: tracingConfig ? (typeof tracingConfig == 'string' ? JSON.parse(tracingConfig) : tracingConfig) : undefined,
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
    public async createFunction(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createFunction\nAPI Document: https://help.aliyun.com/document_detail/189984.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            description: '[JSON String] The code of the function. The code must be packaged into a ZIP file.',
                            type: String,
                        },
                        {
                            name: 'customContainerConfig',
                            description: '[JSON String] The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
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
                            type: Number,
                        },
                        {
                            name: 'initializer',
                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                            type: String,
                        },
                        {
                            name: 'memorySize',
                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                            type: Number,
                        },
                        {
                            name: 'runtime',
                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                            type: String,
                        },
                        {
                            name: 'timeout',
                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                            type: Number,
                        },
                        {
                            name: 'caPort',
                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                            type: Number,
                        },
                    ],
                },]);
            return;
        }
        let {serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        let functionCode: any = {}
        if (this.checkField({serviceName, functionName, code, handler, runtime})) return
        let tempCode = undefined
        if(typeof code == 'string'){
            try{
                tempCode = JSON.parse(code)
            }catch (e){
                tempCode = code
            }
        }
        code = code ? tempCode : undefined
        if (code && code.ossBucketName && code.ossObjectName) {
            functionCode.ossBucketName = code.ossBucketName
            functionCode.ossObjectName = code.ossObjectName
            delete functionCode.zipFile
        }
        if (code && code.zipFile) {
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
            await this.getClient(region, access)
            result = await this.client.createFunction(serviceName, {
                functionName,
                code: Object.keys(functionCode).length > 0 ? functionCode : undefined,
                customContainerConfig: customContainerConfig ? (typeof customContainerConfig == 'string' ? JSON.parse(customContainerConfig) : customContainerConfig) : undefined,
                description: String(description),
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
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort --code --handler --runtime
     */
    public async updateFunction(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateFunction\nAPI Document: https://help.aliyun.com/document_detail/189986.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            description: '[JSON String] The code of the function. The code must be packaged into a ZIP file.',
                            type: String,
                        },
                        {
                            name: 'customContainerConfig',
                            description: '[JSON String] The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
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
                            type: Number,
                        },
                        {
                            name: 'initializer',
                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                            type: String,
                        },
                        {
                            name: 'memorySize',
                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                            type: Number,
                        },
                        {
                            name: 'runtime',
                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                            type: String,
                        },
                        {
                            name: 'timeout',
                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                            type: Number,
                        },
                        {
                            name: 'caPort',
                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                            type: Number,
                        },
                    ],
                },]);
            return;
        }
        let {serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let tempCode = undefined
        if(typeof code == 'string'){
            try{
                tempCode = JSON.parse(code)
            }catch (e){
                tempCode = code
            }
        }

        code = code ? tempCode : undefined

        let functionCode: any = {}
        if (code && code.ossBucketName && code.ossObjectName) {
            functionCode.ossBucketName = code.ossBucketName
            functionCode.ossObjectName = code.ossObjectName
            delete functionCode.zipFile
        }
        if (code && code.zipFile) {
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
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.updateFunction(serviceName, functionName, {
                code: Object.keys(functionCode).length > 0 ? functionCode : undefined,
                customContainerConfig: customContainerConfig ? (typeof customContainerConfig == 'string' ? JSON.parse(customContainerConfig) : customContainerConfig) : undefined,
                description: String(description),
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
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": "{}"'
     * @typeParam Required --serviceName --functionName --triggerName --triggerType
     * @typeParam Optional --invocationRole --qualifier --sourceArn --triggerConfig
     */
    public async createTrigger(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createTrigger\nAPI Document: https://help.aliyun.com/document_detail/190054.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, invocationRole, qualifier, sourceArn, triggerConfig, triggerName, triggerType, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName, triggerName, triggerType})) return
        try {
            await this.getClient(region, access)
            result = await this.client.createTrigger(serviceName, functionName, {
                invocationRole,
                qualifier: qualifier ? qualifier.toString() : undefined,
                sourceArn,
                triggerConfig: triggerConfig ? (typeof triggerConfig == 'string' ? JSON.parse(triggerConfig) : triggerConfig ) : undefined,
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
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": "{}"'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional --invocationRole --qualifier --triggerConfig
     */
    public async updateTrigger(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateTrigger\nAPI Document: https://help.aliyun.com/document_detail/190055.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, functionName, invocationRole, qualifier, triggerConfig, triggerName, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName, triggerName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.updateTrigger(serviceName, functionName, triggerName, {
                invocationRole,
                qualifier,
                triggerConfig: triggerConfig ? (typeof triggerConfig == 'string' ? JSON.parse(triggerConfig) : triggerConfig ) : undefined,
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
    public async publishVersion(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api publishVersion\nAPI Document: https://help.aliyun.com/document_detail/191160.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        let {serviceName, description, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.publishVersion(serviceName, String(description))
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
    public async createAlias(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createAlias\nAPI Document: https://help.aliyun.com/document_detail/162952.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            description: '[JSON String] The additional version to which the alias points and the weight of the additional version.',
                            type: String,
                        },
                        {
                            name: 'description',
                            description: 'The description of the alias.',
                            type: String,
                        }],
                },]);
            return;
        }

        let {serviceName, aliasName, versionId, additionalVersionWeight, description, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, aliasName, versionId})) return
        try {
            await this.getClient(region, access)
            result = await this.client.createAlias(serviceName, aliasName, String(versionId), {
                additionalVersionWeight: typeof additionalVersionWeight == 'object' ? additionalVersionWeight : JSON.parse(additionalVersionWeight || '{}'),
                description: String(description),
            })

            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建别名通过最新版本
     * @param inputs '{"serviceName": "","aliasName": "","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional --additionalVersionWeight --description
     */
    public async createAliasWithNewVersion(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createAliasWithNewVersion\nAPI Document: https://help.aliyun.com/document_detail/162952.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

                            type: String,
                        },
                        {
                            name: 'serviceName',
                            description: 'The name of the service.',
                            type: String,
                        },
                        {
                            name: 'additionalVersionWeight',
                            description: `[JSON String] The additional version to which the alias points and the weight of the additional version. `,
                            type: String,
                        },
                        {
                            name: 'aliasName',
                            description: 'The name of the alias.',
                            type: String,
                        },
                        {
                            name: 'description',
                            description: 'The description of the alias.',
                            type: String,
                        }],
                },]);
            return;
        }

        let {serviceName, aliasName, additionalVersionWeight, description, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        const versions = yaml.load(await this.listVersions(inputs))
        const versionId = versions.length > 0 ? versions[0].versionId : undefined
        if (this.checkField({serviceName, aliasName, versionId})) return
        try {
            await this.getClient(region, access)
            result = await this.client.createAlias(serviceName, aliasName, String(versionId), {
                additionalVersionWeight: typeof additionalVersionWeight == 'object' ? additionalVersionWeight : JSON.parse(additionalVersionWeight || '{}'),
                description: String(description),
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
    public async updateAlias(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateAlias\nAPI Document: https://help.aliyun.com/document_detail/191164.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            description: `[JSON String] The additional version to which the alias points and the weight of the additional version. `,
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
        let {serviceName, aliasName, versionId, additionalVersionWeight, description, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, aliasName, versionId})) return
        try {
            await this.getClient(region, access)
            result = await this.client.updateAlias(serviceName, aliasName, String(versionId), {
                additionalVersionWeight: typeof additionalVersionWeight == 'object' ? additionalVersionWeight : JSON.parse(additionalVersionWeight || '{}'),
                description: String(description),
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 更新别名通过最新版本
     * @param inputs '{"serviceName": "","aliasName": "", "additionalVersionWeight": {}, "description": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional --additionalVersionWeight --description
     */
    public async updateAliasWithNewVersion(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateAliasWithNewVersion\nAPI Document: https://help.aliyun.com/document_detail/191164.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            name: 'additionalVersionWeight',
                            description: `[JSON String] The additional version to which the alias points and the weight of the additional version. `,
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
        let {serviceName, aliasName, additionalVersionWeight, description, region,} = Object.assign(inputs.props, comParse.data || {})
        const versions = yaml.load(await this.listVersions(inputs))
        const versionId = versions.length > 0 ? versions[0].versionId : undefined
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, aliasName, versionId})) return
        try {
            await this.getClient(region, access)
            result = await this.client.updateAlias(serviceName, aliasName, String(versionId), {
                additionalVersionWeight: typeof additionalVersionWeight == 'object' ? additionalVersionWeight : JSON.parse(additionalVersionWeight || '{}'),
                description: String(description),
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 创建自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    public async createCustomDomain(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createCustomDomain\nAPI Document: https://help.aliyun.com/document_detail/175234.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        const {domainName, protocol, certConfig, routeConfig, region,} = Object.assign(inputs.props, comParse.data || {})
        let access = inputs.credentials.Alias
        if (this.checkField({domainName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.createCustomDomain(domainName, {
                protocol,
                certConfig: certConfig ? (typeof certConfig == 'string' ? JSON.parse(certConfig) : certConfig) : undefined,
                routeConfig: routeConfig ? (typeof routeConfig == 'string' ? JSON.parse(routeConfig) : routeConfig) : undefined,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 更新自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    public async updateCustomDomain(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api updateCustomDomain\nAPI Document: https://help.aliyun.com/document_detail/191168.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
        const {domainName, protocol, certConfig, routeConfig, region,} = Object.assign(inputs.props, comParse.data || {})
        let access = inputs.credentials.Alias
        if (this.checkField({domainName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.updateCustomDomain(domainName, {
                protocol,
                certConfig: certConfig ? (typeof certConfig == 'string' ? JSON.parse(certConfig) : certConfig) : undefined,
                routeConfig: routeConfig ? (typeof routeConfig == 'string' ? JSON.parse(routeConfig) : routeConfig ) : undefined,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }


    /**
     * 追加路径配置
     * @param inputs '{"domainName": "","appendRouteConfig": "[]"}'
     * @typeParam Required --domainName --routeConfig
     * @typeParam Optional
     */
    public async appendRoutes(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api appendRoutes\nAPI Document: https://help.aliyun.com/document_detail/191168.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

                            type: String,
                        },
                        {
                            name: 'domainName',
                            description: 'The domain name.',
                            type: String,
                        },
                        {
                            name: 'appendRouteConfig',
                            description: 'The route table that maps paths to functions when the functions are invoked by using the custom domain name.',
                            type: String,
                        }
                    ],
                },]);
            return;
        }
        const {domainName, appendRouteConfig, region,} = Object.assign(inputs.props, comParse.data || {})
        let access = inputs.credentials.Alias
        if (this.checkField({domainName})) return

        // 获取domain详情
        try {
            await this.getClient(region, access)
            result = await this.client.getCustomDomain(domainName)
        } catch (error) {
            this.errorReport(error)
            throw error
        }

        const alreadyRouteConfig = result['data']['routeConfig']['routes']
        const targetRouteConfigPath = []
        const targetRouteConfigList = []
        const inputRouteConfig = JSON.parse(appendRouteConfig)
        for(let i =0;i<inputRouteConfig.length;i++){
            if(!targetRouteConfigPath.includes(inputRouteConfig[i].path)){
                targetRouteConfigList.push(inputRouteConfig[i])
                targetRouteConfigPath.push(inputRouteConfig[i].path)
            }
        }
        for(let i =0;i<alreadyRouteConfig.length;i++){
            if(!targetRouteConfigPath.includes(alreadyRouteConfig[i].path)){
                targetRouteConfigList.push(alreadyRouteConfig[i])
                targetRouteConfigPath.push(alreadyRouteConfig[i].path)
            }
        }

        try {
            await this.getClient(region, access)
            result = await this.client.updateCustomDomain(domainName, {
                routeConfig: {
                    "routes": targetRouteConfigList
                }
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }


    /**
     * 预留配置
     * @param inputs '{"serviceName": "","functionName": "","qualifier": "1"}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --target --scheduledActions --targetTrackingPolicies
     */
    public async putProvisionConfig(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api putProvisionConfig\nAPI Document: https://help.aliyun.com/document_detail/191172.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            type: Number,
                        },
                        {
                            name: 'scheduledActions',
                            description: '[JSON String] The configuration of scheduled auto scaling. You can perform scheduled auto scaling to flexibly configure provisioned instances. You can configure the number of provisioned instances to be automatically adjusted to a specified value at a specified time. This way, the number of provisioned instances can meet the concurrency of your business.',
                            type: String,
                        },
                        {
                            name: 'targetTrackingPolicies',
                            description: '[Json String] The configuration of metric tracking auto scaling. Provisioned instances are scaled in or out every minute based on the concurrency utilization of provisioned instances.',
                            type: String,
                        },
                    ],
                },]);
            return;
        }
        let {serviceName, functionName, qualifier, target, scheduledActions, targetTrackingPolicies, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.putProvisionConfig(serviceName, functionName, qualifier, {
                target,
                scheduledActions: scheduledActions ? (typeof scheduledActions == 'string' ? JSON.parse(scheduledActions) : scheduledActions) : undefined,
                targetTrackingPolicies: targetTrackingPolicies ? (typeof targetTrackingPolicies == 'string' ? JSON.parse(targetTrackingPolicies) : targetTrackingPolicies) : undefined,
            })
            return yaml.dump(result.data)
        } catch (error) {
            this.errorReport(error)
            throw error
        }
    }

    /**
     * 函数异步配置
     * @param inputs '{"serviceName": "","functionName": "","qualifier": "1"}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --destinationConfig --maxAsyncEventAgeInSeconds --maxAsyncRetryAttempts
     */
    public async putFunctionAsyncConfig(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api putFunctionAsyncConfig\nAPI Document: https://help.aliyun.com/document_detail/181752.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            description: '[JSON String] The configuration structure of the destination for asynchronous invocation.',
                            type: String,
                        },
                        {
                            name: 'maxAsyncEventAgeInSeconds',
                            description: 'The validity period of requests. Valid values: 1 to 2592000. Unit: seconds.',
                            type: Number,
                        },
                        {
                            name: 'maxAsyncRetryAttempts',
                            description: 'The maximum number of retries after an asynchronous invocation fails. Default value: 3. Valid values: 0 to 8.',
                            type: Number,
                        },
                    ],
                },]);
            return;
        }
        let {serviceName, functionName, qualifier, destinationConfig, maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({serviceName, functionName})) return
        try {
            await this.getClient(region, access)
            result = await this.client.putFunctionAsyncConfig(serviceName, functionName, qualifier, {
                destinationConfig: destinationConfig ? (typeof destinationConfig == 'string' ? JSON.parse(destinationConfig) : destinationConfig) : undefined,
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

    public async createFunctionDefaultService(inputs: ComponentInputs = {argsObj: undefined, credentials: undefined}) {
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        // @ts-ignore
        const comParse = commandParse({args: inputs.args, argsObj: inputs.argsObj}, apts);
        // @ts-ignore
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-api createFunctionDefaultService\nAPI Document: https://help.aliyun.com/document_detail/189984.html`
            },
                {
                    header: 'Options',
                    optionList: [
                        {
                            name: 'region',
                            description: 'The region of fc endpoint.',

                            type: String,
                        },
                        {
                            name: 'access',
                            description: 'Specify the key name.',

                            type: String,
                        },
                        {
                            name: 'props',
                            description: 'The json string of props.',

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
                            description: '[JSON String] The code of the function. The code must be packaged into a ZIP file.',
                            type: String,
                        },
                        {
                            name: 'customContainerConfig',
                            description: '[JSON String] The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
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
                            type: Number,
                        },
                        {
                            name: 'initializer',
                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                            type: String,
                        },
                        {
                            name: 'memorySize',
                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                            type: Number,
                        },
                        {
                            name: 'runtime',
                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                            type: String,
                        },
                        {
                            name: 'timeout',
                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                            type: Number,
                        },
                        {
                            name: 'caPort',
                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                            type: Number,
                        },
                    ],
                },]);
            return;
        }
        let {serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region,} = Object.assign(inputs.props, comParse.data || {})
        const defaultData = await this.get({})
        if(!serviceName){
            serviceName = defaultData.serviceName
            console.log(`  🥺 Using default serviceName: ${serviceName}, If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.`)
        }
        if(!functionName){
            functionName = defaultData.functionName
            console.log(`  🥺 Using default serviceName: ${functionName}, If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.`)
        }
        let access = inputs.credentials.Alias
        if (this.checkField({functionName, code, handler, runtime})) return
        let tempCode = undefined
        if(typeof code == 'string'){
            try{
                tempCode = JSON.parse(code)
            }catch (e){
                tempCode = code
            }
        }
        code = code ? tempCode : undefined
        let defaultServiceName: string = serviceName
        if (!serviceName || serviceName.length === 0) {
            defaultServiceName = `Service${functionName}`
            await this.createService(inputs, defaultServiceName)
        }
        let functionCode: any = {}
        if (code && code.ossBucketName && code.ossObjectName) {
            functionCode.ossBucketName = code.ossBucketName
            functionCode.ossObjectName = code.ossObjectName
            delete functionCode.zipFile
        }
        let codeFize: any
        if (code && code.zipFile) {
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
            await this.getClient(region, access)
            result = await this.client.createFunction(defaultServiceName, {
                functionName,
                code: Object.keys(functionCode).length > 0 ? functionCode : undefined,
                customContainerConfig: customContainerConfig ? (typeof customContainerConfig == 'string' ? JSON.parse(customContainerConfig) : customContainerConfig) : undefined,
                description: String(description),
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
