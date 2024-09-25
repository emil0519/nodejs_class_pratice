"use strict";
//UserManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
class UserManager {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
        // 這邊只處理users這個array，如果已經連接DB，就會以DB對應的語法INSERT/SELECT及DELETE對應user
    }
    getUsers() {
        return this.users;
    }
    deleteUser(id) {
        this.users = this.users.filter((user) => user.id !== id);
    }
}
exports.default = UserManager;
