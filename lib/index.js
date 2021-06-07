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
exports.input = void 0;
var core_1 = require("@serverless-devs/core");
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var readline_1 = __importDefault(require("readline"));
var fs = require('fs');
var yaml = require('js-yaml');
var base_1 = __importDefault(require("./base"));
// @ts-ignore
var spawnSync = require('child_process').spawnSync;
var defaultConfigFileObject = process.env.HOME + '/.s/.fc.api.default.yaml';
var result;
var resultData = [];
var _limit;
var _nextToken, _prefix, _startKey;
function input(prompt) {
    if (prompt === void 0) { prompt = ""; }
    return new Promise(function (resolve) {
        var rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.setPrompt(prompt);
        rl.prompt();
        rl.on("line", function (line) {
            rl.close();
            resolve(line);
        });
    });
}
exports.input = input;
var FunctionCompute = /** @class */ (function (_super) {
    __extends(FunctionCompute, _super);
    function FunctionCompute(inputs) {
        var _this = _super.call(this) || this;
        _this.inputs = inputs;
        return _this;
    }
    FunctionCompute.prototype.getConfigFromFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var yamlData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, yaml.load(fs.readFileSync(defaultConfigFileObject, 'utf8'))];
                    case 1:
                        yamlData = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        yamlData = { "region": "cn-hangzhou", "access": "default" };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, yamlData];
                }
            });
        });
    };
    FunctionCompute.prototype.writeToFile = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfigFromFile()];
                    case 1:
                        config = _a.sent();
                        config[key] = value;
                        return [4 /*yield*/, fs.writeFileSync(defaultConfigFileObject, yaml.dump(config))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * 设置阿里云函数计算的默认值
     * @param inputs
     * @returns
     */
    FunctionCompute.prototype.set = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        core_1.reportComponent('fc-api', {
                            command: 'set',
                            uid: '',
                        });
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api set [type] [value]"
                                }, {
                                    header: 'Examples',
                                    content: [
                                        {
                                            desc: 'region',
                                            example: 'The region of fc endpoint.'
                                        },
                                        {
                                            desc: 'access',
                                            example: 'Specify the key name.'
                                        }
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        if (!(comParse.data && comParse.data._.length > 0)) return [3 /*break*/, 4];
                        if (!(comParse.data._[0] == "region")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.writeToFile("region", comParse.data._[1])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(comParse.data._[0] == "access")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.writeToFile("access", comParse.data._[1])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.getConfigFromFile()];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 获取所配置的阿里云函数计算默认值
     * @param inputs
     * @returns
     */
    FunctionCompute.prototype.get = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        core_1.reportComponent('fc-api', {
                            command: 'get',
                            uid: '',
                        });
                        return [4 /*yield*/, this.getConfigFromFile()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FunctionCompute.prototype.getClient = function (region, access) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultData, _a, AccountID, AccessKeyID, AccessKeySecret;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!access) {
                            access = defaultData.access;
                            console.log("  \uD83D\uDD11 Using default access: " + access + ", If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.");
                        }
                        if (!region) {
                            region = defaultData.region;
                            console.log("  \uD83C\uDF0D Using default region: " + region + ", If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.");
                        }
                        return [4 /*yield*/, core_1.getCredential(access)];
                    case 2:
                        _a = (_b.sent()), AccountID = _a.AccountID, AccessKeyID = _a.AccessKeyID, AccessKeySecret = _a.AccessKeySecret;
                        core_1.reportComponent('fc-api', { uid: AccountID, command: 's cli' });
                        this.client = new fc2_1.default(AccountID, {
                            accessKeyID: AccessKeyID,
                            accessKeySecret: AccessKeySecret,
                            securityToken: '',
                            region: region || 'cn-hangzhou',
                            timeout: 6000000,
                        });
                        _b.label = 3;
                    case 3: return [2 /*return*/];
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
    FunctionCompute.prototype.fetchData = function (access, region, api, field, nextToken, limit, serviceName, functionName, qualifier) {
        return __awaiter(this, void 0, void 0, function () {
            var start, _loop_1, this_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultData = [];
                        start = true;
                        _loop_1 = function () {
                            var optional, switchApi;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        start = false;
                                        optional = {
                                            limit: _limit,
                                            nextToken: _nextToken,
                                            prefix: _prefix,
                                            startKey: _startKey,
                                        };
                                        return [4 /*yield*/, this_1.getClient(region, access)];
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
                                        return [4 /*yield*/, switchApi[api].call(this_1)];
                                    case 2:
                                        _a.sent();
                                        resultData = resultData.concat(result.data[field]);
                                        if (typeof nextToken === 'undefined' && typeof limit === 'undefined') {
                                            _nextToken = result.data.nextToken ? result.data.nextToken : null;
                                            // console.log(_nextToken)
                                        }
                                        else {
                                            _nextToken = null;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!(start || _nextToken)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, yaml.dump(resultData)];
                }
            });
        });
    };
    FunctionCompute.prototype.index = function (inputs) {
        if (inputs === void 0) { inputs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var newInputs, addContent, commandData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newInputs = inputs;
                        addContent = "";
                        if (newInputs.project.access) {
                            addContent = " -a " + newInputs.project.access;
                        }
                        console.log(" _____     __       ____  ____   ____ \n|     |   /  ]     /    ||    \\ |    |\n|   __|  /  /     |  o  ||  o  ) |  | \n|  |_   /  /      |     ||   _/  |  | \n|   _] /   \\_     |  _  ||  |    |  | \n|  |   \\     |    |  |  ||  |    |  | \n|__|    \\____|    |__|__||__|   |____|\n                                      ");
                        console.log("🎼 If you need help, you could input 'help'. ");
                        console.log("🎼 You can use FC API to operate directly.");
                        console.log("🎼 For example: [listServices]");
                        console.log("🎼 Quit: control + c/z");
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        return [4 /*yield*/, input('> ')];
                    case 2:
                        commandData = _a.sent();
                        if (commandData) {
                            // console.log(`s cli fc-api ${commandData === "help" ? "-h" : commandData}${addContent}`)
                            spawnSync("s cli fc-api " + (commandData === "help" ? "-h" : commandData) + addContent, [], {
                                cwd: './',
                                stdio: 'inherit',
                                shell: true
                            });
                        }
                        else {
                            console.log("");
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
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
            var apts, comParse, _a, limit, nextToken, prefix, startKey, region, access;
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
                            content: "s cli fc-api listServices\n API Document: https://help.aliyun.com/document_detail/175559.htm"
                        }, {
                            header: 'Options',
                            optionList: [
                                {
                                    name: 'region',
                                    description: 'The region of fc endpoint.',
                                    type: String,
                                },
                                {
                                    name: 'access',
                                    description: 'Specify the key name.',
                                    type: String,
                                },
                                {
                                    name: 'props',
                                    description: 'The json string of props.',
                                    type: String,
                                }
                            ],
                        },]);
                    return [2 /*return*/];
                }
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, region = _a.region;
                access = inputs.credentials.Alias;
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData(access, region, 'listServices', 'services', nextToken, limit)];
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
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, qualifier, region, access;
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
                            content: "s cli fc-api listFunctions\n API Document: https://help.aliyun.com/document_detail/191155.htm"
                        }, {
                            header: 'Options',
                            optionList: [
                                {
                                    name: 'region',
                                    description: 'The region of fc endpoint.',
                                    type: String,
                                },
                                {
                                    name: 'access',
                                    description: 'Specify the key name.',
                                    type: String,
                                },
                                {
                                    name: 'props',
                                    description: 'The json string of props.',
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
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName, qualifier = _a.qualifier, region = _a.region;
                access = inputs.credentials.Alias;
                if (this.checkField({ serviceName: serviceName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData(access, region, 'listFunctions', 'functions', nextToken, limit, serviceName, null, qualifier)];
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
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, functionName, region;
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
                            content: "s cli fc-api listTriggers\n API Document: https://help.aliyun.com/document_detail/191158.htm"
                        }, {
                            header: 'Options',
                            optionList: [
                                {
                                    name: 'region',
                                    description: 'The region of fc endpoint.',
                                    type: String,
                                },
                                {
                                    name: 'access',
                                    description: 'Specify the key name.',
                                    type: String,
                                },
                                {
                                    name: 'props',
                                    description: 'The json string of props.',
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
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName, functionName = _a.functionName, region = _a.region;
                if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData(access, region, 'listTriggers', 'triggers', nextToken, limit, serviceName, functionName)];
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
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, region, access;
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
                            content: "s cli fc-api listAliases\nAPI Document: https://help.aliyun.com/document_detail/191166.html"
                        }, {
                            header: 'Options',
                            optionList: [
                                {
                                    name: 'region',
                                    description: 'The region of fc endpoint.',
                                    type: String,
                                },
                                {
                                    name: 'access',
                                    description: 'Specify the key name.',
                                    type: String,
                                },
                                {
                                    name: 'props',
                                    description: 'The json string of props.',
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
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName, region = _a.region;
                access = inputs.credentials.Alias;
                if (this.checkField({ serviceName: serviceName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData(access, region, 'listAliases', 'aliases', nextToken, limit, serviceName)];
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
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, region, access;
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
                            content: "s cli fc-api listVersions\nAPI Document: https://help.aliyun.com/document_detail/191162.html"
                        }, {
                            header: 'Options',
                            optionList: [
                                {
                                    name: 'region',
                                    description: 'The region of fc endpoint.',
                                    type: String,
                                },
                                {
                                    name: 'access',
                                    description: 'Specify the key name.',
                                    type: String,
                                },
                                {
                                    name: 'props',
                                    description: 'The json string of props.',
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
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName, region = _a.region;
                access = inputs.credentials.Alias;
                if (this.checkField({ serviceName: serviceName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData(access, region, 'listVersions', 'versions', nextToken, limit, serviceName)];
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
            var apts, comParse, _a, limit, nextToken, prefix, startKey, region, access;
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
                            content: "s cli fc-api listCustomDomains\nAPI Document: https://help.aliyun.com/document_detail/191170.html"
                        }, {
                            header: 'Options',
                            optionList: [
                                {
                                    name: 'region',
                                    description: 'The region of fc endpoint.',
                                    type: String,
                                },
                                {
                                    name: 'access',
                                    description: 'Specify the key name.',
                                    type: String,
                                },
                                {
                                    name: 'props',
                                    description: 'The json string of props.',
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
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, region = _a.region;
                access = inputs.credentials.Alias;
                _nextToken = nextToken;
                _limit = limit || 100;
                _prefix = prefix;
                _startKey = startKey;
                return [2 /*return*/, this.fetchData(access, region, 'listCustomDomains', 'customDomains', nextToken, limit)];
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
            var apts, comParse, _a, limit, nextToken, serviceName, qualifier, region, access;
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
                            content: "s cli fc-api listProvisionConfigs\nAPI Document: https://help.aliyun.com/document_detail/191174.html"
                        }, {
                            header: 'Options',
                            optionList: [
                                {
                                    name: 'region',
                                    description: 'The region of fc endpoint.',
                                    type: String,
                                },
                                {
                                    name: 'access',
                                    description: 'Specify the key name.',
                                    type: String,
                                },
                                {
                                    name: 'props',
                                    description: 'The json string of props.',
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
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, serviceName = _a.serviceName, qualifier = _a.qualifier, region = _a.region;
                access = inputs.credentials.Alias;
                _nextToken = nextToken;
                _limit = limit || 100;
                return [2 /*return*/, this.fetchData(access, region, 'listProvisionConfigs', 'provisionConfigs', nextToken, limit, serviceName, null, qualifier)];
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
            var apts, comParse, _a, limit, nextToken, serviceName, functionName, region, access;
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
                            content: "s cli fc-api listFunctionAsyncConfigs\nAPI Document: https://help.aliyun.com/document_detail/181754.html"
                        }, {
                            header: 'Options',
                            optionList: [
                                {
                                    name: 'region',
                                    description: 'The region of fc endpoint.',
                                    type: String,
                                },
                                {
                                    name: 'access',
                                    description: 'Specify the key name.',
                                    type: String,
                                },
                                {
                                    name: 'props',
                                    description: 'The json string of props.',
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
                _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, serviceName = _a.serviceName, functionName = _a.functionName, region = _a.region;
                access = inputs.credentials.Alias;
                if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                    return [2 /*return*/];
                _nextToken = nextToken;
                _limit = limit || 100;
                return [2 /*return*/, this.fetchData(access, region, 'listFunctionAsyncConfigs', 'configs', nextToken, limit, serviceName, functionName)];
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
            var apts, comParse, _a, serviceName, qualifier, region, access, error_1;
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
                                    content: "s cli fc-api getService\nAPI Document: https://help.aliyun.com/document_detail/189225.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, qualifier = _a.qualifier, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getService(serviceName, {}, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, qualifier, region, access, error_2;
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
                                    content: "s cli fc-api getFunction\nAPI Document: https://help.aliyun.com/document_detail/189985.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunction(serviceName, functionName, {}, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, qualifier, region, access, error_3;
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
                                    content: "s cli fc-api getFunctionCode\nAPI Document: https://help.aliyun.com/document_detail/191154.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunctionCode(serviceName, functionName, {}, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, triggerName, region, access, error_4;
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
                                    content: "s cli fc-api getTrigger\nAPI Document: https://help.aliyun.com/document_detail/190056.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, triggerName = _a.triggerName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, aliasName, region, access, error_5;
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
                                    content: "s cli fc-api getAlias\nAPI Document: https://help.aliyun.com/document_detail/191165.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getAlias(serviceName, aliasName)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, domainName, region, access, error_6;
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
                                    content: "s cli fc-api getCustomDomain\nAPI Document: https://help.aliyun.com/document_detail/191169.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), domainName = _a.domainName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getCustomDomain(domainName)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 4:
                        error_6 = _b.sent();
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
            var apts, comParse, _a, serviceName, functionName, qualifier, region, access, error_7;
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
                                    content: "s cli fc-api getProvisionConfig\nAPI Document: https://help.aliyun.com/document_detail/191173.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, qualifier: qualifier }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getProvisionConfig(serviceName, functionName, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, qualifier, region, access, error_8;
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
                                    content: "s cli fc-api getFunctionAsyncConfig\nAPI Document: https://help.aliyun.com/document_detail/181753.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, qualifier: qualifier }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, event, region, access, error_9;
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
                                    content: "s cli fc-api invokeFunction\nAPI Document: https://help.aliyun.com/document_detail/191156.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, event = _a.event, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.invokeFunction(serviceName, functionName, JSON.stringify(event))];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, region, access, error_10;
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
                                    content: "s cli fc-api deleteService\nAPI Document: https://help.aliyun.com/document_detail/189227.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteService(serviceName)];
                    case 3:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Service', serviceName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_10 = _b.sent();
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
            var apts, comParse, _a, serviceName, functionName, region, access, error_11;
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
                                    content: "s cli fc-api deleteFunction\nAPI Document: https://help.aliyun.com/document_detail/191153.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
            var apts, comParse, _a, serviceName, functionName, triggerName, region, access, error_12;
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
                                    content: "s cli fc-api deleteTrigger\nAPI Document: https://help.aliyun.com/document_detail/191157.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, triggerName = _a.triggerName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
            var apts, comParse, _a, domainName, region, access, error_13;
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
                                    content: "s cli fc-api deleteCustomDomain\nAPI Document: https://help.aliyun.com/document_detail/191167.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), domainName = _a.domainName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteCustomDomain(domainName)];
                    case 3:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('CustomDomain', domainName)];
                        return [3 /*break*/, 5];
                    case 4:
                        error_13 = _b.sent();
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
            var apts, comParse, _a, serviceName, versionId, region, access, error_14;
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
                                    content: "s cli fc-api deleteVersion\nAPI Document: https://help.aliyun.com/document_detail/191161.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, versionId = _a.versionId, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
            var apts, comParse, _a, serviceName, aliasName, region, access, error_15;
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
                                    content: "s cli fc-api deleteAlias\nAPI Document: https://help.aliyun.com/document_detail/191163.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
            var apts, comParse, _a, serviceName, functionName, qualifier, region, access, error_16;
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
                                    content: "s cli fc-api deleteFunctionAsyncConfig\nAPI Document: https://help.aliyun.com/document_detail/181755.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
            var apts, comParse, _a, serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, region, access, sName, error_17;
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
                                    content: "s cli fc-api createService\nAPI Document: https://help.aliyun.com/document_detail/175256.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, description = _a.description, internetAccess = _a.internetAccess, role = _a.role, logConfig = _a.logConfig, nasConfig = _a.nasConfig, vpcConfig = _a.vpcConfig, tracingConfig = _a.tracingConfig, region = _a.region;
                        access = inputs.credentials.Alias;
                        sName = defaultServiceName ? defaultServiceName : serviceName;
                        if (this.checkField({ sName: sName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, region, access, error_18;
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
                                    content: "s cli fc-api updateService\nAPI Document: https://help.aliyun.com/document_detail/188167.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, description = _a.description, internetAccess = _a.internetAccess, role = _a.role, logConfig = _a.logConfig, nasConfig = _a.nasConfig, vpcConfig = _a.vpcConfig, tracingConfig = _a.tracingConfig, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region, access, functionCode, codeFize, error_19;
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
                                    content: "s cli fc-api createFunction\nAPI Document: https://help.aliyun.com/document_detail/189984.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort, region = _a.region;
                        access = inputs.credentials.Alias;
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
                        return [4 /*yield*/, this.getClient(region, access)];
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
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region, access, error_20;
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
                                    content: "s cli fc-api updateFunction\nAPI Document: https://help.aliyun.com/document_detail/189986.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, invocationRole, qualifier, sourceArn, triggerConfig, triggerName, triggerType, region, access, error_21;
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
                                    content: "s cli fc-api createTrigger\nAPI Document: https://help.aliyun.com/document_detail/190054.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, invocationRole = _a.invocationRole, qualifier = _a.qualifier, sourceArn = _a.sourceArn, triggerConfig = _a.triggerConfig, triggerName = _a.triggerName, triggerType = _a.triggerType, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName, triggerType: triggerType, invocationRole: invocationRole }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
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
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, invocationRole, qualifier, triggerConfig, triggerName, region, access, error_22;
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
                                    content: "s cli fc-api updateTrigger\nAPI Document: https://help.aliyun.com/document_detail/190055.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, invocationRole = _a.invocationRole, qualifier = _a.qualifier, triggerConfig = _a.triggerConfig, triggerName = _a.triggerName, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateTrigger(serviceName, functionName, triggerName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier,
                                triggerConfig: triggerConfig,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, description, region, access, error_23;
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
                                    content: "s cli fc-api publishVersion\nAPI Document: https://help.aliyun.com/document_detail/191160.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, description = _a.description, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.publishVersion(serviceName, description)];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, aliasName, versionId, additionalVersionWeight, description, region, access, error_24;
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
                                    content: "s cli fc-api createAlias\nAPI Document: https://help.aliyun.com/document_detail/162952.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName, versionId = _a.versionId, additionalVersionWeight = _a.additionalVersionWeight, description = _a.description, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.createAlias(serviceName, aliasName, versionId, {
                                additionalVersionWeight: additionalVersionWeight || {},
                                description: description,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, aliasName, versionId, additionalVersionWeight, description, region, access, error_25;
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
                                    content: "s cli fc-api updateAlias\nAPI Document: https://help.aliyun.com/document_detail/191164.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName, versionId = _a.versionId, additionalVersionWeight = _a.additionalVersionWeight, description = _a.description, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateAlias(serviceName, aliasName, versionId, {
                                additionalVersionWeight: additionalVersionWeight,
                                description: description,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, domainName, protocol, certConfig, routeConfig, region, access, error_26;
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
                                    content: "s cli fc-api createCustomDomain\nAPI Document: https://help.aliyun.com/document_detail/175234.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), domainName = _a.domainName, protocol = _a.protocol, certConfig = _a.certConfig, routeConfig = _a.routeConfig, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.createCustomDomain(domainName, {
                                protocol: protocol,
                                certConfig: certConfig,
                                routeConfig: routeConfig,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, domainName, protocol, certConfig, routeConfig, region, access, error_27;
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
                                    content: "s cli fc-api updateCustomDomain\nAPI Document: https://help.aliyun.com/document_detail/191168.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), domainName = _a.domainName, protocol = _a.protocol, certConfig = _a.certConfig, routeConfig = _a.routeConfig, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ domainName: domainName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateCustomDomain(domainName, {
                                protocol: protocol,
                                certConfig: certConfig,
                                routeConfig: routeConfig,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, qualifier, target, scheduledActions, targetTrackingPolicies, region, access, error_28;
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
                                    content: "s cli fc-api putProvisionConfig\nAPI Document: https://help.aliyun.com/document_detail/191172.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, target = _a.target, scheduledActions = _a.scheduledActions, targetTrackingPolicies = _a.targetTrackingPolicies, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.putProvisionConfig(serviceName, functionName, qualifier, {
                                target: target,
                                scheduledActions: scheduledActions,
                                targetTrackingPolicies: targetTrackingPolicies,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, qualifier, destinationConfig, maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts, region, access, error_29;
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
                                    content: "s cli fc-api putFunctionAsyncConfig\nAPI Document: https://help.aliyun.com/document_detail/181752.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, destinationConfig = _a.destinationConfig, maxAsyncEventAgeInSeconds = _a.maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts = _a.maxAsyncRetryAttempts, region = _a.region;
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.client.putFunctionAsyncConfig(serviceName, functionName, qualifier, {
                                destinationConfig: destinationConfig,
                                maxAsyncEventAgeInSeconds: maxAsyncEventAgeInSeconds,
                                maxAsyncRetryAttempts: maxAsyncRetryAttempts,
                            })];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
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
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region, access, defaultServiceName, functionCode, codeFize, error_30;
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
                                    content: "s cli fc-api createFunctionDefaultService\nAPI Document: https://help.aliyun.com/document_detail/189984.html"
                                }, {
                                    header: 'Options',
                                    optionList: [
                                        {
                                            name: 'region',
                                            description: 'The region of fc endpoint.',
                                            type: String,
                                        },
                                        {
                                            name: 'access',
                                            description: 'Specify the key name.',
                                            type: String,
                                        },
                                        {
                                            name: 'props',
                                            description: 'The json string of props.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort, region = _a.region;
                        access = inputs.credentials.Alias;
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
                        return [4 /*yield*/, this.getClient(region, access)];
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
                        return [2 /*return*/, yaml.dump(result.data)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdGO0FBQ3hGLHNEQUE4QjtBQUM5QixzREFBK0I7QUFFL0IsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUloQyxnREFBa0M7QUFDbEMsYUFBYTtBQUNOLElBQUEsU0FBUyxHQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBNUIsQ0FBNkI7QUFDN0MsSUFBTSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRywwQkFBMEIsQ0FBQTtBQUM3RSxJQUFJLE1BQVcsQ0FBQTtBQUNmLElBQUksVUFBVSxHQUFhLEVBQUUsQ0FBQTtBQUM3QixJQUFJLE1BQXFCLENBQUE7QUFDekIsSUFBSSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQXdCLENBQUE7QUFFakQsU0FBZ0IsS0FBSyxDQUFDLE1BQW1CO0lBQW5CLHVCQUFBLEVBQUEsV0FBbUI7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQWdDO1FBQ2hELElBQUksRUFBRSxHQUFHLGtCQUFRLENBQUMsZUFBZSxDQUFDO1lBQzlCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztZQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07U0FDekIsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDWixFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQVk7WUFDdkIsRUFBRSxDQUFDLEtBQUssRUFB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