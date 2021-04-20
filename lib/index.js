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
     * @param inputs '{"serviceName": "", "functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"zipFile": "example/code/index.js"}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0U7QUFDdEUsc0RBQThCO0FBQzlCLG9EQUEwQjtBQVcxQixnREFBa0M7QUFDbEMsSUFBSSxNQUFXLENBQUE7QUFDZixJQUFJLFVBQVUsR0FBYSxFQUFFLENBQUE7QUFDN0IsSUFBSSxNQUFxQixDQUFBO0FBQ3pCLElBQUksVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUF3QixDQUFBO0FBRWpEO0lBQTZDLG1DQUFhO0lBRXpELHlCQUFzQixNQUFNO1FBQTVCLFlBQ0MsaUJBQU8sU0FDUDtRQUZxQixZQUFNLEdBQU4sTUFBTSxDQUFBOztJQUU1QixDQUFDO0lBRWEsbUNBQVMsR0FBdkI7Ozs7Ozs2QkFDSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQVosd0JBQVk7d0JBQ1QsS0FBaUMsSUFBSSxDQUFDLE1BQU0sRUFBMUMsTUFBTSxZQUFBLEVBQUUsY0FBa0IsRUFBbEIsTUFBTSxtQkFBRyxTQUFTLEtBQUEsQ0FBZ0I7d0JBQ0cscUJBQU0sb0JBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTFFLEtBQThDLENBQUMsU0FBMkIsQ0FBUSxFQUFoRixTQUFTLGVBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsZUFBZSxxQkFBQTt3QkFDL0Msc0JBQWUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO3dCQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksYUFBRSxDQUFDLFNBQVMsRUFBRTs0QkFDL0IsV0FBVyxFQUFFLFdBQVc7NEJBQ3hCLGVBQWUsRUFBRSxlQUFlOzRCQUNoQyxhQUFhLEVBQUUsRUFBRTs0QkFDakIsTUFBTSxFQUFFLE1BQU0sSUFBSSxhQUFhOzRCQUMvQixPQUFPLEVBQUUsT0FBTzt5QkFDaEIsQ0FBQyxDQUFBOzs7Ozs7S0FFSDtJQUVEOzs7Ozs7Ozs7T0FTRztJQUNXLG1DQUFTLEdBQXZCLFVBQXdCLEdBQVcsRUFBRSxLQUFhLEVBQUUsU0FBaUIsRUFBRSxLQUFhLEVBQUUsV0FBb0IsRUFBRSxZQUFxQixFQUFFLFNBQWtCOzs7Ozs7O3dCQUNoSixRQUFRLEdBQVE7NEJBQ25CLEtBQUssRUFBRSxNQUFNOzRCQUNiLFNBQVMsRUFBRSxVQUFVOzRCQUNyQixNQUFNLEVBQUUsT0FBTzs0QkFDZixRQUFRLEVBQUUsU0FBUzt5QkFDbkIsQ0FBQTt3QkFDRCxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNoQixTQUFTLEdBQUc7NEJBQ2pCLFlBQVksRUFBRTs7O2dEQUNKLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQU0sUUFBUSxFQUFHLEVBQUE7OzRDQUFoRCxNQUFNLEdBQUcsU0FBdUMsQ0FBQTs7OztpQ0FDaEQ7NEJBQ0QsYUFBYSxFQUFFOzs7Z0RBQ0wscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLGVBQU8sUUFBUSxHQUFJLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFBQTs7NENBQTVFLE1BQU0sR0FBRyxTQUFtRSxDQUFBOzs7O2lDQUM1RTs0QkFDRCxZQUFZLEVBQUU7OztnREFDSixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxZQUFZLGVBQU8sUUFBUSxFQUFHLEVBQUE7OzRDQUEzRSxNQUFNLEdBQUcsU0FBa0UsQ0FBQTs7OztpQ0FDM0U7NEJBQ0QsV0FBVyxFQUFFOzs7Z0RBQ0gscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLGVBQU8sUUFBUSxFQUFHLEVBQUE7OzRDQUE3RCxNQUFNLEdBQUcsU0FBb0QsQ0FBQTs7OztpQ0FDN0Q7NEJBQ0QsWUFBWSxFQUFFOzs7Z0RBQ0oscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLGVBQU8sUUFBUSxFQUFHLEVBQUE7OzRDQUE3RCxNQUFNLEdBQUcsU0FBb0QsQ0FBQTs7OztpQ0FDN0Q7NEJBQ0QsaUJBQWlCLEVBQUU7OztnREFDVCxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFNLFFBQVEsRUFBRyxFQUFBOzs0Q0FBaEQsTUFBTSxHQUFHLFNBQXVDLENBQUE7Ozs7aUNBQ2hEOzRCQUNELG9CQUFvQixFQUFFOzs7Z0RBQ1oscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLGFBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDLEVBQUE7OzRDQUFqRyxNQUFNLEdBQUcsU0FBd0YsQ0FBQTs7OztpQ0FDakc7NEJBQ0Qsd0JBQXdCLEVBQUU7OztnREFDaEIscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBQTs7NENBQXBHLE1BQU0sR0FBRyxTQUEyRixDQUFBOzs7O2lDQUNwRzt5QkFDRCxDQUFBO3dCQUNELHFCQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUEvQixTQUErQixDQUFBO3dCQUMvQixJQUFJOzRCQUNILEdBQUc7Z0NBQ0YsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO2dDQUNsRCxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7b0NBQ3JFLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtpQ0FDakU7cUNBQU07b0NBQ04sVUFBVSxHQUFHLElBQUksQ0FBQTtpQ0FDakI7NkJBQ0QsUUFBUSxVQUFVLEVBQUM7eUJBQ3BCO3dCQUFDLE9BQU8sS0FBSyxFQUFFOzRCQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7NEJBQ3ZCLE1BQU0sS0FBSyxDQUFBO3lCQUNYO3dCQUNELHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFBOzs7O0tBQzVCO0lBRUQ7OztPQUdHO0lBQ1Usc0NBQVksR0FBekIsVUFBMEIsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxXQUFnQzs7OztnQkFDakQsS0FBSyxHQUFrQyxNQUFNLE1BQXhDLEVBQUUsU0FBUyxHQUF1QixNQUFNLFVBQTdCLEVBQUUsTUFBTSxHQUFlLE1BQU0sT0FBckIsRUFBRSxRQUFRLEdBQUssTUFBTSxTQUFYLENBQVc7Z0JBQ3JELFVBQVUsR0FBRyxTQUFTLENBQUE7Z0JBQ3RCLE1BQU0sR0FBRyxLQUFLLElBQUksR0FBRyxDQUFBO2dCQUNyQixPQUFPLEdBQUcsTUFBTSxDQUFBO2dCQUNoQixTQUFTLEdBQUcsUUFBUSxDQUFBO2dCQUNwQixzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFBOzs7S0FDbkU7SUFFRDs7Ozs7T0FLRztJQUNVLHVDQUFhLEdBQTFCLFVBQTJCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Z0JBQ2xELEtBQUssR0FBMEQsTUFBTSxNQUFoRSxFQUFFLFNBQVMsR0FBK0MsTUFBTSxVQUFyRCxFQUFFLE1BQU0sR0FBdUMsTUFBTSxPQUE3QyxFQUFFLFFBQVEsR0FBNkIsTUFBTSxTQUFuQyxFQUFFLFdBQVcsR0FBZ0IsTUFBTSxZQUF0QixFQUFFLFNBQVMsR0FBSyxNQUFNLFVBQVgsQ0FBVztnQkFDN0UsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQztvQkFBRSxzQkFBTTtnQkFDNUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEIsTUFBTSxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUE7Z0JBQ3JCLE9BQU8sR0FBRyxNQUFNLENBQUE7Z0JBQ2hCLFNBQVMsR0FBRyxRQUFRLENBQUE7Z0JBQ3BCLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUE7OztLQUNuRztJQUVEOzs7OztPQUtHO0lBQ1Usc0NBQVksR0FBekIsVUFBMEIsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxXQUFnQzs7OztnQkFDakQsS0FBSyxHQUE2RCxNQUFNLE1BQW5FLEVBQUUsU0FBUyxHQUFrRCxNQUFNLFVBQXhELEVBQUUsTUFBTSxHQUEwQyxNQUFNLE9BQWhELEVBQUUsUUFBUSxHQUFnQyxNQUFNLFNBQXRDLEVBQUUsV0FBVyxHQUFtQixNQUFNLFlBQXpCLEVBQUUsWUFBWSxHQUFLLE1BQU0sYUFBWCxDQUFXO2dCQUNoRixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDO29CQUFFLHNCQUFNO2dCQUMxRCxVQUFVLEdBQUcsU0FBUyxDQUFBO2dCQUN0QixNQUFNLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQTtnQkFDckIsT0FBTyxHQUFHLE1BQU0sQ0FBQTtnQkFDaEIsU0FBUyxHQUFHLFFBQVEsQ0FBQTtnQkFDcEIsc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFBOzs7S0FDOUY7SUFFRDs7Ozs7T0FLRztJQUNVLHFDQUFXLEdBQXhCLFVBQXlCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Z0JBQ2hELEtBQUssR0FBK0MsTUFBTSxNQUFyRCxFQUFFLFNBQVMsR0FBb0MsTUFBTSxVQUExQyxFQUFFLE1BQU0sR0FBNEIsTUFBTSxPQUFsQyxFQUFFLFFBQVEsR0FBa0IsTUFBTSxTQUF4QixFQUFFLFdBQVcsR0FBSyxNQUFNLFlBQVgsQ0FBVztnQkFDbEUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQztvQkFBRSxzQkFBTTtnQkFDNUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEIsTUFBTSxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUE7Z0JBQ3JCLE9BQU8sR0FBRyxNQUFNLENBQUE7Z0JBQ2hCLFNBQVMsR0FBRyxRQUFRLENBQUE7Z0JBQ3BCLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzs7S0FDOUU7SUFFRDs7Ozs7T0FLRztJQUNVLHNDQUFZLEdBQXpCLFVBQTBCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Z0JBQ2pELEtBQUssR0FBK0MsTUFBTSxNQUFyRCxFQUFFLFNBQVMsR0FBb0MsTUFBTSxVQUExQyxFQUFFLE1BQU0sR0FBNEIsTUFBTSxPQUFsQyxFQUFFLFFBQVEsR0FBa0IsTUFBTSxTQUF4QixFQUFFLFdBQVcsR0FBSyxNQUFNLFlBQVgsQ0FBVztnQkFDbEUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQztvQkFBRSxzQkFBTTtnQkFDNUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEIsTUFBTSxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUE7Z0JBQ3JCLE9BQU8sR0FBRyxNQUFNLENBQUE7Z0JBQ2hCLFNBQVMsR0FBRyxRQUFRLENBQUE7Z0JBQ3BCLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzs7S0FDaEY7SUFFRDs7Ozs7T0FLRztJQUNVLDJDQUFpQixHQUE5QixVQUErQixNQUFnQztRQUFoQyx1QkFBQSxFQUFBLFdBQWdDOzs7O2dCQUN0RCxLQUFLLEdBQWtDLE1BQU0sTUFBeEMsRUFBRSxTQUFTLEdBQXVCLE1BQU0sVUFBN0IsRUFBRSxNQUFNLEdBQWUsTUFBTSxPQUFyQixFQUFFLFFBQVEsR0FBSyxNQUFNLFNBQVgsQ0FBVztnQkFDckQsVUFBVSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEIsTUFBTSxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUE7Z0JBQ3JCLE9BQU8sR0FBRyxNQUFNLENBQUE7Z0JBQ2hCLFNBQVMsR0FBRyxRQUFRLENBQUE7Z0JBQ3BCLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBQTs7O0tBQzdFO0lBRUQ7Ozs7O09BS0c7SUFDVSw4Q0FBb0IsR0FBakMsVUFBa0MsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxXQUFnQzs7OztnQkFDekQsS0FBSyxHQUF3QyxNQUFNLE1BQTlDLEVBQUUsU0FBUyxHQUE2QixNQUFNLFVBQW5DLEVBQUUsV0FBVyxHQUFnQixNQUFNLFlBQXRCLEVBQUUsU0FBUyxHQUFLLE1BQU0sVUFBWCxDQUFXO2dCQUMzRCxVQUFVLEdBQUcsU0FBUyxDQUFBO2dCQUN0QixNQUFNLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQTtnQkFDckIsc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUE7OztLQUNqSDtJQUVEOzs7OztPQUtHO0lBQ1Usa0RBQXdCLEdBQXJDLFVBQXNDLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Z0JBQzdELEtBQUssR0FBMkMsTUFBTSxNQUFqRCxFQUFFLFNBQVMsR0FBZ0MsTUFBTSxVQUF0QyxFQUFFLFdBQVcsR0FBbUIsTUFBTSxZQUF6QixFQUFFLFlBQVksR0FBSyxNQUFNLGFBQVgsQ0FBVztnQkFDOUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQztvQkFBRSxzQkFBTTtnQkFDMUQsVUFBVSxHQUFHLFNBQVMsQ0FBQTtnQkFDdEIsTUFBTSxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUE7Z0JBQ3JCLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFBOzs7S0FDekc7SUFFRDs7Ozs7T0FLRztJQUNVLG9DQUFVLEdBQXZCLFVBQXdCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Ozt3QkFDL0MsV0FBVyxHQUFnQixNQUFNLFlBQXRCLEVBQUUsU0FBUyxHQUFLLE1BQU0sVUFBWCxDQUFXO3dCQUN6QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUUzQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUE7O3dCQUFqRSxNQUFNLEdBQUcsU0FBd0QsQ0FBQTt3QkFDakUsc0JBQU8saUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzs7d0JBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBSyxDQUFDLENBQUE7d0JBQ3ZCLE1BQU0sT0FBSyxDQUFBOzs7OztLQUVaO0lBRUQ7Ozs7O09BS0c7SUFDVSxxQ0FBVyxHQUF4QixVQUF5QixNQUFnQztRQUFoQyx1QkFBQSxFQUFBLFdBQWdDOzs7Ozs7d0JBQ2hELFdBQVcsR0FBOEIsTUFBTSxZQUFwQyxFQUFFLFlBQVksR0FBZ0IsTUFBTSxhQUF0QixFQUFFLFNBQVMsR0FBSyxNQUFNLFVBQVgsQ0FBVzt3QkFDdkQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQzs0QkFBRSxzQkFBTTs7Ozt3QkFFekQscUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBdEIsU0FBc0IsQ0FBQTt3QkFDYixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQWhGLE1BQU0sR0FBRyxTQUF1RSxDQUFBO3dCQUNoRixzQkFBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7Ozt3QkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxPQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLHlDQUFlLEdBQTVCLFVBQTZCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Ozt3QkFDcEQsV0FBVyxHQUE4QixNQUFNLFlBQXBDLEVBQUUsWUFBWSxHQUFnQixNQUFNLGFBQXRCLEVBQUUsU0FBUyxHQUFLLE1BQU0sVUFBWCxDQUFXO3dCQUN2RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUV6RCxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFBOzt3QkFBcEYsTUFBTSxHQUFHLFNBQTJFLENBQUE7d0JBQ3BGLHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7O3dCQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLE9BQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1Usb0NBQVUsR0FBdkIsVUFBd0IsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxXQUFnQzs7Ozs7O3dCQUMvQyxXQUFXLEdBQWdDLE1BQU0sWUFBdEMsRUFBRSxZQUFZLEdBQWtCLE1BQU0sYUFBeEIsRUFBRSxXQUFXLEdBQUssTUFBTSxZQUFYLENBQVc7d0JBQ3pELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsYUFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLFdBQVcsYUFBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRXRFLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTdFLE1BQU0sR0FBRyxTQUFvRSxDQUFBO3dCQUM3RSxzQkFBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7Ozt3QkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxPQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLGtDQUFRLEdBQXJCLFVBQXNCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Ozt3QkFDN0MsV0FBVyxHQUFnQixNQUFNLFlBQXRCLEVBQUUsU0FBUyxHQUFLLE1BQU0sVUFBWCxDQUFXO3dCQUN6QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUV0RCxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQTNELE1BQU0sR0FBRyxTQUFrRCxDQUFBO3dCQUMzRCxzQkFBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7Ozt3QkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxPQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLHlDQUFlLEdBQTVCLFVBQTZCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Ozt3QkFDcEQsVUFBVSxHQUFLLE1BQU0sV0FBWCxDQUFXO3dCQUM3QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUUxQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFBOzt3QkFBdEQsTUFBTSxHQUFHLFNBQTZDLENBQUE7d0JBQ3RELHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7O3dCQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLE9BQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1UsNENBQWtCLEdBQS9CLFVBQWdDLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Ozt3QkFDdkQsV0FBVyxHQUE4QixNQUFNLFlBQXBDLEVBQUUsWUFBWSxHQUFnQixNQUFNLGFBQXRCLEVBQUUsU0FBUyxHQUFLLE1BQU0sVUFBWCxDQUFXO3dCQUN2RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUVwRSxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQW5GLE1BQU0sR0FBRyxTQUEwRSxDQUFBO3dCQUNuRixzQkFBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7Ozt3QkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxPQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLGdEQUFzQixHQUFuQyxVQUFvQyxNQUFnQztRQUFoQyx1QkFBQSxFQUFBLFdBQWdDOzs7Ozs7d0JBQzNELFdBQVcsR0FBOEIsTUFBTSxZQUFwQyxFQUFFLFlBQVksR0FBZ0IsTUFBTSxhQUF0QixFQUFFLFNBQVMsR0FBSyxNQUFNLFVBQVgsQ0FBVzt3QkFDdkQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQzs0QkFBRSxzQkFBTTs7Ozt3QkFFcEUscUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBdEIsU0FBc0IsQ0FBQTt3QkFDYixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUE7O3dCQUF2RixNQUFNLEdBQUcsU0FBOEUsQ0FBQTt3QkFDdkYsc0JBQU8saUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzs7d0JBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBSyxDQUFDLENBQUE7d0JBQ3ZCLE1BQU0sT0FBSyxDQUFBOzs7OztLQUVaO0lBRUQ7Ozs7O09BS0c7SUFDVSx3Q0FBYyxHQUEzQixVQUE0QixNQUFnQztRQUFoQyx1QkFBQSxFQUFBLFdBQWdDOzs7Ozs7d0JBQ25ELFdBQVcsR0FBMEIsTUFBTSxZQUFoQyxFQUFFLFlBQVksR0FBWSxNQUFNLGFBQWxCLEVBQUUsS0FBSyxHQUFLLE1BQU0sTUFBWCxDQUFXO3dCQUNuRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUV6RCxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFBOzt3QkFBM0YsTUFBTSxHQUFHLFNBQWtGLENBQUE7d0JBQzNGLHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7O3dCQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLE9BQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1UsdUNBQWEsR0FBMUIsVUFBMkIsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxXQUFnQzs7Ozs7O3dCQUNsRCxXQUFXLEdBQUssTUFBTSxZQUFYLENBQVc7d0JBQzlCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsYUFBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRTNDLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUE7O3dCQUFyRCxNQUFNLEdBQUcsU0FBNEMsQ0FBQTt3QkFDckQsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSTs0QkFBRSxzQkFBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzs7O3dCQUVySCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLFFBQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1Usd0NBQWMsR0FBM0IsVUFBNEIsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxXQUFnQzs7Ozs7O3dCQUNuRCxXQUFXLEdBQW1CLE1BQU0sWUFBekIsRUFBRSxZQUFZLEdBQUssTUFBTSxhQUFYLENBQVc7d0JBQzVDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsYUFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRXpELHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFBOzt3QkFBcEUsTUFBTSxHQUFHLFNBQTJELENBQUE7d0JBQ3BFLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUk7NEJBQUUsc0JBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsRUFBQTs7Ozt3QkFFdkgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxRQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLHVDQUFhLEdBQTFCLFVBQTJCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Ozt3QkFDbEQsV0FBVyxHQUFnQyxNQUFNLFlBQXRDLEVBQUUsWUFBWSxHQUFrQixNQUFNLGFBQXhCLEVBQUUsV0FBVyxHQUFLLE1BQU0sWUFBWCxDQUFXO3dCQUN6RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUV0RSxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLEVBQUE7O3dCQUFoRixNQUFNLEdBQUcsU0FBdUUsQ0FBQTt3QkFDaEYsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSTs0QkFBRSxzQkFBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzs7O3dCQUVySCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLFFBQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1UsNENBQWtCLEdBQS9CLFVBQWdDLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Ozt3QkFDdkQsVUFBVSxHQUFLLE1BQU0sV0FBWCxDQUFXO3dCQUM3QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUUxQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQUE7O3dCQUF6RCxNQUFNLEdBQUcsU0FBZ0QsQ0FBQTt3QkFDekQsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSTs0QkFBRSxzQkFBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxFQUFBOzs7O3dCQUV6SCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLFFBQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1UsdUNBQWEsR0FBMUIsVUFBMkIsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxXQUFnQzs7Ozs7O3dCQUNsRCxXQUFXLEdBQWdCLE1BQU0sWUFBdEIsRUFBRSxTQUFTLEdBQUssTUFBTSxVQUFYLENBQVc7d0JBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsYUFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRXRELHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFBOzt3QkFBaEUsTUFBTSxHQUFHLFNBQXVELENBQUE7d0JBQ2hFLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUk7NEJBQUUsc0JBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBQTs7Ozt3QkFFbkgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxRQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLHFDQUFXLEdBQXhCLFVBQXlCLE1BQWdDO1FBQWhDLHVCQUFBLEVBQUEsV0FBZ0M7Ozs7Ozt3QkFDaEQsV0FBVyxHQUFnQixNQUFNLFlBQXRCLEVBQUUsU0FBUyxHQUFLLE1BQU0sVUFBWCxDQUFXO3dCQUN6QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUV0RCxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQTlELE1BQU0sR0FBRyxTQUFxRCxDQUFBO3dCQUM5RCxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJOzRCQUFFLHNCQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUE7Ozs7d0JBRWpILElBQUksQ0FBQyxXQUFXLENBQUMsUUFBSyxDQUFDLENBQUE7d0JBQ3ZCLE1BQU0sUUFBSyxDQUFBOzs7OztLQUVaO0lBRUQ7Ozs7O09BS0c7SUFDVSxtREFBeUIsR0FBdEMsVUFBdUMsTUFBZ0M7UUFBaEMsdUJBQUEsRUFBQSxXQUFnQzs7Ozs7O3dCQUM5RCxXQUFXLEdBQThCLE1BQU0sWUFBcEMsRUFBRSxZQUFZLEdBQWdCLE1BQU0sYUFBdEIsRUFBRSxTQUFTLEdBQUssTUFBTSxVQUFYLENBQVc7d0JBQ3ZELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsYUFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRXpELHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUFBOzt3QkFBMUYsTUFBTSxHQUFHLFNBQWlGLENBQUE7d0JBQzFGLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUk7NEJBQUUsc0JBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsRUFBQTs7Ozt3QkFFeEgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxRQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLHVDQUFhLEdBQTFCLFVBQTJCLE1BQW1ELEVBQUUsa0JBQTBCO1FBQS9FLHVCQUFBLEVBQUEsV0FBbUQ7Ozs7Ozt3QkFDckUsV0FBVyxHQUF3RixNQUFNLFlBQTlGLEVBQUUsV0FBVyxHQUEyRSxNQUFNLFlBQWpGLEVBQUUsY0FBYyxHQUEyRCxNQUFNLGVBQWpFLEVBQUUsSUFBSSxHQUFxRCxNQUFNLEtBQTNELEVBQUUsU0FBUyxHQUEwQyxNQUFNLFVBQWhELEVBQUUsU0FBUyxHQUErQixNQUFNLFVBQXJDLEVBQUUsU0FBUyxHQUFvQixNQUFNLFVBQTFCLEVBQUUsYUFBYSxHQUFLLE1BQU0sY0FBWCxDQUFXO3dCQUM3RyxLQUFLLEdBQVcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUE7d0JBQ3pFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRXJDLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO2dDQUMvQyxXQUFXLGFBQUE7Z0NBQ1gsY0FBYyxnQkFBQTtnQ0FDZCxJQUFJLE1BQUE7Z0NBQ0osU0FBUyxXQUFBO2dDQUNULFNBQVMsV0FBQTtnQ0FDVCxTQUFTLFdBQUE7Z0NBQ1QsYUFBYSxlQUFBOzZCQUNiLENBQUMsRUFBQTs7d0JBUkYsTUFBTSxHQUFHLFNBUVAsQ0FBQTt3QkFDRixzQkFBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7Ozt3QkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxRQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLHVDQUFhLEdBQTFCLFVBQTJCLE1BQW1EO1FBQW5ELHVCQUFBLEVBQUEsV0FBbUQ7Ozs7Ozt3QkFDckUsV0FBVyxHQUF3RixNQUFNLFlBQTlGLEVBQUUsV0FBVyxHQUEyRSxNQUFNLFlBQWpGLEVBQUUsY0FBYyxHQUEyRCxNQUFNLGVBQWpFLEVBQUUsSUFBSSxHQUFxRCxNQUFNLEtBQTNELEVBQUUsU0FBUyxHQUEwQyxNQUFNLFVBQWhELEVBQUUsU0FBUyxHQUErQixNQUFNLFVBQXJDLEVBQUUsU0FBUyxHQUFvQixNQUFNLFVBQTFCLEVBQUUsYUFBYSxHQUFLLE1BQU0sY0FBWCxDQUFXO3dCQUNqSCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUUzQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtnQ0FDckQsV0FBVyxhQUFBO2dDQUNYLGNBQWMsZ0JBQUE7Z0NBQ2QsSUFBSSxNQUFBO2dDQUNKLFNBQVMsV0FBQTtnQ0FDVCxTQUFTLFdBQUE7Z0NBQ1QsU0FBUyxXQUFBO2dDQUNULGFBQWEsZUFBQTs2QkFDYixDQUFDLEVBQUE7O3dCQVJGLE1BQU0sR0FBRyxTQVFQLENBQUE7d0JBQ0Ysc0JBQU8saUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzs7d0JBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBSyxDQUFDLENBQUE7d0JBQ3ZCLE1BQU0sUUFBSyxDQUFBOzs7OztLQUVaO0lBRUQ7Ozs7OztPQU1HO0lBQ1Usd0NBQWMsR0FBM0IsVUFBNEIsTUFBK0M7UUFBL0MsdUJBQUEsRUFBQSxXQUErQzs7Ozs7O3dCQUNsRSxXQUFXLEdBQWdKLE1BQU0sWUFBdEosRUFBRSxZQUFZLEdBQWtJLE1BQU0sYUFBeEksRUFBRSxJQUFJLEdBQTRILE1BQU0sS0FBbEksRUFBRSxxQkFBcUIsR0FBcUcsTUFBTSxzQkFBM0csRUFBRSxXQUFXLEdBQXdGLE1BQU0sWUFBOUYsRUFBRSxPQUFPLEdBQStFLE1BQU0sUUFBckYsRUFBRSxxQkFBcUIsR0FBd0QsTUFBTSxzQkFBOUQsRUFBRSxXQUFXLEdBQTJDLE1BQU0sWUFBakQsRUFBRSxVQUFVLEdBQStCLE1BQU0sV0FBckMsRUFBRSxPQUFPLEdBQXNCLE1BQU0sUUFBNUIsRUFBRSxPQUFPLEdBQWEsTUFBTSxRQUFuQixFQUFFLE1BQU0sR0FBSyxNQUFNLE9BQVgsQ0FBVzt3QkFDckssWUFBWSxHQUFRLEVBQUUsQ0FBQTt3QkFDMUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQzs0QkFBRSxzQkFBTTt3QkFDbEYsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQzdDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTs0QkFDL0MsWUFBWSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBOzRCQUMvQyxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUE7eUJBQzNCOzZCQUNHLElBQUksQ0FBQyxPQUFPLEVBQVosd0JBQVk7d0JBQ1gsUUFBUSxTQUFLLENBQUE7NkJBQ2IsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxFQUE5RCx3QkFBOEQ7d0JBQ3RELHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBOUMsUUFBUSxHQUFHLFNBQW1DLENBQUE7OzRCQUVuQyxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQTVDLFFBQVEsR0FBRyxTQUFpQyxDQUFBOzs7d0JBRTdDLElBQUksQ0FBQyxRQUFROzRCQUFFLHNCQUFNO3dCQUNyQixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQTt3QkFDL0IsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFBO3dCQUNqQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUE7Ozs7d0JBR2pDLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFO2dDQUN0RCxZQUFZLGNBQUE7Z0NBQ1osSUFBSSxFQUFFLFlBQVk7Z0NBQ2xCLHFCQUFxQix1QkFBQTtnQ0FDckIsV0FBVyxhQUFBO2dDQUNYLE9BQU8sU0FBQTtnQ0FDUCxxQkFBcUIsdUJBQUE7Z0NBQ3JCLFdBQVcsYUFBQTtnQ0FDWCxVQUFVLFlBQUE7Z0NBQ1YsT0FBTyxTQUFBO2dDQUNQLE9BQU8sU0FBQTtnQ0FDUCxNQUFNLFFBQUE7NkJBQ04sQ0FBQyxFQUFBOzt3QkFaRixNQUFNLEdBQUcsU0FZUCxDQUFBO3dCQUNGLHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7O3dCQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLFFBQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1Usd0NBQWMsR0FBM0IsVUFBNEIsTUFBK0M7UUFBL0MsdUJBQUEsRUFBQSxXQUErQzs7Ozs7O3dCQUNsRSxXQUFXLEdBQWdKLE1BQU0sWUFBdEosRUFBRSxZQUFZLEdBQWtJLE1BQU0sYUFBeEksRUFBRSxJQUFJLEdBQTRILE1BQU0sS0FBbEksRUFBRSxxQkFBcUIsR0FBcUcsTUFBTSxzQkFBM0csRUFBRSxXQUFXLEdBQXdGLE1BQU0sWUFBOUYsRUFBRSxPQUFPLEdBQStFLE1BQU0sUUFBckYsRUFBRSxxQkFBcUIsR0FBd0QsTUFBTSxzQkFBOUQsRUFBRSxXQUFXLEdBQTJDLE1BQU0sWUFBakQsRUFBRSxVQUFVLEdBQStCLE1BQU0sV0FBckMsRUFBRSxPQUFPLEdBQXNCLE1BQU0sUUFBNUIsRUFBRSxPQUFPLEdBQWEsTUFBTSxRQUFuQixFQUFFLE1BQU0sR0FBSyxNQUFNLE9BQVgsQ0FBVzt3QkFDekssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQzs0QkFBRSxzQkFBTTs7Ozt3QkFFekQscUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBdEIsU0FBc0IsQ0FBQTt3QkFDYixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFO2dDQUNwRSxJQUFJLE1BQUE7Z0NBQ0oscUJBQXFCLHVCQUFBO2dDQUNyQixXQUFXLGFBQUE7Z0NBQ1gsT0FBTyxTQUFBO2dDQUNQLHFCQUFxQix1QkFBQTtnQ0FDckIsV0FBVyxhQUFBO2dDQUNYLFVBQVUsWUFBQTtnQ0FDVixPQUFPLFNBQUE7Z0NBQ1AsT0FBTyxTQUFBO2dDQUNQLE1BQU0sUUFBQTs2QkFDTixDQUFDLEVBQUE7O3dCQVhGLE1BQU0sR0FBRyxTQVdQLENBQUE7d0JBQ0Ysc0JBQU8saUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzs7d0JBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBSyxDQUFDLENBQUE7d0JBQ3ZCLE1BQU0sUUFBSyxDQUFBOzs7OztLQUVaO0lBRUQ7Ozs7O09BS0c7SUFDVSx1Q0FBYSxHQUExQixVQUEyQixNQUE2QztRQUE3Qyx1QkFBQSxFQUFBLFdBQTZDOzs7Ozs7d0JBQy9ELFdBQVcsR0FBa0csTUFBTSxZQUF4RyxFQUFFLFlBQVksR0FBb0YsTUFBTSxhQUExRixFQUFFLGNBQWMsR0FBb0UsTUFBTSxlQUExRSxFQUFFLFNBQVMsR0FBeUQsTUFBTSxVQUEvRCxFQUFFLFNBQVMsR0FBOEMsTUFBTSxVQUFwRCxFQUFFLGFBQWEsR0FBK0IsTUFBTSxjQUFyQyxFQUFFLFdBQVcsR0FBa0IsTUFBTSxZQUF4QixFQUFFLFdBQVcsR0FBSyxNQUFNLFlBQVgsQ0FBVzt3QkFDM0gsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsY0FBYyxnQkFBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRW5HLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRTtnQ0FDbkUsY0FBYyxnQkFBQTtnQ0FDZCxTQUFTLFdBQUE7Z0NBQ1QsU0FBUyxXQUFBO2dDQUNULGFBQWEsZUFBQTtnQ0FDYixXQUFXLGFBQUE7Z0NBQ1gsV0FBVyxhQUFBOzZCQUNYLENBQUMsRUFBQTs7d0JBUEYsTUFBTSxHQUFHLFNBT1AsQ0FBQTt3QkFDRixzQkFBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7Ozt3QkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxRQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLHVDQUFhLEdBQTFCLFVBQTJCLE1BQTZDO1FBQTdDLHVCQUFBLEVBQUEsV0FBNkM7Ozs7Ozt3QkFDL0QsV0FBVyxHQUEwRSxNQUFNLFlBQWhGLEVBQUUsWUFBWSxHQUE0RCxNQUFNLGFBQWxFLEVBQUUsY0FBYyxHQUE0QyxNQUFNLGVBQWxELEVBQUUsU0FBUyxHQUFpQyxNQUFNLFVBQXZDLEVBQUUsYUFBYSxHQUFrQixNQUFNLGNBQXhCLEVBQUUsV0FBVyxHQUFLLE1BQU0sWUFBWCxDQUFXO3dCQUNuRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUV0RSxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFO2dDQUNoRixjQUFjLGdCQUFBO2dDQUNkLFNBQVMsV0FBQTtnQ0FDVCxhQUFhLGVBQUE7NkJBQ2IsQ0FBQyxFQUFBOzt3QkFKRixNQUFNLEdBQUcsU0FJUCxDQUFBO3dCQUNGLHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7O3dCQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLFFBQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1Usd0NBQWMsR0FBM0IsVUFBNEIsTUFBNEM7UUFBNUMsdUJBQUEsRUFBQSxXQUE0Qzs7Ozs7O3dCQUMvRCxXQUFXLEdBQWtCLE1BQU0sWUFBeEIsRUFBRSxXQUFXLEdBQUssTUFBTSxZQUFYLENBQVc7d0JBQzNDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsYUFBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRTNDLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBbkUsTUFBTSxHQUFHLFNBQTBELENBQUE7d0JBQ25FLHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7O3dCQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLFFBQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1UscUNBQVcsR0FBeEIsVUFBeUIsTUFBeUU7UUFBekUsdUJBQUEsRUFBQSxXQUE0Qyx1QkFBdUIsRUFBRSxFQUFFLEVBQUU7Ozs7Ozt3QkFDekYsV0FBVyxHQUFpRSxNQUFNLFlBQXZFLEVBQUUsU0FBUyxHQUFzRCxNQUFNLFVBQTVELEVBQUUsU0FBUyxHQUEyQyxNQUFNLFVBQWpELEVBQUUsdUJBQXVCLEdBQWtCLE1BQU0sd0JBQXhCLEVBQUUsV0FBVyxHQUFLLE1BQU0sWUFBWCxDQUFXO3dCQUMxRixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUVqRSxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFO2dDQUN6RSx1QkFBdUIseUJBQUE7Z0NBQ3ZCLFdBQVcsYUFBQTs2QkFDWCxDQUFDLEVBQUE7O3dCQUhGLE1BQU0sR0FBRyxTQUdQLENBQUE7d0JBQ0Ysc0JBQU8saUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzs7d0JBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBSyxDQUFDLENBQUE7d0JBQ3ZCLE1BQU0sUUFBSyxDQUFBOzs7OztLQUVaO0lBRUQ7Ozs7O09BS0c7SUFDVSxxQ0FBVyxHQUF4QixVQUF5QixNQUE0QztRQUE1Qyx1QkFBQSxFQUFBLFdBQTRDOzs7Ozs7d0JBQzVELFdBQVcsR0FBaUUsTUFBTSxZQUF2RSxFQUFFLFNBQVMsR0FBc0QsTUFBTSxVQUE1RCxFQUFFLFNBQVMsR0FBMkMsTUFBTSxVQUFqRCxFQUFFLHVCQUF1QixHQUFrQixNQUFNLHdCQUF4QixFQUFFLFdBQVcsR0FBSyxNQUFNLFlBQVgsQ0FBVzt3QkFDMUYsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQzs0QkFBRSxzQkFBTTs7Ozt3QkFFakUscUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBdEIsU0FBc0IsQ0FBQTt3QkFDYixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRTtnQ0FDekUsdUJBQXVCLHlCQUFBO2dDQUN2QixXQUFXLGFBQUE7NkJBQ1gsQ0FBQyxFQUFBOzt3QkFIRixNQUFNLEdBQUcsU0FHUCxDQUFBO3dCQUNGLHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7O3dCQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLFFBQUssQ0FBQTs7Ozs7S0FFWjtJQUVEOzs7OztPQUtHO0lBQ1UsNENBQWtCLEdBQS9CLFVBQWdDLE1BQTRCO1FBQTVCLHVCQUFBLEVBQUEsV0FBNEI7Ozs7Ozt3QkFDbkQsVUFBVSxHQUF3QyxNQUFNLFdBQTlDLEVBQUUsUUFBUSxHQUE4QixNQUFNLFNBQXBDLEVBQUUsVUFBVSxHQUFrQixNQUFNLFdBQXhCLEVBQUUsV0FBVyxHQUFLLE1BQU0sWUFBWCxDQUFXO3dCQUNoRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDOzRCQUFFLHNCQUFNOzs7O3dCQUUxQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFO2dDQUN6RCxRQUFRLFVBQUE7Z0NBQ1IsVUFBVSxZQUFBO2dDQUNWLFdBQVcsYUFBQTs2QkFDWCxDQUFDLEVBQUE7O3dCQUpGLE1BQU0sR0FBRyxTQUlQLENBQUE7d0JBQ0Ysc0JBQU8saUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzs7d0JBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBSyxDQUFDLENBQUE7d0JBQ3ZCLE1BQU0sUUFBSyxDQUFBOzs7OztLQUVaO0lBRUQ7Ozs7O09BS0c7SUFDVSw0Q0FBa0IsR0FBL0IsVUFBZ0MsTUFBNEI7UUFBNUIsdUJBQUEsRUFBQSxXQUE0Qjs7Ozs7O3dCQUNuRCxVQUFVLEdBQXdDLE1BQU0sV0FBOUMsRUFBRSxRQUFRLEdBQThCLE1BQU0sU0FBcEMsRUFBRSxVQUFVLEdBQWtCLE1BQU0sV0FBeEIsRUFBRSxXQUFXLEdBQUssTUFBTSxZQUFYLENBQVc7d0JBQ2hFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsWUFBQSxFQUFFLENBQUM7NEJBQUUsc0JBQU07Ozs7d0JBRTFDLHFCQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUE7d0JBQ2IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7Z0NBQ3pELFFBQVEsVUFBQTtnQ0FDUixVQUFVLFlBQUE7Z0NBQ1YsV0FBVyxhQUFBOzZCQUNYLENBQUMsRUFBQTs7d0JBSkYsTUFBTSxHQUFHLFNBSVAsQ0FBQTt3QkFDRixzQkFBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7Ozt3QkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxRQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLDRDQUFrQixHQUEvQixVQUFnQyxNQUE0QjtRQUE1Qix1QkFBQSxFQUFBLFdBQTRCOzs7Ozs7d0JBQ25ELFdBQVcsR0FBZ0YsTUFBTSxZQUF0RixFQUFFLFlBQVksR0FBa0UsTUFBTSxhQUF4RSxFQUFFLFNBQVMsR0FBdUQsTUFBTSxVQUE3RCxFQUFFLE1BQU0sR0FBK0MsTUFBTSxPQUFyRCxFQUFFLGdCQUFnQixHQUE2QixNQUFNLGlCQUFuQyxFQUFFLHNCQUFzQixHQUFLLE1BQU0sdUJBQVgsQ0FBVzt3QkFDekcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQzs0QkFBRSxzQkFBTTs7Ozt3QkFFekQscUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBdEIsU0FBc0IsQ0FBQTt3QkFDYixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFO2dDQUNuRixNQUFNLFFBQUE7Z0NBQ04sZ0JBQWdCLGtCQUFBO2dDQUNoQixzQkFBc0Isd0JBQUE7NkJBQ3RCLENBQUMsRUFBQTs7d0JBSkYsTUFBTSxHQUFHLFNBSVAsQ0FBQTt3QkFDRixzQkFBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7Ozt3QkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFLLENBQUMsQ0FBQTt3QkFDdkIsTUFBTSxRQUFLLENBQUE7Ozs7O0tBRVo7SUFFRDs7Ozs7T0FLRztJQUNVLGdEQUFzQixHQUFuQyxVQUFvQyxNQUFzQztRQUF0Qyx1QkFBQSxFQUFBLFdBQXNDOzs7Ozs7d0JBQ2pFLFdBQVcsR0FBbUcsTUFBTSxZQUF6RyxFQUFFLFlBQVksR0FBcUYsTUFBTSxhQUEzRixFQUFFLFNBQVMsR0FBMEUsTUFBTSxVQUFoRixFQUFFLGlCQUFpQixHQUF1RCxNQUFNLGtCQUE3RCxFQUFFLHlCQUF5QixHQUE0QixNQUFNLDBCQUFsQyxFQUFFLHFCQUFxQixHQUFLLE1BQU0sc0JBQVgsQ0FBVzt3QkFDNUgsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQzs0QkFBRSxzQkFBTTs7Ozt3QkFFekQscUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBdEIsU0FBc0IsQ0FBQTt3QkFDYixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFO2dDQUN2RixpQkFBaUIsbUJBQUE7Z0NBQ2pCLHlCQUF5QiwyQkFBQTtnQ0FDekIscUJBQXFCLHVCQUFBOzZCQUNyQixDQUFDLEVBQUE7O3dCQUpGLE1BQU0sR0FBRyxTQUlQLENBQUE7d0JBQ0Ysc0JBQU8saUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzs7d0JBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBSyxDQUFDLENBQUE7d0JBQ3ZCLE1BQU0sUUFBSyxDQUFBOzs7OztLQUVaO0lBRUQ7Ozs7O09BS0c7SUFDVSxzREFBNEIsR0FBekMsVUFBMEMsTUFBK0M7UUFBL0MsdUJBQUEsRUFBQSxXQUErQzs7Ozs7O3dCQUNoRixXQUFXLEdBQWdKLE1BQU0sWUFBdEosRUFBRSxZQUFZLEdBQWtJLE1BQU0sYUFBeEksRUFBRSxJQUFJLEdBQTRILE1BQU0sS0FBbEksRUFBRSxxQkFBcUIsR0FBcUcsTUFBTSxzQkFBM0csRUFBRSxXQUFXLEdBQXdGLE1BQU0sWUFBOUYsRUFBRSxPQUFPLEdBQStFLE1BQU0sUUFBckYsRUFBRSxxQkFBcUIsR0FBd0QsTUFBTSxzQkFBOUQsRUFBRSxXQUFXLEdBQTJDLE1BQU0sWUFBakQsRUFBRSxVQUFVLEdBQStCLE1BQU0sV0FBckMsRUFBRSxPQUFPLEdBQXNCLE1BQU0sUUFBNUIsRUFBRSxPQUFPLEdBQWEsTUFBTSxRQUFuQixFQUFFLE1BQU0sR0FBSyxNQUFNLE9BQVgsQ0FBVzt3QkFDekssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsWUFBWSxjQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQzs0QkFBRSxzQkFBTTt3QkFDakUsa0JBQWtCLEdBQVcsV0FBVyxDQUFBOzZCQUN4QyxDQUFBLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFBLEVBQXhDLHdCQUF3Qzt3QkFDM0Msa0JBQWtCLEdBQUcsWUFBVSxZQUFjLENBQUE7d0JBQzdDLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLEVBQUE7O3dCQUFwRCxTQUFvRCxDQUFBOzs7d0JBRWpELFlBQVksR0FBUSxFQUFFLENBQUE7d0JBQzFCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFOzRCQUM3QyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7NEJBQy9DLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTs0QkFDL0MsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFBO3lCQUMzQjs2QkFFRyxJQUFJLENBQUMsT0FBTyxFQUFaLHdCQUFZOzZCQUNYLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUEsRUFBOUQsd0JBQThEO3dCQUN0RCxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQTlDLFFBQVEsR0FBRyxTQUFtQyxDQUFBOzs0QkFFbkMscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUE1QyxRQUFRLEdBQUcsU0FBaUMsQ0FBQTs7O3dCQUU3QyxJQUFJLENBQUMsUUFBUTs0QkFBRSxzQkFBTTt3QkFDckIsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUE7d0JBQy9CLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQTt3QkFDakMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFBOzs7O3dCQUlqQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF0QixTQUFzQixDQUFBO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO2dDQUM3RCxZQUFZLGNBQUE7Z0NBQ1osSUFBSSxFQUFFLFlBQVk7Z0NBQ2xCLHFCQUFxQix1QkFBQTtnQ0FDckIsV0FBVyxhQUFBO2dDQUNYLE9BQU8sU0FBQTtnQ0FDUCxxQkFBcUIsdUJBQUE7Z0NBQ3JCLFdBQVcsYUFBQTtnQ0FDWCxVQUFVLFlBQUE7Z0NBQ1YsT0FBTyxTQUFBO2dDQUNQLE9BQU8sU0FBQTtnQ0FDUCxNQUFNLFFBQUE7NkJBQ04sQ0FBQyxFQUFBOzt3QkFaRixNQUFNLEdBQUcsU0FZUCxDQUFBO3dCQUNGLHNCQUFPLGlCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7O3dCQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQUssQ0FBQyxDQUFBO3dCQUN2QixNQUFNLFFBQUssQ0FBQTs7Ozs7S0FFWjtJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQWw0QkQsQ0FBNkMsY0FBYSxHQWs0QnpEIn0=