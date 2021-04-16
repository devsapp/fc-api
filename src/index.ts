
import { reportComponent, getCredential } from '@serverless-devs/core'
import fc from '@alicloud/fc2'
import yaml from 'js-yaml'
import {
	ApiGetAndListParmas,
	ApiCreateServiceAndUpdateServiceParmas,
	ApiCreateFunctionAndUpdateFunction,
	ApiCreateTriggerAndUpdateTrigger,
	ApiPublishVersionAndCreateAlias,
	ApiCustomDomain,
	ProvisionConfig,
	FunctionAsyncInvokeConfig,
} from './interface'
import BaseComponent from './base'
let result: any
let resultData: string[] = []
let _limit: Number | null
let _nextToken, _prefix, _startKey: string | null

export default class FunctionCompute extends BaseComponent {

	protected client
	constructor(protected inputs) {
		super();
	}

	private async getClient() {
		if (!this.client) {
			const { region, access = 'default' } = this.inputs
			const { AccountID, AccessKeyID, AccessKeySecret } = await getCredential(access) as any
			reportComponent('S-FC', { uid: AccountID, command: 's cli' })
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
		await this.getClient();
		const switchApi = {
			listServices: async () => {
				result = await this.client[api]({ ...optional })
			},
			listFunctions: async () => {
				result = await this.client[api](serviceName, { ...optional }, {}, qualifier)
			},
			listTriggers: async () => {
				result = await this.client[api](serviceName, functionName, { ...optional })
			},
			listAliases: async () => {
				result = await this.client[api](serviceName, { ...optional })
			},
			listVersions: async () => {
				result = await this.client[api](serviceName, { ...optional })
			},
			listCustomDomains: async () => {
				result = await this.client[api]({ ...optional })
			},
			listProvisionConfigs: async () => {
				result = await this.client[api]({ limit: _limit, nextToken: _nextToken, serviceName, qualifier })
			},
			listFunctionAsyncConfigs: async () => {
				result = await this.client[api](serviceName, functionName, { limit: _limit, nextToken: _nextToken })
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
	public async listServices(inputs: ApiGetAndListParmas = {}) {
		const { limit, nextToken, prefix, startKey } = inputs
		_nextToken = nextToken
		_limit = limit || 100
		_prefix = prefix
		_startKey = startKey
		return this.fetchData('listServices', 'services', nextToken, limit)
	}

	/**
	 * 查询函数列表
	 * @param inputs '{"serviceName": ""}'
	 * @typeParam Required --functionName
	 * @typeParam Optional --qualifier --limit --nextToken --prefix --startKey
	 */
	public async listFunctions(inputs: ApiGetAndListParmas = {}) {
		const { limit, nextToken, prefix, startKey, serviceName, qualifier } = inputs
		if (this.checkField({ serviceName })) return
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
	public async listTriggers(inputs: ApiGetAndListParmas = {}) {
		const { limit, nextToken, prefix, startKey, serviceName, functionName } = inputs
		if (this.checkField({ serviceName, functionName })) return
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
	public async listAliases(inputs: ApiGetAndListParmas = {}) {
		const { limit, nextToken, prefix, startKey, serviceName } = inputs
		if (this.checkField({ serviceName })) return
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
	public async listVersions(inputs: ApiGetAndListParmas = {}) {
		const { limit, nextToken, prefix, startKey, serviceName } = inputs
		if (this.checkField({ serviceName })) return
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
	public async listCustomDomains(inputs: ApiGetAndListParmas = {}) {
		const { limit, nextToken, prefix, startKey } = inputs
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
	public async listProvisionConfigs(inputs: ApiGetAndListParmas = {}) {
		const { limit, nextToken, serviceName, qualifier } = inputs
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
	public async listFunctionAsyncConfigs(inputs: ApiGetAndListParmas = {}) {
		const { limit, nextToken, serviceName, functionName } = inputs
		if (this.checkField({ serviceName, functionName })) return
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
	public async getService(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, qualifier } = inputs
		if (this.checkField({ serviceName })) return
		try {
			await this.getClient();
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
	public async getFunction(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName, qualifier } = inputs
		if (this.checkField({ serviceName, functionName })) return
		try {
			await this.getClient();
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
	public async getFunctionCode(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName, qualifier } = inputs
		if (this.checkField({ serviceName, functionName })) return
		try {
			await this.getClient();
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
	public async getTrigger(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName, triggerName } = inputs
		if (this.checkField({ serviceName, functionName, triggerName })) return
		try {
			await this.getClient();
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
	public async getAlias(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, aliasName } = inputs
		if (this.checkField({ serviceName, aliasName })) return
		try {
			await this.getClient();
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
	public async getCustomDomain(inputs: ApiGetAndListParmas = {}) {
		const { domainName } = inputs
		if (this.checkField({ domainName })) return
		try {
			await this.getClient();
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
	public async getProvisionConfig(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName, qualifier } = inputs
		if (this.checkField({ serviceName, functionName, qualifier })) return
		try {
			await this.getClient();
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
	public async getFunctionAsyncConfig(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName, qualifier } = inputs
		if (this.checkField({ serviceName, functionName, qualifier })) return
		try {
			await this.getClient();
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
	public async invokeFunction(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName, event } = inputs
		if (this.checkField({ serviceName, functionName })) return
		try {
			await this.getClient();
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
	public async deleteService(inputs: ApiGetAndListParmas = {}) {
		const { serviceName } = inputs
		if (this.checkField({ serviceName })) return
		try {
			await this.getClient();
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
	public async deleteFunction(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName } = inputs
		if (this.checkField({ serviceName, functionName })) return
		try {
			await this.getClient();
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
	public async deleteTrigger(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName, triggerName } = inputs
		if (this.checkField({ serviceName, functionName, triggerName })) return
		try {
			await this.getClient();
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
	public async deleteCustomDomain(inputs: ApiGetAndListParmas = {}) {
		const { domainName } = inputs
		if (this.checkField({ domainName })) return
		try {
			await this.getClient();
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
	public async deleteVersion(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, versionId } = inputs
		if (this.checkField({ serviceName, versionId })) return
		try {
			await this.getClient();
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
	public async deleteAlias(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, aliasName } = inputs
		if (this.checkField({ serviceName, aliasName })) return
		try {
			await this.getClient();
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
	public async deleteFunctionAsyncConfig(inputs: ApiGetAndListParmas = {}) {
		const { serviceName, functionName, qualifier } = inputs
		if (this.checkField({ serviceName, functionName })) return
		try {
			await this.getClient();
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
	public async createService(inputs: ApiCreateServiceAndUpdateServiceParmas = {}, defaultServiceName: string) {
		const { serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig } = inputs
		let sName: string = defaultServiceName ? defaultServiceName : serviceName
		if (this.checkField({ sName })) return
		try {
			await this.getClient();
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
	public async updateService(inputs: ApiCreateServiceAndUpdateServiceParmas = {}) {
		const { serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig } = inputs
		if (this.checkField({ serviceName })) return
		try {
			await this.getClient();
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
	 * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"ossBucketName": "","ossObjectName":""}}'
	 * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，绝对路径文件，文件以 .zip 或 .jar 为后缀，如果文件超过 50MB，请使用 OSS 上传"}
	 * @typeParam Required --serviceName --functionName --code --handler --runtime
	 * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
	 */
	public async createFunction(inputs: ApiCreateFunctionAndUpdateFunction = {}) {
		const { serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort } = inputs
		let functionCode: any = {}
		if (this.checkField({ serviceName, functionName, code, handler, runtime })) return
		if (code.ossBucketName && code.ossObjectName) {
			functionCode.ossBucketName = code.ossBucketName
			functionCode.ossObjectName = code.ossObjectName
			delete functionCode.zipFile
		}
		if (code.zipFile) {
			const codeFize: any = await this.getZipFile(code.zipFile)
			if (!codeFize) return
			functionCode.zipFile = codeFize
			delete functionCode.ossBucketName
			delete functionCode.ossObjectName
		}
		try {
			await this.getClient();
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
	public async updateFunction(inputs: ApiCreateFunctionAndUpdateFunction = {}) {
		const { serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort } = inputs
		if (this.checkField({ serviceName, functionName })) return
		try {
			await this.getClient();
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
	public async createTrigger(inputs: ApiCreateTriggerAndUpdateTrigger = {}) {
		const { serviceName, functionName, invocationRole, qualifier, sourceArn, triggerConfig, triggerName, triggerType } = inputs
		if (this.checkField({ serviceName, functionName, triggerName, triggerType, invocationRole })) return
		try {
			await this.getClient();
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
	public async updateTrigger(inputs: ApiCreateTriggerAndUpdateTrigger = {}) {
		const { serviceName, functionName, invocationRole, qualifier, triggerConfig, triggerName } = inputs
		if (this.checkField({ serviceName, functionName, triggerName })) return
		try {
			await this.getClient();
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
	public async publishVersion(inputs: ApiPublishVersionAndCreateAlias = {}) {
		const { serviceName, description } = inputs
		if (this.checkField({ serviceName })) return
		try {
			await this.getClient();
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
	public async createAlias(inputs: ApiPublishVersionAndCreateAlias = { additionalVersionWeight: {} }) {
		const { serviceName, aliasName, versionId, additionalVersionWeight, description } = inputs
		if (this.checkField({ serviceName, aliasName, versionId })) return
		try {
			await this.getClient();
			result = await this.client.createAlias(serviceName, aliasName, versionId, {
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
	 * 更新别名
	 * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {},"description": ""}'
	 * @typeParam Required --serviceName --aliasName --versionId
	 * @typeParam Optional --additionalVersionWeight --description
	 */
	public async updateAlias(inputs: ApiPublishVersionAndCreateAlias = {}) {
		const { serviceName, aliasName, versionId, additionalVersionWeight, description } = inputs
		if (this.checkField({ serviceName, aliasName, versionId })) return
		try {
			await this.getClient();
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
	public async createCustomDomain(inputs: ApiCustomDomain = {}) {
		const { domainName, protocol, certConfig, routeConfig } = inputs
		if (this.checkField({ domainName })) return
		try {
			await this.getClient();
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
	public async updateCustomDomain(inputs: ApiCustomDomain = {}) {
		const { domainName, protocol, certConfig, routeConfig } = inputs
		if (this.checkField({ domainName })) return
		try {
			await this.getClient();
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
	public async putProvisionConfig(inputs: ProvisionConfig = {}) {
		const { serviceName, functionName, qualifier, target, scheduledActions, targetTrackingPolicies } = inputs
		if (this.checkField({ serviceName, functionName })) return
		try {
			await this.getClient();
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
	public async putFunctionAsyncConfig(inputs: FunctionAsyncInvokeConfig = {}) {
		const { serviceName, functionName, qualifier, destinationConfig, maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts } = inputs
		if (this.checkField({ serviceName, functionName })) return
		try {
			await this.getClient();
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
	 * @param inputs '{"functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"ossBucketName": "","ossObjectName":""}}'
	 * @typeParam Required --functionName --code --handler --runtime
	 * @typeParam Optional --serviceName --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
	 */
	public async createFunctionDefaultService(inputs: ApiCreateFunctionAndUpdateFunction = {}) {
		const { serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort } = inputs
		if (this.checkField({ functionName, code, handler, runtime })) return
		let defaultServiceName: string = serviceName
		if (!serviceName || serviceName.length === 0) {
			defaultServiceName = `Service${functionName}`
			await this.createService(inputs, defaultServiceName)
		}
		try {
			await this.getClient();
			result = await this.client.createFunction(defaultServiceName, {
				functionName,
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
}
