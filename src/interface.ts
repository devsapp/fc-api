export interface Inputs {
  region: string;
  credential: any;
}
export interface ApiGetAndListParmas {
  serviceName?: string;
  aliasName?: string;
  versionId?: number;
  domainName?: string;
  event?: object;
  functionName?: string;
  qualifier?: number;
  triggerName?: string;
  limit?: number;
  nextToken?: string;
  prefix?: string;
  startKey?: string;
}

interface LogConfig {
  logstore: string;
  project: string;
  enableRequestMetrics: boolean;
}

interface MountPoints {
  mountDir: string;
  serverAddr: string;
}
interface NasConfig {
  groupId: string;
  userId: string;
  mountPoints: Array<MountPoints>;
}

interface TracingConfig {
  type: string;
  params: Map<string, string>;
}

interface VpcConfig {
  securityGroupId: string;
  vSwitchIds: Array<string>;
  vpcId: string;
}

export interface ApiCreateServiceAndUpdateServiceParmas {
  serviceName?: string;
  description?: string;
  internetAccess?: boolean;
  role?: string;
  logConfig?: LogConfig;
  nasConfig?: NasConfig;
  vpcConfig?: VpcConfig;
  tracingConfig?: TracingConfig;
}

interface Code {
  ossBucketName: string;
  ossObjectName: string;
  zipFile: string;
}

interface CustomContainerConfig {
  args: string;
  command: string;
  image: string;
  accelerationType: string;
}
export interface ApiCreateFunctionAndUpdateFunction {
  serviceName?: string;
  code?: Code;
  customContainerConfig?: CustomContainerConfig;
  description?: string;
  functionName?: string;
  handler?: string;
  initializationTimeout?: string;
  initializer?: string;
  memorySize?: number;
  runtime?: string;
  timeout?: number;
  caPort?: number;
}

export interface ApiCreateTriggerAndUpdateTrigger {
  serviceName?: string;
  functionName?: string;
  invocationRole?: string;
  qualifier?: string;
  sourceArn?: string;
  triggerConfig?: string;
  triggerName?: string;
  triggerType?: string;
}

export interface ApiPublishVersionAndCreateAlias {
  serviceName?: string;
  description?: string;
  additionalVersionWeight?: any;
  aliasName?: string;
  versionId?: string;
}

interface CertConfig {
  certName: string;
  certificate: string;
  privateKey: string;
}

interface PathConfig {
  functionName: string;
  methods: Array<string>;
  path: string;
  qualifier: string;
  serviceName: string;
}

interface RouteConfig {
  routes: Array<PathConfig>;
}
export interface ApiCustomDomain {
  domainName?: string;
  protocol?: string;
  certConfig?: CertConfig;
  routeConfig?: RouteConfig;
}

interface ScheduledActions {
  name?: string;
  startTime?: string;
  endTime?: string;
  target?: string;
  scheduleExpression?: string;
}

interface TargetTrackingPolicies {
  name?: string;
  startTime?: string;
  endTime?: string;
  metricType?: string;
  metricTarget?: number;
  minCapacity?: number;
  maxCapacity?: number;
}
export interface ProvisionConfig {
  serviceName?: string;
  qualifier?: string;
  functionName?: string;
  target?: number;
  scheduledActions?: Array<ScheduledActions>;
  targetTrackingPolicies?: Array<TargetTrackingPolicies>;
}

interface Destination {
  destination: string;
}
interface DestinationConfig {
  onFailure: Destination;
  onSuccess: Destination;
}
export interface FunctionAsyncInvokeConfig {
  serviceName?: string;
  functionName?: string;
  qualifier?: string;
  destinationConfig?: DestinationConfig;
  maxAsyncEventAgeInSeconds?: number;
  maxAsyncRetryAttempts?: number;
}
