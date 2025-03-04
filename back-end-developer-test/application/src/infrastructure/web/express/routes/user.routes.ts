import { UserController } from "@application/controllers/user.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/user", (req, res) => userController.create(req, res));
userRoutes.post("/login", (req, res) => userController.login(req, res));
userRoutes.put("/user/:id", authMiddleware, (req, res) => userController.update(req, res));
userRoutes.delete("/user/:id", authMiddleware, (req, res) => userController.deleteById(req, res));

export default userRoutes;