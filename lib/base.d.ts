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
    protected getZipFile(path: string): Promise<any>;
}
