import { ILogger } from '@serverless-devs/core';
export default class BaseComponent {
    protected inputs: any;
    logger: ILogger;
    protected client: any;
    name: string;
    constructor(inputs: any);
    private init;
    protected __doc(): string;
    protected __listApi(): any;
    /**
     * 错误上报
     * @param error
     */
    protected errorReport(error: any): Promise<void>;
    protected checkField(filed: {}): boolean;
}
