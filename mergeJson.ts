//mergeJson.ts
import fs from "fs-extra";
import path from "path";

interface User {
  id: number;
  name: string;
  age: number;
}

async function mergeJsonFiles(filePaths: string[]): Promise<void> {
  const allUsers: User[] = [];

  for (const filePath of filePaths) {
    try {
      const data: User[] = await fs.readJson(filePath);
      allUsers.push(...data);
    } catch (err) {
      console.error(`Error reading ${filePath}:`, err);
    }
  }

  allUsers.sort((a, b) => a.id - b.id);

  await fs.writeJson(path.join(__dirname, "merged_users.json"), allUsers, {
    spaces: 2,
  });
  console.log("Merged users written to merged_users.json");
}

const jsonFiles: string[] = [
  path.join(__dirname, "users1.json"),
  path.join(__dirname, "users2.json"),
];

mergeJsonFiles(jsonFiles).catch((err) => console.error(err));
