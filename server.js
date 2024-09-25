"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const UserManager_1 = __importDefault(require("./UserManager"));
const app = (0, express_1.default)();
const port = 3000;
const delay = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve("Done!");
    }, ms);
});
delay(3000)
    .then((message) => {
    console.log(message);
})
    .catch((error) => {
    console.error("Error:", error);
});
app.use(express_1.default.json());
const userManager = new UserManager_1.default();
app.post("/users", (req, res) => {
    const { id, name, age } = req.body;
    const newUser = { id, name, age };
    userManager.addUser(newUser);
    res.status(201).json({ message: "User added", user: newUser });
});
app.get("/users", (req, res) => {
    const users = userManager.getUsers();
    res.status(200).json(users);
});
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    userManager.deleteUser(id);
    res.status(204).send();
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
