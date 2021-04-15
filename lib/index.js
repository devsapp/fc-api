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
var base_1 = __importDefault(require("./base"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var result;
var resultData = [];
var _limit;
var _nextToken, _prefix, _startKey;
var FunctionCompute = /** @class */ (function (_super) {
    __extends(FunctionCompute, _super);
    function FunctionCompute(props) {
        return _super.call(this, props) || this;
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
                    case 1:
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
     * @param inputs s cli fc listServices
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
     * @param inputs s cli fc listFunctions -p '{"serviceName": ""}'
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
     * @param inputs s cli fc listTriggers -p '{"serviceName": "","functionName": ""}'
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
     * @param inputs s cli fc listAliases -p '{"serviceName": ""}'
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
     * @param inputs s cli fc listVersions -p '{"serviceName": ""}'
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
     * @param inputs s cli fc listCustomDomains
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
     * @param inputs s cli fc listProvisionConfigs
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
     * @param inputs s cli fc listCustomDomains -p '{"serviceName": "","functionName": ""}'
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
     * @param inputs s cli fc getService -p '{"serviceName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getService(serviceName, {}, qualifier)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_1 = _a.sent();
                        this.errorReport(error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取函数配置信息
     * @param inputs s cli fc getFunction -p '{"serviceName": "","functionName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getFunction(serviceName, functionName, {}, qualifier)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_2 = _a.sent();
                        this.errorReport(error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取函数 Code 信息
     * @param inputs s cli fc getFunctionCode -p '{"serviceName": "","functionName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getFunctionCode(serviceName, functionName, {}, qualifier)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_3 = _a.sent();
                        this.errorReport(error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取触发器配置信息
     * @param inputs s cli fc getTrigger -p '{"serviceName": "test","functionName": "", "triggerName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getTrigger(serviceName, functionName, triggerName)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_4 = _a.sent();
                        this.errorReport(error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取 alias 信息
     * @param inputs s cli fc getAlias -p '{"serviceName": "","aliasName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getAlias(serviceName, aliasName)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_5 = _a.sent();
                        this.errorReport(error_5);
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取自定义域名信息
     * @param inputs s cli fc getCustomDomain -p '{"domainName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getCustomDomain(domainName)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_6 = _a.sent();
                        this.errorReport(error_6);
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取预留配置信息
     * @param inputs s cli fc getProvisionConfig -p '{"serviceName": "","functionName": "","qualifier": 1}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getProvisionConfig(serviceName, functionName, qualifier)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_7 = _a.sent();
                        this.errorReport(error_7);
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取函数异步调用配置信息
     * @param inputs s cli fc getFunctionAsyncConfig -p '{"serviceName": "","functionName": "","qualifier": 1}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_8 = _a.sent();
                        this.errorReport(error_8);
                        throw error_8;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 调用执行函数
     * @param inputs s cli fc invokeFunction -p '{"serviceName": "","functionName": "","event": {"key":"value"}}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.invokeFunction(serviceName, functionName, JSON.stringify(event))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_9 = _a.sent();
                        this.errorReport(error_9);
                        throw error_9;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除服务
     * @param inputs s cli fc deleteService -p '{"serviceName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.deleteService(serviceName)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_10 = _a.sent();
                        this.errorReport(error_10);
                        throw error_10;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除函数
     * @param inputs s cli fc deleteFunction -p '{"serviceName": "","functionName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.deleteFunction(serviceName, functionName)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_11 = _a.sent();
                        this.errorReport(error_11);
                        throw error_11;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除触发器
     * @param inputs s cli fc deleteTrigger -p '{"serviceName": "fcls","functionName":"ggk", "triggerName":"test3"}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.deleteTrigger(serviceName, functionName, triggerName)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_12 = _a.sent();
                        this.errorReport(error_12);
                        throw error_12;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除自定义域名
     * @param inputs s cli fc deleteCustomDomain -p '{"domainName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.deleteCustomDomain(domainName)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_13 = _a.sent();
                        this.errorReport(error_13);
                        throw error_13;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除版本
     * @param inputs s cli fc deleteVersion -p '{"serviceName": "","versionId":""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.deleteVersion(serviceName, versionId)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_14 = _a.sent();
                        this.errorReport(error_14);
                        throw error_14;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除别名
     * @param inputs s cli fc deleteAlias -p '{"serviceName": "","aliasName":""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.deleteAlias(serviceName, aliasName)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_15 = _a.sent();
                        this.errorReport(error_15);
                        throw error_15;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除函数异步配置
     * @param inputs s cli fc deleteFunctionAsyncConfig -p '{"serviceName": "","functionName": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.deleteFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_16 = _a.sent();
                        this.errorReport(error_16);
                        throw error_16;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建服务
     * @param inputs s cli fc createService -p '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
     * @typeParam Required --serviceName
     * @typeParam Optional --description --internetAccess --role --logConfig --nasConfig --vpcConfig --tracingConfig
     */
    FunctionCompute.prototype.createService = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, description = inputs.description, internetAccess = inputs.internetAccess, role = inputs.role, logConfig = inputs.logConfig, nasConfig = inputs.nasConfig, vpcConfig = inputs.vpcConfig, tracingConfig = inputs.tracingConfig;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.createService(serviceName, {
                                description: description,
                                internetAccess: internetAccess,
                                role: role,
                                logConfig: logConfig,
                                nasConfig: nasConfig,
                                vpcConfig: vpcConfig,
                                tracingConfig: tracingConfig,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_17 = _a.sent();
                        this.errorReport(error_17);
                        throw error_17;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新服务配置
     * @param inputs  s cli fc updateService -p '{"serviceName": "","tracingConfig": {"type": "Jaeger","params": {"endpoint":""}}}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.updateService(serviceName, {
                                description: description,
                                internetAccess: internetAccess,
                                role: role,
                                logConfig: logConfig,
                                nasConfig: nasConfig,
                                vpcConfig: vpcConfig,
                                tracingConfig: tracingConfig,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_18 = _a.sent();
                        this.errorReport(error_18);
                        throw error_18;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建函数
     * @param inputs  s cli fc createFunction -p '{"serviceName": "","functionName": "","handler":"index.handler","runtime": "nodejs10","code":{"ossBucketName": "","ossObjectName":""}}'
     * @typeParam Required --serviceName --functionName --code --handler --runtime
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort
     */
    FunctionCompute.prototype.createFunction = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = inputs.serviceName, functionName = inputs.functionName, code = inputs.code, customContainerConfig = inputs.customContainerConfig, description = inputs.description, handler = inputs.handler, initializationTimeout = inputs.initializationTimeout, initializer = inputs.initializer, memorySize = inputs.memorySize, runtime = inputs.runtime, timeout = inputs.timeout, caPort = inputs.caPort;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, code: code, handler: handler, runtime: runtime }))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.createFunction(serviceName, {
                                functionName: functionName,
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
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_19 = _a.sent();
                        this.errorReport(error_19);
                        throw error_19;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新函数
     * @param inputs  s cli fc updateFunction -p '{"serviceName": "","functionName": "","handler":"index.handler","runtime": "nodejs8","code":{"ossBucketName": "","ossObjectName":""}}'
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
                        _a.trys.push([1, 3, , 4]);
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
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_20 = _a.sent();
                        this.errorReport(error_20);
                        throw error_20;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建触发器
     * @param inputs  s cli fc createTrigger -p '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": {}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.createTrigger(serviceName, functionName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier,
                                sourceArn: sourceArn,
                                triggerConfig: triggerConfig,
                                triggerName: triggerName,
                                triggerType: triggerType,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_21 = _a.sent();
                        this.errorReport(error_21);
                        throw error_21;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新触发器
     * @param inputs  s cli fc updateTrigger -p '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": {}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.updateTrigger(serviceName, functionName, triggerName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier,
                                triggerConfig: triggerConfig,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_22 = _a.sent();
                        this.errorReport(error_22);
                        throw error_22;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建版本
     * @param inputs  s cli fc publishVersion -p '{"serviceName": "","description": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.publishVersion(serviceName, description)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_23 = _a.sent();
                        this.errorReport(error_23);
                        throw error_23;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建别名
     * @param inputs  s cli fc createAlias -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.createAlias(serviceName, aliasName, versionId, {
                                additionalVersionWeight: additionalVersionWeight,
                                description: description,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_24 = _a.sent();
                        this.errorReport(error_24);
                        throw error_24;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新别名
     * @param inputs  s cli fc updateAlias -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {},"description": ""}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.updateAlias(serviceName, aliasName, versionId, {
                                additionalVersionWeight: additionalVersionWeight,
                                description: description,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_25 = _a.sent();
                        this.errorReport(error_25);
                        throw error_25;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建自定义域名
     * @param inputs  s cli fc createCustomDomain -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.createCustomDomain(domainName, {
                                protocol: protocol,
                                certConfig: certConfig,
                                routeConfig: routeConfig,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_26 = _a.sent();
                        this.errorReport(error_26);
                        throw error_26;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新自定义域名
     * @param inputs  s cli fc updateCustomDomain -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.updateCustomDomain(domainName, {
                                protocol: protocol,
                                certConfig: certConfig,
                                routeConfig: routeConfig,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_27 = _a.sent();
                        this.errorReport(error_27);
                        throw error_27;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 预留配置
     * @param inputs  s cli fc putProvisionConfig -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.putProvisionConfig(serviceName, functionName, qualifier, {
                                target: target,
                                scheduledActions: scheduledActions,
                                targetTrackingPolicies: targetTrackingPolicies,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_28 = _a.sent();
                        this.errorReport(error_28);
                        throw error_28;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 函数异步配置
     * @param inputs  s cli f c putFunctionAsyncConfig -p '{"serviceName": "","aliasName": "","versionId": "1","additionalVersionWeight": {}}'
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
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.putFunctionAsyncConfig(serviceName, functionName, qualifier, {
                                destinationConfig: destinationConfig,
                                maxAsyncEventAgeInSeconds: maxAsyncEventAgeInSeconds,
                                maxAsyncRetryAttempts: maxAsyncRetryAttempts,
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, js_yaml_1.default.dump(result.data)];
                    case 3:
                        error_29 = _a.sent();
                        this.errorReport(error_29);
                        throw error_29;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FunctionCompute;
}(base_1.default));
exports.default = FunctionCompute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQSxnREFBa0M7QUFDbEMsb0RBQTBCO0FBQzFCLElBQUksTUFBVyxDQUFBO0FBQ2YsSUFBSSxVQUFVLEdBQWEsRUFBRSxDQUFBO0FBQzdCLElBQUksTUFBcUIsQ0FBQTtBQUN6QixJQUFJLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBd0IsQ0FBQTtBQUVqRDtJQUE2QyxtQ0FBYTtJQUN6RCx5QkFBWSxLQUFLO2VBQ2hCLGtCQUFNLEtBQUssQ0FBQztJQUNiLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDVyxtQ0FBUyxHQUF2QixVQUF3QixHQUFXLEVBQUUsS0FBYSxFQUFFLFNBQWlCLEVBQUUsS0FBYSxFQUFFLFdBQW9CLEVBQUUsWUFBcUIsRUFBRSxTQUFrQjs7Ozs7Ozt3QkFDaEosUUFBUSxHQUFROzRCQUNuQixLQUFLLEVBQUUsTUFBTTs0QkFDYixTQUFTLEVBQUUsVUFBVTs0QkFDckIsTUFBTSxFQUFFLE9BQU87NEJBQ2YsUUFBUSxFQUFFLFNBQVM7eUJBQ25CLENBQUE7d0JBRUssU0FBUyxHQUFHOzRCQUNqQixZQUFZLEVBQUU7OztnREFDSixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFNLFFBQVEsRUFBRyxFQUFBOzs0Q0FBaEQsTUFBTSxHQUFHLFNBQXVDLENBQUE7Ozs7aUNBQ2hEOzRCQUNELGFBQWEsRUFBRTs7O2dEQUNMLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxlQUFPLFFBQVEsR0FBSSxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUE7OzRDQUE1RSxNQUFNLEdBQUcsU0FBbUUsQ0FBQTs7OztpQ0FDNUU7NEJBQ0QsWUFBWSxF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