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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const core = __importStar(require("@actions/core"));
const proc = __importStar(require("process"));
const spatial_1 = require("./spatial");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const version = core.getInput("version");
        const url = spatial_1.getDownloadUrl(version);
        const homeDir = proc.env['HOME'] || "~/";
        const destDir = path_1.default.join(homeDir, ".spatial");
        fs_1.default.mkdirSync(destDir, { recursive: true });
        yield spatial_1.downloadSpatialCli(url, destDir);
        core.addPath(destDir);
        // Setup configuration
        const configDir = spatial_1.getSpatialOauthConfigDir();
        fs_1.default.mkdirSync(configDir, { recursive: true });
        const oauthTokenFile = path_1.default.join(configDir, "oauth2_refresh_token");
        const oauthToken = core.getInput("refresh_token");
        fs_1.default.writeFileSync(oauthTokenFile, oauthToken);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield run();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
main();
