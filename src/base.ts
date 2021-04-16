import fs from 'fs'
import path from 'path'
import get from 'lodash.get'
import yaml from 'js-yaml'
import Table from 'tty-table'
import { ILogger, HLogger } from '@serverless-devs/core'
export default class BaseComponent {
	@HLogger('FC') logger: ILogger
	public name: string
	constructor() {
		const pkgPath = path.join(__dirname, '..', 'package.json')
		if (pkgPath) {
			const pkg = yaml.load(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'))
			this.name = pkg.name
		}
	
	}

	
	protected __doc() {
		const docPath = path.join(__dirname, '..', 'doc', 'doc.json')
		if (fs.existsSync(docPath)) {
			const fileContent: string = fs.readFileSync(docPath).toString()
			const result = JSON.parse(fileContent)
			const options = {
				borderStyle: 'solid',
				borderColor: 'blue',
				headerAlign: 'center',
				align: 'left',
				color: 'cyan',
				width: '100%',
			}
			const header = [
				{
					value: '方法',
					headerColor: 'cyan',
					color: 'cyan',
					align: 'left',
					width: '25%',
					formatter: function (value) {
						return value
					},
				},
				{
					value: '方法说明',
					headerColor: 'cyan',
					color: 'cyan',
					align: 'left',
					width: '25%',
					formatter: function (value) {
						return value
					},
				},
				{
					value: '参数说明',
					headerColor: 'cyan',
					color: 'cyan',
					align: 'left',
					width: '32%',
					formatter: function (value) {
						return value
					},
				},
				{
					value: '命令行调用示例',
					headerColor: 'cyan',
					color: 'cyan',
					align: 'left',
					width: 'auto',
					formatter: function (value) {
						return value
					},
				},
			]
			const rows = []
			const data = get(result, 'children[0].children', []).filter((item) => item.kindString === 'Method' && get(item, 'flags.isPublic'))

			data.forEach((item) => {
				let parmasThat: string = ''
				const params = get(item, 'signatures[0].parameters[0]', {})
				if (item.signatures[0].comment.tags) {
					parmasThat = `Required:\n${item.signatures[0].comment.tags[0].text}\nOptional:\n${item.signatures[0].comment.tags[1].text}`
				}
				const paramText = get(params, 'comment.text', '')
				rows.push([item.name, get(item, 'signatures[0].comment.shortText', ''), parmasThat, `s cli ${this.name} ${item.name} -p ${paramText} -a default -r cn-hangzhou`])
			})

			return Table(header, rows, options).render()
		} else {
			return 'not found doc content'
		}
	}

	protected __listApi() {
		const docPath = path.join(__dirname, '..', 'doc', 'doc.json')
		if (fs.existsSync(docPath)) {
			const fileContent: string = fs.readFileSync(docPath).toString()
			const result = JSON.parse(fileContent)

			const data = result.children[0].children.filter((item) => item.kindString === 'Method' && item.flags.isPublic)

			return data.map((item) => {
				const parameters = item.signatures[0].parameters || []
				const params = parameters.map((item) => {
					const paramsComment = item.comment || {}
					const type = item.type
					return {
						paramName: item.name,
						paramDesc: paramsComment.text || '',
						type: type.name || '',
					}
				})
				const comment = item.signatures[0].comment || {}

				return {
					name: item.name,
					desc: comment.shortText || '',
					params,
				}
			})
		}
		return []
	}

	/**
	 * 错误上报
	 * @param error
	 */
	protected async errorReport(error: any) {
		//错误上报，暂时不处理
	}

	protected checkField(filed: {}): boolean {
		let flag: boolean = false
		for (var key in filed) {
			flag = filed[key] ? false : true
			if (flag) {
				this.logger.warn('Please check the parameters. use `s cli s-fc --doc` for info.')
				return flag
			}
		}
	}

	protected deleteSuccessInfo(type: string, name: string): string {
		return `${type} ${name} delete success`
	}

	protected async getZipFile(path: string): Promise<any> {
		try {
			const data = fs.readFileSync(path)
			return Buffer.from(data).toString('base64')
		} catch (e) {
			this.logger.error('File does not exist or file is invalid. please check')
		}
	}
}
