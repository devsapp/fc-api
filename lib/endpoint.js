"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFcEndpoint = void 0;
var core_1 = require("@serverless-devs/core");
function extract(regex, endpoint) {
    var matchs = endpoint.match(regex);
    if (matchs) {
        return matchs[1];
    }
    return null;
}
function extractAccountId(endpoint) {
    return extract(/^https?:\/\/([^.]+)\..+$/, endpoint);
}
function extractRegion(endpoint) {
    return extract(/^https?:\/\/[^.]+\.([^.]+)\..+$/, endpoint);
}
function extractProtocol(endpoint) {
    var array = endpoint.split(':', 1);
    return array.length !== 0 ? array[0] : '';
}
function getFcEndpoint() {
    return __awaiter(this, void 0, void 0, function () {
        var fcDefault, fcEndpoint, enableFcEndpoint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.loadComponent('devsapp/fc-default')];
                case 1:
                    fcDefault = _a.sent();
                    return [4 /*yield*/, fcDefault.get({ args: 'fc-endpoint' })];
                case 2:
                    fcEndpoint = _a.sent();
                    if (!fcEndpoint) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, fcDefault.get({ args: 'enable-fc-endpoint' })];
                case 3:
                    enableFcEndpoint = _a.sent();
                    if (!(enableFcEndpoint === true || enableFcEndpoint === 'true')) {
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/, {
                            fcEndpoint: fcEndpoint,
                            accountId: extractAccountId(fcEndpoint),
                            region: extractRegion(fcEndpoint),
                            protocol: extractProtocol(fcEndpoint),
                        }];
            }
        });
    });
}
exports.getFcEndpoint = getFcEndpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW5kcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXNEO0FBRXRELFNBQVMsT0FBTyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtJQUM5QyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLElBQUksTUFBTSxFQUFFO1FBQ1YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLFFBQWdCO0lBQ3hDLE9BQU8sT0FBTyxDQUFDLDBCQUEwQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxRQUFnQjtJQUNyQyxPQUFPLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsUUFBZ0I7SUFDdkMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDNUMsQ0FBQztBQVNELFNBQXNCLGFBQWE7Ozs7O3dCQUNmLHFCQUFNLG9CQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7b0JBQXJELFNBQVMsR0FBRyxTQUF5QztvQkFDaEMscUJBQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFBOztvQkFBakUsVUFBVSxHQUFXLFNBQTRDO29CQUN2RSxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUFFLHNCQUFPLFNBQVMsRUFBQztxQkFBRTtvQkFDUixxQkFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLENBQUMsRUFBQTs7b0JBQTNFLGdCQUFnQixHQUFRLFNBQW1EO29CQUNqRixJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLElBQUksZ0JBQWdCLEtBQUssTUFBTSxDQUFDLEVBQUU7d0JBQUUsc0JBQU8sU0FBUyxFQUFDO3FCQUFFO29CQUV0RixzQkFBTzs0QkFDTCxVQUFVLFlBQUE7NEJBQ1YsU0FBUyxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzs0QkFDdkMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUM7NEJBQ2pDLFFBQVEsRUFBRSxlQUFlLENBQUMsVUFBVSxDQUFDO3lCQUN0QyxFQUFBOzs7O0NBQ0Y7QUFiRCxzQ0FhQyJ9