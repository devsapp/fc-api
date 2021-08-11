interface ICustomEndpoint {
    fcEndpoint: string;
    accountId: string;
    region: string;
    protocol: string;
}
export declare function getFcEndpoint(): Promise<ICustomEndpoint | undefined>;
export {};
