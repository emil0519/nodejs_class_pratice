//UserManager.ts

interface User {
  id: number;
  name: string;
  age: number;
}

class UserManager {
  private users: User[] = [];

  public addUser(user: User): void {
    this.users.push(user);
    // 這邊只處理users這個array，如果已經連接DB，就會以DB對應的語法INSERT/SELECT及DELETE對應user
  }

  public getUsers(): User[] {
    return this.users;
  }

  public deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export default UserManager;
