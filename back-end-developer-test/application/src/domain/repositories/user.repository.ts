import { IUser, User } from "@domain/entities/user.entity";


export class UserRepository {

  create(user: Partial<IUser>) {
    const usuario = new User(user);
    return usuario.save();
  }

  update(id: string, user: Partial<IUser>) {
    return User.findByIdAndUpdate(id, user, { new: true }).exec();
  }
  
  deleteById(id: string) {
    return User.findByIdAndDelete(id).exec();
  }
  
  findById(id: string) {
    return User.findById(id).exec();
  }

  findByEmail(email: string) {
    return User.findOne({ email: email })
  }
}

