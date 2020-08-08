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
const download_1 = __importDefault(require("download"));
const proc = __importStar(require("process"));
function getSpatialOauthConfigDir() {
    let configParentDir;
    switch (proc.platform) {
        case "win32":
            const localAppData = proc.env['LOCALAPPDATA'];
            if (!localAppData) {
                throw new Error("Could not find local app data directory.");
            }
            configParentDir = localAppData;
            break;
        case "darwin":
        case "linux":
            const homeDir = proc.env['HOME'] || "~/";
            if (!homeDir) {
                throw new Error("Could not find HOME directory.");
            }
            configParentDir = homeDir;
            break;
        default:
            throw new Error(`Unsupported platform: ${proc.platform}.`);
    }
    return path_1.default.join(configParentDir, ".improbable", "oauth2");
}
exports.getSpatialOauthConfigDir = getSpatialOauthConfigDir;
function getDownloadUrl(version) {
    switch (proc.platform) {
        case "win32":
            return `https://console.improbable.io/toolbelt/download/${version}/win`;
        case "darwin":
            return `https://console.improbable.io/toolbelt/download/${version}/mac`;
        case "linux":
            return `https://console.improbable.io/toolbelt/download/${version}/linux`;
        default:
            throw new Error(`Unsupported platform: ${proc.platform}.`);
    }
}
exports.getDownloadUrl = getDownloadUrl;
function downloadSpatialCli(url, destDir) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let exeLocation = path_1.default.join(destDir, "spatial");
        if (proc.platform == "win32") {
            exeLocation += ".exe";
        }
        try {
            yield download_1.default(url).then((data) => {
                fs_1.default.writeFileSync(exeLocation, data, {
                    mode: 0o755
                });
                resolve();
            });
        }
        catch (error) {
            reject(error);
        }
    }));
}
exports.downloadSpatialCli = downloadSpatialCli;
