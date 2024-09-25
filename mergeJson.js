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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
function mergeJsonFiles(filePaths) {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = [];
        for (const filePath of filePaths) {
            try {
                const data = yield fs_extra_1.default.readJson(filePath);
                allUsers.push(...data);
            }
            catch (err) {
                console.error(`Error reading ${filePath}:`, err);
            }
        }
        allUsers.sort((a, b) => a.id - b.id);
        yield fs_extra_1.default.writeJson(path_1.default.join(__dirname, "merged_users.json"), allUsers, {
            spaces: 2,
        });
        console.log("Merged users written to merged_users.json");
    });
}
const jsonFiles = [
    path_1.default.join(__dirname, "users1.json"),
    path_1.default.join(__dirname, "users2.json"),
];
mergeJsonFiles(jsonFiles).catch((err) => console.error(err));
