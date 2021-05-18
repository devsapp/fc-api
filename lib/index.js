"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@serverless-devs/core");
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var base_1 = __importDefault(require("./base"));
var result;
var resultData = [];
var _limit;
var _nextToken, _prefix, _startKey;
var FunctionCompute = /** @class */ (function (_super) {
    __extends(FunctionCompute, _super);
    function FunctionCompute(inputs) {
        var _this = _super.call(this) || this;
        _this.inputs = inputs;
        return _this;
    }
    FunctionCompute.prototype.getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, region, _b, access, _c, AccountID, AccessKeyID, AccessKeySecret;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 2];
                        _a = this.inputs, region = _a.region, _b = _a.access, access = _b === void 0 ? 'default' : _b;
                        return [4 /*yield*/, core_1.getCredential(access)];
                    case 1:
                        _c = (_d.sent()), AccountID = _c.AccountID, AccessKeyID = _c.AccessKeyID, AccessKeySecret = _c.AccessKeySecret;
                        core_1.reportComponent('fc-api', { uid: AccountID, command: 's cli' });
                        this.client = new fc2_1.default(AccountID, {
                            accessKeyID: AccessKeyID,
                            accessKeySecret: AccessKeySecret,
                            securityToken: '',
                            region: region || 'cn-hangzhou',
                            timeout: 6000000,
                        });
                        _d.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
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
    FunctionCompute.prototype.fetchData = function (api, field, nextToken, limit, serviceName, functionName, qualifier) {
        return __awaiter(this, void 0, void 0, function () {
            var optional, switchApi;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optional = {
                            limit: _limit,
                            nextToken: _nextToken,
                            prefix: _prefix,
                            startKey: _startKey,
                        };
                        return [4 /*yield*/, this.getClient()];
                    case 1:
                        _a.sent();
                        switchApi = {
                            listServices: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.client[api](__assign({}, optional))];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            listFunctions: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.client[api](serviceName, __assign({}, optional), {}, qualifier)];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            listTriggers: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.client[api](serviceName, functionName, __assign({}, optional))];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            listAliases: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.client[api](serviceName, __assign({}, optional))];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            listVersions: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.client[api](serviceName, __assign({}, optional))];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            listCustomDomains: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.client[api](__assign({}, optional))];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            listProvisionConfigs: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.client[api]({ limit: _limit, nextToken: _nextToken, serviceName: serviceName, qualifier: qualifier })];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            listFunctionAsyncConfigs: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.client[api](serviceName, functionName, { limit: _limit, nextToken: _nextToken })];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        };
                        return [4 /*yield*/, switchApi[api].call(this)];
                    case 2:
                        _a.sent();
                        try {
                            do {
                                resultData = resultData.concat(result.data[field]);
                                if (typeof nextToken === 'undefined' && typeof limit === 'undefined') {
                                    _nextToken = result.data.nextToken ? result.data.nextToken : null;
                                }
                                else {
                                    _nextToken = null;
                                }
                            } while (_nextToken);
                        }
                        catch (error) {
                            this.errorReport(error);
                            throw error;
                        }
                        return [2 /*return*/, js_yaml_1.default.dump(resultData)];
                }
            });
        });
    };
    /**
     * 查询服务列表
     * @param inputs
     */
    FunctionCompute.prototype.listServices = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args }, apts);
                // @ts-ignore
                if (comParse.data && comParse.data.help) {
                    core_1.help([{
                            header: 'Usage',
                            content: "s cli fc-api listServices"
                        }, {
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
                    return [2 /*return*/];
                }
                _a = inputs.props, limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey;
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData('listServices', 'services', nextToken, limit)];
            });
        });
    };
    /**
     * 查询函数列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listFunctions = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, qualifier;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args }, apts);
                // @ts-ignore
                if (comParse.data && comParse.data.help) {
                    core_1.help([{
                            header: 'Usage',
                            content: "s cli fc-api listFunctions"
                        }, {
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
                    return [2 /*return*/];
                }
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName, qualifier = _a.qualifier;
                if (this.checkField({ serviceName: serviceName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData('listFunctions', 'functions', nextToken, limit, serviceName, null, qualifier)];
            });
        });
    };
    /**
     * 查询触发器列表
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listTriggers = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, functionName;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args }, apts);
                // @ts-ignore
                if (comParse.data && comParse.data.help) {
                    core_1.help([{
                            header: 'Usage',
                            content: "s cli fc-api listTriggers"
                        }, {
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
                    return [2 /*return*/];
                }
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName, functionName = _a.functionName;
                if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData('listTriggers', 'triggers', nextToken, limit, serviceName, functionName)];
            });
        });
    };
    /**
     * 查询别名列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listAliases = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args }, apts);
                // @ts-ignore
                if (comParse.data && comParse.data.help) {
                    core_1.help([{
                            header: 'Usage',
                            content: "s cli fc-api listAliases"
                        }, {
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
                    return [2 /*return*/];
                }
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName;
                if (this.checkField({ serviceName: serviceName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData('listAliases', 'aliases', nextToken, limit, serviceName)];
            });
        });
    };
    /**
     * 查询版本列表
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listVersions = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args }, apts);
                // @ts-ignore
                if (comParse.data && comParse.data.help) {
                    core_1.help([{
                            header: 'Usage',
                            content: "s cli fc-api listVersions"
                        }, {
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
                    return [2 /*return*/];
                }
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName;
                if (this.checkField({ serviceName: serviceName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData('listVersions', 'versions', nextToken, limit, serviceName)];
            });
        });
    };
    /**
     * 查询自定义域名列表
     * @param inputs
     * @typeParam Required
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listCustomDomains = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args }, apts);
                // @ts-ignore
                if (comParse.data && comParse.data.help) {
                    core_1.help([{
                            header: 'Usage',
                            content: "s cli fc-api listCustomDomains"
                        }, {
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
                    return [2 /*return*/];
                }
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey;
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData('listCustomDomains', 'customDomains', nextToken, limit)];
            });
        });
    };
    /**
     * 查询预留配置列表
     * @param inputs
     * @typeParam Required --serviceName
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listProvisionConfigs = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, serviceName, qualifier;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args }, apts);
                // @ts-ignore
                if (comParse.data && comParse.data.help) {
                    core_1.help([{
                            header: 'Usage',
                            content: "s cli fc-api listCustomDomains"
                        }, {
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
                    return [2 /*return*/];
                }
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, serviceName = _a.serviceName, qualifier = _a.qualifier;
                _nextToken = nextToken;
                _limit = limit || 100;
                return [2 /*return*/, this.fetchData('listProvisionConfigs', 'provisionConfigs', nextToken, limit, serviceName, null, qualifier)];
            });
        });
    };
    /**
     * 查询异步配置列表
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --limit --nextToken
     */
    FunctionCompute.prototype.listFunctionAsyncConfigs = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, serviceName, functionName;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args }, apts);
                // @ts-ignore
                if (comParse.data && comParse.data.help) {
                    core_1.help([{
                            header: 'Usage',
                            content: "s cli fc-api listFunctionAsyncConfigs"
                        }, {
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
                    return [2 /*return*/];
                }
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, serviceName = _a.serviceName, functionName = _a.functionName;
                if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                return [2 /*return*/, this.fetchData('listFunctionAsyncConfigs', 'configs', nextToken, limit, serviceName, functionName)];
            });
        });
    };
    /**
     * 获取服务配置信息
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier
     */
    FunctionCompute.prototype.getService = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, qualifier, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api getService"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, qualifier = _a.qualifier;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getService(serviceName, {}, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_1 = _b.sent();
                        this.errorReport(error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取函数配置信息
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    FunctionCompute.prototype.getFunction = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api getFunction"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunction(serviceName, functionName, {}, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_2 = _b.sent();
                        this.errorReport(error_2);
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取函数 Code 信息
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    FunctionCompute.prototype.getFunctionCode = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api getFunctionCode"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunctionCode(serviceName, functionName, {}, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_3 = _b.sent();
                        this.errorReport(error_3);
                        throw error_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取触发器配置信息
     * @param inputs '{"serviceName": "test","functionName": "", "triggerName": ""}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    FunctionCompute.prototype.getTrigger = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, triggerName, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api getTrigger"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, triggerName = _a.triggerName;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_4 = _b.sent();
                        this.errorReport(error_4);
                        throw error_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取 alias 信息
     * @param inputs '{"serviceName": "","aliasName": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    FunctionCompute.prototype.getAlias = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api getAlias"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getAlias(serviceName, aliasName)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_5 = _b.sent();
                        this.errorReport(error_5);
                        throw error_5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取自定义域名信息
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional
     */
    FunctionCompute.prototype.getCustomDomain = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, domainName, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api getCustomDomain"
                                }, {
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
                            return [2 /*return*/];
                        }
                        domainName = Object.assign(inputs.props, comParse.data || {}).domainName;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.getCustomDomain(domainName)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_6 = _a.sent();
                        this.errorReport(error_6);
                        throw error_6;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取预留配置信息
     * @param inputs '{"serviceName": "","functionName": "","qualifier": 1}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    FunctionCompute.prototype.getProvisionConfig = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api getProvisionConfig"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, qualifier: qualifier }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getProvisionConfig(serviceName, functionName, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_7 = _b.sent();
                        this.errorReport(error_7);
                        throw error_7;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取函数异步调用配置信息
     * @param inputs '{"serviceName": "","functionName": "","qualifier": 1}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    FunctionCompute.prototype.getFunctionAsyncConfig = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api getFunctionAsyncConfig"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, qualifier: qualifier }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_8 = _b.sent();
                        this.errorReport(error_8);
                        throw error_8;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 调用执行函数
     * @param inputs '{"serviceName": "","functionName": "","event": {"key":"value"}}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier --even
     */
    FunctionCompute.prototype.invokeFunction = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, event, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api invokeFunction"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, event = _a.event;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.invokeFunction(serviceName, functionName, JSON.stringify(event))];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_9 = _b.sent();
                        this.errorReport(error_9);
                        throw error_9;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除服务
     * @param inputs '{"serviceName": ""}'
     * @typeParam Required --serviceName
     * @typeParam Optional
     */
    FunctionCompute.prototype.deleteService = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, serviceName, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api deleteService"
                                }, {
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
                            return [2 /*return*/];
                        }
                        serviceName = Object.assign(inputs.props, comParse.data || {}).serviceName;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.deleteService(serviceName)];
                    case 3:
                        result = _a.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Service', serviceName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_10 = _a.sent();
                        this.errorReport(error_10);
                        throw error_10;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除函数
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional
     */
    FunctionCompute.prototype.deleteFunction = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api deleteFunction"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteFunction(serviceName, functionName)];
                    case 3:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Function', functionName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_11 = _b.sent();
                        this.errorReport(error_11);
                        throw error_11;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除触发器
     * @param inputs '{"serviceName": "fcls","functionName":"ggk", "triggerName":"test3"}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    FunctionCompute.prototype.deleteTrigger = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, triggerName, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api deleteTrigger"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, triggerName = _a.triggerName;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Trigger', triggerName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_12 = _b.sent();
                        this.errorReport(error_12);
                        throw error_12;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional
     */
    FunctionCompute.prototype.deleteCustomDomain = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, domainName, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api deleteCustomDomain"
                                }, {
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
                            return [2 /*return*/];
                        }
                        domainName = Object.assign(inputs.props, comParse.data || {}).domainName;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.deleteCustomDomain(domainName)];
                    case 3:
                        result = _a.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('CustomDomain', domainName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_13 = _a.sent();
                        this.errorReport(error_13);
                        throw error_13;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除版本
     * @param inputs '{"serviceName": "","versionId":""}'
     * @typeParam Required --serviceName --versionId
     * @typeParam Optional
     */
    FunctionCompute.prototype.deleteVersion = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, versionId, error_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api deleteVersion"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, versionId = _a.versionId;
                        if (this.checkField({ serviceName: serviceName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteVersion(serviceName, versionId)];
                    case 3:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Version', versionId)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_14 = _b.sent();
                        this.errorReport(error_14);
                        throw error_14;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除别名
     * @param inputs '{"serviceName": "","aliasName":""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    FunctionCompute.prototype.deleteAlias = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, error_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api deleteAlias"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteAlias(serviceName, aliasName)];
                    case 3:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Alias', aliasName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_15 = _b.sent();
                        this.errorReport(error_15);
                        throw error_15;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除函数异步配置
     * @param inputs '{"serviceName": "","functionName": ""}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --qualifier
     */
    FunctionCompute.prototype.deleteFunctionAsyncConfig = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, error_16;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api deleteFunctionAsyncConfig"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 3:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Function', 'AsyncConfig')];
                        return [3 /*break*/, 5];
                    case 4:
                        error_16 = _b.sent();
                        this.errorReport(error_16);
                        throw error_16;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建服务
     * @param inputs '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    FunctionCompute.prototype.createService = function (inputs, defaultServiceName) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, sName, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api createService"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, description = _a.description, internetAccess = _a.internetAccess, role = _a.role, logConfig = _a.logConfig, nasConfig = _a.nasConfig, vpcConfig = _a.vpcConfig, tracingConfig = _a.tracingConfig;
                        sName = defaultServiceName ? defaultServiceName : serviceName;
                        if (this.checkField({ sName: sName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.createService(sName, {
                                description: description,
                                internetAccess: internetAccess,
                                role: role,
                                logConfig: logConfig,
                                nasConfig: nasConfig,
                                vpcConfig: vpcConfig,
                                tracingConfig: tracingConfig,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_17 = _b.sent();
                        this.errorReport(error_17);
                        throw error_17;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新服务配置
     * @param inputs '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    FunctionCompute.prototype.updateService = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, error_18;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api updateService"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, description = _a.description, internetAccess = _a.internetAccess, role = _a.role, logConfig = _a.logConfig, nasConfig = _a.nasConfig, vpcConfig = _a.vpcConfig, tracingConfig = _a.tracingConfig;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateService(serviceName, {
                                description: description,
                                internetAccess: internetAccess,
                                role: role,
                                logConfig: logConfig,
                                nasConfig: nasConfig,
                                vpcConfig: vpcConfig,
                                tracingConfig: tracingConfig,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_18 = _b.sent();
                        this.errorReport(error_18);
                        throw error_18;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建函数
     * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.js"}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    FunctionCompute.prototype.createFunction = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, functionCode, codeFize, error_19;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api createFunction"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort;
                        functionCode = {};
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, code: code, handler: handler, runtime: runtime }))
                            return [2 /*return*/];
                        if (code.ossBucketName && code.ossObjectName) {
                            functionCode.ossBucketName = code.ossBucketName;
                            functionCode.ossObjectName = code.ossObjectName;
                            delete functionCode.zipFile;
                        }
                        if (!code.zipFile) return [3 /*break*/, 5];
                        codeFize = void 0;
                        if (!(code.zipFile.includes('.zip') || code.zipFile.includes('.jar'))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getZipFile(code.zipFile)];
                    case 1:
                        codeFize = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.startZip(code.zipFile)];
                    case 3:
                        codeFize = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!codeFize)
                            return [2 /*return*/];
                        functionCode.zipFile = codeFize;
                        delete functionCode.ossBucketName;
                        delete functionCode.ossObjectName;
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, this.getClient()];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.client.createFunction(serviceName, {
                                functionName: functionName,
                                code: functionCode,
                                customContainerConfig: customContainerConfig,
                                description: description,
                                handler: handler,
                                initializationTimeout: initializationTimeout,
                                initializer: initializer,
                                memorySize: memorySize,
                                runtime: runtime,
                                timeout: timeout,
                                caPort: caPort,
                            })];
                    case 7:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 8:
                        error_19 = _b.sent();
                        this.errorReport(error_19);
                        throw error_19;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新函数
     * @param inputs '{"serviceName": "","functionName": "","handler":"index.handler","runtime": "nodejs8","code":{"ossBucketName": "","ossObjectName":""}}'
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort --code --handler --runtime
     */
    FunctionCompute.prototype.updateFunction = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, error_20;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api updateFunction"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateFunction(serviceName, functionName, {
                                code: code,
                                customContainerConfig: customContainerConfig,
                                description: description,
                                handler: handler,
                                initializationTimeout: initializationTimeout,
                                initializer: initializer,
                                memorySize: memorySize,
                                runtime: runtime,
                                timeout: timeout,
                                caPort: caPort,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_20 = _b.sent();
                        this.errorReport(error_20);
                        throw error_20;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建触发器
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": {}'
     * @typeParam Required --serviceName --functionName --triggerName --triggerType
     * @typeParam Optional --invocationRole --qualifier --sourceArn --triggerConfig
     */
    FunctionCompute.prototype.createTrigger = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, invocationRole, qualifier, sourceArn, triggerConfig, triggerName, triggerType, error_21;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api createTrigger"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, invocationRole = _a.invocationRole, qualifier = _a.qualifier, sourceArn = _a.sourceArn, triggerConfig = _a.triggerConfig, triggerName = _a.triggerName, triggerType = _a.triggerType;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName, triggerType: triggerType, invocationRole: invocationRole }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.createTrigger(serviceName, functionName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier,
                                sourceArn: sourceArn,
                                triggerConfig: triggerConfig,
                                triggerName: triggerName,
                                triggerType: triggerType,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_21 = _b.sent();
                        this.errorReport(error_21);
                        throw error_21;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新触发器
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": {}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional --invocationRole --qualifier --triggerConfig
     */
    FunctionCompute.prototype.updateTrigger = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, invocationRole, qualifier, triggerConfig, triggerName, error_22;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api updateTrigger"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, invocationRole = _a.invocationRole, qualifier = _a.qualifier, triggerConfig = _a.triggerConfig, triggerName = _a.triggerName;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateTrigger(serviceName, functionName, triggerName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier,
                                triggerConfig: triggerConfig,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_22 = _b.sent();
                        this.errorReport(error_22);
                        throw error_22;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建版本
     * @param inputs '{"serviceName": "","description": ""}'
     * @typeParam Required --serviceName --description
     * @typeParam Optional
     */
    FunctionCompute.prototype.publishVersion = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, description, error_23;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api publishVersion"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, description = _a.description;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.publishVersion(serviceName, description)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_23 = _b.sent();
                        this.errorReport(error_23);
                        throw error_23;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建别名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --aliasName --versionId
     * @typeParam Optional --additionalVersionWeight --description
     */
    FunctionCompute.prototype.createAlias = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, versionId, additionalVersionWeight, description, error_24;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api createAlias"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName, versionId = _a.versionId, additionalVersionWeight = _a.additionalVersionWeight, description = _a.description;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.createAlias(serviceName, aliasName, versionId, {
                                additionalVersionWeight: additionalVersionWeight || {},
                                description: description,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_24 = _b.sent();
                        this.errorReport(error_24);
                        throw error_24;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新别名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {},"description": ""}'
     * @typeParam Required --serviceName --aliasName --versionId
     * @typeParam Optional --additionalVersionWeight --description
     */
    FunctionCompute.prototype.updateAlias = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, versionId, additionalVersionWeight, description, error_25;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api updateAlias"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName, versionId = _a.versionId, additionalVersionWeight = _a.additionalVersionWeight, description = _a.description;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateAlias(serviceName, aliasName, versionId, {
                                additionalVersionWeight: additionalVersionWeight,
                                description: description,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_25 = _b.sent();
                        this.errorReport(error_25);
                        throw error_25;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建自定义域名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    FunctionCompute.prototype.createCustomDomain = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, domainName, protocol, certConfig, routeConfig, error_26;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api createCustomDomain"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), domainName = _a.domainName, protocol = _a.protocol, certConfig = _a.certConfig, routeConfig = _a.routeConfig;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.createCustomDomain(domainName, {
                                protocol: protocol,
                                certConfig: certConfig,
                                routeConfig: routeConfig,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_26 = _b.sent();
                        this.errorReport(error_26);
                        throw error_26;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新自定义域名
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    FunctionCompute.prototype.updateCustomDomain = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, domainName, protocol, certConfig, routeConfig, error_27;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api updateCustomDomain"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), domainName = _a.domainName, protocol = _a.protocol, certConfig = _a.certConfig, routeConfig = _a.routeConfig;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateCustomDomain(domainName, {
                                protocol: protocol,
                                certConfig: certConfig,
                                routeConfig: routeConfig,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_27 = _b.sent();
                        this.errorReport(error_27);
                        throw error_27;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 预留配置
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --target --scheduledActions --targetTrackingPolicies
     */
    FunctionCompute.prototype.putProvisionConfig = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, target, scheduledActions, targetTrackingPolicies, error_28;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api putProvisionConfig"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, target = _a.target, scheduledActions = _a.scheduledActions, targetTrackingPolicies = _a.targetTrackingPolicies;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.putProvisionConfig(serviceName, functionName, qualifier, {
                                target: target,
                                scheduledActions: scheduledActions,
                                targetTrackingPolicies: targetTrackingPolicies,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_28 = _b.sent();
                        this.errorReport(error_28);
                        throw error_28;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 函数异步配置
     * @param inputs '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --destinationConfig --maxAsyncEventAgeInSeconds --maxAsyncRetryAttempts
     */
    FunctionCompute.prototype.putFunctionAsyncConfig = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, destinationConfig, maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts, error_29;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api putFunctionAsyncConfig"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, destinationConfig = _a.destinationConfig, maxAsyncEventAgeInSeconds = _a.maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts = _a.maxAsyncRetryAttempts;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.putFunctionAsyncConfig(serviceName, functionName, qualifier, {
                                destinationConfig: destinationConfig,
                                maxAsyncEventAgeInSeconds: maxAsyncEventAgeInSeconds,
                                maxAsyncRetryAttempts: maxAsyncRetryAttempts,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_29 = _b.sent();
                        this.errorReport(error_29);
                        throw error_29;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建函数，如不指定服务名称，会默认创建一个服务名称为 'Service'+functionName
     * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.js"}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    FunctionCompute.prototype.createFunctionDefaultService = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, defaultServiceName, functionCode, codeFize, error_30;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api createFunction"
                                }, {
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
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort;
                        if (this.checkField({ functionName: functionName, code: code, handler: handler, runtime: runtime }))
                            return [2 /*return*/];
                        defaultServiceName = serviceName;
                        if (!(!serviceName || serviceName.length === 0)) return [3 /*break*/, 2];
                        defaultServiceName = "Service" + functionName;
                        return [4 /*yield*/, this.createService(inputs, defaultServiceName)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        functionCode = {};
                        if (code.ossBucketName && code.ossObjectName) {
                            functionCode.ossBucketName = code.ossBucketName;
                            functionCode.ossObjectName = code.ossObjectName;
                            delete functionCode.zipFile;
                        }
                        if (!code.zipFile) return [3 /*break*/, 7];
                        if (!(code.zipFile.includes('.zip') || code.zipFile.includes('.jar'))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getZipFile(code.zipFile)];
                    case 3:
                        codeFize = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.startZip(code.zipFile)];
                    case 5:
                        codeFize = _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!codeFize)
                            return [2 /*return*/];
                        functionCode.zipFile = codeFize;
                        delete functionCode.ossBucketName;
                        delete functionCode.ossObjectName;
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 10, , 11]);
                        return [4 /*yield*/, this.getClient()];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.client.createFunction(defaultServiceName, {
                                functionName: functionName,
                                code: functionCode,
                                customContainerConfig: customContainerConfig,
                                description: description,
                                handler: handler,
                                initializationTimeout: initializationTimeout,
                                initializer: initializer,
                                memorySize: memorySize,
                                runtime: runtime,
                                timeout: timeout,
                                caPort: caPort,
                            })];
                    case 9:
                        result = _b.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 10:
                        error_30 = _b.sent();
                        this.errorReport(error_30);
                        throw error_30;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return FunctionCompute;
}(base_1.default));
exports.default = FunctionCompute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0Y7QUFDeEYsc0RBQThCO0FBQzlCLG9EQUEwQjtBQUkxQixnREFBa0M7QUFFbEMsSUFBSSxNQUFXLENBQUE7QUFDZixJQUFJLFVBQVUsR0FBYSxFQUFFLENBQUE7QUFDN0IsSUFBSSxNQUFxQixDQUFBO0FBQ3pCLElBQUksVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUF3QixDQUFBO0FBRWpEO0lBQTZDLG1DQUFhO0lBR3RELHlCQUFzQixNQUFNO1FBQTVCLFlBQ0ksaUJBQU8sU0FDVjtRQUZxQixZQUFNLEdBQU4sTUFBTSxDQUFBOztJQUU1QixDQUFDO0lBRWEsbUNBQVMsR0FBdkI7Ozs7Ozs2QkFDUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQVosd0JBQVk7d0JBQ04sS0FBK0IsSUFBSSxDQUFDLE1BQU0sRUFBekMsTUFBTSxZQUFBLEVBQUUsY0FBa0IsRUFBbEIsTUFBTSxtQkFBRyxTQUFTLEtBQUEsQ0FBZTt3QkFDRyxxQkFBTSxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBeEUsS0FBNEMsQ0FBQyxTQUEyQixDQUFRLEVBQS9FLFNBQVMsZUFBQSxFQUFFLFdBQVcsaUJBQUEsRUFBRSxlQUFlLHFCQUFBO3dCQUM5QyxzQkFBZSxDQUFDLFFBQVEsRUFBRSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUE7d0JBQzdELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFFLENBQUMsU0FBUyxFQUFFOzRCQUM1QixXQUFXLEVBQUUsV0FBVzs0QkFDeEIsZUFBZSxFQUFFLGVBQWU7NEJBQ2hDLGFBQWEsRUFBRSxFQUFFOzRCQUNqQixNQUFN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