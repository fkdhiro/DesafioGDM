import { CreateUser } from "@application/dtos/user/create-user.dto";
import { UserService } from "@application/services/user.service";
import { Config } from "@infrastructure/configuration/env/dotenv.config";
import { Request, Response } from "express-serve-static-core";

export class UserController {
  userService: UserService;

  configService: Config;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: Request, res: Response) {
    const user = req.body as CreateUser;
    try {
      const newUser = await this.userService.create(user);
      res.send(newUser);
    } catch (error) {
      res.status(409).send({ message: error.message});
    }
  }

  async login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    const result = await this.userService.login(email, password);

    if (!result) {
      res.status(404).json({ message: "User does not exists."});
    } else {
      res.send(result)
    }
  }

  async update(req: Request, res: Response) {
    const user = req.body;
    const id = req.params.id;

    try {
      const updatedUser = await this.userService.update(id, user);
      res.send(updatedUser);
    } catch (error) {
      res.status(400).send({ message: error.message});
    }
  }
  
  async deleteById(req: Request, res: Response) {
    const id = req.params.id;
    const deletedUser = await this.userService.deleteById(id);
    if (deletedUser) {
      res.send(deletedUser);
    }
    res.status(404).send();
  }
}
