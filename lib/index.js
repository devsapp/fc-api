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
                        _c = _d.sent(), AccountID = _c.AccountID, AccessKeyID = _c.AccessKeyID, AccessKeySecret = _c.AccessKeySecret;
                        core_1.reportComponent('S-FC', { uid: AccountID, command: 's cli' });
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
            var limit, nextToken, prefix, startKey;
            return __generator(this, function (_a) {
                limit = inputs.limit, nextToken = inputs.nextToken, prefix = inputs.prefix, startKey = inputs.startKey;
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
     * @typeParam Required --functionName
     * @typeParam Optional --qualifier --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listFunctions = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var limit, nextToken, prefix, startKey, serviceName, qualifier;
            return __generator(this, function (_a) {
                limit = inputs.limit, nextToken = inputs.nextToken, prefix = inputs.prefix, startKey = inputs.startKey, serviceName = inputs.serviceName, qualifier = inputs.qualifier;
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
            var limit, nextToken, prefix, startKey, serviceName, functionName;
            return __generator(this, function (_a) {
                limit = inputs.limit, nextToken = inputs.nextToken, prefix = inputs.prefix, startKey = inputs.startKey, serviceName = inputs.serviceName, functionName = inputs.functionName;
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
            var limit, nextToken, prefix, startKey, serviceName;
            return __generator(this, function (_a) {
                limit = inputs.limit, nextToken = inputs.nextToken, prefix = inputs.prefix, startKey = inputs.startKey, serviceName = inputs.serviceName;
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
            var limit, nextToken, prefix, startKey, serviceName;
            return __generator(this, function (_a) {
                limit = inputs.limit, nextToken = inputs.nextToken, prefix = inputs.prefix, startKey = inputs.startKey, serviceName = inputs.serviceName;
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
            var limit, nextToken, prefix, startKey;
            return __generator(this, function (_a) {
                limit = inputs.limit, nextToken = inputs.nextToken, prefix = inputs.prefix, startKey = inputs.startKey;
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
            var limit, nextToken, serviceName, qualifier;
            return __generator(this, function (_a) {
                limit = inputs.limit, nextToken = inputs.nextToken, serviceName = inputs.serviceName, qualifier = inputs.qualifier;
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
            var limit, nextToken, serviceName, functionName;
            return __generator(this, function (_a) {
                limit = inputs.limit, nextToken = inputs.nextToken, serviceName = inputs.serviceName, functionName = inputs.functionName;
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
            var serviceName, qualifier, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, qualifier = inputs.qualifier;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.getService(serviceName, {}, qualifier)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_1 = _a.sent();
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
            var serviceName, functionName, qualifier, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, qualifier = inputs.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.getFunction(serviceName, functionName, {}, qualifier)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_2 = _a.sent();
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
            var serviceName, functionName, qualifier, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, qualifier = inputs.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.getFunctionCode(serviceName, functionName, {}, qualifier)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_3 = _a.sent();
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
            var serviceName, functionName, triggerName, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, triggerName = inputs.triggerName;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.getTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_4 = _a.sent();
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
            var serviceName, aliasName, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, aliasName = inputs.aliasName;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.getAlias(serviceName, aliasName)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_5 = _a.sent();
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
            var domainName, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        domainName = inputs.domainName;
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
            var serviceName, functionName, qualifier, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, qualifier = inputs.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, qualifier: qualifier }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.getProvisionConfig(serviceName, functionName, qualifier)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_7 = _a.sent();
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
            var serviceName, functionName, qualifier, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, qualifier = inputs.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, qualifier: qualifier }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.getFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_8 = _a.sent();
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
            var serviceName, functionName, event, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, event = inputs.event;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.invokeFunction(serviceName, functionName, JSON.stringify(event))];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_9 = _a.sent();
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
            var serviceName, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName;
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
            var serviceName, functionName, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.deleteFunction(serviceName, functionName)];
                    case 3:
                        result = _a.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Function', functionName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_11 = _a.sent();
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
            var serviceName, functionName, triggerName, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, triggerName = inputs.triggerName;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.deleteTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        result = _a.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Trigger', triggerName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_12 = _a.sent();
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
            var domainName, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        domainName = inputs.domainName;
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
            var serviceName, versionId, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, versionId = inputs.versionId;
                        if (this.checkField({ serviceName: serviceName, versionId: versionId }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.deleteVersion(serviceName, versionId)];
                    case 3:
                        result = _a.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Version', versionId)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_14 = _a.sent();
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
            var serviceName, aliasName, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, aliasName = inputs.aliasName;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.deleteAlias(serviceName, aliasName)];
                    case 3:
                        result = _a.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Alias', aliasName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_15 = _a.sent();
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
            var serviceName, functionName, qualifier, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, qualifier = inputs.qualifier;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.deleteFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 3:
                        result = _a.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Function', 'AsyncConfig')];
                        return [3 /*break*/, 5];
                    case 4:
                        error_16 = _a.sent();
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
            var serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, sName, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, description = inputs.description, internetAccess = inputs.internetAccess, role = inputs.role, logConfig = inputs.logConfig, nasConfig = inputs.nasConfig, vpcConfig = inputs.vpcConfig, tracingConfig = inputs.tracingConfig;
                        sName = defaultServiceName ? defaultServiceName : serviceName;
                        if (this.checkField({ sName: sName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
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
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_17 = _a.sent();
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
            var serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, description = inputs.description, internetAccess = inputs.internetAccess, role = inputs.role, logConfig = inputs.logConfig, nasConfig = inputs.nasConfig, vpcConfig = inputs.vpcConfig, tracingConfig = inputs.tracingConfig;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
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
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_18 = _a.sent();
                        this.errorReport(error_18);
                        throw error_18;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建函数
     * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"ossBucketName": "","ossObjectName":""}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，绝对路径文件，文件以 .zip 或 .jar 为后缀，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    FunctionCompute.prototype.createFunction = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, functionCode, codeFize, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, code = inputs.code, customContainerConfig = inputs.customContainerConfig, description = inputs.description, handler = inputs.handler, initializationTimeout = inputs.initializationTimeout, initializer = inputs.initializer, memorySize = inputs.memorySize, runtime = inputs.runtime, timeout = inputs.timeout, caPort = inputs.caPort;
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
                        codeFize = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.startZip(code.zipFile)];
                    case 3:
                        codeFize = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!codeFize)
                            return [2 /*return*/];
                        functionCode.zipFile = codeFize;
                        delete functionCode.ossBucketName;
                        delete functionCode.ossObjectName;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, this.getClient()];
                    case 6:
                        _a.sent();
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
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 8:
                        error_19 = _a.sent();
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
            var serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, code = inputs.code, customContainerConfig = inputs.customContainerConfig, description = inputs.description, handler = inputs.handler, initializationTimeout = inputs.initializationTimeout, initializer = inputs.initializer, memorySize = inputs.memorySize, runtime = inputs.runtime, timeout = inputs.timeout, caPort = inputs.caPort;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
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
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_20 = _a.sent();
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
            var serviceName, functionName, invocationRole, qualifier, sourceArn, triggerConfig, triggerName, triggerType, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, invocationRole = inputs.invocationRole, qualifier = inputs.qualifier, sourceArn = inputs.sourceArn, triggerConfig = inputs.triggerConfig, triggerName = inputs.triggerName, triggerType = inputs.triggerType;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName, triggerType: triggerType, invocationRole: invocationRole }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.createTrigger(serviceName, functionName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier,
                                sourceArn: sourceArn,
                                triggerConfig: triggerConfig,
                                triggerName: triggerName,
                                triggerType: triggerType,
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_21 = _a.sent();
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
            var serviceName, functionName, invocationRole, qualifier, triggerConfig, triggerName, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, invocationRole = inputs.invocationRole, qualifier = inputs.qualifier, triggerConfig = inputs.triggerConfig, triggerName = inputs.triggerName;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.updateTrigger(serviceName, functionName, triggerName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier,
                                triggerConfig: triggerConfig,
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_22 = _a.sent();
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
            var serviceName, description, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, description = inputs.description;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.publishVersion(serviceName, description)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_23 = _a.sent();
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
        if (inputs === void 0) { inputs = { additionalVersionWeight: {} }; }
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, aliasName, versionId, additionalVersionWeight, description, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, aliasName = inputs.aliasName, versionId = inputs.versionId, additionalVersionWeight = inputs.additionalVersionWeight, description = inputs.description;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName, versionId: versionId }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.createAlias(serviceName, aliasName, versionId, {
                                additionalVersionWeight: additionalVersionWeight,
                                description: description,
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_24 = _a.sent();
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
            var serviceName, aliasName, versionId, additionalVersionWeight, description, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, aliasName = inputs.aliasName, versionId = inputs.versionId, additionalVersionWeight = inputs.additionalVersionWeight, description = inputs.description;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName, versionId: versionId }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.updateAlias(serviceName, aliasName, versionId, {
                                additionalVersionWeight: additionalVersionWeight,
                                description: description,
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_25 = _a.sent();
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
            var domainName, protocol, certConfig, routeConfig, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        domainName = inputs.domainName, protocol = inputs.protocol, certConfig = inputs.certConfig, routeConfig = inputs.routeConfig;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.createCustomDomain(domainName, {
                                protocol: protocol,
                                certConfig: certConfig,
                                routeConfig: routeConfig,
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_26 = _a.sent();
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
            var domainName, protocol, certConfig, routeConfig, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        domainName = inputs.domainName, protocol = inputs.protocol, certConfig = inputs.certConfig, routeConfig = inputs.routeConfig;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.updateCustomDomain(domainName, {
                                protocol: protocol,
                                certConfig: certConfig,
                                routeConfig: routeConfig,
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_27 = _a.sent();
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
            var serviceName, functionName, qualifier, target, scheduledActions, targetTrackingPolicies, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, qualifier = inputs.qualifier, target = inputs.target, scheduledActions = inputs.scheduledActions, targetTrackingPolicies = inputs.targetTrackingPolicies;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.putProvisionConfig(serviceName, functionName, qualifier, {
                                target: target,
                                scheduledActions: scheduledActions,
                                targetTrackingPolicies: targetTrackingPolicies,
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_28 = _a.sent();
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
            var serviceName, functionName, qualifier, destinationConfig, maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts, error_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, qualifier = inputs.qualifier, destinationConfig = inputs.destinationConfig, maxAsyncEventAgeInSeconds = inputs.maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts = inputs.maxAsyncRetryAttempts;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.putFunctionAsyncConfig(serviceName, functionName, qualifier, {
                                destinationConfig: destinationConfig,
                                maxAsyncEventAgeInSeconds: maxAsyncEventAgeInSeconds,
                                maxAsyncRetryAttempts: maxAsyncRetryAttempts,
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 4:
                        error_29 = _a.sent();
                        this.errorReport(error_29);
                        throw error_29;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建函数，如不指定服务名称，会默认创建一个服务名称为 'Service'+functionName
     * @param inputs '{"functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"ossBucketName": "","ossObjectName":""}}'
     * @typeParam Required --functionName --code --handler --runtime
     * @typeParam Optional --serviceName --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    FunctionCompute.prototype.createFunctionDefaultService = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, defaultServiceName, functionCode, codeFize, error_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, code = inputs.code, customContainerConfig = inputs.customContainerConfig, description = inputs.description, handler = inputs.handler, initializationTimeout = inputs.initializationTimeout, initializer = inputs.initializer, memorySize = inputs.memorySize, runtime = inputs.runtime, timeout = inputs.timeout, caPort = inputs.caPort;
                        if (this.checkField({ functionName: functionName, code: code, handler: handler, runtime: runtime }))
                            return [2 /*return*/];
                        defaultServiceName = serviceName;
                        if (!(!serviceName || serviceName.length === 0)) return [3 /*break*/, 2];
                        defaultServiceName = "Service" + functionName;
                        return [4 /*yield*/, this.createService(inputs, defaultServiceName)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
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
                        codeFize = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.startZip(code.zipFile)];
                    case 5:
                        codeFize = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!codeFize)
                            return [2 /*return*/];
                        functionCode.zipFile = codeFize;
                        delete functionCode.ossBucketName;
                        delete functionCode.ossObjectName;
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 10, , 11]);
                        return [4 /*yield*/, this.getClient()];
                    case 8:
                        _a.sent();
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
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 10:
                        error_30 = _a.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBc0U7QUFDdEUsc0RBQThCO0FBQzlCLG9EQUEwQjtBQVcxQixnREFBa0M7QUFDbEMsSUFBSSxNQUFXLENBQUE7QUFDZixJQUFJLFVBQVUsR0FBYSxFQUFFLENBQUE7QUFDN0IsSUFBSSxNQUFxQixDQUFBO0FBQ3pCLElBQUksVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUF3QixDQUFBO0FBRWpEO0lBQTZDLG1DQUFhO0lBR3pELHlCQUFzQixNQUFNO1FBQTVCLFlBQ0MsaUJBQU8sU0FDUDtRQUZxQixZQUFNLEdBQU4sTUFBTSxDQUFBOztJQUU1QixDQUFDO0lBRWEsbUNBQVMsR0FBdkI7Ozs7Ozs2QkFDSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQVosd0JBQVk7d0JBQ1QsS0FBaUMsSUFBSSxDQUFDLE1BQU0sRUFBMUMsTUFBTSxZQUFBLEVBQUUsY0FBa0IsRUFBbEIsTUFBTSxtQkFBRyxTQUFTLEtBQUEsQ0FBZ0I7d0JBQ0UscUJBQU0sb0JBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQXpFLEtBQThDLFNBQWtDLEVBQTlFLFNBQVMsZUFBQSxFQUFFLFdBQVcsaUJBQUEsRUFBRSxlQUFlLHFCQUFBO3dCQUMvQyxzQkFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7d0JBQzdELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFFLENBQUMsU0FBUyxFQUFFOzRCQUMvQixXQUFXLEVBQUUsV0FBVzs0QkFDeEIsZUFBZSxFQUFFLGVBQWU7NEJBQ2hDLGFBQWEsRUFBRSxFQUFFOzRCQUNqQixNQUFNLEVBQUUsTUFB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