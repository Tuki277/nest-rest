import { User } from '../entities/user.entity';

export class UserResponse {
  id: string;
  email: string;
  username: string;
  password: string;
  password_salt: string;
  first_name: string;
  last_name: string;
  age: number;
  roles: string[];
  is_active: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.password_salt = user.passwordSalt;
    this.first_name = user.firstName;
    this.last_name = user.lastName;
    this.age = user.age;
    this.roles = user.roles;
    this.is_active = user.isActive;
  }

  static fromEntities(user: User[]): UserResponse[] {
    return user.map((user) => new UserResponse(user));
  }
}
