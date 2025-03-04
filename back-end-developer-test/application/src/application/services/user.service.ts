import { CreateUser } from "@application/dtos/user/create-user.dto";
import { UpdateUser } from "@application/dtos/user/update-user.dto";
import { UserRepository } from "@domain/repositories/user.repository"
import { Config } from "@infrastructure/configuration/env/dotenv.config";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmailService } from "./email.service";
import { IUser } from "@domain/entities/user.entity";

export class UserService {
  userRepository: UserRepository;

  emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  private async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
  }

  async create(user: CreateUser) {
    const encryptedPassword = await this.encryptPassword(user.password);
    
    if (await this.userRepository.findByEmail(user.email)) {
      throw new Error("Email already exists"); 
    } else {
      const iUser = { name: user.name,
        email: user.email, 
        password: encryptedPassword
      };
        
      this.emailService.sendEmail(user.email);
      return this.userRepository.create(iUser);
    }
  }

  async login(email: string, password: string) {
    const configService = Config.getInstance();

    const user = await this.userRepository.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, configService.jwtSecret, {
        expiresIn: '1h',
      });
      return { user, token };
    }
    return false;
  }

  async update(id: string, user: UpdateUser) {
    const iUser = { name: user.name,
      email: user.email, 
      password: user.password 
        ? await this.encryptPassword(user.password) 
        : user.password };

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("User does not exists");
    } 
    
    const userWithEmail: IUser = await this.userRepository.findByEmail(user.email);

    if (userWithEmail && JSON.stringify(userWithEmail._id) !== JSON.stringify(existingUser._id)) {
      throw new Error("Email already exists"); 
    }

    const usuario = await this.userRepository.update(id, iUser);
    return usuario;
    
  }
  
  deleteById(id: string) {
    return this.userRepository.deleteById(id);
  }
}