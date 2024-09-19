import express from "express";
import {
  createUserFromContactForm,
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  getUserById,
  modifyUser,
  registerGoogleUser,
  registerUser,
} from "../controller/user.controller";
// import {
//   isAdmin,
//   isOwnerOrAdmin,
//   verifyUser,
// } from "../middleware/auth.middleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/contact", createUserFromContactForm);
userRouter.post("/register/google/:id", /*verifyUser,*/ registerGoogleUser);
userRouter.get("/", /*verifyUser, isAdmin, */ getAllUsers);
userRouter.put("/:id", /*verifyUser, isOwnerOrAdmin, */ modifyUser);
userRouter.get("/:id", /*verifyUser, isOwnerOrAdmin, */ getUserById);
userRouter.delete("/:id", /*verifyUser, isOwnerOrAdmin, */ deleteUserById);
userRouter.delete("/", /*verifyUser, isAdmin,*/ deleteAllUsers);

export default userRouter;
