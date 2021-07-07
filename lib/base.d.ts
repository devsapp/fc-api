import { ILogger } from '@serverless-devs/core';
export default class BaseComponent {
    logger: ILogger;
    name: string;
    constructor();
    protected __doc(): string;
    protected __listApi(): any;
    /**
     * 错误上报
     * @param error
     */
    protected errorReport(error: any): Promise<void>;
    protected checkField(filed: {}): boolean;
    protected deleteSuccessInfo(type: string, name: string): string;
    /**
     * 处理文件后缀为zip 或者 jar
     * @param codePath
     * @returns
     */
    protected getZipFile(codePath: string): Promise<any>;
    /**
     * 读取目录及文件
     * @param obj
     * @param nowPath
     */
    protected readDir(obj: any, nowPath: any, targetDir: any): Promise<void>;
    /**
     * 开始压缩文件
     * @param codePath
     * @returns
     */
    protected startZip(codePath: string): Promise<string>;
}
