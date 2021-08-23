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
var endpoint_1 = require("./endpoint");
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
fc2_1.default.prototype.listVersions = function (serviceName, options, headers) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.get("/services/" + serviceName + "/versions", options, headers)];
        });
    });
};
fc2_1.default.prototype.listAliases = function (serviceName, options, headers) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.get("/services/" + serviceName + "/aliases", options, headers)];
        });
    });
};
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
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                        },
                                        {
                                            desc: 'serviceName',
                                            example: 'Specify the serviceName.'
                                        },
                                        {
                                            desc: 'functionName',
                                            example: 'Specify the functionName.'
                                        }
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        if (!(comParse.data && comParse.data['_'].length > 0)) return [3 /*break*/, 8];
                        if (!(comParse.data['_'][0] == "region")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.writeToFile("region", comParse.data['_'][1])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(comParse.data['_'][0] == "access")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.writeToFile("access", comParse.data['_'][1])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(comParse.data['_'][0] == "functionName")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.writeToFile("functionName", comParse.data['_'][1])];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(comParse.data['_'][0] == "serviceName")) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.writeToFile("serviceName", comParse.data['_'][1])];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!comParse.data.region) return [3 /*break*/, 10];
                        // @ts-ignore
                        return [4 /*yield*/, this.writeToFile("region", comParse.data.region)];
                    case 9:
                        // @ts-ignore
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!comParse.data.access) return [3 /*break*/, 12];
                        // @ts-ignore
                        return [4 /*yield*/, this.writeToFile("access", comParse.data.access)];
                    case 11:
                        // @ts-ignore
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!comParse.data.functionName) return [3 /*break*/, 14];
                        // @ts-ignore
                        return [4 /*yield*/, this.writeToFile("functionName", comParse.data.functionName)];
                    case 13:
                        // @ts-ignore
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        if (!comParse.data.serviceName) return [3 /*break*/, 16];
                        // @ts-ignore
                        return [4 /*yield*/, this.writeToFile("serviceName", comParse.data.serviceName)];
                    case 15:
                        // @ts-ignore
                        _a.sent();
                        _a.label = 16;
                    case 16: return [4 /*yield*/, this.getConfigFromFile()];
                    case 17: return [2 /*return*/, _a.sent()];
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
            var defaultData, customEndpoint, _a, AccountID, AccessKeyID, AccessKeySecret, SecurityToken, uid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        return [4 /*yield*/, endpoint_1.getFcEndpoint()];
                    case 2:
                        customEndpoint = _b.sent();
                        // TODO: 自定义
                        if (!access) {
                            access = defaultData.access;
                            console.log("  \uD83D\uDD11 Using default access: " + access + ", If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.");
                        }
                        if (!(region || (customEndpoint === null || customEndpoint === void 0 ? void 0 : customEndpoint.region))) {
                            region = defaultData.region;
                            console.log("  \uD83C\uDF0D Using default region: " + region + ", If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.");
                        }
                        return [4 /*yield*/, core_1.getCredential(access)];
                    case 3:
                        _a = (_b.sent()), AccountID = _a.AccountID, AccessKeyID = _a.AccessKeyID, AccessKeySecret = _a.AccessKeySecret, SecurityToken = _a.SecurityToken;
                        uid = (customEndpoint === null || customEndpoint === void 0 ? void 0 : customEndpoint.accountId) || AccountID;
                        core_1.reportComponent('fc-api', { uid: uid, command: 's cli' });
                        this.client = new fc2_1.default(uid, {
                            accessKeyID: AccessKeyID,
                            accessKeySecret: AccessKeySecret,
                            securityToken: SecurityToken,
                            region: (customEndpoint === null || customEndpoint === void 0 ? void 0 : customEndpoint.region) || region || 'cn-hangzhou',
                            timeout: 6000000,
                            endpoint: customEndpoint === null || customEndpoint === void 0 ? void 0 : customEndpoint.fcEndpoint,
                        });
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
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
                            var optional, switchApi, _tempNextToken;
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
                                            _tempNextToken = result.data.nextToken ? result.data.nextToken : null;
                                            _nextToken = _nextToken == _tempNextToken ? null : _tempNextToken;
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var newInputs, addContent, commandData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newInputs = inputs;
                        addContent = "";
                        if (newInputs.project['access']) {
                            addContent = " -a " + newInputs.project['access'];
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
     */
    FunctionCompute.prototype.listServices = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, region, access;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj, argsObj: inputs.argsObj }, apts);
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
     * @typeParam Required --serviceName
     * @typeParam Optional --qualifier --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listFunctions = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, qualifier, region, defaultData, access;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        console.log(inputs);
                        _a = Object.assign(inputs.props, comParse.data || {}), limit = _a.limit, nextToken = _a.nextToken, prefix = _a.prefix, startKey = _a.startKey, serviceName = _a.serviceName, qualifier = _a.qualifier, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _nextToken = nextToken;
                        _limit = limit || 100;
                        _prefix = prefix;
                        _startKey = startKey;
                        return [2 /*return*/, this.fetchData(access, region, 'listFunctions', 'functions', nextToken, limit, serviceName, null, qualifier)];
                }
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, functionName, region, defaultData, access;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _nextToken = nextToken;
                        _limit = limit || 100;
                        _prefix = prefix;
                        _startKey = startKey;
                        access = inputs.credentials.Alias;
                        return [2 /*return*/, this.fetchData(access, region, 'listTriggers', 'triggers', nextToken, limit, serviceName, functionName)];
                }
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, region, defaultData, access;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _nextToken = nextToken;
                        _limit = limit || 100;
                        _prefix = prefix;
                        _startKey = startKey;
                        return [2 /*return*/, this.fetchData(access, region, 'listAliases', 'aliases', nextToken, limit, serviceName)];
                }
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, serviceName, region, defaultData, access;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _nextToken = nextToken;
                        _limit = limit || 100;
                        _prefix = prefix;
                        _startKey = startKey;
                        return [2 /*return*/, this.fetchData(access, region, 'listVersions', 'versions', nextToken, limit, serviceName)];
                }
            });
        });
    };
    /**
     * 查询自定义域名列表
     * @typeParam Required
     * @typeParam Optional --limit --nextToken --prefix --startKey
     */
    FunctionCompute.prototype.listCustomDomains = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, prefix, startKey, region, access;
            return __generator(this, function (_b) {
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, serviceName, qualifier, region, defaultData, access;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        _nextToken = nextToken;
                        _limit = limit || 100;
                        return [2 /*return*/, this.fetchData(access, region, 'listProvisionConfigs', 'provisionConfigs', nextToken, limit, serviceName, null, qualifier)];
                }
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, limit, nextToken, serviceName, functionName, region, defaultData, access;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _nextToken = nextToken;
                        _limit = limit || 100;
                        return [2 /*return*/, this.fetchData(access, region, 'listFunctionAsyncConfigs', 'configs', nextToken, limit, serviceName, functionName)];
                }
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, qualifier, region, defaultData, access, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.getService(serviceName, {}, qualifier)];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_1 = _b.sent();
                        this.errorReport(error_1);
                        throw error_1;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, region, defaultData, access, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunction(serviceName, functionName, {}, qualifier)];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_2 = _b.sent();
                        this.errorReport(error_2);
                        throw error_2;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, region, defaultData, access, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunctionCode(serviceName, functionName, {}, qualifier)];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_3 = _b.sent();
                        this.errorReport(error_3);
                        throw error_3;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取触发器配置信息
     * @param inputs '{"serviceName": "","functionName": "", "triggerName": ""}'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional
     */
    FunctionCompute.prototype.getTrigger = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, triggerName, region, defaultData, access, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.getTrigger(serviceName, functionName, triggerName)];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_4 = _b.sent();
                        this.errorReport(error_4);
                        throw error_4;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取别名信息
     * @param inputs '{"serviceName": "","aliasName": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional
     */
    FunctionCompute.prototype.getAlias = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, region, defaultData, access, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.getAlias(serviceName, aliasName)];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_5 = _b.sent();
                        this.errorReport(error_5);
                        throw error_5;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, domainName, region, access, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, region, defaultData, access, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, qualifier: qualifier }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.getProvisionConfig(serviceName, functionName, qualifier)];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_7 = _b.sent();
                        this.errorReport(error_7);
                        throw error_7;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, region, defaultData, access, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, qualifier: qualifier }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.getFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_8 = _b.sent();
                        this.errorReport(error_8);
                        throw error_8;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, event, region, defaultData, access, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.invokeFunction(serviceName, functionName, JSON.stringify(event))];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_9 = _b.sent();
                        this.errorReport(error_9);
                        throw error_9;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, region, defaultData, access, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteService(serviceName)];
                    case 4:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Service', serviceName)];
                        return [3 /*break*/, 6];
                    case 5:
                        error_10 = _b.sent();
                        this.errorReport(error_10);
                        throw error_10;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, region, defaultData, access, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteFunction(serviceName, functionName)];
                    case 4:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Function', functionName)];
                        return [3 /*break*/, 6];
                    case 5:
                        error_11 = _b.sent();
                        this.errorReport(error_11);
                        throw error_11;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, triggerName, region, defaultData, access, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteTrigger(serviceName, functionName, triggerName)];
                    case 4:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Trigger', triggerName)];
                        return [3 /*break*/, 6];
                    case 5:
                        error_12 = _b.sent();
                        this.errorReport(error_12);
                        throw error_12;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, domainName, region, access, error_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, versionId, region, defaultData, access, error_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteVersion(serviceName, versionId)];
                    case 4:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Version', versionId)];
                        return [3 /*break*/, 6];
                    case 5:
                        error_14 = _b.sent();
                        this.errorReport(error_14);
                        throw error_14;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, region, defaultData, access, error_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteAlias(serviceName, aliasName)];
                    case 4:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Alias', aliasName)];
                        return [3 /*break*/, 6];
                    case 5:
                        error_15 = _b.sent();
                        this.errorReport(error_15);
                        throw error_15;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, region, defaultData, access, error_16;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.deleteFunctionAsyncConfig(serviceName, functionName, qualifier)];
                    case 4:
                        result = _b.sent();
                        if (typeof result.data !== 'undefined' && result.data !== null)
                            return [2 /*return*/, this.deleteSuccessInfo('Function', 'AsyncConfig')];
                        return [3 /*break*/, 6];
                    case 5:
                        error_16 = _b.sent();
                        this.errorReport(error_16);
                        throw error_16;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = {
            argsObj: undefined,
            credentials: undefined
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, region, defaultData, access, sName, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                            description: '[JSON String] The log configuration. This parameter specifies a Logstore to store function execution logs.',
                                            type: String,
                                        },
                                        {
                                            name: 'nasConfig',
                                            description: '[JSON String] The Apsara File Storage NAS (NAS) file system configuration, which enables a function to access the specified NAS file system.',
                                            type: String,
                                        },
                                        {
                                            name: 'vpcConfig',
                                            description: '[JSON String] The VPC configuration, which enables a function to access the specified VPC.',
                                            type: String,
                                        },
                                        {
                                            name: 'tracingConfig',
                                            description: '[JSON String] The configuration of Tracing Analysis. After Function Compute integrates with Tracing Analysis, you can record the stay time of a request in Function Compute, view the cold start time for a function, and record the execution time of a function. For more information.',
                                            type: String,
                                        },
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, description = _a.description, internetAccess = _a.internetAccess, role = _a.role, logConfig = _a.logConfig, nasConfig = _a.nasConfig, vpcConfig = _a.vpcConfig, tracingConfig = _a.tracingConfig, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        sName = defaultServiceName ? defaultServiceName : serviceName;
                        if (this.checkField({ sName: sName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.createService(sName, {
                                description: description == undefined ? undefined : String(description),
                                internetAccess: internetAccess === "false" ? false : true,
                                role: role,
                                logConfig: logConfig ? (typeof logConfig == 'string' ? JSON.parse(logConfig) : logConfig) : undefined,
                                nasConfig: nasConfig ? (typeof nasConfig == 'string' ? JSON.parse(nasConfig) : nasConfig) : undefined,
                                vpcConfig: vpcConfig ? (typeof vpcConfig == 'string' ? JSON.parse(vpcConfig) : vpcConfig) : undefined,
                                tracingConfig: tracingConfig ? (typeof tracingConfig == 'string' ? JSON.parse(tracingConfig) : tracingConfig) : undefined,
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_17 = _b.sent();
                        this.errorReport(error_17);
                        throw error_17;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, description, internetAccess, role, logConfig, nasConfig, vpcConfig, tracingConfig, region, defaultData, access, error_18;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                            description: '[JSON String] The log configuration. This parameter specifies a Logstore to store function execution logs.',
                                            type: String,
                                        },
                                        {
                                            name: 'nasConfig',
                                            description: '[JSON String] The Apsara File Storage NAS (NAS) file system configuration, which enables a function to access the specified NAS file system.',
                                            type: String,
                                        },
                                        {
                                            name: 'vpcConfig',
                                            description: '[JSON String] The VPC configuration, which enables a function to access the specified VPC.',
                                            type: String,
                                        },
                                        {
                                            name: 'tracingConfig',
                                            description: '[JSON String] The configuration of Tracing Analysis. After Function Compute integrates with Tracing Analysis, you can record the stay time of a request in Function Compute, view the cold start time for a function, and record the execution time of a function. For more information.',
                                            type: String,
                                        },
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, description = _a.description, internetAccess = _a.internetAccess, role = _a.role, logConfig = _a.logConfig, nasConfig = _a.nasConfig, vpcConfig = _a.vpcConfig, tracingConfig = _a.tracingConfig, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateService(serviceName, {
                                description: description == undefined ? undefined : String(description),
                                role: role,
                                internetAccess: internetAccess === "false" ? false : true,
                                logConfig: logConfig ? (typeof logConfig == 'string' ? JSON.parse(logConfig) : logConfig) : undefined,
                                nasConfig: nasConfig ? (typeof nasConfig == 'string' ? JSON.parse(nasConfig) : nasConfig) : undefined,
                                vpcConfig: vpcConfig ? (typeof vpcConfig == 'string' ? JSON.parse(vpcConfig) : vpcConfig) : undefined,
                                tracingConfig: tracingConfig ? (typeof tracingConfig == 'string' ? JSON.parse(tracingConfig) : tracingConfig) : undefined,
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_18 = _b.sent();
                        this.errorReport(error_18);
                        throw error_18;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region, defaultData, access, functionCode, tempCode, codeFize, error_19;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                            description: '[JSON String] The code of the function. The code must be packaged into a ZIP file.',
                                            type: String,
                                        },
                                        {
                                            name: 'customContainerConfig',
                                            description: '[JSON String] The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
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
                                            type: Number,
                                        },
                                        {
                                            name: 'initializer',
                                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                                            type: String,
                                        },
                                        {
                                            name: 'memorySize',
                                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                                            type: Number,
                                        },
                                        {
                                            name: 'runtime',
                                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                                            type: String,
                                        },
                                        {
                                            name: 'timeout',
                                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                                            type: Number,
                                        },
                                        {
                                            name: 'caPort',
                                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                                            type: Number,
                                        },
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        functionCode = {};
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, code: code, handler: handler, runtime: runtime }))
                            return [2 /*return*/];
                        tempCode = undefined;
                        if (typeof code == 'string') {
                            try {
                                tempCode = JSON.parse(code);
                            }
                            catch (e) {
                                tempCode = code;
                            }
                        }
                        code = code ? tempCode : undefined;
                        if (code && code.ossBucketName && code.ossObjectName) {
                            functionCode.ossBucketName = code.ossBucketName;
                            functionCode.ossObjectName = code.ossObjectName;
                            delete functionCode.zipFile;
                        }
                        if (!(code && code.zipFile)) return [3 /*break*/, 6];
                        codeFize = void 0;
                        if (!(code.zipFile.includes('.zip') || code.zipFile.includes('.jar'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getZipFile(code.zipFile)];
                    case 2:
                        codeFize = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.startZip(code.zipFile)];
                    case 4:
                        codeFize = _b.sent();
                        _b.label = 5;
                    case 5:
                        if (!codeFize)
                            return [2 /*return*/];
                        functionCode.zipFile = codeFize;
                        delete functionCode.ossBucketName;
                        delete functionCode.ossObjectName;
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 9, , 10]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.client.createFunction(serviceName, {
                                functionName: functionName,
                                code: Object.keys(functionCode).length > 0 ? functionCode : undefined,
                                customContainerConfig: customContainerConfig ? (typeof customContainerConfig == 'string' ? JSON.parse(customContainerConfig) : customContainerConfig) : undefined,
                                description: description == undefined ? undefined : String(description),
                                handler: handler,
                                initializationTimeout: initializationTimeout,
                                initializer: initializer,
                                memorySize: memorySize,
                                runtime: runtime,
                                timeout: timeout,
                                caPort: caPort,
                            })];
                    case 8:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 9:
                        error_19 = _b.sent();
                        this.errorReport(error_19);
                        throw error_19;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新函数
     * @param inputs '{"serviceName": "","functionName": "","handler":"index.handler","runtime": "nodejs8","code":{"ossBucketName": "","ossObjectName":""}}'
     * code: {"ossBucketName": "","ossObjectName":""} 或 {"zipFile": "代码包存放的位置，执行命令的目录下，如果文件超过 50MB，请使用 OSS 上传"}
     * @typeParam Required --serviceName --functionName
     * @typeParam Optional --description --customContainerConfig --initializationTimeout --initializer --memorySize --runtime --timeout --caPort --code --handler --runtime
     */
    FunctionCompute.prototype.updateFunction = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region, defaultData, tempCode, functionCode, codeFize, access, error_20;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                            description: '[JSON String] The code of the function. The code must be packaged into a ZIP file.',
                                            type: String,
                                        },
                                        {
                                            name: 'customContainerConfig',
                                            description: '[JSON String] The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
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
                                            type: Number,
                                        },
                                        {
                                            name: 'initializer',
                                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                                            type: String,
                                        },
                                        {
                                            name: 'memorySize',
                                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                                            type: Number,
                                        },
                                        {
                                            name: 'runtime',
                                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                                            type: String,
                                        },
                                        {
                                            name: 'timeout',
                                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                                            type: Number,
                                        },
                                        {
                                            name: 'caPort',
                                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                                            type: Number,
                                        },
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        tempCode = undefined;
                        if (typeof code == 'string') {
                            try {
                                tempCode = JSON.parse(code);
                            }
                            catch (e) {
                                tempCode = code;
                            }
                        }
                        code = code ? tempCode : undefined;
                        functionCode = {};
                        if (code && code.ossBucketName && code.ossObjectName) {
                            functionCode.ossBucketName = code.ossBucketName;
                            functionCode.ossObjectName = code.ossObjectName;
                            delete functionCode.zipFile;
                        }
                        if (!(code && code.zipFile)) return [3 /*break*/, 6];
                        codeFize = void 0;
                        if (!(code.zipFile.includes('.zip') || code.zipFile.includes('.jar'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getZipFile(code.zipFile)];
                    case 2:
                        codeFize = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.startZip(code.zipFile)];
                    case 4:
                        codeFize = _b.sent();
                        _b.label = 5;
                    case 5:
                        if (!codeFize)
                            return [2 /*return*/];
                        functionCode.zipFile = codeFize;
                        delete functionCode.ossBucketName;
                        delete functionCode.ossObjectName;
                        _b.label = 6;
                    case 6:
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 10, , 11]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateFunction(serviceName, functionName, {
                                code: Object.keys(functionCode).length > 0 ? functionCode : undefined,
                                customContainerConfig: customContainerConfig ? (typeof customContainerConfig == 'string' ? JSON.parse(customContainerConfig) : customContainerConfig) : undefined,
                                description: description == undefined ? undefined : String(description),
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
                        error_20 = _b.sent();
                        this.errorReport(error_20);
                        throw error_20;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建触发器
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": "{}"'
     * @typeParam Required --serviceName --functionName --triggerName --triggerType
     * @typeParam Optional --invocationRole --qualifier --sourceArn --triggerConfig
     */
    FunctionCompute.prototype.createTrigger = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, invocationRole, qualifier, sourceArn, triggerConfig, triggerName, triggerType, region, defaultData, access, error_21;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName, triggerType: triggerType }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.createTrigger(serviceName, functionName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier ? qualifier.toString() : undefined,
                                sourceArn: sourceArn,
                                triggerConfig: triggerConfig ? (typeof triggerConfig == 'string' ? JSON.parse(triggerConfig) : triggerConfig) : undefined,
                                triggerName: triggerName,
                                triggerType: triggerType,
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_21 = _b.sent();
                        this.errorReport(error_21);
                        throw error_21;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新触发器
     * @param inputs '{"serviceName": "","functionName": "","triggerName": "","triggerType":"timer","triggerConfig": "{}"'
     * @typeParam Required --serviceName --functionName --triggerName
     * @typeParam Optional --invocationRole --qualifier --triggerConfig
     */
    FunctionCompute.prototype.updateTrigger = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, invocationRole, qualifier, triggerConfig, triggerName, region, defaultData, access, error_22;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName, triggerName: triggerName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateTrigger(serviceName, functionName, triggerName, {
                                invocationRole: invocationRole,
                                qualifier: qualifier,
                                triggerConfig: triggerConfig ? (typeof triggerConfig == 'string' ? JSON.parse(triggerConfig) : triggerConfig) : undefined,
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_22 = _b.sent();
                        this.errorReport(error_22);
                        throw error_22;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, description, region, defaultData, access, error_23;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.publishVersion(serviceName, description == undefined ? undefined : String(description))];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_23 = _b.sent();
                        this.errorReport(error_23);
                        throw error_23;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, versionId, additionalVersionWeight, description, region, defaultData, access, error_24;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                            description: '[JSON String] The additional version to which the alias points and the weight of the additional version.',
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.createAlias(serviceName, aliasName, String(versionId), {
                                additionalVersionWeight: typeof additionalVersionWeight == 'object' ? additionalVersionWeight : JSON.parse(additionalVersionWeight || '{}'),
                                description: description == undefined ? undefined : String(description),
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_24 = _b.sent();
                        this.errorReport(error_24);
                        throw error_24;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建别名通过最新版本
     * @param inputs '{"serviceName": "","aliasName": "","additionalVersionWeight": {}}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional --additionalVersionWeight --description
     */
    FunctionCompute.prototype.createAliasWithNewVersion = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, additionalVersionWeight, description, region, defaultData, access, versions, _b, _c, versionId, error_25;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api createAliasWithNewVersion\nAPI Document: https://help.aliyun.com/document_detail/162952.html"
                                },
                                {
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
                                            name: 'additionalVersionWeight',
                                            description: "[JSON String] The additional version to which the alias points and the weight of the additional version. ",
                                            type: String,
                                        },
                                        {
                                            name: 'aliasName',
                                            description: 'The name of the alias.',
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName, additionalVersionWeight = _a.additionalVersionWeight, description = _a.description, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _d.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        _c = (_b = yaml).load;
                        return [4 /*yield*/, this.listVersions(inputs)];
                    case 2:
                        versions = _c.apply(_b, [_d.sent()]);
                        versionId = versions.length > 0 ? versions[0].versionId : undefined;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        if (!versionId) {
                            this.logger.error("Could not find versionId, please check your version on release.");
                            process.exit(-1);
                        }
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, this.client.createAlias(serviceName, aliasName, String(versionId), {
                                additionalVersionWeight: typeof additionalVersionWeight == 'object' ? additionalVersionWeight : JSON.parse(additionalVersionWeight || '{}'),
                                description: description == undefined ? undefined : String(description),
                            })];
                    case 5:
                        result = _d.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 6:
                        error_25 = _d.sent();
                        this.errorReport(error_25);
                        throw error_25;
                    case 7: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, versionId, additionalVersionWeight, description, region, defaultData, access, error_26;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api updateAlias\nAPI Document: https://help.aliyun.com/document_detail/191164.html"
                                },
                                {
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
                                            description: "[JSON String] The additional version to which the alias points and the weight of the additional version. ",
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
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName, versionId: versionId }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateAlias(serviceName, aliasName, String(versionId), {
                                additionalVersionWeight: typeof additionalVersionWeight == 'object' ? additionalVersionWeight : JSON.parse(additionalVersionWeight || '{}'),
                                description: description == undefined ? undefined : String(description),
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_26 = _b.sent();
                        this.errorReport(error_26);
                        throw error_26;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新别名通过最新版本
     * @param inputs '{"serviceName": "","aliasName": "", "additionalVersionWeight": {}, "description": ""}'
     * @typeParam Required --serviceName --aliasName
     * @typeParam Optional --additionalVersionWeight --description
     */
    FunctionCompute.prototype.updateAliasWithNewVersion = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, aliasName, additionalVersionWeight, description, region, versions, _b, _c, versionId, defaultData, access, error_27;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api updateAliasWithNewVersion\nAPI Document: https://help.aliyun.com/document_detail/191164.html"
                                },
                                {
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
                                            name: 'additionalVersionWeight',
                                            description: "[JSON String] The additional version to which the alias points and the weight of the additional version. ",
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
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, aliasName = _a.aliasName, additionalVersionWeight = _a.additionalVersionWeight, description = _a.description, region = _a.region;
                        _c = (_b = yaml).load;
                        return [4 /*yield*/, this.listVersions(inputs)];
                    case 1:
                        versions = _c.apply(_b, [_d.sent()]);
                        versionId = versions.length > 0 ? versions[0].versionId : undefined;
                        return [4 /*yield*/, this.get({})];
                    case 2:
                        defaultData = _d.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, aliasName: aliasName }))
                            return [2 /*return*/];
                        if (!versionId) {
                            this.logger.error("Could not find versionId, please check your version on release.");
                            process.exit(-1);
                        }
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, this.client.updateAlias(serviceName, aliasName, String(versionId), {
                                additionalVersionWeight: typeof additionalVersionWeight == 'object' ? additionalVersionWeight : JSON.parse(additionalVersionWeight || '{}'),
                                description: description == undefined ? undefined : String(description),
                            })];
                    case 5:
                        result = _d.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 6:
                        error_27 = _d.sent();
                        this.errorReport(error_27);
                        throw error_27;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    FunctionCompute.prototype.createCustomDomain = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, domainName, protocol, certConfig, routeConfig, region, access, error_28;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                certConfig: certConfig ? (typeof certConfig == 'string' ? JSON.parse(certConfig) : certConfig) : undefined,
                                routeConfig: routeConfig ? (typeof routeConfig == 'string' ? JSON.parse(routeConfig) : routeConfig) : undefined,
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
     * 更新自定义域名
     * @param inputs '{"domainName": ""}'
     * @typeParam Required --domainName
     * @typeParam Optional --protocol --certConfig --routeConfig
     */
    FunctionCompute.prototype.updateCustomDomain = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, domainName, protocol, certConfig, routeConfig, region, access, error_29;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                certConfig: certConfig ? (typeof certConfig == 'string' ? JSON.parse(certConfig) : certConfig) : undefined,
                                routeConfig: routeConfig ? (typeof routeConfig == 'string' ? JSON.parse(routeConfig) : routeConfig) : undefined,
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
     * 追加路径配置
     * @param inputs '{"domainName": "","appendRouteConfig": "[]"}'
     * @typeParam Required --domainName --routeConfig
     * @typeParam Optional
     */
    FunctionCompute.prototype.appendRoutes = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, domainName, appendRouteConfig, region, access, error_30, alreadyRouteConfig, targetRouteConfigPath, targetRouteConfigList, inputRouteConfig, i, i, error_31;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
                        // @ts-ignore
                        if (comParse.data && comParse.data.help) {
                            core_1.help([{
                                    header: 'Usage',
                                    content: "s cli fc-api appendRoutes\nAPI Document: https://help.aliyun.com/document_detail/191168.html"
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
                                            name: 'appendRouteConfig',
                                            description: 'The route table that maps paths to functions when the functions are invoked by using the custom domain name.',
                                            type: String,
                                        }
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), domainName = _a.domainName, appendRouteConfig = _a.appendRouteConfig, region = _a.region;
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
                        return [3 /*break*/, 5];
                    case 4:
                        error_30 = _b.sent();
                        this.errorReport(error_30);
                        throw error_30;
                    case 5:
                        alreadyRouteConfig = result['data']['routeConfig']['routes'];
                        targetRouteConfigPath = [];
                        targetRouteConfigList = [];
                        inputRouteConfig = JSON.parse(appendRouteConfig);
                        for (i = 0; i < inputRouteConfig.length; i++) {
                            if (!targetRouteConfigPath.includes(inputRouteConfig[i].path)) {
                                targetRouteConfigList.push(inputRouteConfig[i]);
                                targetRouteConfigPath.push(inputRouteConfig[i].path);
                            }
                        }
                        for (i = 0; i < alreadyRouteConfig.length; i++) {
                            if (!targetRouteConfigPath.includes(alreadyRouteConfig[i].path)) {
                                targetRouteConfigList.push(alreadyRouteConfig[i]);
                                targetRouteConfigPath.push(alreadyRouteConfig[i].path);
                            }
                        }
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 9, , 10]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.client.updateCustomDomain(domainName, {
                                routeConfig: {
                                    "routes": targetRouteConfigList
                                }
                            })];
                    case 8:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 9:
                        error_31 = _b.sent();
                        this.errorReport(error_31);
                        throw error_31;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 预留配置
     * @param inputs '{"serviceName": "","functionName": "","qualifier": "1"}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --target --scheduledActions --targetTrackingPolicies
     */
    FunctionCompute.prototype.putProvisionConfig = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, target, scheduledActions, targetTrackingPolicies, region, defaultData, access, error_32;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                            type: Number,
                                        },
                                        {
                                            name: 'scheduledActions',
                                            description: '[JSON String] The configuration of scheduled auto scaling. You can perform scheduled auto scaling to flexibly configure provisioned instances. You can configure the number of provisioned instances to be automatically adjusted to a specified value at a specified time. This way, the number of provisioned instances can meet the concurrency of your business.',
                                            type: String,
                                        },
                                        {
                                            name: 'targetTrackingPolicies',
                                            description: '[Json String] The configuration of metric tracking auto scaling. Provisioned instances are scaled in or out every minute based on the concurrency utilization of provisioned instances.',
                                            type: String,
                                        },
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, target = _a.target, scheduledActions = _a.scheduledActions, targetTrackingPolicies = _a.targetTrackingPolicies, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.putProvisionConfig(serviceName, functionName, qualifier, {
                                target: target,
                                scheduledActions: scheduledActions ? (typeof scheduledActions == 'string' ? JSON.parse(scheduledActions) : scheduledActions) : undefined,
                                targetTrackingPolicies: targetTrackingPolicies ? (typeof targetTrackingPolicies == 'string' ? JSON.parse(targetTrackingPolicies) : targetTrackingPolicies) : undefined,
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_32 = _b.sent();
                        this.errorReport(error_32);
                        throw error_32;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 函数异步配置
     * @param inputs '{"serviceName": "","functionName": "","qualifier": "1"}'
     * @typeParam Required --serviceName --functionName --qualifier
     * @typeParam Optional --destinationConfig --maxAsyncEventAgeInSeconds --maxAsyncRetryAttempts
     */
    FunctionCompute.prototype.putFunctionAsyncConfig = function (inputs) {
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, qualifier, destinationConfig, maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts, region, defaultData, access, error_33;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                            description: '[JSON String] The configuration structure of the destination for asynchronous invocation.',
                                            type: String,
                                        },
                                        {
                                            name: 'maxAsyncEventAgeInSeconds',
                                            description: 'The validity period of requests. Valid values: 1 to 2592000. Unit: seconds.',
                                            type: Number,
                                        },
                                        {
                                            name: 'maxAsyncRetryAttempts',
                                            description: 'The maximum number of retries after an asynchronous invocation fails. Default value: 3. Valid values: 0 to 8.',
                                            type: Number,
                                        },
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, qualifier = _a.qualifier, destinationConfig = _a.destinationConfig, maxAsyncEventAgeInSeconds = _a.maxAsyncEventAgeInSeconds, maxAsyncRetryAttempts = _a.maxAsyncRetryAttempts, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ serviceName: serviceName, functionName: functionName }))
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.client.putFunctionAsyncConfig(serviceName, functionName, qualifier, {
                                destinationConfig: destinationConfig ? (typeof destinationConfig == 'string' ? JSON.parse(destinationConfig) : destinationConfig) : undefined,
                                maxAsyncEventAgeInSeconds: maxAsyncEventAgeInSeconds,
                                maxAsyncRetryAttempts: maxAsyncRetryAttempts,
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 5:
                        error_33 = _b.sent();
                        this.errorReport(error_33);
                        throw error_33;
                    case 6: return [2 /*return*/];
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
        if (inputs === void 0) { inputs = { argsObj: undefined, credentials: undefined }; }
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, _a, serviceName, functionName, code, customContainerConfig, description, handler, initializationTimeout, initializer, memorySize, runtime, timeout, caPort, region, defaultData, access, tempCode, defaultServiceName, functionCode, codeFize, error_34;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = core_1.commandParse({ args: inputs.args, argsObj: inputs.argsObj }, apts);
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
                                            description: '[JSON String] The code of the function. The code must be packaged into a ZIP file.',
                                            type: String,
                                        },
                                        {
                                            name: 'customContainerConfig',
                                            description: '[JSON String] The configuration of the custom container runtime. After you configure the custom container runtime, you can use custom container images to execute functions.',
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
                                            type: Number,
                                        },
                                        {
                                            name: 'initializer',
                                            description: 'The handler of the initializer function. The format is determined by the programming language.',
                                            type: String,
                                        },
                                        {
                                            name: 'memorySize',
                                            description: 'The memory size of the function. Unit: MB. The memory size must be a multiple of 64 MB. Instance types have different memory specifications.',
                                            type: Number,
                                        },
                                        {
                                            name: 'runtime',
                                            description: 'The runtime environment of the function. Valid values: nodejs4.4, nodejs6, nodejs8, nodejs10, nodejs12, python2.7, python3, java8, java11, php7.2, dotnetcore2.1, custom, and custom-container.',
                                            type: String,
                                        },
                                        {
                                            name: 'timeout',
                                            description: 'The timeout period for the execution of the function. Unit: seconds. Default value: 60. Valid values: 1 to 600. When this period expires, the execution of the function is terminated.',
                                            type: Number,
                                        },
                                        {
                                            name: 'caPort',
                                            description: 'The port on which the HTTP server listens for the custom runtime or custom container runtime.',
                                            type: Number,
                                        },
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        _a = Object.assign(inputs.props, comParse.data || {}), serviceName = _a.serviceName, functionName = _a.functionName, code = _a.code, customContainerConfig = _a.customContainerConfig, description = _a.description, handler = _a.handler, initializationTimeout = _a.initializationTimeout, initializer = _a.initializer, memorySize = _a.memorySize, runtime = _a.runtime, timeout = _a.timeout, caPort = _a.caPort, region = _a.region;
                        return [4 /*yield*/, this.get({})];
                    case 1:
                        defaultData = _b.sent();
                        if (!serviceName) {
                            serviceName = defaultData.serviceName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + serviceName + ", If you want to change the default serviceName for fc-api, you can [s cli fc-api set serviceName Your-Service-Name] to set default value.");
                        }
                        if (!functionName) {
                            functionName = defaultData.functionName;
                            console.log("  \uD83E\uDD7A Using default serviceName: " + functionName + ", If you want to change the default functionName for fc-api, you can [s cli fc-api set functionName Your-Function-Name] to set default value.");
                        }
                        access = inputs.credentials.Alias;
                        if (this.checkField({ functionName: functionName, code: code, handler: handler, runtime: runtime }))
                            return [2 /*return*/];
                        tempCode = undefined;
                        if (typeof code == 'string') {
                            try {
                                tempCode = JSON.parse(code);
                            }
                            catch (e) {
                                tempCode = code;
                            }
                        }
                        code = code ? tempCode : undefined;
                        defaultServiceName = serviceName;
                        if (!(!serviceName || serviceName.length === 0)) return [3 /*break*/, 3];
                        defaultServiceName = "Service" + functionName;
                        return [4 /*yield*/, this.createService(inputs, defaultServiceName)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        functionCode = {};
                        if (code && code.ossBucketName && code.ossObjectName) {
                            functionCode.ossBucketName = code.ossBucketName;
                            functionCode.ossObjectName = code.ossObjectName;
                            delete functionCode.zipFile;
                        }
                        if (!(code && code.zipFile)) return [3 /*break*/, 8];
                        if (!(code.zipFile.includes('.zip') || code.zipFile.includes('.jar'))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getZipFile(code.zipFile)];
                    case 4:
                        codeFize = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.startZip(code.zipFile)];
                    case 6:
                        codeFize = _b.sent();
                        _b.label = 7;
                    case 7:
                        if (!codeFize)
                            return [2 /*return*/];
                        functionCode.zipFile = codeFize;
                        delete functionCode.ossBucketName;
                        delete functionCode.ossObjectName;
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, this.getClient(region, access)];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, this.client.createFunction(defaultServiceName, {
                                functionName: functionName,
                                code: Object.keys(functionCode).length > 0 ? functionCode : undefined,
                                customContainerConfig: customContainerConfig ? (typeof customContainerConfig == 'string' ? JSON.parse(customContainerConfig) : customContainerConfig) : undefined,
                                description: description == undefined ? undefined : String(description),
                                handler: handler,
                                initializationTimeout: initializationTimeout,
                                initializer: initializer,
                                memorySize: memorySize,
                                runtime: runtime,
                                timeout: timeout,
                                caPort: caPort,
                            })];
                    case 10:
                        result = _b.sent();
                        return [2 /*return*/, yaml.dump(result.data)];
                    case 11:
                        error_34 = _b.sent();
                        this.errorReport(error_34);
                        throw error_34;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return FunctionCompute;
}(base_1.default));
exports.default = FunctionCompute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdGO0FBQ3hGLHNEQUE4QjtBQUM5QixzREFBK0I7QUFDL0IsdUNBQXdDO0FBRXhDLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFJaEMsZ0RBQWtDO0FBQ2xDLGFBQWE7QUFDTixJQUFBLFNBQVMsR0FBSSxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQTVCLENBQTZCO0FBQzdDLElBQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsMEJBQTBCLENBQUE7QUFDN0UsSUFBSSxNQUFXLENBQUE7QUFDZixJQUFJLFVBQVUsR0FBYSxFQUFFLENBQUE7QUFDN0IsSUFBSSxNQUFxQixDQUFBO0FBQ3pCLElBQUksVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUF3QixDQUFBO0FBRWpELGFBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQWdCLFdBQVcsRUFBRSxPQUFZLEVBQUUsT0FBUTtJQUF0Qix3QkFBQSxFQUFBLFlBQVk7OztZQUNqRSxzQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWEsV0FBVyxjQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFDOzs7Q0FDMUUsQ0FBQztBQUVGLGFBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFVBQWdCLFdBQVcsRUFBRSxPQUFZLEVBQUUsT0FBUTtJQUF0Qix3QkFBQSxFQUFBLFlBQVk7OztZQUNoRSxzQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWEsV0FBVyxhQUFVLEVBQUUsT0FBTyxFQUFFLE9B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