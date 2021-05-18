"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var tty_table_1 = __importDefault(require("tty-table"));
var jszip_1 = __importDefault(require("jszip"));
var core_1 = require("@serverless-devs/core");
var zip = new jszip_1.default();
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
        var pkgPath = path_1.default.join(__dirname, '..', 'package.json');
        if (pkgPath) {
            var pkg = js_yaml_1.default.load(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'package.json'), 'utf8'));
            this.name = pkg.name;
        }
    }
    BaseComponent.prototype.__doc = function () {
        var _this = this;
        var docPath = path_1.default.join(__dirname, '..', 'doc', 'doc.json');
        if (fs_1.default.existsSync(docPath)) {
            var fileContent = fs_1.default.readFileSync(docPath).toString();
            var result = JSON.parse(fileContent);
            var options = {
                borderStyle: 'solid',
                borderColor: 'blue',
                headerAlign: 'center',
                align: 'left',
                color: 'cyan',
                width: '100%',
            };
            var header = [
                {
                    value: '方法',
                    headerColor: 'cyan',
                    color: 'cyan',
                    align: 'left',
                    width: '25%',
                    formatter: function (value) {
                        return value;
                    },
                },
                {
                    value: '方法说明',
                    headerColor: 'cyan',
                    color: 'cyan',
                    align: 'left',
                    width: '25%',
                    formatter: function (value) {
                        return value;
                    },
                },
                {
                    value: '参数说明',
                    headerColor: 'cyan',
                    color: 'cyan',
                    align: 'left',
                    width: '32%',
                    formatter: function (value) {
                        return value;
                    },
                },
                {
                    value: '命令行调用示例',
                    headerColor: 'cyan',
                    color: 'cyan',
                    align: 'left',
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    },
                },
            ];
            var rows_1 = [];
            var data = lodash_get_1.default(result, 'children[0].children', []).filter(function (item) { return item.kindString === 'Method' && lodash_get_1.default(item, 'flags.isPublic'); });
            data.forEach(function (item) {
                var parmasThat = '';
                var params = lodash_get_1.default(item, 'signatures[0].parameters[0]', {});
                if (item.signatures[0].comment.tags) {
                    parmasThat = "Required:\n" + item.signatures[0].comment.tags[0].text + "\nOptional:\n" + item.signatures[0].comment.tags[1].text;
                }
                var paramText = lodash_get_1.default(params, 'comment.text', '');
                rows_1.push([item.name, lodash_get_1.default(item, 'signatures[0].comment.shortText', ''), parmasThat, "s cli " + _this.name + " " + item.name + " -p " + paramText + " -a default -r cn-hangzhou"]);
            });
            return tty_table_1.default(header, rows_1, options).render();
        }
        else {
            return 'not found doc content';
        }
    };
    BaseComponent.prototype.__listApi = function () {
        var docPath = path_1.default.join(__dirname, '..', 'doc', 'doc.json');
        if (fs_1.default.existsSync(docPath)) {
            var fileContent = fs_1.default.readFileSync(docPath).toString();
            var result = JSON.parse(fileContent);
            var data = result.children[0].children.filter(function (item) { return item.kindString === 'Method' && item.flags.isPublic; });
            return data.map(function (item) {
                var parameters = item.signatures[0].parameters || [];
                var params = parameters.map(function (item) {
                    var paramsComment = item.comment || {};
                    var type = item.type;
                    return {
                        paramName: item.name,
                        paramDesc: paramsComment.text || '',
                        type: type.name || '',
                    };
                });
                var comment = item.signatures[0].comment || {};
                return {
                    name: item.name,
                    desc: comment.shortText || '',
                    params: params,
                };
            });
        }
        return [];
    };
    /**
     * 错误上报
     * @param error
     */
    BaseComponent.prototype.errorReport = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    BaseComponent.prototype.checkField = function (filed) {
        var flag = false;
        for (var key in filed) {
            flag = filed[key] ? false : true;
            if (flag) {
                this.logger.error("Please check the parameters. These parameters are required: " + String(Object.keys(filed)) + ".");
                process.exit(-1);
                return flag;
            }
        }
    };
    BaseComponent.prototype.deleteSuccessInfo = function (type, name) {
        return type + " " + name + " delete success";
    };
    /**
     * 处理文件后缀为zip 或者 jar
     * @param codePath
     * @returns
     */
    BaseComponent.prototype.getZipFile = function (codePath) {
        return __awaiter(this, void 0, void 0, function () {
            var codeUrl, data;
            return __generator(this, function (_a) {
                codeUrl = path_1.default.resolve(codePath);
                try {
                    data = fs_1.default.readFileSync(codeUrl);
                    return [2 /*return*/, Buffer.from(data).toString('base64')];
                }
                catch (e) {
                    this.logger.error('File does not exist or file is invalid. please check');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 读取目录及文件
     * @param obj
     * @param nowPath
     */
    BaseComponent.prototype.readDir = function (obj, nowPath) {
        return __awaiter(this, void 0, void 0, function () {
            var pathDir, _dir, files;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    pathDir = nowPath.split('/');
                    _dir = pathDir[pathDir.length - 1];
                    if (_dir.includes('.')) {
                        obj.file(_dir, fs_1.default.readFileSync("" + nowPath));
                    }
                    else {
                        files = fs_1.default.readdirSync(nowPath);
                        files.forEach(function (fileName, index) {
                            var fillPath = nowPath + '/' + fileName;
                            var file = fs_1.default.statSync(fillPath);
                            if (file.isDirectory()) {
                                var dirlist = zip.folder(fileName);
                                _this.readDir(dirlist, fillPath);
                            }
                            else {
                                obj.file(fileName, fs_1.default.readFileSync(fillPath));
                            }
                        });
                    }
                }
                catch (e) { }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 开始压缩文件
     * @param codePath
     * @returns
     */
    BaseComponent.prototype.startZip = function (codePath) {
        return __awaiter(this, void 0, void 0, function () {
            var targetDir, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetDir = path_1.default.resolve(codePath);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.readDir(zip, targetDir);
                        return [4 /*yield*/, zip.generateAsync({
                                type: 'nodebuffer',
                                compression: 'DEFLATE',
                                compressionOptions: {
                                    level: 9,
                                },
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, Buffer.from(data).toString('base64')];
                    case 3:
                        e_1 = _a.sent();
                        this.logger.error('File does not exist or file is invalid. please check');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger('FC'),
        __metadata("design:type", Object)
    ], BaseComponent.prototype, "logger", void 0);
    return BaseComponent;
}());
exports.default = BaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQW1CO0FBQ25CLDhDQUF1QjtBQUN2QiwwREFBNEI7QUFDNUIsb0RBQTBCO0FBQzFCLHdEQUE2QjtBQUM3QixnREFBeUI7QUFDekIsOENBQXdEO0FBQ3hELElBQUksR0FBRyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUE7QUFDckI7SUFHQztRQUNDLElBQU0sT0FBTyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUMxRCxJQUFJLE9BQU8sRUFBRTtZQUNaLElBQU0sR0FBRyxHQUFHLGlCQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7WUFDMUYsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1NBQ3BCO0lBQ0YsQ0FBQztJQUVTLDZCQUFLLEdBQWY7UUFBQSxpQkF3RUM7UUF2RUEsSUFBTSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUM3RCxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0IsSUFBTSxXQUFXLEdBQVcsWUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUMvRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3RDLElBQU0sT0FBTyxHQUFHO2dCQUNmLFdB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