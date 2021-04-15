"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultProfilePath = exports.getProfileFile = exports.getConfig = void 0;
var os_1 = __importDefault(require("os"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var i18n_1 = require("i18n");
function getConfig(key) {
    var profile = getProfileFile();
    return profile[key];
}
exports.getConfig = getConfig;
function getProfileFile() {
    var profileResult = {};
    try {
        var profileFilePath = getDefaultProfilePath();
        profileResult = js_yaml_1.default.load(fs_1.default.readFileSync(profileFilePath, 'utf8')) || {};
    }
    catch (e) {
        console.log(e);
    }
    return profileResult;
}
exports.getProfileFile = getProfileFile;
function getDefaultProfilePath() {
    return path_1.default.join(os_1.default.homedir(), '.s', 'set-config.yml');
}
exports.getDefaultProfilePath = getDefaultProfilePath;
var i18n = new i18n_1.I18n({
    locales: ['en', 'zh'],
    directory: path_1.default.join(__dirname, '..', 'locales'),
});
var locale = getConfig('locale');
if (locale) {
    i18n.setLocale(locale);
}
else {
    i18n.setLocale('en');
}
exports.default = i18n;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBDQUFvQjtBQUNwQiwwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLG9EQUEyQjtBQUMzQiw2QkFBNEI7QUFFNUIsU0FBZ0IsU0FBUyxDQUFDLEdBQVc7SUFDakMsSUFBTSxPQUFPLEdBQUcsY0FBYyxFQUFFLENBQUM7SUFDakMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUhELDhCQUdDO0FBR0QsU0FBZ0IsY0FBYztJQUMxQixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUE7SUFDdEIsSUFBSTtRQUNBLElBQU0sZUFBZSxHQUFHLHFCQUFxQixFQUFFLENBQUM7UUFDaEQsYUFBYSxHQUFHLGlCQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzdFO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQztBQVZELHdDQVVDO0FBR0QsU0FBZ0IscUJBQXFCO0lBQ2pDLE9BQU8sY0FBSSxDQUFDLElBQUksQ0FBQyxZQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUZELHNEQUVDO0FBRUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUM7SUFDbEIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNyQixTQUFTLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQztDQUNuRCxDQUFDLENBQUM7QUFHSCxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkMsSUFBSSxNQUFNLEVBQUU7SUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzFCO0tBQU07SUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3hCO0FBRUQsa0JBQWUsSUFBSSxDQUFDIn0=