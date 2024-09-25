// server.ts
import express, { Request, Response } from "express";
import UserManager from "./UserManager";

const app = express();
const port = 3000;
const delay = (ms: number) =>
  new Promise((resolve) => {
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

app.use(express.json());

const userManager = new UserManager();

app.post("/users", (req: Request, res: Response) => {
  const { id, name, age } = req.body;
  const newUser = { id, name, age };
  userManager.addUser(newUser);
  res.status(201).json({ message: "User added", user: newUser });
});

app.get("/users", (req: Request, res: Response) => {
  const users = userManager.getUsers();
  res.status(200).json(users);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  userManager.deleteUser(id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
